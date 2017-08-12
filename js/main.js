/* 
* @Author: kxiner
* @Date:   2017-08-11 15:28:20
* @Last Modified by:   kxiner
* @Last Modified time: 2017-08-12 21:07:56
*/


var H5 = function() {
    this.container = $('<div id="fullpage"></div>');
    this.sections = [];
    this.loaded = 0;
    this.imgsCount = 0;
    this.addSection = function() {
        var $section = $('<div class="section"></div>');
        this.container.append($section);
        this.sections.push($section);
        return this;
    }
    this.addComponent = function(type, cfg, animateIn, animateOut, data) {
        var $component;
        switch(type){
            case 'base' :
                $component = new Base(type, cfg, animateIn, animateOut, data);
                break;
            case 'bar' :
                $component = new Bar(type, cfg, animateIn, animateOut, data);
                break;
            case 'bar_v' :
                $component = new Bar_v(type, cfg, animateIn, animateOut, data);
                break;
            case 'point' :
                $component = new Point(type, cfg, animateIn, animateOut, data);
                break;
            case 'polyline' :
                $component = new Polyline(type, cfg, animateIn, animateOut, data);
                break;
            case 'pie' :
                $component = new Pie(type, cfg, animateIn, animateOut, data);
                break;
            case 'ring' :
                $component = new Ring(type, cfg, animateIn, animateOut, data);
                break;
            case 'radar' :
                $component = new Radar(type, cfg, animateIn, animateOut, data);
                break;
            default:
        }

        



        
        this.sections[this.sections.length-1].append($component);

        return this;
    }
    this.loading = function(imgs) {
        var that = this;
        if(imgs!=undefined) {
            $('body').text('0%');
            this.imgsCount = imgs.length;
            for(var i=0;i<this.imgsCount;i++) {
                var img = new Image();
                img.src = imgs[i];
                img.onload = function() {
                    that.loaded++;
                    $('body').text(Math.ceil(that.loaded/that.imgsCount*100)+'%');
                    console.log(Math.ceil(that.loaded/that.imgsCount*100))
                    that.loading();
                }
            }
        }else {
            if(this.loaded==this.imgsCount){
                $('body').text('');
                this.loader();

            }
        }
    }
    this.loader = function() {
        $('body').append(this.container);
        $('#fullpage').fullpage({
            verticalCentered: false,
            afterLoad: function(anchorLink, index) {
                $('.section').eq(index-1).find('.component').trigger('load');
            },
            onLeave: function(index, nextIndex, direction){
                $('.section').eq(index-1).find('.component').trigger('leave')
            }
            
        })
        // $.fn.fullpage.moveTo(8)
    }
    return this;
}




// $(document).ready(function() {
//     $('#fullpage').fullpage({
//         verticalCentered: false,
//         sectionsColor: ['#b4f0a0', '#4BBFC3', '#7BAABE', '#a67575'],
//         afterLoad: function(anchorLink, index) {
//             // $('.section').eq(index-1).find('.component').removeClass('hide').addClass('show');
//             $('.section').eq(index-1).find('.component').animate({
//                 left: '0',
//                 opacity: '1'
//             })
//         },
//         onLeave: function(index, nextIndex, direction){
//             // $('.section').eq(index-1).find('.component').removeClass('show').addClass('hide');
//             $('.section').eq(index-1).find('.component').animate({
//                 left: '-30px',
//                 opacity: '0'
//             })
//         }
//     });
// });