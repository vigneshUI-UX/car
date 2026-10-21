import React, { useEffect, useRef, useState } from 'react';
import { 
  ChevronDown, Gauge, BatteryCharging, Zap, ShieldCheck, 
  Cpu, Star, Camera, Mail, Phone, MapPin, Send, ArrowRight, Compass 
} from 'lucide-react';

const TOTAL_FRAMES = 240;

export default function Home() {
  const canvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [newsSubscribed, setNewsSubscribed] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const imagesRef = useRef([]);

  // 1. Preload 240 Car Frames
  useEffect(() => {
    window.scrollTo(0, 0);
    let loadedCount = 0;
    const loadedImages = new Array(TOTAL_FRAMES);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(4, '0');
      img.src = `${import.meta.env.BASE_URL}frames/frame-${paddedIndex}.jpg`;
      
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

  // 2. Render 360 Car Frame Canvas
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

  // 3. Cinematic Particle Overlay
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.5,
      speedY: -Math.random() * 1.5 - 0.4,
      opacity: Math.random() * 0.8 + 0.2
    }));

    const renderParticles = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#f43f5e';

      particles.forEach((p) => {
        p.y += p.speedY;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(renderParticles);
    };

    renderParticles();
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 4. Scroll Frame Mapping
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
      {/* 3D Flip Card Inline CSS Styles */}
      <style>{`
        .flip-card {
          perspective: 1000px;
          height: 280px;
          cursor: pointer;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid rgba(225, 29, 72, 0.3);
          box-shadow: 0 0 15px rgba(225, 29, 72, 0.15);
        }
        .flip-card-front {
          background: rgba(12, 12, 12, 0.85);
          backdrop-filter: blur(12px);
        }
        .flip-card-back {
          background: linear-gradient(135deg, rgba(225, 29, 72, 0.25) 0%, rgba(10, 10, 10, 0.95) 100%);
          transform: rotateY(180deg);
          box-shadow: 0 0 25px rgba(225, 29, 72, 0.4);
          border-color: #e11d48;
        }
        .neon-glow-btn {
          box-shadow: 0 0 15px rgba(225, 29, 72, 0.4);
          transition: all 0.3s ease;
        }
        .neon-glow-btn:hover {
          box-shadow: 0 0 30px rgba(225, 29, 72, 0.8);
          transform: translateY(-2px);
        }
      `}</style>

      {!imagesLoaded && (
        <div style={styles.loaderContainer}>
          <div style={styles.spinner}></div>
          <h2 style={styles.loadingText}>LOADING 360 EXPERIENCE... {loadingProgress}%</h2>
        </div>
      )}

      {/* 1 & 2. Hero Section with 360 Animation & Cinematic Overlay */}
      <div style={styles.stickyContainer}>
        <canvas ref={canvasRef} style={styles.canvas} />
        <canvas ref={particleCanvasRef} style={styles.particleCanvas} />
        
        <div style={{ ...styles.heroContent, opacity: currentFrameIndex < 30 ? 1 : 0, pointerEvents: currentFrameIndex < 30 ? 'auto' : 'none' }}>
          <span style={styles.badge}>NEXT-GEN AERODYNAMICS</span>
          <h1 style={styles.title}>APEX <span style={styles.neonText}>GT</span></h1>
          <p style={styles.subtitle}>Uncompromising quad-motor power. Pure cinematic electric design engineered for extreme circuit performance.</p>
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

      {/* 17 Content Sections */}
      <div style={styles.extraContentSection}>
        
        {/* 3. Shop by Category (Interactive Flip Cards) */}
        <div id="categories" style={styles.container}>
          <span style={styles.sectionBadge}>PERFORMANCE CATALOGUE</span>
          <h2 style={styles.sectionTitle}>Hypercar Engineering Modules</h2>
          <div style={styles.grid4}>
            {[
              { cat: 'Aero Track Packages', img: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=600&q=80', desc: 'Active wing, carbon splitter & venturi tunnels.' },
              { cat: 'Torque Vectoring Powertrain', img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80', desc: 'Quad independent motors with 1000hz response.' },
              { cat: 'Monocoque Carbon Bodywork', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80', desc: 'Aerospace grade lightweight carbon structure.' },
              { cat: 'Cockpit Telematics', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80', desc: 'HUD, telemetry recording & track mapping.' }
            ].map((item, i) => (
              <div key={i} className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front" style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2)), url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{item.cat}</h3>
                  </div>
                  <div className="flip-card-back">
                    <h3 style={{ fontSize: '1.2rem', color: '#e11d48', marginBottom: '10px' }}>{item.cat}</h3>
                    <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: 1.5 }}>{item.desc}</p>
                    <span style={{ marginTop: '15px', color: '#fb7185', fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>Explore Module <ArrowRight size={14} /></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Best-Selling Products */}
        <div id="bestsellers" style={styles.container}>
          <span style={styles.sectionBadge}>HIGH-DEMAND COMPONENTS</span>
          <h2 style={styles.sectionTitle}>Precision Upgrades</h2>
          <div style={styles.grid3}>
            {[
              { name: 'Carbon-Ceramic Matrix Brakes', price: '$12,500', img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' },
              { name: 'Forged Titanium Center-Lock Wheels', price: '$9,800', img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80' },
              { name: 'Active Rear Diffuser System', price: '$7,400', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80' }
            ].map((prod, i) => (
              <div key={i} style={{ ...styles.card, overflow: 'hidden', padding: 0 }}>
                <img src={prod.img} alt={prod.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{prod.name}</h3>
                  <p style={{ color: '#e11d48', fontWeight: '800', fontSize: '1.3rem', textShadow: '0 0 10px rgba(225,29,72,0.5)' }}>{prod.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. New Arrivals */}
        <div id="new-arrivals" style={styles.container}>
          <span style={styles.sectionBadge}>INNOVATION</span>
          <h2 style={styles.sectionTitle}>Track-Ready Releases</h2>
          <div style={styles.grid3}>
            {[
              { title: 'AI Track Telemetry Unit', desc: 'Predictive apex analysis with 10ms sampling rate.' },
              { title: '900V Liquid-Cooled Charging Tether', desc: 'Delivers 350kW peak DC fast charging.' },
              { title: 'Carbon-Fiber Bucket Shell Seats', desc: 'Ultra-light 4.2kgFIA certified race seating.' }
            ].map((item, i) => (
              <div key={i} style={styles.card}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#fff' }}>{item.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Featured Collections */}
        <div id="featured" style={styles.container}>
          <span style={styles.sectionBadge}>CURATED EDITIONS</span>
          <h2 style={styles.sectionTitle}>Exclusive Specification Packages</h2>
          <div style={styles.grid2}>
            <div style={{ ...styles.card, background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.15) 0%, rgba(12, 12, 12, 0.9) 100%)', borderColor: '#e11d48', boxShadow: '0 0 20px rgba(225, 29, 72, 0.2)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Nürburgring Track Edition</h3>
              <p style={{ color: '#d1d5db', lineHeight: 1.6, marginBottom: '20px' }}>Full carbon aero pack, lowered adaptive dampening, slick compound tires, and telemetry HUD software.</p>
              <span style={{ color: '#e11d48', fontWeight: '700' }}>Limited to 50 Units</span>
            </div>
            <div style={{ ...styles.card, background: 'rgba(15, 15, 15, 0.85)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Grand Tourer Luxury Specification</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.6, marginBottom: '20px' }}>Custom Alcantara interior trim, active noise cancellation, adaptive air suspension, and executive luggage suite.</p>
              <span style={{ color: '#fb7185', fontWeight: '700' }}>Custom Built On Order</span>
            </div>
          </div>
        </div>

        {/* 7. Promotional Banner */}
        <div style={{ ...styles.card, textAlign: 'center', background: 'linear-gradient(90deg, #be123c, #e11d48)', padding: '50px 20px', boxShadow: '0 0 35px rgba(225, 29, 72, 0.5)', borderColor: '#fb7185' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: '900', letterSpacing: '2px' }}>EARLY ALLOCATION PROGRAM</h2>
          <p style={{ margin: '12px 0 24px', fontSize: '1.15rem', color: '#ffe4e6' }}>Reserve your build slot today and receive 3 years of complimentary track concierge coaching and OTA telemetry updates.</p>
          <a href="#contact" className="neon-glow-btn" style={styles.bannerBtn}>Claim Allocation Slot</a>
        </div>

        {/* 8. Brand Story */}
        <div id="about" style={styles.container}>
          <span style={styles.sectionBadge}>CIRCUIT HERITAGE</span>
          <h2 style={styles.sectionTitle}>The Pure Engineering Philosophy</h2>
          <p style={styles.sectionDesc}>APEX GT was born on the track with one goal: proving that zero-emission electric hypercars can deliver raw, visceral driving dynamics, downforce control, and unprecedented speed without compromises.</p>
        </div>

        {/* 9. Why Choose Us (Flip Cards Animation) */}
        <div id="why-us" style={styles.container}>
          <span style={styles.sectionBadge}>HYPERCAR BENCHMARKS</span>
          <h2 style={styles.sectionTitle}>Why Drivers Choose APEX GT</h2>
          <div style={styles.grid3}>
            {[
              { icon: Zap, title: '1,450 HP Quad-Motors', desc: '4 independent motors providing millisecond torque vectoring at each wheel.' },
              { icon: ShieldCheck, title: 'Solid-State Battery Tech', desc: 'Ultra-dense 900V architecture enabling 0 to 80% charging in under 12 minutes.' },
              { icon: Cpu, title: 'AI Neural Chassis Control', desc: 'Scans road surfaces 1,000 times per second to optimize suspension dampening.' }
            ].map((f, i) => (
              <div key={i} className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <f.icon style={styles.featureIcon} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{f.title}</h3>
                  </div>
                  <div className="flip-card-back">
                    <h3 style={{ fontSize: '1.2rem', color: '#e11d48', marginBottom: '10px' }}>{f.title}</h3>
                    <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 10. Product Highlights */}
        <div id="highlights" style={styles.container}>
          <span style={styles.sectionBadge}>VERIFIED TELEMETRY</span>
          <h2 style={styles.sectionTitle}>Performance Metrics</h2>
          <div style={styles.grid4}>
            <div style={styles.card}><h3 style={{ color: '#e11d48', fontSize: '2.4rem', fontWeight: '900', textShadow: '0 0 15px rgba(225,29,72,0.6)' }}>1,450 HP</h3><p style={styles.cardSubText}>Quad Powertrain</p></div>
            <div style={styles.card}><h3 style={{ color: '#e11d48', fontSize: '2.4rem', fontWeight: '900', textShadow: '0 0 15px rgba(225,29,72,0.6)' }}>245 MPH</h3><p style={styles.cardSubText}>Top Velocity</p></div>
            <div style={styles.card}><h3 style={{ color: '#e11d48', fontSize: '2.4rem', fontWeight: '900', textShadow: '0 0 15px rgba(225,29,72,0.6)' }}>0.19 Cd</h3><p style={styles.cardSubText}>Drag Coefficient</p></div>
            <div style={styles.card}><h3 style={{ color: '#e11d48', fontSize: '2.4rem', fontWeight: '900', textShadow: '0 0 15px rgba(225,29,72,0.6)' }}>650+ Mi</h3><p style={styles.cardSubText}>WLTP Range</p></div>
          </div>
        </div>

        {/* 11. Customer Reviews */}
        <div id="reviews" style={styles.container}>
          <span style={styles.sectionBadge}>DRIVER FEEDBACK</span>
          <h2 style={styles.sectionTitle}>Track Testimonials</h2>
          <div style={styles.grid2}>
            <div style={styles.card}>
              <div style={{ display: 'flex', gap: '4px', color: '#e11d48', marginBottom: '12px' }}>{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#e11d48" />)}</div>
              <p style={{ fontStyle: 'italic', color: '#d1d5db', lineHeight: 1.6 }}>"The quad-motor torque vectoring into high-speed corners is unlike anything I have driven. Instant acceleration with laser precision."</p>
              <p style={{ fontWeight: '700', marginTop: '16px', color: '#fff' }}>— Marcus V., GT3 Championship Driver</p>
            </div>
            <div style={styles.card}>
              <div style={{ display: 'flex', gap: '4px', color: '#e11d48', marginBottom: '12px' }}>{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#e11d48" />)}</div>
              <p style={{ fontStyle: 'italic', color: '#d1d5db', lineHeight: 1.6 }}>"Pure cinematic engineering. The carbon monocoque stiffness combined with instant 1,450 HP response redefines what hypercars can do."</p>
              <p style={{ fontWeight: '700', marginTop: '16px', color: '#fff' }}>— Elena R., Automotive Chief Editor</p>
            </div>
          </div>
        </div>

        {/* 12. Special Offers */}
        <div id="offers" style={styles.container}>
          <span style={styles.sectionBadge}>VIP ADVANTAGE</span>
          <h2 style={styles.sectionTitle}>Owner Benefits</h2>
          <div style={{ ...styles.card, borderLeft: '4px solid #e11d48' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Private Nürburgring Telemetry Experience</h3>
            <p style={{ color: '#9ca3af', lineHeight: 1.6 }}>Includes 1-on-1 coaching with APEX factory test drivers and customized telemetry suspension tuning.</p>
          </div>
        </div>

        {/* 13. Social Media Gallery */}
        <div id="gallery" style={styles.container}>
          <span style={styles.sectionBadge}>COMMUNITY</span>
          <h2 style={styles.sectionTitle}>Follow Us @APEXGT</h2>
          <div style={styles.grid3}>
            {[
              'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80'
            ].map((imgUrl, n) => (
              <div key={n} style={{ ...styles.card, height: '220px', padding: 0, overflow: 'hidden', position: 'relative' }}>
                <img src={imgUrl} alt="APEX GT Track" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.6)', padding: '8px', borderRadius: '50%' }}>
                  <Camera size={20} color="#e11d48" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 14. Newsletter Subscription */}
        <div id="newsletter" style={{ ...styles.card, textAlign: 'center', padding: '50px 20px', background: 'linear-gradient(180deg, rgba(15,15,15,0.9) 0%, rgba(225,29,72,0.1) 100%)', borderColor: 'rgba(225,29,72,0.3)' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>Subscribe to APEX Insiders</h2>
          <p style={{ color: '#9ca3af', marginBottom: '24px', maxWidth: '550px', margin: '0 auto 24px auto' }}>Receive exclusive build slots, VIP launch invites, and private track day telemetry reports directly to your inbox.</p>
          {newsSubscribed ? (
            <p style={{ color: '#22c55e', fontWeight: '700', fontSize: '1.1rem' }}>Thank you for subscribing to APEX Insiders!</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setNewsSubscribed(true); }} style={styles.newsForm}>
              <input type="email" placeholder="Your Email Address" required style={styles.input} />
              <button type="submit" className="neon-glow-btn" style={styles.submitBtn}>Subscribe</button>
            </form>
          )}
        </div>

        {/* 15. FAQ Section */}
        <div id="faq" style={styles.container}>
          <span style={styles.sectionBadge}>INQUIRIES</span>
          <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={styles.card}>
              <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>How many APEX GT units will be produced globally?</h4>
              <p style={{ color: '#9ca3af', marginTop: '8px', lineHeight: 1.6 }}>Production is strictly capped at 300 builds worldwide to guarantee maximum exclusivity and collector value.</p>
            </div>
            <div style={styles.card}>
              <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>What is the expected delivery timeline for reservation holders?</h4>
              <p style={{ color: '#9ca3af', marginTop: '8px', lineHeight: 1.6 }}>Deliveries begin in Q3 2027 based on sequential reservation allocation numbers.</p>
            </div>
          </div>
        </div>

        {/* 16. Contact Us / Reservation Form */}
        <div id="contact" style={styles.container}>
          <span style={styles.sectionBadge}>RESERVE YOUR ALLOCATION</span>
          <h2 style={styles.sectionTitle}>Private Concierge Booking</h2>
          <div style={styles.contactWrapper}>
            <div style={styles.contactInfo}>
              <h3 style={{ marginBottom: '20px', fontSize: '1.5rem', color: '#fff' }}>Global Headquarters</h3>
              <p style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#9ca3af', marginBottom: '16px' }}><MapPin size={20} color="#e11d48" /> Tamil Nadu , Erode, 638313</p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#9ca3af', marginBottom: '16px' }}><Phone size={20} color="#e11d48" /> 7305195172</p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#9ca3af' }}><Mail size={20} color="#e11d48" /> vignesh123@gmail.com</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} style={styles.form}>
              {formSubmitted ? (
                <div style={{ color: '#22c55e', padding: '20px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Reservation Inquiry Received</h3>
                  <p>Our APEX GT concierge will reach out within 24 hours to review your allocation.</p>
                </div>
              ) : (
                <>
                  <input type="text" placeholder="Full Name" required style={styles.input} />
                  <input type="email" placeholder="Email Address" required style={styles.input} />
                  <textarea placeholder="Specify Desired Color, Trim, or Custom Track Options" rows={4} required style={styles.textarea} />
                  <button type="submit" className="neon-glow-btn" style={styles.submitBtn}>
                    <span>Submit Reservation</span>
                    <Send size={16} />
                  </button>
                </>
              )}
            </form>
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
  particleCanvas: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' },
  heroContent: { position: 'absolute', top: '35%', left: '8%', maxWidth: '600px', transition: 'opacity 0.4s ease-in-out' },
  badge: { display: 'inline-block', padding: '6px 14px', background: 'rgba(225, 29, 72, 0.15)', border: '1px solid rgba(225, 29, 72, 0.4)', borderRadius: '20px', color: '#fb7185', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', marginBottom: '16px', boxShadow: '0 0 15px rgba(225, 29, 72, 0.3)' },
  title: { fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: '900', color: '#ffffff', letterSpacing: '4px', lineHeight: 1.1, marginBottom: '20px' },
  neonText: { color: '#e11d48', textShadow: '0 0 20px rgba(225, 29, 72, 0.8), 0 0 40px rgba(225, 29, 72, 0.4)' },
  subtitle: { fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: '#9ca3af', lineHeight: 1.6, marginBottom: '32px' },
  scrollIndicator: { display: 'flex', alignItems: 'center', gap: '10px', color: '#6b7280', fontSize: '13px', letterSpacing: '1px' },
  bounceIcon: { width: '18px', height: '18px', animation: 'bounce 2s infinite', color: '#e11d48' },
  specBadge: { position: 'absolute', bottom: '10%', left: '8%', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', background: 'rgba(15, 15, 15, 0.8)', backdropFilter: 'blur(16px)', border: '1px solid rgba(225, 29, 72, 0.3)', borderRadius: '12px', transition: 'opacity 0.5s ease', boxShadow: '0 0 20px rgba(0,0,0,0.8)' },
  specBadgeRight: { position: 'absolute', bottom: '10%', right: '8%', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', background: 'rgba(15, 15, 15, 0.8)', backdropFilter: 'blur(16px)', border: '1px solid rgba(225, 29, 72, 0.3)', borderRadius: '12px', transition: 'opacity 0.5s ease', boxShadow: '0 0 20px rgba(0,0,0,0.8)' },
  specIcon: { width: '28px', height: '28px', color: '#e11d48' },
  specTitle: { fontSize: '11px', color: '#9ca3af', letterSpacing: '1px', marginBottom: '2px' },
  specValue: { fontSize: '16px', fontWeight: '700', color: '#ffffff', letterSpacing: '0.5px' },
  scrollSpacer: { height: '800vh' },
  
  extraContentSection: { padding: '100px 8%', background: '#050505', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '120px' },
  container: { maxWidth: '1100px', margin: '0 auto', textAlign: 'center', width: '100%' },
  sectionBadge: { display: 'inline-block', padding: '6px 14px', background: 'rgba(225, 29, 72, 0.15)', border: '1px solid rgba(225, 29, 72, 0.4)', borderRadius: '20px', color: '#fb7185', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', marginBottom: '16px', boxShadow: '0 0 10px rgba(225,29,72,0.2)' },
  sectionTitle: { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', letterSpacing: '2px', marginBottom: '20px' },
  sectionDesc: { fontSize: '1.1rem', color: '#9ca3af', maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 },
  
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', textAlign: 'left' },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', textAlign: 'left' },
  grid4: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', textAlign: 'left' },
  
  card: { background: 'rgba(12, 12, 12, 0.85)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '32px', textAlign: 'left' },
  cardSubText: { color: '#9ca3af', fontSize: '0.9rem', marginTop: '6px' },
  featureIcon: { width: '36px', height: '36px', color: '#e11d48', marginBottom: '16px' },
  
  bannerBtn: { display: 'inline-block', background: '#ffffff', color: '#e11d48', padding: '14px 32px', borderRadius: '8px', fontWeight: '800', textDecoration: 'none' },
  newsForm: { display: 'flex', gap: '12px', justifyContent: 'center', maxWidth: '450px', margin: '0 auto', flexWrap: 'wrap' },
  
  contactWrapper: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', textAlign: 'left', background: 'rgba(12, 12, 12, 0.85)', border: '1px solid rgba(225, 29, 72, 0.3)', borderRadius: '20px', padding: '40px', boxShadow: '0 0 25px rgba(0,0,0,0.6)' },
  contactInfo: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  input: { width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '8px', color: '#fff', outline: 'none', fontSize: '14px' },
  textarea: { width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '8px', color: '#fff', outline: 'none', fontSize: '14px', resize: 'vertical' },
  submitBtn: { background: '#e11d48', color: '#fff', border: 'none', padding: '14px 24px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }
};