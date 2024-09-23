import React, {useState} from "react";
import {Delete} from "@icon-park/react";

export const EvalPanel = ({
                              state: {
                                  enableEval, setEnableEval, response, setResponse, approach, setApproach
                              }
                          }) => {

    const handleChange = (event) => {
        setApproach(event.target.value);
    };

    const [code, setCode] = useState(`
        return fetch("/marvin/api/chat/stream", {
        method: "POST",
        body: JSON.stringify({
          "prompt": "hi",
          "conversationId": "conversation-1726303749057",
          "toolIds": [1]
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  `);

    return <>
        <div className={"p-2 flex items-center gap-2"}>
            <input type={"checkbox"} checked={enableEval} onChange={e => {
                setEnableEval(e.target.checked);
            }}/>
            <span>开启测试</span>
            <Delete theme={"outline"} fill={"#fff"} onClick={() => {
                setResponse(null);
            }}/>

        </div>

        {response ? <div className={"p-2"}>可读流已就绪</div> :
            <div className={"p-2 text-blue-600"}>暂无可读流，请先生成流对象</div>}

        {enableEval && <div className={"flex gap-2"}>
            <input
                type="radio"
                id="default"
                name="approach"
                value="default"
                onChange={handleChange}
                checked={approach === "default"}
            />

            <label htmlFor="default">默认</label>
            <input
                type="radio"
                id="wx"
                name="approach"
                value="wx"
                onChange={handleChange}
                checked={approach === "wx"}
            />
            <label htmlFor="wx">wx</label>
            <input
                type="radio"
                id="custom"
                name="approach"
                value="custom"
                onChange={handleChange}
                checked={approach === "custom"}
            />
            <label htmlFor="custom">自定义获取流对象</label>
        </div>
        }

        {
            enableEval && approach === "custom" && <>
                <textarea className={"rounded-xl bg-gray-500 flex-grow w-full"}
                          value={code} onChange={e => {
                    setCode(e.target.value);
                }}></textarea>
                <div className={"cursor-pointer m-2"} onClick={async () => {
                    try {
                        const res = await new Function(code)();
                        setResponse(res)
                    } catch (e) {
                    }
                }}>获取流数据
                </div>
            </>
        }
    </>
};