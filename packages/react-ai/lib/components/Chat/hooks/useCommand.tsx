import { ReactNode, useCallback, useMemo, useRef } from "react";
import CommandPopup from "../components/CommandPopup.tsx";
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
  const ref = useRef<HTMLInputElement>(null);
  const { commandElementRender } = useChatContext();
  const target = document.getElementById("command-portal");

  const closeCommandPopup = useCallback(() => {
    CommandRootManager.clearRoot();
  }, [CommandRootManager]);

  useInputCursorChar<CommandCharType>(
    ref,
    ["@", "#"],
    (char) => {
      const element = commandElementRender?.(char, { onClose: closeCommandPopup });
      CommandRootManager.getRoot(target!)?.render(<CommandPopup children={element} />);
    },
    (char) => {
      CommandRootManager.clearRoot();
    },
  );

  return {
    ref,
  };
};