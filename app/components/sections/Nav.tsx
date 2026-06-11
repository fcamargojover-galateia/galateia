export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-dark/80 backdrop-blur-md border-b border-gray-700 z-50 flex items-center justify-between px-8">
      <div className="text-2xl font-bold text-cyan">GalateIA</div>
      <div className="flex gap-8 text-sm">
        <a href="#hero" className="hover:text-cyan transition">Inicio</a>
        <a href="#agents" className="hover:text-cyan transition">Agentes</a>
        <a href="#pricing" className="hover:text-cyan transition">Precios</a>
        <a href="#faq" className="hover:text-cyan transition">FAQ</a>
      </div>
      <button
        aria-label="Agendar diagnóstico operativo"
        className="px-6 py-2 bg-cyan text-dark rounded font-semibold hover:bg-white transition cursor-pointer"
      >
        Diagnóstico
      </button>
    </nav>
  );
}
