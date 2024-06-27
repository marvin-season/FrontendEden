import {sleep} from "@marvin/shared";

export const getStream = async () => {
    const res = await fetch('/chat-azure-moc.txt')
    return res.body
}

const textDecoder = new TextDecoder('utf-8')

export const composeStream = <T>(stream: ReadableStream<Uint8Array>, onMessage: (message: T) => void, onFinish?: (message?: T) => void) => {
    stream
        .pipeThrough(new TransformStream({
            transform(chunk, controller) {
                const allData = textDecoder.decode(chunk)
                allData.split('\n').forEach(async (line) => {
                    // await sleep(10)
                    controller.enqueue(line.replace(/^data:\s*\r*/, ''))
                })
            },
        }))
        .pipeThrough(new TransformStream({
            transform(chunk, controller) {
                try {
                    const data = JSON.parse(chunk)
                    controller.enqueue(data)
                } catch (e) {
                }
            },
        }))
        .pipeTo(new WritableStream({
            write: (data) => {
                // @ts-ignore
                onMessage({id: data.id,content: data.answer})
            }
        }))
        .then(() => {
            onFinish?.()
        })
}
