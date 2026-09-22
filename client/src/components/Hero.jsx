import React, { useState } from 'react';

export default function Hero() {
  const [activeModal, setActiveModal] = useState(null); // 'leakProof', 'foodGrade', 'fallenLeaf'

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="hero-section" id="home">
      <div className="container hero-grid">
        <div className="hero-content">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="pill-badge">
              <i className="fa-solid fa-leaf"></i> 100% Fallen Areca Leaf Tableware
            </span>
            <span className="pill-badge" style={{ background: 'var(--color-bg-subtle)', borderColor: 'var(--color-border)' }}>
              <i className="fa-solid fa-industry"></i> Direct Manufacturer • Jalpally
            </span>
          </div>

          <h1 className="hero-title">
            Serve with Nature, <br />
            <span className="highlight">Elevate Every Dining Experience.</span>
          </h1>

          <p className="hero-lead">
            Lasya Natural Plates manufactures luxury, chemical-free bio-degradable tableware crafted from naturally shed palm leaves. Engineered for heavy catering, full buffets, and international export.
          </p>

          <div className="hero-ctas">
            <button className="btn btn-lg btn-primary" onClick={() => scrollTo('calculator')}>
              <i className="fa-solid fa-calculator"></i> Wholesale Price Estimator
            </button>
            <button className="btn btn-lg btn-secondary" onClick={() => scrollTo('products')}>
              <i className="fa-solid fa-layer-group"></i> Explore Tableware Range
            </button>
          </div>

          {/* Quick Metrics Bar with interactive click */}
          <div className="hero-metrics-grid" style={{
            marginTop: '16px',
            paddingTop: '20px',
            borderTop: '1px solid var(--color-border)'
          }}>
            <div 
              onClick={() => setActiveModal('foodGrade')}
              style={{ cursor: 'pointer', padding: '10px', borderRadius: 'var(--radius-md)', transition: 'background 0.2s', background: 'var(--color-bg-subtle)' }}
              title="Click to view lab report"
            >
              <strong style={{ fontSize: '1.25rem', color: 'var(--color-brand-primary)', fontFamily: 'var(--font-heading)', display: 'block' }}>
                100%
              </strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Chemical & Plastic Free <i className="fa-solid fa-circle-info" style={{ fontSize: '0.75rem' }}></i></span>
            </div>

            <div 
              onClick={() => setActiveModal('leakProof')}
              style={{ cursor: 'pointer', padding: '10px', borderRadius: 'var(--radius-md)', transition: 'background 0.2s', background: 'var(--color-bg-subtle)' }}
              title="Click to view thermal test"
            >
              <strong style={{ fontSize: '1.25rem', color: 'var(--color-brand-primary)', fontFamily: 'var(--font-heading)', display: 'block' }}>
                -20° to +180°C
              </strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Thermal Resilience <i className="fa-solid fa-circle-info" style={{ fontSize: '0.75rem' }}></i></span>
            </div>

            <div 
              onClick={() => scrollTo('contact')}
              style={{ cursor: 'pointer', padding: '10px', borderRadius: 'var(--radius-md)', transition: 'background 0.2s', background: 'var(--color-bg-subtle)' }}
            >
              <strong style={{ fontSize: '1.25rem', color: 'var(--color-brand-primary)', fontFamily: 'var(--font-heading)', display: 'block' }}>
                Pan India & Export
              </strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Wholesale Supply Scope</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Interactive Studio */}
        <div className="hero-visual">
          <div className="hero-card-wrapper" style={{ minHeight: '440px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'radial-gradient(circle at 60% 40%, #ffffff 0%, #eaf4e5 100%)', padding: '28px', position: 'relative' }}>
            
            {/* Visual Header Tag */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-brand-primary)', padding: '5px 14px', background: 'rgba(255,255,255,0.95)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: 'var(--shadow-sm)' }}>
                <i className="fa-solid fa-industry" style={{ color: 'var(--color-brand-secondary)' }}></i> Jalpally Manufacturing Facility
              </span>
              <span 
                onClick={() => setActiveModal('foodGrade')}
                style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-brand-secondary)', padding: '5px 12px', background: 'rgba(255,255,255,0.95)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '5px', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
                title="View Food Grade Certificate Info"
              >
                <i className="fa-solid fa-certificate"></i> Food Grade Certified <i className="fa-solid fa-circle-info" style={{ fontSize: '0.7rem' }}></i>
              </span>
            </div>

            {/* Authentic Product & Facility Visual Container */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '380px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 16px 36px rgba(40, 70, 30, 0.18)', border: '3px solid #ffffff', marginBottom: '14px' }}>
              <img 
                src="/images/finished_plates_packaged.jpg" 
                alt="Lasya Natural Plates Factory Dispatch Bundles" 
                style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                className="hero-live-photo"
              />
              <div style={{ position: 'absolute', bottom: 0, insetInline: 0, background: 'linear-gradient(to top, rgba(26,51,23,0.92) 0%, rgba(26,51,23,0.3) 70%, transparent 100%)', padding: '12px 16px', color: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <span style={{ fontSize: '0.70rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-brand-mint)', fontWeight: 600, display: 'block' }}>Fresh Batch Stock</span>
                    <strong style={{ fontSize: '0.94rem', color: '#ffffff', display: 'block' }}>14", 12", 10", 8" Plates & 4.5" Dona Bowls</strong>
                  </div>
                  <span style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(4px)', padding: '3px 8px', borderRadius: 'var(--radius-sm)', fontSize: '0.72rem', fontWeight: 600 }}>
                    100% Organic
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Bottom Trust Strip with Zero Overflow */}
            <div className="hero-trust-cards-grid" style={{ width: '100%' }}>
              <div 
                onClick={() => setActiveModal('leakProof')}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid var(--color-brand-mint)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer'
                }}
                title="Click to view leak test details"
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-brand-mint)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.9rem' }}>
                  <i className="fa-solid fa-droplet-slash"></i>
                </div>
                <div style={{ lineHeight: 1.2 }}>
                  <strong style={{ fontSize: '0.82rem', color: 'var(--color-text-title)', display: 'block' }}>
                    4+ Hrs Leak Proof
                  </strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Hot Oils & Gravies</span>
                </div>
              </div>

              <div 
                onClick={() => setActiveModal('fallenLeaf')}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid var(--color-brand-mint)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer'
                }}
                title="Click to view eco sustainability details"
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-brand-mint)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.9rem' }}>
                  <i className="fa-solid fa-leaf"></i>
                </div>
                <div style={{ lineHeight: 1.2 }}>
                  <strong style={{ fontSize: '0.82rem', color: 'var(--color-text-title)', display: 'block' }}>
                    100% Fallen Palm
                  </strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>0% Trees Cut</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Interactive Detail Modal for Badges */}
      {activeModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(26, 51, 23, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setActiveModal(null)}
        >
          <div 
            style={{
              background: '#ffffff',
              maxWidth: '520px',
              width: '100%',
              borderRadius: 'var(--radius-xl)',
              padding: '32px',
              boxShadow: 'var(--shadow-lg)',
              border: '2px solid var(--color-brand-pale)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveModal(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '1.3rem', color: 'var(--color-text-muted)', cursor: 'pointer' }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            {activeModal === 'leakProof' && (
              <div>
                <div className="pill-badge" style={{ marginBottom: '12px' }}>
                  <i className="fa-solid fa-droplet-slash"></i> Lab Hydrostatic Rating
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-brand-primary)', marginBottom: '12px' }}>
                  4+ Hours Leak & Oil Resistance
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-body)', lineHeight: 1.6, marginBottom: '18px' }}>
                  The areca palm leaf naturally possesses a thick hydrophobic cuticular wax layer. Under our high-temperature hydraulic press (150°C), this layer seals tightly, enabling the tableware to hold boiling gravies, sambars, hot oils, and soups for over 4 hours without sogginess or deformation.
                </p>
                <div style={{ background: 'var(--color-bg-subtle)', padding: '14px', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Hot Oil Resistance:</span>
                    <strong style={{ color: 'var(--color-brand-primary)' }}>100% No Leakage</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Microwave Safe:</span>
                    <strong style={{ color: 'var(--color-brand-primary)' }}>Up to 2 Mins (+180°C)</strong>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'foodGrade' && (
              <div>
                <div className="pill-badge" style={{ marginBottom: '12px' }}>
                  <i className="fa-solid fa-shield-halved"></i> Health & Hygiene
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-brand-primary)', marginBottom: '12px' }}>
                  100% Certified Food Grade Safe
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-body)', lineHeight: 1.6, marginBottom: '18px' }}>
                  Unlike synthetic plates that release BPA and carcinogenic Styrene into hot food, Lasya plates are washed exclusively with high-pressure spring water and UV sterilized. No chemicals, heavy metals, synthetic glues, or artificial waxes are used in production.
                </p>
                <div style={{ background: 'var(--color-bg-subtle)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                  <strong style={{ color: 'var(--color-brand-primary)', display: 'block', marginBottom: '4px' }}>
                    <i className="fa-solid fa-circle-check"></i> Safe for Children & Elders
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    Completely non-toxic, odorless, and preserves natural authentic food taste.
                  </span>
                </div>
              </div>
            )}

            {activeModal === 'fallenLeaf' && (
              <div>
                <div className="pill-badge" style={{ marginBottom: '12px' }}>
                  <i className="fa-solid fa-tree"></i> 0% Deforestation
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-brand-primary)', marginBottom: '12px' }}>
                  Naturally Shed Leaves Only
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-body)', lineHeight: 1.6, marginBottom: '18px' }}>
                  Areca palm trees naturally shed their leaf fronds 4 to 6 times per year. Our local farming partners collect these fallen sheaths from organic groves in Southern India. Not a single tree is ever harmed or cut down.
                </p>
                <div style={{ background: 'var(--color-bg-subtle)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                  <strong style={{ color: 'var(--color-brand-primary)', display: 'block', marginBottom: '4px' }}>
                    <i className="fa-solid fa-recycle"></i> 100% Backyard Compostable
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    After disposal, the plate decomposes in 60–90 days into nutrient-rich organic compost.
                  </span>
                </div>
              </div>
            )}

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '20px' }}
              onClick={() => setActiveModal(null)}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
