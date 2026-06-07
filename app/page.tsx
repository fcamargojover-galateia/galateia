import Nav from '@components/sections/Nav';
import Hero from '@components/sections/Hero';
import Calculator from '@components/sections/Calculator';
import Agents from '@components/sections/Agents';
import Timeline3D from '@components/sections/Timeline3D';
import Social from '@components/sections/Social';
import Pricing from '@components/sections/Pricing';
import FAQ from '@components/sections/FAQ';
import FinalCTA from '@components/sections/FinalCTA';
import ParticleBackground from '@components/ambient/ParticleBackground';

export default function Home() {
  return (
    <div className="relative w-full">
      {/* Background de partículas */}
      <ParticleBackground />

      {/* Navegación fija */}
      <Nav />

      {/* Secciones */}
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
