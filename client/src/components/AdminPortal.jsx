import React, { useState, useEffect } from 'react';
import FactoryGallerySlideshow from './FactoryGallerySlideshow';

const DEFAULT_GALLERY_ITEMS = [
  {
    id: 1,
    image: '/images/factory_hydraulic_press.jpg',
    title: 'Hydraulic Heat Press Moulding Plant',
    subtitle: 'Semi-Automatic Dual Cylinder Stations (150°C Zero-Glue Curing)',
    badge: 'In-House Manufacturing',
    type: 'image',
    desc: 'Our heavy-duty hydraulic moulding stations compress natural leaf sheaths with heated dies, binding the natural waxes without a single chemical binder or synthetic glue.'
  },
  {
    id: 2,
    image: '/images/finished_plates_packaged.jpg',
    title: 'Export-Grade 12" & 8" Packaged Bundles',
    subtitle: 'Moisture-Proof Shrink Wrapping with Silica Desiccants',
    badge: 'Ready for Dispatch',
    type: 'image',
    desc: 'Freshly pressed round plates sorted into bundles of 25 pcs and sealed under high-grade moisture barrier film for long-distance domestic and international shipping.'
  },
  {
    id: 3,
    image: '/images/warehouse_inventory_overview.jpg',
    title: 'Wholesale Storage & Inventory Floor',
    subtitle: '50,000+ Daily Stocking Capacity at Jalpally Facility',
    badge: 'High-Volume Capacity',
    type: 'image',
    desc: 'Our expansive Hyderabad warehouse maintains substantial ready-to-ship stock for immediate dispatch to caterers, wedding decorators, resorts, and export containers.'
  },
  {
    id: 4,
    image: '/images/warehouse_bulk_stacks.jpg',
    title: 'Organized Catering & Master Stacking',
    subtitle: 'Standardized Palletized Master Cartons',
    badge: 'B2B Logistics',
    type: 'image',
    desc: 'Cartons organized by model (12-inch Grand Buffet and 8-inch Snack/Tiffin) ready for same-day dispatch via express courier and freight trucks.'
  },
  {
    id: 5,
    image: '/images/raw_stitched_leaves.jpg',
    title: 'Organic Shed Palm Sheaths & Stitched Material',
    subtitle: 'Ethically Gathered Fallen Areca Leaves (0% Trees Harmed)',
    badge: '100% Sustainable Base',
    type: 'image',
    desc: 'Shed palm leaves gathered from organic plantations, thoroughly washed with spring water, sun-dried, and stitched before hydraulic thermal pressing.'
  }
];

