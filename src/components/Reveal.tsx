"use client";

import { motion } from "framer-motion";

type Direction = "up" | "left" | "right";

const OFFSETS: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  left: { x: -40 },
  right: { x: 40 },
};

// Replaces the theme's WOW.js scroll-reveal animations (wow fadeInUp / fadeInLeft / fadeInRight,
// data-wow-delay) with the modern equivalent agreed in the migration plan.
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  const offset = OFFSETS[direction];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
