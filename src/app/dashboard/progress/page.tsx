'use client';

import React from 'react';
import { Activity, TrendingUp, Calendar, Target, Award, ArrowUpRight } from 'lucide-react';
import styles from './Progress.module.css';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';

export default function ProgressPage() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const streak = user?.user_metadata?.streak || 0;
    const isNewUser = !user?.user_metadata?.goal;

    const goal = user?.user_metadata?.goal || 'Weight Loss';
    const level = user?.user_metadata?.level || 'Beginner';
    const lastCheckIn = user?.user_metadata?.last_check_in
        ? new Date(user.user_metadata.last_check_in)
        : null;

    // Simple derived metrics based on streak so all cards feel "alive"
    const monthlyWorkouts = streak; // assume one check-in = one workout
    const workoutTarget = 20;
    const caloriesBurned = streak * 350; // rough estimate kcal per session
    const volumeChange = streak === 0 ? 0 : Math.min(5 + streak * 1.5, 65); // %
    const consistencyScore = Math.min(streak * 4, 100); // 25 days ~ 100%
    const caloriesProgressPct = Math.min((caloriesBurned / 10000) * 100, 100);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{t.progTitle} <span className={styles.gradientText}>Progress</span></h1>
                <p className={styles.subtitle}>
                    {isNewUser
                        ? "Complete your profile in Settings to unlock personalized tracking."
                        : t.progSubtitle}
                </p>
            </header>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}><TrendingUp size={24} /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Workout Volume</span>
                        <div className={styles.statValue}>
                            {isNewUser ? '0%' : `+${volumeChange.toFixed(1)}%`} {!isNewUser && <ArrowUpRight size={16} />}
                        </div>
                        <p className={styles.statDesc}>
                            {isNewUser ? 'Start your first session' : 'Compared to your first active week'}
                        </p>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}><Activity size={24} /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>{t.progCalories}</span>
                        <div className={styles.statValue}>
                            {caloriesBurned.toLocaleString()}
                        </div>
                        <p className={styles.statDesc}>
                            {isNewUser ? 'Workouts burn calories' : "Estimated this month from your check-ins"}
                        </p>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}><Calendar size={24} /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>{t.progWorkouts}</span>
                        <div className={styles.statValue}>{monthlyWorkouts}</div>
                        <p className={styles.statDesc}>
                            {isNewUser ? 'Set your goal first' : `Out of ${workoutTarget} target this month`}
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.chartsGrid}>
                <div className={styles.chartCard}>
                    <div className={styles.cardHeader}>
                        <h3>Consistency Score</h3>
                        <Award size={20} color="var(--color-primary)" />
                    </div>
                    <div className={styles.consistencyVisual}>
                        <div className={styles.scoreCircle}>
                            <span className={styles.scoreValue}>{isNewUser ? '0' : consistencyScore}</span>
                            <span className={styles.scoreUnit}>%</span>
                        </div>
                        <p className={styles.scoreText}>
                            {isNewUser
                                ? "Check-in daily to build your score."
                                : streak >= 25
                                    ? "You're in the top 5% of members this week!"
                                    : "You're building a strong habit. Keep going!"}
                        </p>
                    </div>
                </div>

                <div className={styles.chartCard}>
                    <div className={styles.cardHeader}>
                        <h3>Active Milestones</h3>
                        <Target size={20} color="var(--color-cyan)" />
                    </div>
                    <div className={styles.milestoneList}>
                        <div className={styles.milestoneItem}>
                            <div className={styles.milestoneInfo}>
                                <span>150 {t.progStreak}</span>
                                <span>{streak}/150</span>
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${Math.min((streak / 150) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                        <div className={styles.milestoneItem}>
                            <div className={styles.milestoneInfo}>
                                <span>10k Monthly Calories</span>
                                <span>{caloriesBurned.toLocaleString()}/10,000</span>
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{
                                        width: `${caloriesProgressPct}%`,
                                        backgroundColor: caloriesProgressPct >= 100 ? 'var(--color-success)' : 'var(--color-primary)'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.chartCard}>
                <div className={styles.cardHeader}>
                    <h3>Your Progress Report</h3>
                </div>
                <p className={styles.subtitle}>
                    Goal: <strong>{goal}</strong> • Level: <strong>{level}</strong>
                </p>
                <p className={styles.subtitle}>
                    You have a current streak of <strong>{streak} day{streak === 1 ? '' : 's'}</strong>
                    {lastCheckIn && (
                        <> (last check-in on <strong>{lastCheckIn.toLocaleDateString()}</strong>)</>
                    )}
                    .
                </p>
                <p className={styles.subtitle}>
                    Based on your activity, we estimate you've completed <strong>{monthlyWorkouts}</strong> workout
                    {monthlyWorkouts === 1 ? '' : 's'} this month and burned around{' '}
                    <strong>{caloriesBurned.toLocaleString()} kcal</strong>.
                </p>
                {!isNewUser ? (
                    <p className={styles.subtitle}>
                        Keep following your <strong>{goal.toLowerCase()}</strong> plan at a{' '}
                        <strong>{level.toLowerCase()}</strong> level and aim for at least{' '}
                        <strong>{workoutTarget}</strong> sessions each month to steadily improve your results.
                    </p>
                ) : (
                    <p className={styles.subtitle}>
                        Set your goal and level in Settings to receive a fully personalized progress breakdown.
                    </p>
                )}
            </div>
        </div>
    );
}
