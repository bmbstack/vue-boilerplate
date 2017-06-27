import Vue from 'vue';
import component from '../components/dumb/toast';

const ToastConstructor = Vue.extend(component);
const transitionEndEvent = 'transitionend';

ToastConstructor.prototype.close = function(cb) {
    this.$el.cb = cb;
    this.$el.addEventListener(transitionEndEvent, onHideHandler, false);
    this.$el.style.opacity = 0;
};

const getInstance = () => {
    return new ToastConstructor({
        el: document.createElement('div')
    });
};

const onHideHandler = (event) => {
    event.target.removeEventListener(transitionEndEvent, onHideHandler);
    ( event.target.cb && event.target.cb(), event.target.cb = null ); // release
    delete event.target.cb;
    document.body.removeChild(event.target);
};

const Toast = function(options = '') {
    const instance = getInstance();
    instance.message = typeof options === 'string' ? options : options.message;

    setTimeout(function(target) {
        target.$el.style.opacity = 1;

        const len = document.querySelectorAll('.toast').length;

        setTimeout(() => {
            target.close(options.callback);
        }, 3E3 * len);
    }, 16.67, instance);

    document.body.appendChild(instance.$el);
};

const ToastInstaller = {
    install(Vue) {
        Vue.toast = Vue.prototype.$toast = Toast;
    }
};

export default ToastInstaller;
export { Toast };
