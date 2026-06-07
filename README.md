# GalateIA - Landing Page Completa

Landing page profesional de GalateIA (Sistema Operativo de Retención de Pacientes) con Timeline 3D inmersivo, componentes interactivos y diseño premium.

## 📋 Estructura de Secciones

```
1. Nav              - Navegación fija en header
2. Hero             - Sección principal con métricas
3. Calculator       - Calculadora dinámica de costo de no-shows
4. Agents           - 3 agentes operativos con diagrama de red
5. Timeline3D       - Timeline sacacorchos 3D con GSAP ScrollTrigger
6. Social           - 4 métricas de prueba social
7. Pricing          - Comparación de precios (Sin vs Con GalateIA)
8. FAQ              - Acordeón interactivo con 5 preguntas
9. FinalCTA         - Llamado a acción final
+ ParticleBackground - Canvas de partículas animadas de fondo
```

## 🎨 Paleta de Colores

```css
--cyan: #00fbfb        /* Primario - Acentos y CTAs */
--dark: #1a1a1d        /* Background oscuro */
--white: #ffffff       /* Textos principales */
--red: #ff4444         /* Alertas / Urgencia */
--green: #00c851       /* Confirmaciones / Recomendación */
```

## 🔤 Tipografía

- **Titulares**: Syne 800 (Google Fonts)
- **Cuerpo**: DM Sans 300/400/500 (Google Fonts)
- **Monospace**: DM Mono (Google Fonts)

## 🚀 Instalación y Ejecución Local

```bash
# Clonar repositorio
git clone https://github.com/fcamargojover-galateia/galateia.git
cd galateia

# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📦 Dependencias Verificadas

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "next": "^14.0.4",
  "three": "^0.160.0",
  "@react-three/fiber": "^8.15.12",
  "@react-three/drei": "^9.92.7",
  "gsap": "^3.12.0"
}
```

## 🏗️ Arquitectura Técnica

### Stack
- **Frontend**: Next.js 14 (App Router)
- **3D**: React Three Fiber 8.15.12 + Three.js 0.160.0
- **Animaciones**: GSAP 3.12.0 + ScrollTrigger
- **Estilos**: Tailwind CSS + CSS Variables
- **Tipografía**: next/font (Google Fonts)

### Configuración Crítica

**next.config.js** - Transpilación de Three.js:
```javascript
transpilePackages: ['three']
```

**tsconfig.json** - App Router compatible:
```json
{
  "jsx": "preserve",
  "moduleResolution": "node",
  "isolatedModules": true
}
```

**app/layout.tsx** - Fuentes de Google:
```typescript
import { Syne, DM_Sans, DM_Mono } from 'next/font/google';
```

## 📁 Estructura de Carpetas

```
app/
├── layout.tsx                          (Root layout + fuentes)
├── page.tsx                            (Ensamblador de secciones)
├── globals.css                         (Variables CSS + animaciones)
├── components/
│   ├── sections/
│   │   ├── Nav.tsx                     (Navegación)
│   │   ├── Hero.tsx                    (Hero + dashboard)
│   │   ├── Calculator.tsx              (Calculadora interactiva)
│   │   ├── Agents.tsx                  (3 agentes + diagrama Canvas)
│   │   ├── Timeline3D.tsx              ('use client' - wrapper)
│   │   ├── Social.tsx                  (4 métricas)
│   │   ├── Pricing.tsx                 (Comparación)
│   │   ├── FAQ.tsx                     (Acordeón)
│   │   └── FinalCTA.tsx                (CTA final)
│   ├── 3d/
│   │   ├── TimelineCanvas.tsx          ('use client' - Canvas R3F)
│   │   └── TimelineScene.tsx           ('use client' - Escena 3D)
│   └── ambient/
│       └── ParticleBackground.tsx      ('use client' - Canvas 2D)
```

## ⚙️ Componentes Clave

### Timeline3D (`app/components/sections/Timeline3D.tsx`)
- Wrapper que setup GSAP ScrollTrigger
- Registra plugin con `gsap.registerPlugin(ScrollTrigger)`
- Crea referencia para valores de animación (rotation, position)
- Limpia ScrollTriggers en cleanup de useEffect

### TimelineCanvas (`app/components/3d/TimelineCanvas.tsx`)
- Canvas R3F con position: fixed 100vh
- PerspectiveCamera estática en [0, 0, 10]
- 3 luces (ambient + 2 point lights)
- Props: spiralStateRef

### TimelineScene (`app/components/3d/TimelineScene.tsx`)
- Genera 4 nodos en espiral (coordenadas cilíndricas)
- useFrame para aplicar suavizado (damp) a rotación y posición
- Html component de Drei para textos 3D
- Líneas de conexión y nodo central

### ParticleBackground (`app/components/ambient/ParticleBackground.tsx`)
- Canvas 2D puro (sin Three.js)
- 50 partículas que se mueven continuamente
- Líneas entre partículas cercanas
- Responsive: redimensiona on window resize

### Calculator (`app/components/sections/Calculator.tsx`)
- Estado dinámico con useState
- Inputs range para citas mensuales y % no-shows
- Cálculo en tiempo real de costos
- Diseño con grid y valores destacados

### FAQ (`app/components/sections/FAQ.tsx`)
- Acordeón controlado con useState
- 5 preguntas sobre implementación, compatibilidad, seguridad, escalabilidad
- Open/close toggle con rotación visual

## 🔧 Scripts

```bash
npm run dev              # Next.js dev server (hot reload)
npm run build            # Build optimizado para producción
npm start                # Correr build de producción
npm run lint             # ESLint check
```

## 🌐 Deployment en Hostinger VPS

### Requisitos
- Node.js 18+
- npm o yarn
- Acceso SSH

### Pasos
```bash
# 1. SSH a tu VPS
ssh usuario@tu-ip-vps

# 2. Clonar repositorio
cd /home/usuario/public_html
git clone https://github.com/fcamargojover-galateia/galateia.git
cd galateia

# 3. Instalar dependencias
npm install

# 4. Build
npm run build

# 5. Iniciar con PM2
npm install -g pm2
pm2 start "npm start" --name "galateia"
pm2 startup
pm2 save

# 6. Configurar proxy inverso (Nginx)
# Apuntar puerto 3000 a tu dominio
```

## 🐛 Troubleshooting

### Error: "Module not found: 'three'"
→ Verifica `transpilePackages: ['three']` en next.config.js

### Canvas no renderiza
→ Verifica que TimelineCanvas tiene `'use client'` y Canvas tiene `position: fixed, zIndex`

### ScrollTrigger no funciona
→ Verifica que se registra con `gsap.registerPlugin(ScrollTrigger)` en useEffect

### Estilos Tailwind no aplican
→ Verifica que tailwind.config.ts tiene `content: ['./app/**/*.{ts,tsx}']`

## 📚 Recursos

- [Next.js 14 Docs](https://nextjs.org/docs)
- [React Three Fiber](https://r3f.docs.pmnd.rs/)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📄 Licencia

Propietario de GalateIA

## 👤 Desarrollado por

**GalateIA** — Firma de Automatización e Infraestructura Operativa  
Contacto: fcamargojover@gmail.com
