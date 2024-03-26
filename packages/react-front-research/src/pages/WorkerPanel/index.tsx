import React, {useEffect} from "react";

import MyWorker from './myWorker.ts?worker';
import {Task} from "@/components/task";

const worker = new MyWorker();


export const WorkerPanel = () => {

    const handlePause = (ms: number) => {
        worker.postMessage({
            ms
        });
    }

    useEffect(() => {
        worker.onmessage = function ({data}) {
            console.log('Web Worker:', data);
        };
        worker.onerror = console.error
        return () => worker.terminate()
    }, []);

    return <>
        <div onClick={() => {
            handlePause(3000)
        }}>pause
        </div>
        {/*<Task/>*/}
    </>
}
