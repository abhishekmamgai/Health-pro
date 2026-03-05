'use client';

import React, { useState } from 'react';
import { AuthLayout } from '@/components/AuthLayout';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);
    setError(null);

    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
      setLocalLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Log In"
      subtitle="Welcome back to health.pro"
      alternateAction={{
        text: "Don't have an account?",
        linkText: "Sign Up Free",
        href: "/signup",
      }}
    >
      <form onSubmit={handleLogin}>
        {error && (
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: 'var(--color-error)',
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '24px',
              fontSize: '14px',
              border: '1px solid var(--color-error)',
            }}
          >
            {error}
          </div>
        )}

        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. you@example.com"
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

        <div
          style={{
            textAlign: 'right',
            marginTop: '-12px',
            marginBottom: '24px',
          }}
        >
          <Link
            href="/forgot-password"
            style={{
              fontSize: '14px',
              color: 'var(--color-primary)',
              textDecoration: 'none',
            }}
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          variant="primary"
          fullWidth
          type="submit"
          disabled={localLoading}
        >
          {localLoading ? 'Authenticating...' : 'Log In'}
        </Button>
      </form>
    </AuthLayout>
  );
}

