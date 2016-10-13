/**
 * 环境判断, 是否运行在目标环境中
 *
 * @author qiuwei
 */

import { MOBILE_API } from 'constants/API';

const hasToken = window.location.search.match(/token=/i);

export const IOS_URL = 'https://itunes.apple.com/us/app/zuo-ye-he-zi-xue-sheng-duan/id982502330?l=zh&ls=1&mt=8';
export const ANDROID_URL = 'http://app.knowbox.cn/hz/englishmatch.html';

export const ENV = {
    // 身份判断
    isStudent() {
        return window.location.search.match(/student/i);       
    },
    isTeacher() {
        return window.location.search.match(/teacher/i);
    },

    // 运行环境判断
    isRunInApp() {
        return window.navigator.userAgent.toLowerCase().includes('knowbox') || hasToken;
    },
    isRunInWeChat() {
        return window.navigator.userAgent.toLowerCase().includes('micromessenger');
    },
    isRunInQQ() {
        return window.navigator.userAgent.match(/\sQQ/i);
    },

    // 操作系统判断
    isIOS() {
        return window.navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)
    }, 
    isAndroid() {
        return window.navigator.userAgent.match(/android/i);
    },

    // 下载
    download() {
        let downloadUrl = '';

        if (ENV.isIOS())
            downloadUrl = IOS_URL;
        else if (ENV.isAndroid())
            downloadUrl = ANDROID_URL;
        else
            alert('尚未支持的手机操作系统, 请致电作业盒子的程序猿们, 他们会尽量找个借口甩锅.');

        window.location.href = MOBILE_API.DOWNLOAD_URL;
        setTimeout(() => {
            window.location.href = downloadUrl;
        }, 500);
    }
}

