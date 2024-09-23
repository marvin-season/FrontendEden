import {Request, Response, NextFunction, Send} from "express";

export const responseFormatter = (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;

    // Override the json function
    res.json = function (json) {
        // Modify the response body
        const ModifyJson= {success: true, data: json?.data}
        // @ts-ignore
        originalJson.call(this, ModifyJson);
    } as Send;

    next();
}