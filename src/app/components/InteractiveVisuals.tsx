"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./InteractiveVisuals.module.css";

export default function InteractiveVisuals() {
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse Coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for high fidelity physical inertia follow
  const cursorX = useSpring(mouseX, { damping: 35, stiffness: 300 });
  const cursorY = useSpring(mouseY, { damping: 35, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset cursor center
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Hover listener to morph custom cursor shapes based on elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isInteractive = target.closest("a, button, input, [role='button']");
      const isImage = target.closest("img, [class*='imageWrapper']");

      if (isInteractive) {
        setIsHovered(true);
        setCursorText("");
      } else if (isImage) {
        setIsHovered(true);
        setCursorText("VIEW");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  // Generate background surreal dust particles
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // width percentage
      y: Math.random() * 100, // height percentage
      size: Math.random() * 6 + 4, // size (4px to 10px)
      delay: Math.random() * 4,
      duration: Math.random() * 12 + 15, // float speeds
    }));
    setParticles(generated);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Physical Follower Cursor */}
      <motion.div
        className={`${styles.customCursor} ${isHovered ? styles.hovered : ""} ${cursorText ? styles.hasText : ""}`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        {cursorText && <span className={styles.cursorText}>{cursorText}</span>}
      </motion.div>

      {/* Floating Surreal Light Dust */}
      <div className={styles.dustContainer}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className={styles.dustParticle}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [-30, 30],
              x: [-15, 15],
              opacity: [0, 0.45, 0],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </>
  );
}
