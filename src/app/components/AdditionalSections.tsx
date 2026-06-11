"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./AdditionalSections.module.css";

export default function AdditionalSections() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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
    <div className={styles.container}>
      {/* 1. Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>518 HP</span>
            <span className={styles.statLabel}>
              HIGH-REVVING NATURALLY ASPIRATED
            </span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>2.7s</span>
            <span className={styles.statLabel}>
              0-60 MPH ACCELERATION
            </span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>860kg</span>
            <span className={styles.statLabel}>
              TOTAL DOWNFORCE AT 205 KM/H
            </span>
          </div>
        </div>
      </section>

      {/* 2. Paradox of Power Section */}
      <section className={styles.storySection}>
        <div className={styles.storyContentGrid}>
          {/* Left Side: Headline */}
          <div className={styles.storyHeader}>
            <h2 className={styles.storyTitle}>
              THE PARADOX <br />
              OF <span className={styles.storyTitleHighlight}>POWER</span>
            </h2>
          </div>

          {/* Right Side: Copy & CTA */}
          <div className={styles.storyTextContainer}>
            <p className={styles.storyParagraph}>
              It exists in the tension between the roar of the flat-six engine
              and the silence of a summer field. To witness the GT3 RS in
              this landscape is to see raw, technical power bowing to the
              organic rhythm of the earth. Every carbon fiber weave, every
              aerodynamic vent is a testament to human ingenuity—crafted
              not to defy nature, but to dance within it.
            </p>
            <p className={styles.storyParagraphSub}>
              We don&apos;t just build machines; we create instruments of precision
              that allow the driver to experience the world at a different
              frequency. This is the art of performance.
            </p>
            <button className={styles.storyCta} aria-label="Read the story">
              <span>READ THE STORY</span>
              <svg
                width="16"
                height="16"
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
            </button>
          </div>
        </div>

        {/* Story Visual Banner */}
        <div className={styles.imageWrapper}>
          <Image
            src="/porsche_gt3rs_field.png"
            alt="Porsche 911 GT3 RS parked in a scenic summer field"
            width={1200}
            height={600}
            className={styles.storyImage}
            priority={false}
          />
          <div className={styles.imageOverlay} />
        </div>
      </section>

      {/* 3. Configure Section Banner */}
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
        <div className={styles.configureContent}>
          <div className={styles.configureTextGroup}>
            <h3 className={styles.bannerSubtitle}>THE ART OF PRECISION.</h3>
            <h3 className={styles.bannerSubtitle}>THE SOUL OF SPEED.</h3>
            <h2 className={styles.bannerMainTitle}>
              DEFINE YOUR LEGACY ON THE TRACK AND THE ROAD.
            </h2>
          </div>
          <button className={styles.configureCta}>
            <span>CONFIGURE YOUR 911</span>
          </button>
        </div>
      </section>

      {/* 4. Footer Section */}
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
                {subscribed ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                )}
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
        </div>
      </footer>
    </div>
  );
}
