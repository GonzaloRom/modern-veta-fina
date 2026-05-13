import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

const WHATSAPP_NUMBER = '5491112345678';
const WHATSAPP_MSG = encodeURIComponent('Hola VETA FINA, vi su página y quiero hacer una consulta.');

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-warm-950 text-cream-200">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="font-serif text-3xl font-bold text-cream-50 tracking-widest">VETA FINA</h2>
              <p className="text-gold-400 text-xs tracking-[0.3em] uppercase font-sans font-light mt-1">Muebles a Medida</p>
            </div>
            <p className="font-sans text-sm text-cream-400 leading-relaxed max-w-sm">
              Fabricamos muebles únicos con maderas nobles y procesos artesanales.
              Cada pieza refleja tu visión y perdura generaciones.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              <SocialBtn href="https://instagram.com" icon={<Instagram size={18} />} label="Instagram" />
              <SocialBtn href="https://facebook.com" icon={<Facebook size={18} />} label="Facebook" />
              <SocialBtn
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                label="WhatsApp"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                }
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg text-cream-100 mb-5 font-semibold">Contacto</h3>
            <ul className="space-y-4">
              <ContactItem icon={<MapPin size={15} />} text="Av. del Taller 1240, Buenos Aires" />
              <ContactItem icon={<Phone size={15} />} text="+54 9 11 1234-5678" href={`tel:+5491112345678`} />
              <ContactItem icon={<Mail size={15} />} text="hola@vetafina.com.ar" href="mailto:hola@vetafina.com.ar" />
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-serif text-lg text-cream-100 mb-5 font-semibold">Navegación</h3>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', href: '#inicio' },
                { label: 'Catálogo', href: '#productos' },
                { label: 'Sobre Nosotros', href: '#nosotros' },
                { label: 'Cotizar a Medida', href: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}` },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('https') ? '_blank' : undefined}
                    rel={link.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                    className="font-sans text-sm text-cream-400 hover:text-gold-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-warm-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-cream-600">
            © {year} VETA FINA. Todos los derechos reservados.
          </p>
          <p className="font-sans text-xs text-cream-700">
            Fabricación artesanal · Buenos Aires, Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialBtn({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full border border-warm-700 flex items-center justify-center text-cream-400 hover:text-gold-400 hover:border-gold-400 transition-all duration-200"
    >
      {icon}
    </a>
  );
}

function ContactItem({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="text-gold-400 mt-0.5 flex-shrink-0">{icon}</span>
      <span className="font-sans text-sm text-cream-400 leading-snug">{text}</span>
    </div>
  );
  if (href) {
    return (
      <li>
        <a href={href} className="hover:text-cream-200 transition-colors">{content}</a>
      </li>
    );
  }
  return <li>{content}</li>;
}
