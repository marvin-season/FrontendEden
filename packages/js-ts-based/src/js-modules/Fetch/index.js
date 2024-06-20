const result = await fetch('http://127.0.0.1:8080/messages.txt')
const stream = result.body;

const transformStream = stream.pipeThrough(new TransformStream({
    transform(chunk, controller) {
        const params = new TextDecoder().decode(chunk);
        console.log("🚀 chunk\n", params)
        controller.enqueue(params)
    }
}))
const reader = transformStream.getReader()
const rs = await reader.read();

try {
    const parse = JSON.parse(rs.value);
    console.log("🚀  parse\n", parse)

} catch (e) {
    console.log("🚀 error\n", rs.value)
}
