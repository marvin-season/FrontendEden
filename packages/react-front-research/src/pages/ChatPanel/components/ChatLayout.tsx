import {FC, useCallback} from "react";
import {Flex, Typography} from "antd";

const ChatLayout: FC<any> = useCallback(({chatList, QuestionLayout, AnswerLayout}) => {
    return <div>
        <Flex style={{position: "sticky"}}>
            <Typography>这是一个自定义布局</Typography>
        </Flex>
        {
            chatList.map((chatItem: any, index: number) => {
                return <div key={index}>
                    {
                        QuestionLayout && <QuestionLayout questions={chatItem.questions}/>
                    }
                    {
                        AnswerLayout && <AnswerLayout answers={chatItem.answers}/>
                    }
                </div>
            })
        }
    </div>
}, [])
