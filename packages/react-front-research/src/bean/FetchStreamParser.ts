export class FetchStreamParser {
    utf8Decoder = new TextDecoder("utf-8");
    async* readAsGenerator(reader: ReadableStreamDefaultReader<any>) {
        let {value: chunk, done: readerDone} = await reader.read();

        chunk = chunk ? this.utf8Decoder.decode(chunk) : "";

        const newline = /\r?\n/gm;
        let startIndex = 0;
        let result: RegExpExecArray;

        while (true) {
            // @ts-ignore
            result = newline.exec(chunk);
            // 没有换行
            if (!result) {
                if (readerDone) break;

                const remainder = chunk.substring(startIndex);

                ({value: chunk, done: readerDone} = await reader.read());
                chunk = remainder + (chunk ? this.utf8Decoder.decode(chunk) : "");
                startIndex = newline.lastIndex = 0;
                continue;
            }
            yield chunk.substring(startIndex, result.index);
            startIndex = newline.lastIndex;
        }

        if (startIndex < chunk.length) {
            // Last line didn't end in a newline char
            yield chunk.substring(startIndex);
        }
    }

    parseLine(lineStr: string, onParse: (data: any) => void, parser = (str: string) => str.replace(/^data:\s*/, "")) {
        if (!/^data:\s*/.test(lineStr)) {
            console.warn(lineStr, "is not expected line string");
            return;
        }

        try {
            const data = JSON.parse(parser(lineStr)) as any;
            data && onParse(data);
        } catch (e) {
            console.log("序列化失败", e);
        }
    };
}
