import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';

const WHATSAPP_MEDIDA_MSG = encodeURIComponent(
  'Hola VETA FINA, estoy interesado en un mueble a medida. ¿Podrían darme más información?'
);
const WHATSAPP_NUMBER = '5492604518537';

interface NavbarProps {
  darkMode: boolean;
  onToggleDark: () => void;
  currentSection: string;
  onNavigate: (section: string) => void;
}

export default function Navbar({ darkMode, onToggleDark, currentSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsDrop, setProductsDrop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBase = scrolled || mobileOpen
    ? 'bg-cream-50/95 dark:bg-warm-950/95 shadow-warm backdrop-blur-md'
    : 'bg-transparent';

  const textColor = scrolled || mobileOpen
    ? 'text-warm-800 dark:text-cream-100'
    : 'text-cream-50';

  const handleNav = (section: string) => {
    onNavigate(section);
    setMobileOpen(false);
    setProductsDrop(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBase}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
                   {/* Logo con borde súper ajustado */}
            <button
              onClick={() => handleNav('inicio')}
              className="flex flex-col items-start leading-none group"
            >
              <div
                className={`border-4 px-2 py-0 rounded transition-colors duration-300 ${
                  scrolled || mobileOpen
                    ? 'border-warm-800 dark:border-cream-100'
                    : 'border-cream-50'
                }`}
              >
                <span
                  className={`font-serif text-2xl md:text-3xl font-bold tracking-widest leading-none transition-colors ${textColor}`}
                >
                  VETA FINA
                </span>
              </div>
            </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink active={currentSection === 'inicio'} scrolled={scrolled} onClick={() => handleNav('inicio')}>
              Inicio
            </NavLink>

            {/* Products dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsDrop(true)}
              onMouseLeave={() => setProductsDrop(false)}
            >
              <button
                className={`flex items-center gap-1 font-sans text-sm font-medium tracking-wide transition-colors duration-200 ${
                  scrolled
                    ? currentSection === 'productos'
                      ? 'text-gold-600 dark:text-gold-400'
                      : 'text-warm-700 dark:text-cream-200 hover:text-gold-600 dark:hover:text-gold-400'
                    : 'text-cream-100 hover:text-gold-300'
                }`}
              >
                Productos <ChevronDown size={14} className={`transition-transform duration-200 ${productsDrop ? 'rotate-180' : ''}`} />
              </button>
              {productsDrop && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-cream-50 dark:bg-warm-900 rounded-xl shadow-warm-lg border border-cream-200 dark:border-warm-700 overflow-hidden animate-fade-in">
                  <button
                    onClick={() => handleNav('productos')}
                    className="w-full text-left px-5 py-3 text-sm font-sans text-warm-800 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-warm-800 transition-colors"
                  >
                    Con stock
                  </button>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MEDIDA_MSG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 text-sm font-sans text-warm-800 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-warm-800 transition-colors border-t border-cream-200 dark:border-warm-700"
                  >
                    <span className="w-2 h-2 rounded-full bg-gold-400 flex-shrink-0" />
                    A medida
                  </a>
                </div>
              )}
            </div>

            <NavLink active={currentSection === 'nosotros'} scrolled={scrolled} onClick={() => handleNav('nosotros')}>
              Sobre Nosotros
            </NavLink>

            <button
              onClick={onToggleDark}
              className={`p-2 rounded-full transition-all duration-200 ${
                scrolled || mobileOpen
                  ? 'text-warm-600 dark:text-cream-300 hover:bg-cream-200 dark:hover:bg-warm-800'
                  : 'text-cream-200 hover:text-white'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MEDIDA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-warm-950 font-sans font-semibold text-sm rounded-full transition-all duration-200 shadow-gold hover:shadow-lg hover:-translate-y-0.5"
            >
              Cotizar
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={onToggleDark}
              className={`p-2 rounded-full transition-colors ${textColor}`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-full transition-colors ${textColor}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream-50/98 dark:bg-warm-950/98 backdrop-blur-md border-t border-cream-200 dark:border-warm-800 animate-fade-in">
          <div className="px-6 py-4 space-y-1">
            <MobileNavLink onClick={() => handleNav('inicio')} active={currentSection === 'inicio'}>Inicio</MobileNavLink>
            <MobileNavLink onClick={() => handleNav('productos')} active={currentSection === 'productos'}>Productos — Con Stock</MobileNavLink>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MEDIDA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full text-left px-4 py-3 text-warm-700 dark:text-cream-200 font-sans text-sm rounded-lg hover:bg-cream-100 dark:hover:bg-warm-800 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-gold-400" />
              Productos — A Medida
            </a>
            <MobileNavLink onClick={() => handleNav('nosotros')} active={currentSection === 'nosotros'}>Sobre Nosotros</MobileNavLink>
            <div className="pt-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MEDIDA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-5 py-3 bg-gold-500 hover:bg-gold-400 text-warm-950 font-sans font-semibold text-sm rounded-full transition-colors"
              >
                Solicitar Cotización
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ children, active, scrolled, onClick }: { children: React.ReactNode; active: boolean; scrolled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`font-sans text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
        scrolled
          ? active
            ? 'text-gold-600 dark:text-gold-400'
            : 'text-warm-700 dark:text-cream-200 hover:text-gold-600 dark:hover:text-gold-400'
          : active
            ? 'text-gold-300'
            : 'text-cream-100 hover:text-gold-300'
      }`}
    >
      {children}
      <span className={`absolute -bottom-1 left-0 h-px bg-gold-400 transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
    </button>
  );
}

function MobileNavLink({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg font-sans text-sm transition-colors ${
        active
          ? 'bg-gold-50 dark:bg-warm-800 text-gold-700 dark:text-gold-400 font-semibold'
          : 'text-warm-700 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-warm-800'
      }`}
    >
      {children}
    </button>
  );
}
