import { shareObject } from 'constants/shareObject';

export default {
    setupQQ(url, title, summary) {
        let shareData = {
            share_url : url,
            title : title ,
            desc : summary,
            image_url: shareObject.imgUrl,
        };
    
        let scriptNode = document.createElement('script');

        scriptNode.src = 'http://pub.idqqimg.com/qqmobile/qqapi.js?_bid=152 ';
        scriptNode.charset = 'utf-8';

        let handler = function() {
            mqq.data.setShareInfo(shareData);
        };

        let supportOnload = "onload" in scriptNode;
        if (supportOnload) {
            scriptNode.onload = function() {
                handler();
            }
        } else {
            scriptNode.onreadystatechange = function() {
                if (/loaded|complete/.test(scriptNode.readyState)) {
                    handler();
                }
            }
        }

        document.body.appendChild(scriptNode);
    }
}
