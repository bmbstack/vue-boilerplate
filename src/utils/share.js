/* global process, wx, mqq */

import { ENV } from './env';
import require from './require';
import httpProxy from '../net/httpProxy';
import { HTTP_METHOD } from '../constants/http';
import { WEB_API } from '../constants/api';
import packageJSON from '../../package.json';

const WECHAT_API_SRC = 'js/jweixin-1.0.0.js';
const QQ_API_SRC = 'js/qqapi.js?_bid=152';
const __DEVELOPMENT__ = process.env.NODE_ENV === 'development';

export {
    setupWeChat,
    setupQQ,
    setupShare,
};

/**
 * 设置微信分享
 * @function
 * @memberof module:utils
 * @param {string} targetURL 分享的地址
 * @param {string} title 分享标题
 * @param {string} desc 分享文案
 * @returns {undefined}
 * @example
 * import { setupWeChat } from 'path/to/utils/share';
 * setupWeChat('http://knowbox.com/share.html', '分享标题', '分享文案');
 */
function setupWeChat(targetURL, title, desc) {
    console.info('正在设置微信分享');

    httpProxy(WEB_API.WX_CONFIG_URL, HTTP_METHOD.POST, { url: window.location.href.split('#')[0] })
        .then((configObject) => {
            require(WECHAT_API_SRC, function() {
                if (!wx) {
                    console.error('初始化wechat js sdk失败');
                    return;
                }

                wx.config(Object.assign({}, configObject, {
                    debug: __DEVELOPMENT__,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                    ],
                }));

                const shareData = {
                    title,
                    desc,
                    link: targetURL,
                    imgUrl: packageJSON.logo,
                };

                wx.ready(() => {
                    wx.onMenuShareAppMessage(shareData);
                    wx.onMenuShareTimeline(shareData);
                    wx.onMenuShareQQ(shareData);
                    wx.onMenuShareQZone(shareData);
                    console.info('设置微信分享完成', shareData);
                });

                wx.error((res) => {
                    console.error('设置微信分享失败', res.errMsg);
                });
            });
        });
}

/**
 * 设置QQ分享
 * @function
 * @memberof module:utils
 * @param {string} targetURL 分享的地址
 * @param {string} title 分享标题
 * @param {string} desc 分享文案
 * @returns {undefined}
 * @example
 * import { setupQQ } from 'path/to/utils/share';
 * setupQQ('http://knowbox.com/share.html', '分享标题', '分享文案');
 */
function setupQQ(targetURL, title, desc) {
    if (!ENV.isRunInQQ()) {
        console.info('未运行在QQ环境中');
        return;
    }

    console.info('设置QQ分享');
    require(QQ_API_SRC, function() {
        const shareData = {
            share_url: targetURL,
            title,
            desc,
            image_url: packageJSON.logo,
        };

        mqq.data.setShareInfo(shareData);
        console.info('设置QQ分享完成', shareData);
    });
}

/**
 * 设置分享, 包括QQ和weChat, 懒人方法
 * @function
 * @memberof module:utils
 * @param {string} targetURL 分享的地址
 * @param {string} title 分享标题
 * @param {string} desc 分享文案
 * @returns {undefined}
 * @example
 * import { setupShare } from 'path/to/utils/share';
 * setupShare('http://knowbox.com/share.html', '分享标题', '分享文案');
 */
function setupShare(targetURL = '未设置', title = '未设置', desc = '未设置') {
    console.groupCollapsed('设置分享');
    setupWeChat(targetURL, title, desc);
    setupQQ(targetURL, title, desc);
    console.groupEnd();
}
