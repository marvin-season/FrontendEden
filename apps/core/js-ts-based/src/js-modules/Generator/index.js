import {Emitter} from './Emitter.js'

const emitter = new Emitter(10);

async function asyncCount() {
    const asyncCounter = emitter[Symbol.asyncIterator]();
    for await(const x of asyncCounter) {
        console.log(x);
    }
    return Promise.resolve('ok')

}


asyncCount().then((res) => {
    console.log('res', res)
});
