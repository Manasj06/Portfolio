import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { careerVision } from '../../data/portfolio';
import { Target, Sparkles } from 'lucide-react';

export function CareerVision() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="vision" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px flex-1 max-w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.4))' }} />
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-electric-blue/70">Career Vision</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(79,142,247,0.4), transparent)' }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold leading-tight text-soft-white mb-6"
            >
              Where I'm
              <br />
              <span className="text-gradient">heading</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-soft-white/55 leading-relaxed mb-8"
            >
              {careerVision.description}
            </motion.p>

            {/* Goals */}
            <div className="space-y-3">
              {careerVision.goals.map((goal, i) => (
                <motion.div
                  key={goal}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-soft-white/60"
                >
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #4f8ef7, #8b5cf6)' }} />
                  {goal}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Quote + Vision cards */}
          <div className="space-y-5">
            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="p-8 rounded-3xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(79,142,247,0.06), rgba(139,92,246,0.06))',
                border: '1px solid rgba(79,142,247,0.2)',
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.5), transparent)' }} />

              <Sparkles size={20} className="text-electric-blue/50 mb-4" />
              <blockquote className="text-lg font-medium text-soft-white/80 leading-relaxed mb-4">
                {careerVision.quote}
              </blockquote>
              <div className="flex items-center gap-2">
                <div className="h-px w-8" style={{ background: 'rgba(79,142,247,0.4)' }} />
                <span className="text-xs text-soft-white/30">Manas Joshi</span>
              </div>

              <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', filter: 'blur(20px)' }} />
            </motion.div>

            {/* Target card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="p-6 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Target size={18} className="text-soft-white/40" />
                <span className="text-sm font-medium text-soft-white/60">Career Goal</span>
              </div>
              <p className="text-sm text-soft-white/50 leading-relaxed">
                To become a Software Engineer specializing in AI-powered applications,
                cloud technologies, and scalable backend systems while continuously
                learning and building impactful software.
              </p>
            </motion.div>

            {/* Openness signal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-between p-4 rounded-xl"
              style={{ background: 'rgba(79,142,247,0.06)', border: '1px solid rgba(79,142,247,0.15)' }}
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-soft-white/60">Open to internships & new grad roles</span>
              </div>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-xs font-medium text-electric-blue/70 hover:text-electric-blue transition-colors">
                Get in touch →
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
