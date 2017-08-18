var Polyline = function(type, cfg, animateIn, animateOut, data) {
    var $component = new Base(type, cfg, animateIn, animateOut, data);
    $component.marginLeft
    var w = cfg.width;
    var h = cfg.height;

    //背景层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');

    cns.width = ctx.width = w;
    cns.height = ctx.height = h;

    $component.append(cns);

    var step = 10;

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#777";
    //水平线
    for(var i=0;i<step+1;i++) {
        var y = h/step*i;
        ctx.moveTo(0,y);
        ctx.lineTo(w,y);
    }
    //垂直线，根据数据划分
    step = data.length+1;
    for(var i=0;i<step+2;i++) {
        var x = w/step*i;
        ctx.moveTo(x,0);
        ctx.lineTo(x,h);
        if(data[i]) {
            var $text = $('<div class="name"></div>');
            $text.text(data[i][0]);
            $text.css({
                left: x+w/step/2,
                bottom: -(h/step),
                width: w/step,
                textAlign: 'center',
            })
            $component.append($text);
        }
    }
    ctx.stroke();

    //数据层
    cns = document.createElement('canvas');
    ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $component.append(cns);

    function change(per) {
        ctx.clearRect(0,0,w,h);
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#222";

        //点 文本
        for(var i=0;i<data.length;i++) {
            var item = data[i];
            x = w/(data.length+1)*i+w/(data.length+1);
            y = (1-item[1]*per)*h;
            ctx.moveTo(x,y);
            ctx.fillStyle = item[2] ? item[2] : '#595959';
            ctx.fillText(item[0],x+5,y-15);
            ctx.arc(x,y,3,0,2*Math.PI);
        }

ctx.stroke();
        //线
        ctx.moveTo(w/(data.length+1),h);
        for(var i=0;i<data.length;i++) {
            var item = data[i];
            x = w/(data.length+1)*i+w/(data.length+1);
            y = (1-item[1]*per)*h;
            ctx.lineTo(x,y);
        }

        ctx.lineWidth = 1;

        ctx.lineTo(w-w/(data.length+1),h);
        ctx.lineTo(w/(data.length+1),h);

        ctx.fillStyle = 'rgba(89, 255, 120, 0.3)';
        ctx.fill();


        ctx.closePath();
    }

    $component.on('load',function(){
        var s = 0;
        for( i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                change(s);
            },i*10+500);
        }
    });
    $component.on('leave',function(){
        var s = 1;
        for( i=0;i<100;i++){
            setTimeout(function(){
                s-=.01;
                change(s);
            },i*10);
        }
    });
    return $component;
}
