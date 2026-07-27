import { useEffect } from "react";
import { createPortal } from "react-dom";

function Portal({ children, open, lockScroll = true }) {
  useEffect(() => {
    if (open && lockScroll) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open, lockScroll]);

  if (!open) return null;
  return createPortal(children, document.body);
}

export default Portal;