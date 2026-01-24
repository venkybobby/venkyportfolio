import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faDocker, faPython } from '@fortawesome/free-brands-svg-icons';
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
    "Cloud-Native",
    "CI/CD",
    "DevSecOps",
    "Camunda/BPMN",
    "Kafka",
    "DB2",
    "Oracle",
    "Graph Databases"
];

const labelsThird = [
    "GitHub Copilot",
    "Cursor",
    "AWS Bedrock",
    "LangGraph",
    "GenAI for SDLC",
    "AI-Enabled Engineering",
    "Agentic AI Workflows"
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
                    <FontAwesomeIcon icon={faPython} size="3x"/>
                    <h3>AI-Enabled SDLC & GenAI</h3>
                    <p>Pioneered embedding AI into the SDLC, improving engineering productivity by ~30%. Delivered agentic AI workflows for clinical assessments and adverse event reporting. Institutionalized GitHub Copilot and Cursor standards with guardrails for quality and compliance.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsThird.map((label, index) => (
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