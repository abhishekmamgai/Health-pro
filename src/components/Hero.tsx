import React from 'react';
import { Play, ArrowRight, Zap, TrendingUp } from 'lucide-react';
import styles from './Hero.module.css';
import Link from 'next/link';

export function Hero() {
    return (
        <section className={styles.hero}>

            {/* Background layers */}
            <div className={styles.meshBg} />
            <div className={styles.purpleOrb} />
            <div className={styles.grid} />

            {/* Scroll hint */}
            <div className={styles.scrollHint}>
                <div className={styles.scrollMouse}>
                    <div className={styles.scrollWheel} />
                </div>
                <span className={styles.scrollTxt}>Scroll</span>
            </div>

            <div className={styles.container}>

                {/* ===== LEFT ===== */}
                <div className={styles.content}>

                    {/* Badge */}
                    <div className={styles.badge}>
                        <span className={styles.badgePulse} />
                        <span className={styles.badgeText}>India's First Fitness Super-App</span>
                    </div>

                    {/* Heading — each line separate span for full control */}
                    <h1 className={styles.title}>
                        <span className={styles.line1}>Master Your</span>
                        <span className={styles.line2}>Fitness</span>
                        <span className={styles.line3}>With AI Precision.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className={styles.subtitle}>
                        Unlock 1:1 Personal Coaching, Elite Gym Access, and 500+ Workouts
                        with health.pro's intelligent workout engine — built for India.
                    </p>

                    {/* Stats */}
                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <span className={styles.statNum}>12K+</span>
                            <span className={styles.statLabel}>Active Users</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNum}>500+</span>
                            <span className={styles.statLabel}>Workouts</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNum}>98%</span>
                            <span className={styles.statLabel}>Goal Success</span>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className={styles.ctaGroup}>
                        <Link href="/signup" className={styles.btnPrimary}>
                            Start Free Trial
                            <ArrowRight size={18} />
                        </Link>
                        <button className={styles.btnSecondary}>
                            <span className={styles.playCircle}>
                                <Play size={12} fill="white" color="white" />
                            </span>
                            Watch Brand Film
                        </button>
                    </div>

                    {/* Social proof */}
                    <div className={styles.proof}>
                        <div className={styles.avatarStack}>
                            <div className={styles.av} />
                            <div className={styles.av} />
                            <div className={styles.av} />
                            <div className={styles.av} />
                            <div className={styles.avMore}>+12k</div>
                        </div>
                        <p className={styles.proofText}>
                            <strong>Joined by 12,000+</strong> fitness enthusiasts this month
                        </p>
                    </div>
                </div>

                {/* ===== RIGHT ===== */}
                <div className={styles.visual}>

                    {/* Pulse rings */}
                    <div className={styles.ring} />
                    <div className={`${styles.ring} ${styles.ring2}`} />

                    {/* Glow */}
                    <div className={styles.cardGlow} />

                    {/* Floating chip — top right */}
                    <div className={styles.chip1}>
                        <div className={`${styles.chipIcon} ${styles.blue}`}>
                            <Zap size={18} color="#3B82F6" />
                        </div>
                        <div>
                            <p className={styles.chipVal}>842 kcal</p>
                            <p className={styles.chipLab}>Today's Burn</p>
                        </div>
                    </div>

                    {/* Main Card */}
                    <div className={styles.streakCard}>

                        <div className={styles.cardTop}>
                            <span className={styles.cardTopLabel}>AI Coach</span>
                            <div className={styles.livePill}>
                                <span className={styles.liveDot} />
                                LIVE
                            </div>
                        </div>

                        {/* AI Suggestion Header */}
                        <div className={styles.streakHeader}>
                            <Zap size={18} color="#00FFD1" />
                            <span className={styles.streakLabel}>Today's Plan</span>
                        </div>

                        {/* Workout of the day */}
                        <div className={styles.wodBlock}>
                            <p className={styles.wodTitle}>Push Day — Upper Body</p>
                            <p className={styles.wodSub}>Recommended by your AI Coach</p>
                        </div>

                        {/* Exercise list */}
                        <div className={styles.exList}>
                            <div className={styles.exRow}>
                                <span className={styles.exDot} style={{ background: '#3B82F6' }} />
                                <span className={styles.exName}>Bench Press</span>
                                <span className={styles.exVal}>4 × 10</span>
                            </div>
                            <div className={styles.exRow}>
                                <span className={styles.exDot} style={{ background: '#8B5CF6' }} />
                                <span className={styles.exName}>Shoulder Press</span>
                                <span className={styles.exVal}>3 × 12</span>
                            </div>
                            <div className={styles.exRow}>
                                <span className={styles.exDot} style={{ background: '#00FFD1' }} />
                                <span className={styles.exName}>Tricep Dips</span>
                                <span className={styles.exVal}>3 × 15</span>
                            </div>
                            <div className={styles.exRow}>
                                <span className={styles.exDot} style={{ background: '#EC4899' }} />
                                <span className={styles.exName}>Cable Flyes</span>
                                <span className={styles.exVal}>3 × 12</span>
                            </div>
                        </div>

                        {/* Footer stats */}
                        <div className={styles.cardFoot}>
                            <div className={styles.footStat}>
                                <span className={styles.footVal}>52<span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>min</span></span>
                                <span className={styles.footLab}>Duration</span>
                            </div>
                            <div className={styles.footDiv} />
                            <div className={styles.footStat}>
                                <span className={styles.footVal}>420<span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>cal</span></span>
                                <span className={styles.footLab}>Est. Burn</span>
                            </div>
                            <div className={styles.footDiv} />
                            <div className={styles.footStat}>
                                <span className={styles.footVal}>⭐ 4.9</span>
                                <span className={styles.footLab}>Rating</span>
                            </div>
                        </div>
                    </div>

                    {/* Floating chip — bottom left */}
                    <div className={styles.chip2}>
                        <div className={`${styles.chipIcon} ${styles.teal}`}>
                            <TrendingUp size={18} color="#00FFD1" />
                        </div>
                        <div>
                            <p className={styles.chipVal}>+24% Strength</p>
                            <p className={styles.chipLab}>This Month</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}