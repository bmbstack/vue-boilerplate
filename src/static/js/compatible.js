(function(doc, win) {
    var ratio = window.devicePixelRatio || 1;

    var scale = Math.round(1 / ratio * 100) / 100;
    window.scale = scale;
    var metaEl = doc.createElement('meta');

    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'width=device-width, initial-scale='+scale+', maximum-scale='+scale+', minimum-scale='+scale+', user-scalable=no');
    doc.getElementsByTagName('head')[0].appendChild(metaEl);

    var docEl = doc.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;

        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        // doc.body.style.height = docEl.offsetHeight + 'px';
    };

    function addClass(el, clazz) {
        if (el.classList) {
            el.classList.add(clazz);
        } else {
            var originClassNames = el.className.split(' ').filter(function(item) {
                return item != clazz;
            });
            originClassNames.push(clazz);
            el.className = originClassNames.join(' ');
        }
    }

    function removeClass(el, clazz) {
        if (el.classList) {
            el.classList.remove(clazz);
        } else {
            var classNames = el.className.split(' ').filter(function(item) {
                return item != clazz;
            });
            el.className = classNames.join(' ');
        }
    }

    var userMove = function() {
        // 防止内容区域滚到底后引起页面整体的滚动
        var content = doc.querySelector('div[scroll]');
        var startY;

        if (!content) return true;

        content.addEventListener('touchstart', function (e) {
            startY = e.touches[0].clientY;
            addClass(document.body, 'scrolling');
        });

        content.addEventListener('touchmove', function (e) {
            // 高位表示向上滚动
            // 底位表示向下滚动
            // 1容许 0禁止
            var status = '11';
            var ele = this;

            var currentY = e.touches[0].clientY;

            if (ele.scrollTop === 0) {
                // 如果内容小于容器则同时禁止上下滚动
                status = ele.offsetHeight >= ele.scrollHeight ? '00' : '01';
            } else if (ele.scrollTop + ele.offsetHeight >= ele.scrollHeight) {
                // 已经滚到底部了只能向上滚动
                status = '10';
            }

            if (status != '11') {
                // 判断当前的滚动方向
                var direction = currentY - startY > 0 ? '10' : '01';
                // 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
                if (!(parseInt(status, 2) & parseInt(direction, 2))) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        });

        content.addEventListener('touchend', function() {
            removeClass(document.body, 'scrolling');
        });
    };
    var init = function() {
        (function() {
            var agent = navigator.userAgent.toLowerCase();        //检测是否是ios
            var iLastTouch = null;                                //缓存上一次tap的时间
            if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0) {
                doc.body.addEventListener('touchend', function(event) {
                    var iNow = new Date()
                        .getTime();
                    iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
                    var delta = iNow - iLastTouch;
                    if (delta < 500 && delta > 0) {
                        event.preventDefault();
                        return false;

                    }
                    iLastTouch = iNow;

                }, false);
            }
            doc.body.addEventListener('touchstart', function() {});
        })();
    };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    doc.addEventListener('DOMContentLoaded', userMove, false);
    doc.addEventListener('DOMContentLoaded', init, false);
})(window.document, window);
