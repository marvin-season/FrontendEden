import {Router} from "express";
import {streamText} from "ai";
import {createOllama} from "ollama-ai-provider";
const ollama = createOllama({
  baseURL: 'http://localhost:11434/api',
});
const ChatController = Router();

ChatController.get('/hello', (req, res) => res.send('Hello World!'))

ChatController.get('/stream', async (req, res) => {
  try {
    const result = await streamText({
      model: ollama('llama3.1:8b'),
      onChunk: (chunk) => {
        console.log(chunk)
      },
      system: `You are a helpful, respectful and honest assistant.`,
      messages: [
        {
          role: 'user',
          content: 'hi'
        }
      ],
    })


    return res.json({result})
  } catch (e) {
    console.log(e)
  }
})
export default ChatController