'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, ArrowRight, Zap, Target, Trophy, Flame, Sparkles } from 'lucide-react';
import styles from './Pricing.module.css';
import { Button } from './Button';

const plans = [
    {
        name: 'Free',
        price: '₹0',
        priceNum: 0,
        icon: <Target size={22} />,
        iconColor: '#94A3B8',
        tagline: 'Get started, no strings',
        features: [
            '5 Core Workouts',
            'Limited Stats',
            'Community Access',
            'Daily Streak Tracker'
        ],
        btnText: 'Join Free',
        popular: false
    },
    {
        name: 'Active',
        price: '₹499',
        priceNum: 299,
        icon: <Zap size={22} />,
        iconColor: '#3B82F6',
        tagline: 'Level up your routine',
        features: [
            '50+ Workout Library',
            'Nutrition Guides',
            'Personalized Macros',
            'Mobile App Sync'
        ],
        btnText: 'Go Active',
        popular: false
    },
    {
        name: 'Pro',
        price: '₹999',
        priceNum: 899,
        icon: <Flame size={22} />,
        iconColor: '#00FFD1',
        tagline: 'For serious athletes',
        category: 'MOST POPULAR',
        features: [
            'AI Recommender',
            'Unlimited Gym Pass',
            '1-on-1 Chat',
            'Advanced Biometrics'
        ],
        btnText: 'Start Pro',
        popular: true
    },
    {
        name: 'Elite',
        price: '₹1499',
        priceNum: 1499,
        icon: <Trophy size={22} />,
        iconColor: '#8B5CF6',
        tagline: 'The full performance suite',
        features: [
            'Certified PT Coach',
            'Priority Support',
            'Exclusive Gear Access',
            'Partner Gyms'
        ],
        btnText: 'Join Elite',
        popular: false
    }
];

function PricingCard({ plan, idx }: { plan: typeof plans[0]; idx: number }) {
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setTimeout(() => setVisible(true), idx * 120); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [idx]);

    return (
        <div
            ref={ref}
            className={`${styles.card} ${plan.popular ? styles.popularCard : ''} ${visible ? styles.cardVisible : ''}`}
            style={{ '--icon-color': plan.iconColor } as React.CSSProperties}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Animated background glow on hover */}
            <div className={styles.cardGlow} />

            {plan.popular && (
                <div className={styles.popularBadge}>
                    <Sparkles size={10} />
                    {plan.category}
                </div>
            )}

            <div className={styles.cardHeader}>
                <div className={styles.iconBox}>
                    <span className={styles.iconInner}>{plan.icon}</span>
                </div>
                <div>
                    <h3 className={styles.planName}>{plan.name}</h3>
                    <p className={styles.tagline}>{plan.tagline}</p>
                </div>
            </div>

            <div className={styles.priceBox}>
                <span className={styles.price}>{plan.price}</span>
                <div className={styles.priceRight}>
                    <span className={styles.period}>/mo</span>
                    {plan.priceNum > 0 && (
                        <span className={styles.billed}>billed monthly</span>
                    )}
                </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.featureList}>
                {plan.features.map((feature, fIdx) => (
                    <div
                        key={fIdx}
                        className={styles.featureItem}
                        style={{ transitionDelay: visible ? `${(idx * 120) + (fIdx * 60)}ms` : '0ms' }}
                    >
                        <span className={styles.checkWrap}>
                            <Check size={11} strokeWidth={3} />
                        </span>
                        <span>{feature}</span>
                    </div>
                ))}
            </div>

            <Button
                variant={plan.popular ? 'primary' : 'outline'}
                fullWidth
                className={styles.planBtn}
            >
                {plan.btnText} <ArrowRight size={16} />
            </Button>
        </div>
    );
}

export function Pricing() {
    const [headerVisible, setHeaderVisible] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
            { threshold: 0.2 }
        );
        if (headerRef.current) observer.observe(headerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className={styles.section} id="pricing">
            <div className={styles.bgDecor1} />
            <div className={styles.bgDecor2} />

            <div className={styles.container}>
                <div ref={headerRef} className={`${styles.header} ${headerVisible ? styles.headerVisible : ''}`}>
                    <span className={styles.kicker}>
                        <span className={styles.kickerDot} />
                        PRICING & MEMBERSHIP
                    </span>
                    <h2 className={styles.title}>
                        Unlock Your <span className={styles.gradientText}>Potential</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Choose the membership that fits your life and goals perfectly.<br />
                        Free forever for early-stage enthusiasts.
                    </p>

                    <div className={styles.guarantee}>
                        <Check size={14} />
                        No credit card required &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; 7-day free trial on paid plans
                    </div>
                </div>

                <div className={styles.grid}>
                    {plans.map((plan, idx) => (
                        <PricingCard key={idx} plan={plan} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}