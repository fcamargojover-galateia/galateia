import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GalateIA - Timeline 3D',
  description: 'Timeline 3D Corkscrew effect - Interactive spiral visualization',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
