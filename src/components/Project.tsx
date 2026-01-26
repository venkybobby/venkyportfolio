import React from "react";
import cqrsImage from '../assets/images/cqrs.png';
import aeImage from '../assets/images/AE reporting.png';
import orderStatusImage from '../assets/images/orderstatus.png';
import callIntentImage from '../assets/images/likelihood for patient calling and intent.png';
import '../assets/styles/Project.scss';

function Project() {
    return(
    <div className="projects-container" id="projects">
        <h1>High-Impact Projects</h1>
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
        </div>
    </div>
    );
}

export default Project;