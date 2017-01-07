$(function(){
	//header二维码打开
	$(".icon-phone").hover(function(){
		$(".erweima").css("display","block");
	},function(){
		$(".erweima").css("display","none");
	})
	var speed = 600;
	
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
	
	//右侧侧边栏导航
	$(window).scroll(function(){
		returnTop();
	});
	function returnTop(){
		if($(window).scrollTop()>=500){
			$("aside a.top").css("display","block");
		}else{
			$("aside a.top").css("display","none");
		}
	};
	returnTop();
	
	//登陆注册页面点击事件
	$("span.join").click(function(){
		joinIn();
	});
	
	$("span.regist").click(function(){
		regisIn();
	});
	$("span.regist").next().click(function(){
		$(".mask").css("display","none");
	});
	
	var boo = true;
	$("label.join").click(function(){
		if(boo){
			$(this).css("border-color","#FF0044");
			boo = false;
		}else{
			$(this).css("border-color","#ddd");	
			boo = true;
		}
		
	});
	
	//登录注册点击事件
	$("a.join").click(function(){
		joinIn();
	});
	$("a.regis").click(function(){
		regisIn();
	});
	function joinIn(){
		$(".mask").css("display","block");
		$("form.form1").css("display","none");
		$("form.form2").css("display","block");
		$("span.join").addClass("active").next().removeClass("active");
	}
	
	function regisIn(){
		$(".mask").css("display","block");
		$("form.form1").css("display","block");
		$("form.form2").css("display","none");
		$("span.regist").addClass("active").prev().removeClass("active");
	}
	
	//表单验证
	var validator1;
    validator1 = $("#formRegist").validate({
        rules: {
            username: {
                required: true,
                minlength: 8,
                maxlength: 16
            },
            password: {
                required: true,
                minlength: 8,
                maxlength: 16
            },
        },
        messages: {
            username: {
                required: '请输入用户名',
                minlength: '用户名不能小于8个字符',
                maxlength: '用户名不能超过16个字符',
                remote: '用户名不存在'
            },
            password: {
                required: '请输入密码',
                minlength: '密码不能小于8个字符',
                maxlength: '密码不能超过16个字符'
            },
        },


    });    
	
	var validator2;
    validator2 = $("#formJoin").validate({
        rules: {
            username: {
                required: true,
                minlength: 8,
                maxlength: 16
            },
        },
        messages: {
            username: {
                required: '请输入用户名',
                minlength: '用户名不能小于8个字符',
                maxlength: '用户名不能超过16个字符',
                remote: '用户名不存在'
            },
        },
    }); 
})