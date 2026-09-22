import React, { useState } from 'react';

export default function InteractivePlateVisualizer({ onSelectProduct }) {
  const [selectedPlateIndex, setSelectedPlateIndex] = useState(1); // Default to 12"
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'stack'

  const plates = [
    {
      id: 'r14',
      name: '14" Grand Round Thali / Platter Plate',
      badge: 'Royal Grand Thali & Feasts',
      shape: 'Extra-Wide Round Deep Rim',
      sizeInch: 14,
      sizeCm: '35.5 cm',
      depth: '28 mm Deep Anti-Spill Rim',
      thickness: '1.6 mm – 2.0 mm Extra-Heavy Palm Sheath',
      capacity: 'Mega Thali Feasts & Banquets (Holds up to 1.5 kg)',
      leafTexture: 'Deep Natural Areca Palm Sheath Grain',
      idealDishes: ['Full Wedding Thalis (Rice + 5 Curries)', 'Grand Biryani Platters', 'South & North Indian Royal Meals', 'Heavy Festive Buffets'],
      packCount: '25 Pcs / Shrink Pack • 150 Pcs / Master Carton',
      renderRatio: 1.15,
      isBowl: false,
      description: 'Our largest, most luxurious 14-inch circular thali plate. Engineered with heavy-duty pressed palm sheath to hold full multi-course wedding feasts and banquets without bending.'
    },
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
      isBowl: false,
      description: 'Our flagship heavy-duty 12-inch circular plate. Rigid and leak-proof, engineered to hold generous helpings of hot rice, gravies, and curries without buckling.'
    },
    {
      id: 'r10',
      name: '10" Medium Round Plate',
      badge: 'Standard Dining & Corporate Meals',
      shape: 'Round Standard Rim',
      sizeInch: 10,
      sizeCm: '25.4 cm',
      depth: '20 mm Sturdy Rim',
      thickness: '1.3 mm – 1.6 mm Natural Leaf',
      capacity: 'Lunches, Dinners & Corporate Events (Holds up to 800g)',
      leafTexture: 'Balanced Golden Palm Sheath Grain',
      idealDishes: ['Corporate Boxed Lunches', 'Executive Caterings', 'Dinner Meals with 2 Curries', 'Party Entrees & Pao Bhaji'],
      packCount: '25 Pcs / Shrink Pack • 250 Pcs / Master Carton',
      renderRatio: 0.88,
      isBowl: false,
      description: 'The standard 10-inch dining plate. Perfectly proportioned for medium-sized meals, daily corporate catering, parties, and executive lunches.'
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
      renderRatio: 0.74,
      isBowl: false,
      description: 'The versatile 8-inch circular plate. Lightweight yet extremely strong, ideal for breakfast tiffins, evening snacks, side salads, and banquet desserts.'
    },
    {
      id: 'b45',
      name: '4.5" Dona Leaf Bowl',
      badge: 'Curry, Sambar & Liquid Safe',
      shape: 'Deep Contoured Cup Bowl',
      sizeInch: 4.5,
      sizeCm: '11.4 cm',
      depth: '35 mm Extra-Deep Cup',
      thickness: '1.4 mm Formed Palm Leaf',
      capacity: 'Hot Soups, Curries & Desserts (150 ml – 200 ml)',
      leafTexture: 'Deep Thermal-Moulded Natural Sheath',
      idealDishes: ['Sambar & Rasam', 'Paneer / Chicken Gravies', 'Gulab Jamun & Ice Cream', 'Temple Prasadam & Chutneys'],
      packCount: '50 Pcs / Shrink Pack • 500 Pcs / Master Carton',
      renderRatio: 0.58,
      isBowl: true,
      description: 'Our 4.5-inch Dona leaf bowl is thermo-moulded with a deep concave contour for 100% leak-proof serving of boiling hot liquid curries, desserts, soups, and prasadam.'
    }
  ];

  const current = plates[selectedPlateIndex];

  return (
    <section className="section" id="interactive-studio" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Interactive 3D Visualizer</span>
          <h2 className="section-title">Explore Our Tableware Sizes & Dona Bowls</h2>
          <p className="section-desc">
            We manufacture different sizes like <strong>14", 12", 10", 8" plates</strong> and <strong>4.5" Dona Leaf Bowls</strong> — precision moulded from 100% naturally shed areca palm leaves.
          </p>
        </div>

        {/* Selection Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {plates.map((plate, index) => (
            <button
              key={plate.id}
              className={`filter-btn ${selectedPlateIndex === index ? 'active' : ''}`}
              onClick={() => setSelectedPlateIndex(index)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', padding: '10px 18px' }}
            >
              {plate.isBowl ? (
                <i className="fa-solid fa-bowl-food" style={{ color: selectedPlateIndex === index ? '#ffffff' : 'var(--color-brand-secondary)' }}></i>
              ) : (
                <i className="fa-solid fa-circle" style={{ fontSize: `${0.65 + index * 0.12}rem` }}></i>
              )}
              <strong>{plate.name.split(' ')[0]} {plate.isBowl ? 'Dona Bowl' : 'Plate'}</strong>
              <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>({plate.sizeInch}")</span>
            </button>
          ))}
        </div>

        {/* Studio Canvas Box */}
        <div className="calc-container visualizer-calc-container" style={{ background: '#ffffff' }}>
          
          {/* Interactive Rendering Canvas */}
          <div className="visualizer-canvas-pane" style={{ 
            background: 'radial-gradient(circle at center, #f4f9f0 0%, #e3ede0 100%)', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
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
                <i className="fa-solid fa-circle"></i> Single Item
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
                <i className="fa-solid fa-layer-group"></i> Wholesale Pack ({current.isBowl ? '50x' : '25x'})
              </button>
            </div>

            {/* Scale Indicator */}
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600, background: 'rgba(255,255,255,0.85)', padding: '4px 10px', borderRadius: 'var(--radius-sm)' }}>
              <i className="fa-solid fa-ruler-horizontal"></i> Real Dimensions: {current.sizeInch}" Diameter ({current.sizeCm})
            </div>

            {/* Dynamic Rendered Round Plate / Dona Bowl */}
            <div 
              style={{
                width: `clamp(180px, ${50 * current.renderRatio}vw, ${260 * current.renderRatio}px)`,
                height: `clamp(180px, ${50 * current.renderRatio}vw, ${260 * current.renderRatio}px)`,
                maxWidth: '85vw',
                maxHeight: '85vw',
                borderRadius: '50%',
                background: current.isBowl
                  ? 'radial-gradient(circle at 45% 45%, #7ea064 0%, #597341 55%, #384c26 100%)'
                  : 'linear-gradient(135deg, #748e58 0%, #5d7544 50%, #465c32 100%)',
                boxShadow: viewMode === 'stack'
                  ? '0 6px 0 #40552d, 0 12px 0 #3b4e2a, 0 18px 0 #344624, 0 24px 0 #2e3e20, 0 35px 45px rgba(28, 48, 22, 0.4)'
                  : current.isBowl
                    ? 'inset 0 8px 18px rgba(0,0,0,0.45), inset 0 -4px 10px rgba(255,255,255,0.3), 0 18px 36px rgba(35, 60, 25, 0.28)'
                    : 'inset 0 4px 14px rgba(255,255,255,0.3), inset 0 -8px 18px rgba(0,0,0,0.32), 0 22px 40px rgba(35, 60, 25, 0.28)',
                border: current.isBowl ? '6px solid #9bbd7e' : '5px solid #8ba86e',
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
                width: current.isBowl ? '52px' : '68px',
                height: current.isBowl ? '52px' : '68px',
                borderRadius: '50%',
                border: '1.5px dashed rgba(255,255,255,0.45)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.92)',
                fontSize: current.isBowl ? '0.62rem' : '0.72rem',
                fontWeight: 800,
                textAlign: 'center',
                lineHeight: 1.1
              }}>
                <span>LASYA</span>
                <span style={{ fontSize: '0.54rem', fontWeight: 600, opacity: 0.85 }}>100% PALM</span>
              </div>
            </div>
          </div>

          {/* Specs & Food Compatibility Panel */}
          <div className="visualizer-specs-pane" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="pill-badge" style={{ marginBottom: '10px' }}>
                <i className="fa-solid fa-circle-check"></i> {current.badge}
              </div>
              <h3 style={{ fontSize: '1.55rem', color: 'var(--color-brand-primary)', marginBottom: '8px' }}>
                {current.name}
              </h3>
              <p style={{ color: 'var(--color-text-body)', fontSize: '0.90rem', lineHeight: 1.6, marginBottom: '18px' }}>
                {current.description}
              </p>

              <div className="visualizer-specs-grid" style={{ marginBottom: '18px' }}>
                <div style={{ background: 'var(--color-bg-subtle)', padding: '10px', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Rim Depth:</span>
                  <strong style={{ color: 'var(--color-text-title)', fontSize: '0.88rem' }}>{current.depth}</strong>
                </div>
                <div style={{ background: 'var(--color-bg-subtle)', padding: '10px', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Leaf Thickness:</span>
                  <strong style={{ color: 'var(--color-text-title)', fontSize: '0.88rem' }}>{current.thickness}</strong>
                </div>
                <div style={{ background: 'var(--color-bg-subtle)', padding: '10px', borderRadius: 'var(--radius-md)', gridColumn: 'span 2' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Packaging Standard:</span>
                  <strong style={{ color: 'var(--color-brand-primary)', fontSize: '0.88rem' }}>{current.packCount}</strong>
                </div>
              </div>

              <h4 style={{ fontSize: '0.92rem', color: 'var(--color-text-title)', marginBottom: '8px' }}>
                <i className="fa-solid fa-utensils" style={{ color: 'var(--color-brand-secondary)' }}></i> Ideal Food Pairings:
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {current.idealDishes.map((dish, i) => (
                  <span key={i} style={{ 
                    padding: '4px 10px', 
                    background: 'var(--color-brand-mint)', 
                    color: 'var(--color-brand-primary)', 
                    borderRadius: 'var(--radius-full)', 
                    fontSize: '0.78rem', 
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

