"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    slug: "legaldocai",
    number: "01",
    title: "LegalDocAI",
    eyebrow: "GENERATIVE AI / DOCUMENT INTELLIGENCE",
    description: "Production-oriented legal document verification with OCR ingestion, hybrid BM25 + vector retrieval, clause classification and legal risk scoring.",
    stack: ["FastAPI","PostgreSQL","MinIO","Kafka","Celery","Tesseract","LangChain","ChromaDB","Sentence-Transformers","Gemini API","BM25","Docker","Streamlit"],
    github: "https://github.com/animeshkarmakar7/Document-Verification-AI",
    accent: "LEGAL / RAG",
  },
  {
    slug: "tradeguard-ai",
    number: "02",
    title: "TradeGuard AI",
    eyebrow: "AGENTIC AI / COMPLIANCE",
    description: "LangGraph-based multi-agent customs compliance workflow combining dense retrieval, sparse retrieval, RRF fusion and verification gates.",
    stack: ["Python","LangGraph","Qdrant","BGE","BM25Plus","RRF Fusion","FastAPI","Streamlit"],
    github: "https://github.com/animeshkarmakar7/GLOBAL-TRADE-CUSTOMS-COMPLIANCE-ASSISTANT",
    accent: "AGENTS / SEARCH",
  },
  {
    slug: "sangrahak",
    number: "03",
    title: "Sangrahak",
    eyebrow: "MACHINE LEARNING / INVENTORY AI",
    description: "Predictive inventory platform for demand forecasting, stock-out risk, supplier-delay prediction and operational alerts.",
    stack: ["Python","Pandas","NumPy","Scikit-learn","XGBoost","Random Forest","ARIMA","Flask","MongoDB","Docker","AWS EC2"],
    github: "https://github.com/animeshkarmakar7/Sangrahak-AI-powered-Inventory-Management-system",
    accent: "FORECAST / RISK",
  },
  {
    slug: "saas-churn",
    number: "04",
    title: "SaaS Churn Intelligence",
    eyebrow: "DATA / MACHINE LEARNING / ANALYTICS",
    description: "End-to-end churn intelligence pipeline with MySQL feature engineering, XGBoost modeling, SHAP explanations, SMOTE balancing and Power BI.",
    stack: ["Python","MySQL","Pandas","Scikit-learn","XGBoost","Random Forest","SHAP","SMOTE","Power BI"],
    github: "https://github.com/animeshkarmakar7/CustomerChurnReport",
    accent: "SQL / ML",
  },
];

function VisualSlot({ project, active }) {
  return (
    <a
      href={`/projects/${project.slug}`}
      className={`project-visual-slot ${active ? "is-active" : ""}`}
      aria-label={`Open ${project.title} project details`}
    >
      <div className="visual-grid" />
      <div className="visual-orbit visual-orbit-a" />
      <div className="visual-orbit visual-orbit-b" />
      <div className="visual-corner visual-corner-tl" />
      <div className="visual-corner visual-corner-br" />
      <div className="visual-slot-content">
        <div className="visual-slot-top">
          <span>{project.number} / {project.accent}</span>
          <ArrowUpRight size={18} />
        </div>
        {project.image ? (
          <img className="project-visual-image" src={project.image} alt={`${project.title} project preview`} />
        ) : (
          <div className="visual-placeholder">
            <span className="visual-slot-label">PROJECT IMAGE</span>
            <strong>IMAGE SLOT</strong>
            <small>Add project screenshot / cover here</small>
          </div>
        )}
      </div>
    </a>
  );
}

export default function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observers = sectionRefs.current
      .filter(Boolean)
      .map((el, index) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActive(index);
          },
          { rootMargin: "-35% 0px -50% 0px", threshold: 0 }
        );
        observer.observe(el);
        return observer;
      });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const project = projects[active];

  return (
    <div className="project-showcase">
      <div className="project-sticky">
        <div className="project-sticky-copy">
          <div key={project.slug} className="project-smooth-panel">
            <div className="project-showcase-index">PROJECT {project.number} / {projects.length}</div>
            <p className="project-showcase-eyebrow">{project.eyebrow}</p>
            <h3>{project.title}</h3>
            <p className="project-showcase-description">{project.description}</p>
            <a className="project-github-link" href={project.github} target="_blank" rel="noreferrer">
              VIEW GITHUB <ArrowUpRight size={15} />
            </a>
            <div className="project-stack-block">
              <div className="project-stack-label">TECH STACK</div>
              <div className="project-stack-pills">
                {project.stack.map((tech) => <span key={tech}>{tech}</span>)}
              </div>
            </div>
          </div>
        </div>

        <div className="project-sticky-visual">
          <VisualSlot key={project.slug} project={project} active={true} />
          <div className="project-visual-progress">
            {projects.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                className={index === active ? "active" : ""}
                aria-label={`Show ${item.title}`}
                onClick={() => sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })}
              >
                <span>{item.number}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="project-scroll-track" aria-hidden="true">
        {projects.map((item, index) => (
          <div
            className="project-scroll-step"
            key={item.slug}
            ref={(node) => { sectionRefs.current[index] = node; }}
          />
        ))}
      </div>
    </div>
  );
}
