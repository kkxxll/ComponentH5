var Base = function(type, cfg, animateIn, animateOut, data) {
    var $component = $('<div class="component"></div>');
    if(typeof data == 'string') {
        $component.text(data);
    }
    

    $component.css(cfg)

    if(cfg.center) {
        $component.css({
            left: '50%',
            marginLeft: -(cfg.width/2)+'px',
            textAlign: 'center'
        })
    }

    if(cfg.rock) {
        $component.addClass('kk-rock')
    }
    $component.on('load', function() {
        if(type=='base') {
             $component.animate(animateIn).removeClass(type+'_hide').addClass(type+'_show').addClass(type);
         }else{
            setTimeout(function(){
                $component.animate(animateIn).removeClass(type+'_hide').addClass(type+'_show').addClass(type);
            },800)
         }
        
        return false;
    });
    $component.on('leave', function() {
        $component.animate(animateOut,800).removeClass(type+'_show').addClass(type+'_hide');
        return false;
    })

    return $component;
}