import React, { useState } from 'react';

export default function WholesaleCalculator({ onOpenQuoteModal, selectedProducts, setSelectedProducts }) {
  const [quantity, setQuantity] = useState(5000);
  const [region, setRegion] = useState('Pan India');

  const productOptions = [
    { name: '12" Large Round Plate', desc: 'Buffets, Banquets & Heavy Meals' },
    { name: '8" Small Round Plate', desc: 'Snacks, Tiffin & Appetizers' },
    { name: 'Mixed Event Combo (12" + 8")', desc: 'Complete Catering Master Setup' },
  ];

  const toggleProduct = (name) => {
    if (selectedProducts.includes(name)) {
      setSelectedProducts(selectedProducts.filter(p => p !== name));
    } else {
      setSelectedProducts([...selectedProducts, name]);
    }
  };

  // Determine Discount Tier
  let tierName = 'Starter Tier (Direct Factory Base)';
  let discountPercentage = 'Base Wholesale';
  if (quantity >= 25000) {
    tierName = 'Mega Tier 3 (Factory Direct -20%)';
    discountPercentage = '-20% Volume Rebate';
  } else if (quantity >= 10000) {
    tierName = 'Volume Tier 2 (Bulk Wholesale -15%)';
    discountPercentage = '-15% Bulk Discount';
  } else if (quantity >= 2500) {
    tierName = 'Tier 1 (Wholesale Standard -10%)';
    discountPercentage = '-10% Wholesale Tier';
  }

  const formattedQuantity = quantity.toLocaleString('en-IN') + ' Units';
  const productsText = selectedProducts.length > 0 ? selectedProducts.join(', ') : 'Assorted Plates';

  const whatsappMessage = encodeURIComponent(
    `Hello Lasya Natural Plates! 👋\n\nI would like to request a wholesale quotation:\n- Products: ${productsText}\n- Quantity: ${formattedQuantity}\n- Supply Region: ${region}\n- Discount Bracket: ${tierName}\n\nPlease share official pricing and dispatch timeline.`
  );

  return (
    <section className="section section-calculator" id="calculator">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Factory Direct Pricing</span>
          <h2 className="section-title">Interactive Wholesale Quotation Builder</h2>
          <p className="section-desc">
            Select your desired product mix and estimated volume to receive tiered factory-direct wholesale pricing and an instant quotation.
          </p>
        </div>

        <div className="calc-container">
          {/* Interactive Inputs */}
          <div className="calc-interactive-pane">
            <h3 className="calc-step-title">
              <i className="fa-solid fa-layer-group"></i> 1. Select Plate Types
            </h3>
            
            <div className="calc-plate-selection">
              {productOptions.map((opt, idx) => {
                const isSelected = selectedProducts.includes(opt.name);
                return (
                  <div 
                    key={idx} 
                    className={`plate-select-card ${isSelected ? 'active' : ''}`}
                    onClick={() => toggleProduct(opt.name)}
                  >
                    <input 
                      type="checkbox" 
                      checked={isSelected} 
                      onChange={() => {}} 
                    />
                    <div className="plate-select-info">
                      <strong>{opt.name}</strong>
                      <span>{opt.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <h3 className="calc-step-title">
              <i className="fa-solid fa-boxes-packing"></i> 2. Select Total Order Quantity
            </h3>
            
            <div className="slider-group">
              <div className="slider-header">
                <label>Quantity Required (Units):</label>
                <span className="slider-val-badge">{formattedQuantity}</span>
              </div>
              <input 
                type="range" 
                className="range-slider" 
                min="500" 
                max="50000" 
                step="500" 
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              />
            </div>

            <h3 className="calc-step-title">
              <i className="fa-solid fa-truck-fast"></i> 3. Delivery Region
            </h3>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <div 
                className={`plate-select-card ${region === 'Pan India' ? 'active' : ''}`}
                style={{ flex: 1 }}
                onClick={() => setRegion('Pan India')}
              >
                <input 
                  type="radio" 
                  name="reactDeliveryRegion" 
                  checked={region === 'Pan India'} 
                  onChange={() => {}} 
                />
                <div className="plate-select-info">
                  <strong>Domestic (Pan India)</strong>
                  <span>Doorstep / Hub Dispatch</span>
                </div>
              </div>

              <div 
                className={`plate-select-card ${region === 'International Export' ? 'active' : ''}`}
                style={{ flex: 1 }}
                onClick={() => setRegion('International Export')}
              >
                <input 
                  type="radio" 
                  name="reactDeliveryRegion" 
                  checked={region === 'International Export'} 
                  onChange={() => {}} 
                />
                <div className="plate-select-info">
                  <strong>Export (Abroad)</strong>
                  <span>FOB / CIF Container</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Pane */}
          <div className="calc-summary-pane">
            <div>
              <h3 className="calc-step-title">
                <i className="fa-solid fa-file-invoice-dollar"></i> Wholesale Estimation
              </h3>
              
              <div className="calc-output-box">
                <div className="calc-output-row">
                  <span>Selected Products:</span>
                  <strong>{selectedProducts.length} Categories</strong>
                </div>
                <div className="calc-output-row">
                  <span>Order Volume:</span>
                  <strong>{formattedQuantity}</strong>
                </div>
                <div className="calc-output-row">
                  <span>Volume Discount Tier:</span>
                  <strong style={{ color: 'var(--color-brand-secondary)' }}>{tierName}</strong>
                </div>
                <div className="calc-output-row">
                  <span>Supply Destination:</span>
                  <strong>{region}</strong>
                </div>
                <div className="calc-output-row">
                  <span>Estimated Price Bracket:</span>
                  <strong>Competitive Factory Direct</strong>
                </div>
              </div>
            </div>

            <div>
              <button 
                className="btn btn-lg btn-primary" 
                style={{ width: '100%', marginBottom: '12px' }}
                onClick={() => onOpenQuoteModal({ quantity: formattedQuantity, products: selectedProducts, region, tier: tierName })}
              >
                <i className="fa-solid fa-paper-plane"></i> Request Official Quotation
              </button>
              <a 
                href={`https://wa.me/916309199939?text=${whatsappMessage}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-lg btn-whatsapp" 
                style={{ width: '100%' }}
              >
                <i className="fa-brands fa-whatsapp"></i> Chat On WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
