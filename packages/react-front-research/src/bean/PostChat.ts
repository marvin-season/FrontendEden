import {FetchStreamParser} from "@/bean/FetchStreamParser.ts";
import {MessageBuffer} from "@/bean/MessageBuffer.ts";

export type onDataFunc = (str: string, isFirstMessage: boolean, moreInfo: any) => void;
export type onCompletedFunc = (data: any) => void;
export type onErrorFunc = (message: any, code?: number) => void;

export class PostChat {
    static streamParser = new FetchStreamParser();
    static messageBuffer = new MessageBuffer();

    url: string;
    params: any = {};
    responseHandle: Promise<Response> | null = null;
    onData: onDataFunc;
    onCompleted: onCompletedFunc;
    onError?: onErrorFunc;

    constructor(url: string, params: any, onData: onDataFunc, onCompleted: onCompletedFunc, onError?: onErrorFunc) {
        this.url = url;
        this.params = params;
        this.onData = onData;
        this.onCompleted = onCompleted;
        this.onError = onError;
    }

    post() {
        PostChat.messageBuffer.clear();

        try {
            this.responseHandle = fetch(this.url, {
                mode: "cors",
                credentials: "include",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer 343c29e8485445fab6381ece3858a0d0`,
                    "Tenant-Id": "449"
                }),
                redirect: "follow",
                method: "POST",
                body: JSON.stringify({
                    ...this.params,
                    response_mode: "streaming"
                })
            });

            this.storeAsLine()
        } catch (e) {
            this.onError?.(e)
        }

        return this
    }

    private storeAsLine() {
        this.responseHandle?.then(async response => {
            if (response?.body) {

                const asyncIterator = PostChat.streamParser.readAsGenerator(response.body.getReader());

                let lastLineData: any;
                while (true) {
                    const {value, done} = await asyncIterator.next();
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
                            PostChat.messageBuffer.read(this.onData, this.onCompleted)
                        }
                    });

                }
            }
        })
    }


}

