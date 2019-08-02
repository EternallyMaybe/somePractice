// var lazy = (function() {
//     function inView(node, threshold = 0) {
//         var viewTop = 0,
//             viewBottom = document.documentElement.clientHeight,
//             nodeTop = node.getBoundingClientRect().top,
//             nodeBottom = nodeTop + node.offsetHeight,
//             offset = threshold * viewBottom;

//         return nodeTop <= viewBottom + offset && nodeBottom + offset >= viewTop;
//     }

//     return function(params) {
//         var images = [...document.querySelectorAll(params.el + ' img')];
//         images.forEach(function(item) {
//             if (inView(item, params.threshold)) {
//                 item.src = item.dataset.src;
//             }
//         });
//     }; 
// })()

// window.onscroll = function() {
//     lazy({
//         el: '.lazy-el',
//         threshold: 1
//     })
// }
// var io  = new IntersectionObserver(entries => {
//     console.log(entries);
// });