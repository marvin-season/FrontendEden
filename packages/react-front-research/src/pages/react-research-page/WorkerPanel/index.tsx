import React, {useEffect} from "react";

import MyWorker from './myWorker.ts?worker';

const worker = new MyWorker();


const WorkerPanel = () => {

  const executeHeavilyTask = (ms: number) => {
    worker.postMessage({ms});
  }

  useEffect(() => {
    worker.onmessage = function ({data}) {
      console.log('Web Worker:', data);
    };
    worker.onerror = console.error
    return () => worker.terminate()
  }, []);

  return <>
    <button onClick={() => {
      executeHeavilyTask(2000)
    }}>execute
    </button>
    {/*<Task/>*/}
  </>
}

export default WorkerPanel
