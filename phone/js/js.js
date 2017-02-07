var highpage = document.getElementById("highpage");
var uppage = document.getElementsByClassName("first-page");
var currentwidth = parseInt(getStyle(uppage[0]).width);

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