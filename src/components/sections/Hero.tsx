import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowDown, Download, Layers } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; color: string;
    }

    const colors = ['rgba(79,142,247,', 'rgba(139,92,246,', 'rgba(6,182,212,'];
    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let mouse = { x: W / 2, y: H / 2 };
    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', onMouseMove);

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(79,142,247,${(1 - dist / 120) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) { p.vx += (dx / dist) * 0.015; p.vy += (dy / dist) * 0.015; }
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.6 }} />;
}

function GridLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(79,142,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.03) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
      }} />
    </div>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } } };

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GridLines />
      <ParticleField />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">
          {/* Left */}
          <div className="space-y-8">
            <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: 'easeOut' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.25)', color: '#7eb8fa' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Available for opportunities · Graduating 2028
              </div>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: 'easeOut' }} className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                <span className="text-soft-white">Hi, I'm </span><br />
                <span className="text-gradient">Manas Joshi</span>
              </h1>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: 'easeOut' }}>
              <p className="text-lg sm:text-xl text-soft-white/60 font-light leading-relaxed max-w-lg">
                B.Tech CSE student at <span className="text-soft-white/80 font-medium">SRM University</span>, specializing in{' '}
                <span className="text-gradient-blue font-medium">Cloud Computing</span>. Building AI-powered applications and scalable backend systems.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: 'easeOut' }} className="flex flex-wrap gap-2">
              {['Aspiring SWE', 'AI Enthusiast', 'Cloud Computing', 'Full Stack'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-lg text-xs font-medium text-soft-white/50"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>{tag}</span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: 'easeOut' }} className="flex flex-wrap gap-4">
              <motion.a href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #4f8ef7, #8b5cf6)', boxShadow: '0 0 30px rgba(79,142,247,0.25)' }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(79,142,247,0.4)' }}
                whileTap={{ scale: 0.97 }}>
                <Layers size={16} /> View Projects
              </motion.a>
              <a href="/resume.pdf" download
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold text-soft-white/80 hover:text-white transition-all duration-300 hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Download size={16} /> Download Resume
              </a>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: 'easeOut' }} className="flex items-center gap-4">
              {[
                { href: personalInfo.github, icon: <GithubIcon size={17} />, label: 'GitHub' },
                { href: personalInfo.linkedin, icon: <LinkedinIcon size={17} />, label: 'LinkedIn' },
                { href: `mailto:${personalInfo.email}`, icon: <Mail size={17} />, label: 'Email' },
              ].map(({ href, icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-lg text-soft-white/40 hover:text-white transition-all duration-300 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  {icon}
                </a>
              ))}
              <div className="h-px w-12 bg-white/10" />
              <span className="text-xs text-soft-white/30 font-mono hidden sm:block">{personalInfo.email}</span>
            </motion.div>
          </div>

          {/* Right: Profile card */}
          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: 'easeOut' }} className="hidden lg:block">
            <div className="relative w-72 p-6 rounded-3xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}>
              <div className="absolute -top-px left-1/2 -translate-x-1/2 w-2/3 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.6), transparent)' }} />
              <div className="flex flex-col items-center text-center space-y-4">
                <motion.div className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold"
                  style={{ background: 'linear-gradient(135deg, rgba(79,142,247,0.15), rgba(139,92,246,0.15))', border: '1px solid rgba(79,142,247,0.3)', boxShadow: '0 0 40px rgba(79,142,247,0.2)' }}
                  animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                  <span className="text-gradient select-none">MJ</span>
                </motion.div>
                <div>
                  <h3 className="font-bold text-soft-white text-lg">Manas Joshi</h3>
                  <p className="text-soft-white/40 text-sm mt-0.5">CS Student & Developer</p>
                </div>
                <div className="grid grid-cols-3 gap-3 w-full pt-2">
                  {[{ label: 'GPA', value: '9.13' }, { label: 'Projects', value: '4+' }, { label: 'Certs', value: '4' }].map(({ label, value }) => (
                    <div key={label} className="py-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-lg font-bold text-gradient">{value}</p>
                      <p className="text-xs text-soft-white/30 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                  {['Java', 'React', 'Python', 'Azure', 'Node.js'].map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-md text-xs text-soft-white/50"
                      style={{ background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.15)' }}>{s}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-soft-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Open to internships & roles
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', filter: 'blur(20px)' }} />
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}>
          <span className="text-xs text-soft-white/20 font-light tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown size={16} className="text-soft-white/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
