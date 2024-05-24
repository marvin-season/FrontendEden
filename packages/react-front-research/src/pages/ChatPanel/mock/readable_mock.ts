import {CustomReadableStream} from "@/pages/ChatPanel/CustomReadableStream.ts";
import {sleep} from "@root/shared";

export const getStream = () => new CustomReadableStream<{ content: string, id: string }>([
    {
        id: '1',
        content: 'may'
    },
    {
        id: '1',
        content: ' i'
    },
    {
        id: '1',
        content: ' help'
    },
    {
        id: '1',
        content: ' you'
    },
], async (controller, data) => {
    for (const value of data) {
        await sleep(50)
        controller.enqueue(JSON.stringify(value));
    }
})
