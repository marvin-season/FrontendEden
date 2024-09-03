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
    const {messages} = req.body;

    console.log(messages)
    const result = await streamText({
      model: ollama('llama3.1:8b'),
      messages: convertToCoreMessages(messages),
    })

    return result.toTextStreamResponse({
      status: 200
    })
  } catch (e) {
    console.log(e)
  }
})
export default ChatController