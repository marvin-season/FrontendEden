import {useDateTipsContext} from "../index.jsx";
import {Fragment, useState} from "react";
import EditTips from "./EditTips.jsx";

export default function TimeLines() {
    const {editingId, setEditingId, tips} = useDateTipsContext();
    const [hoveredTipId, setHoveredTipId] = useState(undefined);
    return (<>
        {tips.map(tip => {
            return <Fragment key={tip.id}>
                {
                    editingId === tip.id ? <EditTips tip={tip} onSave={() => {
                        setEditingId(undefined);
                    }}/> : <div className={'flex flex-col gap-2'}
                                                                        onMouseEnter={() => setHoveredTipId(tip.id)}
                                                                        onMouseLeave={() => setHoveredTipId(undefined)}>
                        <div className={'flex gap-2 justify-between'}>
                            <div>
                                <div className={'text-[15px]'}>{tip.user.name}</div>
                                <div className={'text-[15px]'}>{tip.time}</div>
                            </div>
                            {hoveredTipId === tip.id && (<div>
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
                        <div className={'border rounded-[6px] px-4 py-2'}>
                            {tip.content}
                        </div>
                    </div>
                }

            </Fragment>

        })}
    </>)
}