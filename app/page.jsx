"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ProjectShowcase from "../components/ProjectShowcase";
import BlackHoleContact from "../components/BlackHoleContact";
import {
  ArrowUpRight,
  Award,
  BrainCircuit,
  Code2,
  Container,
  Database,
  GraduationCap,
  Layers3,
  Server,
  Sparkles,
  Workflow,
} from "lucide-react";

const projects = [
  { slug:"legaldocai", title:"LegalDocAI", subtitle:"Legal document verification & risk analysis", description:"FastAPI + PostgreSQL + MinIO + Kafka + Celery system with OCR ingestion, hybrid retrieval, clause classification, and risk scoring.", tags:["RAG","OCR","Hybrid Search","FastAPI","PostgreSQL","Docker"], href:"https://github.com/animeshkarmakar7/Document-Verification-AI", icon:Layers3 },
  { slug:"tradeguard-ai", title:"TradeGuard AI", subtitle:"Multi-agent customs compliance assistant", description:"LangGraph workflow with dense + sparse retrieval, RRF fusion, and verification gates for tariff and compliance research.", tags:["LangGraph","Qdrant","BGE","BM25","RRF","FastAPI"], href:"https://github.com/animeshkarmakar7/GLOBAL-TRADE-CUSTOMS-COMPLIANCE-ASSISTANT", icon:Workflow },
  { slug:"sangrahak", title:"Sangrahak", subtitle:"Predictive demand & inventory platform", description:"Demand forecasting, stock-out classification, supplier-delay prediction, inventory alerts, and conversational retrieval.", tags:["ARIMA","XGBoost","Flask","MongoDB","AWS EC2"], href:"https://github.com/animeshkarmakar7/Sangrahak-AI-powered-Inventory-Management-system", icon:Database },
  { slug:"saas-churn", title:"SaaS Churn Intelligence", subtitle:"SQL + ML revenue-at-risk analytics", description:"MySQL feature engineering, churn prediction, SHAP explainability, SMOTE balancing, and Power BI reporting.", tags:["Python","SQL","XGBoost","SHAP","Power BI"], href:"https://github.com/animeshkarmakar7/CustomerChurnReport", icon:BrainCircuit },
];

const technologies = ["Python","C++","SQL","Pandas","NumPy","Scikit-learn","XGBoost","PyTorch","TensorFlow","LangChain","LangGraph","RAG","Gemini","FastAPI","Flask","Docker","AWS","PostgreSQL","MongoDB","Kafka","ChromaDB","Qdrant","Git"];

const techIcons = {
  Python:"https://cdn.simpleicons.org/python",
  "C++":"https://cdn.simpleicons.org/cplusplus",
  SQL:"https://cdn.simpleicons.org/mysql",
  Pandas:"https://cdn.simpleicons.org/pandas",
  NumPy:"https://cdn.simpleicons.org/numpy",
  "Scikit-learn":"https://cdn.simpleicons.org/scikitlearn",
  XGBoost:"https://cdn.simpleicons.org/xgboost",
  PyTorch:"https://cdn.simpleicons.org/pytorch",
  TensorFlow:"https://cdn.simpleicons.org/tensorflow",
  LangChain:"https://cdn.simpleicons.org/langchain",
  LangGraph:"https://cdn.simpleicons.org/langgraph",
  RAG:"public/Rag--Streamline-Carbon.svg",
  Gemini:"https://cdn.simpleicons.org/googlegemini",
  FastAPI:"https://cdn.simpleicons.org/fastapi",
  Flask:"https://cdn.simpleicons.org/flask",
  Docker:"https://cdn.simpleicons.org/docker",
  AWS:"https://cdn.simpleicons.org/amazonwebservices",
  PostgreSQL:"https://cdn.simpleicons.org/postgresql",
  MongoDB:"https://cdn.simpleicons.org/mongodb",
  Kafka:"https://cdn.simpleicons.org/apachekafka",
  ChromaDB:"https://cdn.simpleicons.org/chroma",
  Qdrant:"https://cdn.simpleicons.org/qdrant",
  Git:"https://cdn.simpleicons.org/git"
};

