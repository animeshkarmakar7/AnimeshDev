import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  Award,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  ChevronRight,
  Cloud,
  Code2,
  Container,
  Database,
  Download,
  GraduationCap,
  Link,
  Mail,
  MapPin,
  Menu,
  Phone,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';
import './styles.css';

const navItems = ['home', 'skills', 'projects', 'education', 'contact'];

const skills = [
  {
    domain: 'Machine Learning',
    icon: BrainCircuit,
    note: 'Forecasting, classification, OCR, and analytics models for practical decisions.',
    stack: [
      ['Python', Code2],
      ['Pandas', Database],
      ['NumPy', Sparkles],
      ['Scikit-learn', BrainCircuit],
      ['XGBoost', Rocket],
      ['ARIMA', Workflow],
      ['PyTorch', BrainCircuit],
      ['TensorFlow', BrainCircuit],
      ['OpenCV', Sparkles],
    ],
  },
  {
    domain: 'Generative AI',
    icon: Sparkles,
    note: 'RAG apps, agent workflows, citation-backed chat, and prompt pipelines.',
    stack: [
      ['LangChain', Link],
      ['LangGraph', Workflow],
      ['RAG', Bot],
      ['Gemini API', Sparkles],
      ['LLaMA', Bot],
      ['Qdrant', Database],
      ['ChromaDB', Database],
      ['BGE', BrainCircuit],
    ],
  },
  {
    domain: 'Production Engineering',
    icon: Server,
    note: 'APIs, containers, cloud deployment, streaming, and production handling.',
    stack: [
      ['FastAPI', Server],
      ['Flask', Code2],
      ['Docker', Container],
      ['AWS EC2', Cloud],
      ['S3', Cloud],
      ['RDS', Database],
      ['CI/CD', Workflow],
      ['Kafka', Server],
    ],
  },
  {
    domain: 'Data & Systems',
    icon: Code2,
    note: 'Databases, structured querying, core CS, and system fundamentals.',
    stack: [
      ['SQL', Database],
      ['MySQL', Database],
      ['MongoDB', Database],
      ['PostgreSQL', Database],
      ['OOP', Code2],
      ['DBMS', Server],
      ['Networks', Workflow],
      ['OS', Server],
    ],
  },
];

const projects = [
  {
    title: 'LegalDocAI',
    subtitle: 'Generative AI System for Legal Document Analysis',
    objective: 'Created to make dense legal documents searchable, understandable, and risk-aware without losing clause-level context.',
    link: 'https://github.com/animeshkarmakar7/Document-Verification-AI',
    tags: ['RAG', 'OCR', 'Hybrid Search', 'FastAPI', 'PostgreSQL', 'Docker'],
    people: ['Sania', 'Rohan'],
    conversation: [
      ['Sania', 'Reading long legal PDFs is exhausting. The clauses are packed with risk, but they hide inside too many pages.'],
      ['Rohan', 'That is exactly why LegalDocAI exists. It reads, chunks, and understands contracts with citations.'],
      ['Sania', 'Can it tell me which clauses are risky instead of just giving a generic summary?'],
      ['Rohan', 'Yes. It combines OCR, embeddings, BM25, and RAG so the answer points back to the source text.'],
      ['Sania', 'So I can ask questions like a chatbot?'],
      ['Rohan', 'And get executive summaries, clause classification, and deterministic risk notes.'],
      ['Sania', 'That would save a lot of review time.'],
      ['Rohan', 'It also hashes PDFs to avoid duplicate embedding costs in production.'],
      ['Sania', 'Now the document feels searchable instead of endless.'],
      ['Rohan', 'If you want to know more, check the repo, README, architecture, and images here.'],
    ],
  },
  {
    title: 'TradeGuard AI',
    subtitle: 'Multi-Agent System for Global Trade & Customs Compliance',
    objective: 'Created to help teams classify products into HS tariff codes and verify compliance claims against regulatory sources.',
    link: 'https://github.com/animeshkarmakar7/GLOBAL-TRADE-CUSTOMS-COMPLIANCE-ASSISTANT',
    tags: ['LangGraph', 'Qdrant', 'BGE', 'RRF Fusion', 'FastAPI', 'Streamlit'],
    people: ['Mira', 'Dev'],
    conversation: [
      ['Mira', 'A product description from sales never matches the official tariff language.'],
      ['Dev', 'TradeGuard AI bridges that gap with a multi-agent customs workflow.'],
      ['Mira', 'Does it just guess the HS code?'],
      ['Dev', 'No. A supervisor agent routes the request, then workers search dense and sparse indexes.'],
      ['Mira', 'What about hallucinated tariff rates?'],
      ['Dev', 'A verification gate checks structured outputs against regulatory source text before showing claims.'],
      ['Mira', 'So casual descriptions can map to strict taxonomies?'],
      ['Dev', 'Exactly, using Qdrant, BGE embeddings, BM25Plus, and RRF fusion.'],
      ['Mira', 'That makes compliance less dependent on manual lookup.'],
      ['Dev', 'If you want to know more, check the repo, README, architecture, and images here.'],
    ],
  },
  {
    title: 'Sangrahak',
    subtitle: 'Predictive Demand Forecasting & Inventory AI/ML Platform',
    objective: 'Created to forecast demand, detect inventory pressure early, and help depot teams act before stock issues become operational problems.',
    link: 'https://github.com/animeshkarmakar7/Sangrahak-AI-powered-Inventory-Management-system',
    tags: ['Forecasting', 'XGBoost', 'ARIMA', 'Flask', 'MongoDB', 'AWS EC2'],
    people: ['Aarav', 'Neha'],
    conversation: [
      ['Aarav', 'Depot teams keep reacting late because inventory data is scattered and demand changes fast.'],
      ['Neha', 'Sangrahak turns that into forecasts, alerts, and real-time visibility.'],
      ['Aarav', 'Can it handle many SKUs together?'],
      ['Neha', 'Yes. It was built for 100+ SKUs across depots with automated low-stock alerts.'],
      ['Aarav', 'Forecasting is only useful if the accuracy is strong.'],
      ['Neha', 'The models reached 10.11 percent MAPE and 0.91 AUC-ROC on imbalanced classes.'],
      ['Aarav', 'Does it include an AI assistant too?'],
      ['Neha', 'A RAG conversational layer helps teams query inventory and demand context.'],
      ['Aarav', 'So it connects prediction with action.'],
      ['Neha', 'If you want to know more, check the repo, README, architecture, and images here.'],
    ],
  },
];

