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
		this.levels = [];
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
			var canvas = new window.fan1xia.model.Canvas(),
			success = new Success(),
			failed = new Failed();
			
			window.fan1xia.canvas = canvas;//更新画布
			this.bindClickEvent();//初始化点击事件
			canvas.init();
			
			success.init();
			failed.init();
			window.fan1xia.levels = [{level:2, grad:2},
                        {level:4, grad:4},
                        {level:4, grad:2},
                        {level:6, grad:6},  
                        {level:6, grad:4},
                        {level:6, grad:2},
                        {level:8, grad:16},
                        {level:8, grad:8},
                        {level:8, grad:4},
                        {level:8, grad:2}
                ];
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
					canvas = window.fan1xia.canvas,
					callback = function(){},
					levels = [];
					
				levels = window.fan1xia.levels;
				//添加点击效果
				window.fan1xia.currentLevel = level;
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
		    var 
		      canvas = window.fan1xia.canvas,
		      score = canvas.score,
		      total = score.totalPairs,
		      error = score.errorCount,
		      click = score.clickCount,
		      scoreNum = parseInt(2*total*100/click, 10),
		      $success = $('#success'),
		      $pair = $("#pair strong", $success),
		      $click = $("#click strong", $success),
		      $error = $("#error strong", $success),
		      $score = $("#score strong", $success),
		      $hightScore = $("#hight-score strong", $success),
		      $level = $("#level strong", $success),
		      level = window.fan1xia.currentLevel,
		      storage = new window.fan1xia.model.StorageModel(),
		      key = "fan1xiaHightScoreLevel" + level, 
		      hightScore;
		    
		    storage.init();//初始化存储		    
		    hightScore = storage.load(key) || 0;
		    
		    if(scoreNum >= hightScore){
		        storage.save(key, scoreNum);
		    }
		    $pair.html(total);
		    $click.html(click);
		    $error.html(error);
		    $score.html(scoreNum);
		    $hightScore.html(hightScore);
		    $level.html(level + 1);
		    
		    //添加QQ分享
		    (function(){
                var p = {
                    url:location.href, /*获取URL，可加上来自分享到QQ标识，方便统计*/
                    desc:'哈哈！！！我在难度' + level+1 + '中，得了' + scoreNum + '分，您是否能找到板上所有的匹配？翻转一块墙砖会显示一张图片，然后尝试在其他地方找到其匹配。记住图片的位置，因为如果翻转的墙砖上的图片不匹配，您将必须重试。匹配所有图片才能获胜。', /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
                    title:'翻一下', /*分享标题(可选)*/
                    summary:'翻一下是一款类似小丑配对的游戏，能增加记忆力', /*分享摘要(可选)*/
                    pics:'http://yanhaijing.github.io/fan1xia/images/fan.gif', /*分享图片(可选)*/
                    site:'https://github.com/yanhaijing', /*分享来源(可选) 如：QQ分享*/
                    style:'101',
                    width:96,
                    height:24
                };
                var s = [];
                for(var i in p){
                    s.push(i + '=' + encodeURIComponent(p[i]||''));
                }
                $("#share-qzone-success").attr("href", "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + s.join('&'));
            })();

			//旋转出元素
			$('#wrap').rotate3Di(-90, 500, {complete:function(){
				$(this).hide(0, function(){
					$success.show(0, function(){
						$(this).rotate3Di(90);
						$success.rotate3Di(0, 1000, {complete:function(){}});
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
					level = window.fan1xia.currentLevel,
					canvas = window.fan1xia.canvas,
					callback = function(){},
					levels = [];
					
				levels = window.fan1xia.levels;
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
					level = window.fan1xia.currentLevel,
					canvas = window.fan1xia.canvas,
					callback = function(){},
					levels = window.fan1xia.levels;
					
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
    window.fan1xia.Failed = Failed;
    window.fan1xia.Success = Success;
	$(function(){
		var index = new Index();
		index.init();
	})
}(jQuery, window));
