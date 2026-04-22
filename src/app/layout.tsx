import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// Separated from metadata
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Axis Legacy',
  description: 'AI-powered image transformation tools',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
