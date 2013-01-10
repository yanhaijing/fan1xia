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
			this.bindClickEvent();//初始化点击事件
		},
		/**
		 * 
		 */
		bindClickEvent:function(){
			//绑定开始界面的事件
			$('#home').delegate('button', 'click', function(e){
				var
					level = parseInt($(this).html(), 10),
					canvas = new window.fan1xia.Canvas();
				//隐藏home
				$('#home').hide();
				//显示画布
				$('#wrap').show();
				//刷新画布
				canvas.init(level + 1, 2);
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
