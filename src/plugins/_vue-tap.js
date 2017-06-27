/* global window */
/*
 * Created by 二哲 on 15/12/6.
 */

/*
 * 不带参数指令
 * v-tap=handler
 * or
 * 带参数指令
 * v-tap=handler($index,el,$event)
 *
 * !!!新增!!!
 * 把tapObj对象注册在原生event对象上
 * 	event.tapObj拥有6个值
 * 	pageX,pageY,clientX,clientY,distanceX,distanceY
 * 后面2个分别的手指可能移动的位置(以后可用于拓展手势)
 *
 */
(function () {
    var vueTap = {};

    /*                  公用方法开始                 */
    function isPc() {
        var uaInfo = navigator.userAgent;
        var agents = ['Android', 'iPhone', 'Windows Phone', 'iPad', 'iPod'];
        var flag   = true;
        for ( var i = 0; i < agents.length; i++ ) {
            if (uaInfo.indexOf(agents[i]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    function isTap(self) {
        if (self.disabled) {
            return false;
        }

        var tapObj = self.tapObj;
        return self.time < 10000 && Math.abs(tapObj.distanceX) < 40 && Math.abs(tapObj.distanceY) < 40;
    }

    function touchstart(e, self) {
        var touches    = e.touches[0];
        var tapObj     = self.tapObj;
        tapObj.pageX   = touches.pageX;
        tapObj.pageY   = touches.pageY;
        tapObj.clientX = touches.clientX;
        tapObj.clientY = touches.clientY;
        self.time      = +new Date();
    }

    function touchend(e, self) {
        var touches      = e.changedTouches[0];
        var tapObj       = self.tapObj;
        self.time        = +new Date() - self.time;
        tapObj.distanceX = tapObj.pageX - touches.pageX;
        tapObj.distanceY = tapObj.pageY - touches.pageY;

        if (!isTap(self)) return;
        setTimeout(function () {
            self.handler(e);
        }, 150);
    }

    /*                    公用方法结束                 */

    var vue2 = {
        bind: function (el, binding) {
            var value = binding.value;
            el.tapObj = {};
            el.handler = function (e) { //This directive.handler
                if (!value && el.href && !binding.modifiers.prevent) {
                    return window.location = el.href;
                }
                value.event = e;
                value.tapObj = el.tapObj;
                // 原始代码为
                // value.methods.call(this, value);
                // 实际结果报错, 因为value本身即为boundFn
                // @nixon 2016年12月06日
                value.call(this, e, el);
            };
            if(isPc()) {
                el.addEventListener('click', function (e) {
                    if (!value && el.href && !binding.modifiers.prevent) {
                        return window.location = el.href;
                    }
                    value.event = e;
                    value.tapObj = el.tapObj;
                    // 原始代码为
                    // value.methods.call(this, value);
                    // 实际结果报错, 因为value本身即为boundFn
                    // @nixon 2017年02月07日
                    value.call(this, e, el);
                }, false);
            } else {
                el.addEventListener('touchstart', function (e) {

                    if (binding.modifiers.stop)
                        e.stopPropagation();
                    if (binding.modifiers.prevent)
                        e.preventDefault();
                    touchstart(e, el);
                }, false);
                el.addEventListener('touchend', function (e) {
                    // iPhone4 - iOS7.1.2(11D257) 不支持配置属性
                    // @Nixon 2016年12月26日
                    /* 原始代码
                    Object.defineProperties(e, { // 重写currentTarget对象 与jq相同
                        'currentTarget': {
                            value: el,
                            writable: true,
                            enumerable: true,
                            configurable: true
                        },
                    });
                    // 更改为以下(添加try...catch)代码 */
                    try {
                        Object.defineProperties(e, { // 重写currentTarget对象 与jq相同
                            'currentTarget': {
                                value: el,
                                writable: true,
                                enumerable: true,
                                configurable: true
                            },
                        });
                    } catch (e) {
                        /* handle error */
                    }

                    e.preventDefault();

                    return touchend(e, el);
                }, false);
            }
        },
    };

    vueTap.install = function (Vue) {
        Vue.directive('tap', vue2);
    };

    if (typeof exports == 'object') {
        module.exports = vueTap;
    } else if (typeof define == 'function' && define.amd) { // eslint-disable-line no-undef
        define([], function () { // eslint-disable-line no-undef
            return vueTap;
        });
    } else if (window.Vue) {
        window.vueTap = vueTap;
        window.Vue.use(vueTap);
    }
})();
