"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>("");
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Direct DOM refs for high-performance style scrubbing
  const headerRef = useRef<HTMLElement>(null);
  const mainContentRef = useRef<HTMLElement>(null);
  const footerLeftRef = useRef<HTMLDivElement>(null);
  const footerRightRef = useRef<HTMLDivElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);

  // Preload video as a blob to make scroll scrubbing zero-latency
  useEffect(() => {
    let active = true;
    fetch("/hero_scrub.mp4")
      .then((res) => res.blob())
      .then((blob) => {
        if (!active) return;
        const blobUrl = URL.createObjectURL(blob);
        setVideoSrc(blobUrl);
      })
      .catch((err) => {
        console.error("Failed to fetch video blob, fallback to direct path", err);
        if (active) setVideoSrc("/hero_scrub.mp4");
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const video = videoRef.current;
    const sticky = stickyRef.current;
    if (!scrollContainer || !video || !sticky) return;

    // Configure video for scrubbing
    video.pause();

    let targetProgress = 0;
    let currentProgress = 0;
    let animationFrameId: number;

    const handleScroll = () => {
      const rect = scrollContainer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableHeight = rect.height - viewportHeight;
      
      if (scrollableHeight <= 0) return;
      
      const scrolled = -rect.top;
      const rawProgress = scrolled / scrollableHeight;
      targetProgress = Math.max(0, Math.min(1, rawProgress));
    };

    const handleMetadata = () => {
      handleScroll();
    };

    video.addEventListener("loadedmetadata", handleMetadata);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    // Initial runs
    handleScroll();
    if (video.readyState >= 1) {
      handleScroll();
    }

    // High performance DOM animation and seeking frame loop
    const updateLoop = () => {
      // Lerp coefficient (0.09) for buttery smooth follow behavior
      currentProgress += (targetProgress - currentProgress) * 0.09;
      
      if (Math.abs(targetProgress - currentProgress) < 0.0001) {
        currentProgress = targetProgress;
      }

      // Propagate scroll value to CSS variables if needed
      sticky.style.setProperty("--scroll-progress", currentProgress.toFixed(4));

      // 1. Direct DOM styling for Header
      const header = headerRef.current;
      if (header) {
        const transY = currentProgress * -200;
        const opacity = Math.max(0, 1 - currentProgress * 4.5);
        header.style.transform = `translateY(${transY}px)`;
        header.style.opacity = opacity.toString();
        header.style.pointerEvents = opacity <= 0.02 ? "none" : "auto";
      }

      // 2. Direct DOM styling for Main Content (Car Drifting Away effect)
      const mainContent = mainContentRef.current;
      if (mainContent) {
        const transX = currentProgress * 140; // Slide to the right
        const transY = currentProgress * -12;  // Slight vertical lift
        const rotate = currentProgress * 12;   // Drifting skid angle
        const scale = 1 - currentProgress * 0.22; // Shrink moving away
        const opacity = Math.max(0, 1 - currentProgress * 3.33); // Fade by 30% scroll
        
        mainContent.style.transform = `translate(${transX}vw, ${transY}vh) rotate(${rotate}deg) scale(${scale})`;
        mainContent.style.opacity = opacity.toString();
        mainContent.style.pointerEvents = opacity <= 0.02 ? "none" : "auto";
      }

      // 3. Direct DOM styling for Footer Left
      const footerLeft = footerLeftRef.current;
      if (footerLeft) {
        const transX = currentProgress * -80;
        const transY = currentProgress * 10;
        const rotate = currentProgress * -6;
        const scale = 1 - currentProgress * 0.18;
        const opacity = Math.max(0, 1 - currentProgress * 3.33);
        
        footerLeft.style.transform = `translate(${transX}vw, ${transY}vh) rotate(${rotate}deg) scale(${scale})`;
        footerLeft.style.opacity = opacity.toString();
        footerLeft.style.pointerEvents = opacity <= 0.02 ? "none" : "auto";
      }

      // 4. Direct DOM styling for Footer Right
      const footerRight = footerRightRef.current;
      if (footerRight) {
        const transX = currentProgress * 80;
        const transY = currentProgress * 10;
        const rotate = currentProgress * 6;
        const scale = 1 - currentProgress * 0.18;
        const opacity = Math.max(0, 1 - currentProgress * 3.33);
        
        footerRight.style.transform = `translate(${transX}vw, ${transY}vh) rotate(${rotate}deg) scale(${scale})`;
        footerRight.style.opacity = opacity.toString();
        footerRight.style.pointerEvents = opacity <= 0.02 ? "none" : "auto";
      }

      // 5. Direct DOM styling for video background parallax (slow upward slide + zoom)
      if (video) {
        const videoTransY = currentProgress * -15; // Slow upward glide
        video.style.transform = `translateY(${videoTransY}vh) scale(1.06)`;
      }

      // 6. Direct DOM styling for video overlay parallax
      const videoOverlay = videoOverlayRef.current;
      if (videoOverlay) {
        const overlayTransY = currentProgress * -15;
        videoOverlay.style.transform = `translateY(${overlayTransY}vh)`;
      }

      // 7. Gated Seeking Queue Control (Decoder-Optimized Scrubbing)
      if (video.duration && !isNaN(video.duration)) {
        const targetTime = currentProgress * video.duration;
        // Check seek gate: do not seek if decoder is busy, and target is noticeably different
        if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.005) {
          video.currentTime = targetTime;
        }
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      video.removeEventListener("loadedmetadata", handleMetadata);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [videoSrc]);

  return (
    <div ref={scrollContainerRef} className={styles.scrollContainer}>
      <div ref={stickyRef} className={styles.heroContainer}>
        {/* Background Video */}
        <video
          ref={videoRef}
          src={videoSrc || "/hero_scrub.mp4"}
          preload="auto"
          muted
          playsInline
          className={styles.videoBackground}
        >
          <source src="/hero_scrub.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Cinematic Vignette Overlay */}
        <div ref={videoOverlayRef} className={styles.videoOverlay} />

        {/* Header / Navigation Bar */}
        <header ref={headerRef} className={styles.header}>
          <div className={styles.navCapsule}>
            {/* Logo */}
            <div className={styles.logoContainer}>
              <svg
                width="130"
                height="35"
                viewBox="0 0 130 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.logoSvg}
              >
                <path
                  d="M8 22 C -2 18, 5 8, 20 8 C 50 8, 85 10, 115 15"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  fill="none"
                />
                <text
                  x="18"
                  y="24"
                  fill="white"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontWeight: 500,
                    fontSize: "21px",
                    letterSpacing: "-0.5px",
                  }}
                >
                  OutRide
                </text>
              </svg>
            </div>

            {/* Navigation Links */}
            <nav className={styles.nav}>
              <a href="#" className={`${styles.navLink} ${styles.active}`}>
                Home
              </a>
              <a href="#" className={styles.navLink}>
                Delivery
              </a>
              <a href="#" className={styles.navLink}>
                About us
              </a>
              <a href="#" className={styles.navLink}>
                Garage
              </a>
            </nav>

            {/* Call to Action Button */}
            <button className={styles.ctaButton}>
              <span>Book your dream</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main ref={mainContentRef} className={styles.mainContent}>
          {/* Title */}
          <h1 className={styles.title}>
            <span className={styles.titleLine1}>Plan your next</span>
            <span className={styles.titleLine2}>
              <span className={styles.serifItalic}>outride</span> with us
            </span>
          </h1>

          {/* Search Bar Capsule */}
          <div
            className={`${styles.searchCapsule} ${
              isSearchFocused ? styles.focused : ""
            }`}
          >
            <input
              type="text"
              placeholder="Search your dream car"
              className={styles.searchInput}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <button className={styles.searchButton} aria-label="Search">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </main>

        {/* Footer Info & Details */}
        <footer className={styles.footer}>
          {/* Left Info */}
          <div ref={footerLeftRef} className={styles.footerLeft}>
            <p>OutRide has a collection</p>
            <p>of +1000 high-end cars</p>
          </div>

          {/* Right Promo Link */}
          <div ref={footerRightRef} className={styles.footerRight}>
            <span className={styles.promoText}>Get first 5 days free</span>
            <button className={styles.arrowButton} aria-label="Learn more">
              <div className={styles.arrowWrapper}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.arrowIcon}
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
