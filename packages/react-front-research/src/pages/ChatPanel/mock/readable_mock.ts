import {sleep} from "@root/shared";

export const getStream = <T>(data = 'may i help you') => new ReadableStream<T>({
    start: () => {
        console.log("🚀  start",)
    },
    pull: async (controller) => {
        console.log("🚀  pull",)
        for (const value of data) {
            await sleep(1000)
            controller.enqueue(JSON.stringify({
                id: 1,
                content: value
            }) as T);
        }
        controller.close();
    },
    cancel: console.log,

})

export const composeStream = <T>(stream: ReadableStream<string>, onData: (data: T) => void, onFinish?: (data?: T) => void) => {
    stream
        .pipeThrough(new TransformStream({
            transform(chunk, controller) {
                const data = JSON.parse(chunk)
                controller.enqueue(data)
            },
        }))
        .pipeTo(new WritableStream({
            write(chunk) {
                onData(chunk)
            },
        }))
        .then(() => {
            onFinish?.()
        })
}
