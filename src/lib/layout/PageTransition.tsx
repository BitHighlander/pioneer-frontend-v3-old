import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from "react";

export const PageTransition = (props: HTMLMotionProps<"div">) => (
  <motion.div
    initial={{ y: -16, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    {...props}
  />
);
