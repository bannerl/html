var highpage = document.getElementById("highpage");
var uppage = document.getElementsByClassName("first-page");
var currentwidth = parseInt(getStyle(uppage[0]).width);
var userInfo = document.getElementsByClassName("user-info")[0];

//创建标签
function newele(){
	
}
//后台数据请求
function getInfo(){

	if(window.XMLHttpRequest){
		var xhr = new XMLHttpRequest();
	}else{
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open("GET","js/user.json",true);
	xhr.send();
	
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4&&xhr.status === 200){
			var text = JSON.parse(xhr.responseText);
			var ele1 = document.createElement("p");
			var content1 = document.createTextNode(text[0].name);
			ele1.className = "name";
			ele1.appendChild(content1);
			var ele2 = document.createElement("p");
			var content2 = document.createTextNode("微信号："+text[0].number);
			ele2.className = "number";
			ele2.appendChild(content2);
			userInfo.appendChild(ele1);
			userInfo.appendChild(ele2);
		}
	};

}
getInfo();
//触摸事件
document.addEventListener("touchstart",function(e){
	e.preventDefault();
	var touch = e.touches[0];
	startX = touch.pageX;
	startY = touch.pageY;
//		initialPos = currentPosition;
	highpage.style.webkitTransition = "";
	startT = new Date().getTime();
	isMove = false;
	
}.bind(this),false);
var deltaX;
document.addEventListener("touchmove",function(e){
	e.preventDefault();
	
	var touch = e.touches[0];
	 deltaX = touch.pageX - startX;
	 deltaY = touch.pageY - startY;
	//如果向左右位移大于上下则是左右位移
	if(Math.abs(deltaX)>Math.abs(deltaY)){
		nes = parseFloat(nes);
		var len = nes + deltaX;
	 	if(len <=-1080){
			len = -1180;
		}else if(len>=0){
			len = 100;
		}
		highpage.style.webkitTransform = "translate3d("+len+"px,0,0)";
	}
});
var nes = 0;

document.addEventListener("touchend",function(e){
	 var lens;
	/*判断移动距离是否满足*/ 
	if(Math.abs(deltaX)>currentwidth/2){
		for(var i = 0;i<uppage.length;i++){
			var _nes = Math.abs(nes);
			var j = i+1;
			if(_nes>=i*currentwidth&&_nes<j*currentwidth){
				if (deltaX>0) {
					if(i==0){
						i = 1;
					}
					lens = -(i-1)*currentwidth;
				} else{
					if(i==3){
						j = 3;
					}
					lens = -(j*currentwidth);
				}
				break;
			}
		}
	}else{
		lens = nes;
	}	
	highpage.style.webkitTransform = "translate3d("+lens+"px,0,0)";
	nes = highpage.style.webkitTransform.slice("12").split("px")[0];	
});


function getStyle(ele) {
    var style = null;
    if(window.getComputedStyle) {
        style = window.getComputedStyle(ele, null);
    }else{
        style = ele.currentStyle;
    }
    return style;
}