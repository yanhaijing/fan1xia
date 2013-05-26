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
	
	/**
	* Images构造函数的原型对象
	*
	* @class Images.prototype
	*/
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
				'Sun.bmp',
				'Women.bmp',
				'get.gif',
				'panda.gif',
				'elephant.gif',
				'haitun.gif'
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
				imgsDom[i] = _$('<img src="./images/Shamrock.bmp" rel="' + images[i].src + '">');
			}
			
			return imgsDom;
		},
		
		/**
		 * 随即生成函数
		 * @method randowmImages
		 * @param {Number} num 生成的数量
		 * @param {Array} imagesDom 图片dom数组
		 * @return {Array} images 生成的数组
		 */
		randomImages:function(num, imagesDom){
			var i = 0,
			randomNext = function(){},
			random = Math.random,
			results = [],
			imgSrcs = [],
			imageObjs = [],
			imageDoms = [],
			temps = [],
			len = imagesDom.length;
			
			//深拷贝
			for(i=0; i<len; i++){
				temps[i] = imagesDom[i];
			}
			
			//生成下一个随机数
			randomNext = function(){
				var len=temps.length,
				index = 0;
				while(temps[index] === null){
					index=Math.floor(Math.random()*len);
				}
				
				temps[index] = null;
				return index;//返回index的值
			};
			
			//判断是否有imageDom参数没有自己创建
			if(imagesDom === undefined){
				imgSrcs = this.initImagesSrc();
				imageObjs = this.loadImages(imgSrcs);
				imageDoms = this.createImagesDom(imageObjs);
				
				imagesDom = imageDoms;
			}
			
			for(i = 0; i < num; i = i + 1){
				results[i] = imagesDom[randomNext()];
			}
			
			return results;
		},
		
		/**
		 * 扩展images数组
		 * @method expendImages
		 * @param {Number} grad 梯度
		 * @return {Array} results 返回的结果数组
		 */
		expendImages:function(images, grad){
			var i = 0,
			results = [],
			len = images.length,
			j = 0,
			temp = [],
			_$ = $;
			for(i; i < len; i = i + 1){
				for(j = 0; j < grad; j = j + 1){
					temp[i*grad + j] = _$('<img src="' + images[i].attr('src') + '" rel="' + images[i].attr('rel')+ '">');
					results.push(temp[i*grad + j]);
				}
			}
			
			return results;
		},
		
		/*
		 * 初始化数组dom对象
		 * @method initImages
		 * @param {num} count 总数
		 * @param {num} grad 有多少个元素相同
		 * @return {Array} results 生成随机的数组
		 */
		initImages:function(count, grad){
			var results = [],
				imgSrcs = [],
				imageObjs = [],
				imageDoms = [],
				num = count / grad,
				expendDoms = [],
				randomDoms = [];
			
			//初始化src对象	
			imgSrcs = this.initImagesSrc();
			//载入image对象
			imageObjs = this.loadImages(imgSrcs);
			//创建doms对象
			imageDoms = this.createImagesDom(imageObjs);
			
			//随机取图象
			randomDoms = this.randomImages(num, imageDoms);
			//扩展图象
			
			expendDoms = this.expendImages(randomDoms, grad);
			
			//随机排列图象
			expendDoms = this.randomImages(expendDoms.length, expendDoms);
			
			return expendDoms;
		}
	};
	
	window.fan1xia = window.fan1xia || {};
	window.fan1xia.model = window.fan1xia.model || {};
	window.fan1xia.model.Images = Images;
}(jQuery, window));
