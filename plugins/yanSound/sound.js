(function(window){
	'use strict';
	var
		Sound = function(){
			this.sound = null;
			this.init();
		};
		
	Sound.prototype = {
		init:function(){			
			//看是否存在sound元素	
			if(this.sound === null){
				this.sound = document.createElement('audio');
				this.sound.setAttribute('src', '');
				this.sound.setAttribute('autoplay', true);
				this.sound.setAttribute('id', 'yanSound');
			}
		},
		src:function(src){
			this.sound.src = src;
		},
		play:function(src){
			src = src || this.sound.src;
			
			this.src(src);
		}
	};
	
	window.yan = window.yan || {};
	window.yan.Sound = window.yan.Sound || Sound;
}(window));
