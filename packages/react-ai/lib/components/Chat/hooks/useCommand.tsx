import { cloneElement, ReactElement, RefObject, useEffect, useRef } from "react";
import { useEventListener } from "ahooks/es";
import CommandPopup from "../components/CommandPopup.tsx";
import { useInputCursorChar } from "./useInputCursor.ts";
import { createPortal } from "react-dom";


export const useCommandPopup = (ref: RefObject<HTMLElement>) => {

  return {
    open: () => {
      const element = createPortal(<CommandPopup />, document.getElementById("command-portal")!);
      console.log(element);
    },
  };
};

export const useCommand = () => {
  const ref = useRef<HTMLInputElement>(null);

  const commandPopup = useCommandPopup(ref);

  useInputCursorChar<"@" | "#">(ref, ["@"], (char) => {
    commandPopup.open();
  });

  useEffect(() => {
    console.log("useCommand", ref.current);
  }, []);

  return {
    ref,
  };
};