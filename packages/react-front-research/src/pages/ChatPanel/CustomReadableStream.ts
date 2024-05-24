export class CustomReadableStream<T> extends ReadableStream<T> {
    constructor(data: T, generator?: (controller: ReadableStreamDefaultController, data: T) => void) {
        super({
            start(controller) {
                if (generator) {
                    generator(controller, data);
                } else {
                    controller.enqueue(data);
                }
                controller.close();
            }
        });
    }
}
