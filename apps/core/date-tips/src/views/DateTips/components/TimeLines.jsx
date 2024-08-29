import {useDateTipsContext} from "../index.jsx";
import {Fragment, useState} from "react";
import EditTips from "./EditTips.jsx";

export default function TimeLines() {
    const {editingId, setEditingId, datetipList} = useDateTipsContext();
    console.log(datetipList)
    const [hoveredTipId, setHoveredTipId] = useState(undefined);
    return (<>
        {datetipList.map(tip => {
            const hovered = hoveredTipId === tip.id;
            return <Fragment key={tip.id}>
                {
                    editingId === tip.id ? <div className={'transition-all'}>
                            <EditTips tip={tip} onSave={() => {
                                setEditingId(undefined);
                            }}/>
                        </div>
                        : <div
                            className={`mb-[20px] transition-all duration-500 flex flex-col p-4 gap-2 bg-white rounded-[9px] ${hovered ? 'h-[140px]' : 'h-[60px]'}`}
                            onMouseEnter={() => setHoveredTipId(tip.id)}
                            onMouseLeave={() => setHoveredTipId(undefined)}>
                            <div className={`flex justify-between`}>
                                <div className={'flex gap-4'}>
                                    <div className={''}>{tip.user?.name}</div>
                                    <div className={''}>{tip.createAt}</div>
                                </div>
                                {hovered && (<div>
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
                                hovered && <div
                                    className={`text-[15px] leading-8 text-gray-500 mt-2  overflow-hidden transition-all duration-1000 text-ellipsis line-clamp-2 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
                                    {tip.summary}
                                </div>
                            }

                        </div>
                }

            </Fragment>

        })}
    </>)
}