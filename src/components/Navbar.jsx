import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logoContainer}>
        <Zap style={styles.logoIcon} />
        <span style={styles.logoText}>CARS <span style={styles.accent}>BMW</span></span>
      </Link>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Overview</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/services" style={styles.link}>Services</Link>
        <Link to="/gallery" style={styles.link}>Gallery</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
        <Link to="/contact" style={styles.ctaButton}>Configure</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 6%',
    background: 'rgba(32, 32, 102, 0.88)',
    backdropFilter: 'blur(16px)',
    zIndex: 1000,
    borderBottom: '1px solid rgba(244, 63, 94, 0.15)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none'
  },
  logoIcon: {
    color: '#f43f5e',
    width: '26px',
    height: '26px'
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '800',
    letterSpacing: '2px',
    color: '#ffffff'
  },
  accent: {
    color: '#f43f5e'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px'
  },
  
  link: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.5px',
    transition: 'color 0.2s'
  },

  ctaButton: {
    background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
    color: '#ffffff',
    textDecoration: 'none',
    padding: '10px 22px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '1px',
    boxShadow: '0 4px 20px rgba(244, 63, 94, 0.4)',
    transition: 'transform 0.2s'
  }
};