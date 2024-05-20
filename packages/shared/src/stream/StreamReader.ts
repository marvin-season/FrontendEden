import {StreamParser} from "../chat";

export class StreamReader<T> {
    private streamParser: StreamParser;
    private readonly asyncIterator: AsyncGenerator

    constructor(private reader: ReadableStreamDefaultReader<T>) {
        this.streamParser = new StreamParser();
        this.asyncIterator = this.streamParser.readAsGenerator(this.reader);
    }

    async* getAsyncIterator() {
        for await (let value of this.asyncIterator) {
            if (typeof value === "string") {
                yield this.streamParser.syncParseLine(value as string)
            }
        }
    }

}
