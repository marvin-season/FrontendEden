import {debounce, throttle} from "../common/urtl/index.js";

let callback = (...args) => {
    console.log('== args', args)
};
/**
 * debounce test
 */
let debounceFunc = debounce(callback);
let count = 0;
// while (count < 10) {
//     debounceFunc('a', 1, 'b')
//     count++
// }

const throttleFunc = throttle(callback, 1000)
setInterval(() => {
    throttleFunc(1, 23)
    count++
}, 500)
