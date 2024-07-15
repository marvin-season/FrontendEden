import {useEffect, useState} from "react";

export const Task = () => {
    const [value, setValue] = useState<string>('')

    useEffect(() => {
        const timer = setInterval(() => {
            setValue(prevState => prevState + '哈')
        }, 10)
        return () => {
            timer && clearInterval(timer)
        }
    }, []);

    return <>
        <h5>value:</h5>
        {
            value
        }
    </>
}
