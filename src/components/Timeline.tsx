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
            <p>
              Lead platform strategy and delivery for omni-channel pharmacy applications. Drove CRM transformation from Pega to React and AWS serverless architecture. Delivered agentic AI workflows for adverse event reporting. Oversee $20M+ annual portfolio and lead 180+ engineers across onshore and offshore teams.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2020 - 2022"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Senior Manager of Software Engineering</h3>
            <h4 className="vertical-timeline-element-subtitle">Cigna – Accredo Specialty Pharmacy</h4>
            <p>
              Led end-to-end delivery of greenfield CRM initiative. Launched digital texting platform using Camunda/BPMN, driving call deflection and saving ~$5M annually. Managed Tier-1 production systems, reducing Sev-1 and Sev-2 incidents.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2018 - 2020"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Senior Manager, Application Development</h3>
            <h4 className="vertical-timeline-element-subtitle">CVS Health – NovoLogix</h4>
            <p>
              Owned engineering delivery for high-volume medical prior authorization platform. Modernized legacy services to API-first microservices and Angular-based web applications. Executed cloud migration to .NET Core on Azure.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2011 - 2018"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Engineering Leadership Roles</h3>
            <h4 className="vertical-timeline-element-subtitle">Cognizant / Express Scripts</h4>
            <p>
              Led large-scale enterprise transformation programs, architectural roadmaps, CI/CD adoption, and delivery operating models across regulated and high-volume environments.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;