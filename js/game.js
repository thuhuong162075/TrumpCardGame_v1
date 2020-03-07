import Card from './card.js';

var w = window;
w.card = new Card;
//Kiểm tra số lần click
var click=0;
//Lưu this của lần click 1
var ctrl1;
// lưu số tấm thẻ được lật lên 
var card_flip=0;
//
var core = 0;
// lưu level
var level=1;


$(document).ready(function(){
	// createGame();
	createGame(level);
	setInfo();
});

function setInfo(){
	$("#card_flip").html("<span> Cards Flipped: " + card_flip + "</span>");
	$("#level").html("<span> Level " + level + "</span>")
}

function random(arr=array_img){
	arr.sort(function(){
		return 0.5-Math.random();
	});
}

function createGame(lev=1){
	lev = lev*2;
	let html = '';
	let arrRandom = [];

	for (var i = lev/2; i > 0; i--) {
		arrRandom.push(i);
		arrRandom.push(i);
		random(arrRandom);
	}
	console.log(arrRandom);

	for(var i=0;i<arrRandom.length;i++){
		html += w.card.init('img/pic'+arrRandom[i]+'.png');
	}

	$('#main').empty().append(html);
	if (level == 1) {
		$('#main').css('width', String(150*2) + 'px');
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
					$('.show').css('visibility','hidden');
					$('#main').css('pointer-events', 'auto');

					$('#card_flip').html("<span> Cards Flipped: " + card_flip + "</span>");

					alertGame(harr);
				}, 1000);
			} else {

				setTimeout(function() {
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
		alert('WIN');
		level++;
		$("#level").html("<span> Level " + level + "</span>")
		createGame(level);
	}	
}