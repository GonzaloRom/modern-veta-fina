import { useEffect, useRef, useState } from 'react';
import { Leaf, Award, Users, Clock } from 'lucide-react';

const GALLERY = [
  '/img/mesaX2.jpg',
  '/img/silla1.jpg',
  '/img/vetafina2.jpg',
  '/img/vetafina3.jpg',
  '/img/vetafina.jpg',
  '/img/pruebaalto.jpg',
];

const STATS = [
  { icon: <Clock size={20} />, value: '15+', label: 'Años de experiencia' },
  { icon: <Users size={20} />, value: '800+', label: 'Clientes satisfechos' },
  { icon: <Award size={20} />, value: '100%', label: 'Fabricación propia' },
  { icon: <Leaf size={20} />, value: '12+', label: 'Especies de maderas' },
];

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="nosotros" className="py-20 md:py-28 bg-warm-50 dark:bg-warm-900 overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-28">
          {/* Text */}
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <span className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase text-gold-500 dark:text-gold-400 mb-4">
              Nuestra Historia
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-warm-900 dark:text-cream-50 mb-6 leading-tight">
              Más de 15 años creando piezas que perduran
            </h2>
            <div className="space-y-4 font-sans text-warm-600 dark:text-cream-300 leading-relaxed text-sm md:text-base">
             <p>
              VETA FINA nació en 2009 como un emprendimiento familiar con la visión de crear 
              muebles que fueran más que objetos: piezas únicas que acompañen la vida de las familias.
            </p>
            <p>
              Comenzamos en un pequeño taller con herramientas básicas y mucha pasión por la madera. 
              Hoy, después de más de una década, mantenemos esa misma esencia artesanal pero 
              con la experiencia y el conocimiento que nos han dado cientos de proyectos realizados.
            </p>
            <p>
              Creemos que cada hogar es único, y por eso nos especializamos en crear muebles 
              a medida que se adapten perfectamente al espacio y al estilo de vida de cada cliente.
            </p>
            </div>

            {/* Values */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { title: 'Madera Noble', desc: 'Seleccionamos cada tabla a mano' },
                { title: 'Proceso Artesanal', desc: 'Técnicas transmitidas de generación en generación' },
                { title: 'Diseño Exclusivo', desc: 'Sin piezas idénticas, sin producción en serie' },
                { title: 'Garantía 5 Años', desc: 'Confianza total en cada ensamble' },
              ].map(val => (
                <div key={val.title} className="p-4 bg-cream-100 dark:bg-warm-800 rounded-2xl">
                  <h4 className="font-serif text-sm font-semibold text-warm-900 dark:text-cream-100 mb-1">{val.title}</h4>
                  <p className="font-sans text-xs text-warm-500 dark:text-cream-400 leading-snug">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Main image */}
          <div className={`relative transition-all duration-700 delay-150 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-warm-lg">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Taller VETA FINA"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-950/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 md:-left-8 bg-gold-500 rounded-2xl px-6 py-4 shadow-gold">
              <p className="font-serif text-2xl font-bold text-warm-950">15+</p>
              <p className="font-sans text-xs text-warm-800 font-medium leading-tight">Años creando<br />muebles únicos</p>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-cream-200 dark:bg-warm-700 opacity-50 -z-10" />
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-28 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {STATS.map(stat => (
            <div key={stat.label} className="text-center p-6 bg-cream-50 dark:bg-warm-800 rounded-2xl shadow-warm">
              <div className="flex justify-center mb-3 text-gold-500 dark:text-gold-400">{stat.icon}</div>
              <div className="font-serif text-3xl md:text-4xl font-bold text-warm-900 dark:text-cream-50 mb-1">{stat.value}</div>
              <div className="font-sans text-xs text-warm-500 dark:text-cream-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className={`mb-20 md:mb-28 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <span className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase text-gold-500 dark:text-gold-400 mb-3">
              Nuestro Proceso
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-warm-900 dark:text-cream-50">
              De tu idea al mueble perfecto
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Consulta', desc: 'Escuchamos tu visión, tus necesidades de espacio y tu estilo de vida.' },
              { num: '02', title: 'Diseño', desc: 'Creamos bocetos y renders para que puedas ver tu mueble antes de que exista.' },
              { num: '03', title: 'Fabricación', desc: 'Nuestros ebanistas trabajan cada pieza a mano, con los materiales que elegiste.' },
              { num: '04', title: 'Entrega', desc: 'Instalamos en tu hogar y nos aseguramos de que todo sea perfecto.' },
            ].map(step => (
              <div key={step.num} className="relative p-6 bg-cream-50 dark:bg-warm-800 rounded-2xl">
                <span className="font-serif text-5xl font-bold text-cream-300 dark:text-warm-700 absolute top-4 right-5 leading-none select-none">
                  {step.num}
                </span>
                <h4 className="font-serif text-lg font-semibold text-warm-900 dark:text-cream-100 mb-2">{step.title}</h4>
                <p className="font-sans text-sm text-warm-500 dark:text-cream-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className={`transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-10">
            <span className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase text-gold-500 dark:text-gold-400 mb-3">
              Galería
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-warm-900 dark:text-cream-50">
              El taller, la madera, el oficio
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {GALLERY.map((img, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl ${i === 0 || i === 5 ? 'row-span-1 md:row-span-2' : ''}`}
              >
                <img
                  src={img}
                  alt={`Taller VETA FINA ${i + 1}`}
                  className="w-full h-48 md:h-full object-cover hover:scale-105 transition-transform duration-500"
                  style={{ minHeight: i === 0 || i === 5 ? '400px' : undefined }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
