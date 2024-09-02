const readableStream = new ReadableStream({
    start(controller) {
        setInterval(() => {
            controller.enqueue('hi')
        }, 1000)
    },
})

const transformedStream = readableStream.pipeThrough(new TransformStream({
        transform(chunk, controller) {
            console.log('chunk => ', chunk)
            controller.enqueue(chunk + '1')
        }
    }
))

for await (const transformedStreamElement of transformedStream) {
    console.log('transformedStreamElement', transformedStreamElement)
}