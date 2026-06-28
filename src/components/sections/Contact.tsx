import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import { Send, Mail, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  const links = [
    { href: `mailto:${personalInfo.email}`, icon: <Mail size={16} />, label: 'Email', value: personalInfo.email },
    { href: personalInfo.github, icon: <GithubIcon size={16} />, label: 'GitHub', value: 'github.com/Manasj06' },
    { href: personalInfo.linkedin, icon: <LinkedinIcon size={16} />, label: 'LinkedIn', value: 'linkedin.com/in/manas-joshi' },
  ];

  const inputBase = {
    background: 'rgba(255,255,255,0.04)',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.3), rgba(139,92,246,0.3), transparent)' }} />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 max-w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.4))' }} />
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-electric-blue/70">Contact</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(79,142,247,0.4), transparent)' }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold leading-tight text-soft-white mb-6">
              Let's build<br /><span className="text-gradient">something</span>.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-soft-white/50 leading-relaxed mb-10">
              Whether you're a recruiter, a fellow developer, or someone with an idea —
              I'd love to connect. Drop me a message and I'll get back within 24 hours.
            </motion.p>

            <div className="space-y-3">
              {links.map(({ href, icon, label, value }, i) => (
                <motion.a key={label} href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(79,142,247,0.25)'; e.currentTarget.style.background = 'rgba(79,142,247,0.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-electric-blue/70"
                    style={{ background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.2)' }}>
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs text-soft-white/30 mb-0.5">{label}</p>
                    <p className="text-sm text-soft-white/70 group-hover:text-white transition-colors">{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="p-8 rounded-3xl relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.4), transparent)' }} />

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}>
                    <CheckCircle size={28} className="text-green-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-soft-white mb-2">Message sent!</h3>
                  <p className="text-soft-white/50 text-sm">I'll get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)}
                    className="mt-6 text-sm text-electric-blue/60 hover:text-electric-blue transition-colors">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-lg font-bold text-soft-white mb-6">Send a message</h3>

                  {[
                    { id: 'name', label: 'Your name', type: 'text', placeholder: 'John Doe' },
                    { id: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com' },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                      <label className="block text-xs font-medium text-soft-white/40 mb-1.5">{label}</label>
                      <input type={type}
                        value={form[id as keyof typeof form]}
                        onChange={(e) => { setForm((f) => ({ ...f, [id]: e.target.value })); setErrors((er) => ({ ...er, [id]: '' })); }}
                        placeholder={placeholder}
                        className="w-full px-4 py-3 rounded-xl text-sm text-soft-white/80 placeholder-soft-white/20"
                        style={{ ...inputBase, border: `1px solid ${errors[id] ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.07)'}` }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(79,142,247,0.4)'; e.currentTarget.style.background = 'rgba(79,142,247,0.04)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = errors[id] ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                      />
                      {errors[id] && <p className="text-xs text-red-400/70 mt-1">{errors[id]}</p>}
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-medium text-soft-white/40 mb-1.5">Message</label>
                    <textarea rows={4}
                      value={form.message}
                      onChange={(e) => { setForm((f) => ({ ...f, message: e.target.value })); setErrors((er) => ({ ...er, message: '' })); }}
                      placeholder="Tell me about your project or opportunity..."
                      className="w-full px-4 py-3 rounded-xl text-sm text-soft-white/80 placeholder-soft-white/20 resize-none"
                      style={{ ...inputBase, border: `1px solid ${errors.message ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.07)'}` }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(79,142,247,0.4)'; e.currentTarget.style.background = 'rgba(79,142,247,0.04)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = errors.message ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                    />
                    {errors.message && <p className="text-xs text-red-400/70 mt-1">{errors.message}</p>}
                  </div>

                  <motion.button type="submit" disabled={sending}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold text-white disabled:opacity-70"
                    style={{ background: 'linear-gradient(135deg, #4f8ef7, #8b5cf6)', boxShadow: '0 0 30px rgba(79,142,247,0.2)' }}
                    whileHover={{ boxShadow: '0 0 50px rgba(79,142,247,0.35)', scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}>
                    {sending ? (
                      <>
                        <motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                        Sending...
                      </>
                    ) : (
                      <><Send size={15} /> Send Message</>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
