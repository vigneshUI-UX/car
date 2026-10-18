import React, { useEffect } from 'react';
import { Shield, Award, Compass } from 'lucide-react';

export default function About() {
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div style={styles.page} className="animate-fade-in">
      <div style={styles.container} className="animate-slide-up">
        <span style={styles.badge}>THE APEX LEGACY</span>
        <h1 style={styles.title}>Crafted Without Compromise</h1>
        <p style={styles.description}>
          Born from a passion for track-level engineering and futuristic aesthetics, APEX GT redefines the boundaries of electric performance. Every vehicle is hand-assembled using aerospace-grade carbon composite materials.
        </p>

        {/* Custom Image Integration */}
        <div style={styles.imageWrapper}>
          <img 
            src="/images/about-hero.jpg" 
            alt="Apex GT Manufacturing Studio" 
            style={styles.heroImage}
            onError={(e) => { e.target.src = 'https://i.pinimg.com/736x/e3/e0/30/e3e03044add81bbe255f389286f326e7.jpg'; }} 
          />
        </div>
        
        <div style={styles.grid}>
          <div style={styles.card}>
            <Shield style={styles.icon} />
            <h3 style={styles.cardTitle}>Maximum Safety</h3>
            <p style={styles.cardDesc}>Reinforced titanium roll cage with ultra-responsive collision predictive AI.</p>
          </div>
          <div style={styles.card}>
            <Award style={styles.icon} />
            <h3 style={styles.cardTitle}>Award Winning Design</h3>
            <p style={styles.cardDesc}>Recognized globally for its revolutionary low-drag cinematic chassis architecture.</p>
          </div>
          <div style={styles.card}>
            <Compass style={styles.icon} />
            <h3 style={styles.cardTitle}>Precision Handling</h3>
            <p style={styles.cardDesc}>Dynamic quad-motor torque vectoring for razor-sharp cornering control.</p>
          </div>
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
  description: { fontSize: '1.15rem', color: '#9ca3af', maxWidth: '750px', margin: '0 auto 40px auto', lineHeight: 1.7 },
  imageWrapper: { width: '100%', height: '450px', borderRadius: '16px', overflow: 'hidden', marginBottom: '60px', border: '1px solid rgba(255, 255, 255, 0.1)' },
  heroImage: { width: '100%', height: '100%', objectFit: 'cover' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', textAlign: 'left' },
  card: { background: 'rgba(15, 15, 15, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '32px', backdropFilter: 'blur(10px)' },
  icon: { width: '36px', height: '36px', color: '#e11d48', marginBottom: '20px' },
  cardTitle: { fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', marginBottom: '12px' },
  cardDesc: { fontSize: '0.95rem', color: '#9ca3af', lineHeight: 1.6 }
};