import React, { useState } from 'react';
import { Leaf, Send } from 'lucide-react';
import { translations } from '../utils/translations';

export default function Footer({ setCurrentPage, language }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const t = translations[language].footer;
  const navT = translations[language].navbar;

  const handleNavClick = (id) => {
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="footer-wrap">
      <div className="footer-top">
        {/* Col 1: Logo & Summary */}
        <div className="footer-col">
          <div className="footer-logo">
            <Leaf size={24} fill="currentColor" />
            <span>{navT.title}</span>
          </div>
          <p className="footer-logo-desc">{t.desc}</p>
        </div>

        {/* Col 2: Quick Links */}
        <div className="footer-col">
          <h4>{t.quickLinks}</h4>
          <ul className="footer-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>{navT.home}</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>{navT.about}</a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>{navT.treatments}</a></li>
            <li><a href="#gallery" onClick={(e) => { e.preventDefault(); handleNavClick('gallery'); }}>{navT.gallery}</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>{navT.contact}</a></li>
          </ul>
        </div>

        {/* Col 3: Treatments */}
        <div className="footer-col">
          <h4>{t.treatments}</h4>
          <ul className="footer-links">
            <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>
              {language === 'en' ? 'Abhyanga Massage' : 'अभ्यंग मालिश'}
            </a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>
              {language === 'en' ? 'Shirodhara Therapy' : 'शिरोधारा चिकित्सा'}
            </a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>
              {language === 'en' ? 'Panchkarma Detox' : 'पंचकर्म डिटॉक्स'}
            </a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>
              {language === 'en' ? 'Nasya Upper Cleanse' : 'नस्य शोधन'}
            </a></li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className="footer-col">
          <h4>{t.newsletter}</h4>
          <p className="footer-logo-desc" style={{ marginBottom: '16px' }}>{t.newsletterDesc}</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              className="newsletter-input"
              placeholder={t.placeholderEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-accent" style={{ padding: '10px' }}>
              {subscribed ? (
                <span>{t.successMsg}</span>
              ) : (
                <>
                  <Send size={16} style={{ marginRight: '8px' }} />
                  {t.btnSubscribe}
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {navT.title}. {t.copyright}</p>
        <p style={{ display: 'flex', gap: '20px' }}>
          <a href="#privacy" onClick={(e) => e.preventDefault()}>
            {language === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}
          </a>
          <a href="#terms" onClick={(e) => e.preventDefault()}>
            {language === 'en' ? 'Terms of Service' : 'सेवा की शर्तें'}
          </a>
        </p>
      </div>
    </footer>
  );
}
