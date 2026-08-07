import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Lightweight Three.js particle field with soft glowing points that drift and
// respond gently to mouse position. Kept intentionally simple/elegant per brief
// ("do NOT overdo animations").
export default function AnimatedBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const particleCount = 140;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const colors = [0x7c6fe0, 0xff9fc7, 0x8fc7ff, 0x8fe3c9];
    const material = new THREE.PointsMaterial({
      size: 0.9,
      color: colors[0],
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let mouseX = 0, mouseY = 0;
    function onMouseMove(e) {
      mouseX = (e.clientX / width - 0.5) * 2;
      mouseY = (e.clientY / height - 0.5) * 2;
    }
    window.addEventListener('mousemove', onMouseMove);

    let frameId;
    function animate() {
      points.rotation.y += 0.0008;
      points.rotation.x += 0.0002;
      camera.position.x += (mouseX * 4 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 4 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    function onResize() {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div ref={mountRef} className="absolute inset-0" />
      {/* Soft gradient blobs (CSS) layered under the Three.js points for the aurora effect */}
      <div className="absolute inset-0 overflow-hidden">
        <span className="blob" style={{ width: 420, height: 420, top: '-10%', left: '-8%', background: 'radial-gradient(circle,#8FC7FF,transparent 70%)', animationDuration: '26s' }} />
        <span className="blob" style={{ width: 380, height: 380, top: '20%', right: '-10%', background: 'radial-gradient(circle,#FF9FC7,transparent 70%)', animationDuration: '30s', animationDelay: '-6s' }} />
        <span className="blob" style={{ width: 340, height: 340, bottom: '-8%', left: '20%', background: 'radial-gradient(circle,#7C6FE0,transparent 70%)', animationDuration: '24s', animationDelay: '-12s' }} />
        <span className="blob" style={{ width: 260, height: 260, bottom: '10%', right: '15%', background: 'radial-gradient(circle,#8FE3C9,transparent 70%)', animationDuration: '28s', animationDelay: '-3s' }} />
      </div>
      <style>{`
        .blob { position:absolute; border-radius:50%; filter:blur(60px); opacity:.4; animation:float-blob 22s ease-in-out infinite; }
        @keyframes float-blob {
          0%,100% { transform:translate(0,0) scale(1); }
          33% { transform:translate(4%,6%) scale(1.08); }
          66% { transform:translate(-5%,3%) scale(0.95); }
        }
      `}</style>
    </div>
  );
}
