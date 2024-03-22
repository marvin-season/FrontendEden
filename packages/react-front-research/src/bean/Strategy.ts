import {FetchStreamParser} from "@/bean/FetchStreamParser.ts";
import {MessageBuffer} from "@/bean/MessageBuffer.ts";
import {onDataFunc} from "@/bean/PostChat.ts";

export interface Strategy {
    execute: (asyncIterator: AsyncGenerator<string, void>, onData: onDataFunc) => void
}

export class StoreStrategy implements Strategy {
    private static streamParser = new FetchStreamParser();

    private static messageBuffer = new MessageBuffer();

    execute(asyncIterator: AsyncGenerator<string, void>, onData: onDataFunc): void {
        (async () => {
            let lastLineData: any;
            while (true) {
                const {value, done} = await asyncIterator.next();
                if (done) {
                    StoreStrategy.messageBuffer.write(lastLineData, true);
                    break;
                }

                StoreStrategy.streamParser.parseLine(value, lineData => {
                    lastLineData = lineData;
                    if (!lineData || [1001, 1002, 500, 400].includes(lineData.code as number) || !lineData.event) {
                        throw new Error(lineData.code)
                    }

                    StoreStrategy.messageBuffer.write(lineData);

                    if (!MessageBuffer.isReadable) {
                        MessageBuffer.isReadable = true;
                        StoreStrategy.messageBuffer.read(onData)
                    }
                });

            }
        })()


    }

}
