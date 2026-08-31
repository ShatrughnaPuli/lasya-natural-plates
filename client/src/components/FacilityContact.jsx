import React, { useState } from 'react';
import FactoryGallerySlideshow from './FactoryGallerySlideshow';

export default function FacilityContact() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState('slideshow'); // 'slideshow' or 'grid'

  const galleryItems = [
    {
      src: '/images/factory_hydraulic_press.jpg',
      title: 'Hydraulic Heat Moulding Unit',
      tag: '150°C Zero-Glue Press',
      desc: 'Precision heated dies that convert natural leaf sheaths into rigid, durable tableware.'
    },
    {
      src: '/images/finished_plates_packaged.jpg',
      title: 'Export-Grade Sealed Bundles',
      tag: 'Moisture-Proof Shrink Wrap',
      desc: 'Protected against humidity for long-distance domestic shipping and global container export.'
    },
    {
      src: '/images/warehouse_inventory_overview.jpg',
      title: 'Wholesale Storage & Inventory Floor',
      tag: '50,000+ Daily Capacity',
      desc: 'Extensive stock of freshly pressed, hygienic palm leaf tableware ready for immediate transport.'
    },
    {
      src: '/images/warehouse_bulk_stacks.jpg',
      title: 'Organized Wholesale Stacking',
      tag: 'Heavy Catering Batches',
      desc: 'Sorted by diameter and depth, bundled with eco-friendly bindings for caterers and event planners.'
    },
    {
      src: '/images/raw_stitched_leaves.jpg',
      title: 'Organic Shed Palm Sheaths',
      tag: '100% Fallen Leaves',
      desc: 'Naturally shed areca palm fronds sun-dried and stitched with zero chemical treatment.'
    }
  ];

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Manufacturing Hub & Headquarters</span>
          <h2 className="section-title">Visit Our Facility or Connect With Us</h2>
          <p className="section-desc">
            Direct from our Jalpally unit to your venue. We welcome B2B clients, bulk buyers, and event decorators for factory inspections.
          </p>
        </div>

        {/* Authentic Facility & Warehouse Showcase Gallery */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-brand-primary)' }}>
              <i className="fa-solid fa-camera" style={{ marginRight: '8px' }}></i> Factory & Warehouse Showcase
            </h3>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className={`filter-btn ${viewMode === 'slideshow' ? 'active' : ''}`}
                onClick={() => setViewMode('slideshow')}
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
              >
                <i className="fa-solid fa-play"></i> Live Slideshow
              </button>
              <button
                className={`filter-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
              >
                <i className="fa-solid fa-grip"></i> Photo Grid
              </button>
            </div>
          </div>

          {viewMode === 'slideshow' ? (
            <FactoryGallerySlideshow />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {galleryItems.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedImage(item)}
                  style={{
                    background: '#ffffff',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  className="gallery-card-hover"
                >
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'rgba(26, 51, 23, 0.85)',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-sm)',
                      backdropFilter: 'blur(4px)'
                    }}>
                      {item.tag}
                    </span>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(26, 51, 23, 0.25)',
                      opacity: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'opacity 0.2s ease',
                      color: '#ffffff',
                      fontSize: '1.5rem'
                    }} className="gallery-overlay">
                      <i className="fa-solid fa-magnifying-glass-plus"></i>
                    </div>
                  </div>
                  <div style={{ padding: '14px' }}>
                    <h4 style={{ fontSize: '0.98rem', color: 'var(--color-text-title)', marginBottom: '4px' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Details & Map Grid */}
        <div className="facility-grid">
          <div className="facility-card-info">
            <div className="facility-detail-item">
              <div className="facility-icon-wrap"><i className="fa-solid fa-industry"></i></div>
              <div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--color-text-title)', marginBottom: '4px' }}>Factory & Office Address</h4>
                <p style={{ color: 'var(--color-text-body)', fontSize: '0.95rem' }}>
                  #4-322/54/A/1 plot no 543, Indira Gandhi Society,<br />
                  near Sriram Nagar colony, Jalpally - 500005, Telangana, India.
                </p>
                <span style={{ display: 'inline-block', marginTop: '6px', fontSize: '0.82rem', color: 'var(--color-brand-secondary)', fontWeight: 700 }}>
                  GPS: 17°17'48.6"N 78°26'14.1"E
                </span>
              </div>
            </div>

            <div className="facility-detail-item">
              <div className="facility-icon-wrap"><i className="fa-solid fa-user-tie"></i></div>
              <div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--color-text-title)', marginBottom: '4px' }}>Contact Persons & Helplines</h4>
                <p style={{ color: 'var(--color-text-body)', fontSize: '0.95rem' }}>
                  <strong>Ravikanth SR</strong><br />
                  <a href="tel:+916309199939" style={{ color: 'var(--color-brand-primary)', fontWeight: 600 }}>+91 6309199939</a> &bull;{' '}
                  <a href="tel:+919603575915" style={{ color: 'var(--color-brand-primary)', fontWeight: 600 }}>+91 9603575915</a>
                </p>
              </div>
            </div>

            <div className="facility-detail-item">
              <div className="facility-icon-wrap"><i className="fa-solid fa-envelope"></i></div>
              <div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--color-text-title)', marginBottom: '4px' }}>Official Email & Social</h4>
                <p style={{ color: 'var(--color-text-body)', fontSize: '0.95rem' }}>
                  <a href="mailto:lasyanaturalplates@gmail.com" style={{ color: 'var(--color-brand-primary)', fontWeight: 600 }}>lasyanaturalplates@gmail.com</a><br />
                  Instagram: <a href="https://instagram.com/lasyanaturalplates" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand-secondary)', fontWeight: 600 }}>@lasyanaturalplates</a>
                </p>
              </div>
            </div>

            <div className="facility-detail-item">
              <div className="facility-icon-wrap"><i className="fa-solid fa-clock"></i></div>
              <div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--color-text-title)', marginBottom: '4px' }}>Operating Hours</h4>
                <p style={{ color: 'var(--color-text-body)', fontSize: '0.95rem' }}>
                  Monday to Saturday: <strong>9:00 AM – 6:00 PM</strong><br />
                  Sunday: Closed (Wholesale Inquiries via WhatsApp active)
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              <a href="https://maps.google.com/?q=17.296833,78.437250" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ flex: 1 }}>
                <i className="fa-solid fa-location-dot"></i> Open in Google Maps
              </a>
              <a href="tel:+916309199939" className="btn btn-primary" style={{ flex: 1 }}>
                <i className="fa-solid fa-phone"></i> Call Factory Now
              </a>
            </div>
          </div>

          <div className="facility-map-frame">
            <iframe 
              src="https://maps.google.com/maps?q=17.296833,78.437250&hl=en&z=14&output=embed" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lasya Natural Plates Factory Location"
            ></iframe>
          </div>
        </div>

        {/* Fullscreen Lightbox Modal */}
        {selectedImage && (
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 30, 13, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 3500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
            onClick={() => setSelectedImage(null)}
          >
            <div 
              style={{
                background: '#ffffff',
                maxWidth: '780px',
                width: '100%',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(0,0,0,0.5)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  zIndex: 10
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                style={{ width: '100%', maxHeight: '520px', objectFit: 'contain', background: '#112210' }}
              />

              <div style={{ padding: '24px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-brand-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {selectedImage.tag}
                </span>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-text-title)', marginTop: '4px', marginBottom: '8px' }}>
                  {selectedImage.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-body)', lineHeight: 1.6 }}>
                  {selectedImage.desc}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

