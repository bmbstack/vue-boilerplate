~function() {
    var plugin = {
        install: function(Vue, options) {
            // 验证是否是有效点击
            isValid = isValid.bind(Vue, options || {});

            // 设置一个指令
            Vue.directive('tap', {
                bind: function(el, binding, vnode/*, oldVnode*/) {
                    el.tap = {};

                    if (el.disabled)
                        return;

                    if (isPc()) {
                        el.tap.clickHandler = compose(function(event) {
                            return (event && vnode.elm == el && binding.value.call(el, event), event);
                        });

                        el.addEventListener('click', el.tap.clickHandler, false);
                    } else {
                        el.tap.touchstartHandler = compose(function(event) {
                            return event;
                        }, touchstartHandler);
                        el.tap.touchendHandler = compose(function(event) {
                            return (event && vnode.elm == el && binding.value.call(el, event), event);
                        }, touchendHandler);

                        el.addEventListener('touchstart', el.tap.touchstartHandler, false);
                        el.addEventListener('touchend', el.tap.touchendHandler, false);
                    }
                },
                componentUpdated: function(el, binding, vnode/*, oldVnode*/) {
                    if (isPc()) {
                        el.removeEventListener('click', el.tap.clickHandler);
                    } else {
                        el.removeEventListener('touchstart', el.tap.touchstartHandler);
                        el.removeEventListener('touchend', el.tap.touchendHandler);
                    }

                    if (el.disabled)
                        return;

                    if (isPc()) {
                        el.tap.clickHandler = compose(function(event) {
                            return (event && vnode.elm == el && binding.value.call(el, event), event);
                        });

                        el.addEventListener('click', el.tap.clickHandler, false);
                    } else {

                        el.tap.touchstartHandler = compose(function(event) {
                            return event;
                        }, touchstartHandler);
                        el.tap.touchendHandler = compose(function(event) {
                            return (event && vnode.elm == el && binding.value.call(el, event), event);
                        }, touchendHandler);

                        el.addEventListener('touchstart', el.tap.touchstartHandler, false);
                        el.addEventListener('touchend', el.tap.touchendHandler, false);
                    }
                },
                unbind: function(el/*, binding, vnode*/) {
                    if (isPc()) {
                        el.removeEventListener('click', el.tap.clickHandler);
                    } else {
                        el.removeEventListener('touchstart', el.tap.touchstartHandler);
                        el.removeEventListener('touchend', el.tap.touchendHandler);
                    }
                }
            });
        }
    };

    // 组合函数
    function compose() {
        var args = arguments;
        var start = args.length - 1;
        return function() {
            var i = start;
            var result = args[start].apply(this, arguments);

            while(i--) {
                result = args[i].call(this, result);
            }

            return result;
        };
    }

    // 判断是否是PC
    function isPc() {
        var uaInfo = navigator.userAgent;
        var agents = ['Android', 'iPhone', 'Windows Phone', 'iPad', 'iPod'];
        var flag = true;
        for ( var i = 0; i < agents.length; i++ ) {
            if (uaInfo.indexOf(agents[i]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    // 判断是否有效tap
    var isValid = function(options, time, distanceX, distanceY) {
        options.moment = options.moment || 10000;
        options.distance = options.distance || 40;

        return time < options.moment 
            && Math.abs(distanceX) < options.distance 
            && Math.abs(distanceY) < options.distance;
    };

    var touchstartHandler = function(event) {
        var evt = event || window.event || this.callee.caller.arguments[0];
        var touch = evt.touches[0];
        this.tap.moment = +new Date;
        this.tap.position = { x: touch.pageX, y: touch.pageY };

        return evt;
    };
    var touchendHandler = function(event) {
        var evt = event || window.event || this.callee.caller.arguments[0];
        var touch = evt.changedTouches[0];

        var diffTime = +new Date - this.tap.moment;
        var distanceX = touch.pageX - this.tap.position.x;
        var distanceY = touch.pageY - this.tap.position.y;

        if (isValid(diffTime, distanceX, distanceY)) {
            return evt;
        }
    };

    /* eslint-disable no-undef */
    if (typeof exports == 'object') {
        module.exports = plugin;
    } else if (typeof define == 'function' && define.amd) {
        define([], function() {
            return plugin;
        });
    } else if (window.Vue) {
        window.vueTap = plugin;
        window.Vue.use(window.vueTap);
    }
    /* eslint-enable no-undef */
}();
