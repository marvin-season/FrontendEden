import {useEffect} from "react";

export const useCancelRequest = (apiFunc: Function) => {

    useEffect(() => {
        apiFunc.call(null, )
    }, []);
}
