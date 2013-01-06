/** 
* 工具面板的js
*
* @module fan1xia
* @submodule index
* @author 颜海镜
* @version 2012-09-29 15:20:04
*/
(function($, window){
	'use strict';
	
	var images = [],
		Fan1xia = function(){};
	
	//初始化图片数组
	images = ['Alien 1.bmp',
		'Alien 2.bmp',
		'Balloon.bmp',
		'Bear.bmp',
		'Beaver.bmp',
		'Birthday Cake.bmp',
		'Chocolate Cake.bmp',
		'Da Vinci.bmp',
		'Dragon.bmp',
		'Earth.bmp',
		'Fireworks 1.bmp',
		'Fireworks 2.bmp',
		'Fish.bmp',
		'Frog 1.bmp',
		'Frog 2.bmp',
		'Hand.bmp',
		'Hitchcock.bmp',
		'Leaf.bmp',
		'Monkey 1.bmp',
		'Monkey 2.bmp',
		'Moon.bmp',
		'Owl.bmp',
		'Party Hat.bmp',
		'Penguin.bmp',
		'Rabbit.bmp',
		'Rose.bmp',
		'Shamrock.bmp',
		'Sun.bmp',
		'Women.bmp'
	];
	
	/**
	* 翻一下类
	* @class Fan1xia
	* @constructor
	* @extends window.fan1xia.prototype
	* @namespace window.Fan1xia
	*/
	Fan1xia = function(){
		
	};
	
	/**
	* Fan1xia构造函数的原型对象
	*
	* @class Fan1xia.prototype
	*/
	Fan1xia.prototype = {
		/**
		 * 初始化
		 * @method init 
		 */
		init:function(){
			this.bindClickEvent();//初始化点击事件
		},
		/**
		 * 绑定单击事件
		 * @event bindClickEvent 
		 */
		bindClickEvent:function(){
			var 
				$table = $('#canvas table');
			
			//绑定图片的点击事件	
			$table.delegate('img', 'click', function(e){
				$(this).rotate3Di(90, 300, {complete:function(){
						$(this).addClass('test').html("123").rotate3Di(-90);
						$(this).rotate3Di(0, 500);
					}
				});
			});
		},
		
		/**
		 * 初始化图象的路径 
		 * @method initImagesSrc
		 * @return {Array} imgSrc 初始化完的图片路径数组
		 */
		initImagesSrc:function(){
			var
				imgSrc = [],
				i = 0,
				len = images.length;
				
			for(i; i < len; i = i + 1){
				imgSrc[i] = './images/' + images[i];
			}
			
			return imgSrc;
		},
		
		/**
		 * 载入图片对象
		 * @method loadImages
		 * @param {Array} imgSrcs 图片路径数组
		 * @return {Array} imgs 图片对象
		 */
		loadImages:function(imgSrcs){
			var 
				imgs = [],
				i = 0,
				len = imgSrcs.length;
				
			for(i; i < len; i = i + 1){
				imgs[i] = new Image();
				imgs[i].src = imgSrcs[i];
			}
			
			return imgs;
		}
	};
	
	$(function(){
		var fan1xia = new Fan1xia();
		fan1xia.init();
	});
}(jQuery, window));
