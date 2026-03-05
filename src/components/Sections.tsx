'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Quote, Star, Flame, Users, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

function useInView(delay = 0) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const ob = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setTimeout(() => setVisible(true), delay); },
            { threshold: 0.15 }
        );
        if (ref.current) ob.observe(ref.current);
        return () => ob.disconnect();
    }, [delay]);
    return { ref, visible };
}

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const ob = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting && !started) setStarted(true); },
            { threshold: 0.5 }
        );
        if (ref.current) ob.observe(ref.current);
        return () => ob.disconnect();
    }, [started]);
    useEffect(() => {
        if (!started) return;
        const steps = 60;
        let current = 0;
        const timer = setInterval(() => {
            current += target / steps;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(current));
        }, 1800 / steps);
        return () => clearInterval(timer);
    }, [started, target]);
    return <span ref={ref}>{count.toLocaleString('en-IN')}{suffix}</span>;
}

// ══════════════════════════════════════════════════════════
// HOW IT WORKS
// ══════════════════════════════════════════════════════════
const stepsData = [
    { step: 1, title: 'Sign Up',       desc: 'Create your free account in 60 seconds and set your fitness goals.', icon: <CheckCircle2 size={22} />, color: '#0072FF' },
    { step: 2, title: 'Choose Plan',   desc: 'Pick a membership that fits your lifestyle — free or fully loaded.',  icon: <Zap size={22} />,          color: '#7C3AED' },
    { step: 3, title: 'Start Journey', desc: 'Access 1,000+ gyms, AI coaching, and expert classes anywhere.',       icon: <Flame size={22} />,        color: '#0891B2' },
];

function StepCard({ item, idx }: { item: typeof stepsData[0]; idx: number }) {
    const { ref, visible } = useInView(idx * 150);
    return (
        <div
            ref={ref}
            style={{
                backgroundColor: 'white', padding: '44px 36px',
                borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)', position: 'relative',
                overflow: 'hidden', cursor: 'default',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(48px)',
                transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
            }}
            onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = 'translateY(-8px)';
                el.style.boxShadow = `0 24px 60px ${item.color}18`;
                el.style.borderColor = item.color;
            }}
            onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.04)';
                el.style.borderColor = 'var(--color-border)';
            }}
        >
            <span style={{
                position: 'absolute', top: -10, right: 20, fontSize: '96px', fontWeight: 900,
                color: item.color, opacity: 0.06, lineHeight: 1, userSelect: 'none' as const,
            }}>{item.step}</span>

            <div style={{
                width: 56, height: 56, borderRadius: '16px', background: `${item.color}15`,
                color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '28px', transition: 'all 0.3s ease'
            }}>
                {item.icon}
            </div>

            <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12,
                fontSize: '11px', fontWeight: 800, letterSpacing: '2px',
                textTransform: 'uppercase' as const, color: item.color
            }}>
                Step {item.step}
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '12px' }}>{item.title}</h3>
            <p style={{ fontSize: '15px', color: 'var(--color-text-mid)', lineHeight: 1.65 }}>{item.desc}</p>
        </div>
    );
}

