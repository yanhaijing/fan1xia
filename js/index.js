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
	var Index = function(){},
		Home = function(){},
		Success = function(){},
		Failed = function(){};
	/**
	* 翻一下类
	* @class Index
	* @constructor
	* @extends window.fan1xia.Index.prototype
	* @namespace window.fan1xia
	*/
	Index = function(){
		
	};
	
	/**
	* Fan1xia构造函数的原型对象
	*
	* @class Index.prototype
	*/
	Index.prototype = {
		current:null,
		/**
		 * 初始化
		 * @method init 
		 */
		init:function(){
			var canvas = new window.fan1xia.Canvas(),
			success = new window.fan1xia.Success(),
			failed = new window.fan1xia.Failed();
			
			this.bindClickEvent();//初始化点击事件
			canvas.init();
			
			success.init();
			failed.init();
		},
		/**
		 * 
		 */
		bindClickEvent:function(){
			var that = this;
			//绑定开始界面的事件
			$('#home').delegate('button', 'click', function(e){
				var
					level = parseInt($(this).html(), 10) - 1,
					canvas = new window.fan1xia.Canvas(),
					callback = function(){},
					levels = [];
					
				levels = [{level:2, grad:2},
						{level:4, grad:4},
						{level:4, grad:2},
						{level:6, grad:6},	
						{level:6, grad:4},
						{level:6, grad:2},
						{level:8, grad:16},
						{level:8, grad:8},
						{level:8, grad:4}
				];
				//添加点击效果
				that.current = level;
				$(this).addClass('click');
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
	
	Success.prototype = {
		init:function(){
			this.bindClickEvent();
		},
		
		reset:function(){
			
		},
		
		/**
		 * 胜利处理结果
		 * @method success 
		 */
		success:function(){
			//旋转出元素
			$('#wrap').rotate3Di(-90, 500, {complete:function(){
				$(this).hide(0, function(){
					$('#success').show(0, function(){
						$(this).rotate3Di(90);
						$('#success').rotate3Di(0, 1000, {complete:function(){}});
					});
				});
			}});
		},
		bindClickEvent:function(){
			//绑定再试一次事件
			var $success = $('#success');
			//绑定返回home事件
			$success.delegate('.go-home', 'click', function(e){
				//旋转出元素
				$('#success').rotate3Di(90, 500, {complete:function(){
					$(this).hide(0, function(){
						$('#home').show(0, function(){
							$(this).rotate3Di(-90);
							$('#home').rotate3Di(0, 1000, {complete:function(){}});
						});
					});
				}});
			});
			
			//绑定再试一次事件
			$success.delegate('.try-again', 'click', function(e){
				var
					level = new window.fan1xia.Index().current,
					canvas = new window.fan1xia.Canvas(),
					callback = function(){},
					levels = [];
					
				levels = [{level:2, grad:2},
						{level:4, grad:4},
						{level:4, grad:2},
						{level:6, grad:6},	
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
				$('#success').rotate3Di(90, 500, {complete:function(){
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
	
	Failed.prototype = {
		init:function(){
			this.bindClickEvent();
		},
		
		reset:function(){
			
		},
		
		/**
		 * 胜利处理结果
		 * @method success 
		 */
		fail:function(){
			//旋转出元素
				$('#wrap').rotate3Di(-90, 500, {complete:function(){
					$(this).hide(0, function(){
						$('#failed').show(0, function(){
							$(this).rotate3Di(90);
							$('#failed').rotate3Di(0, 1000, {complete:function(){}});
						});
					});
				}});
		},
		bindClickEvent:function(){
			//绑定再试一次事件
			var $failed = $('#failed');
			//绑定返回home事件
			$failed.delegate('.go-home', 'click', function(e){
				//旋转出元素
				$('#failed').rotate3Di(90, 500, {complete:function(){
					$(this).hide(0, function(){
						$('#home').show(0, function(){
							$(this).rotate3Di(-90);
							$('#home').rotate3Di(0, 1000, {complete:function(){}});
						});
					});
				}});
			});
			
			//绑定再试一次事件
			$failed.delegate('.try-again', 'click', function(e){
				var
					level = new window.fan1xia.Index().current,
					canvas = new window.fan1xia.Canvas(),
					callback = function(){},
					levels = [];
					
				levels = [{level:2, grad:2},
						{level:4, grad:4},
						{level:4, grad:2},
						{level:6, grad:6},	
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
				$('#failed').rotate3Di(90, 500, {complete:function(){
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
	
	window.fan1xia = window.fan1xia || {};
	window.fan1xia.Failed = window.fan1xia.Failed || Failed;
	
	window.fan1xia = window.fan1xia || {};
	window.fan1xia.Success = window.fan1xia.Success || Success;
	$(function(){
		var index = new window.fan1xia.Index();
		index.init();
	})
}(jQuery, window));
