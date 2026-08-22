import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faMagnifyingGlassChart, faTriangleExclamation, faFileShield } from '@fortawesome/free-solid-svg-icons';
import cqrsImage from '../assets/images/cqrs.png';
import aeImage from '../assets/images/AE reporting.png';
import orderStatusImage from '../assets/images/orderstatus.png';
import callIntentImage from '../assets/images/likelihood for patient calling and intent.png';
import rxintelliImage from '../assets/images/rxintelli.png';
import '../assets/styles/Project.scss';

function Project() {
    return(
    <div className="projects-container" id="projects">
        <h1>Forward-Deployed AI Portfolio</h1>
        <p className="projects-intro">Four production agentic systems, built and deployed end to end. One methodology across all four: checks fail first, run on every deployment, and fail closed on unknown state — and they have caught real bugs in production in each one.</p>
        <div className="projects-grid">
            <div className="project">
                <div className="project-icon-box"><FontAwesomeIcon icon={faCalculator} size="2x"/></div>
                <h2>CSRSupport — Payer Eligibility &amp; Cost Estimator</h2>
                <p>Ran a complete forward-deployed engagement solo — discovery, scoping, a mid-build compliance re-scope, and a 15-slide steering review that won all three asks. Architected the system so the LLM only routes: every dollar figure comes from a deterministic calculator with an audit reference, verified by 108 unit / 17 integration / 18 offline / 22 live tests that gate every deployment. <strong>Impact: Found and fixed 2 real pricing defects, surfaced 15 drifted/missing/unnegotiated rates via an independent audit, and repelled 4 of 4 adversarial probes.</strong></p>
            </div>
            <div className="project">
                <div className="project-icon-box"><FontAwesomeIcon icon={faMagnifyingGlassChart} size="2x"/></div>
                <a href="https://claimsrag-chat.fly.dev" target="_blank" rel="noreferrer"><h2>ClaimsRAG — Citation-Guaranteed RAG over CMS Policy</h2></a>
                <p>Built an extractive retrieval system that answers coverage questions from CMS NCD and CFR policy documents in verbatim policy text with structural citations, designing hallucination out rather than prompting it away. Wired remote evals against the live deployment as a required CI gate on every push to main. <strong>Impact: Refusal evals caught a real corpus gap; the first CI-gated eval run caught a production cold-start failure before it reached users.</strong></p>
                <div className="project-links">
                    <a href="https://claimsrag-chat.fly.dev" target="_blank" rel="noreferrer">Live Demo</a>
                    <a href="https://github.com/venkybobby/ClaimsRAG" target="_blank" rel="noreferrer">GitHub</a>
                </div>
            </div>
            <div className="project">
                <div className="project-icon-box"><FontAwesomeIcon icon={faTriangleExclamation} size="2x"/></div>
                <a href="https://github.com/venkybobby/AI_Agents" target="_blank" rel="noreferrer"><h2>Claims Anomaly Agent — Deterministic Routing on Vertex AI</h2></a>
                <p>Built agentic claims-anomaly detection for X12 837P EDI claims covering OIG exclusion screening, CMS NCCI edits, and medical-necessity checks, driven by versioned YAML rule packs on Vertex AI. Designed a deployed-endpoint diff eval with a six-way stale/drift verdict and an LLM groundedness judge with a human-review boundary band. <strong>Impact: Caught a real grounding bug in production reasoning text, now covered by a deterministic regression test.</strong></p>
                <div className="project-links">
                    <a href="https://github.com/venkybobby/AI_Agents" target="_blank" rel="noreferrer">GitHub</a>
                </div>
            </div>
            <div className="project">
                <div className="project-icon-box"><FontAwesomeIcon icon={faFileShield} size="2x"/></div>
                <a href="https://github.com/venkybobby/SARO" target="_blank" rel="noreferrer"><h2>SARO — Runtime AI Evidence &amp; Attestation Platform</h2></a>
                <p>Took an AI-governance platform from concept to deployed production system solo: evaluates AWS Bedrock invocation logs against versioned, immutable rule packs and maps evidence to NIST AI RMF and EU AI Act Articles 9/13/17. Locked zero-PHI retention and tenant isolation as architectural invariants, enforced by CI guards rather than documentation. <strong>Impact: NIST AI RMF self-assessment, disclosed threat model, and reproducible evaluation delivered as first-class artifacts.</strong></p>
                <div className="project-links">
                    <a href="https://github.com/venkybobby/SARO" target="_blank" rel="noreferrer">GitHub</a>
                </div>
            </div>
        </div>
        <h1 className="projects-section-spacer">Enterprise Platform Projects</h1>
        <div className="projects-grid">
            <div className="project">
                <img src={cqrsImage} className="zoom" alt="CQRS Architecture Diagram" width="100%"/>
                <h2>Proactive Order Scheduling with CQRS Architecture</h2>
                <p>Architected a CQRS-style database design for a call center application that pre-creates scheduling records before patient calls. The system proactively identifies and resolves issues such as missing copayments and prior authorizations, ensuring all critical data is available when calls arrive. This omni-channel solution seamlessly serves digital, texting, and call center interactions, dramatically reducing call handling time and elevating patient experience. <strong>Impact: $4M in operational savings and significant improvement in patient satisfaction metrics.</strong></p>
            </div>
            <div className="project">
                <a href="https://clinical-ae-agent-bmj4hszpwa-uc.a.run.app/" target="_blank" rel="noreferrer"><img src={aeImage} className="zoom" alt="AI-Powered Adverse Event Summarization" width="100%"/></a>
                <a href="https://clinical-ae-agent-bmj4hszpwa-uc.a.run.app/" target="_blank" rel="noreferrer"><h2>AI-Powered Adverse Event Summarization & Reporting</h2></a>
                <p>Engineered an intelligent adverse event processing system leveraging advanced LLMs (OpenAI GPT and Claude) to automatically summarize patient-submitted assessments. The solution cross-references manufacturer contracts to classify events and generates compliant reporting forms. By automating manual classification and form generation workflows, the system eliminates hours of repetitive work while ensuring regulatory compliance. <strong>Impact: $3M in cost savings and 90% reduction in manual processing time.</strong></p>
            </div>
            <div className="project">
                <img src={orderStatusImage} className="zoom" alt="Order Status Harmonization Architecture" width="100%"/>
                <h2>Order Status Harmonization Platform</h2>
                <p>Built a unified order tracking application on AWS with React that provides real-time, accurate order status visibility across all channels. The platform proactively enrolls patients in text and mobile app notifications, delivering status updates before they initiate contact. This predictive communication strategy significantly reduces unsolicited call volume while improving patient engagement and satisfaction. <strong>Impact: Substantial reduction in call center volume and enhanced patient engagement rates.</strong></p>
            </div>
            <div className="project">
                <img src={callIntentImage} className="zoom" alt="Call Intent Forecasting & Predictive Analytics" width="100%"/>
                <h2>Call Intent Forecasting & Predictive Analytics</h2>
                <p>Developed a sophisticated machine learning solution combining classification models and rule-based algorithms to predict patient call intent and the likelihood of calls within a 7-day window. The system analyzes historical patterns, patient behavior, order status, and contextual factors to enable intelligent staffing decisions and optimal call routing. This predictive capability ensures the right resources are available at the right time, routing calls to specialized teams for faster resolution. <strong>Impact: $5M in operational efficiency gains through optimized staffing and improved call routing accuracy.</strong></p>
            </div>
            <div className="project">
                <a href="https://deluxe-baklava-743914.netlify.app" target="_blank" rel="noreferrer"><img src={rxintelliImage} className="zoom" alt="RxIntelli Intelligent Pharmacy Platform" width="100%"/></a>
                <a href="https://deluxe-baklava-743914.netlify.app" target="_blank" rel="noreferrer"><h2>Intelligent Pharmacy Platform</h2></a>
                <p>Architected RxIntelli, a production-grade full-stack platform that automates and orchestrates the complete prescription fulfillment workflow from multi-channel intake through delivery scheduling. The solution integrates intelligent validation using machine learning and rule-based logic, ensuring compliance guardrails and role-based access controls throughout the process. By consolidating fragmented point solutions into a unified, autonomous system, RxIntelli transforms prescription processing from a manual, error-prone operation into a secure, observable digital flow. The platform provides real-time executive visibility into every workflow step, enabling proactive issue resolution and dramatically reducing cycle times from days to minutes. <strong>Impact: Significant reduction in processing time, elimination of manual errors, and enhanced visibility into prescription fulfillment operations.</strong></p>
            </div>
        </div>
    </div>
    );
}

export default Project;