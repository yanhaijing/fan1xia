// JavaScript Document
//颜海镜UI3.0版
//完成功能传入jquery对象能显示或隐藏jquery对象
(function($){
	$.fn.extend({
		/**
			@date:2012年7月20日 
			@function:从上方将对象从下向上滑起
			@arguments：speed:动画的时间|callBack:回调函数
			@return:元素集合
		*/	
		yanUpSlideUp:function(speed, callBack){
			callBack = callBack || function(){};
			speed = speed || "slow";
				
			return this.each(function(){
				$(this).slideUp(speed, callBack);
			});
		},
		
		/**
			@date:2012年7月20日 
			@function:从上方将对象滑出
			@arguments：speed:动画的时间|callBack:回调函数
			@return:元素集合
		*/	
		yanUpSlideDown:function(speed, callBack){
			callBack = callBack || function(){};
			speed = speed || "slow";
				
			return this.each(function(){
				$(this).slideDown(speed, callBack);
			});
		},
		
		/**
			@date:2012年7月20日 
			@function:从下方将对象滑出
			@arguments：speed:动画的时间，默认值：slow
			|callBack:回调函数，default：null
			|positon向下滑动的参照对象，default：动画元素的父元素
			@return:元素集合
		*/	
		yanDownSlideUp:function(speed, callBack, position){
			return this.each(function(){
				position = position || this.parentNode;//当前元素的参照对象
				callBack = callBack || function(){};
				speed = speed || "slow";
				var _this = this;
				
				var pPosition = position.style.position || "";//保存参照对象原始位置信息
				($(position).css("position") == "static") ? $(position).css({position:"relative"}) : 1;//将参照对象的定位改为相对定位
				
				var thisPosition = this.style.position || "";//保留当前对象的定位信息
				($(this).css("position") == "static") ? $(this).css({position:"absolute"}) : 1;//将当前对象的定位改为相对定位
				//保留高度
				var hHeight = this.style.height || "";
				var hMarginTop = this.style.marginTop || "";
				var hMarginBottom = this.style.marginBottom || "";
				var hPaddingTop = this.style.paddingTop || "";
				var hPaddingBottom = this.style.paddingBottom || "";
				var hTop = this.style.top || "";
				
				//获取高度
				var height = parseInt($(this).css("height") || 0);
				var marginTop = parseInt($(this).css("margin-top") || 0);
				var marginBottom = parseInt($(this).css("margin-bottom") || 0);
				var paddingTop = parseInt($(this).css("padding-top") || 0);
				var paddingBottom = parseInt($(this).css("padding-bottom") || 0);
				var borderTop = parseInt($(this).css("border-top-width") || 0);
				var borderBottom = parseInt($(this).css("border-bottom-width") || 0);
				
				var thisPositionTop = height + marginTop + marginBottom + paddingTop + paddingBottom + borderTop + borderBottom;
				
				//初始化元素的各个高度为零
				$(this).css({height:"0px", marginTop:"0px", marginBottom:"0xp", paddingTop:"0px", paddingBottom:"0px", display:"block", top:thisPositionTop + "px"});
				$(this).animate({height:height + "px", marginTop:marginTop + "px", marginBottom:marginBottom + "px", paddingTop:paddingTop + "px", paddingBottom:paddingBottom + "px", top:"0px"}, speed, function(){
						//回复元素属性
						$(_this).css({position:thisPosition, height:hHeight, marginTop:hMarginTop, marginBottom:hMarginBottom, paddingTop:hPaddingTop, paddingBottom:hPaddingBottom, top:hTop});
						$(position).css({position:pPosition});
						callBack();
					});
			});
		},
		
		/**
			@date:2012年7月20日 
			@function:从下方将对象收起
			@arguments：speed:动画的时间，默认值：slow
			|callBack:回调函数，default：null
			|positon向下滑动的参照对象，default：动画元素的父元素
			@return:元素集合
		*/	
		yanDownSlideDown:function(speed, callBack, position){
			return this.each(function(){
				position = position || this.parentNode;//当前元素的参照对象
				callBack = callBack || function(){};
				speed = speed || "slow";
				var _this = this;
				
				var pPosition = position.style.position || "";//保存参照对象原始位置信息
				($(position).css("position") == "static") ? $(position).css({position:"relative"}) : 1;//将参照对象的定位改为相对定位
				
				var thisPosition = this.style.position || "";//保留当前对象的定位信息
				($(this).css("position") == "static") ? $(this).css({position:"absolute"}) : 1;//将当前对象的定位改为相对定位
				//保留高度
				var hHeight = this.style.height || "";
				var hMarginTop = this.style.marginTop || "";
				var hMarginBottom = this.style.marginBottom || "";
				var hPaddingTop = this.style.paddingTop || "";
				var hPaddingBottom = this.style.paddingBottom || "";
				var hTop = this.style.top || "";
				
				//获取高度
				var height = parseInt($(this).css("height") || 0);
				var marginTop = parseInt($(this).css("margin-top") || 0);
				var marginBottom = parseInt($(this).css("margin-bottom") || 0);
				var paddingTop = parseInt($(this).css("padding-top") || 0);
				var paddingBottom = parseInt($(this).css("padding-bottom") || 0);
				var borderTop = parseInt($(this).css("border-top-width") || 0);
				var borderBottom = parseInt($(this).css("border-bottom-width") || 0);
				
				var thisPositionTop = height + marginTop + marginBottom + paddingTop + paddingBottom + borderTop + borderBottom;
				
				//初始化元素的各个高度为零
				$(this).css({height:height, marginTop:marginTop, marginBottom:marginBottom, paddingTop:paddingTop, paddingBottom:paddingBottom, display:"block", top:$(this).css("top")});
				$(this).animate({height:"0px", marginTop:"0px", marginBottom:"0px", paddingTop:"0px", paddingBottom:"0px", top:thisPositionTop + "px"}, speed, function(){
						//回复元素属性
						$(_this).css({display:"none", position:thisPosition, height:hHeight, marginTop:hMarginTop, marginBottom:hMarginBottom, paddingTop:hPaddingTop, paddingBottom:hPaddingBottom, top:hTop});
						$(position).css({position:pPosition});
						callBack();
					});
			});
		},
		
		/**
			@date:2012年7月20日 
			@function:从左方将对象向左滑起
			@arguments：speed:动画的时间|callBack:回调函数
			@return:元素集合
		*/	
		yanLeftSlideLeft:function(speed, callBack){
			callBack = callBack || function(){};
			speed = speed || "slow";
				
			return this.each(function(){
				var _this = this;
				//保留高度
				var hWidth = this.style.width || "";
				var hMarginLeft = this.style.marginLeft || "";
				var hMarginRight = this.style.marginRight || "";
				var hPaddingLeft = this.style.paddingLeft || "";
				var hPaddingRight = this.style.paddingRight || "";
				
				$(this).css({display:"block"});//初始化元素的属性
				
				$(this).animate({width:"0px", marginLeft:"0px", marginRight:"0px", paddingLeft:"0px", paddingRight:"0px"}, speed, function(){
					$(_this).css({display:"none", marginLeft:hMarginLeft, marginRight:hMarginRight, paddingLeft:hPaddingLeft, paddingRight:hPaddingRight, width:hWidth});
					callBack();
				});
			});
		},
		
		/**
			@date:2012年7月20日 
			@function:从左方将对象向右滑出
			@arguments：speed:动画的时间|callBack:回调函数
			@return:元素集合
		*/	
		yanLeftSlideRight:function(speed, callBack){
			callBack = callBack || function(){};
			speed = speed || "slow";
				
			return this.each(function(){
				var _this = this;
				//保留高度
				var hWidth = this.style.width || "";
				var hMarginLeft = this.style.marginLeft || "";
				var hMarginRight = this.style.marginRight || "";
				var hPaddingLeft = this.style.paddingLeft || "";
				var hPaddingRight = this.style.paddingRight || "";
				
				//获取高度
				var width = parseInt($(this).css("width") || 0);
				var marginLeft = parseInt($(this).css("margin-left") || 0);
				var marginRight = parseInt($(this).css("margin-right") || 0);
				var paddingLeft = parseInt($(this).css("padding-left") || 0);
				var paddingRight = parseInt($(this).css("padding-right") || 0);
				
				$(this).css({width:"0px", marginLeft:"0px", marginRight:"0px", paddingLeft:"0px", paddingRight:"0px", display:"block"});//初始化元素的属性
				
				$(this).animate({width:width, marginLeft:marginLeft, marginRight:marginRight, paddingLeft:paddingLeft, paddingRight:paddingRight}, speed, function(){
					$(_this).css({marginLeft:hMarginLeft, marginRight:hMarginRight, paddingLeft:hPaddingLeft, paddingRight:hPaddingRight, width:hWidth});
					callBack();
				});
			});
		},
		
		/**
			@date:2012年7月20日 
			@function:从右方将对象向左滑出
			@arguments：speed:动画的时间|callBack:回调函数|position：参照对象
			@return:元素集合
		*/	
		yanRightSlideLeft:function(speed, callBack, position){
			return this.each(function(){
				position = position || this.parentNode;//当前元素的参照对象
				callBack = callBack || function(){};
				speed = speed || "slow";
				var _this = this;
				
				var pPosition = position.style.position || "";//保存参照对象原始位置信息
				($(position).css("position") == "static") ? $(position).css({position:"relative"}) : 1;//将参照对象的定位改为相对定位
				
				var thisPosition = this.style.position || "";//保留当前对象的定位信息
				($(this).css("position") == "static") ? $(this).css({position:"absolute"}) : 1;//将当前对象的定位改为相对定位
				
				//保留高度
				var hWidth = this.style.width || "";
				var hMarginLeft = this.style.marginLeft || "";
				var hMarginRight = this.style.marginRight || "";
				var hPaddingLeft = this.style.paddingLeft || "";
				var hPaddingRight = this.style.paddingRight || "";
				var hLeft = this.style.left || "";
				var hTop = this.style.top || "";
				
				//获取高度
				var width = parseInt($(this).css("width") || 0);
				var marginLeft = parseInt($(this).css("margin-left") || 0);
				var marginRight = parseInt($(this).css("margin-right") || 0);
				var paddingLeft = parseInt($(this).css("padding-left") || 0);
				var paddingRight = parseInt($(this).css("padding-right") || 0);
				var borderLeft = parseInt($(this).css("border-left-width") || 0);
				var borderRight = parseInt($(this).css("border-right-width") || 0);				
				var thisPositionLeft = width + marginLeft + marginRight + paddingLeft + paddingRight + borderLeft + borderRight;
				
				$(this).css({left:thisPositionLeft, top:0, width:"0px", marginLeft:"0px", marginRight:"0px", paddingLeft:"0px", paddingRight:"0px", display:"block"});//初始化元素的属性
				
				$(this).animate({width:width, marginLeft:marginLeft, marginRight:marginRight, paddingLeft:paddingLeft, paddingRight:paddingRight, left:"0px"}, speed, function(){
					//回复元素的属性
					$(_this).css({position:thisPosition, top:hTop, marginLeft:hMarginLeft, marginRight:hMarginRight, paddingLeft:hPaddingLeft, paddingRight:hPaddingRight, width:hWidth, left:hLeft});
					$(position).css({position:pPosition});
					callBack();
				});
			});
		},
		
		/**
			@date:2012年7月20日 
			@function:从右方将对象向右滑起
			@arguments：speed:动画的时间|callBack:回调函数|position：参照对象
			@return:元素集合
		*/	
		yanRightSlideRight:function(speed, callBack, position){
			return this.each(function(){
				position = position || this.parentNode;//当前元素的参照对象
				callBack = callBack || function(){};
				speed = speed || "slow";
				var _this = this;
				
				var pPosition = position.style.position || "";//保存参照对象原始位置信息
				($(position).css("position") == "static") ? $(position).css({position:"relative"}) : 1;//将参照对象的定位改为相对定位
				
				var thisPosition = this.style.position || "";//保留当前对象的定位信息
				($(this).css("position") == "static") ? $(this).css({position:"absolute"}) : 1;//将当前对象的定位改为相对定位
				
				//保留高度
				var hWidth = this.style.width || "";
				var hMarginLeft = this.style.marginLeft || "";
				var hMarginRight = this.style.marginRight || "";
				var hPaddingLeft = this.style.paddingLeft || "";
				var hPaddingRight = this.style.paddingRight || "";
				var hLeft = this.style.left || "";
				var hTop = this.style.top || "";
				
				//获取高度
				var width = parseInt($(this).css("width") || 0);
				var marginLeft = parseInt($(this).css("margin-left") || 0);
				var marginRight = parseInt($(this).css("margin-right") || 0);
				var paddingLeft = parseInt($(this).css("padding-left") || 0);
				var paddingRight = parseInt($(this).css("padding-right") || 0);
				var borderLeft = parseInt($(this).css("border-left-width") || 0);
				var borderRight = parseInt($(this).css("border-right-width") || 0);				
				var thisPositionLeft = width + marginLeft + marginRight + paddingLeft + paddingRight + borderLeft + borderRight;
				
				$(this).css({left:"0px", top:0, display:"block"});//初始化元素的属性
				
				$(this).animate({width:"0px", marginLeft:"0px", marginRight:"0px", paddingLeft:"0px", paddingRight:"0px", left:thisPositionLeft}, speed, function(){
					//回复元素的属性
					$(_this).css({display:"none", position:thisPosition, marginLeft:hMarginLeft, marginRight:hMarginRight, paddingLeft:hPaddingLeft, paddingRight:hPaddingRight, width:hWidth, left:hLeft, top:hTop});
					$(position).css({position:pPosition});
					callBack();
				});
			});
		},
		
		/**
			@date:2012年7月20日 
			@function:水平方向从两端相中间滑起
			@arguments：speed:动画的时间|callBack:回调函数|position：参照对象
			@return:元素集合
		*/	
		yanHorSlideCenter:function(speed, callBack, position){
			return this.each(function(){
				position = position || this.parentNode;//当前元素的参照对象
				callBack = callBack || function(){};
				speed = speed || "slow";
				var _this = this;
				
				var pPosition = position.style.position || "";//保存参照对象原始位置信息
				($(position).css("position") == "static") ? $(position).css({position:"relative"}) : 1;//将参照对象的定位改为相对定位
				
				var thisPosition = this.style.position || "";//保留当前对象的定位信息
				($(this).css("position") == "static") ? $(this).css({position:"absolute"}) : 1;//将当前对象的定位改为相对定位
				
				//保留高度
				var hWidth = this.style.width || "";
				var hMarginLeft = this.style.marginLeft || "";
				var hMarginRight = this.style.marginRight || "";
				var hPaddingLeft = this.style.paddingLeft || "";
				var hPaddingRight = this.style.paddingRight || "";
				var hLeft = this.style.left || "";
				
				//获取高度
				var width = parseInt($(this).css("width") || 0);
				var marginLeft = parseInt($(this).css("margin-left") || 0);
				var marginRight = parseInt($(this).css("margin-right") || 0);
				var paddingLeft = parseInt($(this).css("padding-left") || 0);
				var paddingRight = parseInt($(this).css("padding-right") || 0);
				var borderLeft = parseInt($(this).css("border-left-width") || 0);
				var borderRight = parseInt($(this).css("border-right-width") || 0);				
				var thisOuterWidth = width + marginLeft + marginRight + paddingLeft + paddingRight;
				
				$(this).css({left:"0px", width:width, marginLeft:marginLeft, marginRight:marginRight, paddingLeft:paddingLeft, paddingRight:paddingRight, display:"block"});//初始化元素的属性
				
				$(this).animate({width:"0px", marginLeft:"0px", marginRight:"0px", paddingLeft:"0px", paddingRight:"0px", left:thisOuterWidth / 2 + "px"}, speed, function(){
					//回复元素的属性
					$(_this).css({display:"none", position:thisPosition, marginLeft:hMarginLeft, marginRight:hMarginRight, paddingLeft:hPaddingLeft, paddingRight:hPaddingRight, width:hWidth, left:hLeft});
					$(position).css({position:pPosition});
					callBack();
				});
			});
		},
		
		/**
			@date:2012年7月20日 
			@function:水平方向，中间想两端散开
			@arguments：speed:动画的时间|callBack:回调函数|position：参照对象
			@return:元素集合
		*/	
		yanHorSlideSide:function(speed, callBack, position){
			return this.each(function(){
				position = position || this.parentNode;//当前元素的参照对象
				callBack = callBack || function(){};
				speed = speed || "slow";
				var _this = this;
				
				var pPosition = position.style.position || "";//保存参照对象原始位置信息
				($(position).css("position") == "static") ? $(position).css({position:"relative"}) : 1;//将参照对象的定位改为相对定位
				
				var thisPosition = this.style.position || "";//保留当前对象的定位信息
				($(this).css("position") == "static") ? $(this).css({position:"absolute"}) : 1;//将当前对象的定位改为相对定位
				
				//保留高度
				var hWidth = this.style.width || "";
				var hMarginLeft = this.style.marginLeft || "";
				var hMarginRight = this.style.marginRight || "";
				var hPaddingLeft = this.style.paddingLeft || "";
				var hPaddingRight = this.style.paddingRight || "";
				var hLeft = this.style.left || "";
				
				//获取高度
				var width = parseInt($(this).css("width") || 0);
				var marginLeft = parseInt($(this).css("margin-left") || 0);
				var marginRight = parseInt($(this).css("margin-right") || 0);
				var paddingLeft = parseInt($(this).css("padding-left") || 0);
				var paddingRight = parseInt($(this).css("padding-right") || 0);
				var borderLeft = parseInt($(this).css("border-left-width") || 0);
				var borderRight = parseInt($(this).css("border-right-width") || 0);				
				var thisOuterWidth = width + marginLeft + marginRight + paddingLeft + paddingRight;
				
				$(this).css({left:thisOuterWidth / 2 + "px", width:"0px", marginLeft:"0px", marginRight:"0px", paddingLeft:"0px", paddingRight:"0px", display:"block"});//初始化元素的属性
				
				$(this).animate({width:width, marginLeft:marginLeft, marginRight:marginRight, paddingLeft:paddingLeft, paddingRight:paddingRight, left:"0px"}, speed, function(){
					//回复元素的属性
					$(_this).css({position:thisPosition, marginLeft:hMarginLeft, marginRight:hMarginRight, paddingLeft:hPaddingLeft, paddingRight:hPaddingRight, width:hWidth, left:hLeft});
					$(position).css({position:pPosition});
					callBack();
				});
			});
		},
		
		/**
			@date:2012年7月20日 
			@function:竖直方向从两端相中间滑起
			@arguments：speed:动画的时间|callBack:回调函数|position：参照对象
			@return:元素集合
		*/	
		yanVerSlideCenter:function(speed, callBack, position){
			return this.each(function(){
				position = position || this.parentNode;//当前元素的参照对象
				callBack = callBack || function(){};
				speed = speed || "slow";
				var _this = this;
				
				var pPosition = position.style.position || "";//保存参照对象原始位置信息
				($(position).css("position") == "static") ? $(position).css({position:"relative"}) : 1;//将参照对象的定位改为相对定位
				
				var thisPosition = this.style.position || "";//保留当前对象的定位信息
				($(this).css("position") == "static") ? $(this).css({position:"absolute"}) : 1;//将当前对象的定位改为相对定位
				
				//保留高度
				var hHeight = this.style.height || "";
				var hMarginTop = this.style.marginTop || "";
				var hMarginBottom = this.style.marginBottom || "";
				var hPaddingTop = this.style.paddingTop || "";
				var hPaddingBottom = this.style.paddingBottom || "";
				var hTop = this.style.top || "";
				
				//获取高度
				var height = parseInt($(this).css("height") || 0);
				var marginTop = parseInt($(this).css("margin-top") || 0);
				var marginBottom = parseInt($(this).css("margin-bottom") || 0);
				var paddingTop = parseInt($(this).css("padding-top") || 0);
				var paddingBottom = parseInt($(this).css("padding-bottom") || 0);
				var borderTop = parseInt($(this).css("border-top-width") || 0);
				var borderBottom = parseInt($(this).css("border-bottom-width") || 0);			
				var thisOuterHeight = height + marginTop + marginBottom + paddingTop + paddingBottom;
				
				$(this).css({top:"0px", height:height, marginTop:marginTop, marginBottom:marginBottom, paddingTop:paddingTop, paddingBottom:paddingBottom, display:"block"});//初始化元素的属性
				
				$(this).animate({height:"0px", marginTop:"0px", marginBottom:"0px", paddingTop:"0px", paddingBottom:"0px", top:thisOuterHeight / 2 + "px"}, speed, function(){
					//回复元素的属性
					$(_this).css({display:"none", position:thisPosition, marginTop:hMarginTop, marginBottom:hMarginBottom, paddingTop:hPaddingTop, paddingBottom:hPaddingBottom, height:hHeight, top:hTop});
					$(position).css({position:pPosition});
					callBack();
				});
			});
		},
		
		/**
			@date:2012年7月20日 
			@function:竖直平方向，中间想两端散开
			@arguments：speed:动画的时间|callBack:回调函数|position：参照对象
			@return:元素集合
		*/	
		yanVerSlideSide:function(speed, callBack, position){
			return this.each(function(){
				position = position || this.parentNode;//当前元素的参照对象
				callBack = callBack || function(){};
				speed = speed || "slow";
				var _this = this;
				
				var pPosition = position.style.position || "";//保存参照对象原始位置信息
				($(position).css("position") == "static") ? $(position).css({position:"relative"}) : 1;//将参照对象的定位改为相对定位
				
				var thisPosition = this.style.position || "";//保留当前对象的定位信息
				($(this).css("position") == "static") ? $(this).css({position:"absolute"}) : 1;//将当前对象的定位改为相对定位
				
				//保留高度
				var hHeight = this.style.height || "";
				var hMarginTop = this.style.marginTop || "";
				var hMarginBottom = this.style.marginBottom || "";
				var hPaddingTop = this.style.paddingTop || "";
				var hPaddingBottom = this.style.paddingBottom || "";
				var hTop = this.style.top || "";
				
				//获取高度
				var height = parseInt($(this).css("height") || 0);
				var marginTop = parseInt($(this).css("margin-top") || 0);
				var marginBottom = parseInt($(this).css("margin-bottom") || 0);
				var paddingTop = parseInt($(this).css("padding-top") || 0);
				var paddingBottom = parseInt($(this).css("padding-bottom") || 0);
				var borderTop = parseInt($(this).css("border-top-width") || 0);
				var borderBottom = parseInt($(this).css("border-bottom-width") || 0);			
				var thisOuterHeight = height + marginTop + marginBottom + paddingTop + paddingBottom;
				
				$(this).css({top:thisOuterHeight / 2 + "px", height:"0px", marginTop:"0px", marginBottom:"0px", paddingTop:"0px", paddingBottom:"0px", display:"block"});//初始化元素的属性
				
				$(this).animate({height:height, marginTop:marginTop, marginBottom:marginBottom, paddingTop:paddingTop, paddingBottom:paddingBottom, top:"0px"}, speed, function(){
					//回复元素的属性
					$(_this).css({position:thisPosition, marginTop:hMarginTop, marginBottom:hMarginBottom, paddingTop:hPaddingTop, paddingBottom:hPaddingBottom, height:hHeight, top:hTop});
					$(position).css({position:pPosition});
					callBack();
				});
			});
		},
		
		/**
			@date:2012年7月20日 
			@function:向中央滑起
			@arguments：speed:动画的时间|callBack:回调函数|position：参照对象
			@return:元素集合
		*/	
		yanVhSlideCenter:function(speed, callBack, position){
			return this.each(function(){
				position = position || this.parentNode;//当前元素的参照对象
				callBack = callBack || function(){};
				speed = speed || "slow";
				var _this = this;
				
				var pPosition = position.style.position || "";//保存参照对象原始位置信息
				($(position).css("position") == "static") ? $(position).css({position:"relative"}) : 1;//将参照对象的定位改为相对定位
				
				var thisPosition = this.style.position || "";//保留当前对象的定位信息
				($(this).css("position") == "static") ? $(this).css({position:"absolute"}) : 1;//将当前对象的定位改为相对定位
				
				//保留宽度
				var hWidth = this.style.width || "";
				var hMarginLeft = this.style.marginLeft || "";
				var hMarginRight = this.style.marginRight || "";
				var hPaddingLeft = this.style.paddingLeft || "";
				var hPaddingRight = this.style.paddingRight || "";
				var hLeft = this.style.left || "";
				
				//获取宽度
				var width = parseInt($(this).css("width") || 0);
				var marginLeft = parseInt($(this).css("margin-left") || 0);
				var marginRight = parseInt($(this).css("margin-right") || 0);
				var paddingLeft = parseInt($(this).css("padding-left") || 0);
				var paddingRight = parseInt($(this).css("padding-right") || 0);
				var borderLeft = parseInt($(this).css("border-left-width") || 0);
				var borderRight = parseInt($(this).css("border-right-width") || 0);				
				var thisOuterWidth = width + marginLeft + marginRight + paddingLeft + paddingRight;
				
				//保留高度
				var hHeight = this.style.height || "";
				var hMarginTop = this.style.marginTop || "";
				var hMarginBottom = this.style.marginBottom || "";
				var hPaddingTop = this.style.paddingTop || "";
				var hPaddingBottom = this.style.paddingBottom || "";
				var hTop = this.style.top || "";
				
				//获取高度
				var height = parseInt($(this).css("height") || 0);
				var marginTop = parseInt($(this).css("margin-top") || 0);
				var marginBottom = parseInt($(this).css("margin-bottom") || 0);
				var paddingTop = parseInt($(this).css("padding-top") || 0);
				var paddingBottom = parseInt($(this).css("padding-bottom") || 0);
				var borderTop = parseInt($(this).css("border-top-width") || 0);
				var borderBottom = parseInt($(this).css("border-bottom-width") || 0);			
				var thisOuterHeight = height + marginTop + marginBottom + paddingTop + paddingBottom;
				
				$(this).css({left:"0px", width:width, marginLeft:marginLeft, marginRight:marginRight, paddingLeft:paddingLeft, paddingRight:paddingRight, top:"0px", height:height, marginTop:marginTop, marginBottom:marginBottom, paddingTop:paddingTop, paddingBottom:paddingBottom, display:"block"});//初始化元素的属性
				
				$(this).animate({width:"0px", marginLeft:"0px", marginRight:"0px", paddingLeft:"0px", paddingRight:"0px", left:thisOuterWidth / 2 + "px", height:"0px", marginTop:"0px", marginBottom:"0px", paddingTop:"0px", paddingBottom:"0px", top:thisOuterHeight / 2 + "px"}, speed, function(){
					//回复元素的属性
					$(_this).css({display:"none", position:thisPosition, marginTop:hMarginTop, marginBottom:hMarginBottom, paddingTop:hPaddingTop, paddingBottom:hPaddingBottom, height:hHeight, top:hTop, marginLeft:hMarginLeft, marginRight:hMarginRight, paddingLeft:hPaddingLeft, paddingRight:hPaddingRight, width:hWidth, left:hLeft});
					$(position).css({position:pPosition});
					callBack();
				});
			});
		},
		
		/**
			@date:2012年7月20日 
			@function:从中央散开
			@arguments：speed:动画的时间|callBack:回调函数|position：参照对象
			@return:元素集合
		*/	
		yanVhSlideSide:function(speed, callBack, position){
			return this.each(function(){
				position = position || this.parentNode;//当前元素的参照对象
				callBack = callBack || function(){};
				speed = speed || "slow";
				var _this = this;
				
				var pPosition = position.style.position || "";//保存参照对象原始位置信息
				($(position).css("position") == "static") ? $(position).css({position:"relative"}) : 1;//将参照对象的定位改为相对定位
				
				var thisPosition = this.style.position || "";//保留当前对象的定位信息
				($(this).css("position") == "static") ? $(this).css({position:"absolute"}) : 1;//将当前对象的定位改为相对定位
				//保留宽度
				var hWidth = this.style.width || "";
				var hMarginLeft = this.style.marginLeft || "";
				var hMarginRight = this.style.marginRight || "";
				var hPaddingLeft = this.style.paddingLeft || "";
				var hPaddingRight = this.style.paddingRight || "";
				var hLeft = this.style.left || "";
				
				//获取宽度
				var width = parseInt($(this).css("width") || 0);
				var marginLeft = parseInt($(this).css("margin-left") || 0);
				var marginRight = parseInt($(this).css("margin-right") || 0);
				var paddingLeft = parseInt($(this).css("padding-left") || 0);
				var paddingRight = parseInt($(this).css("padding-right") || 0);
				var borderLeft = parseInt($(this).css("border-left-width") || 0);
				var borderRight = parseInt($(this).css("border-right-width") || 0);				
				var thisOuterWidth = width + marginLeft + marginRight + paddingLeft + paddingRight;
				
				//保留高度
				var hHeight = this.style.height || "";
				var hMarginTop = this.style.marginTop || "";
				var hMarginBottom = this.style.marginBottom || "";
				var hPaddingTop = this.style.paddingTop || "";
				var hPaddingBottom = this.style.paddingBottom || "";
				var hTop = this.style.top || "";
				
				//获取高度
				var height = parseInt($(this).css("height") || 0);
				var marginTop = parseInt($(this).css("margin-top") || 0);
				var marginBottom = parseInt($(this).css("margin-bottom") || 0);
				var paddingTop = parseInt($(this).css("padding-top") || 0);
				var paddingBottom = parseInt($(this).css("padding-bottom") || 0);
				var borderTop = parseInt($(this).css("border-top-width") || 0);
				var borderBottom = parseInt($(this).css("border-bottom-width") || 0);			
				var thisOuterHeight = height + marginTop + marginBottom + paddingTop + paddingBottom;
				
				$(this).css({left:thisOuterWidth / 2 + "px", width:"0px", marginLeft:"0px", marginRight:"0px", paddingLeft:"0px", paddingRight:"0px", top:thisOuterHeight / 2 + "px", height:"0px", marginTop:"0px", marginBottom:"0px", paddingTop:"0px", paddingBottom:"0px", display:"block"});//初始化元素的属性
				
				$(this).animate({width:width, marginLeft:marginLeft, marginRight:marginRight, paddingLeft:paddingLeft, paddingRight:paddingRight, left:"0px", height:height, marginTop:marginTop, marginBottom:marginBottom, paddingTop:paddingTop, paddingBottom:paddingBottom, top:"0px"}, speed, function(){
					//回复元素的属性
					$(_this).css({position:thisPosition, marginTop:hMarginTop, marginBottom:hMarginBottom, paddingTop:hPaddingTop, paddingBottom:hPaddingBottom, height:hHeight, top:hTop, marginLeft:hMarginLeft, marginRight:hMarginRight, paddingLeft:hPaddingLeft, paddingRight:hPaddingRight, width:hWidth, left:hLeft});
					$(position).css({position:pPosition});
					callBack();
				});
			});
		},
		
	});
})(jQuery);