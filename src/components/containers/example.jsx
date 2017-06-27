import { marqueeLine, shareInApp } from '../dumb';

import { sendMessage } from '../../utils/hybird';
import { MOBILE_API } from '../../constants/api';
import Storage from '../../utils/storage';
import httpProxy from '../../net/httpProxy';

if (process.env.NODE_ENV === 'development') {
    const Mock = require('mockjs');
    Mock.mock('test/api', {
        code: 99999,
        msg: 'success',
        data: {
            result: 1
        }
    });
}

/**
 * 欢迎组件(示例)
 * @class Welcome
 * @memberof module:components/containers
 * @example
 * import { welcome } from 'path/to/components/containers'
 * export default {
 *     components: {
 *         welcome
 *     },
 *     render(h) {
 *         return (<welcome msg={"World"}></welcome>)
 *     }
 * }
 */
const welcome = {
    name: 'welcome',
    components: {
        marqueeLine,
        shareInApp,
    },
    data() {
        return {
            show: true,
            isDisabled: true,
        };
    },
    /**
     * @lends module:components/containers.welcome
     */
    props: {
        /**
         * @type {number}
         * @desc 显示的文案
         */
        msg: {
            type: String,
            default: 'World'
        }
    },
    render(h) { // eslint-disable-line
        const { show, isDisabled } = this;
        console.log(isDisabled)

        return (
            <div v-record-click="/record?type=userclick&action=click" scroll>
                { h('div', { domProps: { innerHTML: '<span style="color: red;">Welcome</span>' } }) }
                <div {...{ domProps: { innerHTML: '<span style="color: red;">Welcome</span>' } }}></div>
                { 
                    this.show && <div class="example abc" 
                        v-record-load="/record?type=pageload&action=load"
                        v-tap={this.handleClick}>Hello {this.msg}</div>
                }
                <div class="example cba" 
                    disabled={ isDisabled  }
                    v-record-load="/record?type=pageload&action=load"
                    v-tap={this.handleTouch}>扯呼</div>
                <div class="1example other">Oh Yeah</div>
                <marquee-line  speed={ 5 }>
                    <div>精忠报国</div>
                    <div>精忠报国</div>
                    <div>精忠报国</div>
                    <div>精忠报国</div>
                    <div>精忠报国</div>
                    <div>精忠报国</div>
                    <div>精忠报国</div>
                    <div>精忠报国</div>
                    <div>精忠报国</div>
                    <div>精忠报国</div>
                    <div>精忠报国</div>
                    <div>精忠报国</div>
                    <div>精忠报国</div>
                </marquee-line>
                <share-in-app show={ !show } />
            </div>
        );
    },
    mounted() {
        this.$toast('Hello Toast');

        setTimeout(() => {
            this.isDisabled = false;
        }, 5000);


        httpProxy('test/api')
            .then(data => console.dir(data));
    },
    methods: {
        handleClick(event) {
            this.show = !this.show;
            console.log(event);
        },
        handleTouch(event) { // eslint-disable-line no-unused-vars
            // how to use hybird method
            sendMessage(MOBILE_API.OPEN_NEW_WINDOW_URL, { title: Storage.getData('FEWebView'), url: 'http://192.168.40.155:8091/example.html' });
            this.show = !this.show;
        }
    }
};

export default welcome;
