import { sleep } from "@marvin/shared";

export const getStream = <T>(data = 'may i help you') => new ReadableStream<T>({
    start: () => {
        console.log("🚀  start",)
    },
    pull: async (controller) => {
        console.log("🚀  pull",)
        for (const value of data) {
            await sleep(100)
            controller.enqueue(JSON.stringify({
                id: 1,
                content: value
            }) as T);
        }
        controller.close();
    },
    cancel: console.log,

})

export const composeStream = <T>(stream: ReadableStream<string>, onMessage: (message: T) => void, onFinish?: (message?: T) => void) => {
    stream
        .pipeThrough(new TransformStream({
            transform(chunk, controller) {
                const data = JSON.parse(chunk)
                controller.enqueue(data)
            },
        }))
        .pipeTo(new WritableStream({
            write: onMessage
        }))
        .then(() => {
            onFinish?.()
        })
}
