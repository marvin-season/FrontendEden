import { ReactNode, useEffect, useState } from "react";

export const ComplexInput = () => {
  const [value, setValue] = useState<ReactNode>();

  useEffect(() => {
    setValue(<span>白发苍苍</span>);
    setValue(prev => <>
      {prev}
      <span className={"bg-blue-300 p-1 rounded"}>
        <span contentEditable>world</span>
      </span>
      <span>{"pretty"}</span>
      <span className={"bg-blue-300 p-1 rounded"} contentEditable={false}>
        <span contentEditable>world</span>
      </span>
    </>);
    setValue(prev => <>{prev}<span className={""}>{" hi"}</span></>);

    return () => {
      setValue(undefined);
    };
  }, []);
  return <>
    <div className={"px-4 py-2 border"} contentEditable={true}>
      {
        value
      }
    </div>
  </>;
};