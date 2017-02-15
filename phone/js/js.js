var highpage = document.getElementById("highpage");
var uppage = document.getElementsByClassName("first-page");
var currentwidth = parseInt(getStyle(uppage[0]).width);
var userInfo = document.getElementsByClassName("user-info")[0];
var footerCtrl = document.getElementsByClassName("footer-ctrl");
var time = document.getElementsByClassName("time")[0];
//获取当前时间
setInterval(function(){
	var date = new Date();
	var hour = date.getHours();
	var second = date.getSeconds();
	var minute = date.getMinutes();
	if(hour-10<0){
		hour = "0"+hour;
	}
	if(second-10<0){
		second = "0" + second; 
	}
	if(minute-10<0){
		minute = "0" + minute;
	}
	time.innerHTML = hour+":"+minute+":"+second;
},500);

//footer控制
for(var n = 0;n<footerCtrl.length;n++){
	footerCtrl[n].index = n;
	footerCtrl[n].getElementsByClassName("icon")[1].style.display = "none";
	footerCtrl[0].getElementsByClassName("icon")[1].style.display = "inline-block";
	footerCtrl[0].getElementsByClassName("icon")[0].style.display = "none";
	footerCtrl[n].onclick = function(){
		var page = pageChange(this.index);
		highpage.style.webkitTransform = "translate3d("+page+"px,0,0)";
	}
}
//控制页面函数
function pageChange(index){
	for(var ns = 0;ns<footerCtrl.length;ns++){
		footerCtrl[ns].className="footer-ctrl";
		footerCtrl[ns].getElementsByClassName("icon")[1].style.display = "none";
		footerCtrl[ns].getElementsByClassName("icon")[0].style.display = "inline-block";
	}
	//active切换
	footerCtrl[index].className+=" active";
	var _all = footerCtrl[index].getElementsByClassName("icon");
	if(getStyle(_all[0]).display=="none"){
		_all[0].style.display = "inline-block";
		_all[1].style.display = "none";
	}else{
		_all[1].style.display = "inline-block";
		_all[0].style.display = "none";
	}
	return -(index*currentwidth);
}
//后台数据请求
function getInfo(){
	//兼容ie6
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
	//e.preventDefault();
	var touch = e.touches[0];
	startX = touch.pageX;
	startY = touch.pageY;
	highpage.style.webkitTransition = "";
	startT = new Date().getTime();
	isMove = false;
	
}.bind(this),false);
var deltaX;
document.addEventListener("touchmove",function(e){
	//e.preventDefault(); 
	var touch = e.touches[0];
	 deltaX = touch.pageX - startX;
	 deltaY = touch.pageY - startY;
	//如果向左右位移大于上下则是左右位移
	if(Math.abs(deltaX)>Math.abs(deltaY)&&Math.abs(deltaX)>30){
		nes = parseFloat(nes);
		var len = nes + deltaX;
	 	if(len <=-1080){
			len = -1180;
		}else if(len>=0){
			len = 100;
		}
		console.log(deltaX);
		highpage.style.webkitTransform = "translate3d("+len+"px,0,0)";
	}
});
var nes = 0;
document.addEventListener("touchend",function(e){
	var head = document.getElementsByClassName("box")[0];
	//console.log(getStyle(head).left);
	
	var lens;
	console.log(deltaX);
	/*判断移动距离是否满足*/ 
	console.log(Math.abs(deltaX));
	console.log(currentwidth/4);
	if(Math.abs(deltaX)>currentwidth/4){
		for(var i = 0;i<uppage.length;i++){
			var _nes = Math.abs(nes);
			console.log(_nes);
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
					console.log(12);
				}
				break;
			}
		}
	}else{
					console.log(122);
		
		lens = nes;
	}
	console.log(lens);
	var _len = Math.abs(lens)/currentwidth;
	highpage.style.webkitTransform = "translate3d("+lens+"px,0,0)";
	nes = highpage.style.webkitTransform.slice("12").split("px")[0];	
	pageChange(_len);
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