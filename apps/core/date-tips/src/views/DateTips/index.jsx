import DateTipsList from "./components/DateTipsList.jsx";
import EditTips from "./components/EditTips.jsx";
import {createContext, useContext, useEffect, useMemo, useState} from "react";
import styles from './style.module.css'
import {request} from "@marvin/shared";
import DateTipsDetail from "./components/DateTipsDetail.jsx";

const DateTipsContext = createContext({
    editingId: undefined,
});

export const useDateTipsContext = () => {
    return useContext(DateTipsContext)
}

export default function DateTips() {

    const [editingId, setEditingId] = useState(undefined)
    const [datetipList, setDatetipList] = useState([]);
    const [datetipDetail, setDatetipDetail] = useState(null);

    const fetchList = async () => {
        request({
            url: '/api/datetip'
        }).then(res => setDatetipList(res.data))
    }

    const handleDetail = ({id}) => {
        request({
            url: `/api/datetip/${id}`
        }).then(res => {
            setDatetipDetail(res.data)
        })
    }

    const handleDelete = async ({id}) => {
        request({
            url: `/api/datetip/${id}`,
            config: {
                method: 'delete'
            }
        }).then(res => {
            setEditingId(undefined)
            setDatetipDetail(undefined);
            fetchList()
        })
    }

    const handleSave = async (content) => {
        const res = await request({
            url: '/api/datetip',
            data: {...datetipDetail, content, summary: content.slice(0, 20)},
            config: {
                method: 'post',
            }

        });

        setEditingId(undefined);
        setDatetipDetail(res?.data);
        !datetipDetail?.id && fetchList();
    }

    useEffect(() => {
        fetchList()
    }, []);

    const isActive = useMemo(() => {
        return editingId || datetipDetail
    }, [editingId, datetipDetail]);

    return <>
        <div className={`${styles.dateTipsBg}`}>
            <DateTipsContext.Provider value={{
                editingId, setEditingId
            }}>
                <div
                    className={`flex items-start justify-center gap-4 transition-all`}>
                    <div
                        className={`transition-all duration-500 ${isActive ? 'w-[800px] h-full' : 'w-0 h-0'}`}>
                        {editingId && <EditTips tip={datetipDetail} onSave={handleSave} onCancel={() => {
                            setEditingId(undefined);
                        }}/>}
                        {!editingId && datetipDetail && <DateTipsDetail data={datetipDetail} onDelete={handleDelete}/>}
                    </div>

                    <div
                        className={`w-[500px] flex-shrink-0 transition-all duration-500 `}>
                        <div className={'p-4 mb-6 bg-green-300 text-amber-50 text-xl text-center'} onClick={() => {
                            if (editingId) {
                                alert('请先保存当前正在编辑的文档')
                                return
                            }
                            setEditingId(Date.now())
                            setDatetipDetail(null)
                        }}>发布一篇
                        </div>
                        <DateTipsList datetipList={datetipList} initSelectId={datetipDetail?.id} onSelect={handleDetail}/>
                    </div>
                </div>

            </DateTipsContext.Provider>
        </div>
    </>
}