"use client";

import { useEffect, useRef } from "react";
import { Github, Linkedin, Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function BlackHoleContact() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    let animation;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const horizonY = h * 0.45;
      const pulse = Math.sin(frame * 0.018) * 0.025 + 1;

      const glow = ctx.createRadialGradient(cx, horizonY, 0, cx, horizonY, Math.min(w, h) * 0.55);
      glow.addColorStop(0, "rgba(255,255,255,0.28)");
      glow.addColorStop(0.08, "rgba(242,170,255,0.30)");
      glow.addColorStop(0.22, "rgba(125,54,255,0.18)");
      glow.addColorStop(0.6, "rgba(45,15,110,0.05)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(cx, horizonY);

      for (let i = 0; i < 24; i++) {
        const width = Math.min(w * 0.045, 55) + i * 3.2;
        const y = 12 + i * 6;
        const alpha = 0.035 + (1 - i / 28) * 0.055;
        ctx.beginPath();
        ctx.ellipse(0, y, width * 4.6, y * 0.48 + 8, 0, Math.PI * 0.04, Math.PI - Math.PI * 0.04);
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = `rgba(238,200,255,${alpha})`;
        ctx.shadowBlur = 18;
        ctx.shadowColor = "rgba(146,56,255,0.35)";
        ctx.stroke();
      }

      for (let i = 0; i < 42; i++) {
        const spread = (i / 42) * w * 0.44;
        const drift = Math.sin(frame * 0.01 + i * 0.7) * 0.8;
        ctx.beginPath();
        ctx.moveTo(-spread, drift);
        ctx.quadraticCurveTo(-spread * 0.18, 17 + i * 0.9, 0, 27 + i * 0.12);
        ctx.strokeStyle = `rgba(210,170,255,${0.012 + (i % 5) * 0.006})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(spread, drift);
        ctx.quadraticCurveTo(spread * 0.18, 17 + i * 0.9, 0, 27 + i * 0.12);
        ctx.stroke();
      }

      const disk = ctx.createRadialGradient(0, 8, 4, 0, 8, Math.min(w, h) * 0.2);
      disk.addColorStop(0, "rgba(255,255,255,0.97)");
      disk.addColorStop(0.12, "rgba(248,214,255,0.95)");
      disk.addColorStop(0.28, "rgba(176,104,255,0.82)");
      disk.addColorStop(0.58, "rgba(90,34,210,0.45)");
      disk.addColorStop(1, "rgba(30,8,80,0)");
      ctx.fillStyle = disk;
      ctx.fillRect(-w * 0.22, -h * 0.16, w * 0.44, h * 0.34);

      ctx.beginPath();
      ctx.ellipse(0, 3, Math.min(w * 0.2, 300) * pulse, Math.min(h * 0.07, 48), 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,245,255,0.94)";
      ctx.lineWidth = 7;
      ctx.shadowBlur = 34;
      ctx.shadowColor = "rgba(176,78,255,0.95)";
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 8, Math.min(w * 0.255, 390), Math.min(h * 0.105, 66), 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(154,71,255,0.30)";
      ctx.lineWidth = 22;
      ctx.shadowBlur = 48;
      ctx.shadowColor = "rgba(86,22,210,0.72)";
      ctx.stroke();

      ctx.fillStyle = "#010103";
      ctx.beginPath();
      ctx.ellipse(0, 3, Math.min(w * 0.12, 180), Math.min(h * 0.045, 30), 0, 0, Math.PI * 2);
      ctx.fill();

      const horizon = ctx.createLinearGradient(-w * 0.5, 0, w * 0.5, 0);
      horizon.addColorStop(0, "rgba(114,50,240,0)");
      horizon.addColorStop(0.3, "rgba(179,94,255,0.55)");
      horizon.addColorStop(0.5, "rgba(255,245,255,0.95)");
      horizon.addColorStop(0.7, "rgba(179,94,255,0.55)");
      horizon.addColorStop(1, "rgba(114,50,240,0)");
      ctx.fillStyle = horizon;
      ctx.fillRect(-w * 0.48, 8, w * 0.96, 2);

      ctx.restore();

      frame += 1;
      animation = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animation = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animation);
    };
  }, []);

  return (
    <section id="contact" className="contact-blackhole">
      <div className="contact-blackhole-visual">
        <canvas ref={canvasRef} className="blackhole-canvas" aria-hidden="true" />
      </div>

      <div className="contact-content">
        <div className="contact-column contact-about">
          <p className="contact-kicker">ANIMESH</p>
          <h3>Building AI systems<br />that ship.</h3>
          <p>Open to AI engineering, ML and GenAI opportunities. Available for product-focused work, applied research and intelligent systems.</p>
        </div>

        <div className="contact-column">
          <p className="contact-heading">QUICK LINKS</p>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#stack">Skills</a>
        </div>

        <div className="contact-column">
          <p className="contact-heading">GET IN TOUCH</p>
          <a href="mailto:animeshkarmakar710@gmail.com"><Mail size={16} />animeshkarmakar710@gmail.com</a>
          <span><MapPin size={16} />Kalyan, Maharashtra, India</span>
        </div>

        <div className="contact-column">
          <p className="contact-heading">CONNECT</p>
          <div className="contact-socials">
            <a href="https://github.com/animeshkarmakar7" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={21} /></a>
            <a href="https://linkedin.com/in/animeshkarmakar" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={21} /></a>
            <a href="mailto:animeshkarmakar710@gmail.com" aria-label="Email"><Mail size={21} /></a>
          </div>
        </div>
      </div>

      <div className="contact-bottom">
        <span>AI &amp; DATA SCIENCE / AI ENGINEER</span>
        <span>2026</span>
        <a href="#home">BACK TO TOP <ArrowUpRight size={13}/></a>
      </div>
    </section>
  );
}
