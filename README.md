# GalateIA Timeline 3D - Corkscrew Effect

Timeline 3D inmersivo con efecto "sacacorchos" controlado por scroll del usuario, construido con Next.js, React Three Fiber y GSAP.

## 🎯 Características

- ✅ Efecto 3D de "sacacorchos" sincronizado con scroll
- ✅ Cámara estática, espiral rotante
- ✅ Suavizado fluido con `damp()` (como mantequilla)
- ✅ GSAP ScrollTrigger para control preciso
- ✅ Matemáticas cilíndricas para posicionamiento de nodos
- ✅ 60fps en dispositivos modernos
- ✅ Responsive (desktop y mobile)
- ✅ Accesibilidad (respeta prefers-reduced-motion)

## 🚀 Quick Start

### Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/fcamargojover-galateia/galateia.git
cd galateia

# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Deploy en Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fcamargojover-galateia/galateia)

## 📁 Estructura del Proyecto

```
.
├── app/
│   ├── page.tsx                 # Página principal
│   ├── layout.tsx               # Layout global
│   ├── globals.css              # Estilos globales
│   └── components/
│       ├── TimelineCanvas.tsx   # Canvas R3F wrapper
│       └── TimelineScene.tsx    # Lógica de la espiral
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🎨 Customización

### Cambiar número de hitos

En `app/components/TimelineScene.tsx`:

```typescript
const NODES_COUNT = 6; // De 4 a 6 hitos
```

### Cambiar velocidad de animación

En `app/page.tsx`:

```typescript
scrub: 1, // 0.5 = rápido, 2 = lento
```

### Cambiar radio de la espiral

En `app/components/TimelineScene.tsx`:

```typescript
const SPIRAL_RADIUS = 6; // Más grande = espiral más amplia
```

## 📚 Stack Tecnológico

- **Next.js 14** - Framework React moderno
- **React Three Fiber** - Renderizado 3D con Three.js
- **Three.js** - Engine gráfico
- **GSAP** - Animaciones profesionales
- **ScrollTrigger** - Control de scroll
- **Tailwind CSS** - Estilos de utilidad
- **TypeScript** - Type safety

## 🔧 Scripts disponibles

```bash
npm run dev          # Correr en desarrollo
npm run build        # Build para producción
npm start            # Correr el build de producción
npm run lint         # Lint del código
npm run type-check   # Verificar tipos TypeScript
```

## 🌐 Deployment

### Vercel (Recomendado)

1. Push tu código a GitHub
2. Conecta tu repo en [vercel.com/new](https://vercel.com/new)
3. Vercel detectará Next.js automáticamente
4. ¡Listo! Deploy automático en cada push

### Otros

Para otros servicios que soporten Node.js (Railway, Render, etc.), asegúrate de tener Node.js 18+.

## 📖 Documentación Completa

Consulta los archivos en `/docs`:
- `ARQUITECTURA.md` - Arquitectura técnica detallada
- `PERSONALIZACION.md` - Ejemplos avanzados de customización
- `INSTALACION.md` - Guía paso a paso

## 🐛 Troubleshooting

### "Canvas no aparece"
- Verifica que el Canvas tenga `position: fixed` y `zIndex`
- Asegúrate de que no hay elementos cubriendo el canvas

### "Scroll no funciona"
- Verifica que ScrollTrigger esté registrado en page.tsx
- Confirma que el contenedor tiene altura suficiente (`h-[400vh]`)

### "Rendimiento bajo"
- Reduce la densidad de geometrías (menos segmentos)
- Aumenta el damping factor en useFrame
- Desactiva post-processing si lo usas

## 📄 Licencia

MIT

## 👤 Autor

**GalateIA** - Firma de automatización e infraestructura operativa

---

¿Preguntas? Abre un issue en GitHub o contacta a fcamargojover@gmail.com
