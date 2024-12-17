import { AnimatePresence, motion } from "framer-motion";
import { FC, ReactNode } from "react";

export interface iTweenTransition {
  x?: string | number | (number | string)[];
  y?: string | number | (number | string)[];
  scale?: string | number | (number | string)[];
  opacity?: string | number | (number | string)[];
}

const Reveal: FC<{
  visible: boolean;
  children: ReactNode;
  transition?: iTweenTransition;
}> = ({ visible, transition, children }) => {
  return (
    <AnimatePresence initial={true}>
      {visible && (
        <motion.div
          animate={{
            x: transition?.x,
            y: transition?.y,
            scale: transition?.scale,
            opacity: transition?.opacity,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Reveal;
