import { useState } from 'react';
import { Package, Eye } from 'lucide-react';
import type { Product } from '../lib/supabase';

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
  index: number;
}

export default function ProductCard({ product, onOpen, index }: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mainImage = product.images[0] ?? '';
  const hoverImage = product.images[1] ?? product.images[0] ?? '';

  return (
    <div
      className="group bg-cream-50 dark:bg-warm-900 rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-all duration-400 hover:-translate-y-1 cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
      onClick={() => onOpen(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-200 dark:bg-warm-800">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-cream-200 via-cream-100 to-cream-200 dark:from-warm-800 dark:via-warm-700 dark:to-warm-800 animate-shimmer bg-[length:400%_100%]" />
        )}
        <img
          src={hovered && product.images.length > 1 ? hoverImage : mainImage}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'} ${hovered ? 'scale-105' : 'scale-100'}`}
          onLoad={() => setImgLoaded(true)}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-warm-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Stock badge */}
        <div className="absolute top-3 left-3">
          {product.in_stock ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm-900/80 backdrop-blur-sm text-cream-100 text-xs font-sans font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Disponible
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm-900/80 backdrop-blur-sm text-cream-300 text-xs font-sans font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-peach-400" />
              Sin stock
            </span>
          )}
        </div>

        {/* Category tag */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full bg-gold-400/90 text-warm-950 text-xs font-sans font-semibold capitalize">
            {product.category === 'sofa' ? 'Sofá' : product.category === 'mesa' ? 'Mesa' : product.category}
          </span>
        </div>

        {/* View details button */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <div className="flex items-center gap-2 px-4 py-2 bg-cream-50/95 dark:bg-warm-900/95 backdrop-blur-sm rounded-full shadow-warm text-warm-800 dark:text-cream-200 text-xs font-sans font-medium whitespace-nowrap">
            <Eye size={13} />
            Ver detalles
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-warm-900 dark:text-cream-100 leading-tight mb-1 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
          {product.name}
        </h3>
        <p className="font-sans text-xs text-warm-500 dark:text-cream-400 mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-sans text-xs text-warm-400 dark:text-cream-500 uppercase tracking-wide">Desde</span>
            <div className="font-serif text-xl font-semibold text-warm-900 dark:text-cream-100">
              {formatPrice(product.base_price)}
            </div>
          </div>
          {product.in_stock && product.stock_quantity > 0 && (
            <div className="flex items-center gap-1.5 text-warm-400 dark:text-cream-500">
              <Package size={13} />
              <span className="font-sans text-xs">{product.stock_quantity} en stock</span>
            </div>
          )}
        </div>

        {/* Woods preview */}
        {product.wood_options.length > 0 && (
          <div className="mt-3 pt-3 border-t border-cream-200 dark:border-warm-700">
            <span className="font-sans text-xs text-warm-400 dark:text-cream-500">
              {product.wood_options.length} acabados disponibles
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);
}
