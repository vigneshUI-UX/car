import React, { useEffect } from 'react';
import { Zap, Wrench, Headphones, Key } from 'lucide-react';

export default function Services() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const services = [
    { icon: <Key />, title: "Bespoke Customization", desc: "Tailor exterior paint finishes, custom carbon fiber trims, and luxury interior layouts." },
    { icon: <Zap />, title: "Supercharger Access", desc: "Lifetime unlimited access to worldwide ultra-fast 450kW APEX charging networks." },
    { icon: <Wrench />, title: "Concierge Maintenance", desc: "White-glove mobile servicing where technicians come directly to your home or office." },
    { icon: <Headphones />, title: "24/7 Driver Support", desc: "Dedicated telemetry and remote performance optimization assistance." }
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <span style={styles.badge}>OWNERSHIP SERVICES</span>
        <h1 style={styles.title}>The APEX Experience</h1>
        <p style={styles.description}>We provide full ownership support designed to match the extraordinary performance of our vehicles.</p>

        {/* Feature showcase image */}
        <div style={styles.bannerGrid}>
          <div style={styles.bannerText}>
            <h2>Unmatched Support Network</h2>
            <p>From private delivery slots to global telemetry assistance, our team ensures your GT vehicle performs at its peak condition year-round.</p>
          </div>
          <div style={styles.bannerImageWrapper}>
            <img 
              src="/images/service-1.jpg" 
              alt="Apex Service Center" 
              style={styles.bannerImg}
              onError={(e) => { e.target.src = 'https://i.pinimg.com/736x/55/4b/2d/554b2d0b4b20a240ea19f97daa0e8e04.jpg'; }}
            />
          </div>
        </div>
        
        <div style={styles.grid}>
          {services.map((s, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.iconBox}>{s.icon}</div>
              <h3 style={styles.cardTitle}>{s.title}</h3>
              <p style={styles.cardDesc}>{s.desc}</p>
            </div>
          ))}
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
  bannerGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center', background: 'rgba(12, 12, 12, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '40px', marginBottom: '60px', textAlign: 'left' },
  bannerText: { display: 'flex', flexDirection: 'column', gap: '15px' },
  bannerImageWrapper: { width: '100%', height: '280px', borderRadius: '10px', overflow: 'hidden' },
  bannerImg: { width: '100%', height: '100%', objectFit: 'cover' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', textAlign: 'left' },
  card: { background: 'rgba(12, 12, 12, 0.8)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', padding: '28px' },
  iconBox: { width: '48px', height: '48px', background: 'rgba(225, 29, 72, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e11d48', marginBottom: '20px' },
  cardTitle: { fontSize: '1.15rem', fontWeight: '700', color: '#ffffff', marginBottom: '10px' },
  cardDesc: { fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.6 }
};