import { useCallback, useRef } from "react";
import { useInputCursorChar } from "./useInputCursor.ts";
import { createRoot, Root } from "react-dom/client";
import { useChatContext } from "@/components/Chat/context/ChatContext.tsx";
import { CommandCharType } from "@/types";

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

export const useCommand = () => {
  const triggerRef = useRef<HTMLInputElement>(null);
  const reactorRef = useRef<HTMLDivElement>(null);

  const { commandElementRender } = useChatContext();

  const closeCommandPopup = useCallback(() => {
    CommandRootManager.clearRoot();
  }, [CommandRootManager]);

  useInputCursorChar<CommandCharType>(
    triggerRef,
    ["@", "#"],
    (char) => {
      const element = commandElementRender?.(char, { onClose: closeCommandPopup });
      CommandRootManager.getRoot(reactorRef.current!)?.render(element);
    },
    (char) => {
      CommandRootManager.clearRoot();
    },
  );

  return {
    triggerRef,
    reactorRef
  };
};