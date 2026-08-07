import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { profile } from '../data/profile.js';

// Fixed floating WhatsApp button. On desktop wa.me opens WhatsApp Web;
// on mobile it opens the native WhatsApp app - this is standard wa.me behavior.
export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${profile.whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-6 right-6 z-[150] w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-lg animate-[bob_5s_ease-in-out_infinite]"
      style={{ background: 'linear-gradient(135deg,#25D366,#1DA851)', boxShadow: '0 10px 30px rgba(37,211,102,0.45)' }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
      <span className="absolute right-16 whitespace-nowrap px-3 py-1.5 rounded-lg bg-ink text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with me on WhatsApp
      </span>
      <style>{`@keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }`}</style>
    </a>
  );
}
