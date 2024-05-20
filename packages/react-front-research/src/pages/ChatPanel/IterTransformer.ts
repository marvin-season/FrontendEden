import {StreamReader} from "@root/shared";
import moment from "moment/moment";

export class IterTransformer<T = any> {
    constructor(private readonly streamReader: StreamReader<T>) {
    }

    async* iter() {
        for await (const message of this.streamReader.getAsyncIterator() as AsyncGenerator<any>) {
            if (message?.event === "message") {
                yield {
                    id: message.id,
                    content: message.answer || '',
                    createTime: moment().format('MM-dd')
                }
            } else if (message?.event === "message_end") {
                return {}
            }
        }
    }
}
