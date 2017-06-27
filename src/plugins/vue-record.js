/* global window */
(function() {
    var defaultOptions = {
        host: ''
    };

    function merge(options) {
        for (var key in defaultOptions) {
            if (!options[key])
                options[key] = defaultOptions[key];
        }
    }

    function setEventHandler(el, type, handler) {
        if (!el.addEventListener) {
            el.addEventListener = function(type, handler) {
                el.attachEvent('on' + type, handler);
            };
        }

        return el.addEventListener(type, handler, false);
    }

    function removeEventListener(el, type, handler) {
        if (!el.removeEventListener) {
            el.removeEventListener = function(type, handler) {
                el.detachEvent('on' + type, handler);
            };
        }

        return el.removeEventListener(type, handler);
    }

    function emitEventHander(url) {
        var URL = url + (url.indexOf('?') > -1 ? '&' : '?') + (+new Date);

        if (window.navigator.sendBeacon) {
            // 即使页面跳转, 浏览器页会尽可能坚强的发送一个请求出去
            window.navigator.sendBeacon(URL);
        } else {
            (new Image()).src = URL;
        }
    }

    var vueRecord = {
        install: function(Vue, options = defaultOptions) {
            merge(options);

            var host = options.host;

            Vue.directive('recordLoad', {
                bind: function(el, binding) {
                    if (window.document.readyState === 'complete') {
                        emitEventHander.bind(el, host + binding.value)();
                    } else {
                        if (!el.record) {
                            el.record = {
                                loadHandler: emitEventHander.bind(el, host + binding.value)
                            };
                        }
                        setEventHandler(window, 'load', el.record.loadHandler);
                    }
                },
                unbind: function(el) {
                    if (el.record && el.record.loadHandler) {
                        removeEventListener(el, 'load', el.record.loadHandler);
                        delete el.record.loadHandler;
                    }
                }
            });

            Vue.directive('recordClick', {
                bind: function(el, binding) {
                    if (!el.record) {
                        el.record = {
                            clickHandler: emitEventHander.bind(el, host + binding.value)
                        };
                    }
                    setEventHandler(el, 'click', el.record.clickHandler);
                },
                unbind: function(el) {
                    if (el.record && el.record.clickHandler) {
                        removeEventListener(el, 'click', el.record.clickHandler);
                        delete el.record.clickHandler;
                    }
                }
            });
        }
    };

    if (typeof exports == 'object') {
        module.exports = vueRecord;
    } else if (typeof define == 'function' && define.amd) { // eslint-disable-line no-undef
        define([], function () { // eslint-disable-line no-undef
            return vueRecord;
        });
    } else if (window.Vue) {
        window.vueRecord = vueRecord;
        window.Vue.use(vueRecord);
    }
})();
