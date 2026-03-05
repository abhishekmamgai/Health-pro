'use client';

import React, { useState } from 'react';
import { AuthLayout } from '@/components/AuthLayout';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [localLoading, setLocalLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { signUp } = useAuth();
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalLoading(true);
        setError(null);

        try {
            await signUp(email, password, fullName);
            router.push('/dashboard/onboarding');
        } catch (err: any) {
            setError(err.message || 'Error occurred during signup');
            setLocalLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join the health.pro community"
            alternateAction={{
                text: "Already have an account?",
                linkText: "Log In",
                href: "/login",
            }}
        >
            <form onSubmit={handleSignup}>
                {error && (
                    <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '24px', fontSize: '14px', border: '1px solid var(--color-error)' }}>
                        {error}
                    </div>
                )}

                <Input
                    label="Full Name"
                    type="text"
                    placeholder="e.g. Arjun Singh"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="e.g. arjun@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <p style={{ fontSize: '12px', color: 'var(--color-text-light)', margin: '16px 0 24px' }}>
                    By signing up, you agree to our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
                </p>

                <Button variant="primary" fullWidth type="submit" disabled={localLoading}>
                    {localLoading ? 'Creating Account...' : 'Get Started Free'}
                </Button>
            </form>
        </AuthLayout>
    );
}
