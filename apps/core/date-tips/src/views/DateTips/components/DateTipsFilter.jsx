import {useState} from "react";

export default function DateTipsFilter() {
    const [input, setInput] = useState('');
    const [dateRange, setDateRange] = useState([])

    return <>
        <input className={'border p-2'} type="text" value={input} onChange={
            e => setInput(e.target.value)
        }/>
        <input className={'border p-2'} type="date" value={dateRange[0]} onChange={
            e => setDateRange([e.target.value, dateRange[1]])
        }/>
    </>
}