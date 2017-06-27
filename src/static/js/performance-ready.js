/**
 * 性能统计 - 用户可操作时间
 */

(function() {
    if (window.performance) {
        window.time = window.time || {
            ready: 0
        };

        window.document.addEventListener('DOMContentLoaded', function() {
            window.time.ready = +new Date - window.performance.timing.navigationStart;
        });
    }
})();
