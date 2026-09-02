import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';

export const metadata: Metadata = {
  title: 'Nexus | Premium Futuristic Marketplace',
  description: 'A scalable, original, multi-vendor e-commerce marketplace ecosystem.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Navbar />
        <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
