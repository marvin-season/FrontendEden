import {FC, useCallback} from "react";
import {Chat, Types, useChat} from "@root/react-ui";
import {PostChat} from "@root/shared";
import {Flex, Typography} from "antd";
import {generateRandomTextWithCallback} from "@/utils/ContentGenerator.ts";

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
                chatList.map((chatItem: Types.ChatItem, index: number) => {
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
        // postChat.send({params: {}, onData});
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
