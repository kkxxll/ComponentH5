// 散点图
var H5ComponentPoint = function(name,cfg) {
	var component = new H5ComponentBase(name,cfg);
	var base = cfg.data[0][1];	//以第一个数据的  比例为大小的100%
	// 输出每个 Point idx 第几项 item 该项
	$.each(cfg.data,function(idx,item) {
		var bg = $('<div class="bg bg_'+idx+'"></div>');
		var point = $('<div class="point point_'+idx+'"></div>');
		point.append(bg);
		var name = $('<div class="name">'+item[0]+'</div>');
		var rate = $('<div class="per">'+(item[1]*100)+'%</div>')

		name.append(rate);
		point.append(name);
		//比例
		var per = (item[1]/base*100)+'%'; //0.4/0.4=1  0.2/0.4=0.5
		point.width(per).height(per);
		//颜色
		if(item[2]) {
			bg.css('background-color',item[2]);
			point.css('background-color',item[2]);

		}

		if(idx==0) {
			(function am(){                            
				bg.animate({"opacity":0},500,function(){                                    
					bg.animate({"opacity":0.2},1500,am);                                 
				});                        
			})();
		}
//位置
// var a = 0
// undefined
// if(a){console.log(1)}
// < undefined
// if(a!=undefined){console.log(1)}
// < 1
		// if(item[3]!==undefined&&item[4]!==undefined) {
		// 	point.css('left',item[3]).css('top',item[4]);
		// }
		point.css('opacity',0).css('left',item[3]).css('top',item[4]);
		if(item[5]!=undefined) {
			setTimeout(function(){
				point.css('opacity',1);
			}, item[5])
		}


		component.append(point);
	});
	return component;
}