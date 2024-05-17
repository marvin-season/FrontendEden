import {StreamParser} from "./StreamParser";

type onDataFunc = (messageInfo: any, isDone: boolean, isFirstMessage: boolean) => void;
type onErrorFunc = (message: any, code?: number) => void;
type constructorParamsTypes = {
    url?: string;
    params?: any;
    onData?: onDataFunc;
    onError?: onErrorFunc;
    controller?: AbortController;
}

export class PostChat {
    private static streamParser = new StreamParser();
    private asyncIterator: AsyncGenerator<string, void> | null = null;
    private static instance: PostChat;
    private params: constructorParamsTypes

    public static getInstance(params?: constructorParamsTypes): PostChat {
        console.log("🚀  ", PostChat[Symbol.hasInstance])
        if (!PostChat.instance) {
            PostChat.instance = new PostChat(params)
        }
        return PostChat.instance;

    }

    private constructor(params?: constructorParamsTypes) {
        this.params = params
    }

    abort() {
        this.params.controller?.abort();
        this.params.onError?.(999)
    }

    send(params?: constructorParamsTypes) {
        if (params) {
            this.params = {
                ...this.params,
                ...params
            };
        }
        if (!this.params) {
            throw new Error('请提供参数')
        }

        try {
            fetch(this.params.url, {
                signal: this.params.controller?.signal,
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
            this.params.onError?.(e)
        }

        return this
    }

    private async expose() {
        if (!this.asyncIterator) {
            return
        }
        for await (const lineStr of this.asyncIterator) {
            await PostChat.streamParser.asyncParseLine(lineStr, lineData => {
                this.params.onData(lineData, false, false);
            }).catch((e) => {
                console.error(e)
            });
        }
    }
}

