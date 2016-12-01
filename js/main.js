/*
	主页动态设置
*/
$(document).ready(function(){
	//画廊动态事件
	$(function(){
	    $('.container').dreamSlider({
	        rowCount:6
	    });
	});

	// 网页底部图片事件
	$(function(){
		var photoGallery = new PhotoGallery();
	});

	// 订单事件（重置按钮）
	$('.button a').click(function(event) {
		location.href = 'order/index.html';
		$('#popup').fadeOut(500);
	});
	// 模态层事件
	$('#popup').click(function(event) {
		$(this).fadeOut(500);
	});
	$('#dialog').click(function(event) {
		return false;//阻止默认和冒泡事件
	});
	$('button').click(function(event) {
		$('#popup').fadeOut(500);
	});
	$('.button input[type=button]').click(function(event) {
		$('#popup').fadeOut(500);
	});
	$('.sign').click(function(event) {
		$('#popup').fadeIn(1000);
	});

	// 历史介绍动态设置
	var select = $('.select');
	var item = $('.content-item');
	select.on('click', 'li', function(event) {

	var num = $(this).text() % 10;
	item.each(function(index, el) {
		$(el).slideUp(10);
		$('.select li').removeClass('active');
	});
	
	item.eq(num).slideDown(800);
	$(this).addClass('active');

	});
	
	// 网页底部提示框(滚动条事件)
	$(window).scroll(function(event) {
		var top = $(window).scrollTop();//滚动条位置
		var clientH = $(window).height();//视口高度
		var offsetH = $(document).height();//网页高度
		if ( top + clientH == offsetH ) {
			$('.loginTxt').slideDown(500);
			$('.loginTxt').addClass('fixed');
		}
		 else {
			$('.loginTxt').slideUp(300);
		}
	});

	/*登录/注册按钮*/
	$('.btn').click(function(event) {
		$('#login').fadeIn(500);
	});
	$('#login').click(function(event) {
		$(this).hide();
	});
	$('#register').click(function(event) {
		$(this).hide();
	});
	$('.reg_login_panel').click(function(event) {
		return false;
	});
	// 关闭按钮
	$('#login p').click(function(event) {
		$('#login').hide();
	});
	$('#register p').click(function(event) {
		$('#register').hide();
	});
});
