$(function(){
	//header二维码打开
	$(".icon-phone").hover(function(){
		$(".erweima").css("display","block");
	},function(){
		$(".erweima").css("display","none");
	})
	
	//动画移上事件
	$("#model-item .top").each(function(){
		$(this).hover(function(){
			$(this).stop(true, false).animate({
				top:"40px"
			},600);
		},function(){
			$(this).animate({
				top:"90px"
			},600)
		})
	});
	
	//右侧固定导航条
	$(window).scroll(function(){
		returnTop();
	});
	function returnTop(){
		if($(window).scrollTop()>=500){
			$(".aside a.top").css("display","block");
		}else{
			$(".aside a.top").css("display","none");
		}
	};
	returnTop();
	
	//导航筛选
	$(".job-filter a").each(function(i){
		filter($(".job-filter a").eq(i),$(".job-filter a"));
	});
	
	$(".job-list a").each(function(i){
		filter($(".job-list a").eq(i),$(".job-list a"));
	});
	
	$(".job-cell a").each(function(i){
		filter($(".job-cell a").eq(i),$(".job-cell a"));
	});
	
	function filter($obj,$ele){
		$obj.click(function(){
			if($obj.hasClass("active")){
				return false;
			}else{
				$ele.each(function(){
					$(this).removeClass("active");
				});
				$obj.addClass("active");
			}
		})
	};
	
	
	//用户筛选是否已看
	$(".hide-filter i").click(function(){
		if($(".hide-filter").hasClass("active")){
			$(this).css({"marginLeft":"-50px"});
			$("span.hide-filter").removeClass("active");
		}else{
			$(this).css({"marginLeft":"-25px"});
			$("span.hide-filter").addClass("active");
		}
		
	})
	
})