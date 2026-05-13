import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Hammer, Users, Award } from 'lucide-react';

interface HeroProps {
  onScrollToProducts: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollToProducts }) => {
  const handleCustomOrderClick = () => {
    const message = encodeURIComponent('Hola VETA FINA, estoy interesado en un mueble a medida. ¿Podrían darme más información?');
    window.open(`https://wa.me/5492604518537?text=${message}`, '_blank');
  };

  return (
    <section className="relative bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 lg:pt-20 pb-20 lg:pb-32 flex flex-col items-center gap-12">


        {/* Texto y Video alineados con orden responsive */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full max-w-5xl"

    >
      {/* Texto */}
      <div className="order-1 lg:order-none text-center lg:text-left max-w-md">
        <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-4">
          VETA FINA
        </h1>
        {/* Texto descriptivo (solo visible en escritorio aquí) */}
        <p className="hidden lg:block text-xl text-amber-800 leading-relaxed">
          Creamos piezas únicas con <strong>materiales nobles</strong> y procesos artesanales. 
          Cada mueble es diseñado especialmente para tu espacio y estilo de vida.
        </p>
      </div>

{/* Video */}
<div className="order-2 lg:order-none rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/20 transform transition-transform duration-500 hover:scale-[1.03] hover:shadow-amber-900/30 w-full max-w-[380px]">
  <div className="relative w-full pb-[177.78%]">
    <video
      loop
      controls
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source src="/videos/inicio.mp4" type="video/mp4" />
    </video>

    {/* Overlay decorativo suave */}
    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-transparent pointer-events-none"></div>
  </div>
</div>


{/* Texto descriptivo en móvil (debajo del video) */}
<p className="order-3 lg:hidden text-lg sm:text-xl text-amber-800 leading-relaxed text-center mt-4">
  Creamos piezas únicas con <strong>materiales nobles</strong> y procesos artesanales. 
  Cada mueble es diseñado especialmente para tu espacio y estilo de vida.
</p>

    </motion.div>

    {/* Botones */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={handleCustomOrderClick}
        className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
      >
        Solicitar Presupuesto
      </button>

      <button
        onClick={onScrollToProducts}
        className="border-2 border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105"
      >
        Ver Productos
      </button>
    </div>

    {/* Estadísticas */}
    <div className="grid grid-cols-3 gap-4 text-center max-w-4xl w-full px-4 sm:px-6 lg:px-8">
      {[
        { icon: <Hammer className="w-8 h-8 text-amber-600 mx-auto mb-1" />, number: '15+', text: 'Años de Experiencia' },
        { icon: <Users className="w-8 h-8 text-amber-600 mx-auto mb-1" />, number: '50+', text: 'Clientes Satisfechos' },
        { icon: <Award className="w-8 h-8 text-amber-600 mx-auto mb-1" />, number: '100%', text: 'Artesanal' }
      ].map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          {stat.icon}
          <p className="text-base sm:text-2xl font-bold text-amber-900">{stat.number}</p>
          <p className="text-xs sm:text-sm text-amber-700">{stat.text}</p>
        </motion.div>
      ))}
    </div>

    {/* Imagen decorativa abajo */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-5xl"
    >
      <img
        src='/img/silla.jpg'
        alt="Muebles artesanales VETA FINA"
        className="w-full h-96 lg:h-[500px] object-cover rounded-2xl"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-2xl">
        <p className="text-white text-lg font-medium text-center">
          "Cada pieza es única, como tu hogar"
        </p>
      </div>
    </motion.div>
  </div>

  {/* Indicador de scroll */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <button
      onClick={onScrollToProducts}
      className="text-amber-800 hover:text-amber-900 transition-colors duration-200"
    >
      <ArrowDown className="w-8 h-8" />
    </button>
  </div>
</section>
  );
};

export default Hero;