const journey = [
  { year: '2020', title: 'Sai English High School, Kalyan', detail: 'SSC - 90.20%' },
  { year: '2022', title: 'R.K. Talreja College, Ulhasnagar', detail: 'HSC - 79.17%' },
  { year: '2022-2026', title: 'Terna Engineering College, Mumbai University', detail: 'B.E. Artificial Intelligence & Data Science - CGPA 7.5/10' },
];

const achievements = [
  { label: 'Gen-AI Hackathon 2025', copy: 'Selected in Top 75 nationally out of 418+ teams; built healthcare analytics with automated feature extraction.' },
  { label: 'MumbaiHacks 2025', copy: 'Built a real-time misinformation detection platform with streaming NLP and confidence scoring.' },
  { label: 'Generative AI Fundamentals', copy: 'AI fundamentals, data-driven applications, and prompt engineering.' },
  { label: 'MySQL Certification', copy: 'Advanced SQL, joins, window functions, aggregation, and subqueries.' },
  { label: 'AWS Cloud Certification', copy: 'Cloud computing, EC2, S3, data storage, and cloud infrastructure.' },
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.16 }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function CursorGlow() {
  useEffect(() => {
    const cursor = document.querySelector('.cursor-glow');
    const move = (event) => {
      cursor.style.setProperty('--x', `${event.clientX}px`);
      cursor.style.setProperty('--y', `${event.clientY}px`);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return <div className="cursor-glow" />;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="#home">Animesh K.</a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={open ? 'is-open' : ''}>
        {navItems.map((item) => (
          <a key={item} href={`#${item}`} onClick={() => setOpen(false)}>{item}</a>
        ))}
      </nav>
    </header>
  );
}

function Home() {
  return (
    <section id="home" className="hero">
      <div className="hero-copy" data-reveal>
        <span className="eyebrow">AI Engineer | ML Builder | GenAI Explorer</span>
        <h1>AI systems for clear decisions.</h1>
        <p>
          I am Animesh Karmakar, focused on ML, RAG, agents, and production AI.
        </p>
        <blockquote>Build deeply. Learn more than the code.</blockquote>
        <div className="hero-actions">
          <a className="primary-link" href="#projects">Explore work <ChevronRight size={18} /></a>
          <a className="ghost-link" href="#contact">Contact me</a>
          <a className="ghost-link resume-link" href="/animesh_karmakar_resume.pdf" download>
            <Download size={18} />
            Resume
          </a>
        </div>
      </div>
      <div className="portrait-stage" data-reveal>
        <div className="flip-card" aria-label="Animesh photo flip card">
          <div className="flip-card-inner">
            <div className="portrait-face front">
              <img src="/animesh.jpeg" alt="Animesh Karmakar" />
            </div>
            <div className="portrait-face back">
              <Sparkles size={44} />
              <h2>AI x Product</h2>
              <p>Models, agents, and interfaces that feel useful.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const [active, setActive] = useState(0);
  const ActiveIcon = skills[active].icon;
  return (
    <section id="skills" className="section skills-section" data-reveal>
      <div className="section-heading">
        <h2>Skills</h2>
      </div>
      <div className="skill-lab">
        <div className="skill-tabs">
          {skills.map((skill, index) => (
            <button key={skill.domain} className={active === index ? 'active' : ''} onClick={() => setActive(index)}>
              <skill.icon size={20} />
              {skill.domain}
            </button>
          ))}
        </div>
        <div className="skill-detail">
          <ActiveIcon size={34} />
          <h3>{skills[active].domain}</h3>
          <p>{skills[active].note}</p>
          <div className="stack-cloud">
            {skills[active].stack.map(([item, Icon]) => (
              <span key={item}>
                <Icon size={16} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  const project = projects[activeProject];
  return (
    <section id="projects" className="section projects-section" data-reveal>
      <div className="section-heading">
        <h2>Projects</h2>
      </div>
      <div className="project-shell">
        <aside className="project-list">
          {projects.map((item, index) => (
            <button key={item.title} className={activeProject === index ? 'active' : ''} onClick={() => setActiveProject(index)}>
              <BriefcaseBusiness size={18} />
              <span>{item.title}</span>
            </button>
          ))}
        </aside>
        <article className="project-panel">
          <div className="project-topline">
            <div>
              <div className="project-title-row">
                <h3>{project.title}</h3>
                <a className="title-link" href={project.link} target="_blank" rel="noreferrer">
                  Project link <ArrowUpRight size={15} />
                </a>
              </div>
              <p>{project.subtitle}</p>
            </div>
          </div>
          <div className="objective">
            <ShieldCheck size={20} />
            <p>{project.objective}</p>
          </div>
          <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="chat-box">
            {project.conversation.map(([name, line], index) => (
              <div key={`${name}-${index}`} className={`chat-line ${index % 2 ? 'right' : 'left'}`}>
                <b>{name}</b>
                <p>{line}</p>
              </div>
            ))}
          </div>
          <a className="readmore" href={project.link} target="_blank" rel="noreferrer">
            Full README, architecture, images, and GitHub link <ArrowUpRight size={18} />
          </a>
        </article>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section education-section" data-reveal>
      <div className="section-heading">
        <span>Education</span>
        <h2>Journey tree</h2>
      </div>
      <div className="journey">
        {journey.map((item) => (
          <div className="journey-node" key={item.year}>
            <div className="node-dot"><GraduationCap size={20} /></div>
            <span>{item.year}</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </div>
        ))}
      </div>
      <div className="achievement-grid">
        {achievements.map((item) => (
          <div className="achievement-card" key={item.label}>
            <Award size={22} />
            <h3>{item.label}</h3>
            <p>{item.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const contacts = [
    { icon: Code2, label: 'GitHub', value: 'github.com/animeshkarmakar7', href: 'https://github.com/animeshkarmakar7' },
    { icon: Link, label: 'LinkedIn', value: 'linkedin.com/in/animeshkarmakar', href: 'https://linkedin.com/in/animeshkarmakar' },
    { icon: Mail, label: 'Email', value: 'animeshkarmakar710@gmail.com', href: 'mailto:animeshkarmakar710@gmail.com' },
    { icon: Phone, label: 'Mobile', value: '+91 8433815521', href: 'tel:+918433815521' },
  ];
  return (
    <section id="contact" className="section contact-section" data-reveal>
      <div className="section-heading">
        <span>Contact</span>
        <h2>Let us build something useful</h2>
      </div>
      <div className="contact-layout">
        <div className="contact-copy">
          <Rocket size={36} />
          <p>Open to AI engineering, GenAI, ML, and production deployment opportunities.</p>
          <div className="location"><MapPin size={18} /> Mumbai, India</div>
        </div>
        <div className="contact-links">
          {contacts.map((item) => (
            <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              <item.icon size={22} />
              <span>{item.label}</span>
              <b>{item.value}</b>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  useReveal();
  return (
    <>
      <CursorGlow />
      <Header />
      <main>
        <Home />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
