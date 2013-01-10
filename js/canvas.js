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
			this.refresh(4, 4);
		},
		
		/**
		 * 刷新画布元素
		 * @method refresh 
		 * @param {Number} level游戏的级别
		 * @param {Number} grad 游戏单个图象重复的次数
		 */
		refresh:function(level, grad){
			var images = new window.fan1xia.Images(),
			imgDoms = [];
			//清空元素
			this.reset();
			//加载imagesdom
			imgDoms = images.initImages(level*level, grad);
			//构造html添加到画布元素
			this.createHtml(imgDoms, level);
		},
		
		/**
		 * 构造html
		 * @method createHtml
		 * @param {Array} imgDoms 图象dom数组元素
		 * @param {Number} level 级别 
		 */
		createHtml:function(imgDoms, level){
			var 
				_$ = $,
				$tbody = $('#canvas table tbody'),
				len = imgDoms.length,
				i = 0,
				j = 0,
				$tr = [],
				$td = [];
				
			for(i; i<level; i++){
				$tr[i] = _$('<tr></tr>');
				for(j=0; j<level; j++){
					$td[i*level + j] = _$('<td></td>');
					$td[i*level + j].append(imgDoms[i*level + j]);
					$tr[i].append($td[i*level + j]);
				}
				
				$tbody.append($tr[i]);
			}	
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
			$('#canvas table tbody').empty();
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
		}
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
