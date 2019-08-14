$(function() {
    var data = [
        {
            text: '20积分',
            image: './8.png',
            bgColor: '#00FFFF'
        },
        {
            text: '保温杯',
            image: './3.png',
            bgColor: '#FFFFFF'
        },
        {
            text: '20积分',
            image: './8.png',
            bgColor: '#00FFFF'
        },
        {
            text: '橄榄油',
            image: './7.png',
            bgColor: '#FFFFFF'
        }
    ];
    var canvas = $('.plate-detail')[0];
    var borderWidth = '0.8rem'; // 图片边框的宽度
    var textRadius = otherUnitToPx('10rem'); // 图片边框的宽度
    
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var width = $(document).width() - 2 * parseInt($('.turntable').css('margin-left'));
        var radius = width / 2;
        var num = data.length;
        var arc = 2 * Math.PI / num;
        canvas.width = width;
        canvas.height = width;
        ctx.clearRect(0, 0, width, width);

        for (var i = 0; i < num; i++) {
            var start = i * arc;

            // 绘制扇区
            var borderImageWidthPx = otherUnitToPx(borderWidth);
            ctx.strokeStyle = '#fff';
            ctx.fillStyle = data[i].bgColor;
            ctx.beginPath();
            ctx.moveTo(radius, radius);
            ctx.arc(radius, radius, radius - borderImageWidthPx, start, start + arc);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.save();

            // 绘制文本
            var currX = radius + Math.cos(start + arc / 2) * textRadius;
            var currY = radius + Math.sin(start + arc / 2) * textRadius;
            var rotate = start + arc / 2 + Math.PI / 2;
            var text = data[i].text;
            ctx.fillStyle = '#DD9A0D';
            ctx.font = 'bold 1.1rem serif';
            ctx.translate(currX, currY);
            ctx.rotate(rotate);
            ctx.fillText(text, -ctx.measureText(text).width / 2, 8);

            // 绘制图片
            var img = new Image();
            img.onload = (function(currX, currY, rotate) {
                return function () {
                    ctx.save();
                    ctx.translate(currX, currY);
                    ctx.rotate(rotate);
                    ctx.drawImage(this, -15, 15, 30, 30);
                    ctx.restore();
                };  
            })(currX, currY, rotate);
            img.src = data[i].image;

            ctx.restore();
        }
    }

    // canvas默认单位是px，otherUnitToPx函数将常见的单位转换为px
    function otherUnitToPx(data) {
        if (['rem', '%', 'px'].indexOf(data.replace(/[\d\.]/g, '')) === -1) {
            alert('请选择正确的单位：rem、%、px');
            return;
        }

        var val = parseFloat(data);
        if (data.indexOf('px') !== -1) {
            return val;
        }
        
        if (data.indexOf('rem') !== -1) {
            var htmlFontSize = $('html').css('font-size');
            
            return val * parseInt(htmlFontSize);
        }

        if (data.indexOf('%') !== -1) {
            return val * $(document).width() / 100;
        }
    }

    var $pointer = $('.turntable .pointer');
    var $plateDetail = $('.turntable .plate-detail');
    var flag = false;
    var deg = 0;
    $pointer.on('click', function() {
        if (flag) return;

        flag = true;
        deg += 1800;
        $plateDetail.css({
            'transform': 'rotate(' + deg + 'deg)',
            'transition': 'transform 6s cubic-bezier(.3, .88, .42, 1)'
        });
        $pointer.css({
            'background-position': '50% 0',
        });
    });

    $('.plate').on('transitionend', function() {
        $pointer.css({
            'background-position': '0 0',
        });
        setTimeout(function() {
            flag = false;
        }, 100);
    });
})