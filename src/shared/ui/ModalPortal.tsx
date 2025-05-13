import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps {
  children: ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  const root = document.getElementById("modal-root") as HTMLElement;

  if (!root) return null;

  return createPortal(children, root);
};

export default ModalPortal;
