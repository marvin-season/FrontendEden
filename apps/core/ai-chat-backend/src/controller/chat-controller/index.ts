import { Router } from "express";
import prisma from "@/utils/prisma";
import { ConversationService } from "@/service/conversation";
import { chatService } from "@/service/chat";
import { ErrorEvent } from "@/controller/chat-controller/constant";


const ChatController = Router();
// const embeddingModel = ollama.textEmbeddingModel('mxbai-embed-large:latest');
ChatController.post("/stream")
    .use(async (req, res, next) => {
        console.log("before");
        const { conversationId } = req.body;

        try {
            req.body.conversationId = await ConversationService.create(conversationId);
            next();
        } catch (e) {
            console.log(e);
        }
        console.log("after");
    })
    .use(async (req, res, next) => {

        try {
            const { prompt, conversationId, attachments } = req.body;
            const abortController = new AbortController();

            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Connection", "keep-alive");
            res.on("close", () => {
                abortController.abort(ErrorEvent.stop);
            });

            const result = await chatService.streamChat({
                prompt,
                abortSignal: abortController.signal
            });
            await chatService.writeStreamAndDB(res, { result, prompt, conversationId, attachments });
            res.end();

        } catch (e) {
            console.error("Error in /stream endpoint:", e);
            res.status(500).send("Internal Server Error");
            res.end();
        }
    });
export default ChatController;