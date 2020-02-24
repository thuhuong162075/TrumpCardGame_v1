import Card from './card.js';

var w = window;
w.card = new Card;
//Kiểm tra số lần click
var click=0;
//Lưu this của lần click 1
var ctrl1;
//lưu this của lần click 2
var ctrl2;
//lưu vị trí của lần click 1
var location1;
//lưu vị trí của lần click 2
var location2;
//mảng ảnh 
var array_img=[];
// lưu số tấm thẻ được lật lên 
var card_flip=0;

//jquery
$(document).ready(function(){
	// createGame();
	level(1);
});

//hàm tạo game 
function createGame(){
	printInterface();
}

// tạo mảng lưu ảnh 
function NextLevel(){
	for(var i=1;i<=2;i++){
		array_img.push("img/pic"+i+".png","img/pic"+i+".png");
	}
	random();
}

//tạo hàm in giao diện 
function printInterface(){
	NextLevel();
	var shtml="";
	for(var i=0;i<array_img.length;i++){
		shtml = shtml + "<div class='card'><img class='off' id='off"+i+"' onclick='Selec_img(this,"+i+");' width='100%' src='img/pic0.png'><img class='on' id='on"+i+"'src='"+array_img[i]+"'></div>"
	}
	$('#main').html(shtml);
	$('#card_flip').html("<span>Cards Flipped: "+card_flip+"</span>")
}

function Selec_img(ctrl,i){
	if(click==2) return;
	if(click==0){
		ctrl1=ctrl;
		location1=i;
		$(ctrl1).css('transform','rotateY(180deg)');
		$("#on"+location1).css('transform','rotateY(0deg)');
		click=1;
	}else{
		ctrl2=ctrl;
		location2=i;
		$(ctrl2).css('transform','rotateY(180deg)');
		$("#on"+location2).css('transform','rotateY(0deg)');
		click=2;
		if(ctrl1 != ctrl2){
			setTimeout(Check,600);
		}else{
			click=1;
			return;
		}
	}
}

function Check(){
	click=0;
	if(array_img[location1] == array_img[location2]){
		$('#on'+location1).css('visibility','hidden');
		$('#off'+location1).css('visibility','hidden');
		$('#on'+location2).css('visibility','hidden');
		$('#off'+location2).css('visibility','hidden');
		card_flip++;
		$('#card_flip').html("<span>Cards Flipped: "+card_flip+"</span>");
		
	}else {

		$("#on"+location1).css('transform','rotateY(180deg)');
		//$("#off"+location1).css('transform','rotateY(0deg)');
		$("#on"+location2).css('transform','rotateY(180deg)');
		//$("#off"+location2).css('transform','rotateY(0deg)');
	}

	if(card_flip==array_img.length/2){
			alert('WIN');
		}
}
function random(arr=array_img){
	arr.sort(function(){
		return 0.5-Math.random();
	});
}

function level(lev=1){
	lev = lev*2+2;
	let html = '';
	let arrRandom = [];
	for (var i = lev/2; i > 0; i--) {
		arrRandom.push(i);
		arrRandom.push(i);
		random(arrRandom);
	}

	while(lev > 0) {
		html += w.card.init('img/pic'+arrRandom[lev-1]+'.png');
		lev--;
	}
	$('#main').empty().append(html);
	choseCard();
}

function choseCard() {
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
					$('.show').hide();
					$('#main').css('pointer-events', 'auto');
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