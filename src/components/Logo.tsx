import React from 'react';
import styles from './Logo.module.css';

interface LogoProps {
    variant?: 'full' | 'compact' | 'icon';
    className?: string;
    size?: number;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '', size = 32 }) => {
    const iconSize = size;
    const wordmarkSize = variant === 'full' ? size * 0.8 : size * 0.7;

    return (
        <div className={`${styles.logoContainer} ${className}`} style={{ height: size }}>
            {(variant === 'full' || variant === 'icon' || variant === 'compact') && (
                <div
                    className={styles.iconBox}
                    style={{
                        width: iconSize,
                        height: iconSize
                    }}
                >
                    <svg
                        viewBox="0 0 100 100"
                        className={styles.svgIcon}
                    >
                        {/* Heart shape */}
                        <path
                            d="M50 85 C50 85 10 60 10 35 C10 15 30 15 50 30 C70 15 90 15 90 35 C90 60 50 85 50 85"
                            fill="none"
                            stroke="var(--color-cyan)"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                        {/* ECG Pulse line */}
                        <path
                            d="M10 50 L35 50 L42 20 L50 70 L58 40 L65 50 L90 50"
                            fill="none"
                            stroke="url(#pulseGradient)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle cx="50" cy="70" r="3" fill="var(--color-cyan)" className="animate-flicker" />
                        <defs>
                            <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="var(--color-cyan)" />
                                <stop offset="50%" stopColor="var(--color-primary)" />
                                <stop offset="100%" stopColor="var(--color-purple)" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            )}

            {(variant === 'full' || variant === 'compact') && (
                <div className={styles.textStack}>
                    <div className={styles.wordmarkRow}>
                        <span
                            className={styles.brandText}
                            style={{ fontSize: wordmarkSize }}
                        >
                            health
                        </span>
                        <span
                            className={styles.proPill}
                            style={{ fontSize: wordmarkSize }}
                        >
                            .pro
                        </span>
                    </div>
                    {variant === 'full' && (
                        <span
                            className={styles.tagline}
                            style={{ fontSize: size * 0.3 }}
                        >
                            FITNESS & WELLNESS
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};
