import React from 'react';
import { MessageCircle } from 'lucide-react';


const WhatsAppFloat: React.FC = () => {
  const handleClick = () => {
    const message = encodeURIComponent('Hola VETA FINA, vi su página y quiero hacer una consulta.');
    window.open(`https://wa.me/5492604518537?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 z-50 flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
      title="¡Escribinos por WhatsApp!"
    >
      <MessageCircle className="w-7 h-7 relative z-10" />
      
      {/* Pulse animation con pointer-events-none para no bloquear clics */}
      <div className="absolute inset-0 bg-green-600 rounded-full animate-ping opacity-25 pointer-events-none"></div>
    </button>
  );
};

export default WhatsAppFloat;
