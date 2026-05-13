import React, { useState } from 'react';
import { Menu, X, Home, Package, Users } from 'lucide-react';
import logo from '/img/logoicon.png'; // ✅ Ajustá la ruta si está en otro lugar

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSectionClick = (section: string) => {
    onSectionChange(section);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo con imagen */}
          <div className="flex items-center">
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => handleSectionClick('inicio')}
            >
              <img src={logo} alt="Veta Fina Logo" className="h-10 w-auto" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => handleSectionClick('inicio')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeSection === 'inicio'
                    ? 'text-amber-800 bg-amber-50'
                    : 'text-gray-700 hover:text-amber-800 hover:bg-amber-50'
                }`}
              >
                <Home className="w-4 h-4 mr-2" />
                Inicio
              </button>

              <button
                onClick={() => handleSectionClick('productos')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeSection === 'productos'
                    ? 'text-amber-800 bg-amber-50'
                    : 'text-gray-700 hover:text-amber-800 hover:bg-amber-50'
                }`}
              >
                <Package className="w-4 h-4 mr-2" />
                Productos
              </button>

              <button
                onClick={() => handleSectionClick('nosotros')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeSection === 'nosotros'
                    ? 'text-amber-800 bg-amber-50'
                    : 'text-gray-700 hover:text-amber-800 hover:bg-amber-50'
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                Sobre Nosotros
              </button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-amber-800 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <button
              onClick={() => handleSectionClick('inicio')}
              className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                activeSection === 'inicio'
                  ? 'text-amber-800 bg-amber-50'
                  : 'text-gray-700 hover:text-amber-800 hover:bg-amber-50'
              }`}
            >
              <Home className="w-5 h-5 mr-3" />
              Inicio
            </button>

            <button
              onClick={() => handleSectionClick('productos')}
              className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                activeSection === 'productos'
                  ? 'text-amber-800 bg-amber-50'
                  : 'text-gray-700 hover:text-amber-800 hover:bg-amber-50'
              }`}
            >
              <Package className="w-5 h-5 mr-3" />
              Productos
            </button>

            <button
              onClick={() => handleSectionClick('nosotros')}
              className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                activeSection === 'nosotros'
                  ? 'text-amber-800 bg-amber-50'
                  : 'text-gray-700 hover:text-amber-800 hover:bg-amber-50'
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              Sobre Nosotros
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;