export const HowItWorks: React.FC = () => {
    const { ref: headRef, visible: headVisible } = useInView(0);
    return (
        <section id="how-it-works" style={{ padding: '120px 32px', backgroundColor: 'var(--color-surface)', position: 'relative', overflow: 'hidden' }}>
            <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.75)}}`}</style>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3, pointerEvents: 'none' }} />

            <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                <div ref={headRef} style={{ textAlign: 'center', marginBottom: '80px', opacity: headVisible ? 1 : 0, transform: headVisible ? 'translateY(0)' : 'translateY(36px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '4px', color: 'var(--color-primary)', textTransform: 'uppercase' as const, marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
                        GET STARTED
                    </span>
                    <h2 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '16px' }}>
                        How It{' '}
                        {/* ✅ FIX: backgroundImage instead of background */}
                        <span style={{ backgroundImage: 'var(--gradient-brand)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Works</span>
                    </h2>
                    <p style={{ fontSize: '18px', color: 'var(--color-text-mid)', lineHeight: 1.6 }}>Three simple steps to transform your fitness life.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                    {stepsData.map((item, idx) => (
                        <StepCard key={item.step} item={item} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// ══════════════════════════════════════════════════════════
// COMMUNITY
// ══════════════════════════════════════════════════════════
const statsData = [
    { value: 142,     suffix: '+', label: 'Avg Streak Days', icon: <Flame size={20} /> },
    { value: 12500,   suffix: '',  label: 'Active Classes',  icon: <Zap size={20} />   },
    { value: 2000000, suffix: '+', label: 'Calories Burned', icon: <Users size={20} /> },
];

function StatCard({ stat, idx }: { stat: typeof statsData[0]; idx: number }) {
    const { ref, visible } = useInView(idx * 150);
    return (
        <div
            ref={ref}
            style={{
                padding: '40px 36px', backgroundColor: 'rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.08)', borderRadius: 'var(--radius-xl)',
                backdropFilter: 'blur(8px)', textAlign: 'center',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
                transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1), background-color 0.3s ease, border-color 0.3s ease',
            }}
            onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.backgroundColor = 'rgba(0,114,255,0.05)';
                el.style.borderColor = 'rgba(0,114,255,0.25)';
                el.style.transform = 'translateY(-6px) scale(1.02)';
            }}
            onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.backgroundColor = 'rgba(0,0,0,0.03)';
                el.style.borderColor = 'rgba(0,0,0,0.08)';
                el.style.transform = 'translateY(0) scale(1)';
            }}
        >
            <div style={{ width: 48, height: 48, borderRadius: '14px', backgroundColor: 'rgba(0,114,255,0.08)', color: '#0072FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                {stat.icon}
            </div>
            <div style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1, marginBottom: 8, color: '#0a0a1a' }}>
                <Counter target={stat.value} suffix={stat.suffix} />
            </div>
            <div style={{ color: 'rgba(0,0,0,0.5)', fontSize: '14px', fontWeight: 500 }}>{stat.label}</div>
        </div>
    );
}

export const Community: React.FC = () => {
    const { ref: headRef, visible: headVisible } = useInView(0);
    return (
        <section id="community" style={{ padding: '120px 32px', backgroundColor: 'white', color: '#0a0a1a', position: 'relative', overflow: 'hidden' }}>
            <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.75)}}`}</style>
            <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', backgroundImage: 'radial-gradient(circle, rgba(0,114,255,0.06) 0%, transparent 65%)', top: -200, left: -150, pointerEvents: 'none' as const }} />
            <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)', bottom: -100, right: -100, pointerEvents: 'none' as const }} />

            <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                <div ref={headRef} style={{ textAlign: 'center', marginBottom: '80px', opacity: headVisible ? 1 : 0, transform: headVisible ? 'translateY(0)' : 'translateY(36px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '4px', color: 'var(--color-primary)', textTransform: 'uppercase' as const, marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
                        THE COMMUNITY
                    </span>
                    <h2 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '20px' }}>
                        Join the{' '}
                        {/* ✅ FIX: backgroundImage instead of background */}
                        <span style={{ backgroundImage: 'linear-gradient(135deg,#0072FF,#7C3AED)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tribe</span>
                    </h2>
                    <p style={{ maxWidth: '520px', margin: '0 auto', color: 'var(--color-text-mid)', fontSize: '18px', lineHeight: 1.65 }}>
                        Over 50,000 active members in India are transforming their lives with health.pro.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                    {statsData.map((stat, idx) => (
                        <StatCard key={idx} stat={stat} idx={idx} />
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '64px' }}>
                    <Button variant="primary" size="lg">
                        Join the Community <ArrowRight size={18} />
                    </Button>
                </div>
            </div>
        </section>
    );
};

// ══════════════════════════════════════════════════════════
// TESTIMONIALS
// ══════════════════════════════════════════════════════════
const testimonialsData = [
    { name: 'Arjun K.',  role: 'Software Engineer, Bengaluru', duration: '6 months', text: 'The streak system kept me going when I wanted to quit. Crossed 100 days today!', rating: 5, avatar: 'AK', color: '#0072FF' },
    { name: 'Priya S.',  role: 'Yoga Instructor, Mumbai',      duration: '1 year',   text: 'Best fitness app for urban Indians. The gym access is completely seamless.',       rating: 5, avatar: 'PS', color: '#7C3AED' },
    { name: 'Rohan M.',  role: 'Entrepreneur, Delhi',          duration: '8 months', text: 'The AI coach actually adapts to my crazy schedule. Game changer for busy people.', rating: 5, avatar: 'RM', color: '#0891B2' },
];

function TestimonialCard({ item, idx }: { item: typeof testimonialsData[0]; idx: number }) {
    const { ref, visible } = useInView(idx * 140);
    return (
        <div
            ref={ref}
            style={{
                padding: '40px', backgroundColor: 'white',
                border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-xl)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)', position: 'relative',
                overflow: 'hidden', display: 'flex', flexDirection: 'column' as const, gap: '24px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(48px)',
                transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease',
            }}
            onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = 'translateY(-8px)';
                el.style.boxShadow = `0 24px 60px ${item.color}14`;
                el.style.borderColor = item.color;
            }}
            onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.04)';
                el.style.borderColor = 'var(--color-border)';
            }}
        >
            <div style={{ position: 'absolute', top: 20, right: 24, color: item.color, opacity: 0.1 }}>
                <Quote size={56} />
            </div>

            <div style={{ display: 'flex', gap: '3px' }}>
                {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#FBBF24" color="#FBBF24"
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'scale(1)' : 'scale(0)',
                            transition: `opacity 0.3s ease ${(idx * 140) + (i * 60)}ms, transform 0.3s cubic-bezier(0.34,1.56,0.64,1) ${(idx * 140) + (i * 60)}ms`
                        }}
                    />
                ))}
            </div>

            <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--color-text-mid)', fontStyle: 'italic', position: 'relative', zIndex: 1, flex: 1 }}>
                "{item.text}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundImage: `linear-gradient(135deg, ${item.color}, ${item.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px', flexShrink: 0, boxShadow: `0 4px 12px ${item.color}30` }}>
                    {item.avatar}
                </div>
                <div>
                    <div style={{ fontWeight: 700, fontSize: '15px' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-mid)' }}>{item.role}</div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: '11px', color: item.color, fontWeight: 700, backgroundColor: `${item.color}12`, padding: '4px 10px', borderRadius: '20px' }}>
                    {item.duration}
                </div>
            </div>
        </div>
    );
}

export const Testimonials: React.FC = () => {
    const { ref: headRef, visible: headVisible } = useInView(0);
    return (
        <section style={{ padding: '120px 32px', backgroundColor: 'white', position: 'relative', overflow: 'hidden' }}>
            <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.75)}}`}</style>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,114,255,0.03), transparent)', pointerEvents: 'none' as const }} />

            <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                <div ref={headRef} style={{ textAlign: 'center', marginBottom: '80px', opacity: headVisible ? 1 : 0, transform: headVisible ? 'translateY(0)' : 'translateY(36px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '4px', color: 'var(--color-primary)', textTransform: 'uppercase' as const, marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
                        SUCCESS STORIES
                    </span>
                    <h2 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '16px' }}>
                        Member{' '}
                        {/* ✅ FIX: backgroundImage instead of background */}
                        <span style={{ backgroundImage: 'var(--gradient-brand)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Stories</span>
                    </h2>
                    <p style={{ fontSize: '18px', color: 'var(--color-text-mid)', lineHeight: 1.6 }}>Real people. Real results. Real transformations.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
                    {testimonialsData.map((item, idx) => (
                        <TestimonialCard key={idx} item={item} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};