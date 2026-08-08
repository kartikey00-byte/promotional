import React from 'react';
import { translations } from '../utils/translations';

export default function Gallery({ language }) {
  const t = translations[language].gallery;

  const galleryItems = [
    { id: 1, img: "gallery-1.jpg", className: "wide" },
    { id: 2, img: "gallery-2.jpg", className: "tall" },
    { id: 3, img: "gallery-3.jpg", className: "" },
    { id: 4, img: "gallery-4.jpg", className: "" },
    { id: 5, img: "gallery-5.jpg", className: "wide" },
    { id: 6, img: "gallery-6.jpg", className: "tall" },
    { id: 7, img: "gallery-7.jpg", className: "" },
    { id: 8, img: "gallery-8.jpg", className: "" }
  ];

  const getLocalizedCaption = (id, field) => {
    const data = {
      en: {
        1: { title: "Tranquil Reception", category: "Our Center" },
        2: { title: "Shirodhara Oil Therapy Bed", category: "Therapy Setup" },
        3: { title: "Handmade Herbal Oils & Extracts", category: "Herbal Remedies" },
        4: { title: "Traditional Abhyanga Massage Room", category: "Therapy Room" },
        5: { title: "Serene Ganges View in Rishikesh", category: "Environment" },
        6: { title: "Fresh Herbs for Panchkarma", category: "Detox Preparation" },
        7: { title: "Ayurvedic Doctor Consultation", category: "Diagnostics" },
        8: { title: "Meditation and Yoga Deck", category: "Our Center" }
      },
      hi: {
        1: { title: "शांत स्वागत कक्ष", category: "हमारा केंद्र" },
        2: { title: "शिरोधारा तैल थेरेपी शय्या", category: "चिकित्सा व्यवस्था" },
        3: { title: "हस्तनिर्मित हर्बल तेल और अर्क", category: "हर्बल उपचार" },
        4: { title: "पारंपरिक अभ्यंग मालिश कक्ष", category: "चिकित्सा कक्ष" },
        5: { title: "ऋषिकेश में शांत गंगा नदी का दृश्य", category: "वातावरण" },
        6: { title: "पंचकर्म के लिए ताज़ा जड़ी-बूटियाँ", category: "डिटॉक्स तैयारी" },
        7: { title: "आयुर्वेदिक डॉक्टर परामर्श", category: "निदान" },
        8: { title: "ध्यान और योग डेक", category: "हमारा केंद्र" }
      }
    };
    return data[language]?.[id]?.[field] || "";
  };

  return (
    <div className="section">
      <div className="section-header">
        <span className="section-subtitle">{t.subtitle}</span>
        <h2 className="section-title">{t.title}</h2>
        <p className="section-desc">{t.desc}</p>
      </div>

      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <div key={item.id} className={`gallery-item ${item.className}`}>
            <img 
              src={`images/${item.img}`} 
              alt={getLocalizedCaption(item.id, 'title')} 
              className="gallery-img"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.style.background = 'linear-gradient(135deg, var(--primary-light), var(--accent-light))';
                e.target.parentNode.style.display = 'flex';
                e.target.parentNode.style.justifyContent = 'center';
                e.target.parentNode.style.alignItems = 'center';
              }}
            />
            <div className="gallery-overlay">
              <h3 className="gallery-overlay-h3">{getLocalizedCaption(item.id, 'title')}</h3>
              <p className="gallery-overlay-p">{getLocalizedCaption(item.id, 'category')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
