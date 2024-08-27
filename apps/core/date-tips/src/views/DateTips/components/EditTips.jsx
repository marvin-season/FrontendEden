import {useState} from "react";

export default function EditTips({tip = {content: ''}, onSave}) {

    const [content, setContent] = useState(tip.content);

    return (<>
        <div className={'w-[600px] flex flex-col items-end gap-2'}>
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                className={'border w-full rounded-[6px] px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-500'}
                placeholder={'说点儿什么吧 ... ...'}/>
            <button className={'text-green-500 rounded text-[15px]'} onClick={() => {
                onSave(content);
                setContent(tip.content);
            }}>
                {'保存'}
            </button>
        </div>

    </>)
}