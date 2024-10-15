import { useEffect, useRef, useState } from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const UpdatePage = ({ text }: { text: string }) => {
  const [content, setContent] = useState("");
  const isPreRender = useRef(true);

  const cleanup = () => {
    isPreRender.current = false;

  };

  useEffect(() => {
    if (!isPreRender.current) {
      (async () => {
        for (const word of text.split(" ")) {
          // 如果不 await 这个 Promise,下一次循环不会等待
          await sleep(0).then(() => {
            setContent(prevState => prevState + " " + word);
          });
        }
      })();
    }

    return cleanup;
  }, [text]);


  return <>
    <div className={"text-wrap"}>
      {content}
    </div>
  </>;
};

export default UpdatePage;