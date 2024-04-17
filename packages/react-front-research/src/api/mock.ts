import {MockRequestType} from "@/type";

export const exampleApi = async (params: MockRequestType): Promise<ResponseType> => {
    console.log('params', params);
    const res = await fetch('/api/example/mock');
    return await res.json();
}
