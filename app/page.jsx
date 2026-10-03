"use client";

import { useEffect, useRef } from "react";
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

const certifications = [
  ["Generative AI Fundamentals","AI fundamentals, data-driven applications and prompt engineering."],
  ["MySQL Certification","SQL, joins, aggregation, subqueries and window functions."],
  ["AWS Cloud Certification","Cloud fundamentals, EC2, S3, storage and infrastructure."],
  ["Agentic AI Learning","Agent workflows, tools, orchestration and evaluation."],
  ["RAG & Semantic Search","Chunking, embeddings, retrieval, reranking and synthesis."],
  ["Docker & Deployment","Containerization, Compose, API services and cloud deployment."],
  ["Machine Learning","Supervised learning, feature engineering and model evaluation."],
  ["Data Engineering","ETL, data ingestion, SQL analytics and data pipelines."],
  ["Hackathon Builds","GenAI, misinformation detection and healthcare analytics builds."],
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
      const p = Math.min(Math.max(y/(vh*0.85),0),1.15);
      const sunrise = Math.min(Math.max((p-0.05)/0.72,0),1);
      root.style.setProperty("--luffy-opacity", String(1-sunrise));
      root.style.setProperty("--luffy-scale", String(1+sunrise*.045));
      root.style.setProperty("--sunrise-opacity", String(sunrise*.95));
      root.style.setProperty("--word-scale", String(1-sunrise*.91));
      root.style.setProperty("--word-opacity", String(1-sunrise));
      root.style.setProperty("--word-y", sunrise*-6+"vh");
      root.style.setProperty("--compact-opacity", String(Math.max(0, Math.min((sunrise-.15)/.55, 1))));
      root.style.setProperty("--compact-y", ((1-Math.max(0, Math.min((sunrise-.15)/.55,1)))*10)+"px");
      root.style.setProperty("--compact-scale", String(.94 + Math.max(0, Math.min((sunrise-.15)/.55,1))*.06));
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
        <a href="#home" className="mono">ANIMESH / AI ENGINEER</a>
        <nav className="nav-links">
          <a href="#about">About</a><a href="#projects">Projects</a><a href="#stack">Stack</a><a href="#education">Education</a><a href="#certifications">Certifications</a>
        </nav>
      </div>
      <div className="landing-stage" aria-hidden="true">
        <div className="landing-backdrop"/>
        <div className="sunrise"/>
      </div>
      <div className="hero-wordmark">
        <h1 style={{transform:"translateY(var(--word-y)) scale(var(--word-scale))",opacity:"var(--word-opacity)"}}>
          <span>ANIMESH</span>
          <span>KARMAKAR</span>
        </h1>
      </div>
      <div className="compact-wordmark" style={{opacity:"var(--compact-opacity)", transform:"translateY(var(--compact-y)) scale(var(--compact-scale))"}}>
        ANIMESH KARMAKAR
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
            <p>Four systems across GenAI, ML, data engineering and production AI. Click a card to open the project repository.</p>
          </div>
        </Reveal>
        <div className="project-grid">
          {projects.map((project,i)=>{ const Icon=project.icon; return (
            <a key={project.title} className="project-card reveal" href={"/projects/"+project.slug}>
              <span className="project-number">0{i+1}</span>
              <div className="project-top"><div className="project-icon"><Icon size={20}/></div><ArrowUpRight size={20}/></div>
              <div className="project-body">
                <p className="project-kicker">{project.tags.slice(0,2).join(" / ")}</p>
                <h3>{project.title}</h3><p>{project.subtitle}</p><p className="project-desc">{project.description}</p>
              </div>
              <div className="card-tags">{project.tags.map(t=><span key={t}>{t}</span>)}</div>
            </a>
          )})}
        </div>
      </section>

      <section id="stack" className="section">
        <Reveal>
          <div className="section-label">03 — Tech Stack</div>
          <div className="stack-header"><h2 className="section-title">Orbital <span>Stack</span></h2><p>Interactive globe-style system map. The stack rotates continuously and each technology is a live node.</p></div>
        </Reveal>
        <div className="globe-layout reveal">
          <div className="stack-copy"><p className="big-copy">Code at the core.<br/>Infrastructure around it.</p><p className="muted">Python + SQL feed ML and GenAI systems, then APIs, retrieval, data stores, containers and cloud make them deployable.</p><div className="tech-pills">{technologies.slice(0,12).map(t=><span key={t}>{t}</span>)}</div></div>
          <div className="globe" aria-label="Interactive technology globe">
            <div className="globe-grid"/><div className="globe-glow"/><div className="globe-core">AI / ML</div>
            <div className="orbit orbit-a"/><div className="orbit orbit-b"/>
            <div className="tech-orbit">{technologies.map((t,i)=><span key={t} className="tech-node" style={{"--i":i,"--count":technologies.length}}>{t}</span>)}</div>
          </div>
        </div>
      </section>

      <section id="education" className="section">
        <Reveal><div className="section-label">04 — Education</div><div className="edu-header"><h2 className="section-title">My <span>Journey</span></h2><p>A chronological path from school to a B.E. in Artificial Intelligence &amp; Data Science.</p></div></Reveal>
        <div className="education-path reveal"><div className="education-line"/>{education.map(([year,title,detail],i)=><div className="education-node" key={title}><div className="education-dot"><GraduationCap size={17}/></div><div className="education-year">{year}</div><h3>{title}</h3><p>{detail}</p></div>)}</div>
      </section>

      <section id="certifications" className="section">
        <Reveal><div className="section-label">05 — Certifications</div><div className="cert-header"><h2 className="section-title">Proof of <span>Learning</span></h2><p>3 × 3 grid for certifications, learning tracks and technical credentials.</p></div></Reveal>
        <div className="cert-grid">{certifications.map(([title,desc],i)=><article className="cert-card reveal" key={title}><span className="cert-index">0{i+1}</span><Award size={19}/><h3>{title}</h3><p>{desc}</p></article>)}</div>
      </section>

      <footer className="footer" id="contact">
        <div className="section-label">06 — Contact</div>
        <p className="footer-name">ANIMESH KARMAKAR</p>
        <p className="footer-role">AI ENGINEER · ML · GENAI · RAG · AGENTS</p>
        <div className="footer-links">
          <a href="https://github.com/animeshkarmakar7" target="_blank" rel="noreferrer"><Code2 size={16}/>GitHub</a>
          <a href="https://linkedin.com/in/animeshkarmakar" target="_blank" rel="noreferrer"><Server size={16}/>LinkedIn</a>
          <a href="mailto:animeshkarmakar710@gmail.com"><Sparkles size={16}/>Email</a>
          <a href="/animesh_karmakar_resume.pdf" download><Container size={16}/>Resume</a>
        </div>
        <div className="footer-meta"><span>AI &amp; Data Science</span><span>Built with Next.js + Tailwind</span><span>2026</span></div>
      </footer>
    </main>
  </>;
}
