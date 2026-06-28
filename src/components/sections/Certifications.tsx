import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { certifications } from '../../data/portfolio';
import { ShieldCheck } from 'lucide-react';

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  blue: {
    bg: 'rgba(79,142,247,0.08)',
    border: 'rgba(79,142,247,0.25)',
    text: '#7eb8fa',
    glow: 'rgba(79,142,247,0.15)',
  },
  cyan: {
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.25)',
    text: '#67e8f9',
    glow: 'rgba(6,182,212,0.15)',
  },
  purple: {
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.25)',
    text: '#c4b5fd',
    glow: 'rgba(139,92,246,0.15)',
  },
};

export function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px flex-1 max-w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.4))' }} />
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-electric-blue/70">Certifications</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(79,142,247,0.4), transparent)' }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-end mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold leading-tight text-soft-white"
          >
            Validated
            <br />
            <span className="text-gradient">expertise</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-soft-white/50 leading-relaxed"
          >
            Industry certifications from Microsoft, Oracle, IIT, and JP Morgan Chase — demonstrating commitment beyond the classroom.
          </motion.p>
        </div>

        {/* Cert cards */}
        <div className="grid sm:grid-cols-2 gap-5">
          {certifications.map((cert, i) => {
            const c = colorMap[cert.color];
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -4 }}
                className="group p-6 rounded-2xl relative overflow-hidden cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = c.border;
                  e.currentTarget.style.boxShadow = `0 0 40px ${c.glow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Top gradient */}
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${c.border}, transparent)` }} />

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                    style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                    <ShieldCheck size={22} style={{ color: c.text }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-mono text-soft-white/25">{cert.year}</span>
                      <span className="text-xs px-2 py-0.5 rounded-md font-medium"
                        style={{ background: c.bg, border: `1px solid ${c.border}40`, color: c.text }}>
                        {cert.issuer}
                      </span>
                    </div>
                    <h3 className="font-bold text-soft-white text-base mb-2 group-hover:text-white transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-soft-white/45 leading-relaxed">{cert.description}</p>
                  </div>
                </div>

                {/* Corner glow */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`, filter: 'blur(15px)' }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
