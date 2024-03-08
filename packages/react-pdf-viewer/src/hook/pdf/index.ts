import {useEffect} from "react";

export const useDownLoadFile = (url: string, onData: Function) => {
    console.log('useDownLoadFile')
    useEffect(() => {
        (async () => {
            const response = await fetch(url);
            const blob = await response.blob();
            onData(blob)
        })()
    }, [url]);

}
