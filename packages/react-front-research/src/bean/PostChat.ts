import {FetchStreamParser} from "@/bean/FetchStreamParser.ts";
import {MessageBuffer} from "@/bean/MessageBuffer.ts";

export type onDataFunc = (messageInfo: any, isDone: boolean, isFirstMessage: boolean) => void;
export type onErrorFunc = (message: any, code?: number) => void;

export class PostChat {
    static streamParser = new FetchStreamParser();
    static messageBuffer = new MessageBuffer();

    private asyncIterator: AsyncGenerator<string, void> | null = null;


    constructor(public url: string, public params: any, public onData: onDataFunc, public onError?: onErrorFunc, public controller?: AbortController) {
    }

    abort(){
        this.controller?.abort();
        MessageBuffer.isReadable = false;
        PostChat.messageBuffer.clear();
        this.onError?.(999)
    }

    post() {
        PostChat.messageBuffer.clear();

        try {
            fetch(this.url, {
                signal: this.controller?.signal,
                mode: "cors",
                credentials: "include",
                headers: new Headers({}),
                redirect: "follow",
                method: "POST",
                body: JSON.stringify({
                    ...this.params,
                    response_mode: "streaming"
                })
            }).then(async response => {
                if (response.body) {
                    this.asyncIterator = PostChat.streamParser.readAsGenerator(response.body.getReader());
                    await this.storeAsLine()
                }
            });


        } catch (e) {
            this.onError?.(e)
        }

        return this
    }

    private async storeAsLine() {
        if (!this.asyncIterator) {
            console.log('asyncIterator is null')
            return
        }

        let lastLineData: any;
        while (true) {
            const {value, done} = await this.asyncIterator.next();
            if (done) {
                PostChat.messageBuffer.write(lastLineData, true);
                break;
            }

            PostChat.streamParser.parseLine(value, lineData => {
                lastLineData = lineData;
                if (!lineData || [1001, 1002, 500, 400].includes(lineData.code as number) || !lineData.event) {
                    this.onError?.(lineData?.msg, lineData?.code);
                    return;
                }

                PostChat.messageBuffer.write(lineData);

                if (!MessageBuffer.isReadable) {
                    MessageBuffer.isReadable = true;
                    PostChat.messageBuffer.read(this.onData)
                }
            });

        }

    }
}

