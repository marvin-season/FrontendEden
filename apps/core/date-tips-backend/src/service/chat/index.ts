import { Response } from "express";
import { streamText, StreamTextResult } from "ai";
import { MessageEvent } from "../../controller/chat-controller/constant";
import { LLMFactory } from "../llm";

export const chatService = {
    async writeStream(res: Response, result: StreamTextResult<Record<string, any>>, {
        conversationId,
    }: {
        conversationId: string
    }) {
        try {
            const id = Date.now();
            let content = "";
            res.write(`data: ${JSON.stringify({
                event: MessageEvent.conversationStart,
                content: "",
                id,
                conversationId,
            })}\n\n`);
            for await (const chunk of result.textStream) {
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

            return content;
        } catch (e) {
            console.log(e);
        }
    },

    async streamChat({ prompt }: {
        prompt: string,
    }) {

        return streamText({
            model: LLMFactory.createAzure(),
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