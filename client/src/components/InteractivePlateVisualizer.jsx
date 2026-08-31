import React, { useState } from 'react';

export default function InteractivePlateVisualizer({ onSelectProduct }) {
  const [selectedPlateIndex, setSelectedPlateIndex] = useState(0);
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'stack'

  const plates = [
    {
      id: 'r12',
      name: '12" Large Round Plate',
      badge: 'Full Buffet & Grand Dining',
      shape: 'Round Deep Rim',
      sizeInch: 12,
      sizeCm: '30.5 cm',
      depth: '25 mm Deep Anti-Spill Rim',
      thickness: '1.4 mm – 1.8 mm Heavy Palm Sheath',
      capacity: 'Full Course Indian & Western Meals (Holds up to 1.2 kg)',
      leafTexture: 'Deep Natural Areca Palm Sheath Grain',
      idealDishes: ['Biryani & Pulao', 'Full Meals with 3+ Curries', 'Banquet & Wedding Buffets', 'Heavy Gravies & Rotis'],
      packCount: '25 Pcs / Shrink Pack • 200 Pcs / Master Carton',
      renderRatio: 1.0,
      description: 'Our flagship heavy-duty 12-inch circular plate. Rigid and leak-proof, engineered to hold generous helpings of hot rice, gravies, and curries without buckling.'
    },
    {
      id: 'r08',
      name: '8" Small Round Plate',
      badge: 'Snack, Tiffin & Appetizers',
      shape: 'Round Standard Rim',
      sizeInch: 8,
      sizeCm: '20.3 cm',
      depth: '18 mm Ergonomic Rim',
      thickness: '1.2 mm – 1.5 mm Natural Leaf',
      capacity: 'Appetizers, Desserts & Breakfast (Holds up to 500g)',
      leafTexture: 'Smooth Golden Sand & Olive Palm Sheath',
      idealDishes: ['Idli / Dosa / Vada', 'Starters, Kebabs & Fries', 'Cakes, Halwa & Sweets', 'Cocktail & High-Tea Bites'],
      packCount: '25 Pcs / Shrink Pack • 300 Pcs / Master Carton',
      renderRatio: 0.76,
      description: 'The versatile 8-inch circular plate. Lightweight yet extremely strong, ideal for breakfast tiffins, evening snacks, side salads, and banquet desserts.'
    }
  ];

  const current = plates[selectedPlateIndex];

  return (
    <section className="section" id="interactive-studio" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Official Signature Products</span>
          <h2 className="section-title">Pure Fallen Palm Leaf Round Tableware</h2>
          <p className="section-desc">
            We exclusively manufacture two precision-engineered circular plate sizes crafted from naturally fallen palm sheaths — zero trees cut, zero chemicals.
          </p>
        </div>

        {/* Selection Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {plates.map((plate, index) => (
            <button
              key={plate.id}
              className={`filter-btn ${selectedPlateIndex === index ? 'active' : ''}`}
              onClick={() => setSelectedPlateIndex(index)}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', padding: '12px 24px' }}
            >
              <i className="fa-solid fa-circle" style={{ fontSize: index === 0 ? '1.1rem' : '0.85rem' }}></i>
              <strong>{plate.name}</strong>
              <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>({plate.sizeInch}")</span>
            </button>
          ))}
        </div>

        {/* Studio Canvas Box */}
        <div className="calc-container" style={{ gridTemplateColumns: '1.2fr 0.8fr', background: '#ffffff', minHeight: '480px' }}>
          
          {/* Interactive Rendering Canvas */}
          <div style={{ 
            background: 'radial-gradient(circle at center, #f4f9f0 0%, #e3ede0 100%)', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '40px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* View Mode Toggle */}
            <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px', zIndex: 10 }}>
              <button 
                onClick={() => setViewMode('single')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-border)',
                  background: viewMode === 'single' ? 'var(--color-brand-primary)' : 'rgba(255,255,255,0.9)',
                  color: viewMode === 'single' ? '#ffffff' : 'var(--color-text-body)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <i className="fa-solid fa-circle"></i> Single Plate
              </button>
              <button 
                onClick={() => setViewMode('stack')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-border)',
                  background: viewMode === 'stack' ? 'var(--color-brand-primary)' : 'rgba(255,255,255,0.9)',
                  color: viewMode === 'stack' ? '#ffffff' : 'var(--color-text-body)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <i className="fa-solid fa-layer-group"></i> Wholesale Pack (25x)
              </button>
            </div>

            {/* Scale Indicator */}
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600, background: 'rgba(255,255,255,0.85)', padding: '4px 10px', borderRadius: 'var(--radius-sm)' }}>
              <i className="fa-solid fa-ruler-horizontal"></i> Real Dimensions: {current.sizeInch}" Diameter ({current.sizeCm})
            </div>

            {/* Dynamic Rendered Round Plate */}
            <div 
              style={{
                width: `${270 * current.renderRatio}px`,
                height: `${270 * current.renderRatio}px`,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #748e58 0%, #5d7544 50%, #465c32 100%)',
                boxShadow: viewMode === 'stack'
                  ? '0 6px 0 #40552d, 0 12px 0 #3b4e2a, 0 18px 0 #344624, 0 24px 0 #2e3e20, 0 35px 45px rgba(28, 48, 22, 0.4)'
                  : 'inset 0 4px 14px rgba(255,255,255,0.3), inset 0 -8px 18px rgba(0,0,0,0.32), 0 22px 40px rgba(35, 60, 25, 0.28)',
                border: '5px solid #8ba86e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: viewMode === 'stack' ? 'rotateX(25deg) rotateY(-10deg) scale(0.95)' : 'rotate(0deg)',
              }}
            >
              {/* Natural Leaf Texture Organic Veins */}
              <svg width="84%" height="84%" viewBox="0 0 100 100" style={{ opacity: 0.38, pointerEvents: 'none' }}>
                <path d="M50 5 L50 95" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2 1" />
                <path d="M50 25 L85 15 M50 25 L15 15" stroke="#ffffff" strokeWidth="1.2" />
                <path d="M50 45 L90 35 M50 45 L10 35" stroke="#ffffff" strokeWidth="1.2" />
                <path d="M50 65 L85 58 M50 65 L15 58" stroke="#ffffff" strokeWidth="1.2" />
                <path d="M50 85 L78 80 M50 85 L22 80" stroke="#ffffff" strokeWidth="1.2" />
              </svg>

              {/* Center Quality Stamp */}
              <div style={{
                position: 'absolute',
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                border: '1.5px dashed rgba(255,255,255,0.45)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.92)',
                fontSize: '0.72rem',
                fontWeight: 800,
                textAlign: 'center',
                lineHeight: 1.1
              }}>
                <span>LASYA</span>
                <span style={{ fontSize: '0.58rem', fontWeight: 600, opacity: 0.85 }}>100% PALM</span>
              </div>
            </div>
          </div>

          {/* Specs & Food Compatibility Panel */}
          <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="pill-badge" style={{ marginBottom: '10px' }}>
                <i className="fa-solid fa-circle-check"></i> {current.badge}
              </div>
              <h3 style={{ fontSize: '1.7rem', color: 'var(--color-brand-primary)', marginBottom: '8px' }}>
                {current.name}
              </h3>
              <p style={{ color: 'var(--color-text-body)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                {current.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div style={{ background: 'var(--color-bg-subtle)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Rim Depth:</span>
                  <strong style={{ color: 'var(--color-text-title)', fontSize: '0.92rem' }}>{current.depth}</strong>
                </div>
                <div style={{ background: 'var(--color-bg-subtle)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Leaf Thickness:</span>
                  <strong style={{ color: 'var(--color-text-title)', fontSize: '0.92rem' }}>{current.thickness}</strong>
                </div>
                <div style={{ background: 'var(--color-bg-subtle)', padding: '12px', borderRadius: 'var(--radius-md)', gridColumn: 'span 2' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Packaging Standard:</span>
                  <strong style={{ color: 'var(--color-brand-primary)', fontSize: '0.92rem' }}>{current.packCount}</strong>
                </div>
              </div>

              <h4 style={{ fontSize: '0.95rem', color: 'var(--color-text-title)', marginBottom: '10px' }}>
                <i className="fa-solid fa-utensils" style={{ color: 'var(--color-brand-secondary)' }}></i> Ideal Food Pairings:
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {current.idealDishes.map((dish, i) => (
                  <span key={i} style={{ 
                    padding: '4px 12px', 
                    background: 'var(--color-brand-mint)', 
                    color: 'var(--color-brand-primary)', 
                    borderRadius: 'var(--radius-full)', 
                    fontSize: '0.8rem', 
                    fontWeight: 600 
                  }}>
                    {dish}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                onClick={() => onSelectProduct(current.name)}
              >
                <i className="fa-solid fa-calculator"></i> Calculate Bulk Price
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

