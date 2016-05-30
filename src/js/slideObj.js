/**
 * @author Perlou
 * @slideObj.js
 * @exports {obj} slideObj
 */

'use strict';

//js
var $ = require('jquery');

function slideObj(){
	//Dom
	this.oMain = $('#main');
	this.oList = $('#list');
	this.oLi = this.oList.find('li');
	this.oLoading = $('#loading');
	this.oMusic = $('#music');
	this.oAudio = $('#audio1');

	this.viewHeight = $(window).height();
	this.desW = 640;
	this.desH = 960;

	//Canvas
	this.oCanvas = $('#c1').get(0);
	this.oGC = this.oCanvas.getContext('2d');

	this.init(); // 初始化
}

slideObj.prototype.init = function(){
	var _this = this;
	_this.set();
	_this.loading();
	_this.slideList();
};

slideObj.prototype.loading = function(){
	
	var _this = this,
		imageArr = [
			require('../images/a.png'),
			require('../images/b.png'),
			require('../images/c.png'),
			require('../images/d.png'),
			require('../images/e.png'),
			require('../images/ad1.png'),
			require('../images/ad2.png'),
			require('../images/ad3.png'),
			require('../images/ad4.png')
		],
		iNow = 0;

	for(var i = 0; i<imageArr.length; i++){
		var objImg = new Image();
		objImg.src = imageArr[i];
		objImg.onload = function(){
			iNow++;
			if(iNow == imageArr.length){
				next();
			}
		};
		objImg.onerror = function(){
			next();		
		};
	}	

	function next(){
		_this.oLoading.animate({
			opacity: 0
		}, 1000, function(){
			_this.oLoading.remove();
		});		
		_this.slideCanvas();

	}
		
};

slideObj.prototype.music = function(){
	var _this = this,
		musicBtn = true;

	_this.oMusic.on('touchend', function(){
		if(musicBtn){
			$(this).attr('class', 'active');
			_this.oAudio.get(0).play();
		}else{
			$(this).attr('class', '');
			_this.oAudio.get(0).pause();
		}
		musicBtn = !musicBtn;
	});	
	_this.oMusic.trigger('touchend');
};	

slideObj.prototype.set = function(){
	var _this = this;

	_this.oMain.css({
		'height': _this.viewHeight
	});

	_this.oLi.css({
		'backgroundPosition': ( (_this.desW - _this.nowWidth())/2 + 'px 0')
	});

};

// Draw Canvas
slideObj.prototype.slideCanvas = function(){
	var _this = this,
		canvasBtn = true;
	_this.oCanvas.height = _this.viewHeight;

	var objImg = new Image();
	objImg.src = require('../images/a.png');
	objImg.onload = function(){
		_this.oGC.drawImage(objImg, (_this.desW - _this.nowWidth())/2, 0, _this.nowWidth(), _this.viewHeight);
		_this.oGC.fillStyle = 'red';
		_this.oGC.globalCompositeOperation = 'destination-out';
		_this.oGC.lineWidth = 60;
		_this.oGC.lineCap = 'round';
	};


	$(_this.oCanvas).on('touchstart', function(ev){
		var touch = ev.originalEvent.changedTouches[0];
		var	x = touch.pageX - $(this).offset().left;
		var	y = touch.pageY - $(this).offset().top;

		if(canvasBtn){
			canvasBtn = false;
			_this.oGC.moveTo(x,y);
			_this.oGC.lineTo(x+1,y+1);
		}else{
			_this.oGC.lineTo(x,y);
		}

		_this.oGC.stroke();

		$(_this.oCanvas).on('touchmove.move', function(ev){
			var touch = ev.originalEvent.changedTouches[0];
			var x = touch.pageX - $(this).offset().left;
			var	y = touch.pageY - $(this).offset().top;

			_this.oGC.lineTo(x,y);
			_this.oGC.stroke();	
		});

		$(_this.oCanvas).on('touchend.move', function(ev){
			var dataImg = _this.oGC.getImageData(0,0,_this.oCanvas.width,_this.oCanvas.height),
				allPx = dataImg.width * dataImg.height,
				iNum = 0;

			for(var i=0; i<allPx; i++){
				if(dataImg.data[i*4+3] == 0 ){
					iNum++;
				}
			}	

			if(iNum > allPx/2){
				$(_this.oCanvas).stop().animate({
					opacity: 0
				},1000,function(){
					_this.music();
					$(_this.oCanvas).remove();
				});
			}
			$(_this.oCanvas).off('.move');
		});

	});

};

