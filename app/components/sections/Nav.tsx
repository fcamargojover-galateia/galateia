'use client';

const CAL_URL = 'https://cal.com/galateia/diagnostico-operativo-15-minutos';

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-dark/80 backdrop-blur-md border-b border-gray-700 z-50 flex items-center justify-between px-8">
      <div className="text-2xl font-bold text-cyan">GalateIA</div>
      <div className="hidden sm:flex gap-8 text-sm">
        <a href="#hero" className="hover:text-cyan transition">Inicio</a>
        <a href="#agents" className="hover:text-cyan transition">Agentes</a>
        <a href="#pricing" className="hover:text-cyan transition">Inversión</a>
        <a href="#faq" className="hover:text-cyan transition">FAQ</a>
      </div>
      <button
        aria-label="Agendar diagnóstico operativo"
        onClick={() => window.open(CAL_URL, '_blank', 'noopener,noreferrer')}
        className="px-6 py-2 bg-cyan text-dark rounded font-semibold hover:bg-white active:scale-95 transition-all cursor-pointer"
      >
        Diagnóstico
      </button>
    </nav>
  );
}
