import {useEffect} from "react";
import {useRequest} from "@/hook/useRequest.ts";
import {ResponseType} from "@/type";


const mockApi = () => fetch('/api/example/mock').then(res => res.json());

const AudioPanel = () => {

    const request = useRequest<ResponseType>(mockApi)

    useEffect(() => {
        request({name: 1}, 23).then((res) => {
            console.log(res)
        })
    }, []);

    return <>


    </>
}
export default AudioPanel
