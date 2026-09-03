import '../globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Sign Up | NEXUS - Premium Futuristic Marketplace',
  description: 'Create your NEXUS account and start shopping for extraordinary products today.',
};

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
