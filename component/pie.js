var Pie = function(type, cfg, animateIn, animateOut, data) {
    var $component = new Base(type, cfg, animateIn, animateOut, data);


    var w = cfg.width;
    var h = cfg.height;

    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w-1;
    cns.height = ctx.height = h-1;

    var r =w/2;

    $component.append(cns);  

    //背景层
    ctx.beginPath();
    ctx.fillStyle='#eee';
    ctx.strokeStyle='#eee';
    ctx.lineWidth = 1;
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();



    //数据层
    cns = document.createElement('canvas');

    ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height =h;
    ctx.closePath();
    $component.append(cns);

    var start = 1.5*Math.PI;//12点钟
    var end = 0;

    var step = data.length;

    for(var i=0;i<step;i++) {
        ctx.beginPath();
        ctx.fillStyle = data[i][2];
        ctx.strokeStyle = "blue";
        ctx.lineWidth = .1;
        ctx.moveTo(r,r);
        end = start+data[i][1]*Math.PI*2;
        ctx.arc(r,r,r,start,end);
        ctx.fill();
        ctx.stroke();
        start = end;

        var $name = $('<div class="name">');
        $name.text(data[i][0] );
        var $rate =  $('<div class="rate">');
        $rate.text(data[i][1]*100 +'%'  );
        $name.append($rate);

        var rad = (-(start-1.5*Math.PI))+Math.PI
        var x =  r + Math.sin(rad) * r;
        var y =  r + Math.cos(rad) * r;


        $name.css({
            left: x,
            top: y
        })
        
        $component.append($name)
    }

    //遮罩层
    cns = document.createElement('canvas');

    ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height =h;

    $component.append(cns);

    // ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);

    ctx.beginPath();
    ctx.fillStyle='#eee';
    ctx.strokeStyle='#eee';
    ctx.lineWidth = 1;
    ctx.moveTo(r,r);
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.stroke();

    ctx.fill();
    ctx.closePath();

    function change(rate) {
        ctx.beginPath();
        ctx.clearRect(0,0,w,h);
        ctx.fillStyle='#eee';
        ctx.moveTo(r,r);
        ctx.arc(r,r,r,1.5*Math.PI,1.5*Math.PI+2*Math.PI*rate,true);
        ctx.stroke();
        ctx.fill();
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