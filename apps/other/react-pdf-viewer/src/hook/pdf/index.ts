import {useEffect} from "react";

export const useDownLoadFile = (url: string, onData: Function) => {
    console.log('useDownLoadFile')
    useEffect(() => {
        (async () => {
            console.log('url', url)
            if (!url) return
            const response = await fetch(url);
            const blob = await response.blob();
            onData(blob)
        })()
    }, [url]);

}
