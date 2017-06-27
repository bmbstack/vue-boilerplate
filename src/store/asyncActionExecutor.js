import httpProxy from '../net/httpProxy';
import { HTTP_RESPONSE_STATE } from '../constants/http';

export default function({ commit }) {
    return async (URL, request, success, failure, method, data) => {
        commit(request);

        try {
            const response = await httpProxy(URL, method, data, false);

            if (response.status >= 200 && response.status < 300) {
                const json = await response.json();
                if (json.code === HTTP_RESPONSE_STATE.SUCCESS) {
                    commit(success, json.data);
                } else {
                    commit(failure, json.msg);
                }
            } else {
                commit(failure, `HTTP(${URL}) ERROR(${response.status})`);
            }
        } catch (e) {
            if (e.url) {
                commit(failure, `HTTP(${e.url}) ERROR(${e.status})`);
            } else {
                commit(failure, e.message);
            }
        }
    };
}
