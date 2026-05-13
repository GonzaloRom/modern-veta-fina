import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingBag, MessageCircle, Package, Ruler } from 'lucide-react';
import type { Product } from '../lib/supabase';
import { formatPrice } from './ProductCard';

const WHATSAPP_NUMBER = '5492604518537';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const [selectedWood, setSelectedWood] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  useEffect(() => {
    if (product) {
      setImgIndex(0);
      setSelectedWood(0);
      setSelectedColor(0);
    }
  }, [product]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  if (!product) return null;

  const totalPrice = product.base_price + (product.wood_options[selectedWood]?.price_modifier ?? 0);
  const selectedWoodName = product.wood_options[selectedWood]?.name ?? 'Natural';
  const selectedColorName = product.color_options[selectedColor]?.name ?? '';

  const waMsg = encodeURIComponent(
    `Hola VETA FINA, me interesa el producto "${product.name}" en madera ${selectedWoodName}${selectedColorName ? `, color ${selectedColorName}` : ''}. ¿Podrían darme más información?`
  );

  const handleBuy = () => {
    /*
      TODO: Integración Mercado Pago
      Aquí iría el flujo de pago:
      - Crear preferencia de pago via Supabase Edge Function
      - Redirigir al checkout de MP con el preference_id
      - Manejar callbacks de éxito/error/pendiente

      Ejemplo:
      const { data } = await supabase.functions.invoke('create-mp-preference', {
        body: { product_id: product.id, wood: selectedWoodName, color: selectedColorName, price: totalPrice }
      });
      window.location.href = data.init_point;
    */
    alert('Integración de pago próximamente. Mientras tanto podés contactarnos por WhatsApp.');
  };

  const prevImg = () => setImgIndex(i => (i - 1 + product.images.length) % product.images.length);
  const nextImg = () => setImgIndex(i => (i + 1) % product.images.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-warm-950/70 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div className="relative bg-cream-50 dark:bg-warm-900 w-full sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-warm-lg animate-fade-in-up flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-warm-900/60 dark:bg-warm-800/80 backdrop-blur-sm flex items-center justify-center text-cream-200 hover:text-white hover:bg-warm-800 transition-all duration-200"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col lg:flex-row overflow-y-auto">
          {/* Image gallery */}
          <div className="lg:w-1/2 flex-shrink-0">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-64 bg-cream-200 dark:bg-warm-800 overflow-hidden">
              <img
                src={product.images[imgIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {product.images.length > 1 && (
                <>
                  <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-warm-950/60 backdrop-blur-sm flex items-center justify-center text-cream-100 hover:bg-warm-950/80 transition-all">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-warm-950/60 backdrop-blur-sm flex items-center justify-center text-cream-100 hover:bg-warm-950/80 transition-all">
                    <ChevronRight size={18} />
                  </button>
                  {/* Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {product.images.map((_, i) => (
                      <button key={i} onClick={() => setImgIndex(i)}
                        className={`rounded-full transition-all duration-200 ${i === imgIndex ? 'w-5 h-1.5 bg-gold-400' : 'w-1.5 h-1.5 bg-cream-200/60'}`}
                      />
                    ))}
                  </div>
                </>
              )}
              {/* Stock overlay if no stock */}
              {!product.in_stock && (
                <div className="absolute inset-0 bg-warm-950/50 flex items-center justify-center">
                  <div className="bg-warm-900/90 backdrop-blur-sm rounded-xl px-6 py-3 text-center">
                    <p className="font-serif text-cream-200 text-sm font-medium">Sin stock disponible</p>
                  </div>
                </div>
              )}
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 p-3 bg-cream-100 dark:bg-warm-950/50 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      i === imgIndex ? 'border-gold-400' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
            {/* Header */}
            <div className="mb-5">
              <span className="inline-block px-2.5 py-1 bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 text-xs font-sans font-semibold rounded-full mb-3 capitalize">
                {product.category === 'sofa' ? 'Sofá' : product.category === 'mesa' ? 'Mesa' : product.category}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-900 dark:text-cream-50 leading-tight mb-3">
                {product.name}
              </h2>
              <p className="font-sans text-sm text-warm-600 dark:text-cream-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Dimensions */}
            {product.dimensions?.width && (
              <div className="flex items-center gap-2 mb-5 text-warm-500 dark:text-cream-400">
                <Ruler size={14} />
                <span className="font-sans text-xs">
                  {product.dimensions.width} × {product.dimensions.depth} × {product.dimensions.height} {product.dimensions.unit}
                  <span className="ml-1 text-warm-400 dark:text-cream-500">(Ancho × Prof × Alto)</span>
                </span>
              </div>
            )}

            {/* Wood selector */}
            {product.wood_options.length > 0 && (
              <div className="mb-5">
                <label className="font-sans text-xs font-semibold text-warm-600 dark:text-cream-300 uppercase tracking-wider mb-3 block">
                  Tipo de Madera
                </label>
                <div className="space-y-2">
                  {product.wood_options.map((wood, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedWood(i)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all duration-200 text-left ${
                        selectedWood === i
                          ? 'border-gold-400 bg-gold-50 dark:bg-gold-900/20 text-warm-900 dark:text-cream-100'
                          : 'border-cream-300 dark:border-warm-700 text-warm-700 dark:text-cream-300 hover:border-gold-300 dark:hover:border-gold-600'
                      }`}
                    >
                      <span className="font-sans text-sm font-medium">{wood.name}</span>
                      <span className={`font-sans text-xs font-semibold ${wood.price_modifier > 0 ? 'text-gold-600 dark:text-gold-400' : 'text-warm-400 dark:text-cream-500'}`}>
                        {wood.price_modifier > 0 ? `+${formatPrice(wood.price_modifier)}` : 'Incluido'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selector */}
            {product.color_options.length > 0 && (
              <div className="mb-5">
                <label className="font-sans text-xs font-semibold text-warm-600 dark:text-cream-300 uppercase tracking-wider mb-3 block">
                  Color / Tapizado
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.color_options.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      title={color.name}
                      className={`group relative w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === i ? 'border-gold-400 scale-110 shadow-gold' : 'border-cream-300 dark:border-warm-600 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === i && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-white/80 dark:bg-white/60" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                {product.color_options[selectedColor] && (
                  <p className="font-sans text-xs text-warm-500 dark:text-cream-400 mt-2">
                    Seleccionado: <span className="font-medium text-warm-700 dark:text-cream-200">{product.color_options[selectedColor].name}</span>
                  </p>
                )}
              </div>
            )}

            {/* Materials */}
            {product.materials.length > 0 && (
              <div className="mb-6">
                <label className="font-sans text-xs font-semibold text-warm-600 dark:text-cream-300 uppercase tracking-wider mb-2 block">
                  Materiales
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map(mat => (
                    <span key={mat} className="px-3 py-1 bg-cream-200 dark:bg-warm-800 text-warm-700 dark:text-cream-300 text-xs font-sans rounded-full">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="bg-cream-100 dark:bg-warm-800/60 rounded-2xl p-5 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-sans text-xs text-warm-500 dark:text-cream-400 uppercase tracking-wide mb-1">Precio total</p>
                  <p className="font-serif text-3xl font-bold text-warm-900 dark:text-cream-50">
                    {formatPrice(totalPrice)}
                  </p>
                  {product.wood_options[selectedWood]?.price_modifier > 0 && (
                    <p className="font-sans text-xs text-warm-400 dark:text-cream-500 mt-1">
                      Base {formatPrice(product.base_price)} + madera {formatPrice(product.wood_options[selectedWood].price_modifier)}
                    </p>
                  )}
                </div>
                {product.in_stock && product.stock_quantity > 0 && (
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                      <Package size={13} />
                      <span className="font-sans text-xs font-medium">{product.stock_quantity} disponibles</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            {product.in_stock ? (
              <div className="space-y-3">
                <button
                  onClick={handleBuy}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-warm-900 dark:bg-cream-100 hover:bg-warm-800 dark:hover:bg-cream-200 text-cream-50 dark:text-warm-900 font-sans font-semibold text-sm rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-warm"
                >
                  <ShoppingBag size={16} />
                  Comprar ahora
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-gold-400 text-gold-600 dark:text-gold-400 hover:bg-gold-50 dark:hover:bg-gold-900/20 font-sans font-semibold text-sm rounded-full transition-all duration-200 hover:-translate-y-0.5"
                >
                  <MessageCircle size={16} />
                  Consultar por WhatsApp
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-full px-6 py-4 bg-cream-200 dark:bg-warm-800 text-warm-500 dark:text-cream-500 font-sans font-medium text-sm rounded-full text-center">
                  Este producto actualmente no está disponible. Consultá por opciones a medida.
                </div>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola VETA FINA, estoy interesado en el producto "${product.name}" pero está sin stock. ¿Pueden fabricarlo a medida?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gold-500 hover:bg-gold-400 text-warm-950 font-sans font-semibold text-sm rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-gold"
                >
                  <MessageCircle size={16} />
                  Consultar versión a medida
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
