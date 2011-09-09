/**
 * Class Constructor
 * from John resig
 */

;(function (Leta, undefined) {
	
	
 	var initializing = false,
		superTest = /horizon/.test(function () {horizon;}) ? /\b_super\b/ : /.*/;
	// ��ʱClass
	var $Class = function () {};
	// �̳з���extend
	$Class.extend = function (prop) {
		var _super = this.prototype;
		//����һ��ʵ��������ִ��init
		initializing = true;
		var prototype = new this();
		initializing = false;

		for (var name in prop) {
			// �ñհ���֤�༶�̳в�����Ⱦ
			prototype[name] = (typeof prop[name] === 'function' && typeof _super[name] === 'function' && superTest.test(prop[name])) ? (function (name, fn) {
					return function () {
						var temp = this._super;	
						// ��ǰ����ͨ��_super�̳и���
						this._super = _super[name];
						//�̳з���ִ����Ϻ�ԭ
						var ret = fn.apply(this, arguments);
						this._super = temp;

						return ret;
					}
				})(name, prop[name]) : prop[name];
		}
		
		//��ʵ��constructor
		function $Class () {
			if (!initializing && this.init) {
				this.init.apply(this, arguments);
			}
		}
		$Class.prototype = prototype;
		$Class.constructor = $Class;
		$Class.extend = arguments.callee;

		return $Class;
	}
	
	Leta.extend({ $Class : $Class });

})(Leta)
