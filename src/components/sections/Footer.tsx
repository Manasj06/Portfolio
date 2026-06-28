import { motion } from 'framer-motion';
import { Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative py-12 mt-8">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-gradient"
              style={{ background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.2)' }}>MJ</div>
            <div>
              <p className="text-sm font-semibold text-soft-white/70">{personalInfo.name}</p>
              <p className="text-xs text-soft-white/25">{personalInfo.tagline}</p>
            </div>
          </div>
          <p className="text-xs text-soft-white/20 order-last sm:order-none">
            © {new Date().getFullYear()} Manas Joshi. Designed & built with ☕
          </p>
          <div className="flex items-center gap-3">
            {[
              { href: personalInfo.github, icon: <GithubIcon size={14} />, label: 'GitHub' },
              { href: personalInfo.linkedin, icon: <LinkedinIcon size={14} />, label: 'LinkedIn' },
              { href: `mailto:${personalInfo.email}`, icon: <Mail size={14} />, label: 'Email' },
            ].map(({ href, icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-soft-white/30 hover:text-soft-white/70 transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {icon}
              </a>
            ))}
            <motion.button onClick={scrollTop}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-soft-white/30 hover:text-white transition-all"
              style={{ background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.2)' }}
              whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} aria-label="Back to top">
              <ArrowUp size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
