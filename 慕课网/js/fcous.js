;(function($){
	var Fcous = function(ele,data){
		this.dom = ele;                       //dom节点
		this.data = data;                     //图片数据
		this.body = this.dom.find("#J_body"); //ul列表
		this.prev = this.dom.find(".prev");   //左侧按钮
		this.next = this.dom.find(".next");   //右侧按钮
		this.btns = this.dom.find(".mouji a"); //下侧按钮
		
		this.Active = "active";				  //焦点图获得焦点状态
		this.lisLen = 3;					  //图片数量
		this.boo = true;					  
		this.speed = 600;                     //切换速度
		this.hoverSpeed = 3000;               //自动切换速度
		
		this.createInner();                   //创建li列表
		this.prevMove();                      //左侧点击函数 
		this.lis = this.dom.find("#J_body li");
		this.nextMove();					  //右侧点击函数 
		this.btnClick();                      //下面点击函数 
		this.onup();						  //自动切换点击函数 
	};
	Fcous.prototype = {
		createInner:function(){
			var self = this;
			self.body.html(function(){
				var html = [];
				for(var i =0;i<self.lisLen;i++){
					if(i ===0){
						var _html = '<li class="active"><a href="javascript:;">'+
									'<img src='+self.data[i]+' alt="商品"/>'+
									'</a></li>'
					}else{
						var _html = '<li class=""><a href="javascript:;">'+
									'<img src='+self.data[i]+' alt="商品"/>'+
									'</a></li>'
					}
					html.push(_html);
				}
				return html.join("");
			});	
		},
		nextMove:function(){
			var self = this;
			self.next.click(function(){
				self.lis.each(function(i){
					if(self.lis.eq(i).is(":animated")){
						return false;
					};
					if(self.lis.eq(i).hasClass(self.Active)){
						var j = i;
						$(this).animate({
							"opacity":"0",
							"zIndex":"0"
						},self.speed,function(){
							$(this).removeClass(self.Active);
						});
						if(j===self.lis.length-1){
							self.lis.eq(0).animate({
								"opacity":"1",
								"zIndex":"1"
							},self.speed,function(){
								$(this).addClass(self.Active);
							});
							self.btns.eq(0).addClass(self.Active);
						}else{
							$(this).next().animate({
								"opacity":"1",
								"zIndex":"1"
							},self.speed,function(){
								$(this).addClass(self.Active);
							});
							self.btns.eq(j + 1).addClass(self.Active);
						};
						self.btns.eq(j).removeClass(self.Active);
						
						
					}
				})
			})
		},
		prevMove:function(){
			var self = this;
			self.prev.click(function(){
				self.lis.each(function(i){
					if(self.lis.eq(i).is(":animated")){
						return false;
					};
					if(self.lis.eq(i).hasClass(self.Active)){
						var j = i;
						$(this).animate({
							"opacity":"0",
							"zIndex":"0"
						},self.speed,function(){
							$(this).removeClass(self.Active);
						});
						if(j===0){
							self.lis.eq(self.lisLen-1).animate({
								"opacity":"1",
								"zIndex":"1"
							},self.speed,function(){
								$(this).addClass(self.Active);
							});
							self.btns.eq(self.lisLen-1).addClass(self.Active);
						}else{
							$(this).prev().animate({
								"opacity":"1",
								"zIndex":"1"
							},self.speed,function(){
								$(this).addClass(self.Active);
							});
							self.btns.eq(j - 1).addClass(self.Active);
						};
						self.btns.eq(j).removeClass(self.Active);
					};
				});
			});
		},
		btnClick:function(){
			var self = this;
			self.btns.each(function(i){
				$(this).click(function(){
					var $index = $(this).index();
					
					self.lis.each(function(i){
						if(self.lis.eq(i).is(":animated")){
							return false;
						};
						if(self.lis.eq(i).hasClass(self.Active)){
							var j = i;
							if($index === j){
								return false;
							}else{
								self.lis.eq($index).animate({
									"opacity":"1",
									"zIndex":"1"
								},self.speed,function(){
									$(this).addClass(self.Active);
								});
								self.lis.eq(j).animate({
									"opacity":"0",
									"zIndex":"0"
								},self.speed,function(){
									$(this).removeClass(self.Active);
								});
								self.btns.each(function(i){
									$(this).removeClass(self.Active);
								});
								self.btns.eq($index).addClass(self.Active);
							};
						};
					});	
				});
			});
		},
		onup:function(){
			var self = this;
			var timer = setInterval(function(){
				self.next.trigger("click");
			},self.hoverSpeed);
			self.body.hover(function(){
				clearInterval(timer);
			},function(){
				timer = setInterval(function(){
					self.next.trigger("click");
				},self.hoverSpeed);
			});
				
		}
	};
	
	Fcous.init = function(ele,data){
		new Fcous(ele,data);
	}
   window["Fcous"] = Fcous;	
})(jQuery);
