import React, { useEffect, useState } from 'react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <span style={styles.badge}>GET IN TOUCH</span>
        <h1 style={styles.title}>Book a Private Test Drive</h1>
        <p style={styles.description}>Connect with our concierge team to schedule an exclusive viewing or request custom vehicle specifications.</p>
        
        <div style={styles.contentGrid}>
          <div style={styles.infoCol}>
            <div style={styles.showroomImageWrapper}>
              <img 
                src="/images/showroom.jpg" 
                alt="Apex Showroom" 
                style={styles.showroomImg}
                onError={(e) => { e.target.src = 'https://i.pinimg.com/736x/f2/36/9e/f2369e4621cfa24486234529ec1c2041.jpg'; }}
              />
            </div>
            <div style={styles.infoItem}>
              <MapPin style={styles.contactIcon} />
              <div>
                <h4 style={styles.infoTitle}>Tamil Nadu</h4>
                <p style={styles.infoText}>Chennai, Tamil Nadu,600001</p>
              </div>
            </div>
            <div style={styles.infoItem}>
              <Mail style={styles.contactIcon} />
              <div>
                <h4 style={styles.infoTitle}>Direct Inquiry</h4>
                <p style={styles.infoText}>vignesh123@gmail.com</p>
              </div>
            </div>
            <div style={styles.infoItem}>
              <Phone style={styles.contactIcon} />
              <div>
                <h4 style={styles.infoTitle}>Contact Us</h4>
                <p style={styles.infoText}>+91 7305195172</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={styles.formCol}>
            {submitted ? (
              <div style={styles.successMessage}>
                <h3>Request Received</h3>
                <p>Our concierge team will contact you within 2 hours.</p>
              </div>
            ) : (
              <>
                <div style={styles.inputGroup}>
                  <input type="text" placeholder="Full Name" required style={styles.input} />
                  <input type="email" placeholder="Email Address" required style={styles.input} />
                </div>
                <input type="text" placeholder="Phone Number" style={styles.inputFull} />
                <textarea placeholder="Your Message or Preferred Test Drive Date" rows="5" required style={styles.textarea}></textarea>
                <button type="submit" style={styles.submitButton}>
                  <span>Send Request</span>
                  <Send style={{ width: '16px', height: '16px' }} />
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: '160px 8% 100px 8%', background: '#050505', minHeight: '100vh', color: '#ffffff' },
  container: { maxWidth: '1100px', margin: '0 auto', textAlign: 'center' },
  badge: { display: 'inline-block', padding: '6px 14px', background: 'rgba(225, 29, 72, 0.15)', border: '1px solid rgba(225, 29, 72, 0.4)', borderRadius: '20px', color: '#fb7185', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', marginBottom: '16px' },
  title: { fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '800', letterSpacing: '2px', marginBottom: '20px' },
  description: { fontSize: '1.15rem', color: '#9ca3af', maxWidth: '650px', margin: '0 auto 50px auto', lineHeight: 1.7 },
  contentGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', textAlign: 'left' },
  infoCol: { display: 'flex', flexDirection: 'column', gap: '24px' },
  showroomImageWrapper: { width: '100%', height: '200px', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' },
  showroomImg: { width: '100%', height: '100%', objectFit: 'cover' },
  infoItem: { display: 'flex', gap: '20px', alignItems: 'flex-start' },
  contactIcon: { width: '24px', height: '24px', color: '#e11d48', marginTop: '2px' },
  infoTitle: { fontSize: '1rem', fontWeight: '600', color: '#ffffff', marginBottom: '4px' },
  infoText: { fontSize: '0.95rem', color: '#9ca3af' },
  formCol: { background: 'rgba(12, 12, 12, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '36px', backdropFilter: 'blur(10px)', alignSelf: 'start' },
  inputGroup: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' },
  input: { width: '100%', padding: '14px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none' },
  inputFull: { width: '100%', padding: '14px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none', marginBottom: '16px' },
  textarea: { width: '100%', padding: '14px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none', resize: 'none', marginBottom: '20px' },
  submitButton: { width: '100%', background: 'linear-gradient(135deg, #e11d48 0%, #9f1239 100%)', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 4px 20px rgba(225, 29, 72, 0.4)' },
  successMessage: { textAlign: 'center', padding: '40px 0', color: '#ffffff' }
};