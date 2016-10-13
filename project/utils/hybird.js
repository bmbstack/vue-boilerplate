import { MOBILE_API } from 'constants/API';

const __DEV__ = process.env.NODE_ENV === 'development';

class Hybird {
    constructor() {

    }

    openBrowser(url) {
        if (__DEV__)
            console.log(url);

        console.log(`${MOBILE_API.OPEN_BROWSER_URL}?url=${encodeURIComponent(url)}`)
        window.location.href = `${MOBILE_API.OPEN_BROWSER_URL}?url=${encodeURIComponent(url)}`;
    }

    openNewWindow(url, title) {
        if (__DEV__)
            console.log(url);

        window.location.href = `${MOBILE_API.OPEN_NEW_WINDOW_URL}?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    }

    share(platform, text, title, imageUrl, titleUrl, url, description, site, handler) {

        let params = {
            "text": text,
            "imageUrl": imageUrl,
            "title": title,
            "titleUrl": titleUrl,
            "url": url,
            "description": description,
            "site": site,
            "siteUrl": "http://ssapp.knowbox.cn",
            "type": 2
        };

        if (__DEV__)
            console.dir(params)

        params = encodeURIComponent(JSON.stringify(params));

        window.shareCallBack = handler || function() {  };

        if (__DEV__)
            console.log('OK')
        const cmd = `${MOBILE_API.SHARE_URL}?platform=${platform}&data=${params}&jsCallBack=shareCallback`;

        if (__DEV__)
            console.log(cmd)

        window.location.href = cmd;
    }
}

export default new Hybird();
