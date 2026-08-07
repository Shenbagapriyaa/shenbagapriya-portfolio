import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../data/profile.js';

export default function Projects() {
  return (
    <section id="projects" className="section-shell">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
        <span className="eyebrow">04 — Featured Projects</span>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-2">Projects That Matter</h2>
        <p className="text-slate text-[15.5px] mt-3 max-w-lg">From full-stack web applications to AI-powered solutions, each project demonstrates my ability to solve real-world problems using modern technologies, scalable architecture and clean, user-focused design.</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className="glass rounded-3xl overflow-hidden"
          >
            <div className={`h-36 flex items-center justify-center text-4xl bg-gradient-to-br ${p.gradient}`}>{p.emoji}</div>
            <div className="p-6">
              <h3 className="font-semibold text-[17px] mb-2">{p.title}</h3>
              <p className="text-[13.6px] text-slate leading-relaxed mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.techStack.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="flex gap-4 text-[12.8px] font-semibold text-violetDeep">
                <a href={p.githubUrl} className="flex items-center gap-1.5 hover:underline"><FaGithub /> GitHub</a>
                {/* <a href={p.liveUrl} className="flex items-center gap-1.5 hover:underline"><FaExternalLinkAlt size={11} /> Live Demo</a> */}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
