'use client';

import React, { useState, useEffect } from 'react';
import { Flame, Calendar, Dumbbell, BookOpen, Clock, Activity, Target, Play, CheckCircle2, Zap } from 'lucide-react';
import styles from './Dashboard.module.css';
import { generateRecommendation, type WorkoutRecommendation, type Difficulty, type Goal } from '@/lib/recommender';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';

export default function DashboardPage() {
    const [duration, setDuration] = useState<number>(30);
    const [recommendation, setRecommendation] = useState<WorkoutRecommendation | null>(null);
    const { user, checkIn } = useAuth();
    const { t, language } = useLanguage();
    const [checkingIn, setCheckingIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const newRec = generateRecommendation(
            (user?.user_metadata?.goal as Goal) || 'weight-loss',
            (user?.user_metadata?.level as Difficulty) || 'Beginner',
            duration
        );
        setRecommendation(newRec);
    }, [duration, user, language]);

    const handleCheckIn = async () => {
        setCheckingIn(true);
        await checkIn();
        setCheckingIn(false);
    };

    const hasCheckedInToday =
        user?.user_metadata?.last_check_in &&
        new Date(user.user_metadata.last_check_in).toDateString() === new Date().toDateString();

    useEffect(() => {
        if (!user) return;
        if (checkingIn) return;
        if (!hasCheckedInToday) {
            handleCheckIn();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleStartSession = () => {
        if (!recommendation || recommendation.exercises.length === 0) return;
        const first = recommendation.exercises[0];
        router.push(`/dashboard/exercises?search=${encodeURIComponent(first.name)}`);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.welcome}>
                    <h1>{t.dashWelcome} <span className={styles.name}>{user?.user_metadata?.full_name?.split(' ')[0] || 'Member'}</span> 👋</h1>
                    <p>Don't forget to check-in to keep your streak alive!</p>
                </div>

                <div className={styles.streakHero}>
                    <div className={styles.streakInfo}>
                        <div className={styles.streakFlame}>
                            <Flame size={48} />
                        </div>
                        <div className={styles.streakValue}>{user?.user_metadata?.streak || 0}</div>
                        <div className={styles.streakUnit}>{t.dashStreak}</div>
                    </div>

                    <Button
                        variant={hasCheckedInToday ? "ghost" : "primary"}
                        className={styles.checkInBtn}
                        onClick={handleCheckIn}
                        disabled={hasCheckedInToday || checkingIn}
                    >
                        {hasCheckedInToday ? (
                            <span className={styles.checkedIn}>
                                <CheckCircle2 size={18} /> {t.dashCheckedIn}
                            </span>
                        ) : (
                            <span>{t.dashCheckIn}</span>
                        )}
                    </Button>

                    {!hasCheckedInToday && (
                        <div className={styles.streakWarning}>
                            <Zap size={14} /> Streak expires in 6 hours!
                        </div>
                    )}

                    <div className={styles.milestoneProgress}>
                        <div className={styles.milestoneLabel}>
                            <span>Next Milestone: {((user?.user_metadata?.streak || 0) + 10)} {t.dashDays}</span>
                        </div>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: '65%' }}></div>
                        </div>
                    </div>
                </div>
            </header>

            <section className={styles.quickActions}>
                <Link href="/dashboard/fitness" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={styles.actionCard}>
                        <div className={`${styles.iconBg} ${styles.blue}`}>
                            <Calendar size={24} color="white" />
                        </div>
                        <h3>Book a Class</h3>
                        <p>HIIT & Strength</p>
                    </div>
                </Link>

                <Link href="/dashboard/fitness?showQR=true" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={styles.actionCard}>
                        <div className={`${styles.iconBg} ${styles.cyan}`}>
                            <Target size={24} color="#0a0a1a" />
                        </div>
                        <h3>Gym QR</h3>
                        <p>Instant Check-in</p>
                    </div>
                </Link>

                <Link href="/dashboard/fitness" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={styles.actionCard}>
                        <div className={`${styles.iconBg} ${styles.purple}`}>
                            <Dumbbell size={24} color="white" />
                        </div>
                        <h3>Home Live</h3>
                        <p>Live Classes</p>
                    </div>
                </Link>

                <Link href="/dashboard/exercises" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={styles.actionCard}>
                        <div className={`${styles.iconBg} ${styles.success}`}>
                            <BookOpen size={24} color="white" />
                        </div>
                        <h3>Encyclopedia</h3>
                        <p>Video Guides</p>
                    </div>
                </Link>
            </section>

            <div className={styles.dashboardGrid}>
                <div className={styles.mainCol}>
                    <section className={styles.recommender}>
                        <div className={styles.sectionHeader}>
                            <h4>{t.dashAI}</h4>
                            <div className={styles.durationSelector}>
                                {[15, 30, 45, 60].map(d => (
                                    <button
                                        key={d}
                                        className={`${styles.durationBtn} ${duration === d ? styles.activeDuration : ''}`}
                                        onClick={() => setDuration(d)}
                                    >
                                        {d}m
                                    </button>
                                ))}
                            </div>
                        </div>

                        {recommendation && (
                            <div className={styles.aiCardFull}>
                                <div className={styles.aiHero}>
                                    <div className={styles.aiBadge}>PULSE GENERATED</div>
                                    <h3 className={styles.aiTitle}>{recommendation.title}</h3>
                                    <div className={styles.aiMeta}>
                                        <div className={styles.metaItem}><Clock size={16} /> {recommendation.totalTime} min</div>
                                        <div className={styles.metaItem}><Activity size={16} /> {recommendation.intensity} Intense</div>
                                    </div>
                                </div>

                                <div className={styles.exerciseList}>
                                    {recommendation.exercises.map((ex, idx) => (
                                        <div key={idx} className={styles.exerciseRow}>
                                            <div className={styles.exerciseInfo}>
                                                <span className={styles.exNumber}>{idx + 1}</span>
                                                <div>
                                                    <p className={styles.exName}>{ex.name}</p>
                                                    <p className={styles.exMeta}>{ex.category} • {ex.difficulty}</p>
                                                </div>
                                            </div>
                                            <div className={styles.exReps}>{ex.baseSets} Sets x {ex.baseReps}</div>
                                            <Link href={`/dashboard/exercises?search=${ex.name}`}>
                                                <button className={styles.viewGuideBtn}>
                                                    <Play size={14} fill="currentColor" />
                                                </button>
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    variant="primary"
                                    size="lg"
                                    className={styles.startWorkoutBtn}
                                    onClick={handleStartSession}
                                >
                                    <Play size={20} fill="currentColor" /> Start AI Session
                                </Button>
                            </div>
                        )}
                    </section>
                </div>

                <div className={styles.sideCol}>
                    <section className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statHeader}>
                                <Activity size={18} color="var(--color-primary)" />
                                <span>{t.dashBurn}</span>
                            </div>
                            <div className={styles.statValue}>842 <span className={styles.statUnit}>kcal</span></div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statHeader}>
                                <Clock size={18} color="var(--color-cyan)" />
                                <span>{t.dashActive}</span>
                            </div>
                            <div className={styles.statValue}>45 <span className={styles.statUnit}>min</span></div>
                        </div>
                    </section>

                    <section className={styles.membershipCard}>
                        <div className={styles.statusBadge}>ACTIVE {user?.user_metadata?.plan?.toUpperCase() || 'FREE'}</div>
                        <p className={styles.planName}>Membership expires in 42d</p>
                        <button className={styles.renewButton}>Advanced Analytics &gt;</button>
                    </section>
                </div>
            </div>
        </div>
    );
}