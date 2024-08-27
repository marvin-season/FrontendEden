import TimeLines from "./components/TimeLines.jsx";
import EditTips from "./components/EditTips.jsx";
import {createContext, useContext, useState} from "react";
import styles from './style.module.css'

const mock = {
    tips: [
        {
            id: 1,
            content: '今天天气不错',
            time: '2021-10-01 12:00:00',
            user: {
                id: 1,
                name: '张三'
            },
            comments: [
                {
                    id: 1,
                    content: '是的',
                    user: {
                        id: 2,
                        name: '李四'
                    }
                }
            ],
        },
        {
            id: 2,
            content: '今天天气不错今天天气不错',
            time: '2021-10-01 12:00:00',
            user: {
                id: 1,
                name: '张三'
            },
            comments: [
                {
                    id: 1,
                    content: '是的',
                    user: {
                        id: 2,
                        name: '李四'
                    }
                }
            ],
        },
        {
            id: 3,
            content: '今天天气不错今天天气不错今天天气不错',
            time: '2021-10-01 12:00:00',
            user: {
                id: 1,
                name: '张三'
            },
            comments: [
                {
                    id: 1,
                    content: '是的',
                    user: {
                        id: 2,
                        name: '李四'
                    }
                }
            ],
        },
        {
            id: 4,
            content: '今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错',
            time: '2021-10-01 12:00:00',
            user: {
                id: 1,
                name: '张三'
            },
            comments: [
                {
                    id: 1,
                    content: '是的',
                    user: {
                        id: 2,
                        name: '李四'
                    }
                }
            ],
        }
    ]
};

const DateTipsContext = createContext({
    editingId: undefined,
    tips: []
});

export const useDateTipsContext = () => {
    return useContext(DateTipsContext)
}

export default function DateTips() {

    const [editingId, setEditingId] = useState(undefined)

    return <>
        <div className={`${styles.dateTipsBg}`}>
            <DateTipsContext.Provider value={{...mock, editingId, setEditingId}}>
                <div className={'w-[400px] p-[20px]'}>
                    {!editingId && <EditTips/>}
                    <TimeLines/>
                </div>

            </DateTipsContext.Provider>
        </div>
    </>
}