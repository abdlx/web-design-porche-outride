"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./AdditionalSections.module.css";

export default function AdditionalSections() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // 3D Tilt Hover State
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Subtle 3D perspective tilt (max 7 degrees)
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 7;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 7;

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.025)`,
      transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div id="additional-sections" className={styles.container}>
      {/* 1. Stats Section (Technical Spec Matrix) */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {/* Left Column Spec Header */}
          <div className={styles.statsHeader}>
            <span className={styles.statsSectionNum}>01 / MATRIX</span>
            <h2 className={styles.statsSectionTitle}>
              TECHNICAL <br /> SPECIFICATIONS
            </h2>
            <p className={styles.statsSectionDesc}>
              Engineering benchmarks that define the boundaries of the naturally aspirated flat-six system.
            </p>
          </div>

          {/* Right Column Specs Table */}
          <div className={styles.specContainer}>
            {/* Stat Row 1 */}
            <motion.div
              className={styles.specRow}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.specValue}>518 HP</span>
              <div className={styles.specMeta}>
                <span className={styles.specLabel}>HIGH-REVVING NATURAL</span>
                <span className={styles.specSubLabel}>Maximum power output at 9,000 rpm</span>
              </div>
            </motion.div>

            {/* Stat Row 2 */}
            <motion.div
              className={styles.specRow}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.specValue}>2.7s</span>
              <div className={styles.specMeta}>
                <span className={styles.specLabel}>0-60 MPH LAUNCH</span>
                <span className={styles.specSubLabel}>Instantaneous PDK dual-clutch action</span>
              </div>
            </motion.div>

            {/* Stat Row 3 */}
            <motion.div
              className={styles.specRow}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.specValue}>860kg</span>
              <div className={styles.specMeta}>
                <span className={styles.specLabel}>TOTAL DOWNFORCE</span>
                <span className={styles.specSubLabel}>Active wing-drag reduction at 285 km/h</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Paradox of Power Section (Editorial Essay) */}
      <section className={styles.storySection}>
        <div className={styles.storyLayout}>
          {/* Left Column: Sticky Title */}
          <div className={styles.storyStickyCol}>
            <span className={styles.storySectionNum}>02 / NARRATIVE</span>
            <h2 className={styles.storyTitle}>
              THE PARADOX <span className={styles.storyTitleHighlight}>of power</span>
            </h2>
          </div>

          {/* Right Column: Editorial Essay */}
          <div className={styles.storyEssayCol}>
            <motion.blockquote
              className={styles.essayQuote}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              &ldquo;It exists in the tension between the roar of the flat-six engine and the silence of a summer field.&rdquo;
            </motion.blockquote>

            <div className={styles.essayBody}>
              <motion.p
                className={`${styles.essayParagraph} ${styles.dropcap}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                To witness the GT3 RS in this landscape is to see raw, technical power bowing to the organic rhythm of the earth. Every carbon fiber weave, every aerodynamic vent is a testament to human ingenuity—crafted not to defy nature, but to dance within it.
              </motion.p>

              <motion.p
                className={styles.essayParagraphSub}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                We don&apos;t just build machines; we create instruments of precision that allow the driver to experience the world at a different frequency. This is the art of performance.
              </motion.p>

              <motion.button
                className={styles.storyCta}
                aria-label="Read the story"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span>Read the story</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.storyCtaArrow}
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </motion.button>
            </div>

            {/* Visual Frame */}
            <div className={styles.imageContainer}>
              <motion.div
                className={styles.imageWrapper}
                style={tiltStyle}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src="/porsche_gt3rs_field.png"
                  alt="Porsche 911 GT3 RS parked in a scenic summer field"
                  width={1200}
                  height={600}
                  className={styles.storyImage}
                  priority={false}
                />
              </motion.div>
              <span className={styles.imageCaption}>
                Fig. 04 — The 911 GT3 RS engaged in the surreal rhythms of Apex & Bloom.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Configure Section Banner (Ambient Showcase) */}
      <section className={styles.configureSection}>
        <Image
          src="/porsche_detail.png"
          alt="Porsche carbon fiber aerodynamic details background"
          fill
          sizes="100vw"
          className={styles.configureBg}
          priority={false}
        />
        <div className={styles.configureOverlay} />

        <motion.div
          className={styles.configureContent}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.configureTextGroup}>
            <span className={styles.bannerSubtitle}>03 / INDIVIDUALIZATION</span>
            <h2 className={styles.bannerMainTitle}>
              THE ART OF PRECISION.<br />
              THE SOUL OF SPEED.<br />
              DEFINE YOUR LEGACY.
            </h2>
          </div>
          <button className={styles.configureCta}>
            <span>Configure your 911</span>
          </button>
        </motion.div>
      </section>

      {/* 4. Footer Section (Corporate Matrix) */}
      <footer className={styles.footer}>
        <div className={styles.footerMainGrid}>
          {/* Column 1: Brand Info */}
          <div className={styles.footerBrandCol}>
            <h4 className={styles.brandTitle}>APEX & BLOOM</h4>
            <p className={styles.brandText}>
              Pushing the boundaries of automotive engineering and aesthetic
              expression since inception. Join our community of connoisseurs.
            </p>
          </div>

          {/* Column 2: Models */}
          <div className={styles.footerNavCol}>
            <h5 className={styles.colTitle}>MODELS</h5>
            <ul className={styles.footerList}>
              <li>
                <a href="#">911 GT3 RS</a>
              </li>
              <li>
                <a href="#">718 GT4 RS</a>
              </li>
              <li>
                <a href="#">Turbo S</a>
              </li>
              <li>
                <a href="#">Custom Build</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Experience */}
          <div className={styles.footerNavCol}>
            <h5 className={styles.colTitle}>EXPERIENCE</h5>
            <ul className={styles.footerList}>
              <li>
                <a href="#">Track Days</a>
              </li>
              <li>
                <a href="#">Driving School</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect (Subscription) */}
          <div className={styles.footerConnectCol}>
            <h5 className={styles.colTitle}>CONNECT</h5>
            <p className={styles.subscribeText}>
              Subscribe for the latest updates in engineering and design.
            </p>
            <form onSubmit={handleSubscribe} className={styles.subscribeForm}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className={styles.subscribeInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
              />
              <button
                type="submit"
                className={`${styles.subscribeButton} ${
                  subscribed ? styles.success : ""
                }`}
                aria-label="Subscribe"
              >
                {subscribed ? "Subscribed" : "Join"}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            © 2026 APEX & BLOOM PERFORMANCE. ALL RIGHTS RESERVED
          </div>
          <div className={styles.legalLinks}>
            <a href="#">PRIVACY</a>
            <a href="#">TERMS</a>
            <a href="#">COOKIES</a>
          </div>
          <div className={styles.footerMeta}>
            <div className={styles.metaItem}>
              <span>48.7758° N, 9.1829° E</span>
            </div>
            <div className={styles.metaItem}>
              <span>STUTTGART, DE / UTC +1</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
