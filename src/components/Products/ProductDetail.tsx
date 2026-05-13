import React, { useState } from 'react';
import { X, MessageCircle, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { Product, Material, Color } from '../../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(
    product.materials.find((mat) => mat.name === product.defaultMaterial) || product.materials[0]
  );
  const [selectedColor, setSelectedColor] = useState<Color>(product.colors[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [customDimensions, setCustomDimensions] = useState({
    ancho: '',
    largo: '',
    alto: '',
  });



  const finalPrice = Math.round(product.basePrice * selectedMaterial.priceModifier * selectedColor.priceModifier);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(price);
  };

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomDimensions(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleWhatsAppInquiry = () => {

    const ancho = customDimensions.ancho ? `${customDimensions.ancho} cm` : 'medida estándar';
    const largo = customDimensions.largo ? `${customDimensions.largo} cm` : 'medida estándar';
    const alto = customDimensions.alto ? `${customDimensions.alto} cm` : 'medida estándar';

    const message = encodeURIComponent(
      `Hola VETA FINA, me interesa este producto, ${product.name} con las siguientes especificaciones:

Material: ${selectedMaterial.name}
Color: ${selectedColor.name}
Medidas personalizadas:
- Ancho: ${ancho}
- Largo: ${largo}
- Alto: ${alto}

¿Podrían darme más información?`
    );
    window.open(`https://wa.me/5492604518537?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">

            {/* Galería de imágenes */}
            <div>
              <div className="relative mb-4">
                {(() => {
                  const media = product.images[currentImageIndex];
                  const isVideo = media.endsWith('.mp4') || media.endsWith('.webm') || media.endsWith('.ogg');

                  if (isVideo) {
                    return (
                      <video
                        src={media}
                        controls
                        autoPlay={false}
                        muted={false}
                        playsInline
                        className="w-full h-96 object-cover rounded-lg"
                      />
                    );
                  }

                  return (
                    <img
                      src={media}
                      alt={product.name}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  );
                })()}

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all duration-200"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all duration-200"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Miniaturas */}
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((media, index) => {
                    const isVideo = media.endsWith('.mp4') || media.endsWith('.webm') || media.endsWith('.ogg');

                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          index === currentImageIndex
                            ? 'border-amber-500 ring-2 ring-amber-200'
                            : 'border-gray-200 hover:border-amber-300'
                        }`}
                      >
                        {isVideo ? (
                          <video
                            src={media}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                            loop
                            autoPlay
                          />
                        ) : (
                          <img
                            src={media}
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Información del producto */}
            <div>
              <div className="mb-6">
                <p className="text-gray-600 text-base mb-4 whitespace-pre-line">
                  {product.description}
                </p>

                {!product.inStock && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Este producto actualmente no está disponible. Consultá por opciones a medida.
                    </p>
                  </div>
                )}
              </div>

              {/* Selección de material */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Material de la Estructura
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.materials.map((material) => (
                    <button
                      key={material.id}
                      onClick={() => setSelectedMaterial(material)}
                      disabled={!product.inStock}
                      className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                        selectedMaterial.id === material.id
                          ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                          : product.inStock
                          ? 'border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                          : 'border-gray-200 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      {/* Nombre */}
                      <p className="font-medium text-gray-900">{material.name}</p>

                      {/* Descripción solo si está seleccionado */}
                      {selectedMaterial.id === material.id && (
                        <p className="text-sm text-gray-600 mt-1">{material.description}</p>
                      )}

                      {/* Precio */}
                      <p className="text-sm font-medium text-amber-600 mt-2">
                        {material.priceModifier === 1
                          ? 'Precio de referencia'
                          : `+${Math.round((material.priceModifier - 1) * 100)}%`}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selección de color */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Color del Acabado
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      disabled={!product.inStock}
                      className={`flex items-center space-x-3 p-3 border rounded-lg transition-all duration-200 ${
                        selectedColor.id === color.id
                          ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                          : product.inStock
                          ? 'border-gray-200 hover:border-amber-300'
                          : 'border-gray-200 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: color.hexCode }}
                      />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{color.name}</p>
                        <p className="text-xs text-amber-600">
                          {color.priceModifier === 1 ? 'Sin costo adicional' : `+${Math.round((color.priceModifier - 1) * 100)}%`}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Medidas Personalizadas */}
              <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
                <h4 className="text-lg font-semibold mb-3 text-gray-800">Medidas Personalizadas</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Si deseas medidas personalizadas, por favor ingresa las dimensiones a continuación. Ten en cuenta que las medidas fuera del estándar pueden afectar el precio final del producto.
                </p>

                <div className="grid grid-cols-3 gap-4">
                  {['ancho', 'largo', 'alto'].map((dim) => (
                    <div key={dim}>
                      <label htmlFor={dim} className="block text-sm font-medium text-amber-600 mb-1 capitalize">
                        {dim} (cm)
                      </label>
                      <input
                        type="number"
                        id={dim}
                        name={dim}
                        min={0}
                        step={0.1}
                        value={customDimensions[dim as keyof typeof customDimensions]}
                        onChange={handleDimensionChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder={`Ej: ${dim === 'ancho' ? 80 : dim === 'largo' ? 120 : 75}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Precio final */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Precio base:</span>
                  <span className="text-gray-900">{formatPrice(product.basePrice)}</span>
                </div>

                {selectedMaterial.priceModifier !== 1 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Material ({selectedMaterial.name}):</span>
                    <span className="text-amber-600">+{Math.round((selectedMaterial.priceModifier - 1) * 100)}%</span>
                  </div>
                )}

                {selectedColor.priceModifier !== 1 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Color ({selectedColor.name}):</span>
                    <span className="text-amber-600">+{Math.round((selectedColor.priceModifier - 1) * 100)}%</span>
                  </div>
                )}

                <hr className="my-3" />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-amber-800">{formatPrice(finalPrice)}</span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Continuar con compra por WhatsApp
                </button>
              </div>

              {/* Información adicional */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">💡 ¿Sabías que...?</h4>
                <p className="text-sm text-blue-800">
                  Todos nuestros muebles pueden personalizarse completamente. Si este diseño te gusta pero 
                  querés otras medidas, materiales o colores, ¡consultanos! Nos especializamos en crear 
                  piezas únicas para cada cliente.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
