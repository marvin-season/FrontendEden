import { useCallback, useRef } from "react";
import { useInputCursorChar } from "./useInputCursor.ts";
import { createRoot, Root } from "react-dom/client";
import { ChatProps, CommandCharType } from "@/types";

const CommandRootManager = {
  root: null as Root | null,
  getRoot(target: HTMLElement) {
    if (!this.root && target) {
      this.root = createRoot(target);
    }
    return this.root;
  },
  clearRoot() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  },
};

export const useCommand = (commandElementRender: ChatProps["commandElementRender"], onCloseCommand: (char: CommandCharType) => void) => {
  const triggerRef = useRef<HTMLInputElement>(null);
  const reactorRef = useRef<HTMLDivElement>(null);

  useInputCursorChar<CommandCharType, HTMLInputElement>(
    triggerRef,
    ["@", "#"],
    (char) => {
      const element = commandElementRender?.(char, {
        onClose: (char) => {
          CommandRootManager.clearRoot();
          onCloseCommand(char);
        },
      });
      CommandRootManager.getRoot(reactorRef.current!)?.render(element);
    },
    (char) => {
      CommandRootManager.clearRoot();
    },
  );

  return {
    triggerRef,
    reactorRef,
  };
};