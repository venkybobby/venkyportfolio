import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import profilePhoto from '../assets/images/profile-photo.png';
import '../assets/styles/Main.scss';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={profilePhoto} alt="Venkatesan Ramanathan" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/venkybobby" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/venky0411" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
          <h1>Venkatesan Ramanathan</h1>
          <p>Director of Software Engineering</p>
          <p style={{fontSize: '0.9em', marginTop: '10px', opacity: 0.8}}>Distributed Systems | Cloud-Native Platforms | AI-Enabled SDLC | Enterprise Modernization</p>
          <div className="phone-contact" style={{display: 'flex', alignItems: 'center', gap: '8px', marginTop: '15px'}}>
            <PhoneIcon style={{fontSize: '1.2em', color: '#ffffff'}}/>
            <a href="tel:570-817-1128" className="phone-number">570-817-1128</a>
          </div>

          <div className="mobile_social_icons">
            <a href="https://github.com/venkybobby" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/venky0411" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;