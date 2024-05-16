import {StreamParser} from "./StreamParser";

type onDataFunc = (messageInfo: any, isDone: boolean, isFirstMessage: boolean) => void;
type onErrorFunc = (message: any, code?: number) => void;

export class PostChat {
    private static streamParser = new StreamParser();
    private asyncIterator: AsyncGenerator<string, void> | null = null;


    constructor(public url: string, public params: any, public onData: onDataFunc, public onError?: onErrorFunc, public controller?: AbortController) {
    }

    abort() {
        this.controller?.abort();
        this.onError?.(999)
    }

    post() {
        try {
            fetch(this.url, {
                signal: this.controller?.signal,
                mode: "cors",
                credentials: "include",
                headers: new Headers({
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Tenant-Id': localStorage.getItem('tenantId') || ''
                }),
                redirect: "follow",
                method: "POST",
                body: JSON.stringify({
                    ...this.params,
                    response_mode: "streaming"
                })
            }).then(async response => {
                if (response.body) {
                    this.asyncIterator = PostChat.streamParser.readAsGenerator(response.body.getReader());
                    await this.expose();
                }
            });
        } catch (e) {
            this.onError?.(e)
        }

        return this
    }

    private async expose() {
        if (!this.asyncIterator) {
            return
        }
        for await (const lineStr of this.asyncIterator) {
            await PostChat.streamParser.asyncParseLine(lineStr, lineData => {
                this.onData(lineData, false, false);
            }).catch((e) => {
                console.error(e)
            });
        }
    }
}

