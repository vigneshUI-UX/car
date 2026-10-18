import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.topRow}>
          <div style={styles.brandCol}>
            <div style={styles.logoContainer}>
              <Zap style={styles.logoIcon} />
              <span style={styles.logoText}>CARS <span style={styles.accent}>BMW</span></span>
            </div>
            <p style={styles.brandDesc}>
              Engineering the absolute pinnacle of cinematic electric performance and futuristic design.
            </p>
          </div>

          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Navigation</h4>
            <Link to="/" style={styles.link}>Overview</Link>
            <Link to="/about" style={styles.link}>About</Link>
            <Link to="/services" style={styles.link}>Services</Link>
            <Link to="/gallery" style={styles.link}>Gallery</Link>
            <Link to="/contact" style={styles.link}>Contact</Link>
          </div>

          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Legal & Privacy</h4>
            <a href="#privacy" style={styles.link}>Privacy Policy</a>
            <a href="#terms" style={styles.link}>Terms of Service</a>
            <a href="#cookies" style={styles.link}>Cookie Settings</a>
          </div>

          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Connect</h4>
            <div style={styles.socialRow}>
              {/* Twitter / X SVG */}
              <a href="#twitter" style={styles.socialIcon} aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              {/* Instagram SVG */}
              <a href="#instagram" style={styles.socialIcon} aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              {/* YouTube SVG */}
              <a href="#youtube" style={styles.socialIcon} aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
              </a>
              {/* GitHub SVG */}
              <a href="#github" style={styles.socialIcon} aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
            </div>
          </div>
        </div>

        <div style={styles.bottomRow}>
          <p style={styles.copyright}>© {new Date().getFullYear()} APEX GT Technologies Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: '#200b76',
    borderTop: '1px solid rgba(255, 255, 255, 0.29)',
    padding: '80px 8% 40px 8%',
    color: '#a5a9b0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  topRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '40px',
    marginBottom: '60px',
  },
  brandCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    color: '#f43f5e',
    width: '24px',
    height: '24px',
  },
  logoText: {
    fontSize: '18px',
    fontWeight: '800',
    letterSpacing: '2px',
    color: '#ffffff',
  },
  accent: {
    color: '#f43f5e',
  },
  brandDesc: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: '#6b7280',
  },
  linksCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  colTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '8px',
    letterSpacing: '0.5px',
  },
  link: {
    color: '#9ca3af',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s',
  },
  socialRow: {
    display: 'flex',
    gap: '12px',
    marginTop: '4px',
  },
  socialIcon: {
    width: '36px',
    height: '36px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    transition: 'background 0.2s, border-color 0.2s',
  },
  bottomRow: {
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    paddingTop: '30px',
    textAlign: 'center',
  },
  copyright: {
    fontSize: '0.85rem',
    color: '#6b7280',
  }
};