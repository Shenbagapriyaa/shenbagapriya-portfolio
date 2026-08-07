import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 18, 100);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            onDone?.();
          }, 400);
        }
        return next;
      });
    }, 180);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(160deg,#FCFCFD,#F4F8FF,#F8F6FF)' }}
        >
          <motion.div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, rgba(124,111,224,0.25), transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,159,199,0.22), transparent 50%)'
            }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.h1
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-display font-extrabold text-3xl md:text-4xl text-ink mb-6 relative z-10"
          >
            Shenbagapriya<span className="text-violet"> N</span>
          </motion.h1>
          <div className="w-56 h-1.5 rounded-full bg-black/5 overflow-hidden relative z-10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg,#7C6FE0,#FF9FC7)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <p className="mt-4 text-xs font-mono text-slate relative z-10">{Math.floor(progress)}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
