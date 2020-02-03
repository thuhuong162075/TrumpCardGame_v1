//Kiểm tra số lần click
var click;
//Lưu this của lần click 1
var ctrl1;
//lưu this của lần click 2
var ctrl2;
//lưu vị trí của lần click 1
var location1;
//lưu vị trí của lần click 2
var location2;
//mảng ảnh 
var mang=[];
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
		mang.push("img/pic"+i+".png","img/pic"+i+".png");
	}
}
//tạo hàm in giao diện 
function printInterface(){
	NextLevel();
	var shtml="";
	for(var i=0;i<mang.length;i++){
		shtml = shtml + "<div class='card'><img class='off' id='off"+i+"' onclick='ChonAnh(this,"+i+");' width='100%' src='img/pic0.png'><img class='on' id='on"+i+"'src='"+mang[i]+"'></div>"
	}
	$('#main').html(shtml);
	$('#card_flip').html("<span>Cards Flipped: "+card_flip+"</span>")
}