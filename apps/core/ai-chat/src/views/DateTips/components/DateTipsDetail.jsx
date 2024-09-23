import {useDateTipsContext} from "../index.jsx";

export default function DateTipsDetail({
                                           data,
                                           onDelete
                                       }) {
    const {setEditingId} = useDateTipsContext()
    return <>
        <div className={'flex flex-col gap-4 bg-white p-4'}>
            <div>
                <button className={'text-green-500 rounded text-[15px] mr-2'} onClick={() => {
                    setEditingId(data.id)
                }}>
                    {'编辑'}
                </button>
                <button className={'text-red-500 rounded text-[15px]'} onClick={() => {
                    confirm('确定删除吗？') && onDelete(data)
                }}>
                    {'删除'}
                </button>
            </div>
            <div className={'text-[15px] leading-8 text-gray-500'}>
                {data?.content}
            </div>
        </div>

    </>
}