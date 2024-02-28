import {debounce} from "../common/debounce/index.js";

let debounceFunc = debounce((...args) => {
    console.log('== args', args)
});
let count = 0;
while (count < 10) {
    debounceFunc()
    count++
}

