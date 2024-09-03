import {Router} from "express";
import {convertToCoreMessages, StreamData, streamText} from "ai";
import {createOllama} from "ollama-ai-provider";

const ollama = createOllama({
    baseURL: 'http://127.0.0.1:11434/api',
});
const ChatController = Router();

ChatController.get('/hello', (req, res) => res.send('Hello World!'))

ChatController.post('/stream', async (req, res) => {

    try {
        const {prompt} = req.body;
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Connection', 'keep-alive');
        const id = Date.now();
        const result = await streamText({
            model: ollama('llama3.1:latest'),
            prompt,
        })

        for await (const content of result.textStream) {
            console.log('result', content);
            res.write(`data: ${JSON.stringify({content, id})}\n\n`);
        }

        res.end();

    } catch (e) {
        console.error('Error in /stream endpoint:', e);
        res.status(500).send('Internal Server Error');
    }
})
export default ChatController