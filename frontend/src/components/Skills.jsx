import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/profile.js';

const icons = {
  Programming: '💻',
  Frontend: '🎨',
  Backend: '⚙️',
  Database: '🗄️',
  'AI Technologies': '🤖',
  Tools: '🛠️'
};

export default function Skills() {
  return (
    <section id="skills" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <span className="eyebrow">02 — Skills</span>

        <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-2">
          My Technical Toolbox
        </h2>

        <p className="text-slate text-[15.5px] mt-3 max-w-lg">
          Technologies and tools I use to design, develop and deliver reliable software solutions.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([category, items], i) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -8 }}
            className="glass rounded-[22px] p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg text-white"
                style={{
                  background: 'linear-gradient(135deg,#7C6FE0,#FF9FC7)',
                }}
              >
                {icons[category]}
              </div>

              <h4 className="font-semibold text-lg">{category}</h4>
            </div>

            <ul className="space-y-3">
              {items.map((skill) => (
                <li
                  key={skill.name}
                  className="glass rounded-xl px-4 py-3 flex items-center justify-between hover:scale-[1.02] transition-transform"
                >
                  <span className="font-medium">{skill.name}</span>

                  <span className="text-pink-400 text-lg"> </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}