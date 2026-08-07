import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { profile } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="text-center py-14 px-[6vw] text-xs text-slate/80 relative z-10">
      <div className="flex justify-center gap-4 mb-5">

        {/* Gmail */}
        <a
         // href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full glass flex items-center justify-center hover:-translate-y-1 transition-transform"
          title="Email"
        >
          <FaEnvelope />
        </a>

        {/* GitHub */}
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full glass flex items-center justify-center hover:-translate-y-1 transition-transform"
          title="GitHub"
        >
          <FaGithub />
        </a>

        {/* LinkedIn */}
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full glass flex items-center justify-center hover:-translate-y-1 transition-transform"
          title="LinkedIn"
        >
          <FaLinkedin />
        </a>

      </div>

      <p>
        © {new Date().getFullYear()} {profile.name}. Crafted with curiosity, powered by code
      </p>
    </footer>
  );
}