import { useState, useEffect, useRef } from 'react';
import { Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Product } from '../lib/supabase';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

const WHATSAPP_NUMBER = '5492604518537';
const WHATSAPP_MEDIDA_MSG = encodeURIComponent(
  'Hola VETA FINA, estoy interesado en un mueble a medida. ¿Podrían darme más información?'
);

const CATEGORIES = [
  { key: 'all', label: 'Todos' },
  { key: 'sofa', label: 'Sofás' },
  { key: 'mesa', label: 'Mesas' },
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState<Product | null>(null);
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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let query = supabase.from('products').select('*').order('featured', { ascending: false }).order('created_at');
      if (category !== 'all') {
        query = query.eq('category', category);
      }
      const { data } = await query;
      setProducts((data as Product[]) ?? []);
      setLoading(false);
    };
    fetchProducts();
  }, [category]);

  const filtered = products;

  return (
    <section id="productos" className="py-20 md:py-28 bg-cream-50 dark:bg-warm-950" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase text-gold-500 dark:text-gold-400 mb-3">
            Catálogo
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-warm-900 dark:text-cream-50 mb-4">
            Piezas Disponibles
          </h2>
          <p className="font-sans text-base text-warm-500 dark:text-cream-400 max-w-xl mx-auto leading-relaxed">
            Una selección de muebles fabricados artesanalmente, disponibles para entrega inmediata.
            Cada uno puede personalizarse a tu gusto.
          </p>
        </div>

        {/* Filter + Custom CTA row */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-1 p-1 bg-cream-200 dark:bg-warm-800 rounded-full">
            <Filter size={13} className="ml-3 text-warm-400 dark:text-cream-500" />
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`px-4 py-1.5 rounded-full font-sans text-sm font-medium transition-all duration-200 ${
                  category === cat.key
                    ? 'bg-warm-900 dark:bg-cream-100 text-cream-50 dark:text-warm-900 shadow-warm'
                    : 'text-warm-600 dark:text-cream-400 hover:text-warm-900 dark:hover:text-cream-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MEDIDA_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 border border-gold-400 text-gold-600 dark:text-gold-400 hover:bg-gold-50 dark:hover:bg-gold-900/20 font-sans font-medium text-sm rounded-full transition-all duration-200 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-gold-400" />
            Diseñar a medida
          </a>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-cream-100 dark:bg-warm-800 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-cream-200 dark:bg-warm-700" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-cream-200 dark:bg-warm-700 rounded-full w-3/4" />
                  <div className="h-3 bg-cream-200 dark:bg-warm-700 rounded-full w-full" />
                  <div className="h-3 bg-cream-200 dark:bg-warm-700 rounded-full w-2/3" />
                  <div className="h-6 bg-cream-200 dark:bg-warm-700 rounded-full w-1/2 mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-xl text-warm-500 dark:text-cream-400 mb-6">No hay productos en esta categoría por el momento.</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MEDIDA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-warm-950 font-sans font-semibold text-sm rounded-full transition-all duration-200 shadow-gold"
            >
              Consultar fabricación a medida
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onOpen={setSelected}
              />
            ))}
          </div>
        )}

        {/* Custom furniture CTA section */}
        <div className={`mt-16 md:mt-20 bg-warm-900 dark:bg-warm-800 rounded-3xl overflow-hidden transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-8 md:p-12">
              <span className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase text-gold-400 mb-4">
                Servicio Exclusivo
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-cream-50 mb-4 leading-tight">
                ¿No encontraste lo que buscabas?
              </h3>
              <p className="font-sans text-sm text-cream-300 leading-relaxed mb-8">
                Diseñamos y fabricamos muebles completamente a medida. Desde el boceto inicial hasta
                la entrega, trabajamos con vos para crear la pieza perfecta para tu espacio.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MEDIDA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-warm-950 font-sans font-semibold text-sm rounded-full transition-all duration-200 shadow-gold hover:-translate-y-0.5 hover:shadow-lg"
              >
                Iniciar mi proyecto
              </a>
            </div>
            <div className="md:w-1/2 h-52 md:h-72 overflow-hidden">
              <img
                src="/img/mesaratonera1.jpg"
                alt="Taller VETA FINA"
                className="w-full h-full object-cover opacity-70"
              />
            </div>
          </div>
        </div>
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
