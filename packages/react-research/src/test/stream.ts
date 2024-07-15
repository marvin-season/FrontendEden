import {TextUnderlyingSource} from "@/bean/stream/TextUnderlyingSource.ts";

const readableStream = new ReadableStream(new TextUnderlyingSource());


const writableStream = new WritableStream({
    start(controller) {
        console.log("[start] write")
    },
    async write(chunk, controller) {
        await new Promise(resolve => setTimeout(() => {
            console.log("[write]", chunk);
            resolve(true)
        }, 1000))
    },
    close() {
        console.log('[close]');
    },
    abort(reason) {
        console.log('[abort]', reason);
    },
});


// (async () => {
//     const writer = writableStream.getWriter();
//
//     for await (const chunk of readableStream as any) {
//         console.log("chunk", chunk);
//         await writer.ready;
//         writer.write(chunk).then()
//     }
// })()


// readableStream.pipeTo(writableStream).then(console.log);

const textDecoder = new TextDecoder();

const textDecodeStream = () => new TransformStream({
    transform(chunk, controller) {
        controller.enqueue(textDecoder.decode(chunk))
    }
});

readableStream.pipeThrough(textDecodeStream()).pipeTo(writableStream).then();
