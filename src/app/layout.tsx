import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/Header'; // 1. Import the Header

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-black text-white`}>
        <Header /> {/* 2. Add the Header here */}
        <main className="pt-16 min-h-screen"> 
          {children}
        </main>
      </body>
    </html>
  );
}