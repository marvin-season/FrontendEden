import {useState} from "react";
import {Day, DayPicker} from "react-day-picker";
import {isSameDay} from "date-fns";

export default function DateTipsFilter() {
    const [input, setInput] = useState('');
    const [selected, setSelected] = useState([])
    const handleDayClick = (day, modifiers) => {
        console.log({day, modifiers})
        const newValue = [...selected];
        if (modifiers.selected) {
            const index = selected.findIndex((d) => isSameDay(day, d));
            newValue.splice(index, 1);
        } else {
            newValue.push(day);
        }
        setSelected(newValue);
    };
    return <>
        <input className={'border p-2'} type="text" value={input} onChange={
            e => setInput(e.target.value)
        }/>

        <DayPicker
            onDayClick={handleDayClick}
            modifiers={{selected}}
            mode="multiple"
            components={{
                // Day: Day
                Day(props) {
                    return <>
                        <Day {...props} className={`${props.modifiers.selected ? 'bg-blue-300' : ''} w-[40px] hover:bg-blue-300`}/>
                    </>
                }
            }}
        />
    </>
}