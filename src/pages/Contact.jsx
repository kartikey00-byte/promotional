import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { translations } from '../utils/translations';

export default function Contact({ language }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const t = translations[language].contact;
  const navT = translations[language].navbar;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send query payload to the backend server (uses environment variable with fallback to local development server)
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setSubmitted(true);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setSubmitted(false);
    setSubmitStatus(null);
  };

  return (
    <div className="section">
      <div className="section-header">
        <span className="section-subtitle">{t.subtitle}</span>
        <h2 className="section-title">{t.title}</h2>
        <p className="section-desc">{t.desc}</p>
      </div>

      <div className="contact-layout">
        {/* Info Column */}
        <div className="contact-info-panel">
          <div className="contact-card-box">
            <div className="contact-box-icon">
              <MapPin size={24} />
            </div>
            <div className="contact-box-details">
              <h4>{t.locationTitle}</h4>
              <p style={{ fontWeight: 600 }}>{navT.title}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '4px' }}>{navT.subtitle}</p>
              <p style={{ color: 'var(--text-muted)' }}>
                {language === 'en' 
                  ? 'Pushkar Mandir Road, Adarsh Gram, Rishikesh, Uttarakhand - 249201' 
                  : 'पुष्कर मंदिर रोड, आदर्श ग्राम, ऋषिकेश, उत्तराखंड - 249201'}
              </p>
            </div>
          </div>

          <div className="contact-card-box">
            <div className="contact-box-icon">
              <Phone size={24} />
            </div>
            <div className="contact-box-details">
              <h4>{t.phoneTitle}</h4>
              <p>Primary: +91 98885 32256</p>
            </div>
          </div>

          <div className="contact-card-box">
            <div className="contact-box-icon">
              <Mail size={24} />
            </div>
            <div className="contact-box-details">
              <h4>{t.emailTitle}</h4>
              <p>dr.harshmamgain@gmail.com</p>
            </div>
          </div>

          <div className="contact-card-box">
            <div className="contact-box-icon">
              <Clock size={24} />
            </div>
            <div className="contact-box-details">
              <h4>{t.hoursTitle}</h4>
              <p>{t.hoursWeek}</p>
              <p>{t.hoursWeekend}</p>
            </div>
          </div>

          {/* Interactive Google Map Iframe */}
          <div className="map-container">
            <iframe
              title="Chandrabadni Ayurveda Clinic Evam Panchkarm centre Map"
              src="https://maps.google.com/maps?q=Chandrabadni%20Ayurveda%20Clinic%20Evam%20Panchkarm%20centre%20Pushkar%20Mandir%20Road%2C%20Adarsh%20Gram%2C%20Rishikesh%2C%20Uttarakhand%20249201&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Form Column */}
        <div className="contact-form-panel">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div className="modal-toast" style={{ justifyContent: 'center', marginBottom: '24px', background: '#e8f5e9', border: '1px solid #c8e6c9', color: '#2e7d32' }}>
                <CheckCircle size={28} style={{ marginRight: '8px' }} />
                <span>{t.successTitle}</span>
              </div>
              <h4 style={{ fontSize: '1.45rem', marginBottom: '12px' }}>{t.successGreeting}, {formData.name}</h4>
              <p style={{ marginBottom: '24px', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                {t.successSub} <strong>"{formData.subject}"</strong> {t.successEnd}
              </p>
              
              <div style={{ background: 'var(--primary-bg)', padding: '24px', borderRadius: 'var(--border-radius-md)', border: '1px dashed var(--primary)', marginBottom: '30px', textAlign: 'center' }}>
                <h5 style={{ fontSize: '1.05rem', marginBottom: '8px', color: 'var(--primary-dark)', fontWeight: 700 }}>{t.instantHeading}</h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{t.instantDesc}</p>
                <a 
                  href={`https://wa.me/919888532256?text=${encodeURIComponent(`Namaste Dr. Harsh Mani Mamgain, I have a query from your website:\n\n*Name*: ${formData.name}\n*Phone*: ${formData.phone}\n*Email*: ${formData.email}\n*Subject*: ${formData.subject}\n*Message*: ${formData.message}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-accent"
                  style={{ width: '100%', display: 'inline-flex', gap: '8px', color: 'var(--primary-dark)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  {t.btnWhatsApp}
                </a>
              </div>

              <button className="btn btn-outline" style={{ width: '100%' }} onClick={handleReset}>
                {t.btnReset}
              </button>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '24px' }}>{t.formHeading}</h3>
              
              {submitStatus === 'error' && (
                <div className="modal-toast" style={{ marginBottom: '24px', background: '#ffebee', border: '1px solid #ffcdd2', color: '#c62828' }}>
                  <span>{t.errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">{t.labelName}</label>
                  <input
                    type="text"
                    id="contact-name"
                    className="form-input"
                    placeholder={t.placeholderName}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">{t.labelEmail}</label>
                    <input
                      type="email"
                      id="contact-email"
                      className="form-input"
                      placeholder={t.placeholderEmail}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-phone">{t.labelPhone}</label>
                    <input
                      type="tel"
                      id="contact-phone"
                      className="form-input"
                      placeholder={t.placeholderPhone}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">{t.labelSubject}</label>
                  <input
                    type="text"
                    id="contact-subject"
                    className="form-input"
                    placeholder={t.placeholderSubject}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">{t.labelMessage}</label>
                  <textarea
                    id="contact-message"
                    className="form-textarea"
                    placeholder={t.placeholderMessage}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span>{t.btnSending}</span>
                  ) : (
                    <>
                      <Send size={16} style={{ marginRight: '8px' }} />
                      {t.btnSend}
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
