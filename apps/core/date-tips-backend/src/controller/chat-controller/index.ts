import {Router} from "express";
import {streamText} from "ai";
import {createOllama} from "ollama-ai-provider";
const ollama = createOllama({
  baseURL: 'http://10.3.74.72:11434',
});
const ChatController = Router();

ChatController.get('/hello', (req, res) => res.send('Hello World!'))

ChatController.get('/stream', async (req, res) => {
  try {
    const result = await streamText({
      model: ollama('qwen2:7b'),
      system: `You are a helpful, respectful and honest assistant.`,
      messages: [
        {
          role: 'user',
          content: 'Hello, how are you?'
        }
      ],
    })


    return res.json({result})
  } catch (e) {
    console.log(e)
  }
})
export default ChatController