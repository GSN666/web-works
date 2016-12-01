$(document).ready(function(){
	// 底部图片动态事件
	var PhotoGallery = function(){
		var self = this;
		this.mask = $('<div id="photoGallery-mask">');
		this.picWrapper = $('<div id="photoGallery-picWrapper">');
		this.bodyNode = $(document.body);
		this.renderDOM();//渲染其他DOM

		this.picIndex = $('div.photoGallery-picIndex');
		this.picDesc = $('div.photoGallery-picDesc');
		this.prevBtn = $('span.photoGallery-prev-btn');
		this.nextBtn = $('span.photoGallery-next-btn');
		this.closeBtn = $('span.photoGallery-close-btn');
		this.picCon = $('img.photoGallery-picCon');

		this.picData = []; //存放图片数据
		this.isGetData = false; //判断是否已经获取到数据
		//绑定事件
		this.bodyNode.on("click",".photoGallery",function(e){
			e.stopPropagation();//阻止事件冒泡
			if(!self.isGetData){
			    self.getData(); //获取所有图片的信息数据
			    self.isGetData = true;
			}
			self.showMaskAndWrapper($(this));
		});

		//关闭弹出
		this.mask.click(function(){
			$(this).fadeOut();
			self.picWrapper.fadeOut();
		});
		this.closeBtn.click(function(){
			self.mask.fadeOut();
			self.picWrapper.fadeOut();
		});
		// 下一个按钮事件
		this.nextBtn.hover(function(){
			if(self.index < self.picData.length-1){
				$(this).addClass('photoGallery-next-btn-show');
			}else if(self.index >=self.picData.length-1){
				$(this).removeClass('photoGallery-next-btn-show');
			}
		},function(){
			$(this).removeClass('photoGallery-next-btn-show');
		}).click(function(e){
				e.stopPropagation();
				if($(this).hasClass('photoGallery-next-btn-show')){
					self.goto("next");
				} else if(self.picData.length == 1){
					self.mask.fadeOut();//大图盒子显示
					self.picWrapper.fadeOut();
				}
		});
		// 上一个按钮事件
		this.prevBtn.hover(function(){
			if(self.index >=1){
				$(this).addClass('photoGallery-prev-btn-show');
			} else if(self.index < 1){
				$(this).removeClass('photoGallery-prev-btn-show');
			}
		},function(){
			$(this).removeClass('photoGallery-prev-btn-show');
		}).click(function(e){
				e.stopPropagation();
				if($(this).hasClass('photoGallery-prev-btn-show')){
					self.goto("prev");
				} else if(self.picData.length == 1){
					self.mask.fadeOut();
					self.picWrapper.fadeOut();
				}
		});
		this.timer = null;
		// 按键事件
		$(window).keyup(function(e){
			var keyValue = e.which;
			if(keyValue == 38 || keyValue == 37){
				self.goto("prev");
			} else if(keyValue == 40 || keyValue == 39){
				self.goto("next");
			}
		}).resize(function(){
			timer = window.setTimeout(function(){
				self.resizePic();
			},200);
		});
	};
	/*不懂*/
	PhotoGallery.prototype = {
		goto : function(str){
			var self = this;
			if(str === "next"){
				this.index ++;
				if(this.index > this.picData.length - 1){//如果是最后一张 下一页按钮隐藏
					$(this).removeClass('photoGallery-next-btn-show');
					this.index = this.picData.length - 1;
				} else {
					var src = this.picData[this.index].src;//因为上面index++ 所以src为下一张图片的路径
					this.loadImg(src,function(){//待图片确认存在后执行回调
						self.picIndex.hide();
						self.picDesc.hide();
						self.closeBtn.hide();
						self.changePic(src);
					});
				}
			}else if(str === "prev"){
				this.index --;
				if(this.index < 0){
					$(this).removeClass('photoGallery-prev-btn-show');
					this.index = 0;
				} else {
					var src = this.picData[this.index].src;
					this.loadImg(src,function(){
						self.picIndex.hide();
						self.picDesc.hide();
						self.closeBtn.hide();
						self.changePic(src);
					});
				}
			}
		},
		showMaskAndWrapper : function(obj){
			var self = this,
				curSrc = obj.attr("data-src"),
				curId = obj.attr("data-id"),
				curDesc = obj.attr("data-desc");
				this.picIndex.hide();
				this.picDesc.hide();
				this.picCon.hide();
				this.closeBtn.hide();
				this.index = this.getIndexOf(curId);

				this.resizePic();
				this.mask.fadeIn();
				this.picWrapper.fadeIn();

				this.loadImg(curSrc,function(){
					self.changePic(curSrc);
				});
		},
		resizePic : function(){//控制图片大小
			var width = $(window).width();
			var height = $(window).height();
			if(height/width >= 0.6){
				height = height*0.6;
			}
			this.picWrapper.animate({
				width:width*0.6,
				height:height*0.8,
				marginLeft:-(width*0.3),
				marginTop:-(height*0.4)
			});
		},
		changePic : function(curSrc){//记录当前图片信息
			this.picCon.attr("src",curSrc).fadeIn();
			this.picIndex.text((this.index+1)+" / "+this.picData.length).fadeIn();
			this.picDesc.text(this.picData[this.index].desc).fadeIn();
			this.closeBtn.fadeIn();
		},
		getIndexOf : function(id){//寻找当前图片角标
			var index = 0;
			$(this.picData).each(function(i){
				index = i;
				if(id === this.id){
					return false;
				}
			});
			return index;
		},
		loadImg : function(src,callback){
			var img = new Image();
			if(!!window.ActiveXObject){
				img.onreadystatechange = function(){
					if(this.readyState == 'complete'){
						callback();
					}
				};
			}else{
				img.onload = function(){
					callback();
				};
			}
			img.src = src;
		},
		getData : function(){//遍历图片 创建自定义对象数组
			var self = this;
			var dataList = $('div#photoGallery-container').find('.photoGallery');
			 dataList.each(function(){
				self.picData.push({//每个图片加id加图片路径加位置
					id:$(this).attr("data-id"),
					src:$(this).attr("data-src"),
					desc:$(this).attr("data-desc")
				});
			});
		},
		renderDOM : function(){
			this.mask.html('<span class="photoGallery-btn photoGallery-prev-btn"></span>'+
		                   '<span class="photoGallery-btn photoGallery-next-btn"></span>');
			this.picWrapper.html('<span class="photoGallery-close-btn"></span>'+
								 '<div class="photoGallery-picIndex">'+
								 '</div>'+
								 '<img class="photoGallery-picCon" src="">'+
								 '<div class="photoGallery-picDesc">'+
								 '</div>');
			this.bodyNode.append(this.mask,this.picWrapper);
		}
	};

	window["PhotoGallery"] = PhotoGallery;
});