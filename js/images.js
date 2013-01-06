/** 
* 图片组对象
*
* @module Fan1xia
* @submodule Images
* @author 颜海镜
* @version 2012-09-29 15:20:04
*/
(function($, window){
	'use strict';
	
	/**
	* 图片类类
	* @class Images
	* @constructor
	* @extends window.fan1xia.Images.prototype
	* @namespace window.fan1xia
	*/
	var Images = function(){
		
	};
	Images.prototype = {
		images:['Alien 1.bmp',
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
			],
			
		/**
		 * 初始化图象的路径 
		 * @method initImagesSrc
		 * @return {Array} imgSrc 初始化完的图片路径数组
		 */
		initImagesSrc:function(){
			var
				imgSrc = [],
				i = 0,
				images = this.images,
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
		},
		
		/*
		 * 创建图片dom节点
		 * @method createImagesDom
		 * @param {Array} images 图象的数组
		 * @return {Array} imgsDom 图象的dom节点数组
		 */
		createImagesDom:function(images){
			var
				imgsDom = [],
				i = 0,
				len = images.length,
				_$ = $;
				
			for(i; i < len; i = i + 1){
				imgsDom[i] = _$('<img src="' + images[i].src + '">');
			}
			
			return imgsDom;
		}
	};
	
	window.fan1xia = window.fan1xia || {};
	window.fan1xia.Images = window.fan1xia.Images || Images;
}(jQuery, window));
