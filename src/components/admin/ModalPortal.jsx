import { useEffect } from "react";
import { createPortal } from "react-dom";

function ModalPortal({ children, open }) {
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  if (!open) return null;
  return createPortal(children, document.body);
}

export default ModalPortal;