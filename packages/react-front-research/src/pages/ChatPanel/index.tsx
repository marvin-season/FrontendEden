import React, {FC, useCallback} from "react";
import {Chat, useChat} from "@root/react-ui";
import {PostChat} from "@root/shared";
import {Flex, Typography} from "antd";
import {generateRandomTextWithCallback} from "@/utils/ContentGenerator.ts";

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


const ChatPanel: FC = () => {

    const ChatLayout: FC<any> = useCallback(({chatList, QuestionLayout, AnswerLayout}) => {
        return <div>
            <Flex style={{position: "sticky"}}>
                <Typography>这是一个自定义布局</Typography>
            </Flex>
            {
                chatList.map((chatItem, index) => {
                    return <div key={index}>
                        {
                            QuestionLayout && <QuestionLayout questions={chatItem.questions}/>
                        }
                        {
                            AnswerLayout && <AnswerLayout answers={chatItem.answers} onReload={chatProps.onReload}/>
                        }
                    </div>
                })
            }
        </div>
    }, [])

    const chatProps = useChat((p, onData) => {
        generateRandomTextWithCallback(({id, content}) => {
            onData({
                id: id,
                content,
                createTime: ''
            })
        })

    });

    return <Chat {...chatProps} ChatLayout={ChatLayout}/>;
}

export default ChatPanel;
