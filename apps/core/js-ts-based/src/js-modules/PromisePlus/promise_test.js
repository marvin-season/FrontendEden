const getUser = async (timeout) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (timeout === 2000) {
                reject('error')
            } else {
                resolve(timeout)
            }
        }, timeout);
    })

}
Promise.allSettled([getUser(1000), getUser(2000), getUser(3000)]).then(console.log).catch(console.error)