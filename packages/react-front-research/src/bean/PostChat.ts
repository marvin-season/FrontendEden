import {FetchStreamParser} from "@/bean/FetchStreamParser.ts";
import {MessageBuffer} from "@/bean/MessageBuffer.ts";
import {StoreStrategy, Strategy} from "@/bean/Strategy.ts";

export type onDataFunc = (messageInfo: any, isDone: boolean, isFirstMessage: boolean) => void;
export type onErrorFunc = (message: any, code?: number) => void;


class PostChatContext {
    private strategy: Strategy | null = null;

    set(strategy: Strategy) {
        this.strategy = strategy;
    }

    executeStrategy(asyncIterator: AsyncGenerator<string, void>, onData: onDataFunc) {
        this.strategy?.execute(asyncIterator, onData);
    }
}

export class PostChat {
    private static streamParser = new FetchStreamParser();
    private static messageBuffer = new MessageBuffer();
    private context: PostChatContext = new PostChatContext();
    private asyncIterator: AsyncGenerator<string, void> | null = null;
    private static readonly initConfig: RequestInit = {
        mode: "cors",
        credentials: "include",
        redirect: "follow",
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json',
            'Tenant-Id': '',
            'Authorization': 'Bearer '
        }),
    }


    constructor(public url: string, public params: any, public onData: onDataFunc, public onError?: onErrorFunc, public controller?: AbortController) {
        this.context.set(new StoreStrategy())
    }

    abort() {
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
                ...PostChat.initConfig,
                body: JSON.stringify({
                    ...this.params,
                    response_mode: "streaming"
                })
            }).then(async response => {
                if (response.body) {
                    this.asyncIterator = PostChat.streamParser.readAsGenerator(response.body.getReader());
                    this.context.executeStrategy(this.asyncIterator, this.onData)
                }
            });


        } catch (e) {
            console.log(e)
            this.onError?.(e)
        }

        return this
    }
}

