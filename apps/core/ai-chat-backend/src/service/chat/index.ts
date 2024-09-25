import { Response } from "express";
import { streamText, StreamTextResult } from "ai";
import { ErrorEvent, MessageEvent } from "@/controller/chat-controller/constant";
import { LLMFactory } from "../llm";
import prisma from "@/utils/prisma";

export const chatService = {
  async writeStreamAndDB(res: Response, {
    attachments = [],
    conversationId,
    result,
    prompt,
  }: {
    result: StreamTextResult<Record<string, any>>
    conversationId: string,
    prompt: string,
    attachments: any[]
  }) {
    let content = "";

    try {
      const id = Date.now();
      res.write(`data: ${JSON.stringify({
        event: MessageEvent.conversationStart,
        content: "",
        id,
        conversationId,
      })}\n\n`);
      for await (const chunk of result.textStream) {
        console.log("chunk", chunk);
        content += chunk;
        res.write(`data: ${JSON.stringify({
          event: MessageEvent.message,
          content: chunk,
          id,
          conversationId,
        })}\n\n`);
      }
      res.write(`data: ${JSON.stringify({
        event: MessageEvent.conversationEnd,
        content: "",
        id,
        conversationId,
      })}\n\n`);

    } catch (e) {
      console.log("流式写入异常", e);
      if (e === ErrorEvent.stop) {
        // 消息终止，写入已生成的信息
        console.log("消息生成中断");
      }
    } finally {
      await prisma.chatMessage.createMany({
        data: [
          {
            conversationId,
            content: prompt,
            attachments: JSON.stringify(attachments)
          },
          {
            conversationId,
            content,
            role: "assistant",
          },
        ],
      });
    }
  },

  async streamChat({ prompt, abortSignal }: {
    prompt: string,
    abortSignal?: AbortSignal,
  }) {

    return streamText({
      model: LLMFactory.createAzure(),
      abortSignal,
      messages: [
        {
          role: "assistant",
          content: "你是一个精通世界历史的专家，请使用中文回复我",  // you are so clever, answer me with english
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
  },
};
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