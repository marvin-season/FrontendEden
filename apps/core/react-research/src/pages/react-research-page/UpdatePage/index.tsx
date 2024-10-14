import { useEffect, useState } from "react";
import { sleep } from "@marvin/shared";

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
          await sleep(0);
          console.log(word);
          container.innerText += " " + word;
        }
      }
    })();
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