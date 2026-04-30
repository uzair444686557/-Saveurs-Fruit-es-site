import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-hide");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      if (!t) return;
      setHovering(
        !!t.closest('a, button, [data-cursor="hover"], input, textarea, select, summary')
      );
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-hide");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[200] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{
          width: hovering ? 44 : 10,
          height: hovering ? 44 : 10,
          x: hovering ? -22 : -5,
          y: hovering ? -22 : -5,
          backgroundColor: hovering ? "transparent" : "rgb(255,255,255)",
          borderColor: "rgb(255,255,255)",
          borderWidth: hovering ? 1.5 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="rounded-full border-white"
      />
    </motion.div>
  );
}
