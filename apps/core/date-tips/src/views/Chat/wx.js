import { SSEMessageGenerator } from "@marvin/react-ai";

export const chatWX = async (query) => {
  const response = await fetch("/api/apps/chat", {
    "headers": {
      "accept": "*/*",
      "accept-language": "zh,en;q=0.9,zh-CN;q=0.8,ja;q=0.7",
      "authorization": "Bearer ",
      "content-type": "application/json",
      "tenant-id": "523",
    },
    "body": `{"inputs":{},"query":"${query}","files":[],"model_config":{"pre_prompt":"","user_input_form":[],"opening_statement":"","suggested_questions_after_answer":{"enabled":false},"multi_round_conversation_enhancement":{"enabled":true},"more_like_this":{"enabled":false},"agent_mode":{"enabled":true,"tools":[],"toolsets":[{"tenant_id":"523","id":47,"provider_type":"builtin","tool_parameters":null}],"rag_function":"","top_k":4,"custom_upload_enabled":false,"files_config":{"deal_url":false,"max_tokens":500,"api_key":"-1","vector_type":"Milvus","api_host":"-1","deal_space":false,"model_id":-1,"dataset_name":"数据集","embedding_type":"economy","separator":",","splitter_name":"TableOfContentsTextSplitter"},"workflows":[]},"model":{"model_id":1113,"provider":"azure","name":"gpt-4o","model_key":"gpt-4o","api_base":null,"completion_params":{"presence_penalty":0.1,"max_tokens":512,"top_p":0.9,"frequency_penalty":0.1,"temperature":0.8},"tenant_id":1},"sensitive_word_avoidance":{"configs":[],"type":"","enabled":false}},"response_mode":"streaming","conversation_id":"","user_id":"492","app_id":"828","referenced_query":"","task_id":"2AVDhc_XRQ_0dpBxOqIiG"}`,
    "method": "POST",
    "mode": "cors",
  });

  const iter = SSEMessageGenerator(response);
  const id = Date.now();
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      (async () => {
        try {
          let c = `data: ${JSON.stringify({
            event: "conversation-start", content: "", id, conversationId: id,
          })}\n\n`;
          controller.enqueue(encoder.encode(c));
          for await (const iterElement of iter) {
            let c = `data: ${JSON.stringify({
              event: "message", content: iterElement?.answer || '', id, conversationId: id,
            })}\n\n`;
            controller.enqueue(encoder.encode(c));
          }
          c = `data: ${JSON.stringify({
            event: "conversation-end", content: "", id, conversationId: id,
          })}\n\n`;
          controller.enqueue(encoder.encode(c));
          controller.close();

        } catch (e) {
          console.log(e);
        }
      })();

    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream" },
  });
};


