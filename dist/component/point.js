var Point = function(type, cfg, animateIn, animateOut, data) {
    var $component = new Base(type, cfg, animateIn, animateOut, data);

    $.each(data,function(idx, item ) {
        var cur_data = item;
        var $point = $('<div class="point"></div>');
        var $name = $('<div class="name"></div>');
        var $rate = $('<div class="rate"></div>');

        $name.text(cur_data[0]);
        $rate.text(cur_data[1]+'%');

        $point.append($name);
        $point.append($rate);

        $point.css({
            width: cfg.width*0.7*cur_data[1]*0.01,
            height: cfg.width*0.7*cur_data[1]*0.01,
            backgroundColor: cur_data[2],
            left: cur_data[3],
            top: cur_data[4]
        })
        if(cur_data[5]) {
            $point.addClass('breathe');
        }

        $point.css({
            'transition':'1s all '+idx*.5+'s'
        })
        $component.append($point);
    })


    return $component;
}

