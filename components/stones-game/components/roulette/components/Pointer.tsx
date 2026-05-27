import { motion } from "motion/react";
import arrowDown from "../../../assets/Roulette/arrow-down.svg";

type PointerProps = {
  isSpinning: boolean;
};

export const Pointer = ({ isSpinning }: PointerProps) => (
  <motion.div
    className="pointer-events-none absolute left-1/2 bottom-[8%] z-30 -translate-x-1/2"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.6 }}
  >
    <motion.div
      animate={{
        y: isSpinning ? [0, -4, 2, 0] : 0,
        rotate: 180,
      }}
    >
      <motion.img
        src={arrowDown.src}
        alt="pointer"
        className="drop-shadow-[0_10px_30px_rgba(59,130,246,0.45)]"
        style={{
          width: "clamp(2rem, 4vw, 4rem)",
          height: "clamp(2rem, 4vw, 4rem)",
        }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </motion.div>
  </motion.div>
);
