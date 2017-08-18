var Radar = function(type, cfg, animateIn, animateOut, data) {
    var $component = new Base(type, cfg, animateIn, animateOut, data);

    var w = cfg.width;
    var h = cfg.height;

    //背景层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height =h;
    $component.append(cns);
    var step = data.length;
    var r = w/2;

    //绘制背景
    var flag = false;
    for( var s = 10;s >0 ;s--){

        ctx.beginPath();
        for(var i=0;i<step;i++){
            var  rad = (2*Math.PI/360)*(360/step)*i;

            var x = r+Math.sin(rad)*r*(s/10);
            var y = r+Math.cos(rad)*r*(s/10);
            ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.fillStyle = (flag = !flag) ? '#d657e6' : '#eea7f2';
        ctx.fill();
    }

    //绘制框架和文字
    for(var i = 0;i<step;i++){
        var rad = (2*Math.PI/360)*(360/step)*i;

        var x = r+Math.sin(rad)*r;
        var y = r+Math.cos(rad)*r;
        ctx.moveTo(r,r);
        ctx.lineTo(x,y);
        //输出项目文字
        var $name = $('<div class="name">');
        $name.text(data[i][0]);
        $name.css('transition','all 1s '+ i*.1 + 's');

        $name.css({
            left: x,
            top: y
        })

        if(x<w/2){
            $name.css('left',x-25);
        }else{

        }

        $component.append($name);

    }
    ctx.strokeStyle = '#999';
    ctx.stroke();

    //数据层
    cns = document.createElement('canvas');
    ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $component.append(cns);

    var change = function( per ){



        ctx.clearRect(0,0,w,h);


        for(var i=0;i<step;i++){
            var rad = (2*Math.PI/360)*(360/step)*i;

            var rate = data[i][1] * per;

            var x = r+Math.sin(rad)*r*rate;
            var y = r+Math.cos(rad)*r*rate;

            ctx.lineTo(x,y);

        }
        ctx.closePath();
        ctx.stroke();


        ctx.fillStyle = 'red';
        for(var i=0;i<step;i++){
            var rad = (2*Math.PI/360)*(360/step)*i;
            var rate = data[i][1] * per;
            var x = r+Math.sin(rad)*r*rate;
            var y = r+Math.cos(rad)*r*rate;

            ctx.beginPath();
            ctx.arc(x,y,5,0,2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }


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
