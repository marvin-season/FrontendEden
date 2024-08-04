import {MockRequestType, MockResponseType} from "@/type";

export const useRequest = <P extends MockRequestType, T extends MockResponseType>(apiFunc: (args: P) => Promise<T>) => {
    const request = async (args: P) => {
        try {
            return await apiFunc.call(null, args);
        } catch (e) {
            console.error(e);

        } finally {
        }
    }


    const cancel = () => {
        console.log('cancel', apiFunc.name)
    }

    return {
        request,
        cancel
    }
}
