/**
 * @author Perlou
 * @index.js
 */

var $ = require('jquery');
console.log($);

 //canvas像素级操作必须在服务器下运行才可以，课上忘说了
// $(document).on('touchmove',function(ev){
// 	ev.preventDefault();
// });

// $(function(){
// 	var $main = $('#main');
// 	var $list = $('#list');
// 	var $li = $list.find('>li');
	
// 	var desW = 640;
// 	var desH = 960;
// 	var viewHeight = $(window).height();
	
// 	$main.css('height',viewHeight);
	
// 	showloading();
// 	slideCanvas();
// 	slideList();
	
// 	function nowWidth(){
// 		var w = desW/desH * viewHeight;
// 		return w;
// 	}
	
// 	function slideCanvas(){
// 		var oC = $('#c1').get(0);
// 		var oGC = oC.getContext('2d');
// 		var bBtn = true;
// 		oC.height = viewHeight;
		
// 		var objImg = new Image();
// 		objImg.src = 'img/a.png';
// 		objImg.onload = function(){
// 			oGC.drawImage(objImg,(desW - nowWidth())/2 ,0,nowWidth(),viewHeight);
// 			oGC.fillStyle = 'red';
// 			oGC.globalCompositeOperation = 'destination-out';
// 			oGC.lineWidth = 60;
// 			oGC.lineCap = 'round';
			
// 			$(oC).on('touchstart',function(ev){
// 				var touch = ev.originalEvent.changedTouches[0];
// 				var x = touch.pageX - $(this).offset().left;
// 				var y = touch.pageY - $(this).offset().top;
				
// 				/*oGC.beginPath();
// 				oGC.arc(x,y,100,0,360*Math.PI/180);
// 				oGC.closePath();
// 				oGC.fill();*/
// 				if(bBtn){
// 					bBtn = false;
// 					oGC.moveTo(x,y);
// 					oGC.lineTo(x+1,y+1);
// 				}
// 				else{
// 					oGC.lineTo(x,y);
// 				}
				
// 				oGC.stroke();
				
// 				$(oC).on('touchmove.move',function(ev){
// 					var touch = ev.originalEvent.changedTouches[0];
// 					var x = touch.pageX - $(this).offset().left;
// 					var y = touch.pageY - $(this).offset().top;
// 					oGC.lineTo(x,y);
// 					oGC.stroke();
// 				});
// 				$(oC).on('touchend.move',function(){
					
// 					var dataImg = oGC.getImageData(0,0,oC.width,oC.height);
					
// 					var allPx = dataImg.width * dataImg.height;
// 					var iNum = 0;
					
// 					for(var i=0;i<allPx;i++){
// 						if(dataImg.data[i*4+3] == 0){
// 							iNum++;
// 						}
// 					}
					
// 					if( iNum > allPx/2 ){
// 						$(oC).animate({opacity:0},1000,function(){
// 							$(this).remove();
// 							cjAnimate[0].inAn();
// 							showMusic();
// 						});
// 					}
// 					$(oC).off('.move');
// 				});
// 			});
// 		};
// 	}
	
// 	function slideList(){
// 		var downY = 0;
// 		var step = 1/4;
		
// 		var nowIndex = 0;
// 		var nextorprevIndex = 0;
// 		var bBtn = true;
		
// 		$li.css('backgroundPosition',( (desW - nowWidth())/2 )+'px 0');
// 		$li.on('touchstart',function(ev){
// 			if(!bBtn){return;}
// 			bBtn = false;
// 			var touch = ev.originalEvent.changedTouches[0];
// 			downY = touch.pageY;
// 			nowIndex = $(this).index();
			
// 			$li.on('touchmove',function(ev){
// 				var touch = ev.originalEvent.changedTouches[0];
				
// 				$(this).siblings().hide();
				
// 				if( touch.pageY < downY ){  //↑
// 					nextorprevIndex = nowIndex == $li.length-1 ? 0 : nowIndex + 1;
// 					$li.eq(nextorprevIndex).css('transform','translate(0,'+(viewHeight + touch.pageY - downY)+'px)');
// 				}
// 				else if( touch.pageY > downY ){  //↓
// 					nextorprevIndex = nowIndex == 0 ? $li.length-1 : nowIndex - 1;
// 					$li.eq(nextorprevIndex).css('transform','translate(0,'+(-viewHeight + touch.pageY - downY)+'px)');
// 				}
// 				else{
// 					bBtn = true;
// 				}
				
// 				//Math.abs(touch.pageY - downY)/viewHeight*step  //-viewHeight~viewHeight
// 				//0~1  -> 0~0.25
// 				$li.eq(nextorprevIndex).show().addClass('zIndex');
// 				$(this).css('transform','translate(0,'+(touch.pageY - downY)*step+'px) scale('+(1-Math.abs(touch.pageY - downY)/viewHeight*step)+')');
				
// 			});
			
