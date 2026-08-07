import React from 'react';
import { motion } from 'framer-motion';
import { education, profile } from '../data/profile.js';

const pillars = [
  { title: 'Problem Solving', detail: 'DSA · Debugging · Analytical Thinking' },
  { title: 'Software Development', detail: ' Django · React.js · Node.js · REST APIs' },
  { title: 'Team Collaboration', detail: 'Hackathons · Leadership · Project Experience' },
  { title: 'Continuous Learning', detail: 'NPTEL · IEEE Publication · Certifications' }
];

export default function About() {
  return (
    <section id="about" className="section-shell">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
        <span className="eyebrow">01 — About</span>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-2">Building things that solve real problems.</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-14">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          {profile.bio.map((p, i) => (
            <p key={i} className="text-slate text-[15.5px] leading-[1.85] mb-4">{p}</p>
          ))}
          <div className="grid grid-cols-2 gap-3.5 mt-6">
            {pillars.map((p) => (
              <div key={p.title} className="glass rounded-2xl px-4.5 py-4 text-[13.5px] font-semibold">
                {p.title}
                <span className="block text-[11.5px] font-medium text-slate mt-1">{p.detail}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="relative pl-7">
          <div className="absolute left-[5px] top-1.5 bottom-1.5 w-0.5 rounded" style={{ background: 'linear-gradient(#7C6FE0,#FF9FC7,#8FC7FF)' }} />
          {education.map((e, i) => (
            <div key={i} className="relative pb-8 last:pb-0">
              <div className="absolute -left-7 top-1 w-3 h-3 rounded-full bg-white border-[2.5px] border-violet" />
              <span className="font-mono text-[11.5px] text-violetDeep block mb-1">{e.date}</span>
              <h4 className="font-semibold text-[15.5px]">{e.title}</h4>
              <p className="text-[13.8px] text-slate mt-1">{e.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
