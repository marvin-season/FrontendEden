import {Router} from "express";
import {convertToCoreMessages, StreamData, streamText} from "ai";
import {createOllama} from "ollama-ai-provider";

const ollama = createOllama({
  baseURL: 'http://localhost:11434/api',
});
const ChatController = Router();

ChatController.get('/hello', (req, res) => res.send('Hello World!'))

ChatController.post('/stream', async (req, res) => {

  try {
    const {prompt} = req.body;
    // Set headers to keep connection alive for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    await streamText({
      model: ollama('llama3.1:8b'),
      onChunk: (chunk) => {
        res.write(`data: ${JSON.stringify(chunk)}`);
      },
      onFinish: (event) => {
        res.write(`data: ${JSON.stringify(event)}`);
        res.end();
      },
      prompt
    })

  } catch (e) {
    console.error('Error in /stream endpoint:', e);
    res.status(500).send('Internal Server Error');
  }
})
export default ChatController