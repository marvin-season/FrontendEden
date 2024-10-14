import { useEffect, useState } from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const text = `
Once upon a time, in a small village nestled in the mountains, there lived a young shepherd named Jack. He spent his days tending to his flock of sheep, wandering through meadows and valleys.
`;
const UpdatePage = () => {
  const [content, setContent] = useState("");
  const [container, setContainer] = useState<HTMLDivElement | null>(null);


  useEffect(() => {
    (async () => {
      if (container) {
        for (const word of text.split(" ")) {
          // await sleep(10)
          // console.log(word);
          // container.innerText += " " + word;
          // 如果不 await 这个 Promise,下一次循环不会等待
          await sleep(10).then(() => {
            console.log(word);
            container.innerText += " " + word;
            setContent(prevState => prevState + " " + word);
          })
        }
      }
    })();

    return () => {
      setContent('')
    }
  }, [container]);

  return <>
    <div ref={setContainer}></div>
    <div className={"text-wrap"}>
      {
        content
      }
    </div>
  </>;
};

export default UpdatePage;