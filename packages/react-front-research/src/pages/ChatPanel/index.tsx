import {FC} from "react";
import {Chat, useChat} from "@root/react-ui";
import {PostChat} from "@root/shared";
import moment from "moment";

const params = {
    "inputs": {},
    "query": "hi",
    "files": [],
    "model_config": {
        "pre_prompt": "",
        "user_input_form": [],
        "opening_statement": "",
        "suggested_questions_after_answer": {
            "enabled": false
        },
        "multi_round_conversation_enhancement": {
            "enabled": false
        },
        "more_like_this": {
            "enabled": false
        },
        "agent_mode": {
            "enabled": true,
            "tools": [],
            "toolsets": [],
            "rag_function": "",
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
                "splitter_name": "TableOfContentsTextSplitter"
            }
        },
        "model": {
            "model_id": 282,
            "provider": "azure",
            "name": "azure-openai",
            "api_base": "https://coe0118.openai.azure.com/",
            "completion_params": {
                "presence_penalty": 0.1,
                "max_tokens": 512,
                "top_p": 0.9,
                "frequency_penalty": 0.1,
                "temperature": 0.8
            },
            "tenant_id": "523"
        },
        "sensitive_word_avoidance": {
            "configs": [],
            "type": "",
            "enabled": false
        }
    },
    "response_mode": "streaming",
    "conversation_id": "",
    "user_id": "492",
    "app_id": "924"
}

const postChat = PostChat.getInstance({
    url: ''
});


const transform = () => {

}

console.log("🚀  ", postChat)
const ChatPanel: FC = () => {
    const chatProps = useChat((p, onData) => {
        postChat.send({
            params,
            onData: ({message_id, answer}, isDone, isFirstMessage) => {
                console.log("🚀  ", isDone, isFirstMessage)
                onData({
                    id: message_id,
                    createTime: moment().format('YYYY'),
                    content: answer
                })
            }
        })
        console.log("🚀  ", postChat)
    });

    return <Chat {...chatProps}/>;
}

export default ChatPanel;
