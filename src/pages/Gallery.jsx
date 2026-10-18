import React, { useEffect, useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const galleryImages = [
  { url: 'https://i.pinimg.com/736x/c2/5e/3e/c25e3ed0e78633bad3f74dc574b74ffd.jpg', title: 'Aerodynamic Profile' },
  { url: 'https://i.pinimg.com/736x/bc/da/eb/bcdaeb070faa51ab0f0a84e9c1df0aea.jpg', title: 'Cockpit View' },
  { url: 'https://i.pinimg.com/736x/f2/36/9e/f2369e4621cfa24486234529ec1c2041.jpg', title: 'Track Edition' },
  { url: 'https://i.pinimg.com/736x/5b/90/3b/5b903b542f0195e7590ba8a80e34866c.jpg', title: 'Headlamp Detail' },
  { url: 'https://i.pinimg.com/736x/ec/a0/b0/eca0b0dbc30819fa0c33ee99a3c75f6f.jpg', title: 'Rear Diffuser' },
  { url: 'https://i.pinimg.com/736x/42/49/e3/4249e376e5aa60783c4d6bbbe3f43a51.jpg', title: 'Dynamic Speed Run' }
];

export default function Gallery() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeImage, setActiveImage] = useState(null);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <span style={styles.badge}>VISUAL ARCHIVE</span>
        <h1 style={styles.title}>The APEX Gallery</h1>
        <p style={styles.description}>Explore high-resolution angles, lighting details, and carbon composite builds of the APEX GT.</p>
        
        <div style={styles.grid}>
          {galleryImages.map((img, index) => (
            <div key={index} style={styles.card} onClick={() => setActiveImage(img)}>
              <img src={img.url} alt={img.title} style={styles.image} />
              <div style={styles.overlay}>
                <ZoomIn style={styles.zoomIcon} />
                <span style={styles.imgTitle}>{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div style={styles.modalBackdrop} onClick={() => setActiveImage(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setActiveImage(null)}>
              <X style={{width: '24px', height: '24px'}} />
            </button>
            <img src={activeImage.url} alt={activeImage.title} style={styles.modalImg} />
            <h3 style={styles.modalTitle}>{activeImage.title}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { padding: '160px 8% 100px 8%', background: '#050505', minHeight: '100vh', color: '#ffffff' },
  container: { maxWidth: '1200px', margin: '0 auto', textAlign: 'center' },
  badge: { display: 'inline-block', padding: '6px 14px', background: 'rgba(225, 29, 72, 0.15)', border: '1px solid rgba(225, 29, 72, 0.4)', borderRadius: '20px', color: '#fb7185', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', marginBottom: '16px' },
  title: { fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '800', letterSpacing: '2px', marginBottom: '20px' },
  description: { fontSize: '1.15rem', color: '#9ca3af', maxWidth: '650px', margin: '0 auto 60px auto', lineHeight: 1.7 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', textAlign: 'left' },
  card: { position: 'relative', height: '260px', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255, 255, 255, 0.08)', background: '#121212' },
  image: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' },
  overlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', gap: '10px' },
  zoomIcon: { color: '#ffffff', width: '32px', height: '32px' },
  imgTitle: { color: '#ffffff', fontSize: '16px', fontWeight: '600', letterSpacing: '1px' },
  modalBackdrop: { position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' },
  modalContent: { position: 'relative', maxWidth: '900px', width: '100%', textAlign: 'center' },
  closeBtn: { position: 'absolute', top: '-45px', right: '0', background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' },
  modalImg: { width: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' },
  modalTitle: { marginTop: '16px', fontSize: '1.25rem', fontWeight: '600', color: '#ffffff', letterSpacing: '1px' }
};