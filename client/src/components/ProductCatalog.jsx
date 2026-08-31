import React, { useState } from 'react';
import ProductPlateGraphic from './ProductPlateGraphic';

export default function ProductCatalog({ onSelectProduct }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const products = [
    {
      id: 'p1',
      category: 'large',
      name: '12" Large Round Plate',
      badge: 'Flagship Dinner Plate',
      graphicType: 'large_round',
      tagline: 'Grand Buffets, Banquets & Heavy Meals',
      specs: [
        'Diameter: 12 Inches (30.5 cm) • 25mm Deep Rim',
        'Capacity: Holds up to 1.2 kg without bending',
        'Features: 100% Leak & Oil Proof (4+ Hours)',
        'Packaging: 25 Pcs / Shrink Pack • 200 Pcs / Carton'
      ]
    },
    {
      id: 'p2',
      category: 'small',
      name: '8" Small Round Plate',
      badge: 'Snack & Breakfast Special',
      graphicType: 'small_round',
      tagline: 'Tiffin, Appetizers, Sweets & High-Tea',
      specs: [
        'Diameter: 8 Inches (20.3 cm) • 18mm Sturdy Rim',
        'Capacity: Holds up to 500g snacks/desserts',
        'Features: Heat-resistant & Microwave Safe',
        'Packaging: 25 Pcs / Shrink Pack • 300 Pcs / Carton'
      ]
    },
    {
      id: 'p3',
      category: 'large',
      name: '12" Large Round Wholesale Carton (200 Pcs)',
      badge: 'Direct Factory Case',
      graphicType: 'large_round',
      tagline: 'Bulk Supply for Caterers, Hotels & Exporters',
      specs: [
        'Quantity: 8 shrink-wrapped bundles of 25 pcs',
        'Case Dimensions: Heavy 5-ply export corrugated box',
        'Moisture Protection: Silica gel pouches included',
        'Dispatch: Same-day factory dispatch from Jalpally'
      ]
    },
    {
      id: 'p4',
      category: 'small',
      name: '8" Small Round Wholesale Carton (300 Pcs)',
      badge: 'High-Volume Case',
      graphicType: 'small_round',
      tagline: 'Ideal for Event Planners, Cafes & Resorts',
      specs: [
        'Quantity: 12 shrink-wrapped bundles of 25 pcs',
        'Case Dimensions: Heavy 5-ply export corrugated box',
        'Moisture Protection: Silica gel pouches included',
        'Dispatch: Same-day factory dispatch from Jalpally'
      ]
    }
  ];

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter);

  return (
    <section className="section" id="products">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Factory Direct Tableware</span>
          <h2 className="section-title">Our Signature Round Plate Collection</h2>
          <p className="section-desc">
            Direct from our Hyderabad manufacturing unit: genuine 100% fallen areca palm leaf plates in our two verified signature round sizes.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="product-filter-bar">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Sizes & Packs
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'large' ? 'active' : ''}`}
            onClick={() => setActiveFilter('large')}
          >
            <i className="fa-solid fa-circle"></i> 12" Large Round (Buffet)
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'small' ? 'active' : ''}`}
            onClick={() => setActiveFilter('small')}
          >
            <i className="fa-solid fa-circle" style={{ fontSize: '0.8rem' }}></i> 8" Small Round (Snack/Tiffin)
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-img-box" style={{ background: 'radial-gradient(circle at center, #f4faf0 0%, #e2efe0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '210px' }}>
                <ProductPlateGraphic type={product.graphicType} />
                <span className="product-badge-tag">{product.badge}</span>
              </div>
              <div className="product-info">
                <span className="product-category" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {product.tagline}
                </span>
                <h3 className="product-name" style={{ fontSize: '1.25rem', marginTop: '4px', marginBottom: '12px' }}>
                  {product.name}
                </h3>
                <ul className="product-specs-list">
                  {product.specs.map((sp, idx) => (
                    <li key={idx}><i className="fa-solid fa-circle-check" style={{ color: 'var(--color-brand-secondary)' }}></i> {sp}</li>
                  ))}
                </ul>
                <div className="product-card-footer">
                  <span className="bulk-indicator"><i className="fa-solid fa-boxes-stacked"></i> Direct Wholesale</span>
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => onSelectProduct(product.name)}
                  >
                    Select for Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

