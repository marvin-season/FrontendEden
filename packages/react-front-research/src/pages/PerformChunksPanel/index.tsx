import performChunks, {browserScheduler} from "@/utils/performChunk.ts";
import {Button} from "antd";

const count = 200000
const PerformChunksPanel = () => {
    const handle = () => {
        const taskHandler = (i: number) => {
            const element = document.getElementById('chunks-container');
            const htmlDivElement = document.createElement('div');
            htmlDivElement.innerText = String(i)
            element?.appendChild(htmlDivElement)
        }

        performChunks({count, taskHandler, scheduler: browserScheduler});


    }

    return <>
        <Button onClick={handle}>render</Button>
        <div id={'chunks-container'} className={'h-2/3 overflow-y-auto border-slate-200 p-4 border rounded-lg'}></div>
    </>
}


export default PerformChunksPanel
