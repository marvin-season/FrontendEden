import {CustomReadableStream} from "@/pages/ChatPanel/CustomReadableStream.ts";
import {sleep} from "@root/shared";

export const getStream = (data = 'may i help you') => new CustomReadableStream<string>(data, async (controller, data) => {
    for (const value of data) {
        await sleep(1000)
        controller.enqueue(JSON.stringify({
            id: 1,
            content: value
        }));
    }
})
