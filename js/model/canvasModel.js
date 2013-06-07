/** 
* 画布对象
*
* @module canvasModel
* @namespace fan1xia.model
* @main canvasModel
* @author 颜海镜
* @version 2012-09-29 15:20:04
*/
(function($, window){
	'use strict';
	var Canvas,
		Timer,
		Store,
		Score;
	/**
	* 画布类
	* @class Canvas
	* @constructor
	* @extends fan1xia.model.Canvas.prototype
	*/
	Canvas = function(){
	    /**
	     * 时间对象
	     * @property timer
	     * @type Object
	     * @default null
	     */
		this.timer = null;
		
		/**
         * 分数对象
         * @property score
         * @type Object
         * @default null
         */
		this.score = null;
		
		/**
         * 存数对象
         * @property store
         * @type Object
         * @default null
         */
		this.store = null;
		
		/**
         * 图片对象
         * @property images
         * @type Object
         * @default null
         */
		this.images = null;
		
		/**
         * 声音对象
         * @property sound
         * @type Object
         * @default null
         */
		this.sound = new window.yan.Sound();
	};
	
	/**
	* Canvas构造函数的原型对象
	* @class Canvas.prototype
	* @static
	*/
	Canvas.prototype = {
		/**
		 * 初始化
		 * @method init 
		 */
		init:function(level, grad){
		    var
		        score = new Score(),
                timer = new Timer(),
                store = new Store();
                
            this.score = score;
            this.timer = timer;
            this.store = store;
			this.bindClickEvent();		
			this.images = new window.fan1xia.model.Images();
			this.images.init();	
		},
		
		/**
		 * 刷新画布元素
		 * @method refresh 
		 * @param {Number} level游戏的级别
		 * @param {Number} grad 游戏单个图象重复的次数
		 */
		refresh:function(level, grad){
			var images = this.images,
			imgDoms = [],
			$table = $('#canvas table'),
			score = this.score,
			timer = this.timer,
			store = this.store;

			//收起 散开
			$table.yanVhSlideCenter(0, function(){
				$table.yanVhSlideSide('slow');
			});
			
			//清空元素
			this.reset();
			//加载imagesdom
			imgDoms = images.getImages(level*level, grad);
			//构造html添加到画布元素
			this.createHtml(imgDoms, level);
			//更新分数面板
			score.reset(level);
			
			//更新时钟
			timer.init((new Date()).getTime() + (level*level)*1000 + level*20*1000);
			//更新储物箱
			store.reset();
		},
		
		/**
		 * 构造html
		 * @method createHtml
		 * @param {Array} imgDoms 图象dom数组元素
		 * @param {Number} level 级别 
		 */
		createHtml:function(imgDoms, level){
			var 
				_$ = $,
				$tbody = $('#canvas table tbody'),
				len = imgDoms.length,
				i = 0,
				j = 0,
				$tr = [],
				$td = [];
				
			for(i; i<level; i++){
				$tr[i] = _$('<tr></tr>');
				for(j=0; j<level; j++){
					$td[i*level + j] = _$('<td></td>');
					$td[i*level + j].append(imgDoms[i*level + j]);
					$tr[i].append($td[i*level + j]);
				}
				
				$tbody.append($tr[i]);
			}	
		},
		
		/**
		 * 初始化画布元素
		 * @method initCanvas 
		 * @param {Array} imgDoms 
		 */
		initCanvas:function(imgDoms){
			var len = imgDoms.lenght;
		},
		/**
		 * 重置画布
		 * @method reset 
		 */
		reset:function(){
			var 
			score = this.score,
			timer = this.timer,
			store = this.store;
			
			$('#canvas table tbody').empty();
			score.reset();
			timer.reset();
			store.reset();
		},
		
		/**
		 * 绑定单击事件
		 * @event bindClickEvent 
		 */
		bindClickEvent:function(){
			var 
				$goHome = $('#go-home'),
				$table = $('#canvas table'),
				that = this,
				$preImg = null,
				sound = this.sound,
				score = this.score,
                store = this.store,
				success = function(){},
				failed = function(){},
				first = function(){};
			
			//成功的事件
			success = function($currentImg){
				sound.play('./media/spread.wav');
				$preImg.attr({src:'./images/background.gif', rel:''});
				$currentImg.attr({src:'./images/background.gif', rel:''});
				//更新当前图象
				$preImg = null;
				store.pull();
				//更新已经消除次数
				score.decreaseRemainNumber();
			};	
			
			//失败的事件
			failed = function($currentImg){
				//翻到不相同图象
				that.unclockRotate180($preImg, function(){});
				that.unclockRotate180($currentImg, function(){});
					
				//更新当前图象
				$preImg = null;
				sound.play('./media/Click.wav');
				
				//更新失败次数
				score.addErrorCount();
			};	
			
			//初次点击事件
			first = function($currentImg){
				//第一次开始翻
				$preImg = $currentImg;
			};
			
			//绑定图片的点击事件	
			$table.delegate('img[rel!=""]:not(.front)', 'click', function(e){
				var 
					$this = $(this),
					preSrc = $preImg !==null && $preImg.attr('rel'),
					currentSrc = $this.attr('rel');

				//更新点击次数
				score.addClickCount();
				
				that.clockRotate180($(this), function(){
					//翻到相同图象
					if(preSrc === currentSrc){
						//消失
						success($this);
					}else if($preImg !==null){
						failed($this);
					}else{
						first($this);
					}
				});	
				
			});
			
			//绑定回到主菜单时间
			$goHome.click(function(e){
				that.reset();//重置画布
				//旋转出元素
				$('#wrap').rotate3Di(-90, 500, {complete:function(){
					$(this).hide(0, function(){
						$('#home').show(0, function(){
							$(this).rotate3Di(90);
							$('#home').rotate3Di(0, 1000, {complete:function(){}});
						});
					});
				}});
			});
		},
		
		/**
		 * 顺时针旋转180度元素 
		 * @method clockRotate180
		 * @param {$object} $obj 旋转的元素
		 * @param {function} callback 回调函数
		 */
		clockRotate180:function($obj, callback){
			$obj.rotate3Di(90, 150, {complete:function(){
				var $this = $(this);
				$this.addClass('front').attr('src', $this.attr('rel')).rotate3Di(-90);
				$this.rotate3Di(0, 150, {complete:function(){callback();}});
			}});
		},
		
		/**
		 * 逆时针时针旋转180度元素 
		 * @method unclockRotate180
		 * @param {$object} $obj 旋转的元素
		 * @param {function} callback 回调函数
		 */
		unclockRotate180:function($obj, callback){
			$obj.delay(200).rotate3Di(-90, 150, {complete:function(){
				var $this = $(this);
				$this.removeClass('front').attr('src', './images/Shamrock.bmp').rotate3Di(90);
				$this.rotate3Di(0, 150, {complete:function(){callback();}});
			}});
		}
	};
		
	
	/**
	* 时间类
	* @class Timer
	* @constructor
	* @extends fan1xia.model.Timer.prototype
	*/
	Timer = function(){};
	
	/**
	* Timer构造函数的原型对象
	* @class Timer.prototype
	* @static
	*/
	Timer.prototype = {
		/**
		 * 初始化
		 * @method init 
		 */
		init:function(timestamp){
			var that = this,
			failed = new window.fan1xia.Failed();
			function callback(){
				that.reset();
				failed.fail();
			}
			//先初始化
			this.setTimer(timestamp, callback);
		},
		
		/**
		 * 复原计时器为零
		 * @method reset 
		 */
		reset:function(){
			$('#time').countdown({reset:true});
		},
		
		/**
		 * 
		 * @method setTimer
		 * @param {Number} stamp 时间戳
		 * @param {Function} callback 回调函数
		 */
		setTimer:function(stamp, callback){
			$('#time').countdown({
				timestamp:stamp,
				callback:callback
			});
		}
	};
		
	
	/**
	* 存贮罐类
	* @class Store
	* @constructor
	* @extends fan1xia.model.Store.prototype
	*/
	Store = function(){};
	
	/**
	* Store构造函数的原型对象
	* @class Store.prototype
	* @static
	*/
	Store.prototype = {
		/**
		 * 重置
		 * @method reset 
		 * @param {String} src 路径
		 */
		reset:function(src){
			src = src || './images/store.png';
			this.src(src);
		},
		
		/**
		 * 放入东西
		 * @method pull
		 * @param {String} src 路径  
		 */
		pull:function(src){
			src = src || './images/store-pull.png';
			this.src(src);
		},
		
		/**
		 * 更改路径
		 * @method src 
		 * @param {String} src 路径
		 */
		src:function(src){
			$('#result img').attr('src', src);
		}
	};
	
	/**
	* 存贮罐类
	* @class Score
	* @constructor
	* @extends fan1xia.model.Score.prototype
	*/
	Score = function(){
	    /**
         * 总对数
         * @property totalPairs
         * @type Number
         * @default 0
         */
		this.totalPairs = 0;
		
		/**
         * 点击次数
         * @property clickCount
         * @type Number
         * @default 0
         */
		this.clickCount = 0;
		
		/**
         * 错误次数
         * @property errorCount
         * @type Number
         * @default 0
         */
		this.errorCount = 0;
	};
	
	/**
	* Score构造函数的原型对象
	* @class Score.prototype
	* @static
	*/
	Score.prototype = {
		/**
		 * 重置
		 * @method reset
		 * @param {Number|undefined} level 级别
		 */
		reset:function(level){
			//设置总队数
			this.setTotalNumber(level*level/2);
			//设置剩余队数
			this.setRemainNumber(level*level/2);
			//设置点击次数
			this.setClickCount();
			//设置错误次数
			this.setErrorCount();
			this.setLevel(window.fan1xia.currentLevel+1);
		},
		
		/**
		 * 设置难度
		 * @method setLevel
		 * @param {Number} level 要设置的难度
		 * @return {Number} 设置的难度
		 */
		setLevel:function(level){
		   var
                $tds = $('#score-panel td');
            $tds.eq(9).html(level);
            
            return level;  
		},
		
		/**
		 * 设置总队数
		 * @method setTotalNumber 
		 * @param {Number} total 总队数
		 * @return {Number} 总对数
		 */
		setTotalNumber:function(total){
			var
				$tds = $('#score-panel td');
			$tds.eq(1).html(total + '对');
			this.totalPairs = total;
			
			return this.totalPairs;
		},
		
		/**
         * 过去总对数
         * @method getTotalNumber 
         * @return {Number} 总队数
         */
		getTotalNumber:function(){
		    return this.totalPairs;
		},
		
		/**
		 * 设置还剩对少对
		 * @method setRemainNumber
		 * @param {Number|undefined} remain 剩余队数
		 */
		setRemainNumber:function(remain){
			var
				$tds = $('#score-panel td');
			$tds.eq(3).html(remain + '对');
		},
		/**
		 * 获取剩余对数
		 * @method getRemainNumber
		 * @return {Number} count 当前还剩余队数 
		 */
		getRemainNumber:function(){
			var
				$tds = $('#score-panel td');
			return parseInt($tds.eq(3).html(), 10);
		},
		/**
		 * 剩余队数自减 
		 * @method decreaseRemainNumber
		 * 
		 */
		decreaseRemainNumber:function(){
			var count = this.getRemainNumber(),
				success = {},
				canvas = window.fan1xia.canvas;
			
			this.setRemainNumber(count - 1);
			if(this.checkSuccess(count - 1)){
				//返回胜利界面
				success = new window.fan1xia.Success();
				success.success();
				canvas.reset();//重置画布
			}
		},
		/**
		 * 检查是否结束
		 * @method checkSuccess 
		 * @param {Number} count 数量
		 * @param {Bollean} success 是否成功
		 */
		checkSuccess:function(count){
			return count === 0 ? true : false; 
		},
		/**
		 * 设置还剩对少对
		 * @method setClickCount
		 * @param {Number|undefined} count 剩余队数
		 */
		setClickCount:function(count){
			count = count || 0;
			var
				$tds = $('#score-panel td');
			$tds.eq(5).html(count + '次');
		    this.clickCount = count;
		    return count;
		},
		/**
		 * 获取点击次数
		 * @method getClickCount
		 * @return {Number} count 点击次数 
		 */
		getClickCount:function(){			
			return this.clickCount;
		},
		/**
		 *  增加点击次数
		 * @method addClickCount
		 */
		addClickCount:function(){
			this.setClickCount(this.getClickCount() + 1);
		},
		/**
		 * 设置失败次数
		 * @method setErrorCount
		 * @param {Number|undefined} count 剩余队数
		 */
		setErrorCount:function(count){
			count = count || 0;
			var
				$tds = $('#score-panel td');
			$tds.eq(7).html(count + '次');
			this.errorCount = count;
			return count;
		},
		/**
		 * 获取错误次数
		 * @method getErrorCount
		 * @return {Number} count 错误次数 
		 */
		getErrorCount:function(){
			return this.errorCount;
		},
		
		/**
		 * 添加错误数
		 * @method addErrorCount
		 */
		addErrorCount:function(){
			this.setErrorCount(this.getErrorCount() + 1);
		}
	};
	
	
	window.fan1xia = window.fan1xia || {};
	window.fan1xia.model = window.fan1xia.model || {};
    window.fan1xia.model.Canvas = Canvas;
    window.fan1xia.model.Timer = Timer;
	window.fan1xia.model.Store = Store;
	window.fan1xia.model.Score = Score;
}(jQuery, window));
