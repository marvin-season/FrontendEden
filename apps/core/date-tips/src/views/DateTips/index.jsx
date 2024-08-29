import DateTipsList from "./components/DateTipsList.jsx";
import EditTips from "./components/EditTips.jsx";
import {createContext, useContext, useEffect, useState} from "react";
import styles from './style.module.css'
import {request} from "@marvin/shared";

const DateTipsContext = createContext({
    editingId: undefined,
    datetipList: [],
    handle: {
        handleSave: null
    }
});

export const useDateTipsContext = () => {
    return useContext(DateTipsContext)
}

export default function DateTips() {

    const [editingId, setEditingId] = useState(undefined)
    const [datetipList, setDatetipList] = useState([]);

    const handleDetail = ({id}) => {
        request({
            url: `/api/datetip/${id}`
        }).then(console.log)
    }

    const handleSave = async (content) => {
        const response = await request({
            url: '/api/datetip/marvin?a=1&b=2',
            data: {content, summary: content.slice(0, 10)},
            config: {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

        });
        console.log(response)

    }

    useEffect(() => {
        request({
            url: '/api/datetip'
        }).then(res => setDatetipList(res.data))
    }, []);

    return <>
        <div className={`${styles.dateTipsBg}`}>
            <DateTipsContext.Provider value={{
                datetipList, editingId, setEditingId, handle: {
                    handleSave
                }
            }}>
                <div className={'w-[400px] p-[20px]'}>
                    {!editingId && <EditTips/>}
                    <DateTipsList onSelect={handleDetail}/>
                </div>

            </DateTipsContext.Provider>
        </div>
    </>
}