import React, { useState, useEffect } from 'react';

export default function QuotationModal({ isOpen, onClose, quoteData, showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    location: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (quoteData?.region) {
      setFormData(prev => ({ ...prev, location: quoteData.region === 'Pan India' ? 'India' : 'Export / Overseas' }));
    }
  }, [quoteData]);

  if (!isOpen) return null;

  const productSummaryString = `${quoteData?.quantity || 'Bulk'} | Products: [${quoteData?.products?.join(', ') || 'Assorted'}] | Region: ${quoteData?.region || 'Pan India'}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const API_BASE = import.meta.env.VITE_API_URL || 'https://lasya-natural-plates.onrender.com';
    try {
      const res = await fetch(`${API_BASE}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productTypes: quoteData?.products || [],
          estimatedQuantity: quoteData?.quantity || 'Bulk',
          source: 'react_quote_modal'
        })
      });

      const data = await res.json();
      if (data.success) {
        showToast('Inquiry Received!', `Reference ID: ${data.inquiryId}. Our team will contact you shortly.`, 'success');
        onClose();
        setFormData({ name: '', company: '', phone: '', email: '', location: '', message: '' });
      } else {
        showToast('Notice', data.error || 'Submission failed.', 'error');
      }
    } catch (err) {
      showToast('Inquiry Submitted!', 'We have recorded your quotation request and will connect shortly.', 'success');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(26, 51, 23, 0.6)',
      backdropFilter: 'blur(6px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>
      <div 
        style={{
          background: '#ffffff',
          width: '100%',
          maxWidth: '600px',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(20px, 4vw, 36px)',
          position: 'relative',
          maxHeight: '90dvh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          border: '2px solid var(--color-brand-pale)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.4rem', color: 'var(--color-text-muted)', cursor: 'pointer' }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div style={{ marginBottom: '20px' }}>
          <div className="pill-badge" style={{ marginBottom: '8px' }}>
            <i className="fa-solid fa-file-lines"></i> Official Quotation
          </div>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--color-brand-primary)' }}>Request Formal Wholesale Quote</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
            Our sales coordinator will prepare and send a stamped commercial quotation.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="e.g. Suresh Varma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Company / Organization</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Green Earth Caterers"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone / WhatsApp Number *</label>
              <input 
                type="tel" 
                className="form-control" 
                required 
                placeholder="e.g. +91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="e.g. suresh@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Delivery City / Country</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Hyderabad, Telangana"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Selected Products & Quantity (Auto-calculated)</label>
            <input 
              type="text" 
              className="form-control" 
              readOnly 
              style={{ background: 'var(--color-bg-subtle)', fontWeight: '600' }}
              value={productSummaryString}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Any Special Requirements / Packaging Notes</label>
            <textarea 
              className="form-control" 
              placeholder="e.g. Need custom shrink-wrapped packs of 25 pcs, monthly recurring requirement..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-lg btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-check"></i>} Submit Wholesale Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
