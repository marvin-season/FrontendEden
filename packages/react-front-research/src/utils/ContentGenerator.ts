import {nanoid} from "nanoid";

// 随机生成 1 到 n 之间的数字
function generateRandomNumber(n: number) {
    return Math.floor(Math.random() * n) + 1;
}

export function generateRandomTextWithCallback(
    onTextGenerated: (text?: { id: string; content: string }) => void
) {
    // const count = generateRandomNumber(10);
    const count = 7;
    const id = nanoid();
    let index = 0;

    const t = setInterval(() => {
        if (index < count) {
            const content = generateRandomSentence();
            onTextGenerated({content, id});
            index++;
        } else {
            clearInterval(t);
            onTextGenerated()
        }
    }, 500);

    return t;
}

export function generateRandomSentence(wordsLength = 2) {
    const words = [
        "\n**测试**",
        "RAG **测试**",
        "RAG **测试**",
    ];

    // 随机生成句子长度
    const sentenceLength = generateRandomNumber(wordsLength);

    return Array.from({length: sentenceLength}, () => {
        const randomIndex = generateRandomNumber(words.length - 1);
        return words[randomIndex];
    }).join(", ")
}
