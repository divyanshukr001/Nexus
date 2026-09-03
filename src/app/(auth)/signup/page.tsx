'use client';

import { useState, useCallback, type FormEvent, type ChangeEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './signup.module.css';

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
}

type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */
function getPasswordStrength(password: string): { level: PasswordStrength; score: number; label: string } {
  if (!password) return { level: 'weak', score: 0, label: '' };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { level: 'weak', score: 1, label: 'Weak' };
  if (score <= 3) return { level: 'fair', score: 2, label: 'Fair' };
  if (score <= 4) return { level: 'good', score: 3, label: 'Good' };
  return { level: 'strong', score: 4, label: 'Strong' };
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^[\d\s\-+()]{7,15}$/.test(phone);
}

/* ──────────────────────────────────────────────
   SVG Icon Components
   ────────────────────────────────────────────── */
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const GoogleIcon = () => (
  <svg className={styles.googleIcon} viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const SuccessCheckIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */
export default function SignUpPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const passwordStrength = getPasswordStrength(formData.password);

  /* ── Field Change Handler ── */
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  /* ── Blur Handler (field-level validation) ── */
  const handleBlur = useCallback((fieldName: string) => {
    setFocusedField(null);
    setTouchedFields(prev => new Set(prev).add(fieldName));

    const newErrors: FormErrors = {};

    switch (fieldName) {
      case 'fullName':
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        else if (formData.fullName.trim().length < 2) newErrors.fullName = 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!formData.email.trim()) newErrors.email = 'Email address is required';
        else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address';
        break;
      case 'phone':
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!validatePhone(formData.phone)) newErrors.phone = 'Please enter a valid phone number';
        break;
      case 'password':
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        break;
      case 'confirmPassword':
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        break;
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
  }, [formData]);

  /* ── Full Form Validation ── */
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (formData.fullName.trim().length < 2) newErrors.fullName = 'Name must be at least 2 characters';

    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!validatePhone(formData.phone)) newErrors.phone = 'Please enter a valid phone number';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the Terms & Conditions';

    setErrors(newErrors);
    setTouchedFields(new Set(['fullName', 'email', 'phone', 'password', 'confirmPassword', 'agreeTerms']));
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  /* ── Submit Handler ── */
  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    setShowSuccess(true);
  }, [validateForm]);

  /* ── Helper: get input group class ── */
  const getInputGroupClass = (fieldName: string) => {
    const classes = [styles.inputGroup];
    if (focusedField === fieldName) classes.push(styles.inputFocused);
    if (errors[fieldName as keyof FormErrors] && touchedFields.has(fieldName)) classes.push(styles.inputError);
    if (touchedFields.has(fieldName) && !errors[fieldName as keyof FormErrors] && formData[fieldName as keyof FormData]) classes.push(styles.inputSuccess);
    return classes.join(' ');
  };

  return (
    <div className={styles.pageWrapper}>
      {/* ────────── Left Visual Panel (Desktop only) ────────── */}
      <div className={styles.visualPanel}>
        <div className={styles.floatingShapes}>
          <div className={`${styles.shape} ${styles.shape1}`} />
          <div className={`${styles.shape} ${styles.shape2}`} />
          <div className={`${styles.shape} ${styles.shape3}`} />
          <div className={`${styles.shape} ${styles.shape4}`} />
        </div>
        <div className={styles.visualOverlay} />

        <div className={styles.visualContent}>
          <div className={styles.visualLogo}>NEXUS</div>
          <h2 className={styles.visualHeading}>
            Your Premium Shopping<br />Experience Starts Here
          </h2>
          <p className={styles.visualSubtext}>
            Join thousands of shoppers who trust NEXUS for extraordinary products, seamless checkout, and fast delivery.
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>🚀</span>
              Free express shipping on first order
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>🔒</span>
              100% secure payments & data protection
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>💎</span>
              Exclusive member-only deals & rewards
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>↩️</span>
              Hassle-free 30-day return policy
            </div>
          </div>
        </div>
      </div>

      {/* ────────── Right Form Panel ────────── */}
      <div className={styles.formPanel}>
        <div className={styles.formContainer}>
          {/* Brand */}
          <div className={styles.brandSection}>
            <div className={styles.brandLogo}>
              <Image
                src="/logo.png"
                alt="Nexus Logo"
                width={40}
                height={40}
                className={styles.logoImg}
                priority
              />
              <span className={styles.brandName}>NEXUS</span>
            </div>
            <h1 className={styles.formTitle}>Create your account</h1>
            <p className={styles.formSubtitle}>Join NEXUS and start shopping today</p>
          </div>

          {/* Form Card */}
          <div className={styles.formCard}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>

              {/* Full Name */}
              <div className={getInputGroupClass('fullName')}>
                <label className={styles.inputLabel} htmlFor="signup-fullname">
                  Full Name
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}><UserIcon /></span>
                  <input
                    id="signup-fullname"
                    className={styles.input}
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => handleBlur('fullName')}
                    autoComplete="name"
                  />
                </div>
                {errors.fullName && touchedFields.has('fullName') && (
                  <span className={styles.errorMessage}>
                    <span className={styles.errorDot} />
                    {errors.fullName}
                  </span>
                )}
              </div>

              {/* Email & Phone Row */}
              <div className={styles.inputRow}>
                {/* Email */}
                <div className={getInputGroupClass('email')}>
                  <label className={styles.inputLabel} htmlFor="signup-email">
                    Email Address
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}><MailIcon /></span>
                    <input
                      id="signup-email"
                      className={styles.input}
                      type="email"
                      name="email"
                      placeholder="john@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => handleBlur('email')}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && touchedFields.has('email') && (
                    <span className={styles.errorMessage}>
                      <span className={styles.errorDot} />
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className={getInputGroupClass('phone')}>
                  <label className={styles.inputLabel} htmlFor="signup-phone">
                    Phone Number
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}><PhoneIcon /></span>
                    <input
                      id="signup-phone"
                      className={styles.input}
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => handleBlur('phone')}
                      autoComplete="tel"
                    />
                  </div>
                  {errors.phone && touchedFields.has('phone') && (
                    <span className={styles.errorMessage}>
                      <span className={styles.errorDot} />
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className={getInputGroupClass('password')}>
                <label className={styles.inputLabel} htmlFor="signup-password">
                  Password
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}><LockIcon /></span>
                  <input
                    id="signup-password"
                    className={styles.input}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => handleBlur('password')}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.password && touchedFields.has('password') && (
                  <span className={styles.errorMessage}>
                    <span className={styles.errorDot} />
                    {errors.password}
                  </span>
                )}
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className={`${styles.strengthContainer} ${styles[`strength${passwordStrength.level.charAt(0).toUpperCase() + passwordStrength.level.slice(1)}` as keyof typeof styles]}`}>
                    <div className={styles.strengthBar}>
                      {[1, 2, 3, 4].map(i => (
                        <div
                          key={i}
                          className={`${styles.strengthSegment} ${i <= passwordStrength.score ? styles.active : ''}`}
                        />
                      ))}
                    </div>
                    <span className={styles.strengthLabel}>{passwordStrength.label}</span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className={getInputGroupClass('confirmPassword')}>
                <label className={styles.inputLabel} htmlFor="signup-confirm-password">
                  Confirm Password
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}><LockIcon /></span>
                  <input
                    id="signup-confirm-password"
                    className={styles.input}
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => handleBlur('confirmPassword')}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowConfirmPassword(v => !v)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.confirmPassword && touchedFields.has('confirmPassword') && (
                  <span className={styles.errorMessage}>
                    <span className={styles.errorDot} />
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className={errors.agreeTerms ? styles.checkboxError : ''}>
                <label className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className={styles.checkboxInput}
                  />
                  <span className={styles.checkboxCustom}>
                    {formData.agreeTerms && <CheckIcon />}
                  </span>
                  <span className={styles.checkboxLabel}>
                    I agree to the{' '}
                    <Link href="/terms" className={styles.checkboxLink}>Terms &amp; Conditions</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className={styles.checkboxLink}>Privacy Policy</Link>
                  </span>
                </label>
                {errors.agreeTerms && (
                  <span className={styles.errorMessage} style={{ marginTop: '4px', marginLeft: '28px' }}>
                    <span className={styles.errorDot} />
                    {errors.agreeTerms}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
                id="signup-submit"
              >
                {isLoading ? (
                  <>
                    <span className={styles.buttonLoader} />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Divider */}
              <div className={styles.divider}>
                <span className={styles.dividerLine} />
                <span className={styles.dividerText}>or continue with</span>
                <span className={styles.dividerLine} />
              </div>

              {/* Google Button */}
              <button
                type="button"
                className={styles.googleButton}
                id="signup-google"
              >
                <GoogleIcon />
                Sign up with Google
              </button>
            </form>
          </div>

          {/* Footer link */}
          <p className={styles.footerLink}>
            Already have an account?
            <Link href="/signin" className={styles.signInLink}>
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* ────────── Success Modal ────────── */}
      {showSuccess && (
        <div className={styles.successOverlay} onClick={() => setShowSuccess(false)}>
          <div className={styles.successCard} onClick={e => e.stopPropagation()}>
            <div className={styles.successIcon}>
              <SuccessCheckIcon />
            </div>
            <h3 className={styles.successTitle}>Account Created!</h3>
            <p className={styles.successText}>
              Welcome to NEXUS! Your account has been created successfully.
              Get ready to explore extraordinary products.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
