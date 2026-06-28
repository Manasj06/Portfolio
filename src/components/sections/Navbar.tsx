import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationItems, personalInfo } from '../../data/portfolio';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    setActive(href);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 ${
              scrolled
                ? 'glass-strong backdrop-blur-xl border border-white/8'
                : 'bg-transparent'
            }`}
          >
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-gradient transition-all duration-300 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, rgba(79,142,247,0.15), rgba(139,92,246,0.15))', border: '1px solid rgba(79,142,247,0.3)' }}>
                MJ
              </div>
              <span className="text-soft-white/80 font-medium text-sm hidden sm:block group-hover:text-white transition-colors">
                {personalInfo.name}
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active === item.href
                      ? 'text-white'
                      : 'text-soft-white/50 hover:text-soft-white/90'
                  }`}
                >
                  {active === item.href && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.2)' }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a
                href="/resume.pdf"
                download
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(79,142,247,0.15), rgba(139,92,246,0.15))',
                  border: '1px solid rgba(79,142,247,0.3)',
                  color: '#e8eaf0',
                }}
              >
                <span>Resume</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v8M2.5 6.5L6 10l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              {/* Mobile hamburger */}
              <button
                className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <motion.span className="w-5 h-px bg-white/70 block" animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} />
                <motion.span className="w-5 h-px bg-white/70 block" animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} />
                <motion.span className="w-5 h-px bg-white/70 block" animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden flex items-start pt-24"
            style={{ background: 'rgba(5,8,22,0.95)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-full px-8 space-y-2">
              {navigationItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="block w-full text-left py-4 text-2xl font-medium text-soft-white/70 hover:text-white border-b border-white/5 transition-colors"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
