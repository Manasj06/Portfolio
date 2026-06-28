import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/portfolio';
import { X, ExternalLink, ArrowRight } from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';

const colorMap: Record<string, { border: string; glow: string; tag: string; tagText: string }> = {
  blue: { border: 'rgba(79,142,247,0.25)', glow: 'rgba(79,142,247,0.15)', tag: 'rgba(79,142,247,0.1)', tagText: '#7eb8fa' },
  purple: { border: 'rgba(139,92,246,0.25)', glow: 'rgba(139,92,246,0.15)', tag: 'rgba(139,92,246,0.1)', tagText: '#c4b5fd' },
  cyan: { border: 'rgba(6,182,212,0.25)', glow: 'rgba(6,182,212,0.15)', tag: 'rgba(6,182,212,0.1)', tagText: '#67e8f9' },
};

type Project = typeof projects[number];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const c = colorMap[project.color];
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div className="absolute inset-0" style={{ background: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(20px)' }} />
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }} transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{ background: 'rgba(10,14,30,0.95)', border: `1px solid ${c.border}`, boxShadow: `0 0 60px ${c.glow}` }}
        onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${c.border}, transparent)` }} />
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-soft-white/30">{project.year}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-xs text-soft-white/30">{project.techStack[0]}</span>
              </div>
              <h3 className="text-2xl font-bold text-soft-white">{project.title}</h3>
              <p className="text-sm text-soft-white/40 mt-1">{project.tagline}</p>
            </div>
            <button onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-soft-white/30 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <X size={16} />
            </button>
          </div>

          <div className="space-y-5">
            <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-soft-white/30 mb-2">Overview</h4>
              <p className="text-sm text-soft-white/70 leading-relaxed">{project.description}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[{ label: 'Problem', text: project.problem }, { label: 'Solution', text: project.solution }].map(({ label, text }) => (
                <div key={label} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-soft-white/30 mb-2">{label}</h4>
                  <p className="text-sm text-soft-white/60 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-soft-white/30 mb-3">Key Features</h4>
              <div className="space-y-2">
                {project.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-soft-white/60">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: c.tagText }} />{f}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-soft-white/30 mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-lg text-xs font-medium"
                    style={{ background: c.tag, border: `1px solid ${c.border}`, color: c.tagText }}>{t}</span>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-2xl" style={{ background: `${c.tag}`, border: `1px solid ${c.border}` }}>
              <h4 className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: c.tagText }}>Key Challenge</h4>
              <p className="text-sm text-soft-white/60 leading-relaxed">{project.challenges}</p>
            </div>
            <div className="w-full h-36 rounded-2xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${c.glow}, transparent)`, border: `1px solid ${c.border}` }}>
              <div className="text-center">
                <div className="text-3xl mb-2">🖼</div>
                <p className="text-xs text-soft-white/30">Project Screenshot Placeholder</p>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-soft-white/70 hover:text-white transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <GithubIcon size={15} /> GitHub
              </a>
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${c.tagText}20, ${c.tagText}10)`, border: `1px solid ${c.border}` }}>
                <ExternalLink size={15} /> Live Demo
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, inView, onClick }: {
  project: Project; index: number; inView: boolean; onClick: () => void;
}) {
  const c = colorMap[project.color];
  const emojis = ['🤖', '📄', '🎓', '🕸'];
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
      whileHover={{ y: -6 }} onClick={onClick}
      className="group cursor-pointer p-6 rounded-2xl relative overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', transition: 'border-color 0.4s, box-shadow 0.4s' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.boxShadow = `0 0 40px ${c.glow}`; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none'; }}>
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${c.border}, transparent)` }} />
      <div className="w-full h-36 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${c.glow} 0%, rgba(5,8,22,0) 100%)` }}>
        <span className="text-5xl opacity-60 group-hover:scale-110 transition-transform duration-500">{emojis[index]}</span>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 50% 50%, ${c.glow} 0%, transparent 70%)` }} />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-soft-white/25">{project.year}</span>
          <ArrowRight size={14} className="text-soft-white/20 group-hover:translate-x-1 group-hover:text-soft-white/50 transition-all duration-300" />
        </div>
        <h3 className="text-lg font-bold text-soft-white group-hover:text-white transition-colors">{project.title}</h3>
        <p className="text-sm text-soft-white/40 leading-relaxed line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.techStack.slice(0, 3).map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-lg font-medium"
              style={{ background: c.tag, border: `1px solid ${c.border}40`, color: c.tagText }}>{t}</span>
          ))}
          {project.techStack.length > 3 && (
            <span className="text-xs px-2.5 py-1 rounded-lg font-medium text-soft-white/30"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`, filter: 'blur(15px)' }} />
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 max-w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.4))' }} />
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-electric-blue/70">Projects</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(79,142,247,0.4), transparent)' }} />
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-12">
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold leading-tight text-soft-white">
            Things I've<br /><span className="text-gradient">built</span>.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }} className="text-soft-white/50 leading-relaxed">
            Click any card to explore the full project — problem, solution, tech stack, and more.
          </motion.p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView}
              onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
}
