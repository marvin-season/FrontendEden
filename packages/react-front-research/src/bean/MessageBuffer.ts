import {sleep} from "@root/shared";
import { onDataFunc} from "@/bean/PostChat.ts";

export class MessageBuffer {
    messageBuffer: { value: any, done: boolean }[] = [];
    static isReadable: boolean = false;

    write(value: any, done = false) {
        this.messageBuffer.push({value, done});
    };

    clear() {
        this.messageBuffer.splice(0, this.messageBuffer.length)
    }

    read(onData: onDataFunc) {
        let isFirstMessage = true;
        const messageAnimation = async () => {
            const element = this.messageBuffer.shift();
            if (element) {
                onData(element.value, element.done, isFirstMessage);
                isFirstMessage && (isFirstMessage = false);
            }
            await sleep(Math.floor(Math.random() * 25 + 15));

            MessageBuffer.isReadable && requestAnimationFrame(messageAnimation);
        };
        messageAnimation().then();
    }
}
