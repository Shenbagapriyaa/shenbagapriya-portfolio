import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sections = ['home', 'about', 'skills', 'experience', 'projects', 'certifications', 'achievements', 'resume', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) current = id;
      }
      setActive(current);
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[6vw] py-4 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl bg-white/65 border-b border-black/[0.06] shadow-sm' : 'bg-transparent'
      }`}
    >
      <a href="#home" className="font-display font-bold text-lg">
        Shenbagapriya<span className="text-violet"> N</span>
      </a>
      <div className="hidden md:flex gap-8">
        {sections.slice(0, -1).map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`text-sm font-medium capitalize transition-colors ${
              active === id ? 'text-violetDeep' : 'text-slate hover:text-ink'
            }`}
          >
            {id}
          </a>
        ))}
      </div>
      <a href="#contact" className="hidden md:inline-flex px-5 py-2 rounded-full bg-ink text-white text-sm font-semibold">
        Contact Me
      </a>
      <button className="md:hidden text-xl" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
        ☰
      </button>
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-black/[0.06] flex flex-col p-6 gap-4 md:hidden">
          {sections.map((id) => (
            <a key={id} href={`#${id}`} className="text-sm font-medium capitalize" onClick={() => setMenuOpen(false)}>
              {id}
            </a>
          ))}
        </div>
      )}
    </motion.nav>
  );
}
