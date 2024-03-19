import {sleep} from "@root/shared";
import {FetchStreamParser} from "@/bean/FetchStreamParser.ts";

type onDataFunc = (str: string, isFirstMessage: boolean, moreInfo: any) => void;
type onCompletedFunc = (data: any) => void;
type onErrorFunc = (message: any, code?: number) => void;

export class PostChat {
    static streamParser = new FetchStreamParser();

    url: string;
    params: any = {};
    messageBuffer: { value: any, done: boolean }[] = [];
    responseHandle: Promise<Response> | null = null;
    isReadable: boolean = false;
    onData: onDataFunc;
    onCompleted: onCompletedFunc;
    onError?: onErrorFunc

    constructor(url: string, params: any, onData: onDataFunc, onCompleted: onCompletedFunc, onError?: onErrorFunc) {
        this.url = url;
        this.params = params;
        this.onData = onData;
        this.onCompleted = onCompleted;
        this.onError = onError;
    }

    post() {
        this.clearBuffer();
        try {
            this.responseHandle = fetch(this.url, {
                mode: "cors",
                credentials: "include",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `1Bearer 343c29e8485445fab6381ece3858a0d0`,
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
            const noStreamData = await response.json();

            if (noStreamData) {
                this.onError?.(noStreamData);
                return
            }

            if (response?.body) {

                const asyncIterator = PostChat.streamParser.readAsGenerator(response.body.getReader());

                let lastLineData: any;
                while (true) {
                    const {value, done} = await asyncIterator.next();
                    if (done) {
                        this.writeBuffer(lastLineData, true);
                        break;
                    }

                    PostChat.streamParser.parseLine(value, lineData => {
                        lastLineData = lineData;
                        if (!lineData || [1001, 1002, 500, 400].includes(lineData.code as number) || !lineData.event) {
                            this.onError?.(lineData?.msg, lineData?.code);
                            return;
                        }

                        this.writeBuffer(lineData);

                        if (!this.isReadable) {
                            this.isReadable = true;
                            this.readBuffer()
                        }
                    });

                }
            }
        })
    }

    writeBuffer(value: any, done = false) {
        // console.log('value', value, done)
        this.messageBuffer.push({
            value, done
        });
    };

    clearBuffer() {
        this.messageBuffer.splice(0, this.messageBuffer.length)
    }

    readBuffer() {
        let isFirstMessage = true;
        const messageAnimation = async () => {
            const element = this.messageBuffer.shift();
            if (element?.done) {
                this.onCompleted(element?.value);
                this.isReadable = false;
            } else if (element?.value) {
                if (element.value?.answer && element.value.answer.trim().length > 0) {
                    this.onData(element.value.answer, isFirstMessage, element.value);
                    isFirstMessage && (isFirstMessage = false);
                }
            }
            await sleep(Math.floor(Math.random() * 25 + 15));
            this.isReadable && requestAnimationFrame(messageAnimation);
        };
        messageAnimation().then();
    }
}

