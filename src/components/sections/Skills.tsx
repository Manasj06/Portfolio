import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../../data/portfolio';

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  blue: {
    bg: 'rgba(79,142,247,0.08)',
    border: 'rgba(79,142,247,0.2)',
    text: '#7eb8fa',
    glow: 'rgba(79,142,247,0.2)',
  },
  cyan: {
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.2)',
    text: '#67e8f9',
    glow: 'rgba(6,182,212,0.2)',
  },
  purple: {
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
    text: '#c4b5fd',
    glow: 'rgba(139,92,246,0.2)',
  },
};

function SkillTag({ name, color }: { name: string; color: string }) {
  const c = colorMap[color];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="px-4 py-2.5 rounded-xl text-sm font-medium cursor-default select-none transition-all duration-300"
      style={{
        background: hovered ? c.bg : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? c.border : 'rgba(255,255,255,0.06)'}`,
        color: hovered ? c.text : 'rgba(232,234,240,0.6)',
        boxShadow: hovered ? `0 0 20px ${c.glow}` : 'none',
      }}
    >
      {name}
    </motion.div>
  );
}

function SkillCategory({ category, color, icon, items, index, inView }: {
  category: string; color: string; icon: string; items: string[];
  index: number; inView: boolean;
}) {
  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="p-6 rounded-2xl relative overflow-hidden group"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Top border highlight */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${c.border}, transparent)`, opacity: 0.6 }} />

      {/* Category header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base font-mono"
          style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-soft-white/80">{category}</h3>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <SkillTag key={item} name={item} color={color} />
        ))}
      </div>

      {/* Hover glow */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`, filter: 'blur(20px)' }} />
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px flex-1 max-w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.4))' }} />
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-electric-blue/70">Skills Lab</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(79,142,247,0.4), transparent)' }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold leading-tight text-soft-white"
          >
            Tools I work
            <br />
            <span className="text-gradient">with</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-soft-white/50 leading-relaxed lg:pt-4"
          >
            A growing toolkit spanning frontend, backend, cloud, and AI.
            Hover over any skill to see it light up.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skillGroup, i) => (
            <SkillCategory
              key={skillGroup.category}
              {...skillGroup}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>
    </section>
  );
}
