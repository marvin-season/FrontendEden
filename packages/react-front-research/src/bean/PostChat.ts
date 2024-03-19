import {generateStreamLine, parseLine} from "@/utils/postChat.ts";
import {sleep} from "@root/shared";

type onDataFunc = (str: string, isFirstMessage: boolean, moreInfo: any) => void;
type onCompletedFunc = (data: any) => void

export class PostChat {
    url: string;
    params: any = {};
    buffer: { value: any, done: boolean }[] = [];
    responseHandle: Promise<Response> | null = null;
    utf8Decoder = new TextDecoder("utf-8");
    isReadable: boolean = false;
    onData: onDataFunc;
    onCompleted: onCompletedFunc

    constructor(url: string, params: any, onData: onDataFunc, onCompleted: onCompletedFunc) {
        this.url = url;
        this.params = params;
        this.onData = onData;
        this.onCompleted = onCompleted
    }

    post() {
        this.clearBuffer();
        this.responseHandle = fetch(this.url, {
            mode: "cors",
            credentials: "include",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer 343c29e8485445fab6381ece3858a0d0`,
                "Tenant-Id": "449"
            }),
            redirect: "follow",
            method: "POST",
            body: JSON.stringify({
                ...this.params,
                response_mode: "streaming"
            })
        });
        this.storeAsLine();
        return this
    }

    storeAsLine() {
        this.responseHandle?.then(async response => {
            if (response?.body) {
                const asyncIterator = generateStreamLine(response.body.getReader(), this.utf8Decoder);
                let lastLineData: any;
                while (true) {
                    const {value, done} = await asyncIterator.next();
                    if (done) {
                        this.writeBuffer(lastLineData, true);
                        break;
                    }

                    parseLine(value, lineData => {
                        lastLineData = lineData;
                        if (!lineData || [1001, 1002, 500, 400].includes(lineData.code as number) || !lineData.event) {
                            // onError(lineData?.msg, lineData?.code);
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
        this.buffer.push({
            value, done
        });
    };

    clearBuffer() {
        this.buffer.splice(0, this.buffer.length)
    }

    readBuffer() {
        let isFirstMessage = true;
        const messageAnimation = async () => {
            const element = this.buffer.shift();
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

