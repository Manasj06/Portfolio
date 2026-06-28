import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import { Code2, Cloud, Cpu, Rocket } from 'lucide-react';

const traits = [
  {
    icon: Code2,
    title: 'Software Developer',
    description: 'Building clean, scalable applications with modern tech stacks.',
    color: '#4f8ef7',
  },
  {
    icon: Cloud,
    title: 'Cloud Enthusiast',
    description: 'Exploring Azure, cloud architectures, and serverless systems.',
    color: '#06b6d4',
  },
  {
    icon: Cpu,
    title: 'AI Explorer',
    description: 'Integrating LLMs and AI APIs into real-world applications.',
    color: '#8b5cf6',
  },
  {
    icon: Rocket,
    title: 'Continuous Learner',
    description: 'Always shipping, iterating, and leveling up my craft.',
    color: '#4f8ef7',
  },
];

const stats = [
  { value: '9.13', label: 'CGPA', suffix: '/10' },
  { value: '4', label: 'Projects', suffix: '+' },
  { value: '4', label: 'Certifications', suffix: '' },
  { value: '2028', label: 'Graduating', suffix: '' },
];

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 w-px h-32 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(79,142,247,0.4), transparent)' }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px flex-1 max-w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.4))' }} />
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-electric-blue/70">About Me</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(79,142,247,0.4), transparent)' }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Story */}
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold leading-tight text-soft-white"
            >
              Turning curiosity
              <br />
              into <span className="text-gradient">software</span>.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4 text-soft-white/55 leading-relaxed"
            >
              <p>{personalInfo.about}</p>
              <p>{personalInfo.about2}</p>
            </motion.div>

            {/* Education highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="p-5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                  style={{ background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.2)' }}>
                  🎓
                </div>
                <div>
                  <p className="text-sm font-semibold text-soft-white">{personalInfo.university}</p>
                  <p className="text-sm text-soft-white/50 mt-0.5">{personalInfo.degree}</p>
                  <p className="text-sm text-soft-white/40">{personalInfo.branch} · {personalInfo.specialization}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-md text-electric-blue font-medium"
                      style={{ background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.2)' }}>
                      GPA: {personalInfo.gpa}
                    </span>
                    <span className="text-xs text-soft-white/30">Expected 2028</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-4 gap-4"
            >
              {stats.map(({ value, label, suffix }, i) => (
                <div key={label} className="text-center py-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <motion.p
                    className="text-2xl font-bold text-gradient"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {value}<span className="text-base">{suffix}</span>
                  </motion.p>
                  <p className="text-xs text-soft-white/30 mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Trait cards */}
          <div className="grid grid-cols-2 gap-4">
            {traits.map((trait, i) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-5 rounded-2xl group cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${trait.color}30`;
                  e.currentTarget.style.boxShadow = `0 0 30px ${trait.color}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${trait.color}15`, border: `1px solid ${trait.color}25` }}>
                  <trait.icon size={20} style={{ color: trait.color }} />
                </div>
                <h4 className="font-semibold text-soft-white text-sm mb-2">{trait.title}</h4>
                <p className="text-xs text-soft-white/40 leading-relaxed">{trait.description}</p>
              </motion.div>
            ))}

            {/* Quote card spanning full width */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="col-span-2 p-6 rounded-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(79,142,247,0.06), rgba(139,92,246,0.06))',
                border: '1px solid rgba(79,142,247,0.15)',
              }}
            >
              <p className="text-soft-white/70 text-sm leading-relaxed italic">
                "I build software not just to solve today's problems, but to architect
                solutions that scale into tomorrow."
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-px w-8" style={{ background: 'rgba(79,142,247,0.4)' }} />
                <span className="text-xs text-soft-white/30">Manas Joshi</span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
