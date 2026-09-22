import React from 'react';

export default function TrustBar() {
  const trustPoints = [
    { 
      icon: 'fa-utensils', 
      title: 'Food Grade Safe', 
      tag: 'Lab Certified',
      desc: '100% non-toxic and chemical-free. Safe for boiling hot gravies, biryanis, and curries up to 180°C.' 
    },
    { 
      icon: 'fa-leaf', 
      title: 'Eco-Friendly', 
      tag: '0% Trees Cut',
      desc: 'Crafted exclusively from naturally shed fallen palm leaves. Zero trees are ever harmed.' 
    },
    { 
      icon: 'fa-recycle', 
      title: '100% Recyclable', 
      tag: '60–90 Days',
      desc: 'Naturally decomposes in backyard compost within 60–90 days into rich organic fertilizer.' 
    },
    { 
      icon: 'fa-ban', 
      title: 'No Plastic / Wax', 
      tag: 'Zero Chemicals',
      desc: 'Zero plastic film, PFAS, synthetic binders, or glues. Pure pressed palm leaf cuticle.' 
    },
    { 
      icon: 'fa-shield-halved', 
      title: 'Make in India', 
      tag: 'Jalpally Facility',
      desc: 'Manufactured with pride at our in-house facility in Jalpally, Hyderabad with strict export quality checks.' 
    },
  ];

  return (
    <section className="section section-trust-bar" id="about" style={{ background: 'var(--color-bg-subtle)', scrollMarginTop: '90px' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '36px' }}>
          <span className="section-subtitle">Pure Organic Assurance</span>
          <h2 className="section-title">Why Choose Lasya Natural Plates?</h2>
          <p className="section-desc">
            Direct from our Hyderabad manufacturing unit: authentic palm leaf tableware engineered for luxury hospitality, full catering buffets, and sustainable living.
          </p>
        </div>

        <div className="trust-grid">
          {trustPoints.map((pt, idx) => (
            <div className="trust-item" key={idx} style={{ padding: '22px 18px', textAlign: 'center', background: '#ffffff', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div className="trust-icon" style={{ margin: '0 auto 12px auto' }}>
                <i className={`fa-solid ${pt.icon}`}></i>
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-brand-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', background: 'var(--color-brand-mint)', padding: '2px 8px', borderRadius: 'var(--radius-full)', display: 'inline-block', marginBottom: '8px' }}>
                {pt.tag}
              </span>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--color-brand-primary)', marginBottom: '8px' }}>{pt.title}</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>{pt.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
