var H5 = function() {
	this.id = ('h5_'+Math.random()).replace('.','_');
	this.el = $('<div class="h5" id="'+this.id+'">').hide();
	this.page = [];
	$('body').append(this.el);

	this.addPage = function(name,text){
		var page = $('<div class="h5_page section"></div>');
		if (name!=undefined) {
			page.addClass('h5_page_'+name);
		}
		if (text!=undefined) {
			page.text(text);
		}
		this.el.append(page);
		this.page.push(page);
		return this;  //返回的是h5本身这个对象
	}
	this.addComponent = function(name, cfg) {
		var cfg = cfg||{};
		cfg = $.extend({
			type: 'base'
		},cfg);
		var component;
		var page = this.page.slice(-1)[0]; //从已有的数组中返回选定的元素
		switch(cfg.type) {
			case 'base':
				component = new H5ComponentBase(name,cfg);
			break;
			default:
		}
		page.append(component);
		return this;
	}
	this.loader = function() {
		this.el.fullpage({
			onLeave: function(index, nextIndex, direction) {
				console.log(this);
				//index 从1开始的
				$(this).find('.h5_component').trigger('onLeave');
			},
			afterLoad: function(anchorLink,index) {
				$(this).find('.h5_component').trigger('onLoad');
			}
			
		});
		//自动刷新
		this.page[0].find('.h5_component').trigger('onLoad');
		this.el.show();
	}

	return this;//良好的编程习惯，把自己本身给返回回去
}