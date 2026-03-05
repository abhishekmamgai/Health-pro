import React, { useRef } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    children,
    onClick,
    ...props
}) => {
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Ripple effect
        const btn = btnRef.current;
        if (btn) {
            const rect = btn.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height) * 2;
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                width: ${size}px;
                height: ${size}px;
                left: ${e.clientX - rect.left - size / 2}px;
                top: ${e.clientY - rect.top - size / 2}px;
                background: rgba(255,255,255,0.25);
                transform: scale(0);
                animation: ripple 0.55s ease-out forwards;
                pointer-events: none;
            `;
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
        onClick?.(e);
    };

    const dynamicClasses = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button ref={btnRef} className={dynamicClasses} onClick={handleClick} {...props}>
            <span className={styles.inner}>{children}</span>
        </button>
    );
};