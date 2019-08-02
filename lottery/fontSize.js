(function (doc, win) {
    if (!doc.addEventListener) return;

    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 12 * (clientWidth / 375) + 'px';
        };
        
    recalc();
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);