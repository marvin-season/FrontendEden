import { Router } from "express";
import { streamText, tool } from "ai";
import { LLMFactory } from "../../service/llm";
import prisma from "../../utils/prisma";
import { ConversationService } from "../../service/conversation";
import { MessageEvent } from "./constant";
import { chatService } from "../../service/chat";


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
      const { prompt, conversationId, toolIds } = req.body;
      const abortController = new AbortController();

      req.on("close", () => {
        // todo: 客户端终止数据输出 不生效
        abortController.abort("stop");
      });

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Connection", "keep-alive");


      /**
       * 工具调用
       */

      if (toolIds.length) {
        console.log("选择了工具：", toolIds);
      }

      const result = await chatService.streamComplete({
        prompt,
      });
      // const result = await streamText({
      //   model: LLMFactory.createAzure(),
      //   abortSignal: abortController.signal,
      // tools: {
      //     calculateInputLength: tool({
      //         description: 'calculate the input string length',
      //         parameters: z.object({
      //             input: z.string().describe('the prompt of input'),
      //         }),
      //         execute: async ({ input }: { input: string }) => ({
      //             input,
      //             pinter: input.length,
      //         }),
      //     })
      // },
      // prompt,
      // messages: [
      //     {
      //         role: 'assistant',
      //         content: '你是一个精通世界历史的专家，请使用中文回复我',  // you are so clever, answer me with english
      //     },
      //     {
      //         role: 'user',
      //         content: prompt,
      //     }
      // ],
      // });
      /**
       * 工具调用结果：
       *  {"message":"\n","pinter":"printer"}
       * index.ts:101工具调用：
       *  {"type":"tool-call","toolCallId":"call_vQUj6eF0r1VCu86j4F7bPzEy","toolName":"printer","args":{"message":"\n"}}
       */
        // const toolCalls = await result.toolCalls;
        // console.log('toolCalls', toolCalls);
        // for (const toolCall of toolCalls) {
        //     switch (toolCall.toolName) {
        //         case 'calculateInputLength': {
        //             console.log('工具调用：', toolCall.args.input, JSON.stringify(toolCall)); // string
        //             break;
        //         }
        //     }
        // }
        //
        // const toolResults = await result.toolResults;
        // console.log('toolResults', toolResults);
        // for (const toolResult of toolResults) {
        //     switch (toolResult.toolName) {
        //         case 'calculateInputLength': {
        //             console.log('工具调用结果：', toolResult.args.input, JSON.stringify(toolResult.result)); // string
        //             break;
        //         }
        //     }
        // }
      const content = await chatService.writeStream(res, result, { conversationId });

      if (content) {
        await prisma.chatMessage.createMany({
          data: [
            {
              conversationId,
              content: prompt,
            },
            {
              conversationId,
              content,
              role: "assistant",
            },
          ],
        });
      }


      res.end();

    } catch (e) {
      console.error("Error in /stream endpoint:", e);
      res.status(500).send("Internal Server Error");
    }
  });
export default ChatController;