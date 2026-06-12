import type { Metadata, Viewport } from 'next';
import { Syne, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';

// Mobile perf — only load weights actually used in the codebase (8 excess variants dropped)
const syne = Syne({
  subsets: ['latin'],
  weight: ['800'],          // headings only (globals.css: font-weight: 800)
  variable: '--font-syne',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // body / semibold / bold
  variable: '--font-dm-sans',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],          // monospace labels only
  variable: '--font-dm-mono',
});

export const metadata: Metadata = {
  title: 'GalateIA - Automatización e Infraestructura Operativa',
  description: 'Sistema operativo de retención de pacientes con agentes de IA',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="bg-dark text-white overflow-x-hidden">{children}</body>
    </html>
  );
}
