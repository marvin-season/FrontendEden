export const parseSSE = async (response: Promise<Response>, onParse: (message: any) => void) => {

    const stream = await response;
    if (!stream?.body) {
        return
    }
    // @ts-ignore
    for await (const streamElement of stream.body) {
        const jsonV = textDecoder.decode(streamElement)
        try {
            jsonV.split(/\n+/).forEach(line => {
                const message = JSON.parse(line.replace(/data:\s*/, ''))
                onParse(message)
            })

        } catch (e) {
            console.log(e)
        }
    }
}

export const textDecoder = new TextDecoder();
