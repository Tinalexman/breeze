import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

import { AnimatePresence, motion } from "framer-motion";

const Modal: FC<{
  visible: boolean;
  onClose: () => void;
  width?: string;
  height?: string;
  closeOnClickOutside?: boolean;
  children?: ReactNode;
}> = ({ visible, onClose, width, height, closeOnClickOutside, children }) => {
  return ReactDOM.createPortal(
    <AnimatePresence initial={true}>
      {visible && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.15,
            ease: "easeOut",
          }}
          exit={{
            opacity: 0,
          }}
          onClick={() => {
            if (closeOnClickOutside !== undefined && !closeOnClickOutside)
              return;
            onClose();
          }}
          className={`w-full h-[100vh] bg-overlay fixed top-0 left-0 grid place-content-center`}
          style={{
            backdropFilter: "blur(2px)",
          }}
        >
          <motion.div
            initial={{
              y: "25%",
            }}
            animate={{
              y: "0%",
            }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
            exit={{
              y: "-25%",
            }}
            className="rounded-lg bg-monokai"
            style={{
              width: width || "50vw",
              height: height || "50vh",
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
