import React from 'react';
import { Eye, ShoppingCart, AlertCircle } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(price);
  };

  const handleViewDetails = () => {
    onViewDetails(product);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
      {/* Imagen del producto */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        

        {/* Badge de destacado */}
        {product.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Destacado
            </span>
          </div>
        )}

        {/* Overlay con botones */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={handleViewDetails}
            className="bg-white text-amber-800 px-6 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber-50 flex items-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver Detalles
          </button>
        </div>
      </div>

     {/* Información del producto */}
<div className="p-6">
  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-800 transition-colors duration-200">
    {product.name}
  </h3>

  {/* Eliminamos la descripción para que no se vea en la tarjeta */}

  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500 mb-1">Desde</p>
      <p className="text-lg font-bold text-amber-800">
        {formatPrice(product.basePrice)}
      </p>
    </div>

    <div className="flex items-center space-x-2">
      {product.inStock ? (
        <button
          onClick={handleViewDetails}
          className="bg-amber-800 hover:bg-amber-900 text-white px-3 py-1.5 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm md:px-4 md:py-2 md:text-base max-w-full"
        >
          <ShoppingCart className="w-4 h-4 mr-1" />
          Comprar
        </button>
      ) : (
        <div className="text-center">
          <p className="text-sm text-red-600 mb-2">No disponible</p>
          <button
            onClick={() => {
              const message = encodeURIComponent(`Hola VETA FINA, me interesa el ${product.name}. ¿Podrían hacerlo a medida?`);
              window.open(`https://wa.me/5492604518537?text=${message}`, '_blank');
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
          >
            Consultar A Medida
          </button>
        </div>
      )}
      </div>
    </div>
  </div>
</div>

  );
};

export default ProductCard;