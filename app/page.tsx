import Nav from '@components/sections/Nav';
import Hero from '@components/sections/Hero';
import Calculator from '@components/sections/Calculator';
import Agents from '@components/sections/Agents';
import Social from '@components/sections/Social';
import Pricing from '@components/sections/Pricing';
import FAQ from '@components/sections/FAQ';
import FinalCTA from '@components/sections/FinalCTA';
import dynamic from 'next/dynamic';

// TBT — lazy-load heavy 3D bundle (Three.js + R3F + GSAP) out of the critical path
const Timeline3D = dynamic(() => import('@components/sections/Timeline3D'), {
  ssr: false,
  // CLS — skeleton matches the exact inline height used by the real component (600vh)
  loading: () => <div style={{ width: '100%', height: '600vh', background: 'var(--dark)' }} />,
});

// TBT — defer particle canvas so it doesn't block initial parse/paint
const ParticleBackground = dynamic(() => import('@components/ambient/ParticleBackground'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <div className="relative w-full">
      <ParticleBackground />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Calculator />
        <Agents />
        <Timeline3D />
        <Social />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
    </div>
  );
}
