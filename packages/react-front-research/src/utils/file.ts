import {FetchStreamParser} from "@/bean/FetchStreamParser.ts";
import {sleep} from "@root/shared";

export function readLines(filePath: string, callback: (data: any) => void) {
    const fetchStreamParser = new FetchStreamParser();
    // 此处无法直接使用 Node.js 提供的 fs 模块
    // 你需要使用浏览器支持的文件读取方法，例如 FileReader API
    // 这里给出的是一个简单的示例，实际情况需要根据具体需求进行调整
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');

            lines.forEach(async (line, index) => {
                await sleep(20 * index)
                fetchStreamParser.parseLine(line, (data) => {
                    callback(data?.choices[0]?.delta?.content)
                })

            });
        })
        .catch(error => {
            console.error('Error reading file:', error);
        });
}


export const exportFile = (blob: Blob, name: string) => {
    const link = document.createElement('a');

    // Set the href attribute of the link to the Blob object
    link.href = window.URL.createObjectURL(blob);
    // Set the download attribute of the link to specify the filename
    link.download = name;

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger a click event on the link to start the download
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
}
