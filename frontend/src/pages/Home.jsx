import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from '../components/Navbar.jsx';
import LoadingScreen from '../components/LoadingScreen.jsx';
import AnimatedBackground from '../components/AnimatedBackground.jsx';
import HeartBubbles from '../components/HeartBubbles.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import Experience from '../components/Experience.jsx';
import Projects from '../components/Projects.jsx';
import GithubStats from '../components/GithubStats.jsx';
import Achievements from '../components/Achievements.jsx';
import Resume from '../components/Resume.jsx';
import Contact from '../components/Contact.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import Footer from '../components/Footer.jsx';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  // Lenis smooth scroll, per the brief. Initialized once the loading screen exits.
  useEffect(() => {
    if (!loaded) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [loaded]);

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      {/* Custom cursor removed per spec - browser default cursor is used throughout */}
      <AnimatedBackground />
      <HeartBubbles />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <div className="section-shell pt-0">
        <GithubStats />
      </div>
      <Achievements />
      <Resume />
      <Contact />
      <WhatsAppButton />
      <Footer />
    </>
  );
}
