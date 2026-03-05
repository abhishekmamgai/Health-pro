'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { Target, Activity, Dumbbell, Trophy, ArrowRight } from 'lucide-react';
import styles from './Onboarding.module.css';
import { useAuth } from '@/lib/auth-context';

const goals = [
    { id: 'weight-loss', label: 'Weight Loss', icon: <Target /> },
    { id: 'muscle-gain', label: 'Build Muscle', icon: <Dumbbell /> },
    { id: 'stay-active', label: 'Stay Active', icon: <Activity /> },
    { id: 'sports', label: 'Sports Performance', icon: <Trophy /> },
];

const levels = ['Beginner', 'Intermediate', 'Advanced'];

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [goal, setGoal] = useState('');
    const [level, setLevel] = useState('');
    const [loading, setLoading] = useState(false);
    const { updateMetadata } = useAuth();
    const router = useRouter();

    const handleComplete = async () => {
        setLoading(true);
        try {
            await updateMetadata({
                goal,
                level,
                plan: 'Pro' // Default for new users in this mock
            });
            router.push('/dashboard');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <Logo variant="compact" size={32} />
                <div className={styles.progress}>
                    <div className={styles.progressLine} style={{ width: `${(step / 3) * 100}%` }}></div>
                </div>
            </header>

            <main className={styles.content}>
                {step === 1 && (
                    <div className={styles.step}>
                        <h1 className={styles.title}>What is your fitness goal?</h1>
                        <p className={styles.subtitle}>Tell us what you want to achieve, and we'll personalize your experience.</p>
                        <div className={styles.grid}>
                            {goals.map((g) => (
                                <button
                                    key={g.id}
                                    className={`${styles.card} ${goal === g.id ? styles.selected : ''}`}
                                    onClick={() => setGoal(g.id)}
                                >
                                    <div className={styles.icon}>{g.icon}</div>
                                    <span className={styles.label}>{g.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className={styles.step}>
                        <h1 className={styles.title}>What is your current level?</h1>
                        <p className={styles.subtitle}>Don't worry, everyone starts somewhere.</p>
                        <div className={styles.list}>
                            {levels.map((l) => (
                                <button
                                    key={l}
                                    className={`${styles.levelItem} ${level === l ? styles.activeLevel : ''}`}
                                    onClick={() => setLevel(l)}
                                >
                                    <span className={styles.levelLabel}>{l}</span>
                                    <div className={styles.check}></div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className={styles.step}>
                        <h1 className={styles.title}>Ready to transform?</h1>
                        <p className={styles.subtitle}>Your personalized fitness plan is ready.</p>
                        <div className={styles.summaryCard}>
                            <div className={styles.summaryItem}>
                                <span>Goal</span>
                                <strong>{goals.find(g => g.id === goal)?.label}</strong>
                            </div>
                            <div className={styles.summaryItem}>
                                <span>Level</span>
                                <strong>{level}</strong>
                            </div>
                            <div className={styles.summaryItem}>
                                <span>Daily Commitment</span>
                                <strong>30-45 minutes</strong>
                            </div>
                        </div>
                        <p className={styles.confetti}>🎉 Welcome to the community!</p>
                    </div>
                )}

                <div className={styles.footer}>
                    {step > 1 && (
                        <Button variant="ghost" onClick={() => setStep(step - 1)}>Back</Button>
                    )}
                    {step < 3 ? (
                        <Button
                            variant="primary"
                            onClick={() => setStep(step + 1)}
                            disabled={step === 1 ? !goal : !level}
                            className={styles.nextBtn}
                        >
                            Continue <ArrowRight size={18} />
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            onClick={handleComplete}
                            disabled={loading}
                            className={styles.nextBtn}
                        >
                            {loading ? 'Finalizing...' : 'Enter Dashboard'}
                        </Button>
                    )}
                </div>
            </main>
        </div>
    );
}
