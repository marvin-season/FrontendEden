import {FC, useCallback} from "react";
import {Chat, Types, useChat} from "@root/react-ui";
import {Flex, Typography} from "antd";
import {getStream} from "@/pages/ChatPanel/mock/readable_mock.ts";

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
            getStream(params.value)
                .pipeThrough(new TransformStream({
                    transform(chunk, controller) {
                        const data = JSON.parse(chunk)
                        controller.enqueue(data)
                    },
                }))
                .pipeTo(new WritableStream({
                    write(chunk) {
                        onData(chunk)
                    },
                }))
                .then(() => {
                    onFinish?.()
                })
        },
        stop: () => {
        }
    });

    return <Chat {...chatProps} ChatLayout={ChatLayout}/>;
}

export default ChatPanel;
