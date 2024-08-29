import {useState} from "react";

export default function EditTips({tip = {content: ''}, onSave}) {

    const [content, setContent] = useState(tip.content);

    return (<>
        <div className={'flex flex-col items-end gap-2'}>
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                className={'h-[100px] border w-full rounded-[8px] px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-300'}
                placeholder={'说点儿什么吧 ... ...'}/>
            <div>
                <button className={'text-green-500 rounded text-[15px]'} onClick={() => {
                    onSave(content);
                }}>
                    {'保存'}
                </button>
            </div>

        </div>

    </>)
}