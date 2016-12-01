$(document).ready(function(){
	// 立即注册按钮
	$('#btn1').children('a').click(function(event) {
		$('#login').css('display','none');
		$('#register').css('display','block');
	});
	// 动态控制登陆面板大小
	var w = $(window).width();
	$('#login').width(w);

	$(window).resize(function(event) {
		var w = $(window).width();
		$('#login').width(w);
	});
	
	// 勾选记住我选项，提示安全信息
	$('#remeber input').click(function(event) {
		if($(this).prop('checked')){
			$('.remeber_msg').fadeIn('slow');
			setTimeout(function(){
				$('.remeber_msg').fadeOut('slow');
			},2500);
			// 如果登录时选中记住我，则记录此次登录的用户名
			localStorage.setItem('remember',$('#login-name').val());
			
		}else{
			// 取消记住我选项，删除localstorage中的remember
			localStorage.removeItem('remember');
		}
	});
	
	// 如果localstorage中存在remember，则自动显示用户名和密码，记住我仍为选中状态
	if(localStorage.getItem('remember')){

		$('#remeber input').attr('checked',true);

		// 取出remember中存储的用户名
		$('#login-name').val(localStorage.getItem('remember'));

		// 取出对应用户名的密码
		$('#login-pwd').val(JSON.parse(localStorage.getItem(localStorage.getItem('remember'))).userPwd);
	}

	// 点击登录按钮，验证用户名和密码
	$('#submit-login').click(function(event){
		var username = $('#login-name').val();
		var password = $('#login-pwd').val();
		if(!localStorage.getItem(username)){
			$('#login-name').parent().after('<p class="usernameMsg msg">请输入格式正确的邮箱/手机号</p>');
			$('#login-name').val('');
			return;
		}else{
			if(password != JSON.parse(localStorage.getItem(username)).userPwd){
				$('#login-pwd').parent().after('<p class="usernameMsg msg">请输入正确的密码</p>');
				$('#login-pwd').val('');
				return;
			}
			else{
				alert('登录成功');
				location.href = 'comment/WebContent/index.html';
				$('.login-bg').css('display','none');
			}
		}
					
	});
	// 登录名输入框获得焦点时，提示信息消失
	$('#login-name').focus(function(event) {
		$('.usernameMsg').remove();
	});
	// 密码输入框获得焦点时，提示信息消失
	$('#login-pwd').focus(function(event) {
		$('.usernameMsg').remove();
	});
});