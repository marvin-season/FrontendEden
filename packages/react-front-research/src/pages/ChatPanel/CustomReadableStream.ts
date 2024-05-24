export class CustomReadableStream<T> extends ReadableStream<T> {
    constructor(data: T, generator: (controller: ReadableStreamDefaultController, data: T) => Promise<void>) {
        super({
            async start(controller) {
                await generator(controller, data);
                controller.close();
            },
            cancel: console.log,
        });
    }
}
