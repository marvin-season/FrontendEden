import React, { FC } from "react";
import { MultiModalContent } from "@/types";

const MultiModalMessageContent: FC<{
  multiContent: MultiModalContent[]
}> = ({ multiContent }) => {
  console.log("multiContent", multiContent);
  if (!Array.isArray(multiContent)) {
    return <>
      expected an array content
    </>;
  }


  return <>
    {
      multiContent.map(({ type, text, image, tool }) => {
        return <>
          {
            type === "text" && <>
              {text}
            </>
          }
          {
            type === "image" && image && <>
              <img src={image} alt={""} />
            </>
          }
          {
            type === "tool-call" && tool && <>
              <div className={"truncate"}>
                {
                  JSON.stringify(tool)
                }
              </div>
            </>
          }
        </>;
      })
    }
  </>;
};

export default MultiModalMessageContent