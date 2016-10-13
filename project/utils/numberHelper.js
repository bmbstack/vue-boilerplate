export default {
    toFixed(origin ,num = 2) {
        let digit = 10 * num;
        return Math.round(origin * digit) / digit;
    }
} 
