import TimeLines from "./components/TimeLines.jsx";
import EditTips from "./components/EditTips.jsx";
import {createContext, useContext, useEffect, useState} from "react";
import styles from './style.module.css'
import {request} from "@marvin/shared";

const DateTipsContext = createContext({
    editingId: undefined,
    datetipList: []
});

export const useDateTipsContext = () => {
    return useContext(DateTipsContext)
}

export default function DateTips() {

    const [editingId, setEditingId] = useState(undefined)
    const [datetipList, setDatetipList] = useState([])
    useEffect(() => {
        request({
            url: '/api/datetip/list'
        }).then(res => setDatetipList(res.data))
    }, []);

    return <>
        <div className={`${styles.dateTipsBg}`}>
            <DateTipsContext.Provider value={{datetipList, editingId, setEditingId}}>
                <div className={'w-[400px] p-[20px]'}>
                    {!editingId && <EditTips/>}
                    <TimeLines/>
                </div>

            </DateTipsContext.Provider>
        </div>
    </>
}