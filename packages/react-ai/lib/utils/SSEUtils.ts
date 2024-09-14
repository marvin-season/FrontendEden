export const textDecoder = new TextDecoder();

export async function* SSEMessageGenerator<T>(response: Response) {
    if (!response?.body) {
        return
    }

    // @ts-ignore
    for await (const chunk of response.body) {
        const sse_chunk = textDecoder.decode(chunk)
        let rest_str = ""
        // 使用for...of替代forEach，确保yield在生成器体内
        for (const line of sse_chunk.split(/\n+/)) {
            const json_str = line.replace(/data:\s*/, '').trim();
            if(json_str.length > 0) {
                try {
                    const message = JSON.parse(rest_str + json_str);
                    rest_str = "";
                    yield message as T; // 在生成器内yield消息
                } catch (e) {
                    rest_str += json_str
                    console.log("e => ", { e, rest_str });
                }
            }

        }

    }
}

