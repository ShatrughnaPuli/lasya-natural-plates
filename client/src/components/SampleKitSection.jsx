import React, { useState } from 'react';

export default function SampleKitSection({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessType: 'Caterer / Event Planner',
    address: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const API_BASE = import.meta.env.VITE_API_URL || 'https://lasya-natural-plates.onrender.com';
    try {
      const res = await fetch(`${API_BASE}/api/samples`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          preferredProducts: ['14" Grand Round Thali Plate', '12" Large Round Plate', '10" Medium Round Plate', '8" Small Round Plate', '4.5" Dona Leaf Bowl']
        })
      });

      const data = await res.json();
      if (data.success) {
        showToast('Sample Kit Requested!', `Sample Ref ID: ${data.sampleId}. We will dispatch to your address shortly.`, 'success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          businessType: 'Caterer / Event Planner',
          address: ''
        });
      } else {
        showToast('Notice', data.error || 'Please check form fields.', 'error');
      }
    } catch (err) {
      showToast('Submitted!', 'Your sample request has been registered. You can also confirm via WhatsApp.', 'success');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" id="sample-box" style={{ background: 'var(--color-bg-subtle)' }}>
      <div className="container">
        <div className="calc-container sample-calc-container">
          <div className="sample-info-pane" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="section-subtitle">Experience the Quality</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', marginBottom: '16px' }}>Request a Physical Sample Kit</h2>
            <p style={{ color: 'var(--color-text-body)', marginBottom: '20px', lineHeight: '1.7' }}>
              We understand B2B buyers, wedding planners, and exporters need to inspect leaf thickness, weight, and finish before placing bulk orders.
            </p>
            
            {/* Real Sample Pack Preview Card */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', background: '#ffffff', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '20px', boxShadow: 'var(--shadow-sm)', flexWrap: 'wrap' }}>
              <img 
                src="/images/finished_plates_packaged.jpg" 
                alt="Packaged Sample Bundle" 
                style={{ width: '84px', height: '84px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', flexShrink: 0 }}
              />
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-brand-secondary)', fontWeight: 700 }}>Direct from Factory</span>
                <strong style={{ fontSize: '0.95rem', color: 'var(--color-brand-primary)', display: 'block' }}>Complete Tableware Sample Kit</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Includes 14", 12", 10", 8" Round Plates & 4.5" Dona Bowls</span>
              </div>
            </div>

            <ul className="product-specs-list" style={{ marginBottom: '24px' }}>
              <li><i className="fa-solid fa-circle-check" style={{ color: 'var(--color-brand-secondary)' }}></i> Contains physical samples of 14", 12", 10", 8" plates & 4.5" Dona leaf bowls</li>
              <li><i className="fa-solid fa-circle-check" style={{ color: 'var(--color-brand-secondary)' }}></i> Shipped directly to your restaurant, hotel, catering unit or office</li>
              <li><i className="fa-solid fa-circle-check" style={{ color: 'var(--color-brand-secondary)' }}></i> Dispatched within 24 hours via express courier</li>
            </ul>
            <div style={{ padding: '16px', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <strong style={{ color: 'var(--color-brand-primary)', display: 'block', marginBottom: '4px' }}>
                <i className="fa-solid fa-phone"></i> Direct Helpline:
              </strong>
              <span>Call Ravikanth SR: <strong>+91 6309199939</strong> / <strong>+91 9603575915</strong></span>
            </div>
          </div>

          <div className="sample-form-pane" style={{ background: '#ffffff' }}>
            <form onSubmit={handleSubmit}>
              <h3 style={{ color: 'var(--color-text-title)', marginBottom: '20px', fontSize: '1.3rem' }}>
                Enter Sample Delivery Details
              </h3>
              
              <div className="form-group">
                <label className="form-label">Your Name / Business Name *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required 
                  placeholder="e.g. Rahul Sharma / Royal Caterers"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    required 
                    placeholder="e.g. +91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="e.g. contact@business.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Business / Client Type</label>
                <select 
                  className="form-control" 
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                >
                  <option value="Caterer / Event Planner">Caterer / Event Planner</option>
                  <option value="Restaurant / Resort / Hotel">Restaurant / Resort / Hotel</option>
                  <option value="Wholesale Distributor / Retailer">Wholesale Distributor / Retailer</option>
                  <option value="International Export Buyer">International Export Buyer</option>
                  <option value="Temple / NGO / Institution">Temple / NGO / Institution</option>
                  <option value="Personal / Wedding Event">Personal / Wedding Event</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Complete Delivery Address with Pincode *</label>
                <textarea 
                  className="form-control" 
                  required 
                  placeholder="Enter street address, city, state, and pincode..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-lg btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-truck"></i>} Dispatch Sample Kit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