slideObj.prototype.slideList = function(){
	var _this = this,
		downY = 0,
		moveY = 0,
		step = 1/4,
		listBtn = true,
		nowIndex = 0,
		nextIndex = 0;

	_this.oLi.css('backgroundPosition', ( (_this.desW -_this.nowWidth())/2 ) +'px 0')
	_this.oLi.on('touchstart', function(ev){
		if(!listBtn){return;}
		listBtn = false;

		nowIndex = $(this).index();
		downY = ev.originalEvent.changedTouches[0].pageY;

		_this.oLi.on('touchmove', function(ev){
			moveY = ev.originalEvent.changedTouches[0].pageY;
			$(this).siblings().hide();
			if(downY > moveY) { //向上滑动
				nextIndex = nowIndex == _this.oLi.length - 1 ? 0 : nowIndex + 1;
				_this.oLi.eq(nextIndex).css({
					'transform': 'translate3d(0,'+ ( _this.viewHeight + moveY - downY) +'px,0)',
					'WebkitTransform': 'translate3d(0,'+ ( _this.viewHeight + moveY - downY) +'px,0)'
				});
			}else { //向下滑动
				nextIndex = nowIndex == 0 ? _this.oLi.length - 1 : nowIndex - 1;
				_this.oLi.eq(nextIndex).css({
					'transform': 'translate3d(0,'+ ( -_this.viewHeight + moveY - downY) +'px,0)',
					'WebkitTransform': 'translate3d(0,'+ ( -_this.viewHeight + moveY - downY) +'px,0)'
				});
			}

			_this.oLi.eq(nextIndex).show().addClass('zIndex');
			$(this).css({
				'WebkitTransform': 'translate3d(0,'+ (moveY - downY)*step +'px,0) scale('+(1-Math.abs(moveY - downY)/_this.viewHeight*step) +')'
			})

		});

		_this.oLi.on('touchend', function(ev){

			if(downY > moveY) {
				$(this).css({
					'transform': 'translate3d(0,'+(-_this.viewHeight * step)+'px,0) scale('+(1-step)+')',
					'WebkitTransform': 'translate3d(0,'+(-_this.viewHeight * step)+'px,0) scale('+(1-step)+')'
				})
			}else if(downY < moveY) {
				$(this).css({
					'transform': 'translate3d(0,'+(_this.viewHeight * step)+'px,0) scale('+(1-step)+')',
					'WebkitTransform': 'translate3d(0,'+(_this.viewHeight * step)+'px,0) scale('+(1-step)+')'
				})
			}else {
				listBtn = true;
				return;
			}

			$(this).css({
				'transition': '0.3s',
				'WebkitTransition': '0.3s'
			})
			_this.oLi.eq(nextIndex).css({
				'transform': 'translate3d(0,0,0)',
				'transition': '0.3s',
				'WebkitTransform': 'translate3d(0,0,0)',
				'WebkitTransition': '0.3s'
			})
		});

	});	

	_this.oLi.on('transitionEnd webkitTransitionEnd',function(){
		resetStyle();
	})

	function resetStyle(){
		_this.oLi.css({
			'transition': '',
			'WebkitTransition': ''			
		});
		_this.oLi.eq(nextIndex).removeClass('zIndex').siblings().hide();
		listBtn = true;
	}
		
};

slideObj.prototype.nowWidth = function(){
	var _this = this,
		w = _this.desW/_this.desH * _this.viewHeight;

	return w;
};
	
module.exports = slideObj;
