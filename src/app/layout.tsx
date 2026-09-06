import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ehtisham | Full-Stack MERN Developer',
  description:
    'A full-stack modern portfolio with a secure dashboard to view and manage client messages, responsive design, and light/dark theme toggle.',
  openGraph: {
    title: 'Ehtisham | Full-Stack MERN Developer',
    description:
      'A full-stack modern portfolio with a secure dashboard to view and manage client messages, responsive design, and light/dark theme toggle.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
