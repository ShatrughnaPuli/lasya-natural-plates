import React from 'react';

export default function BrochureSection() {
  const specs = [
    { code: 'LNP-R12', name: '12" Large Round Grand Dinner Plate', dims: '12" (30.5 cm)', shape: 'Round Deep Rim (25mm)', carton: '200 Pcs (8 packs of 25)', use: 'Full Buffet, Biryani, 3+ Curries, Heavy Banquet Dining' },
    { code: 'LNP-R08', name: '8" Small Round Snack & Tiffin Plate', dims: '8" (20.3 cm)', shape: 'Round Ergonomic Rim (18mm)', carton: '300 Pcs (12 packs of 25)', use: 'Breakfast, Tiffin, Starters, Desserts, High-Tea' },
    { code: 'LNP-CB01', name: 'Wholesale Master Combo (12" + 8")', dims: 'Assorted 12" & 8"', shape: 'Round Tableware Suite', carton: '250 Pcs Mixed Pack', use: 'Complete Catering Setup (Main Course + Starters)' },
  ];

  const handleOpenBrochure = (autoPrint = false) => {
    window.open(`/brochure.html${autoPrint ? '?print=true' : ''}`, '_blank');
  };

  return (
    <section className="section" id="brochure">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Official Specifications</span>
          <h2 className="section-title">Product Brochure & Export Spec Sheet</h2>
          <p className="section-desc">
            Detailed dimensions, carton configurations, and technical specifications for commercial caterers, wholesalers, and export buyers.
          </p>
        </div>

        <div className="brochure-showcase-box">
          <div className="brochure-header-inner">
            <div className="brochure-title-block">
              <h3 style={{ color: 'var(--color-brand-primary)', fontSize: 'clamp(1.3rem, 3.5vw, 1.6rem)', marginBottom: '4px' }}>
                Lasya Natural Plates - Master B2B Catalog
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(0.82rem, 2.2vw, 0.95rem)' }}>
                Standard Export & Domestic Packaging Master List
              </p>
            </div>
            <div className="brochure-header-actions">
              <button className="btn btn-secondary btn-sm" onClick={() => handleOpenBrochure(false)}>
                <i className="fa-solid fa-file-lines"></i> View Full Brochure
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => handleOpenBrochure(true)}>
                <i className="fa-solid fa-download"></i> Save / Print PDF
              </button>
            </div>
          </div>

          <div className="brochure-spec-table-wrap">
            <table className="brochure-spec-table">
              <thead>
                <tr>
                  <th>Item Code</th>
                  <th>Product Description</th>
                  <th>Dimensions</th>
                  <th>Shape / Type</th>
                  <th>Units / Carton</th>
                  <th>Food Compatibility</th>
                </tr>
              </thead>
              <tbody>
                {specs.map((s, idx) => (
                  <tr key={idx}>
                    <td><strong style={{ color: 'var(--color-brand-primary)' }}>{s.code}</strong></td>
                    <td style={{ fontWeight: 600 }}>{s.name}</td>
                    <td>{s.dims}</td>
                    <td>{s.shape}</td>
                    <td><span className="spec-carton-badge">{s.carton}</span></td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{s.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="brochure-feature-bullets">
            <div className="brochure-bullet-card">
              <h5><i className="fa-solid fa-temperature-arrow-up"></i> Thermal Tolerance</h5>
              <p>Handles temperatures from -20°C (Freezer safe) to +180°C (Oven & Microwave friendly up to 2 mins).</p>
            </div>
            <div className="brochure-bullet-card">
              <h5><i className="fa-solid fa-droplet-slash"></i> Moisture & Oil Proof</h5>
              <p>Naturally hydrophobic leaf cuticle holds heavy gravies and hot oils for over 4 hours without sogginess.</p>
            </div>
            <div className="brochure-bullet-card">
              <h5><i className="fa-solid fa-earth-americas"></i> Global Logistics</h5>
              <p>Customized master cartons, barcode labeling, palletization, and fumigation ready for export clearance.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
