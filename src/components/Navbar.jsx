import React from 'react';
import { Zap } from 'lucide-react';

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <a href="#hero" style={styles.logo}>
          <Zap color="#e11d48" size={24} /> 
          <span style={{ color: '#0f172a' }}>APEX</span> 
          <span style={{ color: '#e11d48' }}>GT</span>
        </a>
        
        <ul style={styles.navLinks}>
          <li><a href="#categories" style={styles.link}>Categories</a></li>
          <li><a href="#bestsellers" style={styles.link}>Best Sellers</a></li>
          <li><a href="#highlights" style={styles.link}>Specs</a></li>
          <li><a href="#about" style={styles.link}>About</a></li>
          <li><a href="#contact" style={styles.reserveBtn}>Reserve Now</a></li>
        </ul>
      </div>
    </nav>
  );
}

const styles = {
  navbar: { 
    position: 'fixed', 
    top: 0, 
    width: '100%', 
    padding: '16px 8%', 
    background: 'rgba(255, 255, 255, 0.92)', 
    backdropFilter: 'blur(12px)', 
    zIndex: 1000, 
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
  },
  container: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    maxWidth: '1200px', 
    margin: '0 auto',
    width: '100%'
  },
  logo: { 
    fontSize: '1.4rem', 
    fontWeight: '900', 
    textDecoration: 'none', 
    letterSpacing: '2px', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px' 
  },
  navLinks: { 
    display: 'flex', 
    listStyle: 'none', 
    gap: '28px', 
    alignItems: 'center',
    marginLeft: 'auto' 
  },
  link: { 
    color: '#334155', 
    textDecoration: 'none', 
    fontSize: '0.92rem', 
    fontWeight: '600',
    transition: 'color 0.3s ease' 
  },
  reserveBtn: { 
    background: '#e11d48', 
    color: '#ffffff', 
    padding: '10px 22px', 
    borderRadius: '8px', 
    textDecoration: 'none', 
    fontWeight: '700', 
    fontSize: '0.9rem',
    boxShadow: '0 4px 14px rgba(225, 29, 72, 0.3)',
    transition: 'transform 0.2s ease'
  }
};