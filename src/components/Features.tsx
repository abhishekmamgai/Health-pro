'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
    Users, Search, Dumbbell, Calendar, ShoppingBag, PieChart, Lock, ArrowRight
} from 'lucide-react';
import styles from './Features.module.css';
import { Button } from './Button';

// ─── Shared hook ──────────────────────────────────────────────
function useInView(delay = 0) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const ob = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setTimeout(() => setVisible(true), delay); },
            { threshold: 0.1 }
        );
        if (ref.current) ob.observe(ref.current);
        return () => ob.disconnect();
    }, [delay]);
    return { ref, visible };
}

// ─── Feature data ─────────────────────────────────────────────
const features = [
    { icon: <Search />,      title: 'Exercise Encyclopedia', desc: 'Access 500+ exercises with high-definition form guides and technique breakthroughs.', locked: true,  accent: '#0072FF' },
    { icon: <Users />,       title: 'Community Elite',       desc: 'Join local fitness squads, compete in daily challenges, and track live leaderboard ranks.', locked: false, accent: '#7C3AED' },
    { icon: <Dumbbell />,    title: 'Precision Workouts',    desc: 'AI-generated routines tailored to your metabolism, goals, and equipment availability.', locked: false, accent: '#0891B2' },
    { icon: <Calendar />,    title: 'Gym & Class Pass',      desc: 'One membership for 1,000+ elite gyms and boutique fitness studios across India.',    locked: false, accent: '#059669' },
    { icon: <ShoppingBag />, title: 'Nutrition Store',       desc: 'Curated selection of high-performance supplements & specialized fitness apparel.',      locked: false, accent: '#DC2626' },
    { icon: <PieChart />,    title: 'Biometric Tracking',    desc: 'Sync wearable data and track evolution through advanced body metric visualizations.',   locked: false, accent: '#D97706' },
];

// ─── Single card — hooks at top level ✅ ──────────────────────
function FeatureCard({ feature, idx }: { feature: typeof features[0]; idx: number }) {
    const { ref, visible } = useInView(idx * 100);

    return (
        <div
            ref={ref}
            className={`${styles.card} ${feature.locked ? styles.lockedCard : ''} ${visible ? styles.cardVisible : ''}`}
            style={{ '--card-accent': feature.accent } as React.CSSProperties}
        >
            <div className={styles.cardGlow} />
            <div className={styles.accentBar} />

            <div className={styles.iconBox}>
                {feature.icon}
            </div>

            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDesc}>{feature.desc}</p>
                <div className={styles.cardFooter}>
                    <span className={styles.learnMore}>
                        Learn more <ArrowRight size={14} className={styles.arrowIcon} />
                    </span>
                </div>
            </div>

            {feature.locked && (
                <div className={styles.overlay}>
                    <div className={styles.overlayContent}>
                        <div className={styles.lockRing}>
                            <Lock size={22} color="white" />
                        </div>
                        <div className={styles.lockInfo}>
                            <span className={styles.lockBadge}>Member Only</span>
                            <p className={styles.lockSubtext}>Unlock with any plan</p>
                        </div>
                        <Button variant="outline" size="sm" className={styles.unlockBtn}>
                            Unlock Now
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Main export ──────────────────────────────────────────────
export function Features() {
    const [headerVisible, setHeaderVisible] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ob = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
            { threshold: 0.2 }
        );
        if (headerRef.current) ob.observe(headerRef.current);
        return () => ob.disconnect();
    }, []);

    return (
        <section className={styles.section} id="features">
            <div className={styles.orb1} />
            <div className={styles.orb2} />

            <div className={styles.container}>
                <div
                    ref={headerRef}
                    className={`${styles.header} ${headerVisible ? styles.headerVisible : ''}`}
                >
                    <span className={styles.kicker}>
                        <span className={styles.kickerDot} />
                        THE PLATFORM
                    </span>
                    <h2 className={styles.title}>
                        All-In-One <span className={styles.gradientText}>Ecosystem</span>
                    </h2>
                    <p className={styles.subtitle}>
                        From local gym access to global community challenges, health.pro is <br />
                        your ultimate companion for high-performance living.
                    </p>
                </div>

                <div className={styles.grid}>
                    {features.map((feature, idx) => (
                        <FeatureCard key={idx} feature={feature} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}