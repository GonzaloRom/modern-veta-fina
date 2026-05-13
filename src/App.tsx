import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

type Section = 'inicio' | 'productos' | 'nosotros';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('vf-dark');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [currentSection, setCurrentSection] = useState<Section>('inicio');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('vf-dark', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const sections = ['inicio', 'productos', 'nosotros'] as Section[];
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) {
          setCurrentSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-warm-950 font-sans antialiased transition-colors duration-300">
      <Navbar
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
        currentSection={currentSection}
        onNavigate={handleNavigate}
      />
      <main>
        <Hero onNavigate={handleNavigate} />
        <Products />
        <AboutUs />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
