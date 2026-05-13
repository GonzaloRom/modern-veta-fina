import { useEffect, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

const WHATSAPP_NUMBER = '5491112345678';
const WHATSAPP_MEDIDA_MSG = encodeURIComponent(
  'Hola VETA FINA, estoy interesado en un mueble a medida. ¿Podrían darme más información?'
);

interface HeroProps {
  onNavigate: (section: string) => void;
}

const SLIDES = [
  {
    img: '/img/inicio1.jpg',
    tag: 'Sofás a Medida',
    title: 'El sofá que imaginaste,',
    highlight: 'creado para vos.',
    sub: 'Maderas nobles, tapizados premium y un equipo que convierte tu visión en el mueble perfecto.',
  },
  {
    img: '/img/inicio2.jpg',
    tag: 'Mesas Artesanales',
    title: 'Cada mesa cuenta',
    highlight: 'una historia única.',
    sub: 'Diseño escandinavo, madera maciza y veta natural que hace de cada pieza una obra singular.',
  },
  {
    img: '/img/inicio3.jpg',
    tag: 'Diseño Exclusivo',
    title: 'Tu espacio merece',
    highlight: 'lo extraordinario.',
    sub: 'Asesoramiento personalizado, materiales de primera calidad y fabricación artesanal bajo tu medida.',
  },
];

export default function Hero({ onNavigate }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % SLIDES.length);
        setVisible(true);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = SLIDES[current];

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          key={slide.img}
          src={slide.img}
          alt="VETA FINA muebles"
          className="w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: visible ? 1 : 0 }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-warm-950/75 via-warm-900/60 to-warm-800/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-950/60 via-transparent to-transparent" />
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setVisible(false); setTimeout(() => { setCurrent(i); setVisible(true); }, 300); }}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-8 h-2 bg-gold-400' : 'w-2 h-2 bg-cream-400/50 hover:bg-cream-400/80'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-0">
        <div
          className="max-w-2xl transition-all duration-500"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)' }}
        >
          {/* Tag */}
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={14} className="text-gold-400" />
            <span className="text-gold-400 font-sans text-sm font-medium tracking-[0.2em] uppercase">
              {slide.tag}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-cream-50 mb-3">
            {slide.title}
          </h1>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold italic leading-[1.1] text-gold-400 mb-6">
            {slide.highlight}
          </h1>

          <p className="font-sans text-base md:text-lg text-cream-200 leading-relaxed mb-10 max-w-lg">
            {slide.sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('productos')}
              className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-warm-950 font-sans font-semibold text-sm rounded-full transition-all duration-200 shadow-gold hover:-translate-y-0.5 hover:shadow-lg"
            >
              Ver Catálogo
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MEDIDA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-cream-200/60 hover:border-gold-400 text-cream-100 hover:text-gold-300 font-sans font-medium text-sm rounded-full transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5"
            >
              Diseñar a Medida
            </a>
          </div>
        </div>

        {/* Features strip */}
        <div className="mt-16 md:mt-24 grid grid-cols-3 gap-4 max-w-lg">
          {[
            { label: 'Madera Maciza', sub: '100% nativa' },
            { label: 'A Tu Medida', sub: 'Diseño libre' },
            { label: 'Garantía', sub: '5 años' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <div className="text-cream-100 font-sans text-sm font-semibold">{item.label}</div>
              <div className="text-cream-400 font-sans text-xs mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => onNavigate('productos')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-cream-300 hover:text-gold-400 transition-colors animate-float"
        aria-label="Scroll down"
      >
        <span className="font-sans text-xs tracking-widest uppercase">Explorar</span>
        <ArrowDown size={16} />
      </button>
    </section>
  );
}
