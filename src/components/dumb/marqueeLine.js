/**
 * 跑马灯
 * @class MarqueeLine
 * @memberof module:components/dumb
 * @example
 * import { marqueeLine } from 'path/to/components/dumb'
 * export default {
 *     render: h => <marquee-line speed={ 5 }>
 *         <div>Hello World</div>
 *         <div>a same dream</div>
 *     </marquee-line>
 * }
 */
const marqueeLine = {
    name: 'marqueeLine',
    /**
     * @lends module:components/dumb.MarqueeLine
     */
    props: {
        /**
         * @type {number}
         * @desc 移动速度
         */
        speed: {
            type: Number,
            default: 5
        },
        /**
         * @type {number}
         * @desc 偏移量微调
         */
        offset: {
            type: Number,
            default: 15
        }
    },
    data: () => ({
        marqueeId: 0
    }),
    render(h) { // eslint-disable-line no-unused-vars
        return (
            <div class="marquee-line" ref="container">
                { this.$slots.default }
                { this.$slots.default }
            </div>
        );
    },
    mounted() {
        this.$nextTick(() => {
            const { offset } = this;
            const container = this.$refs.container;
            const children = container.querySelectorAll('div');
            const totalWidth = Array.from(children).reduce((sum, item) => sum += item.offsetWidth, 0);
            const speed = this.speed;
            const motion = () => {
                if (container.scrollLeft >= totalWidth - container.offsetWidth)
                    container.scrollLeft -= totalWidth - container.offsetWidth - offset;
                else
                    container.scrollLeft += speed;

                window.requestAnimationFrame(motion);
            };

            window.requestAnimationFrame(motion);
        });
    }
};

export default marqueeLine;
