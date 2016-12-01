/*
  works设置动态js

*/

$(document).ready(function(){

  // 左偏移量小与视口宽度返回函数
  var isVisible = function(){
    var left = $(this.hash).offset().left,
        visibleWidth = $(window).width();
    return left < visibleWidth;
  }

  // 获得遍历的对象
  var list = $('.demo-wrapper ul');
  // 动态显示函数
  var showVisibleItems = function(){
    list.children('.item:not(.falldown)').each(function(index, el) {
      if($(this).isVisible()){//若返回小于就显示
        $(this).addClass('falldown');
      }
    });
  }

  showVisibleItems();//调用动态显示函数

  // 滚动显示调用函数
  list.scroll(function() {
    showVisibleItems();
  });

  // 鼠标移上图片效果事件（事件委托）
  list.on('mousemove', 'img', function(e) {
    //鼠标的位置
    var posX = e.pageX,
        posY = e.pageY,
        data = $(this).data('cache');
    // 缓存必要的变量
    if (!data) {
      data = {};//定义空对象
      data.marginTop = parseInt($(this).css('top'));
      data.marginLeft = parseInt($(this).css('left'));
      data.parent = $(this).parent('.view');
      $(this).data('cache', data);
    }
    // 图片父元素偏移量
    var originX = data.parent.offset().left,
        originY = data.parent.offset().top;
    // 图片随鼠标移动(保证图片不偏离指定区域)
    $(this).css({
      'left': (posX - originX) / data.marginLeft,
      'top': (posY - originY) / data.marginTop
    });

  });

  // 鼠标离开图片还原
  list.on('mouseLeave', '.item', function(e) {
    
    $(this).find('img').css({
      'left':'0',
      'top':'0'
    });

  });

  //添加鼠标滚轮支持jquery.mousewheel插件
  list.mousewheel(function(event, delta) {
    this.scrollLeft -= (delta * 60);
    event.preventDefault();
  });

});
