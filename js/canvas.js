/** 
* 画布对象
*
* @module Fan1xia
* @submodule Canvas
* @author 颜海镜
* @version 2012-09-29 15:20:04
*/
(function($, window){
	'use strict';
	var Canvas = function(){},
		Timer = function(){};
	/**
	* 图片类类
	* @class Canvas
	* @constructor
	* @extends window.fan1xia.Canvas.prototype
	* @namespace window.fan1xia
	*/
	Canvas = function(){
		
	};
	
	/**
	* Canvas构造函数的原型对象
	*
	* @class Canvas.prototype
	*/
	Canvas.prototype = {
		/**
		 * 初始化
		 * @method init 
		 */
		init:function(){
			this.bindClickEvent();
		},
		
		/**
		 * 刷新画布元素
		 * @method refresh 
		 * @param {Number} level游戏的级别
		 */
		refresh:function(level){
			var images = new window.fan1xia.Images(),
			imgDoms = [];
			//清空元素
			this.reset();
			//加载imagesdom
			images.randomImages((level*level)/2);
			//构造html添加到画布元素
			
		},
		
		/**
		 * 初始化画布元素
		 * @method initCanvas 
		 * @param {Array} imgDoms 
		 */
		initCanvas:function(imgDoms){
			var len = imgDoms.lenght;
		},
		/**
		 * 重置画布
		 * @method reset 
		 */
		reset:function(){
			$('#canvas table').empty();
		},
		
		/**
		 * 绑定单击事件
		 * @event bindClickEvent 
		 */
		bindClickEvent:function(){
			var 
				$table = $('#canvas table'),
				that = this;
			
			//绑定图片的点击事件	
			$table.delegate('img', 'click', function(e){
				that.unclockRotate180($(this), function(){});
			});
		},
		
		/**
		 * 顺时针旋转180度元素 
		 * @method clockRotate180
		 * @param {$object} $obj 旋转的元素
		 * @param {function} callback 回调函数
		 */
		clockRotate180:function($obj, callback){
			$obj.rotate3Di(90, 150, {complete:function(){
				var $this = $(this);
				$this.addClass('front').attr('src', $this.attr('rel')).rotate3Di(-90);
				$this.rotate3Di(0, 150, {complete:function(){callback();}});
			}});
		},
		
		/**
		 * 逆时针时针旋转180度元素 
		 * @method unclockRotate180
		 * @param {$object} $obj 旋转的元素
		 * @param {function} callback 回调函数
		 */
		unclockRotate180:function($obj, callback){
			$obj.rotate3Di(-90, 150, {complete:function(){
				var $this = $(this);
				$this.removeClass('front').attr('src', './images/Shamrock.bmp').rotate3Di(90);
				$this.rotate3Di(0, 150, {complete:function(){callback();}});
			}});
		},
	};
	
	window.fan1xia = window.fan1xia || {};
	window.fan1xia.Canvas = window.fan1xia.Canvas || Canvas;
	
	/**
	* 图片类类
	* @class Timer
	* @constructor
	* @extends window.fan1xia.Timer.prototype
	* @namespace window.fan1xia
	*/
	Timer = function(){};
	
	/**
	* Timer构造函数的原型对象
	*
	* @class Timer.prototype
	*/
	Timer.prototype = {
		/**
		 * 初始化
		 * @method init 
		 */
		init:function(){
			this.setTimer((new Date()).getTime() + 1000*1000);
		},
		
		/**
		 * 复原计时器为零
		 * @method reset 
		 */
		reset:function(){
			$('#time').countdown();
		},
		
		/**
		 * 
		 * @method setTimer
		 * @param {Number} stamp 时间戳
		 * @param {Function} callback 回调函数
		 */
		setTimer:function(stamp, callback){
			$('#time').countdown({
				timestamp	: stamp,
				callback:callback
			});
		}
	};
	
	window.fan1xia = window.fan1xia || {};
	window.fan1xia.Timer = window.fan1xia.Timer || Timer;
	
	$(function(){
		var timer = new Timer();
		timer.init();
		var canvas = new Canvas();
		canvas.init();
	});
}(jQuery, window));
