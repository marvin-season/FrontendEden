import {useEffect} from "react";
import {useRequest} from "@/hook/useRequest.ts";
import {exampleApi} from "@/api/mock.ts";


const AudioPanel = () => {

    const request = useRequest(exampleApi);

    useEffect(() => {
        request.request({
            params: {},
            method: "get"
        }).then((res) => {
            console.log(res)
        })

        return () => {
            request.cancel();
        }
    }, []);

    return <>


    </>
}
export default AudioPanel
