/**
 * 性能统计 - 白屏时间
 * @author Nixon
 * @since 2017年01月02日
 */

(function() {
    if (window.performance) {
        window.time = window.time || {
            whiteScreen: 0
        };

        window.time.whiteScreen = +new Date - window.performance.timing.navigationStart;
    }
})();
