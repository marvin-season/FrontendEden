import { ReactNode, useCallback, useEffect, useMemo, useRef } from "react";
import CommandPopup from "../components/CommandPopup.tsx";
import { useInputCursorChar } from "./useInputCursor.ts";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";


export const useCommand = () => {
  const ref = useRef<HTMLInputElement>(null);

  const target = document.getElementById("command-portal");

  const unmount = useCallback(() => {
    target && createRoot(target).unmount();
  }, [target]);

  const mount = useCallback((reactNode: ReactNode) => {
    console.log("mount", target);

    if (target) {
      const portal = createPortal(reactNode, target);
      createRoot(target).render(portal);
    }

  }, [target]);

  useInputCursorChar<"@" | "#">(
    ref,
    ["@", "#"],
    (char) => {
      mount(<CommandPopup />);
    },
    (char) => {
      unmount();
    },
  );

  return {
    ref,
  };
};