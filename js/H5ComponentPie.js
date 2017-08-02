// 基本图文组件对象
var H5ComponentPie = function(name,cfg) {
	var component = new H5ComponentBase(name,cfg);
	
	var w = cfg.width;
	var h = cfg.height;

	//加入一个底图层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',1);
	component.append(cns);

	var r = w/2;
	
	ctx.beginPath();
	ctx.fillStyle = '#eee';
	ctx.strokeStyle = '#eee';
	ctx.lineWidth = 1;
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();

	//绘制一个数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',2);
	component.append(cns);

	var colors = ['red','blue','green',
	'yellow','orange'];
	var sAngel = 1.5*Math.PI;//开始角度
	var eAngel = 0;//结束角度
	var aAngel = Math.PI*2; //100%的圆结束角度

	// ctx.beginPath();
	// ctx.fillStyle = '#f00';
	// ctx.strokeStyle = '#f00';
	// ctx.lineWidth = 1;
	// ctx.moveTo(r,r);//起始点  即圆心
	// ctx.arc(r,r,r,sAngel,eAngel);
	// ctx.fill();
	// ctx.stroke();
	// 
	var step = cfg.data.length;
	for(var i=0;i<step;i++) {
		var item = cfg.data[i];
		var color = item[2]||(item[2]=colors.pop());

		eAngel = sAngel+aAngel*item[1];//更新结束角度
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.lineWidth = .1;
		ctx.moveTo(r,r);//起始点  即圆心
		ctx.arc(r,r,r,sAngel,eAngel);
		ctx.fill();
		ctx.stroke();
		sAngel = eAngel;//更新开始角度



		//加入项目名称
		var text = $('<div class="text">');
		text.text(cfg.data[i][0]);
		var per = $('<div class="per">');
		per.text(cfg.data[i][1]*100+'%');
 
		var x = r+Math.sin(.5*Math.PI-sAngel)*r;
		var y = r+Math.cos(.5*Math.PI-sAngel)*r;

		// text.css('left',x/2);
		// text.css('top',y/2);
		if(x>w/2) {
			text.css('left',x/2);
		}else {
			text.css('right',(w-x)/2);
		}

		if(y>h/2) {
			text.css('top',y/2+10);
		}else {
			text.css('bottom',(h-y)/2+10);
		}
		if(cfg.data[i][2]){
			text.css('color',cfg.data[i][2]);
		}
		text.css('opacity',0);
		text.append(per);

		component.append(text);
	}
	//加入一个蒙板层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',3);
	component.append(cns);

	var r = w/2;
	
	
	ctx.fillStyle = '#eee';
	ctx.strokeStyle = '#eee';
	ctx.lineWidth = 1;
	
	

	//生长动画
	
	function draw(per) {
		ctx.clearRect(0,0,w,h);
		ctx.beginPath();
		ctx.moveTo(r,r);
		if(per<=0){
			ctx.arc(r,r,r,0,2*Math.PI);
			component.find('.text').css('opacity',0);
		}else{
			ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
		}
		// ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
		ctx.fill();
		ctx.stroke();
		if(per>=1){
			component.find('.text').css('opacity',1);
		}
	}
	component.on('onLoad',function(){
		var s = 0;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s+=.01;
				draw(s);
			},i*10+500)
		}
	});
	component.on('onLeave',function(){
		var s = 1;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s-=.01;
				draw(s);
			},i*10)
		}
	})
	return component;
}




