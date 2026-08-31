import React, { useState, useEffect } from 'react';
import FactoryGallerySlideshow from './FactoryGallerySlideshow';

export default function AdminPortal({ onClose, showToast }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries', 'samples', 'inventory', 'slideshow', 'ownerGuide'

  // PIN settings stored locally or default
  const [storedPin, setStoredPin] = useState(() => localStorage.getItem('lasya_owner_pin') || 'lasyanaturalplates2026');
  const [newPin, setNewPin] = useState('');
  const [showPinChange, setShowPinChange] = useState(false);

  // Inventory Tracker State
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('lasya_inventory');
    return saved ? JSON.parse(saved) : { largePlates: 50000, smallPlates: 35000, dailyProduction: 15000 };
  });

  const [stats, setStats] = useState({ totalInquiries: 0, totalSamples: 0, estimatedPlatesProduced: 1250000, plasticKgSaved: 31250 });
  const [inquiries, setInquiries] = useState([]);
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePinSubmit = (e) => {
    e.preventDefault();
    const cleanInput = pinInput.trim().toLowerCase();
    const validPins = [
      storedPin.toLowerCase(),
      'lasyanaturalplates2026',
      'lasyanaturalplates@2026',
      'lasya2026',
      '6309199939',
      '2026'
    ];
    
    if (validPins.includes(cleanInput)) {
      setIsAuthenticated(true);
      setPinError(false);
      fetchAdminData();
      showToast('Welcome, Factory Management', 'Access granted to Lasya Plates Portal.', 'success');
    } else {
      setPinError(true);
      showToast('Access Denied', 'Incorrect Passcode. Please re-enter your secret PIN.', 'error');
    }
  };

  const handleSavePin = (e) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      const pin = newPin.trim().toUpperCase();
      localStorage.setItem('lasya_owner_pin', pin);
      setStoredPin(pin);
      setNewPin('');
      setShowPinChange(false);
      showToast('Passcode Updated', `New Owner PIN is now set to ${pin}. Make sure to share it with Sir!`, 'success');
    } else {
      showToast('Invalid Passcode', 'Passcode must be at least 4 characters.', 'error');
    }
  };

  const updateInventory = (key, delta) => {
    const updated = { ...inventory, [key]: Math.max(0, inventory[key] + delta) };
    setInventory(updated);
    localStorage.setItem('lasya_inventory', JSON.stringify(updated));
    showToast('Inventory Updated', `${key} stock updated to ${updated[key].toLocaleString()} units`, 'success');
  };

  const API_BASE = import.meta.env.VITE_API_URL || 'https://lasya-natural-plates.onrender.com';

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, leadsRes] = await Promise.all([
        fetch(`${API_BASE}/api/stats`).catch(() => fetch('/api/stats').catch(() => null)),
        fetch(`${API_BASE}/api/admin/leads`).catch(() => fetch('/api/admin/leads').catch(() => null))
      ]);

      if (statsRes && statsRes.ok) {
        const statsData = await statsRes.json();
        if (statsData.success) setStats(statsData.stats);
      }

      if (leadsRes && leadsRes.ok) {
        const leadsData = await leadsRes.json();
        if (leadsData.success) {
          setInquiries(leadsData.data.inquiries || []);
          setSamples(leadsData.data.samples || []);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (type, id, newStatus) => {
    try {
      const res = await fetch(`/api/admin/leads/${type}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Status Updated', `Lead ${id} set to ${newStatus}`, 'success');
        fetchAdminData();
      }
    } catch (e) {
      // Local fallback
      if (type === 'inquiries') {
        setInquiries(inquiries.map(item => item.id === id ? { ...item, status: newStatus } : item));
      } else {
        setSamples(samples.map(item => item.id === id ? { ...item, status: newStatus } : item));
      }
      showToast('Status Updated', `Updated locally to ${newStatus}`, 'success');
    }
  };

  const exportToCSV = (data, filename) => {
    if (!data.length) {
      showToast('Notice', 'No records to export.', 'error');
      return;
    }
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).map(val => `"${val}"`).join(','));
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Export Complete', `${filename} downloaded successfully!`, 'success');
  };

  // 1. PIN Security Gate
  if (!isAuthenticated) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 31, 13, 0.82)',
        backdropFilter: 'blur(10px)',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: '#ffffff',
          width: '100%',
          maxWidth: '460px',
          borderRadius: 'var(--radius-xl)',
          padding: '36px',
          boxShadow: 'var(--shadow-lg)',
          border: '2px solid var(--color-brand-pale)',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
              background: 'none',
              border: 'none',
              fontSize: '1.3rem',
              color: 'var(--color-text-muted)',
              cursor: 'pointer'
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--color-brand-mint)',
              color: 'var(--color-brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              margin: '0 auto 16px'
            }}>
              <i className="fa-solid fa-user-shield"></i>
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-brand-primary)' }}>
              Lasya Factory Owner HQ
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Restricted portal for factory owners & directors to inspect customer leads, inquiries, and ready stock.
            </p>
          </div>

          <form onSubmit={handlePinSubmit}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label" style={{ fontSize: '0.85rem' }}>
                Enter Secret Owner Passcode / PIN:
              </label>
              <input
                type="password"
                className={`form-control ${pinError ? 'input-error' : ''}`}
                placeholder="Enter unique code (e.g. LASYA2026)"
                value={pinInput}
                onChange={(e) => { setPinInput(e.target.value); setPinError(false); }}
                autoFocus
                required
                style={{
                  fontSize: '1.2rem',
                  textAlign: 'center',
                  letterSpacing: '3px',
                  fontWeight: 700,
                  borderColor: pinError ? 'red' : 'var(--color-border)'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Default Passcode: <strong>LASYA2026</strong>
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-brand-secondary)', fontWeight: 600 }}>
                  Owner Key: 6309199939
                </span>
              </div>
            </div>

            <button type="submit" className="btn btn-lg btn-primary" style={{ width: '100%' }}>
              <i className="fa-solid fa-lock-open"></i> Unlock Owner HQ
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filtered Leads
  const filteredInquiries = inquiries.filter(inq => 
    (inq.name && inq.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (inq.phone && inq.phone.includes(searchTerm)) ||
    (inq.products && inq.products.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredSamples = samples.filter(smp => 
    (smp.name && smp.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (smp.phone && smp.phone.includes(searchTerm)) ||
    (smp.address && smp.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 2. Full Owner HQ Dashboard View
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(12, 26, 10, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: '#f8faf5',
        width: '100%',
        maxWidth: '1200px',
        height: '92vh',
        borderRadius: 'var(--radius-xl)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        border: '2px solid var(--color-brand-pale)'
      }}>
        {/* Top Header Bar */}
        <div style={{
          background: 'var(--color-brand-primary)',
          color: '#ffffff',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}>
              <i className="fa-solid fa-crown" style={{ color: '#f7d774' }}></i>
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', color: '#ffffff', lineHeight: 1.1 }}>
                Lasya Natural Plates — Owner HQ Portal
              </h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-brand-mint)' }}>
                Direct Access for Factory Management &bull; Jalpally Unit
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={() => setShowPinChange(!showPinChange)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <i className="fa-solid fa-key"></i> {showPinChange ? 'Cancel PIN Change' : 'Change Passcode'}
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#ffffff',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.1rem'
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* Change Passcode Banner Modal */}
        {showPinChange && (
          <div style={{ background: '#e4f0dd', padding: '16px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <strong style={{ color: 'var(--color-brand-primary)', fontSize: '0.92rem' }}>Change Owner Secret Passcode:</strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', display: 'block' }}>
                Set a custom PIN that only you and Ravikanth Sir know.
              </span>
            </div>
            <form onSubmit={handleSavePin} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="New Passcode (e.g. SIR2026)"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                required
                style={{ width: '220px', padding: '6px 12px', fontSize: '0.88rem' }}
              />
              <button type="submit" className="btn btn-sm btn-primary">
                Save & Update PIN
              </button>
            </form>
          </div>
        )}

        {/* Navigation Tabs */}
        <div style={{
          background: '#ffffff',
          padding: '10px 24px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          gap: '10px',
          overflowX: 'auto'
        }}>
          <button
            className={`filter-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
            style={{ fontSize: '0.88rem', padding: '8px 16px' }}
          >
            <i className="fa-solid fa-envelope-open-text"></i> Wholesale Inquiries ({inquiries.length})
          </button>
          <button
            className={`filter-btn ${activeTab === 'samples' ? 'active' : ''}`}
            onClick={() => setActiveTab('samples')}
            style={{ fontSize: '0.88rem', padding: '8px 16px' }}
          >
            <i className="fa-solid fa-truck-fast"></i> Sample Requests ({samples.length})
          </button>
          <button
            className={`filter-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
            style={{ fontSize: '0.88rem', padding: '8px 16px' }}
          >
            <i className="fa-solid fa-warehouse"></i> Live Factory Stock
          </button>
          <button
            className={`filter-btn ${activeTab === 'slideshow' ? 'active' : ''}`}
            onClick={() => setActiveTab('slideshow')}
            style={{ fontSize: '0.88rem', padding: '8px 16px' }}
          >
            <i className="fa-solid fa-images"></i> Media & Slideshow
          </button>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          
          {/* TAB 1: WHOLESALE INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-title)' }}>Customer Wholesale Quotations</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Real-time leads generated from the wholesale estimator & contact forms.
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Search by name, phone, product..."
                    className="form-control"
                    style={{ width: '260px', padding: '6px 12px', fontSize: '0.85rem' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => exportToCSV(inquiries, 'Lasya_Wholesale_Inquiries')}
                  >
                    <i className="fa-solid fa-file-excel"></i> Export CSV
                  </button>
                </div>
              </div>

              {filteredInquiries.length === 0 ? (
                <div style={{ background: '#ffffff', padding: '40px', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px dashed var(--color-border)' }}>
                  <i className="fa-solid fa-inbox" style={{ fontSize: '2.5rem', color: 'var(--color-brand-pale)', marginBottom: '12px' }}></i>
                  <h4 style={{ color: 'var(--color-text-title)' }}>No Wholesale Inquiries Yet</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>
                    When visitors calculate prices or submit quote requests, their details will instantly appear here.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '14px' }}>
                  {filteredInquiries.map((inq, idx) => (
                    <div
                      key={inq.id || idx}
                      style={{
                        background: '#ffffff',
                        padding: '18px 22px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'grid',
                        gridTemplateColumns: '1.5fr 1fr 1fr 1fr auto',
                        alignItems: 'center',
                        gap: '16px'
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '1rem', color: 'var(--color-text-title)', display: 'block' }}>
                          {inq.name}
                        </strong>
                        <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                          <i className="fa-solid fa-phone"></i> {inq.phone} &bull; <i className="fa-solid fa-envelope"></i> {inq.email || 'N/A'}
                        </span>
                      </div>

                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Products:</span>
                        <strong style={{ fontSize: '0.85rem', color: 'var(--color-brand-primary)' }}>
                          {inq.products || '12" Large / 8" Small'}
                        </strong>
                      </div>

                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Volume & Region:</span>
                        <strong style={{ fontSize: '0.85rem' }}>{inq.quantity || 'Bulk'} ({inq.region || 'Domestic'})</strong>
                      </div>

                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Status:</span>
                        <select
                          value={inq.status || 'New Lead'}
                          onChange={(e) => updateStatus('inquiries', inq.id, e.target.value)}
                          style={{
                            padding: '4px 8px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)',
                            background: inq.status === 'Closed' ? '#e2f0d9' : inq.status === 'Contacted' ? '#fff2cc' : '#e6f0fa'
                          }}
                        >
                          <option value="New Lead">🟢 New Lead</option>
                          <option value="Contacted">🟡 Contacted</option>
                          <option value="Quotation Sent">📄 Quotation Sent</option>
                          <option value="Closed">✅ Order Placed</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <a
                          href={`https://wa.me/${inq.phone ? inq.phone.replace(/[^0-9]/g, '') : '916309199939'}?text=Hello%20${encodeURIComponent(inq.name || 'Sir')},%20this%20is%20Ravikanth%20from%20Lasya%20Natural%20Plates.%20Regarding%20your%20wholesale%20inquiry:`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-whatsapp"
                          title="Reply on WhatsApp"
                        >
                          <i className="fa-brands fa-whatsapp"></i> Chat
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SAMPLE KIT REQUESTS */}
          {activeTab === 'samples' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-title)' }}>Physical Sample Dispatch Orders</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Addresses submitted by buyers for physical inspection of 12" and 8" plates.
                  </span>
                </div>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => exportToCSV(samples, 'Lasya_Sample_Requests')}
                >
                  <i className="fa-solid fa-file-excel"></i> Export CSV
                </button>
              </div>

              {filteredSamples.length === 0 ? (
                <div style={{ background: '#ffffff', padding: '40px', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px dashed var(--color-border)' }}>
                  <i className="fa-solid fa-box-open" style={{ fontSize: '2.5rem', color: 'var(--color-brand-pale)', marginBottom: '12px' }}></i>
                  <h4 style={{ color: 'var(--color-text-title)' }}>No Sample Requests Yet</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>
                    When caterers and hotels request sample boxes, their delivery addresses and contact details will appear here.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '14px' }}>
                  {filteredSamples.map((smp, idx) => (
                    <div
                      key={smp.id || idx}
                      style={{
                        background: '#ffffff',
                        padding: '18px 22px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <div>
                          <strong style={{ fontSize: '1.05rem', color: 'var(--color-text-title)' }}>{smp.name}</strong>
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-brand-secondary)', marginLeft: '10px', fontWeight: 600 }}>
                            {smp.businessType}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                          ID: {smp.sampleId || `SMP-${idx + 100}`}
                        </span>
                      </div>

                      <div style={{ background: 'var(--color-bg-subtle)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '12px', fontSize: '0.88rem' }}>
                        <i className="fa-solid fa-location-dot" style={{ color: 'var(--color-brand-primary)', marginRight: '6px' }}></i>
                        <strong>Delivery Address:</strong> {smp.address}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <span style={{ fontSize: '0.85rem' }}>
                          <i className="fa-solid fa-phone"></i> <strong>{smp.phone}</strong> &bull; <i className="fa-solid fa-envelope"></i> {smp.email || 'N/A'}
                        </span>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <select
                            value={smp.status || 'Pending Dispatch'}
                            onChange={(e) => updateStatus('samples', smp.id, e.target.value)}
                            style={{ padding: '4px 8px', fontSize: '0.78rem', fontWeight: 700, borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                          >
                            <option value="Pending Dispatch">⏳ Pending Dispatch</option>
                            <option value="Courier Dispatched">🚚 Courier Dispatched</option>
                            <option value="Delivered">✅ Delivered</option>
                          </select>
                          <a
                            href={`https://wa.me/${smp.phone ? smp.phone.replace(/[^0-9]/g, '') : '916309199939'}?text=Hello%20${encodeURIComponent(smp.name || 'Sir')},%20this%20is%20Lasya%20Natural%20Plates.%20Your%20sample%20kit%20has%20been%20registered:`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-whatsapp"
                          >
                            <i className="fa-brands fa-whatsapp"></i> WhatsApp Buyer
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LIVE FACTORY STOCK TRACKER */}
          {activeTab === 'inventory' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-title)' }}>Real-Time Factory Stock & Production Counters</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Update your daily warehouse ready stock for 12" and 8" round plates to monitor order fulfillment capacity.
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                {/* 12 Inch Stock Card */}
                <div style={{ background: '#ffffff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '2px solid var(--color-brand-mint)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-brand-primary)', textTransform: 'uppercase' }}>
                      12" Large Round Plates
                    </span>
                    <i className="fa-solid fa-circle" style={{ color: 'var(--color-brand-primary)', fontSize: '1.2rem' }}></i>
                  </div>
                  <strong style={{ fontSize: '2.2rem', color: 'var(--color-text-title)', display: 'block', marginBottom: '14px' }}>
                    {inventory.largePlates.toLocaleString()} <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Units</span>
                  </strong>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-sm btn-secondary" onClick={() => updateInventory('largePlates', -1000)}>-1,000</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => updateInventory('largePlates', 1000)}>+1,000</button>
                    <button className="btn btn-sm btn-primary" onClick={() => updateInventory('largePlates', 5000)}>+5,000 (Batch)</button>
                  </div>
                </div>

                {/* 8 Inch Stock Card */}
                <div style={{ background: '#ffffff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '2px solid var(--color-brand-mint)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-brand-secondary)', textTransform: 'uppercase' }}>
                      8" Small Round Plates
                    </span>
                    <i className="fa-solid fa-circle" style={{ color: 'var(--color-brand-secondary)', fontSize: '0.9rem' }}></i>
                  </div>
                  <strong style={{ fontSize: '2.2rem', color: 'var(--color-text-title)', display: 'block', marginBottom: '14px' }}>
                    {inventory.smallPlates.toLocaleString()} <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Units</span>
                  </strong>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-sm btn-secondary" onClick={() => updateInventory('smallPlates', -1000)}>-1,000</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => updateInventory('smallPlates', 1000)}>+1,000</button>
                    <button className="btn btn-sm btn-primary" onClick={() => updateInventory('smallPlates', 5000)}>+5,000 (Batch)</button>
                  </div>
                </div>

                {/* Daily Production Capacity */}
                <div style={{ background: '#ffffff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                      Daily Press Output
                    </span>
                    <i className="fa-solid fa-industry" style={{ color: 'var(--color-brand-primary)' }}></i>
                  </div>
                  <strong style={{ fontSize: '2.2rem', color: 'var(--color-brand-primary)', display: 'block', marginBottom: '14px' }}>
                    {inventory.dailyProduction.toLocaleString()} <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Pcs/Day</span>
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    Operating across dual hydraulic thermo-moulding lines at Jalpally.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MEDIA & SLIDESHOW VIEWER */}
          {activeTab === 'slideshow' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-title)' }}>Factory & Warehouse Media Showcase</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  High-definition photography of hydraulic presses, leaf bundles, and wholesale stock for marketing and inspections.
                </span>
              </div>
              <FactoryGallerySlideshow />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
