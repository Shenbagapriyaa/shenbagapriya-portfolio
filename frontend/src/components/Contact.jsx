import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaMapMarkerAlt } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { profile } from '../data/profile.js';
import api from '../api/axios.js';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', text: '' });

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'sending', text: 'Sending…' });
    try {
      await api.post('/messages', form);
      setStatus({ state: 'success', text: '✓ Message sent — I will get back to you soon!' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        state: 'error',
        text: 'Could not reach the server. Make sure the backend is running and VITE_API_URL is set correctly.'
      });
    }
  }

  const items = [
    { icon: <FaEnvelope />, label: 'Email', value: profile.email },
    { icon: <FaPhone />, label: 'Phone', value: profile.phone },
    { icon: <FaLinkedin />, label: 'LinkedIn', value: 'shenbagapriya-n' },
    { icon: <FaGithub />, label: 'GitHub', value: 'shenbagapriyaa' },
    { icon: <SiLeetcode />, label: 'LeetCode', value: 'shenbagapriya-12' },
    { icon: <FaMapMarkerAlt />, label: 'Location', value: profile.location }
  ];

  return (
    <section id="contact" className="section-shell">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
        <span className="eyebrow">08 — Contact</span>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-2">Let's Build Something Together</h2>
        <p className="text-slate text-[15.5px] mt-3 max-w-lg">Open to Software Developer opportunities where I can apply my programming skills, problem-solving abilities, and technical knowledge to create meaningful products.

I’d love to connect and explore opportunities to contribute, learn and build impactful solutions.</p>
      </motion.div>

      <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          {items.map((it) => (
            <div key={it.label} className="flex items-center gap-3.5 mb-5">
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-base">{it.icon}</div>
              <div>
                <b className="text-sm block">{it.label}</b>
                <span className="text-[12.8px] text-slate">{it.value}</span>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-8"
        >
          <div className="grid sm:grid-cols-2 gap-3.5 mb-3.5">
            <input required placeholder="Your Name" value={form.name} onChange={update('name')} className="w-full px-4 py-3 rounded-2xl border border-black/[0.08] bg-white/70 text-sm outline-none focus:border-violet focus:ring-4 focus:ring-violet/10" />
            <input required type="email" placeholder="Your Email" value={form.email} onChange={update('email')} className="w-full px-4 py-3 rounded-2xl border border-black/[0.08] bg-white/70 text-sm outline-none focus:border-violet focus:ring-4 focus:ring-violet/10" />
          </div>
          <input required placeholder="Subject" value={form.subject} onChange={update('subject')} className="w-full px-4 py-3 mb-3.5 rounded-2xl border border-black/[0.08] bg-white/70 text-sm outline-none focus:border-violet focus:ring-4 focus:ring-violet/10" />
          <textarea required placeholder="Your Message" value={form.message} onChange={update('message')} rows={4} className="w-full px-4 py-3 mb-3.5 rounded-2xl border border-black/[0.08] bg-white/70 text-sm outline-none focus:border-violet focus:ring-4 focus:ring-violet/10 resize-y" />
          <button type="submit" disabled={status.state === 'sending'} className="btn btn-primary w-full justify-center">
            ✈ {status.state === 'sending' ? 'Sending…' : 'Send Message'}
          </button>
          {status.text && (
            <p className={`text-[12.8px] mt-3 ${status.state === 'error' ? 'text-red-500' : 'text-violetDeep'}`}>{status.text}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
