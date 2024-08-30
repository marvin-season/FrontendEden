import {Fragment, useMemo, useState} from "react";
import {useDateTipsContext} from "../index.jsx";

export default function DateTipsList({
                                         onSelect, datetipList
                                     }) {
    const [selectId, setSelectId] = useState(undefined);
    const {editingId} = useDateTipsContext();

    return (<>
        {datetipList.map(tip => {
            const selected = selectId === tip.id;
            return <Fragment key={tip.id}>
                {
                    <div
                        className={`mb-[10px] transition-all duration-500 flex flex-col p-4 gap-2 bg-white rounded-[9px] ${selected ? 'h-[140px] border border-blue-500' : 'h-[60px]'}`}
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
                            <div className={'flex gap-4'}>
                                <div className={'text-amber-600'}>{tip.user?.name || '匿名'}</div>
                                <div className={'text-gray-600'}>{tip.createAt}</div>
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