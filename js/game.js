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
	createGame();
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
		shtml = shtml + "<div class='flip-box' onclick='Selec_img(this,"+i+");'><div class='card' id='card"+i+"'><img class='off' id='off"+i+"' width='100%' src='img/pic0.png'><img class='on' id='on"+i+"'src='"+array_img[i]+"'></div></div>"
	}
	$('#main').html(shtml);
	$('#card_flip').html("<span>Cards Flipped: "+card_flip+"</span>")
}

function Selec_img(ctrl,i){
	if(click==2) return;
	if(click==0){
		ctrl1=ctrl;
		location1=i;
		$("#card"+location1).css('transform','rotateY(180deg)');
		//$("#on"+location1).css('transform','rotateY(0deg)');
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
		$("#off"+location1).css('transform','rotateY(0deg)');
		//$("#off"+location1).css('z-index','1');
		$("#on"+location2).css('transform','rotateY(180deg)');
		$("#off"+location2).css('transform','rotateY(0deg)');
		//$("#off"+location2).css('z-index','1');
	}

	if(card_flip==array_img.length/2){
			alert('WIN');
		}
}

function random(){
	array_img.sort(function(){
		return 0.5-Math.random();
	});
}
