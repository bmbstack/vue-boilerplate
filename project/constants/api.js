export const exampleAPIUrl = '/examples/1';

// 移动端Hybird接口
export const MOBILE_API = {
    // 下载
    DOWNLOAD_URL: 'sknowbox://method',
    // 分享接口
    // platform: 平台
    // data 分享数据
    // jsCallBack: 回调函数, 回调函数参数: "success"完成分享, "fail"分享失败, "cancel"取消分享
    SHARE_URL: 'hybird://method/doShare',
    // 打开一个Native窗口
    // url 新窗口要加载的页面地址, get参数
    // title 新窗口导航栏标题, get参数
    OPEN_NEW_WINDOW_URL: 'hybird://method/openNewWindow',
    // 打开浏览器加载地址
    // url 新窗口地址, get参数
    OPEN_BROWSER_URL: 'hybird://method/openBrowser',
};
