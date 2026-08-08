import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';

export default function LanguageModal({ setLanguage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Check if user already set language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (!savedLang) {
      setIsOpen(true);
    }
  }, []);

  const handleSelectLanguage = (lang) => {
    localStorage.setItem('preferredLanguage', lang);
    setIsFadingOut(true);
    // Smooth transition
    setTimeout(() => {
      setLanguage(lang);
      setIsOpen(false);
    }, 400); // match transition duration
  };

  if (!isOpen) return null;

  return (
    <div className={`language-modal-overlay ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="language-modal-card">
        <div className="language-modal-logo">
          <Leaf size={48} className="language-modal-leaf-icon" />
        </div>
        
        <h2 className="language-modal-heading">Namaste & Welcome</h2>
        <h3 className="language-modal-subheading">Chandrabadni Ayurved Evam Panchkarma Center</h3>
        
        <hr className="language-modal-divider" />
        
        <p className="language-modal-prompt-en">Please select your preferred language</p>
        <p className="language-modal-prompt-hi">कृपया अपनी पसंदीदा भाषा का चयन करें</p>
        
        <div className="language-modal-buttons">
          <button 
            className="btn btn-primary lang-btn-en" 
            onClick={() => handleSelectLanguage('en')}
          >
            English
          </button>
          
          <button 
            className="btn btn-accent lang-btn-hi" 
            onClick={() => handleSelectLanguage('hi')}
          >
            हिन्दी (Hindi)
          </button>
        </div>
      </div>
    </div>
  );
}
