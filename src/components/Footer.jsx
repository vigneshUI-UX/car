import React from 'react';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.brandCol}>
          <a href="#hero" style={styles.logo}>
            <Zap color="#e11d48" size={22} /> 
            <span style={{ color: '#ffffff' }}>APEX</span> 
            <span style={{ color: '#e11d48' }}>GT</span>
          </a>
          <p style={styles.brandDesc}>
            1,450 HP Quad-Motor Electric Hypercar. Engineered for extreme track performance.
          </p>
        </div>

        <div style={styles.linksCol}>
          <h4 style={styles.heading}>Navigation</h4>
          <a href="#categories" style={styles.link}>Catalogue</a>
          <a href="#highlights" style={styles.link}>Telemetry Specs</a>
          <a href="#offers" style={styles.link}>VIP Access</a>
        </div>

        <div style={styles.linksCol}>
          <h4 style={styles.heading}>Legal & Support</h4>
          <a href="#privacy" style={styles.link}>Privacy Policy</a>
          <a href="#terms" style={styles.link}>Terms of Service</a>
          <a href="#contact" style={styles.link}>Concierge Desk</a>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <p>© 2026 APEX GT Technologies Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: { 
    padding: '60px 8% 30px 8%', 
    background: '#030303', 
    borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
    color: '#9ca3af', 
    fontSize: '0.9rem' 
  },
  container: { 
    maxWidth: '1100px', 
    margin: '0 auto', 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
    gap: '40px',
    marginBottom: '40px'
  },
  brandCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  brandDesc: {
    color: '#6b7280',
    fontSize: '0.88rem',
    lineHeight: 1.6
  },
  logo: { 
    fontSize: '1.3rem', 
    fontWeight: '900', 
    textDecoration: 'none', 
    letterSpacing: '2px', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px' 
  },
  linksCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  heading: {
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: '700',
    marginBottom: '6px'
  },
  link: { 
    color: '#9ca3af', 
    textDecoration: 'none', 
    fontSize: '0.88rem',
    transition: 'color 0.3s ease' 
  },
  bottomBar: {
    maxWidth: '1100px',
    margin: '0 auto',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    textAlign: 'center',
    color: '#4b5563',
    fontSize: '0.82rem'
  }
};