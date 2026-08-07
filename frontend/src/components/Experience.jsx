import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/profile.js';

export default function Experience() {
  return (
    <section id="experience" className="section-shell">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
        <span className="eyebrow">03 — Experience</span>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-2">Where I've worked</h2>
      </motion.div>

      <div className="space-y-6">
        {experience.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="glass rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full" style={{ background: 'radial-gradient(circle,rgba(124,111,224,0.18),transparent 70%)' }} />
            <div className="flex flex-wrap justify-between gap-3 mb-4 relative">
              <div>
                <h3 className="font-display font-bold text-lg">{exp.company}</h3>
                <p className="text-violetDeep font-semibold text-sm mt-1">{exp.role}</p>
              </div>
              <span className="font-mono text-xs text-slate bg-black/[0.04] px-3 py-1.5 rounded-full h-fit">
                {exp.startDate} — {exp.endDate}
              </span>
            </div>
            <ul className="space-y-2 relative">
              {exp.responsibilities.map((r, idx) => (
                <li key={idx} className="text-[14.2px] text-slate leading-relaxed pl-5 relative before:content-['◆'] before:absolute before:left-0 before:text-pink before:text-[10px] before:top-1">
                  {r}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-4 relative">
              {exp.technologies.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
