import Card from './card.js';

var w = window;
w.card = new Card;
//Kiểm tra số lần click
var click=0;
//Lưu this của lần click 1
var ctrl1;
// lưu số tấm thẻ được lật lên 
var card_flip=0;
// tính tổng điểm 
var core = 0;
// lưu level
var level=1;
// phút chơi
var m_start=0;
//giây chơi
var s_start=0;
// độ rộng của thanh progressbar hiện tại 
var widthCurrent=0;
// độ rộng max của thanh progressbar 
var maxWidth=0;
// biến time dùng khi tính thời gian
var timer;
//kiểm tra các thông báo 
var checkNoti = false;

$(document).ready(function(){
	PlaySound('menu');
	OpenNoti('menu');
	$(".newplay").click(function(){
	    var $this = $(this);
	    if($this.data('clicked')) {
	        console.log("chưa click")
	    }
	    else {
	        SelectMenu();
	    }
	});
	$(".continue").click(function(){
	    var $this = $(this);
	    if($this.data('clicked')) {
	        console.log("chưa click")
	    }
	    else {
	    	StopSound('success');
	    	CloseNoti();
	        createGame(level);
	    }
	});
	$(".againplay").click(function(){
	    var $this = $(this);
	    if($this.data('clicked')) {
	        console.log("chưa click")
	    }
	    else {
	    	card_flip = 0;
	    	level=1;
	    	SelectMenu();
	    }
	});
});

function SelectMenu() {
	StopSound('menu');
	CloseNoti();
	setInfo();
 	createGame(1);
}

function OpenNoti(str){
	if(!checkNoti){
		$('#notification').css('display','flex');
		if(str == 'menu'){
			$('.menu').css('display','block');
		}
		if(str == 'lose'){
			$('.totalPoint').html("Số điểm bạn đạt được: " + card_flip);
			$('.lose').css('display','block');
		}
		if(str == 'win'){
			$('.level-continue').html("Bàn tiếp theo: " + (level+1) );
			$('.win').css('display','block');
		}
		if(str == 'final'){
			$('.final').css('display','block');
		}
		checkNoti = true;
	}
}

function CloseNoti(){
	checkNoti = false;
	$('#notification').css('display','none');
	$('.menu').css('display','none');
	$('.lose').css('display','none');
	$('.win').css('display','none');
	$('.final').css('display','none');
}

// cài đặt các thông tin đầu vào
function setInfo(){
	$("#card_flip").html("<span> Cards Flipped: " + card_flip + "</span>");
	$("#level").html("<span> Level " + level + "</span>");
	$("#infogame").css('display','block');
}

function createGame(lev=1){
	PlaySound('audio1');
	lev = lev*2;
	let html = '';
	let arrRandom = [];

	for (var i = lev/2; i > 0; i--) {
		arrRandom.push(i);
		arrRandom.push(i);
		random(arrRandom);
	}

	for(var i=0;i<arrRandom.length;i++){
		html += w.card.init('img/pic'+arrRandom[i]+'.png');
	}

	$('#main').empty().append(html);
	if (level == 1) {
		$('#main').css('width', String(150*2) + 'px');
		m_start = 1;
		s_start = 0;
	} else if(level <= 7) {
		$('#main').css('width', String(150*level) + 'px');
	} else {
		for(i=7; i >= 4; i--){
			if(arrRandom.length%i==0){
				$('#main').css('width', String(150*i) + 'px');
				break;
			}
		}
	}

	maxWidth = m_start*60 + s_start;
	widthCurrent = maxWidth;

	$('.myBar').css('width',Math.round(
		(widthCurrent/maxWidth)*100)+'%');
	timer = setInterval(function(){
		caculatorTime();
	},1000);

	choseCard(arrRandom.length);
}



function choseCard(harr) {
	$('.card-container').click(function(e) {
		if (this == ctrl1) return;
		$(this).addClass('show');
		$('#main').css('pointer-events', 'none');

		if (click%2 == 0) {
			ctrl1 = this;
			$('#main').css('pointer-events', 'auto');
		} else {

			let valueCtrl1 = $(ctrl1).find('.card__backside img').attr('src');
			if ($(this).find('.card__backside img').attr('src') == valueCtrl1) {
				setTimeout(function() {
					card_flip++;
					core++;
					PlaySound('same-card');
					$('.show').css('visibility','hidden');
					$('#main').css('pointer-events', 'auto');

					$('#card_flip').html("<span> Cards Flipped: " + card_flip + "</span>");

					alertGame(harr);
				}, 1000);
			} else {
				setTimeout(function() {
					document.getElementById('turn-over').play();
					PlaySound('turn-over');
					$('.show').removeClass('show');
					$('#main').css('pointer-events', 'auto');

				}, 1000);
			}
		}
		click++;	
	})
}
function alertGame(harr){
	if(core == harr/2){
		core = 0;
		StopSound('audio1');
		PlaySound('success');
		OpenNoti('win');
		clearInterval(timer);
		level++;
		$("#level").html("<span> Level " + level + "</span>")
	}	
}



function caculatorTime(){
	$('.myBar').css('width',Math.round(
		(--widthCurrent/maxWidth)*100)+'%');
	//kiểm tra giá trị về 0 thì ngừng setInterval
	if(widthCurrent == 0){
		StopSound('audio1');
		PlaySound('fail');
		OpenNoti('lose');
		StopGame();
	}
}

function StopGame(){
 	if(typeof timer!="undefined") {
 		clearInterval(timer);
 	}
}

function PlaySound(str){
	document.getElementById(str).play();
}
function StopSound(str){
	document.getElementById(str).pause();
}

function random(arr=array_img){
	arr.sort(function(){
		return 0.5-Math.random();
	});
}

// JavaScript
// Wrap the native DOM audio element play function and handle any autoplay errors
Audio.prototype.play = (function(play) {
	return function () {
	  	var audio = this,
	      	args = arguments,
	      	promise = play.apply(audio, args);
	  	if (promise !== undefined) {
	    	promise.catch(_ => {
		      	// Autoplay was prevented. This is optional, but add a button to start playing.
		      	var el = document.createElement("button");
		      	el.innerHTML = "Play";
		      	el.addEventListener("click", function(){play.apply(audio, args);});
		      	this.parentNode.insertBefore(el, this.nextSibling)
	    	});
	  	}
	};
})(Audio.prototype.play);