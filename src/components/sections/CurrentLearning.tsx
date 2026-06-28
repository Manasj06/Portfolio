import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { currentLearning } from '../../data/portfolio';
import { TrendingUp } from 'lucide-react';

const colorMap: Record<string, { bg: string; border: string; text: string; bar: string }> = {
  blue: {
    bg: 'rgba(79,142,247,0.08)',
    border: 'rgba(79,142,247,0.2)',
    text: '#7eb8fa',
    bar: 'linear-gradient(90deg, #4f8ef7, #06b6d4)',
  },
  purple: {
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
    text: '#c4b5fd',
    bar: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
  },
  cyan: {
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.2)',
    text: '#67e8f9',
    bar: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
  },
};

export function CurrentLearning() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="learning" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px flex-1 max-w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.4))' }} />
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-electric-blue/70">Current Focus</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(79,142,247,0.4), transparent)' }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold leading-tight text-soft-white mb-6"
            >
              Always
              <br />
              <span className="text-gradient">leveling up</span>.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-soft-white/50 leading-relaxed"
            >
              These are the areas I'm actively deepening — with real projects, structured study, and consistent practice.
              The percentages reflect how far along I am in my current learning goals, not years of experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex items-center gap-3 p-4 rounded-xl"
              style={{ background: 'rgba(79,142,247,0.06)', border: '1px solid rgba(79,142,247,0.15)' }}
            >
              <TrendingUp size={18} className="text-electric-blue/70 flex-shrink-0" />
              <p className="text-sm text-soft-white/50">
                Consistency over intensity — I learn every day, even if just for 30 minutes.
              </p>
            </motion.div>
          </div>

          <div className="space-y-5">
            {currentLearning.map((item, i) => {
              const c = colorMap[item.color];
              return (
                <motion.div
                  key={item.topic}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                  className="p-5 rounded-2xl group"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-soft-white">{item.topic}</h4>
                    <span className="text-xs font-mono font-semibold" style={{ color: c.text }}>
                      {item.progress}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1 rounded-full mb-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: c.bar }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${item.progress}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    />
                  </div>

                  <p className="text-xs text-soft-white/35 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