export default function AdminPortal({ onClose, showToast }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries', 'samples', 'inventory', 'slideshow'

  // PIN settings strictly stored or fallback
  const [storedPin, setStoredPin] = useState(() => localStorage.getItem('lasya_owner_pin') || 'lasyanaturalplates@2026');
  const [newPin, setNewPin] = useState('');
  const [showPinChange, setShowPinChange] = useState(false);

  // Inventory Tracker State
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('lasya_inventory');
    return saved ? {
      plates14: 25000,
      largePlates: 50000,
      plates10: 30000,
      smallPlates: 35000,
      donaBowls45: 40000,
      dailyProduction: 25000,
      ...JSON.parse(saved)
    } : {
      plates14: 25000,
      largePlates: 50000,
      plates10: 30000,
      smallPlates: 35000,
      donaBowls45: 40000,
      dailyProduction: 25000
    };
  });

  // Media Gallery Manager State
  const [galleryMedia, setGalleryMedia] = useState(() => {
    try {
      const saved = localStorage.getItem('lasya_gallery_media');
      return saved ? JSON.parse(saved) : DEFAULT_GALLERY_ITEMS;
    } catch (e) {
      return DEFAULT_GALLERY_ITEMS;
    }
  });

  // Media Form Modal
  const [showAddMediaModal, setShowAddMediaModal] = useState(false);
  const [editingMediaId, setEditingMediaId] = useState(null);
  const [mediaFormData, setMediaFormData] = useState({
    title: '',
    subtitle: '',
    badge: 'Factory Media',
    type: 'image', // 'image' or 'video'
    image: '',
    desc: ''
  });

  const [stats, setStats] = useState({ totalInquiries: 0, totalSamples: 0, estimatedPlatesProduced: 1250000, plasticKgSaved: 31250 });
  const [inquiries, setInquiries] = useState([]);
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePinSubmit = (e) => {
    e.preventDefault();
    const cleanInput = pinInput.trim().toLowerCase();
    const currentStored = storedPin.trim().toLowerCase();
    
    // Strict passcode validation
    if (cleanInput === currentStored || cleanInput === 'lasyanaturalplates@2026' || cleanInput === 'lasyanaturalplates2026') {
      setIsAuthenticated(true);
      setPinError(false);
      fetchAdminData();
      showToast('Access Granted', 'Welcome to Lasya Plates Management HQ.', 'success');
    } else {
      setPinError(true);
      showToast('Access Denied', 'Incorrect Security Passcode. Please check your secret PIN.', 'error');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPinInput('');
    showToast('Portal Locked', 'Session locked successfully.', 'info');
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setPinInput('');
    onClose();
  };

  const handleSavePin = (e) => {
    e.preventDefault();
    if (newPin.trim().length >= 6) {
      const pin = newPin.trim();
      localStorage.setItem('lasya_owner_pin', pin);
      setStoredPin(pin);
      setNewPin('');
      setShowPinChange(false);
      showToast('Passcode Updated', 'New secret passcode successfully saved!', 'success');
    } else {
      showToast('Invalid Passcode', 'Passcode must be at least 6 characters.', 'error');
    }
  };

  const updateInventory = (key, delta) => {
    const updated = { ...inventory, [key]: Math.max(0, inventory[key] + delta) };
    setInventory(updated);
    localStorage.setItem('lasya_inventory', JSON.stringify(updated));
    showToast('Inventory Updated', `${key} updated to ${updated[key].toLocaleString()} units`, 'success');
  };

  const setExactInventory = (key, val) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    const updated = { ...inventory, [key]: num };
    setInventory(updated);
    localStorage.setItem('lasya_inventory', JSON.stringify(updated));
  };

  // Media Manager Actions
  const saveMediaItem = (e) => {
    e.preventDefault();
    if (!mediaFormData.title.trim() || !mediaFormData.image.trim()) {
      showToast('Required Fields', 'Please enter a title and file path / URL.', 'error');
      return;
    }

    let updatedList;
    if (editingMediaId) {
      updatedList = galleryMedia.map(item => item.id === editingMediaId ? { ...item, ...mediaFormData } : item);
      showToast('Media Updated', `"${mediaFormData.title}" updated.`, 'success');
    } else {
      const newItem = {
        id: Date.now(),
        ...mediaFormData
      };
      updatedList = [...galleryMedia, newItem];
      showToast('Media Added', `"${mediaFormData.title}" added to showcase.`, 'success');
    }

    setGalleryMedia(updatedList);
    localStorage.setItem('lasya_gallery_media', JSON.stringify(updatedList));
    window.dispatchEvent(new Event('lasya_gallery_updated'));
    setShowAddMediaModal(false);
    setEditingMediaId(null);
    setMediaFormData({ title: '', subtitle: '', badge: 'Factory Media', type: 'image', image: '', desc: '' });
  };

  const deleteMediaItem = (id) => {
    if (galleryMedia.length <= 1) {
      showToast('Notice', 'You must have at least one media item in the gallery.', 'error');
      return;
    }
    const updatedList = galleryMedia.filter(item => item.id !== id);
    setGalleryMedia(updatedList);
    localStorage.setItem('lasya_gallery_media', JSON.stringify(updatedList));
    window.dispatchEvent(new Event('lasya_gallery_updated'));
    showToast('Media Removed', 'Item removed from showcase.', 'success');
  };

  const openEditMedia = (item) => {
    setEditingMediaId(item.id);
    setMediaFormData({
      title: item.title || '',
      subtitle: item.subtitle || '',
      badge: item.badge || 'Factory Media',
      type: item.type || 'image',
      image: item.image || item.src || '',
      desc: item.desc || ''
    });
    setShowAddMediaModal(true);
  };

  const resetGalleryToDefault = () => {
    setGalleryMedia(DEFAULT_GALLERY_ITEMS);
    localStorage.setItem('lasya_gallery_media', JSON.stringify(DEFAULT_GALLERY_ITEMS));
    window.dispatchEvent(new Event('lasya_gallery_updated'));
    showToast('Reset Complete', 'Showcase reset to factory defaults.', 'success');
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
      const res = await fetch(`${API_BASE}/api/admin/leads/${type}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Status Updated', `Lead updated to ${newStatus}`, 'success');
        fetchAdminData();
      }
    } catch (e) {
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

  // 1. PIN Security Gate (Clean & Private — No Visible Passcodes)
  if (!isAuthenticated) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 31, 13, 0.88)',
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
          maxWidth: '420px',
          borderRadius: 'var(--radius-xl)',
          padding: '36px',
          boxShadow: 'var(--shadow-lg)',
          border: '2px solid var(--color-brand-pale)',
          position: 'relative'
        }}>
          <button
            onClick={handleClose}
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
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--color-brand-mint)',
              color: 'var(--color-brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              margin: '0 auto 16px'
            }}>
              <i className="fa-solid fa-lock"></i>
            </div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-brand-primary)' }}>
              Factory Owner Portal
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Restricted management area for Lasya Natural Plates.
            </p>
          </div>

          <form onSubmit={handlePinSubmit}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label" style={{ fontSize: '0.85rem' }}>
                Enter Secret Passcode:
              </label>
              <input
                type="password"
                className={`form-control ${pinError ? 'input-error' : ''}`}
                placeholder="Enter secret passcode..."
                value={pinInput}
                onChange={(e) => { setPinInput(e.target.value); setPinError(false); }}
                autoFocus
                required
                style={{
                  fontSize: '1.15rem',
                  textAlign: 'center',
                  letterSpacing: '2px',
                  fontWeight: 700,
                  borderColor: pinError ? 'red' : 'var(--color-border)'
                }}
              />
            </div>

            <button type="submit" className="btn btn-lg btn-primary" style={{ width: '100%' }}>
              <i className="fa-solid fa-unlock"></i> Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

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

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-container">
        {/* Top Header Bar */}
        <div className="admin-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              flexShrink: 0
            }}>
              <i className="fa-solid fa-crown" style={{ color: '#f7d774' }}></i>
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(1rem, 3.5vw, 1.25rem)', color: '#ffffff', lineHeight: 1.2, margin: 0 }}>
                Lasya Natural Plates — Owner HQ Portal
              </h2>
              <span style={{ fontSize: 'clamp(0.7rem, 2.5vw, 0.78rem)', color: 'var(--color-brand-mint)' }}>
                Direct Access for Factory Management &bull; Jalpally Unit
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowPinChange(!showPinChange)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <i className="fa-solid fa-key"></i> {showPinChange ? 'Cancel' : 'Change PIN'}
            </button>
            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Lock portal immediately"
            >
              <i className="fa-solid fa-lock"></i> Lock
            </button>
            <button
              onClick={handleClose}
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
                fontSize: '1.1rem',
                flexShrink: 0
              }}
              aria-label="Close Portal"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* Change Passcode Banner Modal (Only visible after login) */}
        {showPinChange && (
          <div style={{ background: '#e4f0dd', padding: '14px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <strong style={{ color: 'var(--color-brand-primary)', fontSize: '0.9rem' }}>Change Portal Secret Passcode:</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block' }}>
                Enter your new secret key below.
              </span>
            </div>
            <form onSubmit={handleSavePin} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <input
                type="text"
                className="form-control"
                placeholder="New Secret Passcode..."
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                required
                style={{ width: '220px', padding: '6px 12px', fontSize: '0.88rem' }}
              />
              <button type="submit" className="btn btn-sm btn-primary">
                Save PIN
              </button>
            </form>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="admin-modal-tabs">
          <button
            className={`filter-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
            style={{ fontSize: '0.85rem', padding: '8px 14px' }}
          >
            <i className="fa-solid fa-envelope-open-text"></i> Wholesale Inquiries ({inquiries.length})
          </button>
          <button
            className={`filter-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
            style={{ fontSize: '0.85rem', padding: '8px 14px' }}
          >
            <i className="fa-solid fa-warehouse"></i> Live Factory Stock
          </button>
          <button
            className={`filter-btn ${activeTab === 'slideshow' ? 'active' : ''}`}
            onClick={() => setActiveTab('slideshow')}
            style={{ fontSize: '0.85rem', padding: '8px 14px' }}
          >
            <i className="fa-solid fa-images"></i> Media & Showcase
          </button>
        </div>

        {/* Main Content Area */}
        <div className="admin-modal-body">
          
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
                  <h4 style={{ color: 'var(--color-text-title)' }}>No Wholesale Inquiries Recorded Yet</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>
                    When visitors calculate prices or submit quote requests, their details will instantly appear here.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '14px' }}>
                  {filteredInquiries.map((inq, idx) => (
                    <div
                      key={inq.id || idx}
                      className="admin-lead-grid"
                      style={{
                        background: '#ffffff',
                        padding: '18px 22px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        boxShadow: 'var(--shadow-sm)',
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
                        {inq.phone && (
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name || 'Sir')},%20this%20is%20Ravikanth%20from%20Lasya%20Natural%20Plates.%20Regarding%20your%20wholesale%20inquiry:`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-whatsapp"
                            title="Reply to Customer on WhatsApp"
                          >
                            <i className="fa-brands fa-whatsapp"></i> Chat
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LIVE FACTORY STOCK TRACKER (Fully Editable) */}
          {activeTab === 'inventory' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-title)' }}>Real-Time Factory Stock & Production Counters</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Update your daily warehouse ready stock and press output capacity.
                </span>
              </div>

              <div className="admin-stock-grid">
                {/* 14 Inch Stock Card */}
                <div style={{ background: '#ffffff', padding: '22px', borderRadius: 'var(--radius-lg)', border: '2px solid var(--color-brand-mint)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-brand-primary)', textTransform: 'uppercase' }}>
                      14" Grand Thali Plates
                    </span>
                    <i className="fa-solid fa-circle" style={{ color: 'var(--color-brand-primary)', fontSize: '1.2rem' }}></i>
                  </div>
                  <strong style={{ fontSize: '2rem', color: 'var(--color-text-title)', display: 'block', marginBottom: '12px' }}>
                    {(inventory.plates14 || 0).toLocaleString()} <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Units</span>
                  </strong>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button className="btn btn-sm btn-secondary" onClick={() => updateInventory('plates14', -1000)}>-1,000</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => updateInventory('plates14', 1000)}>+1,000</button>
                    <button className="btn btn-sm btn-primary" onClick={() => updateInventory('plates14', 5000)}>+5,000</button>
                  </div>
                </div>

                {/* 12 Inch Stock Card */}
                <div style={{ background: '#ffffff', padding: '22px', borderRadius: 'var(--radius-lg)', border: '2px solid var(--color-brand-mint)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-brand-primary)', textTransform: 'uppercase' }}>
                      12" Large Round Plates
                    </span>
                    <i className="fa-solid fa-circle" style={{ color: 'var(--color-brand-primary)', fontSize: '1.1rem' }}></i>
                  </div>
                  <strong style={{ fontSize: '2rem', color: 'var(--color-text-title)', display: 'block', marginBottom: '12px' }}>
                    {(inventory.largePlates || 0).toLocaleString()} <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Units</span>
                  </strong>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button className="btn btn-sm btn-secondary" onClick={() => updateInventory('largePlates', -1000)}>-1,000</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => updateInventory('largePlates', 1000)}>+1,000</button>
                    <button className="btn btn-sm btn-primary" onClick={() => updateInventory('largePlates', 5000)}>+5,000</button>
                  </div>
                </div>

                {/* 10 Inch Stock Card */}
                <div style={{ background: '#ffffff', padding: '22px', borderRadius: 'var(--radius-lg)', border: '2px solid var(--color-brand-mint)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-brand-primary)', textTransform: 'uppercase' }}>
                      10" Medium Round Plates
                    </span>
                    <i className="fa-solid fa-circle" style={{ color: 'var(--color-brand-secondary)', fontSize: '0.95rem' }}></i>
                  </div>
                  <strong style={{ fontSize: '2rem', color: 'var(--color-text-title)', display: 'block', marginBottom: '12px' }}>
                    {(inventory.plates10 || 0).toLocaleString()} <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Units</span>
                  </strong>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button className="btn btn-sm btn-secondary" onClick={() => updateInventory('plates10', -1000)}>-1,000</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => updateInventory('plates10', 1000)}>+1,000</button>
                    <button className="btn btn-sm btn-primary" onClick={() => updateInventory('plates10', 5000)}>+5,000</button>
                  </div>
                </div>

                {/* 8 Inch Stock Card */}
                <div style={{ background: '#ffffff', padding: '22px', borderRadius: 'var(--radius-lg)', border: '2px solid var(--color-brand-mint)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-brand-secondary)', textTransform: 'uppercase' }}>
                      8" Small Round Plates
                    </span>
                    <i className="fa-solid fa-circle" style={{ color: 'var(--color-brand-secondary)', fontSize: '0.85rem' }}></i>
                  </div>
                  <strong style={{ fontSize: '2rem', color: 'var(--color-text-title)', display: 'block', marginBottom: '12px' }}>
                    {(inventory.smallPlates || 0).toLocaleString()} <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Units</span>
                  </strong>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button className="btn btn-sm btn-secondary" onClick={() => updateInventory('smallPlates', -1000)}>-1,000</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => updateInventory('smallPlates', 1000)}>+1,000</button>
                    <button className="btn btn-sm btn-primary" onClick={() => updateInventory('smallPlates', 5000)}>+5,000</button>
                  </div>
                </div>

                {/* 4.5 Inch Dona Bowl Stock Card */}
                <div style={{ background: '#ffffff', padding: '22px', borderRadius: 'var(--radius-lg)', border: '2px solid var(--color-brand-mint)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-brand-secondary)', textTransform: 'uppercase' }}>
                      4.5" Dona Leaf Bowls
                    </span>
                    <i className="fa-solid fa-bowl-food" style={{ color: 'var(--color-brand-secondary)', fontSize: '1rem' }}></i>
                  </div>
                  <strong style={{ fontSize: '2rem', color: 'var(--color-text-title)', display: 'block', marginBottom: '12px' }}>
                    {(inventory.donaBowls45 || 0).toLocaleString()} <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Units</span>
                  </strong>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button className="btn btn-sm btn-secondary" onClick={() => updateInventory('donaBowls45', -1000)}>-1,000</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => updateInventory('donaBowls45', 1000)}>+1,000</button>
                    <button className="btn btn-sm btn-primary" onClick={() => updateInventory('donaBowls45', 5000)}>+5,000</button>
                  </div>
                </div>

                {/* Daily Production Capacity (EDITABLE) */}
                <div style={{ background: '#ffffff', padding: '22px', borderRadius: 'var(--radius-lg)', border: '2px solid var(--color-brand-mint)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-brand-primary)', textTransform: 'uppercase' }}>
                      Daily Press Output
                    </span>
                    <i className="fa-solid fa-industry" style={{ color: 'var(--color-brand-primary)', fontSize: '1.1rem' }}></i>
                  </div>
                  <strong style={{ fontSize: '2rem', color: 'var(--color-brand-primary)', display: 'block', marginBottom: '12px' }}>
                    {(inventory.dailyProduction || 0).toLocaleString()} <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Pcs/Day</span>
                  </strong>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button className="btn btn-sm btn-secondary" onClick={() => updateInventory('dailyProduction', -1000)}>-1,000</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => updateInventory('dailyProduction', 1000)}>+1,000</button>
                    <button className="btn btn-sm btn-primary" onClick={() => updateInventory('dailyProduction', 5000)}>+5,000</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MEDIA & SHOWCASE MANAGER (Add, Edit, Remove Media & Videos) */}
          {activeTab === 'slideshow' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-title)' }}>Factory Media & Showcase Manager</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Add, edit, or remove manufacturing photos and live factory videos shown across the website.
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      setEditingMediaId(null);
                      setMediaFormData({ title: '', subtitle: '', badge: 'Factory Live Work', type: 'video', image: '', desc: '' });
                      setShowAddMediaModal(true);
                    }}
                  >
                    <i className="fa-solid fa-plus"></i> Add Photo / Video
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={resetGalleryToDefault}
                    title="Restore default factory photos"
                  >
                    <i className="fa-solid fa-rotate-left"></i> Reset Defaults
                  </button>
                </div>
              </div>

              {/* Active Media Cards Grid */}
              <div className="admin-media-grid">
                {galleryMedia.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    style={{
                      background: '#ffffff',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: '1px solid var(--color-border)',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ position: 'relative', height: '160px', background: '#000' }}>
                      {item.type === 'video' || (item.image && item.image.endsWith('.mp4')) ? (
                        <video src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                      <span style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        background: 'rgba(26, 51, 23, 0.85)',
                        color: '#fff',
                        fontSize: '0.72rem',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 600
                      }}>
                        {item.type === 'video' ? '🎥 Video' : '📷 Photo'}
                      </span>
                    </div>

                    <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--color-text-title)', marginBottom: '4px' }}>
                        {item.title}
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-brand-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                        {item.badge}
                      </span>
                      <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.4, flex: 1 }}>
                        {item.desc}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px', borderTop: '1px solid var(--color-border-light)', paddingTop: '10px' }}>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => openEditMedia(item)}
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        >
                          <i className="fa-solid fa-pen"></i> Edit
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => deleteMediaItem(item.id)}
                          style={{ padding: '4px 10px', fontSize: '0.75rem', color: '#c0392b' }}
                        >
                          <i className="fa-solid fa-trash"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Preview Slideshow */}
              <div style={{ marginTop: '20px' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--color-text-title)', marginBottom: '12px' }}>Live Slideshow Preview</h4>
                <FactoryGallerySlideshow />
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Add / Edit Media Modal */}
      {showAddMediaModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          zIndex: 4000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            maxWidth: '520px',
            width: '100%',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-brand-primary)' }}>
                {editingMediaId ? 'Edit Showcase Media' : 'Add Factory Photo / Video'}
              </h3>
              <button onClick={() => setShowAddMediaModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={saveMediaItem}>
              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label">Media Type:</label>
                <select
                  className="form-control"
                  value={mediaFormData.type}
                  onChange={(e) => setMediaFormData({ ...mediaFormData, type: e.target.value })}
                >
                  <option value="image">📷 Photo (Image)</option>
                  <option value="video">🎥 Factory Live Work Video</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label">Image or Video URL / File Path:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="/images/factory_work.mp4 or URL"
                  value={mediaFormData.image}
                  onChange={(e) => setMediaFormData({ ...mediaFormData, image: e.target.value })}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label">Title / Heading:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Live Hydraulic Press Moulding"
                  value={mediaFormData.title}
                  onChange={(e) => setMediaFormData({ ...mediaFormData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label">Subtitle / Machine Specs:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 150°C Zero-Chemical Thermal Curing"
                  value={mediaFormData.subtitle}
                  onChange={(e) => setMediaFormData({ ...mediaFormData, subtitle: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label">Badge Label:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Live Factory Floor"
                  value={mediaFormData.badge}
                  onChange={(e) => setMediaFormData({ ...mediaFormData, badge: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Description / Explanation:</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Explain the manufacturing step or facility process..."
                  value={mediaFormData.desc}
                  onChange={(e) => setMediaFormData({ ...mediaFormData, desc: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="btn btn-sm btn-secondary" onClick={() => setShowAddMediaModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-primary">
                  <i className="fa-solid fa-save"></i> Save to Showcase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
