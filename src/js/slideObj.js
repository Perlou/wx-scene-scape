/**
 * @author Perlou
 * @slideObj.js
 * @exports {obj} slideObj
 */

//js
var $ = require('jquery');

function slideObj(){
	//Dom
	this.oMain = $('#main');
	this.oList = $('#list');
	this.oLi = this.oList.find('li');
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
	_this.slideCanvas();
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

		// _this.oGC.stroke();

		$(_this.oCanvas).on('touchmove.move', function(ev){
			var touch = ev.originalEvent.changedTouches[0];
			var x = touch.pageX - $(this).offset().left;
			var	y = touch.pageY - $(this).offset().top;

			_this.oGC.lineTo(x,y);
			_this.oGC.stroke();	
		});

		$(_this.oCanvas).on('touchend.move', function(ev){
			$(_this.oCanvas).off('.move');
			_this.oGC.closePath();
		});

	});
	// 			// $(oC).on('touchstart',function(ev){
				// var touch = ev.originalEvent.changedTouches[0];
				// var x = touch.pageX - $(this).offset().left;
				// var y = touch.pageY - $(this).offset().top;
				
				/*oGC.beginPath();
				oGC.arc(x,y,100,0,360*Math.PI/180);
				oGC.closePath();
				oGC.fill();*/
			// 	if(bBtn){
			// 		bBtn = false;
			// 		oGC.moveTo(x,y);
			// 		oGC.lineTo(x+1,y+1);
			// 	}
			// 	else{
			// 		oGC.lineTo(x,y);
			// 	}
				
			// 	oGC.stroke();
				
			// 	$(oC).on('touchmove.move',function(ev){
			// 		var touch = ev.originalEvent.changedTouches[0];
			// 		var x = touch.pageX - $(this).offset().left;
			// 		var y = touch.pageY - $(this).offset().top;
			// 		oGC.lineTo(x,y);
			// 		oGC.stroke();
			// 	});
			// 	$(oC).on('touchend.move',function(){
					
			// 		var dataImg = oGC.getImageData(0,0,oC.width,oC.height);
					
			// 		var allPx = dataImg.width * dataImg.height;
			// 		var iNum = 0;
					
			// 		for(var i=0;i<allPx;i++){
			// 			if(dataImg.data[i*4+3] == 0){
			// 				iNum++;
			// 			}
			// 		}
					
			// 		if( iNum > allPx/2 ){
			// 			$(oC).animate({opacity:0},1000,function(){
			// 				$(this).remove();
			// 				cjAnimate[0].inAn();
			// 				showMusic();
			// 			});
			// 		}
			// 		$(oC).off('.move');
			// 	});
			// });
};

slideObj.prototype.nowWidth = function(){
	var _this = this,
		w = _this.desW/_this.desH * _this.viewHeight;

	return w;
};
	
module.exports = slideObj;
