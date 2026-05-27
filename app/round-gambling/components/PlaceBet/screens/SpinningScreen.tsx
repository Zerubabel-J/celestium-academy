"use client";

import { motion } from "motion/react";
import type { FC } from "react";

export const SpinningScreen: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="grow flex flex-col items-center min-h-[290px] sm:min-h-[390px] relative"
    ></motion.div>
  );
};
