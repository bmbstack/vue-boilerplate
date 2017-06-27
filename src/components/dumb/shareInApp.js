import iconQQ from '../../resources/icon-share-qq-app.png';
import iconQZone from '../../resources/icon-share-qq-zone.png';
import iconWeChat from '../../resources/icon-share-wechat-app.png';
import iconWeChatTimeline from '../../resources/icon-share-wechat-timeline.png';

import { share } from '../../utils/hybird';

/**
 * 应用内发起分享
 * @class ShareInApp
 * @memberof module:components/dumb
 * @example
 * import { ShareInApp } from 'path/to/components/dumb'
 * export default {
 *     render: h => 
 *         <share-in-app show={ true } 
 *             callback={ (result) => console.dir(result)  } />
 * }
 * @see {@link module:constants/shareResult 回调结果 }
 */
const shareInApp = {
    name: 'shareInApp',
    /**
     * @lends module:components/dumb.ShareInApp
     */
    props: {
        /**
         * @type {Boolean}
         * @desc 是否可见
         */
        show: {
            type: Boolean,
            default: false
        },
        /**
         * @type {String}
         * @desc 正文内容
         * @require
         */
        text: {
            type: String,
            required: true
        },
        /**
         * @type {String}
         * @desc LOGO地址(必须可用)
         * @require
         */
        imageUrl: {
            type: String,
            required: true
        },
        /**
         * @type {String}
         * @desc 标题
         * @require
         */
        title: {
            type: String,
            required: true
        },
        /**
         * @type {String}
         * @desc 标题地址(与url相同即可)
         * @require
         */
        titleUrl: {
            type: String,
            required: true
        },
        /**
         * @type {String}
         * @desc 分享页面地址
         * @require
         */
        url: {
            type: String,
            required: true
        },
        /**
         * @type {String}
         * @desc 描述正文
         */
        description: {
            type: String,
            default: ''
        },
        /**
         * @type {String}
         * @desc 产品描述(如: 作业盒子老师端)
         * @require
         */
        site: {
            type: String,
            required: true
        },
        /**
         * @type {String}
         * @desc 产品下载地址
         * @require
         */
        siteUrl: {
            type: String,
            required: true
        },
        /**
         * @type {String}
         * @desc 分享回调结果
         * @require
         */
        callback: {
            type: Function
        }
    },
    methods: {
        shareToHandler(platform) {
            const { text, imageUrl, title, titleUrl, url, description, site, siteUrl, callback  } = this;
            share(platform, text, title, imageUrl, titleUrl, url, description, site, siteUrl, callback);
        }
    },
    render(h) { // eslint-disable-line no-unused-vars
        const { show, ...methods } = this;
        const { shareToHandler } = methods;

        return (
            <transition name="share">
                { 
                    show &&
                        <ul class="share">
                            <li class="qq-app" v-tap={ () => shareToHandler('QQ') }><img src={ iconQQ } alt="分享到QQ" /></li>
                            <li class="qq-zone" v-tap={ () => shareToHandler('QQZone') }><img src={ iconQZone } alt="分享到QQ空间" /></li>
                            <li class="wechat-app" v-tap={ () => shareToHandler('WX') }><img src={ iconWeChat } alt="分享到微信" /></li>
                            <li class="wechat-timeline" v-tap={ () => shareToHandler('WXCircle') }><img src={ iconWeChatTimeline } alt="分享到微信朋友圈" /></li>
                        </ul>
                }
            </transition>
        );
    }
};

export default shareInApp;
