
// 加入收藏 兼容360和IE6 
function shoucang(sTitle,sURL) 
{ 
try 
{ 
window.external.addFavorite(sURL, sTitle); 
} 
catch (e) 
{ 
try 
{ 
window.sidebar.addPanel(sTitle, sURL, ""); 
} 
catch (e) 
{ 
alert("加入收藏失败，请使用Ctrl+D进行添加"); 
} 
} 
} //e


$(function(){
	
	$("a").focus(function(){this.blur();});
	
    jQuery(".HomeBan").slide({ titCell:".hd ul", mainCell:".bd ul", effect:"fold",autoPlay:true, autoPage:true, trigger:"click" });//banner
	jQuery(".picScroll").slide({ mainCell:"ul",autoPlay:true,effect:"left", vis:4, scroll:1, autoPage:true, pnLoop:false });//公司环境
	
	jQuery(".ProInfo").slide({trigger:"click"});//产品详细页选项卡
	
	$(".ProductCon li a .img").hover(
		function () {
			$(this).children(".infotxt").stop().fadeTo(300, 1);
		}, 
		function () {
			$(this).children(".infotxt").stop().fadeTo(300, 0);
		}
	);//产品中心
	
	$(".ProductCon li").each(function(i,item){
			       if(Number(i+1)%4 == 0){
						 $(this).css({ marginRight: "0" });
					   }
	});//
	
	$(".NewsList li").each(function(i,item){
			       if(Number(i+1)%2 == 0){
						 $(this).css({ marginBottom: "60px" });
					   }
	});//

})



