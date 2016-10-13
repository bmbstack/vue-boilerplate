/**
 * Query String 读写
 */

export class QueryString {
    
    constructor(searchString) {
        this._searchString = searchString;
        this._query = {};

        let queryString = this._searchString.slice(1);
        let reg = /&?(\w+)=([^&]+)(?:$|&)/igm;

        while(reg.test(queryString)) {
            this._query[RegExp.$1] = RegExp.$2;
        };
    }

    get fullString() {
        return this._searchString +'&';
    }

    getValue(key) {
        return this._query[key] || void 0;
    }

    setValue(key, value) {
        this._query[key] = value;
    }

    serialize() {
        let queryString = [];

        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                queryString.push(key + '=' + object[key]);
            }
        }

        return queryString.join('&');
    }
}

export default new QueryString(window.location.search);
