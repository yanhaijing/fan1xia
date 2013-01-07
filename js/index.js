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
		}
		
	};
	
	window.fan1xia = window.fan1xia || {};
	window.fan1xia.Index = window.fan1xia.Index || Index;
}(jQuery, window));
