import DateTipsList from "./components/DateTipsList.jsx";
import EditTips from "./components/EditTips.jsx";
import {createContext, useContext, useEffect, useState} from "react";
import styles from './style.module.css'
import {request} from "@marvin/shared";
import DateTipsDetail from "./components/DateTipsDetail.jsx";

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
            data: {...datetipDetail, content, summary: content.slice(0, 10)},
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

    return <>
        <div className={`${styles.dateTipsBg}`}>
            <DateTipsContext.Provider value={{
                editingId, setEditingId
            }}>
                <div className={''}>
                    {editingId && <EditTips tip={datetipDetail} onSave={handleSave} onCancel={() => {
                        setEditingId(undefined);
                    }}/>}
                    {!editingId && datetipDetail && <DateTipsDetail data={datetipDetail} onDelete={handleDelete}/>}
                    <div className={`w-[500px] p-[20px] flex-shrink-0 transition-all ${editingId || datetipDetail ? ' translate-x-[20px]' : ''}`}>
                        <div className={'p-4 bg-white'} onClick={() => {
                            if (editingId) {
                                alert('请先保存当前正在编辑的文档')
                                return
                            }
                            setEditingId(Date.now())
                        }}>发布一篇
                        </div>
                        <DateTipsList datetipList={datetipList} onSelect={handleDetail}/>
                    </div>
                </div>

            </DateTipsContext.Provider>
        </div>
    </>
}