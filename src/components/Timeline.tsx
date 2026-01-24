import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date="2022 - Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Director of Software Engineering</h3>
            <h4 className="vertical-timeline-element-subtitle">Cigna – Accredo Specialty Pharmacy</h4>
            <ul style={{marginTop: '10px', paddingLeft: '20px'}}>
              <li>Lead platform strategy and delivery for omni-channel pharmacy applications in HIPAA-compliant environments</li>
              <li>Drove CRM transformation from Pega to modern React and AWS serverless architecture (Lambda, Step Functions), redesigning order scheduling and reducing Average Handle Time (AHT) by 100+ seconds</li>
              <li>Solved a 17-year order visibility challenge ("Where is my order") using event-driven integration and CQRS-style read/write models, reducing order-status handling time from ~9 minutes to ~3 minutes</li>
              <li>Delivered agentic AI workflows for clinical assessments and adverse event (AE) reporting using AWS Bedrock and LangGraph-based orchestration, compressing end-to-end cycle time from days to hours with full auditability</li>
              <li>Institutionalized AI-enabled SDLC practices using GitHub Copilot and Cursor, improving engineering productivity by ~30% while preserving quality and compliance</li>
              <li>Modernized platform integrations using API-first and event-driven patterns (Kafka, MQ), enabling near real-time order visibility</li>
              <li>Oversee $20M+ annual portfolio and lead 180+ engineers across onshore and offshore teams, managing scope, budget, dependencies, and risk</li>
            </ul>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2020 - 2022"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Senior Manager of Software Engineering</h3>
            <h4 className="vertical-timeline-element-subtitle">Cigna – Accredo Specialty Pharmacy</h4>
            <ul style={{marginTop: '10px', paddingLeft: '20px'}}>
              <li>Led end-to-end delivery of greenfield CRM initiative from ideation through production scale</li>
              <li>Launched digital texting platform using Camunda/BPMN for prescription fills, driving call deflection and saving ~$5M annually</li>
              <li>Managed Tier-1 production systems, reducing Sev-1 and Sev-2 incidents through monitoring, automation, and performance tuning</li>
              <li>Mentored tech leads and managers; led performance management and talent development initiatives</li>
            </ul>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2018 - 2020"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Senior Manager, Application Development</h3>
            <h4 className="vertical-timeline-element-subtitle">CVS Health – NovoLogix</h4>
            <ul style={{marginTop: '10px', paddingLeft: '20px'}}>
              <li>Owned engineering delivery for high-volume medical prior authorization platform</li>
              <li>Defined platform architecture and roadmap; modernized legacy services to API-first microservices and Angular-based web applications</li>
              <li>Executed cloud migration to .NET Core on Azure and modernized CI/CD pipelines</li>
              <li>Established regression automation for critical APIs, improving reliability and throughput</li>
            </ul>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2011 - 2018"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Engineering Leadership Roles</h3>
            <h4 className="vertical-timeline-element-subtitle">Cognizant / Express Scripts (2011-2018), Cognizant / Sallie Mae (2008-2010), Ford Motor Company (2004-2007), Southern California Edison (2003-2004)</h4>
            <ul style={{marginTop: '10px', paddingLeft: '20px'}}>
              <li>Led large-scale enterprise transformation programs, architectural roadmaps, CI/CD adoption, and delivery operating models across regulated and high-volume environments</li>
            </ul>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;