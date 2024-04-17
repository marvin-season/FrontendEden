import {RequestType} from "@/type";

export const useRequest = <P extends RequestType, T extends ResponseType>(apiFunc: (args: P) => Promise<T>) => {
    return async (args: P) => {
        try {
            return await apiFunc.call(null, args);
        } catch (e) {
            console.error(e);

        } finally {
        }
    }
}
