 import axios from 'axios';
 import storage, { AUTHORIZATION_KEY } from '../utils/storage';
 import { HTTP_METHOD, HTTP_RESPONSE_STATE } from '../constants/http';

/** @module net/httpProxy */

/**
 * @function httpProxy
 * @author Nixon
 * @see {@link https://github.com/mzabriskie/axios axios} on Github
 * @param {string} url api地址
 * @param {string} [method] {@link module:constants/http method}
 * @param {object} [data] 发起非GET请求时的requestBody
 * @param {boolean} [credentials] 是否认证
 * @returns {promise}
 * @example
 * import httpProxy from 'path/to/net/httpProxy';
 * httpProxy('remote/to/api')
 *     .then((data) => {
 *         // TODO: add your code
 *     })
 *     .catch(err => {
 *         // TODO: show error message(e.g. err.message)
 *     });
 */
 export default (url, method = HTTP_METHOD.GET, data = {}, credentials = false) => {
     const options = {
         url,
         method,
         headers: {
             'Authorization': storage.getData(AUTHORIZATION_KEY) || 'token will be here',
         },
         withCredentials: credentials
     };

     if (method !== HTTP_METHOD.GET) {
         options.headers['Accept'] = 'application/json';
         options.headers['Content-Type'] = 'application/json;charset=UTF-8';
         options.data = data;
     }
     if (method === HTTP_METHOD.GET) {
         options.params = data;
     }

     return axios(options)
        .then(res => {
            if(res.status >= 200 && res.status < 300) {
                return res.data;
            } else {
                return {
                    code: res.status,
                    msg: res.statusText,
                    data: []
                };
            }
        })

        .then(data => {
            if (data.code === HTTP_RESPONSE_STATE.SUCCESS) {
                return data.data;
            }

            throw new Error(data.msg);
        });
 };
