$(function() {
    var deg = 0;
    var flag = false;
    $('.pointer').on('click', function() {
        if (flag) return;

        flag = true;
        deg += 1800;
        $('.turntable').css({
            'transform': 'rotate(' + deg + 'deg)',
            'transition': 'transform 6s cubic-bezier(.3, .88, .42, 1)'
        });
        $('.pointer').css({
            'background-position': '50% 0',
        });
    });

    $('.turntable').on('transitionend', function() {
        $('.pointer').css({
            'background-position': '0 0',
        });
        setTimeout(function() {
            flag = false;
        }, 100);
    });
})