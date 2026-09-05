'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './forgot-password.module.css';
import { useAuth } from '@/context/AuthContext';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const { error } = await resetPassword(email.trim());
    setIsLoading(false);

    if (error) {
      setMessage({ type: 'error', text: error });
    } else {
      setMessage({
        type: 'success',
        text: 'If an account exists with that email, a password reset link has been sent. Please check your inbox.',
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Link href="/" className={styles.brand}>
          <Image src="/logo.png" alt="Nexus Logo" width={32} height={32} />
          <span>NEXUS</span>
        </Link>

        <h1 className={styles.title}>Reset Password</h1>
        <p className={styles.subtitle}>
          Enter your account email and we will send you a link to reset your password.
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
            <label htmlFor="reset-email" className={styles.label}>
              Email Address
            </label>
            <input
              id="reset-email"
              type="email"
              className={styles.input}
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Sending Link...' : 'Send Reset Link'}
          </button>
        </form>

        <Link href="/signin" className={styles.backLink}>
          ← Back to Sign In
        </Link>
      </div>
    </div>
  );
}
