import React, { useState } from 'react';
import { Leaf, Menu, X, Globe } from 'lucide-react';
import { translations } from '../utils/translations';

export default function Navbar({ currentPage, setCurrentPage, language, setLanguage }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = translations[language].navbar;

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'about', label: t.about },
    { id: 'services', label: t.treatments },
    { id: 'gallery', label: t.gallery },
    { id: 'contact', label: t.contact },
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar">
        <a href="#home" className="nav-logo" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
          <Leaf size={28} fill="currentColor" />
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <span style={{ fontSize: 'clamp(0.85rem, 2vw, 1.15rem)', lineHeight: 1.2 }}>{t.title}</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.subtitle}</span>
          </div>
        </a>

        {/* Desktop Menu & Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <ul className="nav-menu-desktop">
            {navItems.filter(item => item.id !== 'contact').map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              className="language-toggle-btn" 
              onClick={handleToggleLanguage}
              title="Change Language / भाषा बदलें"
            >
              <Globe size={16} />
              <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            <div className="nav-cta">
              <button className="btn btn-primary" onClick={() => handleNavClick('contact')}>
                {t.contact}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation menu">
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <ul className={`nav-menu-mobile ${mobileOpen ? 'mobile-open' : ''}`}>
        {navItems.filter(item => item.id !== 'contact').map((item) => (
          <li key={item.id} style={{ width: '100%', textAlign: 'center' }}>
            <a
              href={`#${item.id}`}
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              style={{ fontSize: '1.2rem', display: 'block', padding: '12px 0' }}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
        
        <li style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '20px' }}>
          <button className="btn btn-primary" style={{ width: '80%' }} onClick={() => { handleNavClick('contact'); }}>
            {t.contact}
          </button>
          
          <button 
            className="language-toggle-btn mobile-lang-toggle" 
            onClick={() => {
              handleToggleLanguage();
              setMobileOpen(false);
            }}
          >
            <Globe size={18} />
            <span>{language === 'en' ? 'हिन्दी (Hindi)' : 'English (EN)'}</span>
          </button>
        </li>
      </ul>
    </header>
  );
}
