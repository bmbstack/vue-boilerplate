/**
* 创建本地存储方案
*
* @class Storage
* @author qiuwei
* @description 为了兼容老版本, 使用cookie作为存储介质
*/

export const RIGHT_COUNT_KEY = 'right_count';
export const USER_INFO_KEY = 'user_info';
export const LAST_QUESTION_KEY = 'last_question';

class Storage {
    constructor() {
        this.path = '/';
    }

    clean() {
        if (__DEV__)
            console.log('清除所有cookie');

        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
        if (cookies.length > 0) {
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i];
                let eqPos = cookie.indexOf("=");
                let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                let domain = location.host.substr(location.host.indexOf('.'));
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + domain;
            }
        }
    }

    getData(key) {
        let cookies = window.document.cookie.split(';');
        for (let i = 0, item = cookies[i]; item; item = cookies[++i]) {
            let [name, value] = item.split('=');
            if (key == name.trim()) {
                return unescape(value);
            }
        }

        if (__DEV__)
            console.log(`从未设置过key为${key}的Cookie`);
    }

    setData(key, value, expires_in = 3600) {
        let expires = new Date();
        expires.setTime(expires.getTime() + expires_in * 1000);

        let cookieValue = `${key}=${escape(value)};expires=${expires.toGMTString()};path=${this.path}`;

        window.document.cookie = cookieValue;
    }

    getObjectData(key) {
        let value = this.getData(key);
        if (value)
            return JSON.parse(value);
        else
            return null;
    }

    setObjectData(key, value, expires_in) {
        this.setData(key, JSON.stringify(value), expires_in);
    }
}

export default new Storage();

