'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Home, Dumbbell, BookOpen, Calendar, ShoppingBag,
    PieChart, Settings, LogOut, Menu, X, CreditCard
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import styles from './Sidebar.module.css';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';

export function DashboardSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { user, signOut } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();

    const navItems = [
        { icon: <Home size={20} />, label: t.navHome, href: '/dashboard' },
        { icon: <Calendar size={20} />, label: t.navFitness, href: '/dashboard/fitness' },
        { icon: <BookOpen size={20} />, label: t.navExercises, href: '/dashboard/exercises' },
        { icon: <PieChart size={20} />, label: t.navProgress, href: '/dashboard/progress' },
        { icon: <ShoppingBag size={20} />, label: t.navStore, href: '/dashboard/store' },
        { icon: <CreditCard size={20} />, label: t.navMembership, href: '/dashboard/membership' },
        { icon: <Settings size={20} />, label: t.navSettings, href: '/dashboard/settings' },
    ];

    const handleSignOut = async () => {
        await signOut();
        router.push('/login');
    };

    return (
        <>
            <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}

            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.top}>
                    <Logo variant="compact" size={32} />
                </div>

                <nav className={styles.nav}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {isActive && <div className={styles.indicator} />}
                                <span className={styles.iconWrapper}>{item.icon}</span>
                                <span className={styles.label}>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className={styles.bottom}>
                    <div className={styles.userProfile}>
                        <div className={styles.avatar}>
                            {user?.user_metadata?.avatar_url
                                ? <img src={user.user_metadata.avatar_url} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                                : user?.user_metadata?.full_name?.charAt(0) || 'U'
                            }
                        </div>
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>{user?.user_metadata?.full_name || 'User'}</span>
                            <span className={styles.userPlan}>{user?.user_metadata?.plan || 'Free'} Plan</span>
                        </div>
                    </div>
                    <button className={styles.logoutButton} onClick={handleSignOut}>
                        <LogOut size={18} />
                        <span>{t.navSettings === 'Settings' ? 'Log Out' : '🚪'}</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
