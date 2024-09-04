export const parseSSE = async (response: Response, onParse: (message: any) => void) => {

    if (!response?.body) {
        return
    }
    // @ts-ignore
    for await (const streamElement of response.body) {
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
