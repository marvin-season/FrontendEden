import {Router} from "express";
import {streamText} from "ai";
import {createOllama} from "ollama-ai-provider";
const ollama = createOllama({
  baseURL: 'http://localhost:11434/api',
});
const ChatController = Router();

ChatController.get('/hello', (req, res) => res.send('Hello World!'))

ChatController.post('/stream', async (req, res) => {
  try {
    const data = req.body;
    console.log(data)
    const result = await streamText({
      model: ollama('llama3.1:8b'),
      system: `You are a helpful, respectful and honest assistant.`,
      messages: [
        {
          role: 'user',
          content: data.prompt
        }
      ],
    })
    const response = new Response();
    if(response?.body){
      // @ts-ignore
      for await (const responseElement of response.body) {
        console.log(responseElement)
      }
    }


    return result.toTextStreamResponse()
  } catch (e) {
    console.log(e)
  }
})
export default ChatController