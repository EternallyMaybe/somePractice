// import '../less/zepto.turntable.less';

// (function($) {
//     function turntable(el, options) {
//         this.$el = $(el);
//         this.params = $.extend(true, {}, $.fn.turntable.defaults, options);
//         this.init();

//         var self = this;
//         window.onresize = function() {
//             self.init();
//         }
//     }

//     turntable.prototype.init = function() {
//         var realWidth = $(document).width() - 2 * this.otherUnitToPx(this.params.margin);
//         var maxWidth = this.otherUnitToPx(this.params.maxWidth);

//         this.id = 'turntable' + Date.now();
//         this.width = realWidth > maxWidth ? maxWidth : realWidth;
//         this.height = this.width;
//         this.radius = this.width / 2;
//         this.deg = 0;
//         this.$el.html('<div class="turntable" id="' + this.id + '" style="width:' + this.width + 'px;height:' + this.height + 'px;">\
//             <div class="plate">\
//                 <div class="plate-border" style="background-image:url(' + this.params.borderImage + ')"></div>\
//                 <canvas class="plate-detail" width="' + this.width + '" height="' + this.height + '"></canvas>\
//             </div>\
//             <div class="pointer" style="background-image:url(' + this.params.pointerImage + ')"></div>\
//         </div>');
//         this.drawPlateDetail();
//         this.bindEvent();
//     }

//     turntable.prototype.drawPlateDetail = function() {
//         var canvas = this.$el.find('.plate-detail')[0];
//         var self = this;
//         if (canvas.getContext) {
//             var ctx = canvas.getContext('2d');
//             var num = self.params.data.length;
//             var arc = Math.PI * 2 / num;
//             var cX = self.radius;
//             var cY = self.radius;
//             var textRadius = self.otherUnitToPx(self.params.textRadius);
//             var iconWidthPx = self.otherUnitToPx(self.params.iconWidth);
//             self.imgArr = [];

//             ctx.clearRect(0, 0, self.width, self.height);
//             for (var i = 0; i < num; i++) {
//                 var angle = self.angleToNum(self.params.startAngle) + i * arc;
//                 var text = self.params.data[i].desc;
//                 var currX = cX + Math.cos(angle + arc / 2) * textRadius;
//                 var currY = cY + Math.sin(angle + arc / 2) * textRadius;
//                 var rotate = angle + arc / 2 + Math.PI / 2;
//                 var borderImageWidthPx = self.otherUnitToPx(self.params.borderImageWidth);

//                 // 设置奖品角度
//                 self.params.data[i].deg = rotate / Math.PI * 180;

//                 // 画扇形
//                 ctx.strokeStyle = '#fff';
//                 ctx.fillStyle = self.params.data[i].bgcolor;
//                 ctx.beginPath();
//                 ctx.moveTo(cX, cY);
//                 ctx.arc(cX, cY, self.radius - borderImageWidthPx, angle, angle + arc);
//                 ctx.closePath();
//                 ctx.fill();
//                 ctx.stroke();
//                 ctx.save();

//                 // 画文案
//                 ctx.fillStyle = self.params.fontColor;
//                 ctx.font = self.params.font;
//                 ctx.translate(currX, currY);
//                 ctx.rotate(rotate);
//                 ctx.fillText(text, -ctx.measureText(text).width / 2, 8);

//                 // 画图
//                 var img = new Image();
//                 img.onload = (function(currX, currY, rotate) {
//                     return function () {
//                         ctx.save();
//                         ctx.translate(currX, currY);
//                         ctx.rotate(rotate);
//                         ctx.drawImage(this, -iconWidthPx / 2, 15, iconWidthPx, iconWidthPx);
//                         ctx.restore();
//                     };  
//                 })(currX, currY, rotate);
//                 img.src = self.params.data[i].img;

//                 ctx.restore();
//             }
//         }
//     }

//     turntable.prototype.bindEvent = function() {
//         var self = this;
//         var flag = false;
//         var $pointer = $('#' + self.id + ' .pointer');
//         var $plateDetail = $('#' + self.id + ' .plate-detail');

