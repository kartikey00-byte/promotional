import React, { useState } from 'react';
import { Clock, Sparkles, Brain, Leaf, Activity, Heart, ChevronDown } from 'lucide-react';
import { translations } from '../utils/translations';

export default function Services({ onNavigate, language }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const t = translations[language].services;
  const listT = translations[language].treatmentsList;

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

  const baseTreatments = [
    { id: 'shirodhara-stress', category: 'stress', img: 'shirodhara.jpg' },
    { id: 'nasya-stress', category: 'stress', img: 'nasya.jpg' },
    { id: 'abhyanga', category: 'rejuvenation', img: 'abhyanga.jpg' },
    { id: 'swedana', category: 'rejuvenation', img: 'swedana.jpg' },
    { id: 'vaman', category: 'detox', img: 'panchkarma.jpg' },
    { id: 'virechana', category: 'detox', img: 'panchkarma.jpg' },
    { id: 'basti', category: 'detox', img: 'basti.jpg' },
    { id: 'nasya-detox', category: 'detox', img: 'nasya.jpg' },
    { id: 'raktamokshana-detox', category: 'detox', img: 'raktamokshana.jpg' },
    { id: 'griva-basti', category: 'pain', img: 'grivabasti.jpg' },
    { id: 'kati-basti', category: 'pain', img: 'katibasti.jpg' },
    { id: 'kati-dhara', category: 'pain', img: 'katidhara.jpg' },
    { id: 'janu-basti-pain', category: 'pain', img: 'janubasti.jpg' },
    { id: 'janu-dhara', category: 'pain', img: 'janudhara.jpg' },
    { id: 'shirodhara-migraine', category: 'pain', img: 'shirodhara.jpg' },
    { id: 'pristha-basti', category: 'pain', img: 'katibasti.jpg' },
    { id: 'pristha-dhara', category: 'pain', img: 'katidhara.jpg' },
    { id: 'raktamokshana-pain', category: 'pain', img: 'leechtherapy.jpg' },
    { id: 'consultation', category: 'all', img: 'consultation.jpg' }
  ];

  const treatments = baseTreatments.map(item => ({
    ...item,
    title: listT[item.id].title,
    categoryLabel: listT[item.id].categoryLabel,
    duration: listT[item.id].duration,
    desc: listT[item.id].desc,
    benefits: listT[item.id].benefits
  }));

  const filteredTreatments = activeFilter === 'all' 
    ? treatments 
    : treatments.filter(item => item.category === activeFilter);

  return (
    <div className="section">
      <div className="section-header">
        <span className="section-subtitle">{t.subtitle}</span>
        <h2 className="section-title">{t.title}</h2>
        <p className="section-desc">{t.desc}</p>
      </div>

      {/* Filter Buttons */}
      <div className="treatment-filters">
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          {t.filterAll}
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'detox' ? 'active' : ''}`}
          onClick={() => setActiveFilter('detox')}
        >
          {t.filterDetox}
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'stress' ? 'active' : ''}`}
          onClick={() => setActiveFilter('stress')}
        >
          {t.filterStress}
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'pain' ? 'active' : ''}`}
          onClick={() => setActiveFilter('pain')}
        >
          {t.filterPain}
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'rejuvenation' ? 'active' : ''}`}
          onClick={() => setActiveFilter('rejuvenation')}
        >
          {t.filterRejuvenation}
        </button>
      </div>

      {/* Treatments Grid */}
      <div className="treatments-grid">
        {filteredTreatments.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div 
              key={item.id} 
              className={`treatment-card ${isExpanded ? 'is-expanded' : ''}`}
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
            >
              {/* Mobile View Header: Only visible on mobile viewports */}
              <div className="treatment-mobile-header">
                <div className="treatment-mobile-left">
                  <div className="treatment-mobile-icon-box">
                    {getTreatmentIcon(item.category)}
                  </div>
                  <h3 className="treatment-mobile-title">{item.title}</h3>
                </div>
                <div className="treatment-mobile-right">
                  <ChevronDown size={18} className="treatment-chevron" />
                </div>
              </div>

              {/* Desktop & Mobile Expanded Body */}
              <div className="treatment-desktop-content">
                <div className="treatment-img-wrap">
                  <img 
                    src={`images/${item.img}`} 
                    alt={item.title} 
                    className="treatment-card-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.style.background = 'linear-gradient(135deg, var(--primary), var(--accent))';
                    }}
                  />
                  <span className="treatment-tag">{item.categoryLabel}</span>
                </div>

                <div className="treatment-body">
                  <div className="treatment-meta">
                    <span>
                      <Clock size={16} />
                      {item.duration}
                    </span>
                  </div>

                  <h3 className="treatment-h3">{item.title}</h3>
                  <p className="treatment-desc">{item.desc}</p>

                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--primary-dark)', fontFamily: 'var(--font-body)', fontWeight: 700 }}>{t.keyBenefits}</h4>
                    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                      {item.benefits.map((b, i) => (
                        <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <Sparkles size={12} style={{ color: 'var(--accent-dark)' }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* consultation cta banner */}
      <div className="consultation-banner">
        <h3 className="consultation-banner-h3">{t.unsureSubtitle}</h3>
        <p className="consultation-banner-p">{t.unsureDesc}</p>
        <button className="btn btn-primary" onClick={() => onNavigate('contact')}>
          {t.enquireBtn}
        </button>
      </div>
    </div>
  );
}
