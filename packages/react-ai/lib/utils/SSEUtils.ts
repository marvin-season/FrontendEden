export const parseSSE = async (response: Response, onParse: (message: any) => void) => {

    if (!response?.body) {
        return
    }
    // @ts-ignore
    for await (const chunk of response.body) {
        const sse_chunk = textDecoder.decode(chunk)
        try {
            sse_chunk.split(/\n+/).forEach(line => {
                const json_obj = line.replace(/data:\s*/, '').trim() // '' or 'data: "{}"'
                if (json_obj.length >= 4) {
                    const message = JSON.parse(json_obj)
                    onParse(message)
                }

            })

        } catch (e) {
            console.log(e)
        }
    }
}

export const textDecoder = new TextDecoder();
