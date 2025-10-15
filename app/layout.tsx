import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AGM Black Lion Security Systems LTD | Professional Security Solutions in Cyprus',
  description: 'AGM BlackLion Security Systems – a professional organization providing home and business protection in Cyprus. CCTV, Alarm Systems, Access Control, Networking, Electrical Installations, and Solar Solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
