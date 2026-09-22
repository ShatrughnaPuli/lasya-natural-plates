import React, { useState } from 'react';

export default function MaterialComparison() {
  const [selectedCompetitor, setSelectedCompetitor] = useState('plastic');

  const comparisonData = {
    plastic: {
      name: 'Single-Use Plastic Plates',
      badPoints: ['Takes 450+ years to decompose', 'Releases toxic microplastics into hot food', 'Made from non-renewable petroleum', 'Banned across many Indian states and global events'],
      lasyaAdvantage: 'Lasya natural leaf plates decompose in 60–90 days as rich fertilizer, and contain zero petrochemicals.'
    },
    thermocol: {
      name: 'Styrofoam / Thermocol Plates',
      badPoints: ['Leaches carcinogenic Styrene into hot gravies and oils', 'Non-biodegradable, clogs municipal drainage', 'Crumbles and breaks easily under weight', 'Highly flammable and non-recyclable'],
      lasyaAdvantage: 'Lasya leaf tableware withstands boiling curries (+180°C) with zero synthetic leaching and heavy structural rigidity.'
    },
    paper: {
      name: 'Standard Paper / Bagasse Plates',
      badPoints: ['Often lined with thin polyethylene or PFAS wax coating', 'Sogs and loses shape after 15 minutes of hot gravy contact', 'Requires chopping trees or heavy chemical bleach processing'],
      lasyaAdvantage: 'Lasya uses naturally shed areca palm leaves. Zero trees are ever harmed, and our leaf cuticle naturally repels oil & liquids for over 4 hours.'
    }
  };

  const comp = comparisonData[selectedCompetitor];

  return (
    <section className="section" style={{ background: 'var(--color-bg-subtle)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Why Switch to Natural Leaves</span>
          <h2 className="section-title">The Sustainable Advantage</h2>
          <p className="section-desc">
            Compare Lasya Natural Leaf tableware against conventional dining materials.
          </p>
        </div>

        {/* Competitor Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '36px', flexWrap: 'wrap' }}>
          <button 
            className={`filter-btn ${selectedCompetitor === 'plastic' ? 'active' : ''}`}
            onClick={() => setSelectedCompetitor('plastic')}
          >
            vs. Plastic Plates
          </button>
          <button 
            className={`filter-btn ${selectedCompetitor === 'thermocol' ? 'active' : ''}`}
            onClick={() => setSelectedCompetitor('thermocol')}
          >
            vs. Thermocol / Styrofoam
          </button>
          <button 
            className={`filter-btn ${selectedCompetitor === 'paper' ? 'active' : ''}`}
            onClick={() => setSelectedCompetitor('paper')}
          >
            vs. Wax Paper Plates
          </button>
        </div>

        {/* Comparison Showdown Cards with Smooth Keyed Transition */}
        <div key={selectedCompetitor} className="comparison-showdown-grid" style={{ animation: 'comparisonFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          {/* Conventional Side */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', padding: '36px', border: '1.5px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', transition: 'all 0.3s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f5e8e0', color: '#9e4624', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-title)', margin: 0 }}>{comp.name}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Conventional Tableware</span>
              </div>
            </div>

            <ul style={{ listStyle: 'none', margin: '20px 0' }}>
              {comp.badPoints.map((pt, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px', fontSize: '0.9rem', color: 'var(--color-text-body)' }}>
                  <i className="fa-solid fa-xmark" style={{ color: '#b05a2e', marginTop: '4px' }}></i>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lasya Leaf Side */}
          <div style={{ background: 'linear-gradient(145deg, #ffffff, var(--color-brand-glow))', borderRadius: 'var(--radius-xl)', padding: '36px', border: '2px solid var(--color-brand-secondary)', boxShadow: 'var(--shadow-md)', position: 'relative', transition: 'all 0.3s ease' }}>
            <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
              <span className="pill-badge"><i className="fa-solid fa-crown"></i> Superior Choice</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-brand-mint)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                <i className="fa-solid fa-leaf"></i>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-brand-primary)', margin: 0 }}>Lasya Natural Leaf Plates</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-brand-secondary)', fontWeight: 700 }}>100% Fallen Palm Sheath</span>
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-light)', marginBottom: '20px' }}>
              <strong style={{ display: 'block', color: 'var(--color-brand-primary)', marginBottom: '6px', fontSize: '0.95rem' }}>
                <i className="fa-solid fa-check-double"></i> The Lasya Edge:
              </strong>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-body)', lineHeight: 1.6 }}>
                {comp.lasyaAdvantage}
              </p>
            </div>

            <div className="comparison-metrics-subgrid">
              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '10px 6px', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ display: 'block', color: 'var(--color-brand-primary)', fontSize: '1.1rem' }}>-20° to +180°</strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Thermal Range</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '10px 6px', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ display: 'block', color: 'var(--color-brand-primary)', fontSize: '1.1rem' }}>4+ Hours</strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Gravy Resistance</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '10px 6px', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ display: 'block', color: 'var(--color-brand-primary)', fontSize: '1.1rem' }}>60 Days</strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Soil Composting</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
