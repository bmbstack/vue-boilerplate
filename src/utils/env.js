/** @module utils/env  */

import { MOBILE_API } from '../constants/api';

const hasToken = window.location.search.match(/token=/i);

/**
 * iOS App下载地址
 * @memberof module:utils/env
 * @constants
 * @type {string}
 * @readonly
 */
const IOS_URL = 'https://itunes.apple.com/us/app/zuo-ye-he-zi-xue-sheng-duan/id982502330?l=zh&ls=1&mt=8';

/**
 * android App下载地址
 * @memberof module:utils/env
 * @constants
 * @type {string}
 * @readonly
 */
const ANDROID_URL = 'http://app.knowbox.cn/hz/englishmatch.html';

/**
 * 设备类型 
 * @memberof module:utils/env
 * @enum {Symbol}
 * @readonly
 */ 
const DEVICE_TYPE = {
    /** 移动电话 */
    PHONE: Symbol(1),
    /** 平板 */
    PAD: Symbol(2),
};

/**
 * 是否是学生 
 * @memberof module:utils/env
 * @function
 * @returns {boolean}
 * @example
 * import { isStudent } from 'path/to/utils/env';
 * if (isStudent()) {
 *     // TODO: A student is reading the page
 * }
 */
function isStudent() {
    return window.location.search.match(/student/i);       
}

/**
 * 是否是老师
 * @memberof module:utils/env
 * @function
 * @returns {boolean}
 * @example
 * import { isTeacher } from 'path/to/utils/env';
 * if (isTeacher()) {
 *     // TODO: A teacher is reading the page
 * }
 */
function isTeacher() {
    return window.location.search.match(/teacher/i);
}

/**
 * 是否运行在App中
 * @memberof module:utils/env
 * @function
 * @returns {boolean}
 * @example
 * import { isRunInApp } from 'path/to/utils/env';
 * if (isRunInApp()) {
 *     // TODO: your page is running in App environment
 * }
 */ 
function isRunInApp() {
    return window.navigator.userAgent.toLowerCase().indexOf('knowbox') > -1 || hasToken;
}

/**
 * 是否运行在微信中
 * @memberof module:utils/env
 * @function 
 * @returns {boolean}
 * @example
 * import { isRunInWeChat } from 'path/to/utils/env';
 * if (isRunInWeChat()) {
 *     // TODO: your page is running in WeChat environment
 * }
 */
function isRunInWeChat() {
    return window.navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1;
}

/**
 * 是否运行在QQ中
 * @memberof module:utils/env
 * @function
 * @returns {boolean}
 * @example
 * import { isRunInQQ } from 'path/to/utils/env';
 * if (isRunInQQ) {
 *     // TODO: your page is running in QQ environment
 * }
 */
function isRunInQQ() {
    return window.navigator.userAgent.match(/\sQQ/i);
}

/**
 * 是否是iOS系统
 * @memberof module:utils/env
 * @function
 * @returns {boolean}
 * @example
 * import { isIOS } from 'path/to/utils/env';
 * if (isIOS()) {
 *     // TODO: your page is running in iOS Operation System
 * }
 */
function isIOS() {
    return window.navigator.userAgent.match(/(iPhone|iPod|iPad);?/i);
} 

/**
 * 是否是android系统
 * @memberof module:utils/env
 * @function
 * @returns {boolean}
 * @example
 * import { isAndroid } from 'path/to/utils/env';
 * if (isAndroid()) {
 *     // TODO: your page is running in Android Operation System
 * }
 */
function isAndroid() {
    return window.navigator.userAgent.match(/android/i);
}

/**
 * 获得{@link module:utils/environment.DEVICE_TYPE 设备类型}
 * @memberof module:utils/env
 * @function
 * @returns {Symbol} 
 * @example
 * import { deviceType, DEVICE_TYPE } from 'path/to/utils/env';
 * if (DEVICE_TYPE.PAD === deviceType()) {
 *     // TODO: a Pad loads the page
 * }
 */
function deviceType() {
    const ua = window.navigator.userAgent;
    // 只有iOS设备才特码支持Pad版本样式
    if (ua.match(/pad/i) && isIOS()) {
        return DEVICE_TYPE.PAD;
    }

    return DEVICE_TYPE.PHONE;
}

/**
 * 下载或激活已有App, 如果设备上装有App则激活, 否则跳转到下载页. 
 * @memberof module:utils/env
 * 某些Android设备可能不支持该方法
 * @function
 * @returns {undefined}
 * @example
 * import { download } from 'path/to/utils/env';
 * download();
 */
function download() {
    let downloadUrl = '';

    if (isIOS())
        downloadUrl = IOS_URL;
    else if (isAndroid())
        downloadUrl = ANDROID_URL;
    else
        alert('尚未支持的手机操作系统, 请致电作业盒子的程序猿们, 他们会尽量找个借口甩锅.');

    window.location.href = MOBILE_API.DOWNLOAD_URL;
    setTimeout(() => {
        window.location.href = downloadUrl;
    }, 500);
}


/**
 * 判断是否运行在单词部落老师端
 * @memberof module:utils/env
 * @function
 * @returns {boolean}
 * @example
 * import { isTwordClan } from 'path/to/utils/env';
 * if (isTwordClan()) {
 *     console.log('Yes, it is');
 * }
 */
function isTwordClan() {
    return window.navigator.userAgent.indexOf('twordclan') > -1;
}

/**
 * 判断是否运行在单词部落学生端
 * @memberof module:utils/env
 * @function
 * @returns {boolean}
 * @example
 * import { isSwordClan } from 'path/to/utils/env';
 * if (isSwordClan()) {
 *     console.log('Yes, it is');
 * }
 */
function isSwordClan() {
    return window.navigator.userAgent.indexOf('swordclan') > -1;
}

export {
    IOS_URL,
    ANDROID_URL,
    DEVICE_TYPE,
    isStudent,
    isTeacher,
    isRunInApp,
    isRunInWeChat,
    isRunInQQ,
    isIOS,
    isTwordClan,
    isSwordClan,
    isAndroid,
    deviceType,
    download,
};
