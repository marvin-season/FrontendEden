import {PromiseA, throttle} from "@root/shared";



// PromiseA.resolve({a: 1}).then(console.log)

setInterval(throttle(() => {
    console.log(1)
}, 1000), 500)
