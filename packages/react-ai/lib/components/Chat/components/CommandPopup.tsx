import { FC, ReactNode } from "react";

const CommandPopup: FC<{
  children?: ReactNode;
}> = () => {
  return <>
    <div className={"rounded border p-2 bg-gray-300"}>
      CommandPopup
    </div>
  </>;
};

export default CommandPopup;

