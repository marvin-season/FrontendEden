import {useEffect, useRef, useState} from "react";

export const Task = () => {
    const [value, setValue] = useState<string>('')
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const timer = setInterval(() => {
            setValue(prevState => prevState + '哈')
        }, 10)
        return () => {
            timer && clearInterval(timer)
        }
    }, []);

    useEffect(() => {
        const current = containerRef.current;
        if (current && current.scrollHeight > current.clientHeight) {
            current.scrollTop = current.scrollHeight;

        }
    }, [value]);

    return <div ref={containerRef} style={{height: '100px', overflow: "auto"}}>
        <h5>value:</h5>
        {
            value
        }
    </div>
}
