import {useEffect} from "react";

const AudioPanel = () => {


    useEffect(() => {
        fetch('/api/example/mock').then(res => res.json()).then(console.log)
    }, []);

    return <>


    </>
}
export default AudioPanel
