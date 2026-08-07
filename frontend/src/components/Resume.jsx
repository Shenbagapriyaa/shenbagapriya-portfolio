import React from 'react';
import { motion } from 'framer-motion';

// Expects a resume PDF placed at /public/resume.pdf
export default function Resume() {
  return (
    <section id="resume" className="section-shell">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <span className="eyebrow">07 — Resume</span>

        <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-2">
          Explore My Resume
        </h2>

        <p className="text-slate text-[15.5px] mt-3 max-w-lg">
          View my technical skills, projects, internship experience, certifications
          and achievements in detail.
        </p>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass rounded-3xl p-6"
      >

        <div
          className="rounded-2xl overflow-hidden border border-black/5 bg-white"
          style={{ height: 480 }}
        >
          <object
            data="/resume.pdf"
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p className="p-6 text-sm text-slate">
              Preview isn't available in this browser. Add your resume as
              <code> /public/resume.pdf </code>
              to enable it.
            </p>
          </object>
        </div>


        <div className="flex flex-wrap gap-3 mt-5">

          <a
            href="/resume.pdf"
            download
            className="btn btn-primary"
          >
            ⬇ Download Resume
          </a>


          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            ⛶ View Full Screen
          </a>


          <button
            onClick={() => window.open('/resume.pdf', '_blank')?.print()}
            className="btn btn-primary"
          >
            🖨 Print Resume
          </button>

        </div>

      </motion.div>

    </section>
  );
}