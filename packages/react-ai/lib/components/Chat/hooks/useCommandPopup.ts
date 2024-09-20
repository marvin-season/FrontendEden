import { RefObject, useEffect, useRef } from "react";
import { useEventListener } from "ahooks/es";

const getCurrentChar = (input: HTMLInputElement) => {
  const cursorPosition = input.selectionStart;
  return cursorPosition && input.value[cursorPosition - 1];
};
export const useInputCursorChar = <T extends string>(
  ref: RefObject<HTMLInputElement>,
  chars: T[],
  onTrigger: (char: T) => void) => {

  useEventListener("input", (e) => {
      if (!ref.current) return;
      const char = getCurrentChar(ref.current) as T;
      if (char && chars.includes(char)) {
        onTrigger(char);
      }
    },
  );
};

export const useCommandPopup = () => {
  const ref = useRef<HTMLInputElement>(null);
  useInputCursorChar<"@" | "#">(ref, ["@"], (char) => {
    console.log(char);
  });

  useEffect(() => {
    console.log("useCommandPopup", ref.current);
  }, []);

  return {
    ref,
  };
};