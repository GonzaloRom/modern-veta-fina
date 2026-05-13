import React, { useState } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { Product } from '../../types';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<'all' | 'inStock' | 'outOfStock'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'featured'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = products.filter(product => {
    if (filter === 'inStock') return product.inStock;
    if (filter === 'outOfStock') return !product.inStock;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.basePrice - b.basePrice;
      case 'featured':
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      default:
        return 0;
    }
  });

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Productos</h2>
        <p className="text-lg text-gray-600">
          Descubrí nuestra selección de muebles disponibles. Todos pueden personalizarse según tus necesidades.
        </p>
      </div>

      {/* Filtros y controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          {/* Filtro de stock */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">Todos los productos</option>
            </select>
          </div>

          {/* Ordenamiento */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="featured">Destacados</option>
              <option value="name">Nombre</option>
              <option value="price">Precio</option>
            </select>
          </div>
        </div>

        {/* Vista y resultados */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {sortedProducts.length} producto{sortedProducts.length !== 1 ? 's' : ''}
          </span>
          
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors duration-200 ${
                viewMode === 'grid'
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors duration-200 ${
                viewMode === 'list'
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid de productos */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Package className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos disponibles</h3>
          <p className="text-gray-500">
            Probá cambiando los filtros o consultanos por opciones a medida.
          </p>
          <button
            onClick={() => {
              const message = encodeURIComponent('Hola VETA FINA, estoy buscando un mueble específico. ¿Podrían ayudarme?');
              window.open(`https://wa.me/5492604518537?text=${message}`, '_blank');
            }}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Consultar por WhatsApp
          </button>
        </div>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-6'
        }>
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {/* Call to action */}
      <div className="mt-16 text-center bg-amber-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-amber-900 mb-4">
          ¿No encontrás lo que buscás?
        </h3>
        <p className="text-amber-800 mb-6 max-w-2xl mx-auto">
          Nos especializamos en crear muebles únicos y personalizados. Contanos tu idea y 
          la hacemos realidad con los mejores materiales y acabados.
        </p>
        <button
          onClick={() => {
            const message = encodeURIComponent('Hola VETA FINA, estoy interesado en un mueble a medida. ¿Podrían darme más información?');
            window.open(`https://wa.me/5492604518537?text=${message}`, '_blank');
          }}
          className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          Solicitar Mueble A Medida
        </button>
      </div>

      {/* Modal de detalle del producto */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default ProductGrid;