import {useEffect, useRef, useState} from "react";

export const Task = () => {
    const [value, setValue] = useState<string>('');
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const callback = () => {
            setValue(prevState => prevState + '哈');
            requestAnimationFrame(callback)
        };
        requestAnimationFrame(callback)
        // const timer = setInterval(() => {
        //     setValue(prevState => prevState + '哈')
        // }, 10)
        // return () => {
        //     timer && clearInterval(timer)
        // }
    }, []);


    return <div ref={containerRef} style={{height: '100px', overflow: "auto"}}>
        <h5>value:</h5>
        {
            value
        }
    </div>
}
