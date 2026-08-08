import React, { useState } from 'react';
import { Heart, ShieldCheck, Award, Star, Compass, ArrowRight, Brain, Leaf, Activity, ChevronDown, Sparkles } from 'lucide-react';
import { translations } from '../utils/translations';

export default function Home({ onNavigate, language }) {
  const [expandedId, setExpandedId] = useState(null);
  
  const t = translations[language].home;
  const listT = translations[language].treatmentsList;
  const features = translations[language].features;
  const testimonials = translations[language].testimonials;

  const getTreatmentIcon = (category) => {
    switch (category) {
      case 'stress':
        return <Brain size={18} />;
      case 'rejuvenation':
        return <Sparkles size={18} />;
      case 'detox':
        return <Leaf size={18} />;
      case 'pain':
        return <Activity size={18} />;
      default:
        return <Heart size={18} />;
    }
  };

  const previewTreatments = [
    {
      id: "abhyanga",
      title: listT["abhyanga"].title,
      category: "rejuvenation",
      desc: listT["abhyanga"].desc,
      img: "abhyanga.jpg",
      time: listT["abhyanga"].duration
    },
    {
      id: "shirodhara-stress",
      title: listT["shirodhara-stress"].title,
      category: "stress",
      desc: listT["shirodhara-stress"].desc,
      img: "shirodhara.jpg",
      time: listT["shirodhara-stress"].duration
    },
    {
      id: "kati-basti",
      title: listT["kati-basti"].title,
      category: "pain",
      desc: listT["kati-basti"].desc,
      img: "janubasti.jpg",
      time: listT["kati-basti"].duration
    }
  ];

  const getFeatureIcon = (idx) => {
    switch (idx) {
      case 0: return <Compass size={32} />;
      case 1: return <Heart size={32} />;
      default: return <Award size={32} />;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-sec">
        <div className="hero-left">
          <h1 className="hero-h1">
            {t.heroSub}<span>{t.heroHighlight}</span>{t.heroAfterHighlight}
          </h1>
          <p className="hero-p text-muted">{t.heroDesc}</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => onNavigate('services')}>
              {t.exploreBtn}
              <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </button>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-img-container">
            <img src="images/hero.jpg" alt="Ayurvedic Therapy Room Rishikesh" className="hero-img" onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.style.background = 'linear-gradient(135deg, var(--primary-light), var(--primary-dark))';
            }} />
            <div className="hero-img-shadow"></div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section" style={{ background: '#f5f4ee', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-header">
          <span className="section-subtitle">{t.ethosSubtitle}</span>
          <h2 className="section-title">{t.ethosTitle}</h2>
          <p className="section-desc">{t.ethosDesc}</p>
        </div>

        <div className="features-grid">
          {features.map((feat, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">
                {getFeatureIcon(idx)}
              </div>
              <h3 className="feature-h3">{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured treatments */}
      <section className="section">
        <div className="section-header">
          <span className="section-subtitle">{t.specialitiesSubtitle}</span>
          <h2 className="section-title">{t.specialitiesTitle}</h2>
          <p className="section-desc">{t.specialitiesDesc}</p>
        </div>

        <div className="treatments-grid">
          {previewTreatments.map((t) => {
            const isExpanded = expandedId === t.id;
            return (
              <div 
                key={t.id} 
                className={`treatment-card ${isExpanded ? 'is-expanded' : ''}`}
                onClick={() => setExpandedId(isExpanded ? null : t.id)}
              >
                {/* Mobile View Header */}
                <div className="treatment-mobile-header">
                  <div className="treatment-mobile-left">
                    <div className="treatment-mobile-icon-box">
                      {getTreatmentIcon(t.category)}
                    </div>
                    <h3 className="treatment-mobile-title">{t.title}</h3>
                  </div>
                  <div className="treatment-mobile-right">
                    <ChevronDown size={18} className="treatment-chevron" />
                  </div>
                </div>

                {/* Desktop & Mobile Expanded Body */}
                <div className="treatment-desktop-content">
                  <div className="treatment-img-wrap">
                    <img 
                      src={`images/${t.img}`} 
                      alt={t.title} 
                      className="treatment-card-img" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.style.background = 'linear-gradient(135deg, var(--primary), var(--accent))';
                      }} 
                    />
                    <span className="treatment-tag">{t.time}</span>
                  </div>
                  <div className="treatment-body">
                    <h3 className="treatment-h3">{t.title}</h3>
                    <p className="treatment-desc">{t.desc}</p>
                    <div className="treatment-footer" style={{ borderTop: 'none', paddingTop: '0' }}>
                      <button className="btn btn-outline" style={{ width: '100%' }} onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('services');
                      }}>
                        {language === 'en' ? 'View Details' : 'विवरण देखें'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="section-header">
          <span className="section-subtitle" style={{ color: 'var(--accent)' }}>{t.testimonialsSubtitle}</span>
          <h2 className="section-title" style={{ color: 'white' }}>{t.testimonialsTitle}</h2>
          <p className="section-desc" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{t.testimonialsDesc}</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((test, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" style={{ display: 'inline', marginRight: '4px' }} />
                ))}
              </div>
              <p className="testimonial-text">"{test.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{test.init}</div>
                <div className="author-info">
                  <h4>{test.name}</h4>
                  <p>{test.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
