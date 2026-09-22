import React from 'react';

export default function ManufacturingProcess() {
  const steps = [
    { num: 1, icon: 'fa-hand-holding-hand', title: 'Fallen Leaf Collection', desc: 'Naturally shed areca palm leaves are ethically gathered from organic groves.' },
    { num: 2, icon: 'fa-shower', title: 'High-Pressure Fresh Wash', desc: 'Washed thoroughly with pressurized natural water without any chemical bleaches.' },
    { num: 3, icon: 'fa-fire-burner', title: '150°C Hydraulic Heat Press', desc: 'Precision heated heavy-duty steel molds compress and shape each rigid tableware piece.' },
    { num: 4, icon: 'fa-wand-magic-sparkles', title: 'Edge Trimming & Sterilization', desc: 'Manual precision trimming followed by intense UV sterilization for 100% food hygiene.' },
    { num: 5, icon: 'fa-truck-ramp-box', title: 'Moisture-Free Export Pack', desc: 'Sealed in food-grade shrink wrapping with desiccants for worldwide shelf longevity.' },
  ];

  return (
    <section className="section" id="process" style={{ background: 'var(--color-bg-subtle)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Real Manufacturing Unit</span>
          <h2 className="section-title">From Natural Palm Sheaths to Heavy-Duty Plates</h2>
          <p className="section-desc">
            Inside our Jalpally, Hyderabad facility: pure nature transformed into zero-plastic tableware through zero-chemical heat engineering.
          </p>
        </div>

        {/* Visual Factory Showcase Cards */}
        <div className="factory-showcase-grid">
          {/* Card 1: Hydraulic Press Plant */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
              <img 
                src="/images/factory_hydraulic_press.jpg" 
                alt="Hydraulic Thermal Plate Moulding Machines" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(26,51,23,0.85)', color: '#ffffff', padding: '4px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 600, backdropFilter: 'blur(4px)' }}>
                <i className="fa-solid fa-industry"></i> Hydraulic Press Unit
              </span>
            </div>
            <div style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--color-text-title)', marginBottom: '8px' }}>Semi-Automatic Thermal Moulding</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-body)', lineHeight: 1.6 }}>
                Dual-cylinder hydraulic hot-press stations operating at 150°C to activate the leaf's natural binding wax without adding a single gram of glue or binders.
              </p>
            </div>
          </div>

          {/* Card 2: Raw Natural Materials */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
              <img 
                src="/images/raw_stitched_leaves.jpg" 
                alt="Sun-Dried Natural Stitched Leaves" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(26,51,23,0.85)', color: '#ffffff', padding: '4px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 600, backdropFilter: 'blur(4px)' }}>
                <i className="fa-solid fa-leaf"></i> 100% Organic Raw Sheaths
              </span>
            </div>
            <div style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--color-text-title)', marginBottom: '8px' }}>Organic Fallen Leaf Processing</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-body)', lineHeight: 1.6 }}>
                Carefully sorted, sun-dried sheaths stitched by rural artisan clusters, ready for hydraulic shaping with zero artificial treatments.
              </p>
            </div>
          </div>
        </div>

        {/* 5-Step Process Timeline Grid */}
        <div className="process-steps-grid">
          {steps.map(s => (
            <div className="process-step-card" key={s.num}>
              <div className="step-num-badge">{s.num}</div>
              <div className="process-step-icon"><i className={`fa-solid ${s.icon}`}></i></div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

