import {useRef} from "react";
import {exportFile} from "@/utils/file.ts";

type ProgressCallback = (receivedLength: number, totalLength: number) => void;
type SuccessCallback = (blob: Blob) => void;
type CancelCallback = () => void;
type ErrorCallback = (e: unknown) => void;

interface DownloadOptions {
    contentType?: string;
    isExport?: boolean;
}

export const useDownload = (
    onProgress: ProgressCallback = () => {
    },
    onSuccess: SuccessCallback = () => {
    },
    onCancel: CancelCallback = () => {
    },
    onError: ErrorCallback = () => {
    }
) => {
    const controller = useRef<AbortController>();

    const download = async (url: string, {contentType, isExport}: DownloadOptions) => {
        controller.current = new AbortController();
        try {
            const res = await fetch(url, {
                signal: controller.current.signal
            });
            // 文件总长度
            const contentLength = res.headers.get('content-length');

            if (!res.body || !contentLength) {
                return
            }
            const reader = res.body.getReader();
            let receivedLength = 0;

            const chunks: Uint8Array[] = [];
            while (true) {
                const {value, done} = await reader.read();
                if (done) {
                    break
                }
                chunks.push(value);
                receivedLength += value.length;
                onProgress(receivedLength, +contentLength)
            }

            const blob = new Blob(chunks, {type: res.headers.get("content-type") || contentType});

            isExport && exportFile(blob, url);
            onSuccess(blob);
        } catch (e) {
            onError(e);
        } finally {
        }

    }

    const cancel = () => {
        if (controller.current) {
            controller.current.abort();
            if (controller.current.signal.aborted) {
                onCancel()
            }
        }
    }

    return {
        download,
        cancel
    }
}
