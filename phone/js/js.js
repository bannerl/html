$(document).ready(function(){
	var currentwidth = $(".first-page").width();
	//highpage位置变换
	function highpageMove(len){
		$("#highpage").css({"transform":"translate3d("+len+"px,0,0)"});
	};
	highpageMove('0');
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
		$(".time").html(hour+":"+minute+":"+second);
	},500);
	
	//footer控制页面变化
	for(var n = 0;n<$(".footer-ctrl").length;n++){
		$(".footer-ctrl").get(n).index = n;
		$(".footer-ctrl").get(n).getElementsByClassName("icon")[1].style.display = "none";
		$(".footer-ctrl").get(0).getElementsByClassName("icon")[1].style.display = "inline-block";
		$(".footer-ctrl").get(0).getElementsByClassName("icon")[0].style.display = "none";
		$(".footer-ctrl").get(n).onclick = function(){
			var page = pageChange(this.index);
			highpage.style.webkitTransform = "translate3d("+page+"px,0,0)";
		}
	}
	
	//控制页面函数
	function pageChange(index){
		for(var ns = 0;ns<$(".footer-ctrl").length;ns++){
			$(".footer-ctrl").get(ns).className="footer-ctrl";
			$(".footer-ctrl").get(ns).getElementsByClassName("icon")[1].style.display = "none";
			$(".footer-ctrl").get(ns).getElementsByClassName("icon")[0].style.display = "inline-block";
		}
		//active切换
		$(".footer-ctrl").get(index).className+=" active";
		var _all = $(".footer-ctrl").get(index).getElementsByClassName("icon");
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
		$.ajax({
			type:"GET",
			url:"js/user.json",
			dataType:"json",
			success:function(data){
				var html = $("<p class='name'>"+data[0].name
				+"</p><p class='number'>"+data[0].number+"</p>");
				$(".user-info").html(html);
			}
		});
	}
	getInfo();
	
	//touchestart
	var startX,startY,highpagewidth,movesX;
	document.addEventListener("touchstart",function(e){
		if(!highpagewidth){
			highpagewidth = 0;
		}
		var ts = e.touches[0];
		
		startX = ts.pageX;
		startY = ts.pageY;
	});
	//move
	document.addEventListener("touchmove",function(e){
		var ts = e.touches[0];
		 moveX = ts.pageX - startX;
		 moveY = ts.pageY - startY;
		 movesX = moveX;
		 
		if(Math.abs(moveX)>Math.abs(moveY)){
			highpagewidth = 1*highpagewidth;
			var len = moveX + highpagewidth;
		 	if(moveX>0){
				moveX = 0;
			}else if(moveX<0){
				if(moveX<=(-currentwidth*3)){
					moveX = -currentwidth*3;
				}
			}
		}
	});
	//end
	document.addEventListener("touchend",function(e){
		var len;
		//判断手指移动距离是否满足要求
		if(Math.abs(movesX)>currentwidth/7){
			if(movesX>0){
				len = 1*highpagewidth + currentwidth;
				if(len>=0){
					len = 0;
				}
			}else if(movesX<0){
				len = highpagewidth -currentwidth;
				if(len<=(-currentwidth*3)){
					len = -currentwidth*3;
				}
			}
		}
		$("#highpage").get(0).style.webkitTransform = "translate3d("+len+"px,0,0)";
		//获取当前值
		highpagewidth = $("#highpage").get(0).style.webkitTransform.slice("12").split("px")[0];
		var index = Math.abs(highpagewidth/currentwidth);
		pageChange(index);
	});
	
	//获取样式
	function getStyle(ele) {
	    var style = null;
	    if(window.getComputedStyle) {
	        style = window.getComputedStyle(ele, null);
	    }else{
	        style = ele.currentStyle;
	    }
	    return style;
	}
});
