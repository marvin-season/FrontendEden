import { ReactNode, useEffect, useRef, useState } from "react";

export const ComplexInput = () => {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [inputs, setInputs] = useState<{ id: string; type: "text" | "element", value: string }[]>([
    {
      id: "1",
      type: "text",
      value: "白发苍苍",
    },
    {
      id: "2",

      type: "element",
      value: "hello",
    },
    {
      id: "3",
      type: "text",
      value: "pretty",
    },
    {
      id: "4",
      type: "element",
      value: "world",
    },
    {
      id: "5",
      type: "text",
      value: "pretty",
    },
    {
      id: "6",
      type: "element",
      value: "world",
    },
    {
      id: "6",
      type: "element",
      value: "world",
    },
  ]);

  console.log("inputs", inputs);

  const remove = (e: any) => {
    if (e.key !== "Backspace") {
      return;
    }
    const selection = window.getSelection() as any;

    const baseNode = selection.baseNode;
    if (selection?.baseOffset === 1) {
      let parentNode = baseNode.parentNode as HTMLSpanElement;
      console.log("parentNode", parentNode);
      if (parentNode === anchorRef.current) {
        e.preventDefault();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0); // 获取当前选区
          if (range.startOffset > 0) {
            // 如果光标不在起始位置
            range.setStart(range.startContainer, range.startOffset - 1); // 将光标位置向前移动一格
            range.setEnd(range.startContainer, range.startOffset); // 同步选区结束位置
            selection.removeAllRanges(); // 清除原有选区
            selection.addRange(range); // 设置新选区
          }
        }
        return;
      }
    }

    if (selection?.baseOffset === 0) {
      let previousElementSibling = (baseNode.parentNode.previousElementSibling as HTMLSpanElement);
      if (baseNode === anchorRef.current) {
        previousElementSibling = (baseNode.previousElementSibling as HTMLSpanElement);
      }
      previousElementSibling.parentNode?.removeChild(previousElementSibling);
      e.preventDefault();
    }
  };

  return <div className={"flex gap-2"}>
    <div ref={inputRef} className={"px-4 py-2 border"} contentEditable={true} onKeyDown={remove}>
      {
        inputs?.map((input, index) => {
          return <>
            {
              input.type === "text" ?
                <span id={input.id} data-id={input.id} data-type={input.type} key={index}>{input.value}</span> :
                <span id={input.id} data-id={input.id} key={index} data-type={input.type} contentEditable={false}
                      className={"bg-blue-300 p-1 rounded mx-1"}>
              <span contentEditable={true}>{input.value}</span>
            </span>
            }
          </>;
        })
      }
      <span id={"anchor"} ref={anchorRef}>&nbsp;</span>
    </div>
    <div onClick={() => {
      let result = "";
      for (const node of inputRef.current!.children as HTMLCollectionOf<HTMLElement>) {
        if (!node.textContent?.trim()) {
          continue;
        }
        const isText = node.dataset.type === "text";
        if (isText) {
          result += node.textContent;
        } else {
          result += ` [${node.textContent}] `;
        }
      }

      alert(result)
    }}>submit
    </div>
  </div>;
};
