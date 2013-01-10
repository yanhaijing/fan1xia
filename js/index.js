/** 
* 工具面板的js
*
* @module Fan1xia
* @submodule Index
* @author 颜海镜
* @version 2012-09-29 15:20:04
*/
(function($, window){
	'use strict';
		
	/**
	* 翻一下类
	* @class Index
	* @constructor
	* @extends window.fan1xia.Index.prototype
	* @namespace window.fan1xia
	*/
	var Index = function(){
		
	};
	
	/**
	* Fan1xia构造函数的原型对象
	*
	* @class Index.prototype
	*/
	Index.prototype = {
		/**
		 * 初始化
		 * @method init 
		 */
		init:function(){
			var canvas = new window.fan1xia.Canvas();
			this.bindClickEvent();//初始化点击事件
			canvas.init();
		},
		/**
		 * 
		 */
		bindClickEvent:function(){
			//绑定开始界面的事件
			$('#home').delegate('button', 'click', function(e){
				var
					level = parseInt($(this).html(), 10) - 1,
					canvas = new window.fan1xia.Canvas(),
					callback = function(){},
					levels = [];
					
				levels = [{level:2, grad:2},
						{level:4, grad:2},	
						{level:6, grad:4},
						{level:6, grad:2},
						{level:8, grad:16},
						{level:8, grad:8},
						{level:8, grad:4}
				];
				
				//刷新完成回调函数
				callback = function(){
					//刷新画布
					canvas.refresh(levels[level].level, levels[level].grad);
				};
				//旋转出元素
				$('#home').rotate3Di(90, 500, {complete:function(){
					$(this).hide(0, function(){
						$('#wrap').show(0, function(){
							$(this).rotate3Di(-90);
							$('#wrap').rotate3Di(0, 1000, {complete:function(){callback();}});
						});
					});
				}});
			});
		}
	};
	
	window.fan1xia = window.fan1xia || {};
	window.fan1xia.Index = window.fan1xia.Index || Index;
	
	$(function(){
		var index = new window.fan1xia.Index();
		index.init();
	})
}(jQuery, window));
