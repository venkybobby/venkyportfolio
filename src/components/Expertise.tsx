import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faDocker } from '@fortawesome/free-brands-svg-icons';
import { faRobot, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
    "Java/J2EE",
    "React",
    "Angular",
    "TypeScript",
    "JavaScript",
    ".NET Core",
    "REST APIs",
    "Microservices",
    "Event-Driven Architecture"
];

const labelsSecond = [
    "AWS (Lambda, Step Functions)",
    "Azure",
    "GCP",
    "Cloud-Native",
    "CI/CD",
    "DevSecOps",
    "Camunda/BPMN",
    "Kafka",
    "DB2",
    "Oracle"
];

const labelsThird = [
    "Anthropic Claude API",
    "Vertex AI / Gemini",
    "AWS Bedrock",
    "LangGraph",
    "RAG & Extractive Retrieval",
    "Promptfoo / DeepEval / G-Eval",
    "LLM-Judge Design",
    "GitHub Copilot",
    "Cursor"
];

const labelsFourth = [
    "NIST AI RMF",
    "EU AI Act",
    "ISO 42001",
    "HIPAA",
    "X12 837P EDI Claims",
    "CMS NCD / NCCI Edits",
    "OIG Exclusion Screening",
    "Prior Authorization",
    "Specialty Pharmacy"
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Expertise</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faReact} size="3x"/>
                    <h3>Full-Stack Engineering & Distributed Systems</h3>
                    <p>22+ years of experience building high-throughput, regulated enterprise platforms. Expertise in microservices, REST APIs, API-first design, event-driven integration, and CQRS patterns. Strong background in Java/J2EE, React, Angular, and modern web technologies.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faDocker} size="3x"/>
                    <h3>Cloud Platforms & DevOps</h3>
                    <p>Proven track record in AWS and Azure cloud-native transformation. Expertise in serverless architectures, workflow orchestration, CI/CD pipelines, and engineering excellence practices. Experience with hybrid/private cloud deployments and observability.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faRobot} size="3x"/>
                    <h3>Agentic AI, LLM Systems &amp; Evals</h3>
                    <p>Ships production agentic systems with deterministic tool cores and LLM routing — the model routes, it never computes. Designs eval suites (golden sets, LLM-judge design, adversarial and refusal testing) that gate every deployment and fail closed on unknown state.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsThird.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faShieldHalved} size="3x"/>
                    <h3>AI Governance &amp; Healthcare Domain</h3>
                    <p>Maps runtime AI evidence to NIST AI RMF and EU AI Act requirements with zero-PHI retention and tenant isolation. Deep regulated-healthcare domain expertise spanning claims, eligibility, prior authorization, and specialty pharmacy operations.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsFourth.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;