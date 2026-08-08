import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, selectedTreatment = '' }) {
  const [formData, setFormData] = useState({
    treatment: selectedTreatment || 'consultation',
    date: '',
    time: 'morning',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    if (selectedTreatment) {
      setFormData((prev) => ({ ...prev, treatment: selectedTreatment }));
    }
  }, [selectedTreatment]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setFormData({
      treatment: 'consultation',
      date: '',
      time: 'morning',
      name: '',
      email: '',
      phone: '',
      notes: '',
    });
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleReset}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isSubmitted ? 'Appointment Requested' : 'Book a Consultation'}</h3>
          <button className="modal-close-btn" onClick={handleReset} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div className="modal-toast" style={{ justifyContent: 'center' }}>
                <CheckCircle size={28} />
                <span>Appointment Request Sent Successfully!</span>
              </div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Namaste, {formData.name}</h4>
              <p style={{ marginBottom: '24px', fontSize: '0.95rem' }}>
                We have received your request for <strong>{
                  formData.treatment === 'abhyanga' ? 'Abhyanga Full Body Massage' :
                  formData.treatment === 'shirodhara' ? 'Shirodhara Oil Therapy' :
                  formData.treatment === 'panchkarma' ? 'Panchkarma Complete Detox' :
                  formData.treatment === 'nasya' ? 'Nasya Nose Therapy' :
                  'General Ayurvedic Consultation'
                }</strong> on <strong>{formData.date}</strong> ({formData.time === 'morning' ? 'Morning 9-11 AM' : formData.time === 'afternoon' ? 'Afternoon 12-2 PM' : formData.time === 'late' ? 'Late Afternoon 3-5 PM' : 'Evening 5-7 PM'}).
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '30px' }}>
                Dr. Harsh Mani Mamgain will contact you at <strong>{formData.phone}</strong> or <strong>{formData.email}</strong> within 2 hours to confirm your final slot and provide pre-treatment guidelines.
              </p>
              <button className="btn btn-primary" onClick={handleReset}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="modal-treatment">Select Treatment / Service</label>
                <select
                  id="modal-treatment"
                  className="form-select"
                  value={formData.treatment}
                  onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                  required
                >
                  <option value="consultation">Ayurvedic Consultation & Diagnosis</option>
                  <option value="abhyanga">Abhyanga Full Body Massage (Rejuvenation)</option>
                  <option value="shirodhara">Shirodhara Warm Oil Therapy (Stress Relief)</option>
                  <option value="panchkarma">Panchkarma Complete Detoxification</option>
                  <option value="nasya">Nasya Sinus & Head Cleanse Therapy</option>
                </select>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="modal-date">Preferred Date</label>
                  <input
                    type="date"
                    id="modal-date"
                    className="form-input"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="modal-time">Preferred Time Slot</label>
                  <select
                    id="modal-time"
                    className="form-select"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  >
                    <option value="morning">Morning (9:00 AM - 11:00 AM)</option>
                    <option value="afternoon">Afternoon (12:00 PM - 2:00 PM)</option>
                    <option value="late">Late Afternoon (3:00 PM - 5:00 PM)</option>
                    <option value="evening">Evening (5:00 PM - 7:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="modal-name">Full Name</label>
                <input
                  type="text"
                  id="modal-name"
                  className="form-input"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="modal-email">Email Address</label>
                  <input
                    type="email"
                    id="modal-email"
                    className="form-input"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="modal-phone">Phone Number</label>
                  <input
                    type="tel"
                    id="modal-phone"
                    className="form-input"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="modal-notes">Health Goal / Symptoms / Special Requests</label>
                <textarea
                  id="modal-notes"
                  className="form-textarea"
                  placeholder="Let us know any health issues, pain areas, or questions you have."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                <Calendar size={18} style={{ marginRight: '8px' }} />
                Submit Consultation Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
