import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Gauge, BatteryCharging, ArrowRight } from 'lucide-react';

const TOTAL_FRAMES = 240;

export default function Home() {
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Crimson Red');
  const imagesRef = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let loadedCount = 0;
    const loadedImages = new Array(TOTAL_FRAMES);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(4, '0');
      img.src = `/frames/frame-${paddedIndex}.jpg`;
      
      const handleLoad = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) setImagesLoaded(true);
      };

      img.onload = handleLoad;
      img.onerror = handleLoad;
      loadedImages[i - 1] = img;
    }
    imagesRef.current = loadedImages;
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const img = imagesRef.current[currentFrameIndex];
      
      if (img && img.complete) {
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
      }
    };

    render();
    window.addEventListener('resize', render);
    return () => window.removeEventListener('resize', render);
  }, [imagesLoaded, currentFrameIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = Math.max(0, Math.min(1, scrollTop / (maxScroll * 0.75)));
      const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(scrollFraction * TOTAL_FRAMES));
      setCurrentFrameIndex(frameIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={styles.wrapper}>
      {!imagesLoaded && (
        <div style={styles.loaderContainer}>
          <div style={styles.spinner}></div>
          <h2 style={styles.loadingText}>LOADING 360 EXPERIENCE... {loadingProgress}%</h2>
        </div>
      )}

      {/* 360 Scrubber Hero Section */}
      <div style={styles.stickyContainer}>
        <canvas ref={canvasRef} style={styles.canvas} />
        
        <div style={{ ...styles.heroContent, opacity: currentFrameIndex < 30 ? 1 : 0, pointerEvents: currentFrameIndex < 30 ? 'auto' : 'none' }}>
          <span style={styles.badge}>NEXT-GEN AERODYNAMICS</span>
          <h1 style={styles.title}>APEX GT</h1>
          <p style={styles.subtitle}>Uncompromising power. Pure cinematic design engineered for the ultimate driving thrill.</p>
          <div style={styles.scrollIndicator}>
            <span>Scroll to Rotate</span>
            <ChevronDown style={styles.bounceIcon} />
          </div>
        </div>

        <div style={{ ...styles.specBadge, opacity: currentFrameIndex >= 80 && currentFrameIndex <= 130 ? 1 : 0 }}>
          <Gauge style={styles.specIcon} />
          <div>
            <h4 style={styles.specTitle}>0 - 60 MPH</h4>
            <p style={styles.specValue}>1.98 SECONDS</p>
          </div>
        </div>

        <div style={{ ...styles.specBadgeRight, opacity: currentFrameIndex >= 160 && currentFrameIndex <= 210 ? 1 : 0 }}>
          <BatteryCharging style={styles.specIcon} />
          <div>
            <h4 style={styles.specTitle}>RANGE (WLTP)</h4>
            <p style={styles.specValue}>650+ MILES</p>
          </div>
        </div>
      </div>

      <div style={styles.scrollSpacer} />

      {/* Additional Home Content Sections */}
      <div style={styles.extraContentSection}>
        
        {/* Specs Overview Grid */}
        <div style={styles.container}>
          <span style={styles.sectionBadge}>PERFORMANCE METRICS</span>
          <h2 style={styles.sectionTitle}>Built for the Circuit & The Street</h2>
          <p style={styles.sectionDesc}>Unprecedented figures achieved through ultra-lightweight carbon fiber monocoque frames and quad-motor torque vectoring.</p>
          
          <div style={styles.metricsGrid}>
            <div style={styles.metricCard}>
              <h3 style={styles.metricValue}>1,450</h3>
              <p style={styles.metricLabel}>Horsepower (HP)</p>
            </div>
            <div style={styles.metricCard}>
              <h3 style={styles.metricValue}>245 MPH</h3>
              <p style={styles.metricLabel}>Top Speed</p>
            </div>
            <div style={styles.metricCard}>
              <h3 style={styles.metricValue}>0.19 Cd</h3>
              <p style={styles.metricLabel}>Drag Coefficient</p>
            </div>
            <div style={styles.metricCard}>
              <h3 style={styles.metricValue}>900V</h3>
              <p style={styles.metricLabel}>Architecture Charging</p>
            </div>
          </div>
        </div>

        {/* Home Gallery Preview Section */}
        <div style={styles.container}>
          <div style={styles.galleryHeaderRow}>
            <div>
              <span style={styles.sectionBadge}>SELECTED SHOTS</span>
              <h2 style={{...styles.sectionTitle, textAlign: 'left', marginBottom: '0'}}>Exterior & Interior Views</h2>
            </div>
            <Link to="/gallery" style={styles.viewAllBtn}>
              <span>View Full Gallery</span>
              <ArrowRight style={{width: '16px', height: '16px'}} />
            </Link>
          </div>

          <div style={styles.previewGrid}>
            <div style={styles.previewCard}>
              <img src="https://i.pinimg.com/736x/9e/11/64/9e11643b4dc4be4a7fa0190db779284f.jpg" alt="Apex Profile" style={styles.previewImg} />
            </div>
            <div style={styles.previewCard}>
              <img src="https://i.pinimg.com/1200x/78/50/94/785094e98dbdba725bedfbc183f00d47.jpg" alt="Cockpit" style={styles.previewImg} />
            </div>
            <div style={styles.previewCard}>
              <img src="https://i.pinimg.com/1200x/f0/5b/bd/f05bbde9bdffbf67bdf8e3f6770a1620.jpg" alt="Track view" style={styles.previewImg} />
            </div>
          </div>
        </div>

        {/* Exterior Color Configurator Preview */}
        <div style={styles.container}>
          <span style={styles.sectionBadge}>TAILORED AESTHETICS</span>
          <h2 style={styles.sectionTitle}>Choose Your Finish</h2>
          <p style={styles.sectionDesc}>Selected Finish: <strong style={{color: '#e11d48'}}>{selectedColor}</strong></p>
          
          <div style={styles.colorPickerRow}>
            {['Crimson Red', 'Obsidian Black', 'Lunar Silver', 'Electric Cobalt'].map((color) => (
              <button 
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  ...styles.colorButton,
                  borderColor: selectedColor === color ? '#e11d48' : 'rgba(255,255,255,0.2)'
                }}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  wrapper: { position: 'relative', width: '100%', background: '#050505', color: '#ffffff' },
  loaderContainer: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#050505', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 9999, gap: '20px' },
  spinner: { width: '50px', height: '50px', border: '3px solid rgba(225, 29, 72, 0.2)', borderTop: '3px solid #e11d48', borderRadius: '50%', animation: 'spin 1s linear infinite' },
  loadingText: { fontFamily: 'Outfit, sans-serif', fontSize: '14px', letterSpacing: '3px', color: '#9ca3af' },
  stickyContainer: { position: 'sticky', top: 0, width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000000' },
  canvas: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  heroContent: { position: 'absolute', top: '35%', left: '8%', maxWidth: '600px', transition: 'opacity 0.4s ease-in-out' },
  badge: { display: 'inline-block', padding: '6px 14px', background: 'rgba(225, 29, 72, 0.15)', border: '1px solid rgba(225, 29, 72, 0.4)', borderRadius: '20px', color: '#fb7185', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', marginBottom: '16px' },
  title: { fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: '800', color: '#ffffff', letterSpacing: '4px', lineHeight: 1.1, marginBottom: '20px' },
  subtitle: { fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: '#9ca3af', lineHeight: 1.6, marginBottom: '32px' },
  scrollIndicator: { display: 'flex', alignItems: 'center', gap: '10px', color: '#6b7280', fontSize: '13px', letterSpacing: '1px' },
  bounceIcon: { width: '18px', height: '18px', animation: 'bounce 2s infinite' },
  specBadge: { position: 'absolute', bottom: '10%', left: '8%', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', background: 'rgba(15, 15, 15, 0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', transition: 'opacity 0.5s ease' },
  specBadgeRight: { position: 'absolute', bottom: '10%', right: '8%', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', background: 'rgba(15, 15, 15, 0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', transition: 'opacity 0.5s ease' },
  specIcon: { width: '28px', height: '28px', color: '#e11d48' },
  specTitle: { fontSize: '11px', color: '#9ca3af', letterSpacing: '1px', marginBottom: '2px' },
  specValue: { fontSize: '16px', fontWeight: '700', color: '#ffffff', letterSpacing: '0.5px' },
  scrollSpacer: { height: '800vh' },
  
  extraContentSection: { padding: '100px 8%', background: '#070707', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '120px' },
  container: { maxWidth: '1100px', margin: '0 auto', textAlign: 'center', width: '100%' },
  sectionBadge: { display: 'inline-block', padding: '6px 14px', background: 'rgba(225, 29, 72, 0.15)', border: '1px solid rgba(225, 29, 72, 0.4)', borderRadius: '20px', color: '#fb7185', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', marginBottom: '16px' },
  sectionTitle: { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', letterSpacing: '2px', marginBottom: '20px' },
  sectionDesc: { fontSize: '1.1rem', color: '#9ca3af', maxWidth: '700px', margin: '0 auto 50px auto', lineHeight: 1.7 },
  metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' },
  metricCard: { background: 'rgba(12, 12, 12, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '36px 20px', textAlign: 'center' },
  metricValue: { fontSize: '2.5rem', fontWeight: '800', color: '#e11d48', marginBottom: '8px' },
  metricLabel: { fontSize: '0.95rem', color: '#9ca3af', letterSpacing: '1px' },
  galleryHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' },
  viewAllBtn: { display: 'flex', alignItems: 'center', gap: '8px', color: '#e11d48', textDecoration: 'none', fontWeight: '600', fontSize: '15px' },
  previewGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' },
  previewCard: { height: '240px', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' },
  previewImg: { width: '100%', height: '100%', objectFit: 'cover' },
  colorPickerRow: { display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '20px' },
  colorButton: { background: 'rgba(15, 15, 15, 0.8)', color: '#ffffff', border: '2px solid', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }
};