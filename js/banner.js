/*
	banner区图片动态设置
*/

window.onload = function(){
	// 获得图片对象
	var slider = document.getElementById('slider');
	var sliderImg = slider.getElementsByTagName('img');
	// 获得文字对象
	var sliderText = document.getElementById('slider-text');
	var sliderSpan = sliderText.getElementsByTagName('span');
	// 判断循环函数
	function scope(i) {
		if (i < 0)
			i = 4;
		if (i >= 4)
			i = 0;
		return i;
	}
	// 初始化图片
	var bannerInitnum = 1;
	var sliderTextnum = 0;
	// 动态显示图片函数
	function banner() {
		// 清除延时
		clearInterval(bannerTimeId);
		// 图片百分百显示
		sliderImg[bannerInitnum].className = 'show';
		sliderSpan[sliderTextnum].className = 'block';
		console.log(bannerInitnum);//输出当前图片下标
		// 2秒后图片按80%显示隐藏
		setTimeout(function() {
			sliderImg[bannerInitnum].className = 'hid';
			sliderSpan[sliderTextnum].className = 'rgb';
		},2000);
		// 3秒后当前图片隐藏，下一张图片显示
		setTimeout(function() {
			sliderImg[bannerInitnum].className = 'down';
			sliderImg[scope(bannerInitnum + 1)].className = 'inactive';
			sliderSpan[sliderTextnum].className = '';
			sliderSpan[scope(sliderTextnum + 1)].className = 'rgb';
		},3000);
		// 4秒显示全屏
		setTimeout(function() {
			sliderImg[scope(bannerInitnum + 1)].className = 'show';
			sliderSpan[scope(sliderTextnum + 1)].className = 'block';
		},4000);

		setTimeout(function() {
			sliderImg[bannerInitnum].className = '';
			bannerInitnum = scope(bannerInitnum + 1);
			sliderSpan[sliderTextnum].className = '';
			sliderTextnum = scope(sliderTextnum + 1);
			bannerTimeId = setInterval(banner,2000);
		},4500);
	}
	// 定义定时器
	var bannerTimeId = setInterval(banner,0);
	
	/*
		获得地理位置成功
	*/

	function showMap(position) {
		//获得用户的经纬度
		var longitude = 121.5113442053978;
		var latitude = 38.860614891153396;

		alert('当前位置：' + longitude + ',' + latitude);

		//调用百度地图API
		var map = new BMap.Map('map');
		var point = new BMap.Point(longitude,latitude);//创建坐标点		
		map.centerAndZoom(point,15);//设置中心点和缩放级别
				
		var marker = new BMap.Marker(point);//创建标记
		map.addOverlay(marker);//在地图上加上标记
		
		  
		// 添加地图类型控件,默认位于地图右上方
		map.addControl(new BMap.MapTypeControl());  
		// 地图平移缩放控件,PC端默认位于地图左上方，它包含控制地图的平移和缩放的功能。移动端提供缩放控件，默认位于地图右下方
		map.addControl(new BMap.NavigationControl());  
		// 比例尺控件 ,默认位于地图左下方，显示地图的比例关系 
		map.addControl(new BMap.ScaleControl());  
		// 缩略地图控件，默认位于地图右下方，是一个可折叠的缩略地图。
		map.addControl(new BMap.OverviewMapControl());
		// 定位控件，针对移动端开发，默认位于地图左下方
		map.addControl(new BMap.GeolocationControl());
		// 开启鼠标滚轮缩放
		map.enableScrollWheelZoom(true);

		//坐标转换完之后的回调函数
	    translateCallback = function (data) {	    				
			if(data.status === 0) {
				var marker = new BMap.Marker(data.points[0]);
				map.addOverlay(marker);
				
				map.setCenter(data.points[0]);//设置中心点
			}
	    }

		// 转换gps坐标为百度坐标，延迟3000毫秒不是必须的，只是能够看出两个点的不同
	    setTimeout(function(){
	        var convertor = new BMap.Convertor();
	        var pointArr = [];
	        pointArr.push(point);
	        convertor.translate(pointArr, 1, 5, translateCallback)
	    }, 3000);
		
	}
	showMap();
}