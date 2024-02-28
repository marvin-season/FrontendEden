import {debounce} from "../common/urtl/index.js";

/**
 * debounce test
 */
let debounceFunc = debounce((...args) => {
    console.log('== args', args)
});
let count = 0;
while (count < 10) {
    debounceFunc()
    count++
}

