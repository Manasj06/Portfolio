import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const steps = [10, 25, 42, 60, 75, 88, 96, 100];
    let i = 0;
    const run = () => {
      if (i < steps.length) {
        const delay = 120 + i * 90;
        setTimeout(() => {
          setProgress(steps[i]);
          i++;
          run();
        }, delay);
      } else {
        setTimeout(() => setDone(true), 300);
        setTimeout(() => onComplete(), 1100);
      }
    };
    run();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: '#050816' }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(16px)' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Pulse rings */}
          <div className="relative w-40 h-40 mb-12">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '1px solid rgba(79,142,247,0.15)' }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute inset-6 rounded-full"
              style={{ border: '1px solid rgba(139,92,246,0.2)' }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            />
            {/* Center logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(79,142,247,0.12), rgba(139,92,246,0.12))',
                  border: '1px solid rgba(79,142,247,0.35)',
                  boxShadow: '0 0 40px rgba(79,142,247,0.25)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <span className="text-2xl font-bold text-gradient select-none">MJ</span>
              </motion.div>
            </div>
          </div>

          {/* Name + role */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p className="text-soft-white/30 text-xs tracking-[0.5em] uppercase mb-2 font-light">Portfolio</p>
            <h1 className="text-3xl font-bold tracking-tight text-soft-white">Manas Joshi</h1>
            <p className="text-soft-white/30 text-sm mt-1">B.Tech CSE · Cloud Computing</p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="w-52"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="h-px rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #4f8ef7, #8b5cf6, #06b6d4)',
                  transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1)',
                }}
              />
            </div>
            <p className="text-white/20 text-xs text-center mt-3 font-mono tabular-nums">{progress}%</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
