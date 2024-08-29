import {useDateTipsContext} from "../index.jsx";
import {Fragment, useMemo, useState} from "react";
import EditTips from "./EditTips.jsx";

export default function DateTipsList({
                                         onSelect
                                     }) {
    const {editingId, setEditingId, datetipList} = useDateTipsContext();

    const [selectId, setSelectId] = useState(undefined);

    return (<>
        {datetipList.map(tip => {
            const selected = selectId === tip.id;
            console.log(selected)
            return <Fragment key={tip.id}>
                {
                    editingId === tip.id ? <div className={'transition-all'}>
                            <EditTips tip={tip} onSave={() => {
                                setEditingId(undefined);
                            }}/>
                        </div>
                        : <div
                            className={`mb-[20px] transition-all duration-500 flex flex-col p-4 gap-2 bg-white rounded-[9px] ${selected ? 'h-[140px] border border-blue-500' : 'h-[60px]'}`}
                            onClick={() => {
                                onSelect(tip);
                                setSelectId(tip.id)
                            }}
                        >
                            <div className={`flex justify-between`}>
                                <div className={'flex gap-4'}>
                                    <div className={'text-amber-600'}>{tip.user?.name || '匿名'}</div>
                                    <div className={'text-gray-600'}>{tip.createAt}</div>
                                </div>
                                {selected && (<div>
                                    <button className={'text-green-500 rounded text-[15px] mr-2'} onClick={() => {
                                        setEditingId(tip.id)
                                    }}>
                                        {'编辑'}
                                    </button>
                                    <button className={'text-red-500 rounded text-[15px]'}>
                                        {'删除'}
                                    </button>
                                </div>)}
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