//         $pointer.on('click', function() {
//             if (flag) return;
//             if (self.params.prizes && self.params.prizes.length === 0 && self.params.finished) {
//                 self.params.finished();
//                 return;
//             }

//             self.deg += self.getPrizeDeg();
//             flag = true;
//             $plateDetail.css({
//                 'transform': 'rotate(' + self.deg + 'deg) translateZ(0)',
//                 'transition': 'transform ' + self.params.rotateSeconds + 's cubic-bezier(.3, .88, .42, 1)'
//             });
//         })

//         $plateDetail.on('transitionend', function() {
//             setTimeout(function() {
//                 flag = false;
//                 self.params.arcSelected && self.params.arcSelected(self.prize); 
//             }, 100);
//         });
//     }

//     turntable.prototype.getPrizeDeg = function() {
//         var rotateDeg = 0;
//         var len = this.params.data.length;
//         this.prize = this.params.prizes.shift();

//         // 计算奖品的旋转角度
//         for (var i = 0; i < len; i++) {
//             var item = this.params.data[i];
//             if (item.desc === this.prize) {
//                 rotateDeg = 360 - item.deg + this.params.rotateTurns * 360;
//                 break;
//             }
//             if (i === len - 1 && item.desc !== this.prize) {
//                 alert('没有此奖品，请重新设置');
//             }
//         }
//         // 设置所有奖品当前角度
//         for (var i = 0; i < len; i++) {
//             var item = this.params.data[i];
//             item.deg = (item.deg + rotateDeg) % 360;
//         }

//         return rotateDeg;
//     }

//     turntable.prototype.angleToNum = function(angle) {
//         return (angle - 90) * Math.PI / 180;
//     }

//     turntable.prototype.otherUnitToPx = function(data) {
//         if (['rem', '%', 'px'].indexOf(data.replace(/[\d\.]/g, '')) === -1) {
//             alert('请选择正确的单位：rem、%、px');
//             return;
//         }

//         var val = parseFloat(data);
//         if (data.indexOf('px') !== -1) {
//             return val;
//         }
        
//         if (data.indexOf('rem') !== -1) {
//             var htmlFontSize = $('html').css('font-size');
            
//             return val * parseInt(htmlFontSize);
//         }

//         if (data.indexOf('%') !== -1) {
//             return val * $(document).width() / 100;
//         }
//     }

//     $.fn.turntable = function() {
//         if (arguments.length === 0) return;

//         var arg0 = arguments[0];
//         return this.each(function() {
//             if (typeof arg0 === 'object') {
//                 new turntable(this, arg0);
//             } 
//         });
//     };

//     $.fn.turntable.defaults = {
//         data: [], // 奖品数据
//         borderImage: require("../images/border.png"), // 转盘边框
//         pointerImage: require('../images/pointer.png'), // 指示器
//         borderImageWidth: '1.7rem', // 转盘图片宽度,canvas会使用此数据计算绘画半径
//         iconWidth: '3.5rem', // 奖品图片宽度
//         font: 'bold 1.1rem serif', // 转盘文字样式设置
//         fontColor: '#DD9A0D', // 转盘文字颜色设置
//         startAngle: 0, // 开始角度
//         margin: '2rem', // 转盘距左右两边距离
//         maxWidth: '560px', // 转盘最大宽度，兼容pc
//         textRadius: '10rem', // 文本距中心距离
//         rotateTurns: 6, // 旋转圈数
//         rotateSeconds: 6, // 旋转时长,单位:秒
//         prizes: [], // 中奖奖品
//         arcSelected: function() {}, // 抽奖结束事件
//         finished: function() {} // 完成所有抽奖结束事件
//     };
// })(Zepto)

function fn(generator) {
    return spawn(generator);
}

function spawn(genF) {
    return new Promise(function(resolve, reject) {
        const gen = genF();
        function step(nextF) {
            let next;
            try {
                next = nextF();
            } catch(err) {
                reject(err);
            }

            if (next.done) resolve(next.value);

            Promise.resolve(next.value).then(
                val => step(() => gen.next(val)),
                err => step(() => gen.throw(err))
            )
        }
        step(() => gen.next())
    })
}