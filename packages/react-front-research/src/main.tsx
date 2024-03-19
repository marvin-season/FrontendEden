import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Providers} from "./providers";
import {PostChat} from "@/bean/PostChat.ts";

const params = {
    "inputs": {},
    "query": "hi",
    "model_config": {
        "pre_prompt": "",
        "user_input_form": [],
        "opening_statement": "你好～～啊222",
        "suggested_questions_after_answer": {
            "enabled": true
        },
        "multi_round_conversation_enhancement": {
            "enabled": false
        },
        "more_like_this": {
            "enabled": false
        },
        "agent_mode": {
            "enabled": true,
            "tools": [
                732
            ],
            "rag_function": "MultipleRecall",
            "custom_upload_enabled": true,
            "files_config": {
                "deal_url": false,
                "max_tokens": 500,
                "api_key": "-1",
                "vector_type": "Milvus",
                "api_host": "-1",
                "deal_space": false,
                "model_id": 753,
                "dataset_name": "数据集",
                "embedding_type": "azure",
                "separator": ",",
                "splitter_name": "RecursiveCharacterTextSplitter",
                "chunk_size": 300,
                "output_type": 1,
                "pc_chunk_size": [
                    2048,
                    512,
                    128
                ],
                "pc_chunk_overlap": 50,
                "rag_function": "SentenceWindow",
                "chunk_overlap": 10,
                "chunk_type": "custom",
                "output_task": "请解析出合同基本信息，包含合同甲方、乙方、服务内容、合同价格、责任义务、付款方式、争议解决等关键信息."
            }
        },
        "toolsets": [],
        "model": {
            "model_id": 282,
            "provider": "azure",
            "name": "azure-openai",
            "api_base": "https://coe0118.openai.azure.com/",
            "completion_params": {
                "presence_penalty": 0.2,
                "max_tokens": 512,
                "top_p": 0.85,
                "frequency_penalty": 0.3,
                "temperature": 0.5
            },
            "tenant_id": "449"
        }
    },
    "response_mode": "streaming",
    "conversation_id": "",
    "user_id": "392",
    "app_id": "469"
}

const postChat = new PostChat('/api/apps/complex/chat', params,
    (message) => {
        console.log(message)
    }, () => {

    }).post();
console.log(postChat)

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <Providers>
        <App/>
    </Providers>
    // </React.StrictMode>,
)