// 			$li.on('touchend',function(ev){
// 				var touch = ev.originalEvent.changedTouches[0];
// 				if( touch.pageY < downY ){  //↑
// 					$(this).css('transform','translate(0,'+(-viewHeight * step)+'px) scale('+(1-step)+')');
// 				}
// 				else if( touch.pageY > downY ){  //↓
// 					$(this).css('transform','translate(0,'+(viewHeight * step)+'px) scale('+(1-step)+')');
// 				}
// 				$(this).css('transition','.3s');
// 				$li.eq(nextorprevIndex).css('transform','translate(0,0)');
// 				$li.eq(nextorprevIndex).css('transition','.3s');
// 			});
			
// 		});
		
// 		$li.on('transitionEnd webkitTransitionEnd',function(ev){
// 			if( $li.is(ev.target) ){
// 				resetFn();
// 				if(cjAnimate[nowIndex]){
// 					cjAnimate[nowIndex].outAn();
// 				}
// 				if(cjAnimate[nextorprevIndex]){
// 					cjAnimate[nextorprevIndex].inAn();
// 				}
				
// 			}
// 		});
		
// 		function resetFn(){
// 			$li.css('transition','');
// 			$li.eq(nextorprevIndex).removeClass('zIndex').siblings().hide();
// 			bBtn = true;
// 		}
		
// 	}
	
// 	var cjAnimate = [
// 		{
// 			inAn : function(){
// 				var $liChild = $li.eq(0).find('li');
// 				$liChild.css('opacity',1);
// 				$liChild.css('transform','translate(0,0)');
// 				$liChild.css('transition','1s');
// 			},
// 			outAn : function(){
// 				var $liChild = $li.eq(0).find('li');
// 				$liChild.css('transition','');
// 				$liChild.css('opacity',0);
// 				$liChild.filter(':even').css('transform','translate(-200px,0)');
// 				$liChild.filter(':odd').css('transform','translate(200px,0)');
// 			}
// 		},
// 		{
// 			inAn : function(){
// 				var $liChild = $li.eq(1).find('li');
// 				$liChild.attr('class','');
// 				$liChild.css('transform','rotate(720deg)');
// 				$liChild.css('transition','1s');
// 			},
// 			outAn : function(){
// 				var $liChild = $li.eq(1).find('li');
// 				$liChild.css('transform','rotate(0)');
// 				$liChild.css('transition','');
// 				$liChild.attr('class','active');
// 			}
// 		},
// 		{
// 			inAn : function(){
// 				var $divChild = $li.eq(2).find('div');
// 				$divChild.css('transform','rotateY(720deg)');
// 				$divChild.css('transition','1s');
// 			},
// 			outAn : function(){
// 				var $divChild = $li.eq(2).find('div');
// 				$divChild.css('transform','rotateY(0)');
// 				$divChild.css('transition','');
// 			}
// 		},
// 		{
// 			inAn : function(){
// 				var $liChild = $li.eq(3).find('li');
// 				$liChild.css('transition','1s');
// 				$liChild.attr('class','');
// 			},
// 			outAn : function(){
// 				var $liChild = $li.eq(3).find('li');
// 				$liChild.css('transition','');
// 				$liChild.attr('class','active');
// 			}
// 		}
// 	];
	
// 	/*cjAnimate[3].outAn();
// 	setTimeout(function(){
// 		cjAnimate[3].inAn();
// 	},100);*/
	
// 	$.each(cjAnimate,function(i,obj){
// 		obj.outAn();
// 	});
	
// 	function showMusic(){
// 		var $music = $('#music');
// 		var $audio1 = $('#audio1');
// 		var onoff = true;
// 		$music.on('touchstart',function(){
// 			if(onoff){
// 				$(this).attr('class','active');
// 				$audio1.get(0).play();
// 			}
// 			else{
// 				$(this).attr('class','');
// 				$audio1.get(0).pause();
// 			}
// 			onoff = !onoff;
// 		});
// 		$music.trigger('touchstart');
		
// 	}
// 	//showMusic();
	
// 	function showloading(){
// 		var arr = ['a.png','b.png','c.png','d.png','e.png','ad1.png','ad2.png','ad3.png','ad4.png','c1.png','c2.png','c3.png','c4.png','c5.png','c6.png','d1.png'];
// 		var $loading = $('#loading');
// 		var iNow = 0;
		
// 		for(var i=0;i<arr.length;i++){
// 			var objImg = new Image();
// 			objImg.src = 'img/'+arr[i];
// 			objImg.onload = function(){
// 				iNow++;
// 				if(iNow == arr.length){
// 					$loading.animate({opacity:0},1000,function(){
// 						$(this).remove();
// 					});
// 				}
// 			};
// 			objImg.onerror = function(){
// 				$loading.animate({opacity:0},1000,function(){
// 					$(this).remove();
// 				});
// 			};
// 		}
// 	}
	
// });