import {sleep} from "@root/shared";
import {onCompletedFunc, onDataFunc} from "@/bean/PostChat.ts";

export class MessageBuffer {
    messageBuffer: { value: any, done: boolean }[] = [];
    static isReadable: boolean = false;

    write(value: any, done = false) {
        this.messageBuffer.push({
            value, done
        });
    };

    clear() {
        this.messageBuffer.splice(0, this.messageBuffer.length)
    }

    read(onData: onDataFunc, onCompleted: onCompletedFunc) {
        let isFirstMessage = true;
        const messageAnimation = async () => {
            const element = this.messageBuffer.shift();
            if (element?.done) {
                onCompleted(element?.value);
                MessageBuffer.isReadable = false;
            } else if (element?.value) {
                if (element.value?.answer && element.value.answer.trim().length > 0) {
                    onData(element.value.answer, isFirstMessage, element.value);
                    isFirstMessage && (isFirstMessage = false);
                }
            }
            await sleep(Math.floor(Math.random() * 25 + 15));
            MessageBuffer.isReadable && requestAnimationFrame(messageAnimation);
        };
        messageAnimation().then();
    }
}
