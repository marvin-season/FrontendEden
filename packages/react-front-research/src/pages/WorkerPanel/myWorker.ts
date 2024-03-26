function pause(ms: number) {
    let time = new Date();
    while ((new Date().getTime()) - time.getTime() <= ms) {
        // waiting ...
    }
}

// 监听主线程发送的消息
self.onmessage = function (event) {
    console.log('event', event)
    // 从消息中获取要计算的数组

    pause(event.data.ms)
    // 将结果发送回主线程
    postMessage('ok');
};
