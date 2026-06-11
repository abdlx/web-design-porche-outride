"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis with controlled cinematic scroll physics
    const lenis = new Lenis({
      duration: 1.8,          // Slow, elegant easing duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Cinematic easeOutExpo curve
      wheelMultiplier: 0.7,   // Heavy scroll friction to force slow playback viewing
      touchMultiplier: 1.2,   // Controlled touch responsiveness
      infinite: false,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
