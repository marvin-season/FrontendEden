import {memo, useMemo, useState} from "react";


const SomeLabel = memo<{ value: number }>(({value}) => {
    console.log('SomeLabel')
    return <h2>SomeLabel:{value}</h2>
})

const ReactResearchPanel = memo(() => {
    const [value, setValue] = useState(0)

    const [age, setAge] = useState(0)

    const AnyLabel = useMemo(() => {
        console.log('AnyLabel')
        return <div>AnyLabel:{value}</div>
    }, [value]);
    return <>
        {AnyLabel}
        <SomeLabel value={value}/>
        <div>value: {value}</div>
        <div>age: {age}</div>
        <button onClick={() => setValue(value + 1)}>change value</button>
        <button onClick={() => setAge(age + 1)}>change age</button>

    </>
})
export default ReactResearchPanel
