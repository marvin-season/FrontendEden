import {useEffect} from "react";
import {useRequest} from "@/hook/useRequest.ts";
import {exampleApi} from "@/api/mock.ts";


const AudioPanel = () => {

    const request = useRequest(exampleApi);

    useEffect(() => {
        request({
            params: {},
            method: "get"
        }).then((res) => {
            console.log(res)
        })
    }, []);

    return <>


    </>
}
export default AudioPanel
