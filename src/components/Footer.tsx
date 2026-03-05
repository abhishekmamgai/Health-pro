import React from 'react';
import styles from './Footer.module.css';
import { Logo } from './Logo';
import { Instagram, Youtube, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';

export const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.brandCol}>
                        <Logo variant="full" size={40} className={styles.logo} />
                        <p className={styles.tagline}>
                            health.pro is India's most advanced fitness & wellness supersystem.
                            Built for high-performance living.
                        </p>
                        <div className={styles.socials}>
                            <Link href="#" className={styles.socialLink}><Instagram size={20} /></Link>
                            <Link href="#" className={styles.socialLink}><Youtube size={20} /></Link>
                            <Link href="#" className={styles.socialLink}><Twitter size={20} /></Link>
                            <Link href="#" className={styles.socialLink}><Facebook size={20} /></Link>
                        </div>
                    </div>

                    <div className={styles.linksCol}>
                        <h4 className={styles.colTitle}>Platform</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="#features" className={styles.link}>Features</Link></li>
                            <li><Link href="#pricing" className={styles.link}>Pricing</Link></li>
                            <li><Link href="/login" className={styles.link}>Member Login</Link></li>
                            <li><Link href="/store" className={styles.link}>Wellness Store</Link></li>
                        </ul>
                    </div>

                    <div className={styles.linksCol}>
                        <h4 className={styles.colTitle}>Support</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="#" className={styles.link}>Help Center</Link></li>
                            <li><Link href="#" className={styles.link}>Gym Partners</Link></li>
                            <li><Link href="#" className={styles.link}>Privacy Policy</Link></li>
                            <li><Link href="#" className={styles.link}>Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.footerLine} />
                    <div className={styles.bottomContent}>
                        <p className={styles.copyright}>© 2026 Health.pro. All Rights Reserved. Developed by ASK Tech. Crafted with ❤️ in India.</p>
                        <div className={styles.location}>Headquartered in Gurugram & New Delhi, India</div>
                    </div>
                </div>
            </div>
        </footer>
    );
};