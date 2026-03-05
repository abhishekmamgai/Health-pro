'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './Button';
import styles from './Navbar.module.css';

const navLinks = [
    { label: 'Platform',        href: '#features'     },
    { label: 'Success Stories', href: '#testimonials' },
    { label: 'Pricing',         href: '#pricing'      },
    { label: 'Store',           href: '/store', protected: true },
];

// ══════════════════════════════════════════════════════════
// LOGIN REQUIRED POPUP
// ══════════════════════════════════════════════════════════
function LoginPopup({ onClose }: { onClose: () => void }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger enter animation
        const t = setTimeout(() => setVisible(true), 10);
        // Auto-close after 4s
        const auto = setTimeout(() => handleClose(), 4500);
        return () => { clearTimeout(t); clearTimeout(auto); };
    }, []);

    function handleClose() {
        setVisible(false);
        setTimeout(onClose, 350);
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className={`${styles.popupBackdrop} ${visible ? styles.popupBackdropVisible : ''}`}
                onClick={handleClose}
            />
            {/* Card */}
            <div className={`${styles.popup} ${visible ? styles.popupVisible : ''}`}>
                <button className={styles.popupClose} onClick={handleClose}>
                    <X size={18} />
                </button>

                <div className={styles.popupIconWrap}>
                    <Lock size={26} />
                    <div className={styles.popupIconRing} />
                </div>

                <div className={styles.popupContent}>
                    <h3 className={styles.popupTitle}>Members Only</h3>
                    <p className={styles.popupDesc}>
                        The Store is exclusive to health.pro members.<br />
                        Log in or create a free account to unlock access.
                    </p>
                </div>

                <div className={styles.popupActions}>
                    <Link href="/login" onClick={handleClose}>
                        <button className={styles.popupSecondary}>Log In</button>
                    </Link>
                    <Link href="/signup" onClick={handleClose}>
                        <button className={styles.popupPrimary}>
                            Join Free <ArrowRight size={15} />
                        </button>
                    </Link>
                </div>

                {/* Progress bar auto-close indicator */}
                <div className={styles.popupTimer}>
                    <div className={`${styles.popupTimerBar} ${visible ? styles.popupTimerRunning : ''}`} />
                </div>
            </div>
        </>
    );
}

// ══════════════════════════════════════════════════════════
// NAVBAR
// ══════════════════════════════════════════════════════════
export function Navbar() {
    const [isScrolled,       setIsScrolled]       = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showPopup,        setShowPopup]        = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (pathname.startsWith('/dashboard')) return null;

    const isLoggedIn = false; // 🔁 Replace with your real auth check

    function handleProtectedClick(e: React.MouseEvent, isProtected?: boolean) {
        if (isProtected && !isLoggedIn) {
            e.preventDefault();
            setShowPopup(true);
            setIsMobileMenuOpen(false);
        }
    }

    return (
        <>
            <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <Link href="/" className={styles.logoLink}>
                            <Logo variant="full" size={32} />
                        </Link>
                    </div>

                    <div className={styles.center}>
                        {navLinks.map((link, i) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`${styles.navLink} ${link.protected ? styles.navLinkProtected : ''}`}
                                style={{ animationDelay: `${i * 60}ms` }}
                                onClick={(e) => handleProtectedClick(e, link.protected)}
                            >
                                {link.label}
                                {link.protected && <Lock size={11} className={styles.navLinkIcon} />}
                            </Link>
                        ))}
                    </div>

                    <div className={styles.right}>
                        <Link href="/login" className={styles.loginLink}>Log In</Link>
                        <Link href="/signup">
                            <Button variant="primary" size="md" className={styles.cta}>
                                Join Now <ArrowRight size={16} />
                            </Button>
                        </Link>
                        <button
                            className={styles.mobileToggle}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                    <div className={styles.mobileLinks}>
                        {navLinks.map((link, i) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`${styles.mobileLink} ${isMobileMenuOpen ? styles.mobileLinkVisible : ''}`}
                                style={{ transitionDelay: isMobileMenuOpen ? `${i * 70 + 100}ms` : '0ms' }}
                                onClick={(e) => {
                                    handleProtectedClick(e, link.protected);
                                    if (!link.protected || isLoggedIn) setIsMobileMenuOpen(false);
                                }}
                            >
                                {link.label}
                                {link.protected && <Lock size={14} style={{ marginLeft: 8, opacity: 0.5 }} />}
                            </Link>
                        ))}
                        <div className={styles.mobileDivider} />
                        <Link
                            href="/login"
                            className={`${styles.mobileLink} ${isMobileMenuOpen ? styles.mobileLinkVisible : ''}`}
                            style={{ transitionDelay: isMobileMenuOpen ? '380ms' : '0ms' }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Log In
                        </Link>
                        <div
                            className={`${styles.mobileCta} ${isMobileMenuOpen ? styles.mobileLinkVisible : ''}`}
                            style={{ transitionDelay: isMobileMenuOpen ? '450ms' : '0ms' }}
                        >
                            <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="primary" fullWidth size="lg">Join Now</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Login Required Popup */}
            {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}
        </>
    );
}