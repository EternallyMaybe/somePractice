$(function() {
    var deg = 0;
    var flag = false;
    $('.arrow').on('click', function() {
        if (flag) return;

        flag = true;
        deg += 1800;
        $('.turntable').css({
            'transform': 'rotate(' + deg + 'deg)',
            'transition': 'transform 6s cubic-bezier(.3, .88, .42, 1)'
        });
        $('.arrow').css({
            'background-position': '50% 0',
        });
    });

    $('.turntable').on('transitionend', function() {
        $('.arrow').css({
            'background-position': '0 0',
        });
        setTimeout(function() {
            flag = false;
        }, 100);
    });
})
// 1.canvas绘制盘面
// 2.移动端适配通过获取document.documentElement.clientWidth进行计算
// 3.转盘轮廓、指针使用图片
function drawPlate(params) {
    var _params = Object.assign({
        mount: "#turntablePlate",
        data: [
            {desc: 'Redmi K20', img: '', color: ''},
            {desc: 'Redmi K20', img: '', color: ''},
            {desc: 'Redmi K20', img: '', color: ''}
        ],
        startAngle: 0
    }, params);

    // 半径
    var radius = (document.documentElement.clientWidth - 60) / 2;
}