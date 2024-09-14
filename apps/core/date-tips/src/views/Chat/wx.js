import { SSEMessageGenerator } from "@marvin/react-ai";

export const chatWX = async (query) => {
  const response = await fetch("/api/apps/chat", {
    "headers": {
      "accept": "*/*",
      "accept-language": "zh,en;q=0.9,zh-CN;q=0.8,ja;q=0.7",
      "authorization": "Bearer",
      "content-type": "application/json",
      "tenant-id": "523",
    },
    body: JSON.stringify({
      "inputs": {},
      "query": query,
      "files": [],
      "model_config": {
        "pre_prompt": "",
        "user_input_form": [],
        "opening_statement": "",
        "suggested_questions_after_answer": {
          "enabled": true,
        },
        "multi_round_conversation_enhancement": {
          "enabled": true,
        },
        "more_like_this": {
          "enabled": false,
        },
        "agent_mode": {
          "enabled": true,
          "tools": [
            901,
            922,
          ],
          "toolsets": [
            {
              "tenant_id": "523",
              "id": 663,
              "provider_type": "api",
              "tool_parameters": null,
            },
            {
              "tenant_id": "523",
              "id": 676,
              "provider_type": "api",
              "tool_parameters": null,
            },
            {
              "tenant_id": "523",
              "id": 43,
              "provider_type": "builtin",
              "tool_parameters": null,
            },
            {
              "tenant_id": "523",
              "id": 44,
              "provider_type": "builtin",
              "tool_parameters": null,
            },
            {
              "tenant_id": "523",
              "id": 45,
              "provider_type": "builtin",
              "tool_parameters": null,
            },
            {
              "tenant_id": "523",
              "id": 47,
              "provider_type": "builtin",
              "tool_parameters": null,
            },
            {
              "tenant_id": "523",
              "id": 48,
              "provider_type": "builtin",
              "tool_parameters": null,
            },
            {
              "tenant_id": "523",
              "id": 49,
              "provider_type": "builtin",
              "tool_parameters": null,
            },
            {
              "tenant_id": "523",
              "id": 65,
              "provider_type": "builtin",
              "tool_parameters": null,
            },
            {
              "tenant_id": "523",
              "id": 70,
              "provider_type": "builtin",
              "tool_parameters": null,
            },
          ],
          "rag_function": "MultipleRecall",
          "top_k": 4,
          "custom_upload_enabled": false,
          "files_config": {
            "deal_url": false,
            "max_tokens": 500,
            "api_key": "-1",
            "vector_type": "Milvus",
            "api_host": "-1",
            "deal_space": false,
            "model_id": -1,
            "dataset_name": "数据集",
            "embedding_type": "economy",
            "separator": ",",
            "splitter_name": "TableOfContentsTextSplitter",
          },
          "workflows": [
            {
              "id": 105,
              "tool_parameters": null,
            },
            {
              "id": 116,
              "tool_parameters": null,
            },
            {
              "id": 177,
              "tool_parameters": null,
            },
            {
              "id": 180,
              "tool_parameters": null,
            },
            {
              "id": 181,
              "tool_parameters": null,
            },
          ],
        },
        "model": {
          "model_id": 282,
          "provider": "azure",
          "name": "微软|Azure-GPT-3.5",
          "model_key": "azure-openai",
          "api_base": "https://coe0118.openai.azure.com/",
          "completion_params": {
            "presence_penalty": 0.1,
            "max_tokens": 512,
            "top_p": 0.9,
            "frequency_penalty": 0.1,
            "temperature": 0.8,
          },
          "tenant_id": 1,
        },
        "sensitive_word_avoidance": {
          "configs": [],
          "type": "",
          "enabled": false,
        },
      },
      "response_mode": "streaming",
      "conversation_id": "b5a45fd9-ee80-49a2-bdb3-ee69d7b55955",
      "user_id": "492",
      "app_id": "1005",
      "referenced_query": "",
      "task_id": "J7us4AGSnKwJOsiQ9PFdt",
    }),
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

            let content = iterElement?.answer || "";
            if (iterElement.event === "agent_thought") {
              content = {
                position: iterElement.position,
                type: "tool-call",
                tool: {
                  tool_labels: iterElement.tool_labels,
                  tool: iterElement.tool,
                  tool_input: iterElement.tool_input,
                  observation: iterElement.observation,
                },
              };
            } else if (iterElement.event === "agent_message") {
              content = {
                position: iterElement.position,
                type: "text",
                text: iterElement.answer,
              };
            }

            const rc = {
              event: 'message', content, type: "multi-modal", id, conversationId: id,
            };
            let c = `data: ${JSON.stringify(rc)}\n\n`;
            console.log("rc => ", rc);
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

