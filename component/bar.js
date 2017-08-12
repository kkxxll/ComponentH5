var Bar = function(type, cfg, animateIn, animateOut, data) {
    var $component = new Base(type, cfg, animateIn, animateOut, data);

    var $outer;
    var $name;
    var $rate;
    var $line;

    

    for(var key in data) {
        $outer = $('<div class="outer"></div>')
        $name = $('<div class="name"></div>');
        $name.text(key);
        $line = $('<div class="line"><p></p></div>');

        $line.width(300*0.4*data[key]*0.01);

        $rate = $('<div class="rate"></div>');
        $rate.text(data[key]+'%');

        $outer.append($name);
        $outer.append($line);
        $outer.append($rate);
        $component.append($outer);
    }

    return $component;
}

