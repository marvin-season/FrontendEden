export interface RequestType {
    params: any,
}

export interface ResponseType {
    data: any,
    success: boolean
}


export interface MockRequestType extends RequestType {
    method: "get" | "post"
}

