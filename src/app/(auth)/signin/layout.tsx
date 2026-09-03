import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Sign In | NEXUS - Premium Futuristic Marketplace',
  description: 'Sign in to your NEXUS account and continue exploring extraordinary products.',
};

export default function SignInLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}