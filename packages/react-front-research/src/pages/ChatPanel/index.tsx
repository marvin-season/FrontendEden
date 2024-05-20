import {FC, useCallback} from "react";
import {Chat, Types, useChat} from "@root/react-ui";
import {StreamReader} from "@root/shared";
import {Flex, Typography} from "antd";
import {IterTransformer} from "@/pages/ChatPanel/IterTransformer.ts";


const ChatPanel: FC = () => {

    const ChatLayout: FC<any> = useCallback(({chatList, QuestionLayout, AnswerLayout}) => {
        return <div>
            <Flex style={{position: "sticky"}}>
                <Typography>这是一个自定义布局</Typography>
            </Flex>
            {
                chatList.map((chatItem: Types.ChatItem, index: number) => {
                    return <div key={index}>
                        {
                            QuestionLayout && <QuestionLayout questions={chatItem.questions}/>
                        }
                        {
                            AnswerLayout && <AnswerLayout answers={chatItem.answers} onAction={chatProps.onAction}/>
                        }
                    </div>
                })
            }
        </div>
    }, [])

    const chatProps = useChat({
        invoke: (params, onData, onFinish) => {
            fetch('/api/', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': '',
                    'Authorization': '',
                }),
                body: JSON.stringify(params),
            }).then(async res => {
                    if (!res.body) {
                        return
                    }
                    const reader = res.body.getReader();
                    const streamReader = new StreamReader<any>(reader);
                    const iterTransformer = new IterTransformer(streamReader)
                    for await (const message of iterTransformer.iter()) {
                        message && onData(message)
                    }
                    onFinish?.()

                }
            )

        }, stop: () => {
            console.log("🚀  stop",)
        }
    });

    return <Chat {...chatProps} ChatLayout={ChatLayout}/>;
}

export default ChatPanel;
