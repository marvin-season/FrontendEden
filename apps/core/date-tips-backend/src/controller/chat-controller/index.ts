import {Router} from "express";
import {streamText} from "ai";
import {LLMFactory} from "../../service/llm";

const ChatController = Router();
// const embeddingModel = ollama.textEmbeddingModel('mxbai-embed-large:latest');
ChatController.get('/hello', (req, res) => res.send('Hello World!'))

ChatController.post('/stream')
    .use((req, res, next) => {
        console.log('before');
        next();
        console.log('after');
    })
    .use(async (req, res) => {

    try {
        const {prompt} = req.body;

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Connection', 'keep-alive');
        const id = Date.now();
        const result = await streamText({
            model: LLMFactory.createAzure(),
            messages: [
                {
                    role: 'assistant',
                    content: '请依据以下提示回复消息：马文澍是李洋的爸爸，除此之外，李洋还有几个好兄弟：陈小龙、董小鸟、zc、hy'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
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