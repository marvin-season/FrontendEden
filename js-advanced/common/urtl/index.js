export const debounce = (fn, delay = 1000) => {
    let timer = null;

    return (...args) => {
        console.log('args', args)
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, ...args)
            timer = null
        }, delay)
    }
}


export const throttle = (fn, delay = 1000) => {
    let timer = null
    return (...args) => {
        if (timer) {
            return
        }

        timer = setTimeout(() => {
            fn.call(this, ...args)
            timer = null
        }, delay)
    }

}
