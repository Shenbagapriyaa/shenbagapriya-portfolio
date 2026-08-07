import React from 'react';
import { motion } from 'framer-motion';
import { achievements, certifications } from '../data/profile.js';

export default function Achievements() {
  return (
    <section id="achievements" className="section-shell">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
        <span className="eyebrow">05 — Achievements</span>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-2">Recognition along the way</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            className="glass rounded-2xl p-5 flex gap-3.5"
          >
            <div className="w-11 h-11 min-w-[44px] rounded-xl flex items-center justify-center text-lg" style={{ background: 'linear-gradient(135deg,#8FC7FF,#7C6FE0)' }}>{a.icon}</div>
            <div>
              <h4 className="font-semibold text-[14.3px] leading-snug">{a.title}</h4>
              <span className="text-xs text-slate">{a.org}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div id="certifications" className="mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
          <span className="eyebrow">06 — Certifications</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-2">Continuous Learning</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-[14.5px] pr-2">{c.title}</h4>
                <span className="text-xl">{c.icon}</span>
              </div>
              <span className="text-xs text-slate block">{c.issuer}{c.grade ? ` · ${c.grade}` : ''} · {c.date}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
