'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../forgot-password/forgot-password.module.css';
import { createClient } from '@/lib/supabase/client';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long.' });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });

      setIsLoading(false);

      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({
          type: 'success',
          text: 'Password updated successfully! Redirecting to sign in...',
        });
        setTimeout(() => {
          router.push('/signin');
        }, 2000);
      }
    } catch (err: any) {
      setIsLoading(false);
      setMessage({ type: 'error', text: err?.message || 'Failed to update password' });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Link href="/" className={styles.brand}>
          <Image src="/logo.png" alt="Nexus Logo" width={32} height={32} />
          <span>NEXUS</span>
        </Link>

        <h1 className={styles.title}>New Password</h1>
        <p className={styles.subtitle}>
          Create a new, strong password for your account.
        </p>

        {message && (
          <div
            className={`${styles.alert} ${
              message.type === 'error' ? styles.errorAlert : styles.successAlert
            }`}
          >
            {message.type === 'error' ? '⚠️ ' : '✅ '}
            {message.text}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="new-password" className={styles.label}>
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              className={styles.input}
              placeholder="At least 8 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirm-new-password" className={styles.label}>
              Confirm New Password
            </label>
            <input
              id="confirm-new-password"
              type="password"
              className={styles.input}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>

        <Link href="/signin" className={styles.backLink}>
          ← Back to Sign In
        </Link>
      </div>
    </div>
  );
}
