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
	var Canvas = function(){
		
	};
	
	Canvas.prototype = {
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
	};
}(jQuery, window));
