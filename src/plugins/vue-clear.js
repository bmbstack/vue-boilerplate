const ClearInstaller = {
    install(Vue) {
        Vue.clear = Vue.prototype.$clear = () => {
            Vue.nextTick(function() {
                const $body = document.body;
                if ($body.classList) {
                    $body.classList.remove('blur');
                } else {
                    $body.className = $body.className.replace('blur', '');
                }
            });
        };
    }
};

export default ClearInstaller;
