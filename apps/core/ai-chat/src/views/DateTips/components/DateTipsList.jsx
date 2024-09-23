import {Fragment, useEffect, useMemo, useState} from "react";
import {useDateTipsContext} from "../index.jsx";
import dayjs from "dayjs";

export default function DateTipsList({
                                         onSelect, datetipList, initSelectId
                                     }) {
    const [selectId, setSelectId] = useState();
    const {editingId} = useDateTipsContext();

    useEffect(() => {
        setSelectId(initSelectId);
    }, [initSelectId]);

    return (<>
        {datetipList.map(tip => {
            const selected = selectId === tip.id;
            return <Fragment key={tip.id}>
                {
                    <div
                        className={`cursor-pointer hover:bg-black mb-[10px] transition-all duration-500 flex flex-col p-4 gap-2 bg-white rounded-[9px] ${selected ? 'h-[140px] border border-blue-500' : 'h-[60px]'}`}
                        onClick={() => {
                            if (editingId) {
                                alert('请先保存当前正在编辑的文档');
                                return
                            }
                            onSelect(tip);
                            setSelectId(tip.id)
                        }}
                    >
                        <div className={`flex justify-between`}>
                            <div className={'flex items-end gap-4'}>
                                <div className={'text-amber-600'}>{tip.user?.name || '匿名'}</div>
                                <div className={'text-[14px] text-blue-400'}>{dayjs(tip.createAt).format('YYYY-MM-DD HH:mm:ss')}</div>
                            </div>
                        </div>
                        <div className={'border-b-[1px]'}></div>
                        {
                            selected && <div
                                className={`text-[15px] leading-8 text-gray-500 mt-2  overflow-hidden transition-all duration-1000 text-ellipsis line-clamp-2 ${selected ? 'opacity-100' : 'opacity-0'}`}>
                                {tip.summary}
                            </div>
                        }

                    </div>
                }

            </Fragment>

        })}
    </>)
}