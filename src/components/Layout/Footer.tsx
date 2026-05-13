import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Heart } from 'lucide-react';
import { contactInfo } from '../../data/mockData';

const Footer: React.FC = () => {
const handleWhatsAppClick = () => {
  // Usa solo el número limpio de contactInfo.whatsapp
  const number = contactInfo.whatsapp.replace(/\D/g, ''); // elimina todo lo que no sea número
  window.open(`https://wa.me/${number}`, '_blank');
};


  const handleEmailClick = () => {
    window.open(`mailto:aronguanda@gmail.com:${contactInfo.email}`, '_blank');
  };

  const handleInstagramClick = () => {
    window.open(`${contactInfo.socialMedia.instagram?.replace('@', '')}`, '_blank');
  };

  const handleFacebookClick = () => {
    window.open(`https://facebook.com/${contactInfo.socialMedia.facebook}`, '_blank');
  };

  return (
    <footer className="bg-amber-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información de la empresa */}
          <div>
            <h3 className="text-2xl font-bold mb-4">VETA FINA</h3>
            <p className="text-amber-100 mb-4 leading-relaxed">
              Especialistas en muebles a medida con más de 15 años de experiencia. 
              Creamos piezas únicas con materiales nobles y procesos artesanales.
            </p>
            <p className="text-amber-200 text-sm">
              Cada mueble cuenta una historia, la tuya.
            </p>
          </div>

          {/* Información de contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-amber-300" />
                <span className="text-amber-100 text-sm">{contactInfo.address}</span>
              </div>
              
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center group hover:text-green-300 transition-colors duration-200"
              >
                <Phone className="w-5 h-5 mr-3 text-amber-300 group-hover:text-green-300" />
                <span className="text-amber-100 text-sm group-hover:text-green-300">
                  {contactInfo.whatsapp}
                </span>
              </button>
              
              <button
                onClick={handleEmailClick}
                className="flex items-center group hover:text-blue-300 transition-colors duration-200"
              >
                <Mail className="w-5 h-5 mr-3 text-amber-300 group-hover:text-blue-300" />
                <span className="text-amber-100 text-sm group-hover:text-blue-300">
                  {contactInfo.email}
                </span>
              </button>
            </div>
          </div>

          {/* Redes sociales y horarios */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4 mb-6">
              <button
                onClick={handleInstagramClick}
                className="bg-amber-800 p-3 rounded-full hover:bg-pink-600 transition-colors duration-200 group"
              >
                <Instagram className="w-5 h-5 text-white" />
              </button>
              
              <button
                onClick={handleFacebookClick}
                className="bg-amber-800 p-3 rounded-full hover:bg-blue-600 transition-colors duration-200 group"
              >
                <Facebook className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">Horarios de Atención</h5>
              <p className="text-amber-100 text-sm">Lunes a Viernes: 9:00 - 18:00</p>
              <p className="text-amber-100 text-sm">Sábados: 9:00 - 13:00</p>
              <p className="text-amber-100 text-sm">Domingos: Cerrado</p>
            </div>
          </div>
        </div>

        {/* Línea divisoria y créditos */}
        <div className="border-t border-amber-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-amber-200 text-sm mb-4 md:mb-0">
              © 2024 VETA FINA. Todos los derechos reservados.
            </p>
            
            <div className="pb-16">
                <p className="text-amber-200 text-sm flex items-center">
                  Hecho con <Heart className="w-4 h-4 mx-1 text-red-400 items-center" /> para crear espacios únicos
                </p>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;