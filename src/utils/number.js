/**
 * @function
 * @memberof module:utils
 * @param {number} origin 原数值
 * @param {number} [num] 保留位数
 * @returns {number}
 * @example
 * import { toFixed } from 'path/to/utils/number';
 * const origin = 3.1415926;
 * toFixed(origin, 2); // output 3.14
 */
export function toFixed(origin ,num = 2) {
    let digit = Math.pow(10, num);
    return Math.round(origin * digit) / digit;
}

/**
 * @function
 * @memberof module:utils
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number}
 * @example
 * import { random } from 'path/to/utils/number';
 * random(1, 2); // return a nunber will be in range [1, 2];
 */
export function random(min, max) {
    const diff = max - min;
    return Math.round(Math.random() * diff + min);
}
