import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { profile } from '../data/profile.js';

function useTypedRoles(roles) {
  const [text, setText] = useState('');
  useEffect(() => {
    let ri = 0, ci = 0, deleting = false, timeout;
    function tick() {
      const word = roles[ri];
      if (!deleting) {
        ci++;
        setText(word.slice(0, ci));
        if (ci === word.length) { deleting = true; timeout = setTimeout(tick, 1300); return; }
      } else {
        ci--;
        setText(word.slice(0, ci));
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
      }
      timeout = setTimeout(tick, deleting ? 45 : 90);
    }
    tick();
    return () => clearTimeout(timeout);
  }, [roles]);
  return text;
}

export default function Hero() {
  const typed = useTypedRoles(profile.roles);
  const frameRef = useRef(null);

  function handleMouseMove(e) {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 18;
    const y = (e.clientY - rect.top - rect.height / 2) / 18;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }
  function resetMove() {
    if (frameRef.current) frameRef.current.style.transform = 'translate(0,0)';
  }

  return (
   <section id="home" className="min-h-screen flex items-center px-4 md:px-[6vw] pt-32 pb-16 max-w-6xl mx-auto gap-8 md:gap-14 flex-wrap lg:flex-nowrap">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-[1.15] min-w-0"
      >
        {profile.openToWork && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-[#3DCB7A] animate-pulse" />
            Open to Software Developer Opportunities
          </div>
        )}
        <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-[1.08] mb-4">
          Hi, I'm {profile.name.split(' ')[0]} <span className="inline-block"></span>
        </h1>
        <div className="h-11 flex items-center font-display font-semibold text-xl md:text-3xl text-violetDeep mb-5">
          {typed}<span className="inline-block w-[2.5px] h-[1em] bg-violetDeep ml-1 animate-pulse" />
        </div>
        <p className="text-slate text-[16.5px] leading-relaxed max-w-lg mb-8">{profile.tagline}</p>
        <div className="flex flex-wrap gap-3 mb-10"><a className="btn btn-primary">✦ Hire Me</a>

<a className="btn btn-primary">⬇ Download Resume</a>

<a className="btn btn-primary">View Projects</a>
        </div>
        <div className="flex gap-4">
          {[
            { icon: <FaGithub />, href: profile.github },
            { icon: <FaLinkedin />, href: profile.linkedin },
            
            { icon: <SiLeetcode />, href: profile.leetcode },
            { icon: <FaWhatsapp />, href: `https://wa.me/${profile.whatsappNumber}` }
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-lg hover:-translate-y-1 transition-transform"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-[0.85] min-w-0 flex justify-center"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetMove}
      >
        <div className="relative w-[min(70vw,340px)] h-[min(70vw,340px)]">
          <div
            className="absolute -inset-5 rounded-full border border-white/80 animate-[spin_16s_linear_infinite]"
            style={{ background: 'conic-gradient(from 0deg, rgba(124,111,224,0.25), rgba(255,159,199,0.2), rgba(143,199,255,0.25), rgba(124,111,224,0.25))' }}
          />
          <div
            ref={frameRef}
            className="absolute inset-0 rounded-full overflow-hidden bg-white transition-transform duration-200"
            style={{ boxShadow: '0 25px 60px rgba(90,80,180,0.28), 0 0 0 8px rgba(255,255,255,0.6)' }}
          >
            <img src="/profile.jpg" alt={profile.name} className="w-full h-full object-cover object-top" />
          </div><div className="absolute top-[6%] left-0 md:-left-[8%] px-3.5 py-2 rounded-2xl glass text-xs font-semibold animate-bounce">
  🧩 MERN Stack
</div>

<div className="absolute top-[45%] -right-[12%] md:-right-[28%] px-3.5 py-2 rounded-2xl glass text-xs font-semibold animate-bounce [animation-delay:1s]">
  ⚙️ Software Developer

</div>

<div className="absolute bottom-[12%] -right-[8%] md:-right-[20%] px-3.5 py-2 rounded-2xl glass text-xs font-semibold animate-bounce [animation-delay:0.4s]">
  🏆 Hackathon Finalist
</div>

<div className="absolute bottom-[12%] -left-[8%] md:-left-[20%] px-3.5 py-2 rounded-2xl glass text-xs font-semibold animate-bounce [animation-delay:0.4s]">
  📄 IEEE Published
</div>

<div className="absolute top-[45%] -left-[12%] md:-left-[28%] px-3.5 py-2 rounded-2xl glass text-xs font-semibold animate-bounce [animation-delay:1s]">
  🥇 Tech Event Winner

</div>
<div className="absolute top-[6%] right-0 md:-right-[8%] px-3.5 py-2 rounded-2xl glass text-xs font-semibold animate-bounce">
  ✨ Ideas to Impact
</div>

        </div>
      </motion.div>
    </section>
  );
}
