import {FC, useCallback} from "react";
import {Chat, Types, useChat} from "@root/react-ui";
import {Flex, Typography} from "antd";

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
        }, stop: () => {
            console.log("🚀  stop",)
        }
    });

    return <Chat {...chatProps} ChatLayout={ChatLayout}/>;
}

export default ChatPanel;
