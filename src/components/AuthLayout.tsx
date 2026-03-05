import React from 'react';
import styles from './AuthLayout.module.css';
import { Logo } from './Logo';
import Link from 'next/link';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    alternateAction: {
        text: string;
        linkText: string;
        href: string;
    };
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
    title,
    subtitle,
    alternateAction,
}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.sidebar}>
                <div className={styles.logoBox}>
                    <Logo variant="full" size={48} className={styles.logo} />
                </div>
                <div className={styles.sidebarContent}>
                    <h2 className={styles.sidebarTitle}>Start Your Transformation Journey</h2>
                    <div className={styles.sidebarFeatures}>
                        <div className={styles.sidebarFeature}>✓ Gym Class Booking</div>
                        <div className={styles.sidebarFeature}>✓ Home Workout Programs</div>
                        <div className={styles.sidebarFeature}>✓ Personal Training</div>
                    </div>
                </div>
            </div>

            <div className={styles.formContainer}>
                <div className={styles.mobileHeader}>
                    <Logo variant="compact" size={32} />
                </div>

                <div className={styles.formCard}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.subtitle}>{subtitle}</p>

                    {children}

                    <p className={styles.alternateAction}>
                        {alternateAction.text}{' '}
                        <Link href={alternateAction.href} className={styles.link}>
                            {alternateAction.linkText}
                        </Link>
                    </p>
                </div>

                <footer className={styles.mobileFooter}>
                    © 2026 health.pro. All rights reserved.
                </footer>
            </div>
        </div>
    );
};