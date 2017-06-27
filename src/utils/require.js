/**
 * 按需加载js资源
 * @function require
 * @memberof module:utils
 * @param {string} resource 目标js资源地址
 * @param {function} done 资源加载完成时调用的函数
 * @author: Nixon
 * @since: 2016年10月16日
 * @example
 * import require from 'path/to/utils/require';
 * require('http://knowbox.com/js/a.js', () => {
 *     // TODO: call a method which is in a.js
 * });
 */
export default (resource, done) => {
    const node = document.createElement('script');
    node.async = true;
    node.src = resource;

    const supportOnload = 'onload' in node;
    if (supportOnload) {
        node.onload = done;
        node.onerror = function() {
            console.error(`${resource}加载失败`, node);
        };
    } else {
        node.onreadystatechange = function() {
            if (/loaded|complete/i.test(node.readyState)) {
                done.call(node);
            }
        };
    }

    document.getElementsByTagName('head')[0].appendChild(node);
};

