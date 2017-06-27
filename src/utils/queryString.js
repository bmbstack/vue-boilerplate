class QueryString {

    /**
     * Query String 读写
     * @memberof module:utils
     * @class QueryString
     * @param {string} searchString 当前页面的window.location.search值
     * @returns {QueryString}
     */    
    constructor(searchString) {
        this._searchString = searchString;
        this._query = {};

        let queryString = this._searchString.slice(1);
        let reg = /&?(\w+)=([^&]+)(?:$|&)/igm;

        while(reg.test(queryString)) {
            this._query[RegExp.$1] = RegExp.$2;
        }
    }

    /**
     * Get value by key
     * @memberof module:utils.QueryString#
     * @function getValue
     * @param {string} key 键
     * @returns {string} the key's value
     */
    getValue(key) {
        return this._query[key] || void 0;
    }

    /**
     * Set value by key
     * @memberof module:utils.QueryString#
     * @function setValue
     * @param {string} key 键
     * @param {string} value 值
     */
    setValue(key, value) {
        this._query[key] = value;
    }

    /**
     * Reserialize query object
     * @memberof module:utils.QueryString#
     * @function serialize
     * @returns {string} 查询字符串
     */
    serialize() {
        let queryString = [];

        for (let key in this._query) {
            if (this._query.hasOwnProperty(key)) {
                queryString.push(key + '=' + this._query[key]);
            }
        }

        return queryString.join('&');
    }
}

export default new QueryString(window.location.search);
