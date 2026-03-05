'use client';

import React, { useState } from 'react';
import { Shield, Check, CreditCard, Calendar, Zap, AlertCircle, CheckCircle2, Loader2, Crown, Star } from 'lucide-react';
import styles from './Membership.module.css';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/Button';
import { useLanguage } from '@/lib/language-context';

export default function MembershipPage() {
    const { user, updateMetadata } = useAuth();
    const { t } = useLanguage();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
    const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const plan = user?.user_metadata?.plan || 'Free';
    const isFree = plan === 'Free';
    const isPro = plan === 'Pro';
    const isElite = plan === 'Elite';

    const showToast = (type: 'success' | 'error', message: string) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3500);
    };

    const handleUpgrade = async (newPlan: 'Pro' | 'Elite') => {
        setLoadingPlan(newPlan);
        try {
            await new Promise(r => setTimeout(r, 1500));
            await updateMetadata({ plan: newPlan });
            showToast('success', `Successfully upgraded to ${newPlan} Plan!`);
        } catch {
            showToast('error', 'Payment failed. Please try again.');
        } finally {
            setLoadingPlan(null);
        }
    };

    const handleCancel = async () => {
        setLoadingPlan('Cancel');
        try {
            await new Promise(r => setTimeout(r, 1000));
            await updateMetadata({ plan: 'Free' });
            showToast('success', 'Subscription cancelled successfully.');
            setShowCancelModal(false);
        } catch {
            showToast('error', 'Failed to cancel subscription.');
        } finally {
            setLoadingPlan(null);
        }
    };

    const getPlanIcon = () => {
        if (isElite) return <Crown size={40} className={styles.planIcon} />;
        if (isPro) return <Star size={40} className={styles.planIcon} />;
        return <Shield size={40} className={styles.planIcon} />;
    };

    return (
        <div className={styles.container}>
            {/* Toast Notification */}
            {toast && (
                <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
                    {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <span>{toast.message}</span>
                </div>
            )}

            {/* Cancel Modal */}
            {showCancelModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3 className={styles.modalTitle}>Cancel Subscription?</h3>
                        <p className={styles.modalText}>
                            Are you sure you want to cancel your <strong>{plan}</strong> plan? You will lose access to premium features immediately.
                        </p>
                        <div className={styles.modalActions}>
                            <Button variant="outline" onClick={() => setShowCancelModal(false)}>Keep Plan</Button>
                            <Button
                                variant="primary"
                                className={styles.cancelConfirmBtn}
                                onClick={handleCancel}
                                disabled={loadingPlan !== null}
                            >
                                {loadingPlan === 'Cancel' ? <Loader2 size={16} className={styles.spin} /> : 'Yes, Cancel'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header — "Pass" is white, "Membership" is white too */}
            <header className={styles.header}>
                <h1 className={styles.title}>
                    <span className={styles.titleWhite}>Pass</span>{' '}
                    <span className={styles.titleWhite}>Membership</span>
                </h1>
                <p className={styles.subtitle}>{t.memberSubtitle || 'Manage your subscription and billing details.'}</p>
            </header>

            <div className={styles.mainGrid}>
                {/* Current Plan Card */}
                <div className={`${styles.currentPlan} ${isFree ? styles.freePlan : isElite ? styles.elitePlan : styles.proPlan}`}>
                    {/* Decorative glow orbs */}
                    <div className={styles.glowOrb1} />
                    <div className={styles.glowOrb2} />

                    <div className={styles.planHeader}>
                        <div>
                            <span className={styles.badge}>
                                {isFree ? 'TIER 1' : isElite ? 'TIER 3 — ELITE' : 'TIER 2 — PRO'}
                            </span>
                            <h2 className={styles.planName}>{plan} Access</h2>
                        </div>
                        {getPlanIcon()}
                    </div>

                    <div className={styles.planDetails}>
                        {isFree ? (
                            <p className={styles.planMessage}>{t.memberFreeMsg || 'Upgrade to unlock premium features, unlimited access, and priority support.'}</p>
                        ) : (
                            <>
                                <div className={styles.detailItem}>
                                    <Calendar size={18} />
                                    <span>{t.memberBilling || 'Next billing date:'} <strong>March 24, 2026</strong></span>
                                </div>
                                <div className={styles.detailItem}>
                                    <CreditCard size={18} />
                                    <span>{t.memberPayment || 'Payment method:'} <strong>•••• 8821</strong></span>
                                </div>
                            </>
                        )}
                    </div>

                    <div className={styles.planActions}>
                        {isFree ? (
                            <Button variant="primary" onClick={() => handleUpgrade('Pro')} disabled={loadingPlan !== null}>
                                {loadingPlan === 'Pro' ? <Loader2 size={16} className={styles.spin} /> : 'Become a Pro Member'}
                            </Button>
                        ) : (
                            <>
                                <Button variant="outline" className={styles.actionBtn}>{t.memberUpgrade || 'Update Payment'}</Button>
                                <Button variant="ghost" className={styles.cancelBtn} onClick={() => setShowCancelModal(true)}>
                                    {t.memberCancel || 'Cancel Subscription'}
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Benefits Card */}
                <div className={styles.benefitsCard}>
                    <h3 className={styles.benefitsTitle}>{t.memberBenefits || 'Your Member Benefits'}</h3>
                    <ul className={styles.benefitList}>
                        {[
                            t.memberBenefit1 || 'Unlimited Gym Partner Access',
                            t.memberBenefit2 || 'AI Workout Generator (Unlimited)',
                            t.memberBenefit3 || '15% Store Discount',
                            t.memberBenefit4 || 'Advanced Progress Analytics',
                            t.memberBenefit5 || 'Priority Class Booking',
                        ].map((benefit, i) => (
                            <li key={i} className={styles.benefitItem}>
                                <div className={styles.check}><Check size={14} /></div>
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Plan tier indicator */}
                    <div className={styles.tierBar}>
                        <div className={`${styles.tierStep} ${styles.tierActive}`}>Free</div>
                        <div className={`${styles.tierStep} ${(isPro || isElite) ? styles.tierActive : ''}`}>Pro</div>
                        <div className={`${styles.tierStep} ${isElite ? styles.tierActive : ''}`}>Elite</div>
                    </div>
                </div>
            </div>

            {/* Elite Upgrade Banner */}
            {!isElite && (
                <section className={styles.upgradeSection}>
                    <div className={styles.upgradeGlow} />
                    <div className={styles.upgradeContent}>
                        <div className={styles.upgradeIconWrap}>
                            <Zap size={24} />
                        </div>
                        <div>
                            <h4>{t.memberEliteTitle || 'Unlock Elite Access'}</h4>
                            <p>{t.memberEliteDesc || 'Get the full health.pro experience with all premium features.'}</p>
                        </div>
                    </div>
                    <Button variant="primary" className={styles.eliteBtn} onClick={() => handleUpgrade('Elite')} disabled={loadingPlan !== null}>
                        {loadingPlan === 'Elite' ? <Loader2 size={16} className={styles.spin} /> : (t.memberViewPlans || 'Upgrade to Elite')}
                    </Button>
                </section>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slideInRight {
                    from { transform: translateX(80px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes fadeUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            `}} />
        </div>
    );
}