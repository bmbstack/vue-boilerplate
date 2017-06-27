import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import modules from './modules';

Vue.use(Vuex);

/*global process*/
const DEVELOPMENT = process.env.NODE_ENV !== 'production';
console.info(`Vuex is running in ${process.env.NODE_ENV} mode`);

const store = new Vuex.Store({
    strict: true,
    modules: {
        ...modules
    },
    plugins: DEVELOPMENT ? [createLogger()] : []
});

if (module.hot) {
    module.hot.accept([
        './modules',
    ], () => {
        store.hotUpdate({
            modules: require('./modules'),
        });
    });
}

export default store;

