# Stream

## CustomReadableStream

[代码](./CustomReadableStream.ts)

`CustomReadableStream<T>.constructor(data: T, generator?: (controller: ReadableStreamDefaultController, data: T) => void)`

将data变为可读流，generator为流数据的生成器

**使用方法：**

```ts
const R = new CustomReadableStream<{ content: string, id: string }[]>([
    {
        id: '1',
        content: 'may'
    },
    {
        id: '2',
        content: 'i'
    },
], (controller, data) => {
    for (const value of data) {
        controller.enqueue(value);
    }
})
const reader = R.getReader()
const test = () => reader.read().then(console.log)
```
