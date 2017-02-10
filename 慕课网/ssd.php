<!DOCTYPE html>
<html>
	<head>
		<meta charset="gbk">
		<title></title>
		<style>
		*{margin: 0;padding: 0;}
		body{
			font-family: "microsoft yahei";
		}
		#txt{
			position: absolute;
			top: 0;
		}
		#newtxt{
			position: absolute;
			background: #fff;
			/*top: 0;right: 0;left: 0;bottom: 0;*/
			z-index: 1;
		}
		h1{
			font:bold 28px/50px "microsoft yahei";
			text-align: center;
			color: #666;
		}
		.content{
			color: #666;
			width: 90%;
			padding-left:5% ;
			font: 18px/30px "microsoft yahei";
		}
		</style>
	</head>
	<body>
		<div id="txt">
			<div class="hidden">
				<?php
					header('Content-Type: text/html; charset=gbk');
					$i = 0;
					$i++;
					$url = 'http://www.fhxiaoshuo.com/read/49/49437/8800176.shtml';
					 if($_SERVER["REQUEST_METHOD"] == "GET"){
					 	if(!empty($_GET["data"])){
					 		$url = $_GET["data"];
					 	}
					 }
					$fhs = fopen($url, 'r');
					if($fhs){
					    while(!feof($fhs)) {
					        echo fgets($fhs);
					    }
					}
					  echo $url;
				?>
			</div>
		</div>
		<div id="newtxt">
			<div class="btn">
				<div>
					<a class="prev">prev</a>
				</div>
				<div >
					<a class="next">next</a>
				</div>
				<input type="text" name="change" class="changes" value="<?php echo $i; ?>"/>
			</div>
			<div class="title">
			</div>
			<div class="content">
			</div>
			<div class="btn">
				<div>
					<a class="prev">prev</a>
				</div>
				<div >
					<a class="next">next</a>
				</div>
				<input type="text" name="change" class="changes" value="<?php echo $i; ?>"/>
			</div>
		</div>
		<script src="jquery-3.1.0.js"></script>
		<script>
		$(function(){
			var data1,data2;
			function change(){
				var txt = document.getElementById("txt");
				var html = txt.innerHTML;
				//查找小说章节名
				var i = html.search(/<h1>/);
				var j = html.search(/<\/h1>/);
				var title = html.substring(i,j+5);
				var newtxt = document.getElementById("newtxt");
				var htitle = document.getElementsByClassName("title")[0];
				htitle.innerHTML = title;
				//查找小说内容
				var n = html.search(/<!--go-->/);
				var z = html.search(/<div class="bottem">/);
				var titles = html.substring(n,z).slice(9);
				var content = document.getElementsByClassName("content")[0];
				content.innerHTML = titles;
				//查找小说链接
				var prev = document.getElementsByClassName("prev")[0];
				var next = document.getElementsByClassName("next")[0];
				var _ii = html.indexOf("preview_page =");
				var ii = _ii + 16;
				var _jj = html.indexOf("next_page =");
				var jj = _jj + 13;
				//prev.href = html.substr(ii+12,53);
				//console.log(html.substr(ii,53));
				//console.log(typeof html.substr(jj,53));
				data1 = html.substr(ii,53);
				data2 = html.substr(jj,53);
			};
			change();	
			//
			$(".prev").click(function(){
				$.ajax({
					type:"get",
					url:"ssd.php?data="+data1,
					async:true,
					success:function(data){
						$("#txt").html(data);
						change();
						console.log(data);
					},
					error:function(){
						console.log("vsd");
					}
				});
			});
		});
		//str.lastIndexOf("Hello")
		</script>
	</body>
</html>