const certifications = [
  ["Model Context Protocol: Advanced Topics","Anthropic","https://verify.skilljar.com/c/vhpr927o293w"],
  ["AI Agents Fundamentals","Hugging Face","https://us.aws.cdn.hf.co/xet-bridge-us/67a47037749ea2c4b9fafd4b/0404e9117bbe54d391f52f605991fb8c936a54b3ff477ec6341b5243497c2002?response-content-disposition=inline%3B+filename%2A%3DUTF-8%27%272026-10-03.png%3B+filename%3D%222026-10-03.png%22%3B&response-content-type=image%2Fpng&xip=wAk6rEDSPlI&user_id=6ac0c4365e0160da316f305c&X-Xet-Cas-Uid=6ac0c4365e0160da316f305c&Expires=1791047071&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly91cy5hd3MuY2RuLmhmLmNvL3hldC1icmlkZ2UtdXMvNjdhNDcwMzc3NDllYTJjNGI5ZmFmZDRiLzA0MDRlOTExN2JiZTU0ZDM5MWY1MmY2MDU5OTFmYjhjOTM2YTU0YjNmZjQ3N2VjNjM0MWI1MjQzNDk3YzIwMDJcXD9yZXNwb25zZS1jb250ZW50LWRpc3Bvc2l0aW9uPWlubGluZSUzQitmaWxlbmFtZSUyQSUzRFVURi04JTI3JTI3MjAyNi0xMC0wMy5wbmclM0IrZmlsZW5hbWUlM0QlMjIyMDI2LTEwLTAzLnBuZyUyMiUzQiZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcmeGlwPXdBazZyRURTUGxJJnVzZXJfaWQ9NmFjMGM0MzY1ZTAxNjBkYTMxNmYzMDVjJlgtWGV0LUNhcy1VaWQ9NmFjMGM0MzY1ZTAxNjBkYTMxNmYzMDVjIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJFcG9jaFRpbWUiOjE3OTEwNDcwNzF9fX1dfQ__&Signature=MEQCIHyRaApIbpEsTtwbTHSpwzz97ABxw%7EwrBnNlE-B7gUcTAiADgAP8vKWQ5ouqXOVeu4sZ2an%7ELEuvRgZT%7ECGn-riDaA__&Key-Pair-Id=01KXEF4KZ1B6FV465MAWR4M21F&Hash-Algorithm=SHA256"],
  ["Google Certifications","Coursera","https://www.coursera.org/account/accomplishments/verify/QCB5N1QONAFN"],
  ["AWS Cloud Certification","Scaler","https://moonshot.scaler.com/s/sl/c964WZbhGK"],
  ["MySQL Certification","HackerRank","https://www.hackerrank.com/certificates/e1b0c42e9391"],
];

const education = [
  ["2020","Sai English High School, Kalyan","SSC — 90.20%"],
  ["2022","R.K. Talreja College, Ulhasnagar","HSC — 79.17%"],
  ["2022–2026","Terna Engineering College, Mumbai University","B.E. Artificial Intelligence & Data Science — CGPA 7.5/10"],
];

function useScrollFx() {
  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => {
      const y = window.scrollY;
      const vh = Math.max(window.innerHeight,1);
      const progress = Math.min(Math.max(y/(vh*0.72),0),1);
      const heroOut = Math.min(Math.max((progress-0.08)/0.72,0),1);
      root.style.setProperty("--luffy-opacity", String(1-heroOut));
      root.style.setProperty("--luffy-scale", String(1+heroOut*.035));
      root.style.setProperty("--word-scale", String(1-heroOut*.9));
      root.style.setProperty("--word-opacity", String(1-heroOut));
      root.style.setProperty("--word-y", heroOut*-5+"vh");
      root.style.setProperty("--progress", String(Math.min(y/Math.max(document.body.scrollHeight-vh,1),1)));
    };
    onScroll();
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    window.addEventListener("scroll",onScroll,{passive:true});
    return () => {
      window.removeEventListener("scroll",onScroll);
      observer.disconnect();
    };
  },[]);
}

