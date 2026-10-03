import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Layers3 } from "lucide-react";
import { notFound } from "next/navigation";

const projects = {
  "legaldocai": {
    title: "LegalDocAI",
    eyebrow: "GENERATIVE AI / DOCUMENT INTELLIGENCE",
    subtitle: "Legal document verification, retrieval and risk analysis",
    summary: "A production-oriented legal document pipeline designed to turn long PDFs into searchable, citation-grounded answers and structured risk signals.",
    github: "https://github.com/animeshkarmakar7/Document-Verification-AI",
    stack: ["FastAPI","PostgreSQL","MinIO","Kafka","Celery","Tesseract","LangChain","ChromaDB","Sentence-Transformers","Gemini API","BM25","Cosine Similarity","Docker","Streamlit"],
    architecture: ["Upload / OCR ingestion","Kafka event processing","Celery worker pipeline","Chunking + embeddings","BM25 + vector retrieval","RAG synthesis with citations","Clause classification + risk scoring","Streamlit UI over REST APIs"],
    architectureImage: "/legaldoc-architecture.svg",
    points: ["OCR ingestion with Tesseract for scanned documents","Hybrid retrieval combines BM25 lexical search with cosine vector similarity","Clause classification and legal risk scoring expose structured review signals","MinIO stores document assets while PostgreSQL stores application metadata","Dockerized services separate API, ingestion, workers and supporting infrastructure"],
  },
  "tradeguard-ai": {
    title: "TradeGuard AI",
    eyebrow: "AGENTIC AI / COMPLIANCE",
    subtitle: "Multi-agent customs and global trade compliance assistant",
    summary: "A LangGraph-based workflow that routes trade questions through specialist retrieval and verification steps before producing structured answers.",
    github: "https://github.com/animeshkarmakar7/GLOBAL-TRADE-CUSTOMS-COMPLIANCE-ASSISTANT",
    stack: ["Python","LangGraph","Qdrant","BGE","BM25Plus","RRF Fusion","FastAPI","Streamlit"],
    architecture: ["Supervisor agent","Dense retrieval worker","Sparse retrieval worker","RRF fusion","Verification gate","Structured response"],
    points: ["Supervisor routing separates the workflow into specialist tasks","Dense and sparse search reduce dependence on one retrieval signal","RRF fusion combines ranked evidence from the retrieval paths","Verification gate checks structured claims against retrieved regulatory evidence","FastAPI backend and Streamlit frontend expose the workflow as an application"],
  },
  "sangrahak": {
    title: "Sangrahak",
    eyebrow: "MACHINE LEARNING / INVENTORY AI",
    subtitle: "Predictive demand forecasting and inventory intelligence platform",
    summary: "An ML platform for demand forecasting, stock-out risk, supplier-delay prediction, alerts and conversational inventory analysis.",
    github: "https://github.com/animeshkarmakar7/Sangrahak-AI-powered-Inventory-Management-system",
    stack: ["Python","Pandas","NumPy","Scikit-learn","XGBoost","Random Forest","ARIMA","Flask","MongoDB","Docker","AWS EC2"],
    architecture: ["Inventory data ingestion","Feature preparation","ARIMA demand forecasting","XGBoost stock-out classification","Random Forest supplier-delay model","Alerting + inventory views","Conversational retrieval"],
    points: ["ARIMA demand forecasting reported 10.11% MAPE","XGBoost stock-out classification reported 0.91 AUC-ROC","Random Forest supplier-delay prediction reported R² 0.84","Designed around operational decisions such as low-stock and delay risk","Deployed using Flask, MongoDB, Docker and AWS EC2"],
  },
  "saas-churn": {
    title: "SaaS Churn Intelligence",
    eyebrow: "DATA / MACHINE LEARNING / ANALYTICS",
    subtitle: "SQL + ML early-warning system for customer revenue risk",
    summary: "An end-to-end customer churn pipeline pairing a MySQL analytics layer with a Python model pipeline, explainability and Power BI reporting.",
    github: "https://github.com/animeshkarmakar7/CustomerChurnReport",
    stack: ["Python","MySQL","Pandas","Scikit-learn","XGBoost","Random Forest","SHAP","SMOTE","Power BI"],
    architecture: ["Raw customer data","16-script MySQL analytics layer","21+ engineered features","SMOTE balancing","Model comparison + tuning","SHAP explanations","Risk scoring","Power BI dashboard"],
    points: ["Analyzed 7,043 customer records","Engineered features including LTV, RFM, engagement and tenure risk signals","Compared Logistic Regression, Random Forest and XGBoost","Used SHAP for model explainability and SMOTE for class imbalance","Combined technical predictions with revenue-at-risk reporting"],
  },
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) notFound();

  return (
    <main className="detail-page">
      <header className="detail-nav">
        <Link href="/" className="mono"><ArrowLeft size={14}/> BACK TO PORTFOLIO</Link>
        <a href={project.github} target="_blank" rel="noreferrer" className="detail-github">GITHUB <ArrowUpRight size={14}/></a>
      </header>

      <section className="detail-hero">
        <div className="section-label">PROJECT DETAIL</div>
        <p className="detail-eyebrow">{project.eyebrow}</p>
        <h1>{project.title}</h1>
        <h2>{project.subtitle}</h2>
        <p className="detail-summary">{project.summary}</p>
      </section>

      <section className="detail-section">
        <div className="detail-label">01 — TECH STACK</div>
        <div className="detail-tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
      </section>

      <section className="detail-section detail-architecture">
        <div className="detail-label">02 — ARCHITECTURE</div>
        <div className="architecture-grid">
          {project.architecture.map((step, index) => (
            <div className="architecture-card" key={step}>
              <span>0{index + 1}</span>
              <Layers3 size={18}/>
              <h3>{step}</h3>
            </div>
          ))}
        </div>
        {project.architectureImage && (
          <div className="architecture-image-box">
            <img
              src={project.architectureImage}
              alt={`${project.title} system architecture`}
              loading="lazy"
            />
          </div>
        )}
      </section>

      <section className="detail-section">
        <div className="detail-label">03 — IMPLEMENTATION</div>
        <div className="detail-points">
          {project.points.map((point) => (
            <div key={point}><CheckCircle2 size={18}/><p>{point}</p></div>
          ))}
        </div>
      </section>

      <section className="detail-cta">
        <p>Read the complete source, README and implementation.</p>
        <a href={project.github} target="_blank" rel="noreferrer">OPEN GITHUB <ArrowUpRight size={17}/></a>
      </section>
    </main>
  );
}
