'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './signin.module.css';

interface FormData {
  email: string;
  password: string;
  remember: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = ({ hidden }: { hidden: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {hidden ? <>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </> : <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </>}
  </svg>
);

const GoogleIcon = () => (
  <svg className={styles.googleIcon} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default function SignInPage() {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    setFormData(previous => ({ ...previous, [name]: type === 'checkbox' ? checked : value }));
    setErrors(previous => ({ ...previous, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!formData.email.trim()) nextErrors.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'Please enter a valid email address';
    if (!formData.password) nextErrors.password = 'Password is required';
    setErrors(nextErrors);
    setTouched({ email: true, password: true });
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowSuccess(true);
  };

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.visualPanel} aria-hidden="true">
        <div className={styles.visualTint} />
        <div className={styles.visualContent}>
          <span className={styles.kicker}>WELCOME BACK TO NEXUS</span>
          <h2>Your next<br /><em>discovery</em> awaits.</h2>
          <p>Pick up where you left off and keep exploring a marketplace built for curious minds.</p>
          <div className={styles.visualRule} />
          <span className={styles.visualMeta}>CURATED. SECURE. DISTINCTLY YOURS.</span>
        </div>
      </section>

      <main className={styles.formPanel}>
        <div className={styles.formContainer}>
          <header className={styles.brandSection}>
            <Link href="/" className={styles.brandLogo} aria-label="NEXUS home">
              <Image src="/logo.png" alt="" width={38} height={38} className={styles.logoImg} priority />
              <span>NEXUS</span>
            </Link>
            <h1>Welcome back</h1>
            <p>Sign in to continue your NEXUS journey</p>
          </header>

          <div className={styles.formCard}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.inputGroup}>
                <label htmlFor="signin-email">Email Address</label>
                <div className={`${styles.inputWrapper} ${errors.email && touched.email ? styles.inputError : ''}`}>
                  <span className={styles.inputIcon}><MailIcon /></span>
                  <input id="signin-email" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} onBlur={() => setTouched(previous => ({ ...previous, email: true }))} autoComplete="email" />
                </div>
                {errors.email && touched.email && <span className={styles.errorMessage}>{errors.email}</span>}
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <label htmlFor="signin-password">Password</label>
                  <Link href="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
                </div>
                <div className={`${styles.inputWrapper} ${errors.password && touched.password ? styles.inputError : ''}`}>
                  <span className={styles.inputIcon}><LockIcon /></span>
                  <input id="signin-password" type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} onBlur={() => setTouched(previous => ({ ...previous, password: true }))} autoComplete="current-password" />
                  <button type="button" className={styles.passwordToggle} onClick={() => setShowPassword(previous => !previous)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    <EyeIcon hidden={showPassword} />
                  </button>
                </div>
                {errors.password && touched.password && <span className={styles.errorMessage}>{errors.password}</span>}
              </div>

              <label className={styles.rememberRow}>
                <input type="checkbox" name="remember" checked={formData.remember} onChange={handleChange} />
                <span className={styles.checkboxCustom} aria-hidden="true" />
                <span>Remember me</span>
              </label>

              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? <><span className={styles.loader} /> Signing in...</> : 'Sign In'}
              </button>

              <div className={styles.divider}><span /> <small>or continue with</small> <span /></div>
              <button type="button" className={styles.googleButton}><GoogleIcon /> Continue with Google</button>
            </form>
          </div>

          <p className={styles.footerLink}>New to NEXUS? <Link href="/signup">Create an account</Link></p>
        </div>
      </main>

      {showSuccess && (
        <div className={styles.successOverlay} role="dialog" aria-modal="true" aria-labelledby="signin-success-title" onClick={() => setShowSuccess(false)}>
          <div className={styles.successCard} onClick={event => event.stopPropagation()}>
            <div className={styles.successIcon}>✓</div>
            <h2 id="signin-success-title">You&apos;re signed in</h2>
            <p>Welcome back to NEXUS. Your account is ready to explore.</p>
            <Link href="/" className={styles.successButton}>Continue shopping</Link>
          </div>
        </div>
      )}
    </div>
  );
}
