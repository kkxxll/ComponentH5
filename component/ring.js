var Ring = function(type, cfg, animateIn, animateOut, data) {
    var $component = new Pie(type, cfg, animateIn, animateOut, data);
    $mask = $('<div class="mask"></div>');
    var w = $component.width();
    
    $mask.css({
        marginLeft: -w*.8/2,
        marginTop: -w*.8/2
    })
    $component.append($mask);

    $component.find('.name').css({
        width: w,
        height: w,
        left: 0,
        top: 0,
        lineHeight: w+'px',
        textAlign: 'center'
    })
    $component.find('.rate').css({
        width: w,
        height: w,
        left: 0,
        top: 0,
        lineHeight: w*.5+'px',
        textAlign: 'center'
    })
    
    return $component;
}