function TechGlobe() {
  const [rotation, setRotation] = useState({ yaw: -0.35, pitch: 0.12 });
  const [active, setActive] = useState(null);
  const drag = useRef({ active: false, x: 0, y: 0, yaw: -0.35, pitch: 0.12 });

  const points = useMemo(() => {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    return technologies.map((name, i) => {
      const y = 1 - (i + 0.5) * (2 / technologies.length);
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      return { name, x: radius * Math.cos(theta), y, z: radius * Math.sin(theta) };
    });
  }, []);

  useEffect(() => {
    let frame;
    let last = performance.now();
    const tick = (now) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!drag.current.active) {
        const nextYaw = drag.current.yaw + delta * 0.18;
        drag.current.yaw = nextYaw;
        setRotation({ yaw: nextYaw, pitch: drag.current.pitch });
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const projected = points.map((point) => {
    const cy = Math.cos(rotation.yaw), sy = Math.sin(rotation.yaw);
    const cx = Math.cos(rotation.pitch), sx = Math.sin(rotation.pitch);
    const x1 = point.x * cy + point.z * sy;
    const z1 = -point.x * sy + point.z * cy;
    const y2 = point.y * cx - z1 * sx;
    const z2 = point.y * sx + z1 * cx;
    const depth = (z2 + 1) / 2;
    return {
      ...point,
      left: 50 + x1 * 42,
      top: 50 - y2 * 42,
      opacity: 0.26 + depth * 0.74,
      scale: 0.72 + depth * 0.42,
      depth,
    };
  });

  const startDrag = (event) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    drag.current = { active: true, x: event.clientX, y: event.clientY, yaw: rotation.yaw, pitch: rotation.pitch };
  };

  const moveDrag = (event) => {
    if (!drag.current.active) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    const yaw = drag.current.yaw + dx * 0.008;
    const pitch = Math.max(-1.05, Math.min(1.05, drag.current.pitch - dy * 0.006));
    drag.current.x = event.clientX;
    drag.current.y = event.clientY;
    drag.current.yaw = yaw;
    drag.current.pitch = pitch;
    setRotation({ yaw, pitch });
  };

  const endDrag = () => { drag.current.active = false; };

  return (
    <div
      className="globe interactive-globe"
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      role="application"
      aria-label="Interactive technology globe. Drag to rotate."
    >
      <div className="globe-grid" />
      <div className="globe-glow" />
      <div className="orbit orbit-a" />
      <div className="orbit orbit-b" />
      <div className="tech-orbit">
        {projected.map((tech) => (
          <button
            type="button"
            key={tech.name}
            className={`tech-node ${active === tech.name ? "is-active" : ""}`}
            title={tech.name}
            aria-label={tech.name}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => setActive(tech.name)}
            style={{
              left: `${tech.left}%`,
              top: `${tech.top}%`,
              opacity: tech.opacity,
              zIndex: Math.round(tech.depth * 100),
              transform: `translate(-50%, -50%) scale(${tech.scale})`,
            }}
          >
            <img src={techIcons[tech.name]} alt="" aria-hidden="true" />
            <span>{tech.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Reveal({children,className=""}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add("visible");
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={"reveal "+className}>{children}</div>;
}

export default function Page() {
  useScrollFx();
  return <>
    <div className="noise" />
    <div className="landing" id="home">
      <div className="hero-nav">
        <a href="#home" className="nav-brand">ANIMESH KARMAKAR</a>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#stack">Skills</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
      <div className="landing-stage" aria-hidden="true">
        <div className="landing-character">
          <img src="/luffy.jpeg" alt="" />
        </div>
      </div>
      <div className="hero-wordmark">
        <h1 style={{transform:"translateY(var(--word-y)) scale(var(--word-scale))",opacity:"var(--word-opacity)"}}>
          <span className="hero-first-name">ANIMESH</span>
          <span className="hero-last-name">KARMAKAR</span>
        </h1>
      </div>
      <div className="scroll-meter"><span style={{transform:"scaleY(var(--progress))"}}/></div>
    </div>

    <main className="content-shell">
      <section id="about" className="section">
        <Reveal>
          <div className="section-label">01 — About</div>
          <div className="about-grid">
            <div className="about-copy">
              <h2 className="section-title">AI <span>Engineer</span></h2>
              <div className="about-text">
                AI &amp; Data Science graduate experienced in building and deploying production-ready Generative AI and machine learning systems, including RAG pipelines, multi-agent architectures, and predictive models. Skilled in end-to-end delivery, from data engineering and model optimization to containerized cloud deployment.
              </div>
              <div className="about-metrics">
                <span><b>RAG</b><small>Retrieval systems</small></span>
                <span><b>ML</b><small>Predictive models</small></span>
                <span><b>AI</b><small>Agentic workflows</small></span>
              </div>
            </div>
            <div className="about-image">
              <img src="/Animesh photo.png" alt="Animesh Karmakar" />
            </div>
          </div>
        </Reveal>
      </section>

      <section id="projects" className="section">
        <Reveal>
          <div className="section-label">02 — Projects</div>
          <div className="projects-header">
            <h2 className="section-title">Selected <span>Work</span></h2>
            <p>Scroll through each build. The project details stay anchored while the visual panel changes with the active project. The visual box is ready for your screenshots.</p>
          </div>
        </Reveal>
        <ProjectShowcase />
      </section>

      <section id="stack" className="section">
        <Reveal>
          <div className="section-label">03 — Tech Stack</div>
          <div className="stack-header"><h2 className="section-title">Orbital <span>Stack</span></h2></div>
        </Reveal>
        <div className="globe-layout reveal">
          <div className="stack-copy"><p className="big-copy">Code at the core.<br/>Infrastructure around it.</p><p className="muted">Python + SQL feed ML and GenAI systems, then APIs, retrieval, data stores, containers and cloud make them deployable.</p><div className="tech-pills">{technologies.slice(0,12).map(t=><span key={t}>{t}</span>)}</div></div>
          <TechGlobe />
        </div>
      </section>

      <section id="education" className="section">
        <Reveal><div className="section-label">04 — Education</div><div className="edu-header"><h2 className="section-title">My <span>Journey</span></h2><p>A chronological path from school to a B.E. in Artificial Intelligence &amp; Data Science.</p></div></Reveal>
        <div className="education-path reveal"><div className="education-line"/>{education.map(([year,title,detail],i)=><div className="education-node" key={title}><div className="education-dot"><GraduationCap size={17}/></div><div className="education-year">{year}</div><h3>{title}</h3><p>{detail}</p></div>)}</div>
      </section>

      <section id="certifications" className="section">
        <Reveal><div className="section-label">05 — Certifications</div><div className="cert-header"><h2 className="section-title">Proof of <span>Learning</span></h2><p>Verified credentials and learning certificates. Select any card to view the certificate.</p></div></Reveal>
        <div className="cert-grid">{certifications.map(([title,issuer,url],i)=><article className="cert-card reveal" key={title}>
          <span className="cert-index">{String(i+1).padStart(2,"0")}</span>
          <Award size={19}/>
          <h3>{title}</h3>
          <p>{issuer}</p>
          <a className="cert-view" href={url} target="_blank" rel="noreferrer">VIEW CERTIFICATE <ArrowUpRight size={14}/></a>
        </article>)}</div>
      </section>

      <section id="resume" className="section">
        <Reveal>
          <div className="section-label">06 — Resume</div>
          <div className="resume-section">
            <div>
              <h2 className="section-title">My <span>Resume</span></h2>
              <p>View my latest resume for experience, projects, technical skills, certifications, and education.</p>
            </div>
            <a className="resume-view" href="https://drive.google.com/file/d/16ua2tO2ZMOOoCn2ZdBDriHp0pXprjEbx/view" target="_blank" rel="noreferrer">
              VIEW RESUME <ArrowUpRight size={16}/>
            </a>
          </div>
        </Reveal>
      </section>

      <BlackHoleContact />
    </main>
  </>;
}
