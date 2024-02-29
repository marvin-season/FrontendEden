export const debounce = (fn: Function, delay = 1000) => {
    let timer = null;

    return (...args: any) => {
        console.log('args', args)
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(this, ...args)
            timer = null
        }, delay)
    }
}


export const throttle = (fn: Function, delay = 1000) => {
    let timer = null
    return (...args: any) => {
        if (timer) {
            return
        }

        timer = setTimeout(() => {
            fn.call(this, ...args)
            timer = null
        }, delay)
    }

}


export const call_ = function (ctx = {}, ...args: any) {

    const key = Symbol()
    ctx[key] = this;
    const res = ctx[key](...args)
    delete ctx[key]
    return res
}
