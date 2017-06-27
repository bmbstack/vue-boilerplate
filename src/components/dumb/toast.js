/**
 * Toast
 * @class Toast
 * @memberof module:components/dumb
 * @example
 * import { toast } from 'path/to/components/dumb'
 * export default {
 *     render: h => <toast message={ "How are you?" }
 *         requestClose={ () => this.showToast = false } />
 * }
 */
const toast = {
    name: 'toast',
    /**
     * @lends module:components/dumb.Toast
     */
    props: {
        /**
         * @type {String}
         * @desc 内容文本
         */
        message: {
            type: String,
            default: '^_^'
        },
        /**
         * @type {Function}
         * @desc 请求关闭的回调函数
         */
        requestClose: {
            type: Function,
        }
    },
    data: () => ({
        closeID: Object.freeze(0)
    }),
    mounted() {
        this.$nextTick(() => {
            this.closeID = setTimeout(() => {
                const { requestClose } = this;
                requestClose && requestClose();
            }, 3E3);
        });
    },
    destroyed() {
        clearTimeout(this.closeID);
    },
    render(h) { // eslint-disable-line no-unused-vars
        const { message } = this;
        return <div class="toast">{ message  }</div>;
    }
};

export default toast;
