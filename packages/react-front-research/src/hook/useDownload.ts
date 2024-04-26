export const useDownload = (onProgress: (receivedLength: number, totalLength: number) => void) => {
    // const fetchByUrl = async (url: string) => {
    //
    // }

    const download = async (url: string, {contentType}: { "contentType"?: string }) => {
        const res = await fetch(url);
        // 文件总长度
        const contentLength = res.headers.get('content-length');

        if (!res.body || !contentLength) {
            return
        }
        const reader = res.body.getReader();

        const chunks: Uint8Array[] = [];
        while (true) {
            const {value, done} = await reader.read();
            if (done) {
                break
            }
            chunks.push(value);

            onProgress(value.length, +contentLength)
        }

        const blob = new Blob(chunks, {type: res.headers.get("content-type") || contentType});

        const link = document.createElement('a');

        // Set the href attribute of the link to the Blob object
        link.href = window.URL.createObjectURL(blob);
        // Set the download attribute of the link to specify the filename
        link.download = url.replace(link.href, '');
        console.log(url,link.href, link.download);

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger a click event on the link to start the download
        link.click();

        // Remove the link from the body
        document.body.removeChild(link);
        return blob;

    }

    return {
        download,
    }
}
