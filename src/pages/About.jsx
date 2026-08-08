import React from 'react';
import { Award, MapPin, Smile } from 'lucide-react';
import { translations } from '../utils/translations';

export default function About({ onNavigate, language }) {
  const t = translations[language].about;
  const pillars = translations[language].pillars;

  const getPillarIcon = (idx) => {
    switch (idx) {
      case 0: return <Award size={26} />;
      case 1: return <MapPin size={26} />;
      default: return <Smile size={26} />;
    }
  };

  return (
    <div className="section">
      <div className="section-header">
        <span className="section-subtitle">{t.subtitle}</span>
        <h2 className="section-title">{t.title}</h2>
        <p className="section-desc">{t.desc}</p>
      </div>

      <div className="about-grid">
        <div className="about-images">
          <img
            className="about-img-main"
            src="images/about-main.jpg"
            alt="Ayurvedic Treatment Room"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.style.background = 'linear-gradient(135deg, var(--primary-light), var(--primary-dark))';
              e.target.parentNode.style.height = '400px';
              e.target.parentNode.style.borderRadius = 'var(--border-radius-md)';
            }}
          />
          <img
            className="about-img-sub"
            src="images/about-sub.jpg"
            alt="Ayurvedic Herbs and Oils"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        <div className="about-content-section">
          <h3 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>{t.sectionHeading}</h3>
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>

          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-num">{t.stat1Num}</div>
              <div className="stat-label">{t.stat1Label}</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">{t.stat2Num}</div>
              <div className="stat-label">{t.stat2Label}</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">{t.stat3Num}</div>
              <div className="stat-label">{t.stat3Label}</div>
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <button className="btn btn-primary" onClick={() => onNavigate('contact')}>
              {t.visitBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="values-grid-wrap">
        <div className="section-header values-section-header">
          <span className="section-subtitle">{t.pillarsSubtitle}</span>
          <h2 className="section-title">{t.pillarsTitle}</h2>
        </div>

        <div className="features-grid">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">
                {getPillarIcon(idx)}
              </div>
              <h3 className="feature-h3">{pillar.title}</h3>
              <p>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
