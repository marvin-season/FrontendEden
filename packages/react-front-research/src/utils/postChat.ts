import { sleep } from "@root/shared";


type MessageItemType = {
    code?: 500 | 1001 | 1002 | 400,
    msg?: string,
    event: string,
    task_id: string,
    id: string,
    answer: string,
    created_at: number,
    reply_id: string,
    conversation_id: string,
    messageId: string;
    conversationId: string
}

type onDataFunc = (str: string, isFirstMessage: boolean, moreInfo: MessageItemType) => void;
type onCompletedFunc = (data: MessageItemType) => void


type postSSEFunc = (postParams: {
    url: string,
    isApp?: boolean,
    controller: AbortController,
    params: any,
    onData: onDataFunc,
    onCompleted: onCompletedFunc,
    onError: (message: string | undefined | Error, code?: number) => void,
}) => Promise<void> & { abort: () => void }


const buffer: { value: MessageItemType, done: boolean }[] = []; // a queue stored message object
let isReadable = false; // if buffer is readable

export const postSSEBeta: postSSEFunc = ({
                                             url,
                                             isApp = false,
                                             controller,
                                             params,
                                             onData,
                                             onCompleted,
                                             onError
                                         }) => {
    try {
        const chatHandle = fetch(url, {
            signal: controller?.signal,
            mode: "cors",
            credentials: "include",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${isApp ? sessionStorage.getItem("token") : localStorage.getItem("token")}`,
                "Tenant-Id": localStorage.getItem("tenantId") ?? ""
            }),
            redirect: "follow",
            method: "POST",
            body: JSON.stringify({
                ...params,
                response_mode: "streaming"
            })
        }).then(async (response: Response) => {
            if(!response.body){
                return
            }
            setTimeout(() => {
                readBuffer(onData, onCompleted);
            });

            const iterator = generateStreamLine(response.body.getReader());
            let lastLineData: MessageItemType | null = null;
            while (true) {
                const { value, done } = await iterator.next();

                if (done) {
                    lastLineData && writeBuffer(lastLineData, true);
                    break;
                }


                parseLine(value, lineData => {
                    lastLineData = lineData;
                    if (!lineData || [1001, 1002, 500, 400].includes(lineData.code) || !lineData.event) {
                        onError(lineData?.msg, lineData?.code);
                        return;
                    }
                    writeBuffer(lineData);

                    if (!isReadable) {
                        isReadable = true;
                        // 触发事件
                        dispatchEvent(new Event("isReadableChanged"));
                    }
                });

            }
        }) as Promise<void> & { abort: () => void };


        chatHandle.abort = () => {
            controller.abort();
            isReadable = false;
            // 清除buffer
            clearBuffer();
            onError('AbortError', 999);
        };

        return chatHandle;
    } catch (e) {
        onError(e);
    }
};
const waitIsReadable = async () => {
    return new Promise(resolve => {
        // 如果isReadable已经为true，则立即调用resolve
        if (isReadable) {
            resolve(isReadable);
        } else {
            // 否则，设置一个事件监听器，监听isReadable变为true的事件
            const handler = () => {
                resolve(isReadable);
                // 在调用一次resolve后移除事件监听器，确保只触发一次
                removeEventListener("isReadableChanged", handler);
            };

            // 添加事件监听器
            addEventListener("isReadableChanged", handler);
        }
    });
};

const writeBuffer = (value: MessageItemType, done = false) => {
    buffer.push({ value: {
            ...value,
            messageId: value.id,
            conversationId: value.conversation_id
        }, done });
};

const clearBuffer = () => {
    buffer.splice(0, buffer.length)
}

const readBuffer = async (onData: onDataFunc, onCompleted: onCompletedFunc) => {
    await waitIsReadable();
    let isFirstMessage = true;
    const messageAnimation = async () => {
        const element = buffer.shift();
        if (element?.done) {
            onCompleted(element?.value);
            isReadable = false;
        } else if (element?.value) {
            if (element.value?.answer && element.value.answer.trim().length > 0) {
                onData(element.value.answer, isFirstMessage, element.value);
                isFirstMessage && (isFirstMessage = false);
            }
        }
        await sleep(Math.floor(Math.random() * 25 + 15));
        isReadable && requestAnimationFrame(messageAnimation);
    };
    messageAnimation().then();
};

export async function* generateStreamLine(reader: ReadableStreamDefaultReader<any>) {
    const utf8Decoder = new TextDecoder("utf-8");


    // const reader = response.body.getReader();
    let { value: chunk, done: readerDone } = await reader.read();

    chunk = chunk ? utf8Decoder.decode(chunk) : "";

    const newline = /\r?\n/gm;
    let startIndex = 0;
    let result: RegExpExecArray;

    while (true) {
        result = newline.exec(chunk);
        // 没有换行
        if (!result) {
            if (readerDone) break;

            const remainder = chunk.substring(startIndex);

            ({ value: chunk, done: readerDone } = await reader.read());
            chunk = remainder + (chunk ? utf8Decoder.decode(chunk) : "");
            startIndex = newline.lastIndex = 0;
            continue;
        }
        yield chunk.substring(startIndex, result.index);
        startIndex = newline.lastIndex;
    }

    if (startIndex < chunk.length) {
        // Last line didn't end in a newline char
        yield chunk.substring(startIndex);
    }
}


export const parseLine = (
    lineStr: string,
    onParse: (data: MessageItemType) => void,
    parser = (str: string) => str.replace(/^data:\s*/, "")) => {
    if (!/^data:\s*/.test(lineStr)) {
        console.warn(lineStr, "is not expected line string");
        return;
    }

    try {
        const data = JSON.parse(parser(lineStr)) as MessageItemType;
        data && onParse(data);
    } catch (e) {
        console.log("序列化失败", e);
    }
};



