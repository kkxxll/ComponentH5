var Bar_v = function(type, cfg, animateIn, animateOut, data) {
    var $component = new Base(type, cfg, animateIn, animateOut, data);

    var $outer_v;
    var $inner_v;
    var $name_v;
    var $rate_v;
    var $line_v;
    $outer_v = $('<div class="outer_v"></div>');
    $outer_v.css({
      width: '100%',
      height: '100%'
    })
    var obj = Object.keys(data);
    var len = obj.length;
    var inner_v_w = Math.floor(100/len);
    for(var key in data) {
        len++;
        $inner_v = $('<div class="inner_v"></div>');
        $inner_v.css({
          'width': inner_v_w+'%'
        })
        $name_v = $('<div class="name_v"></div>');
        $name_v.text(key);
        $line_v = $('<div class="line_v"><p></p></div>');


        $line_v.height(200*0.7*data[key]*0.01);

        $rate_v = $('<div class="rate_v"></div>');
        $rate_v.text(data[key]+'%');

        $inner_v.append($rate_v);
        $inner_v.append($line_v);
        $inner_v.append($name_v);
        $outer_v.append($inner_v);
    }

    $component.append($outer_v);
    return $component;
}
