/** 
* 图片组对象
*
* @module imagesModel
* @namespace fan1xia.model
* @main imagesModel
* @author 颜海镜
* @version 2012-09-29 15:20:04
*/
(function($, window){
	'use strict';
	
	/**
	* 图片类类
	* @class Images
	* @constructor
	* @extends fan1xia.model.Images.prototype
	*/
	var Images = function(){
	    /**
	     * 图片名称数组
	     * @property images
	     * @type Array
	     * @default [...]
	     */
		this.images = ['Alien1.bmp',
                'Alien2.bmp',
                'Balloon.bmp',
                'Bear.bmp',
                'Beaver.bmp',
                'BirthdayCake.bmp',
                'ChocolateCake.bmp',
                'DaVinci.bmp',
                'Dragon.bmp',
                'Earth.bmp',
                'Fireworks1.bmp',
                'Fireworks2.bmp',
                'Fish.bmp',
                'Frog1.bmp',
                'Frog2.bmp',
                'Hand.bmp',
                'Hitchcock.bmp',
                'Leaf.bmp',
                'Monkey1.bmp',
                'Monkey2.bmp',
                'Moon.bmp',
                'Owl.bmp',
                'PartyHat.bmp',
                'Penguin.bmp',
                'Rabbit.bmp',
                'Rose.bmp',
                'Sun.bmp',
                'Women.bmp',
                'get.gif',
                'panda.gif',
                'elephant.gif',
                'haitun.gif'
            ];
        
        /**
         * 图片路径数组
         * @property imagesSrc
         * @type Array
         * @default []
         */    
        this.imagesSrc = [];
        
        /**
         * 图片对象数组
         * @property imgs
         * @type Array
         * @default []
         */
        this.imgs = [];
	};
	
	/**
	* Images构造函数的原型对象
	* @class Images.prototype
	* @static
	*/
	Images.prototype = {
	    /**
         * 初始化
         * @method init 
         */
		init:function(){
		      this.initImagesSrc();//初始化路径
		      this.loadImages(this.getImagesSrc());
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
				images = this.images,
				len = images.length;
				
			for(i; i < len; i = i + 1){
				imgSrc[i] = './images/' + images[i];
			}
			
			$.extend(true, this.imagesSrc, imgSrc);//扩展自身属性
			return imgSrc;
		},
		
		/**
         * 获取图片路径数组
         * @method getImagesSrc
         * @return {Array} 图片路径数组 
         */
		getImagesSrc:function(){
		  return $.extend(true, [], this.imagesSrc);
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
			
			$.extend(true, this.imgs, imgs);//扩展自身属性
			return imgs;
		},
		
		/**
		 * 获取图片对象数组
		 * @method getImageObjs
		 * @return {Array} 图片对象数组
		 */
		getImageObjs:function(){
		      return $.extend(true, [], this.imgs); 
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
		},
		
		/**
         * 获取随机获取的图像dom对象数组
         * @method getImageObjs
         * @return {Array} 随机获取的图像dom对象数组
         */
		getImages:function(count, grad){
		    var 
		          results = [],
                  imageObjs = [],
                  imageDoms = [],
                  num = count / grad,
                  expendDoms = [],
                  randomDoms = [];
            //载入image对象
            imageObjs = this.getImageObjs();
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
