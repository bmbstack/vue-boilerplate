/**
 * 性能统计 - 首屏时间
 * @author Nixon
 * @since 2017年01月02日
 */

(function() {
    if (window.performance) {
        window.time = window.time || {
            firstScreen: 0
        };

        var images = document.getElementsByTagName('img');
        var iLen = images.length;
        var curMax = 0;
        var inScreenLen = 0;
        // 图片的加载回调
        function imageBack() {
            this.removeEventListener
                && this.removeEventListener('load', imageBack, !1);
            if (++curMax === inScreenLen) {
                // 如果所有在首屏的图片均已加载完成了的话，发送日志
                log();
            }
        }   
        // 对于所有的位于指定区域的图片，绑定回调事件
        for (var s = 0; s < iLen; s++) {
            var img = images[s];
            var offset = {
                top: 0
            };
            var curImg = img;
            while (curImg.offsetParent) {
                offset.top += curImg.offsetTop;
                curImg = curImg.offsetParent;
            }
            // 判断图片在不在首屏
            if (document.documentElement.clientHeight < offset.top) {
                continue;
            }
            // 图片还没有加载完成的话
            if (!img.complete) {
                inScreenLen++;
                img.addEventListener('load', imageBack, !1);
            }
        }
        // 如果首屏没有图片的话，直接发送日志
        if (inScreenLen === 0) {
            log();
        }
        // 发送日志进行统计
        function log () {
            window.time.firstScreen = +new Date() - window.performance.timing.navigationStart;
        }
    }
})();
