import {Router} from 'express';
import DateTipController from "./datetip-controller";
import ChatController from "./chat-controller";
import ConversationController from "./conversation-controller";

const IndexController = Router();

IndexController.use('/datetip', DateTipController);
IndexController.use('/chat', ChatController);
IndexController.use('/conversation', ConversationController);

export default IndexController

export async function* SSEMessageGenerator<T>(response: Response) {
    if (!response?.body) {
        return
    }

    for await (const chunk of response.body) {
        const sse_chunk = new TextDecoder().decode(chunk)
        try {
            // 使用for...of替代forEach，确保yield在生成器体内
            for (const line of sse_chunk.split(/\n+/)) {
                const json_obj = line.replace(/data:\s*/, '').trim();
                if (json_obj.length >= 4) {
                    const message = JSON.parse(json_obj);
                    yield message as T; // 在生成器内yield消息
                }
            }

        } catch (e) {
            console.log(e)
        }
    }
}

SSEMessageGenerator(new Response())