import React from 'react';

export default function EcoImpact() {
  return (
    <section className="section" id="impact" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Environmental Stewardship</span>
          <h2 className="section-title">Your Real-World Environmental Impact</h2>
          <p className="section-desc">
            By choosing Lasya Natural Plates over synthetic plastic or styrofoam tableware, you directly prevent hazardous landfill accumulation and reduce carbon footprints.
          </p>
        </div>

        <div className="impact-visual-cards">
          <div className="impact-card">
            <div className="impact-icon"><i className="fa-solid fa-bottle-droplet"></i></div>
            <div className="impact-number">31,250+ kg</div>
            <div className="impact-label">Single-Use Plastic Replaced to Date</div>
          </div>

          <div className="impact-card">
            <div className="impact-icon"><i className="fa-solid fa-tree"></i></div>
            <div className="impact-number">100% Zero</div>
            <div className="impact-label">Trees Cut (Only Shed Leaves Used)</div>
          </div>

          <div className="impact-card">
            <div className="impact-icon"><i className="fa-solid fa-clock-rotate-left"></i></div>
            <div className="impact-number">60–90 Days</div>
            <div className="impact-label">100% Natural Soil Composting Time</div>
          </div>
        </div>
      </div>
    </section>
  );
}
