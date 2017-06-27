/**
 * 性能统计 - 全部完成时间
 * @author Nixon
 * @since 2017年01月02日
 */

(function() {
    if (window.performance) {
        window.time = window.time || {
            loaded: 0
        };

        window.addEventListener('load', function() {
            window.time.loaded = +new Date - window.performance.timing.navigationStart;

            // 搜集主要指标
            var queryStrings = [];
            for(var key in window.time) {
                queryStrings.push(key + '=' + window.time[key]);
            }

            // 获取平台
            var platform = window.navigator.platform;
            queryStrings.push('platform' + '=' + platform);

            // 获取设备
            var ua = window.navigator.userAgent, os, version;
            if (/CPU (?:iPhone |iPad |iPod )?OS ([^ ]+)/i.test(ua)) {
                os = 'iOS';
                version = RegExp.$1;
            } else if (/Android ([^;]+)/i.test(ua)) {
                os = 'Android';
                version = RegExp.$1;
            } else {
                os = version = 'unknown';
            }

            queryStrings.push('os' + '=' + os);
            queryStrings.push('version' + '=' + version);

            // 获取服务器地址
            var host;
            if (window.document.body.dataset) {
                host = window.document.body.dataset['performanceHost'];
            } else {
                host = window.document.body.getAttribue('data-performance-host');
            }

            // 存在地址, 则发送记录
            if (host) {
                var request = host + '/performance/log?' + queryStrings.join('&') + '&' + (+new Date);
                var cookie_key = 'webperformance@knowbox';

                // 查询cookie, 若已发送过, 则不发起统计
                if (document.cookie.length == 0 || document.cookie.indexOf(cookie_key) == -1) {
                    (new Image()).src = request;
                }

                // 写入cookie, 保存7天, 保证每7天仅记录一次
                var now = new Date();
                now.setDate(now.getDate() + 7 * 24 * 60 * 60 * 1000);
                document.cookie = cookie_key + '=' + request + ';expires=' + now.toGMTString() + ';path=/;';
            }
        });
    }
})();
