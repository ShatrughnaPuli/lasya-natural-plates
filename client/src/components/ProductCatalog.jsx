import React, { useState } from 'react';
import ProductPlateGraphic from './ProductPlateGraphic';

export default function ProductCatalog({ onSelectProduct }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);

  const handleFilterChange = (filter) => {
    if (filter === activeFilter || isFiltering) return;
    setIsFiltering(true);
    setTimeout(() => {
      setActiveFilter(filter);
      setIsFiltering(false);
    }, 260);
  };

  const products = [
    {
      id: 'p14',
      category: 'plates',
      sizeCategory: '14',
      name: '14" Grand Round Thali / Platter Plate',
      badge: 'Royal Feast & Grand Thali',
      graphicType: 'grand_round',
      tagline: 'Mega Indian Feasts, Thalis & Grand Banquets',
      specs: [
        'Diameter: 14 Inches (35.5 cm) • Extra-Wide Rim',
        'Capacity: Holds up to 1.5 kg heavy multi-course meals',
        'Features: 100% Leak & Oil Proof (4+ Hours)',
        'Packaging: 25 Pcs / Shrink Pack • 150 Pcs / Carton'
      ]
    },
    {
      id: 'p12',
      category: 'plates',
      sizeCategory: '12',
      name: '12" Large Round Plate',
      badge: 'Flagship Dinner Plate',
      graphicType: 'large_round',
      tagline: 'Grand Buffets, Banquets & Heavy Catering',
      specs: [
        'Diameter: 12 Inches (30.5 cm) • 25mm Deep Rim',
        'Capacity: Holds up to 1.2 kg without bending',
        'Features: Heat-resistant & Microwave Safe',
        'Packaging: 25 Pcs / Shrink Pack • 200 Pcs / Carton'
      ]
    },
    {
      id: 'p10',
      category: 'plates',
      sizeCategory: '10',
      name: '10" Medium Round Plate',
      badge: 'Standard Dining Special',
      graphicType: 'medium_round',
      tagline: 'Lunches, Dinners, Corporate Meals & Events',
      specs: [
        'Diameter: 10 Inches (25.4 cm) • 20mm Sturdy Rim',
        'Capacity: Holds up to 800g full meal course',
        'Features: 100% Biodegradable & Backyard Compostable',
        'Packaging: 25 Pcs / Shrink Pack • 250 Pcs / Carton'
      ]
    },
    {
      id: 'p08',
      category: 'plates',
      sizeCategory: '8',
      name: '8" Small Round Plate',
      badge: 'Snack & Breakfast Special',
      graphicType: 'small_round',
      tagline: 'Tiffin, Appetizers, Sweets & High-Tea',
      specs: [
        'Diameter: 8 Inches (20.3 cm) • 18mm Sturdy Rim',
        'Capacity: Holds up to 500g snacks/desserts',
        'Features: Lightweight yet rigid & leak-proof',
        'Packaging: 25 Pcs / Shrink Pack • 300 Pcs / Carton'
      ]
    },
    {
      id: 'p45',
      category: 'bowls',
      sizeCategory: '4.5',
      name: '4.5" Dona Leaf Bowl',
      badge: 'Curry, Gravy & Dessert Bowl',
      graphicType: 'dona',
      tagline: 'Curries, Sambar, Dips, Ice Creams & Prasadam',
      specs: [
        'Size: 4.5 Inches (11.4 cm) • Deep Curved Bowl Base',
        'Capacity: 150 ml – 200 ml liquid safe',
        'Features: Zero leakage for boiling hot soups & gravies',
        'Packaging: 50 Pcs / Shrink Pack • 500 Pcs / Carton'
      ]
    },
    {
      id: 'p_carton_combo',
      category: 'cartons',
      sizeCategory: 'combo',
      name: 'Wholesale Master Cartons (Full Range)',
      badge: 'Direct Factory Cases',
      graphicType: 'large_round',
      tagline: 'Assorted 14", 12", 10", 8" Plates & 4.5" Dona Bowls',
      specs: [
        'Options: Available in individual or customized mixed pallets',
        'Case Dimensions: Heavy 5-ply export corrugated boxes',
        'Moisture Protection: Silica gel desiccants included',
        'Dispatch: Same-day factory dispatch from Jalpally facility'
      ]
    }
  ];

  const filteredProducts = activeFilter === 'all'
    ? products
    : activeFilter === 'plates'
      ? products.filter(p => p.category === 'plates')
      : activeFilter === 'bowls'
        ? products.filter(p => p.category === 'bowls')
        : products.filter(p => p.category === activeFilter || p.sizeCategory === activeFilter);

  return (
    <section className="section" id="products">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Factory Direct Tableware Range</span>
          <h2 className="section-title">Our Complete Natural Tableware Collection</h2>
          <p className="section-desc">
            Direct from our Hyderabad manufacturing unit: genuine 100% fallen areca palm leaf products. We manufacture different sizes like <strong>14", 12", 10", 8" plates</strong> and <strong>4.5" Dona Leaf Bowls</strong> for all catering and dining needs.
          </p>
        </div>

        {/* Highlight Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(46,78,39,0.08) 0%, rgba(85,124,67,0.15) 100%)',
          border: '1.5px solid var(--color-brand-mint)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 24px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          textAlign: 'center',
          flexWrap: 'wrap'
        }}>
          <i className="fa-solid fa-sparkles" style={{ color: 'var(--color-brand-secondary)', fontSize: '1.2rem' }}></i>
          <span style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
            We have different sizes like 14" 12" 10" 8" plates and 4.5" Dona Leaf Bowls
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', background: 'rgba(255,255,255,0.85)', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
            100% Eco-Friendly • Chemical Free
          </span>
        </div>

        {/* Filter Navigation Bar */}
        <div className="product-filter-bar">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
            style={{ transition: 'all 0.2s ease' }}
          >
            All Sizes & Items
          </button>
          <button 
            className={`filter-btn ${activeFilter === '14' ? 'active' : ''}`}
            onClick={() => handleFilterChange('14')}
            style={{ transition: 'all 0.2s ease' }}
          >
            <i className="fa-solid fa-circle" style={{ fontSize: '1.10rem' }}></i> 14" Grand Thali
          </button>
          <button 
            className={`filter-btn ${activeFilter === '12' ? 'active' : ''}`}
            onClick={() => handleFilterChange('12')}
            style={{ transition: 'all 0.2s ease' }}
          >
            <i className="fa-solid fa-circle" style={{ fontSize: '0.95rem' }}></i> 12" Large Buffet
          </button>
          <button 
            className={`filter-btn ${activeFilter === '10' ? 'active' : ''}`}
            onClick={() => handleFilterChange('10')}
            style={{ transition: 'all 0.2s ease' }}
          >
            <i className="fa-solid fa-circle" style={{ fontSize: '0.80rem' }}></i> 10" Medium Lunch
          </button>
          <button 
            className={`filter-btn ${activeFilter === '8' ? 'active' : ''}`}
            onClick={() => handleFilterChange('8')}
            style={{ transition: 'all 0.2s ease' }}
          >
            <i className="fa-solid fa-circle" style={{ fontSize: '0.65rem' }}></i> 8" Small Snack
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'bowls' ? 'active' : ''}`}
            onClick={() => handleFilterChange('bowls')}
            style={{ transition: 'all 0.2s ease' }}
          >
            <i className="fa-solid fa-bowl-food"></i> 4.5" Dona Bowls
          </button>
        </div>

        {/* Product Cards Grid with Micro-Transition */}
        <div 
          key={activeFilter} 
          className="product-grid"
          style={{
            animation: 'comparisonFadeIn 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isFiltering ? 0.4 : 1,
            transition: 'opacity 0.2s ease'
          }}
        >
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

