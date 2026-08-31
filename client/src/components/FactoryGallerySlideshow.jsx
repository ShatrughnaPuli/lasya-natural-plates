import React, { useState, useEffect } from 'react';

export default function FactoryGallerySlideshow() {
  const slides = [
    {
      id: 1,
      image: '/images/factory_hydraulic_press.jpg',
      title: 'Hydraulic Heat Press Moulding Plant',
      subtitle: 'Semi-Automatic Dual Cylinder Stations (150°C Zero-Glue Curing)',
      badge: 'In-House Manufacturing',
      desc: 'Our heavy-duty hydraulic moulding stations compress natural leaf sheaths with heated dies, binding the natural waxes without a single chemical binder or synthetic glue.'
    },
    {
      id: 2,
      image: '/images/finished_plates_packaged.jpg',
      title: 'Export-Grade 12" & 8" Packaged Bundles',
      subtitle: 'Moisture-Proof Shrink Wrapping with Silica Desiccants',
      badge: 'Ready for Dispatch',
      desc: 'Freshly pressed round plates sorted into bundles of 25 pcs and sealed under high-grade moisture barrier film for long-distance domestic and international shipping.'
    },
    {
      id: 3,
      image: '/images/warehouse_inventory_overview.jpg',
      title: 'Wholesale Storage & Inventory Floor',
      subtitle: '50,000+ Daily Stocking Capacity at Jalpally Facility',
      badge: 'High-Volume Capacity',
      desc: 'Our expansive Hyderabad warehouse maintains substantial ready-to-ship stock for immediate dispatch to caterers, wedding decorators, resorts, and export containers.'
    },
    {
      id: 4,
      image: '/images/warehouse_bulk_stacks.jpg',
      title: 'Organized Catering & Master Stacking',
      subtitle: 'Standardized Palletized Master Cartons',
      badge: 'B2B Logistics',
      desc: 'Cartons organized by model (12-inch Grand Buffet and 8-inch Snack/Tiffin) ready for same-day dispatch via express courier and freight trucks.'
    },
    {
      id: 5,
      image: '/images/raw_stitched_leaves.jpg',
      title: 'Organic Shed Palm Sheaths & Stitched Material',
      subtitle: 'Ethically Gathered Fallen Areca Leaves (0% Trees Harmed)',
      badge: '100% Sustainable Base',
      desc: 'Shed palm leaves gathered from organic plantations, thoroughly washed with spring water, sun-dried, and stitched before hydraulic thermal pressing.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const currentSlide = slides[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="factory-slideshow-container" style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: '#0d1f0b', boxShadow: 'var(--shadow-lg)', border: '2px solid var(--color-brand-pale)' }}>
      {/* Main Slide Display */}
      <div style={{ position: 'relative', height: '440px', overflow: 'hidden' }}>
        <img
          src={currentSlide.image}
          alt={currentSlide.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s ease, opacity 0.5s ease',
            filter: 'brightness(0.92)'
          }}
        />

        {/* Ambient Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(13, 31, 11, 0.95) 0%, rgba(13, 31, 11, 0.4) 50%, rgba(0,0,0,0.15) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px'
        }}>
          {/* Top Bar Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <i className="fa-solid fa-camera"></i> {currentSlide.badge} &bull; Slide {currentIndex + 1} of {slides.length}
            </span>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(8px)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                title={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play'}
              >
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i> {isPlaying ? 'Autoplay ON' : 'Paused'}
              </button>

              <button
                onClick={() => setIsFullscreen(true)}
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(8px)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                title="View Fullscreen"
              >
                <i className="fa-solid fa-expand"></i> Fullscreen
              </button>
            </div>
          </div>

          {/* Bottom Caption */}
          <div>
            <span style={{ color: 'var(--color-brand-mint)', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {currentSlide.subtitle}
            </span>
            <h3 style={{ color: '#ffffff', fontSize: '1.6rem', marginTop: '4px', marginBottom: '8px' }}>
              {currentSlide.title}
            </h3>
            <p style={{ color: '#d2e4cb', fontSize: '0.92rem', lineHeight: 1.5, maxWidth: '680px' }}>
              {currentSlide.desc}
            </p>
          </div>
        </div>

        {/* Next / Prev Navigation Buttons */}
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(6px)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '50%',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.1rem',
            zIndex: 10
          }}
          aria-label="Previous Slide"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(6px)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '50%',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.1rem',
            zIndex: 10
          }}
          aria-label="Next Slide"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* Thumbnail Strip Selector */}
      <div style={{
        background: '#122610',
        padding: '14px 20px',
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        {slides.map((s, idx) => (
          <div
            key={s.id}
            onClick={() => setCurrentIndex(idx)}
            style={{
              position: 'relative',
              width: '90px',
              height: '60px',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              flexShrink: 0,
              cursor: 'pointer',
              border: currentIndex === idx ? '3px solid var(--color-brand-light)' : '2px solid transparent',
              opacity: currentIndex === idx ? 1 : 0.6,
              transition: 'all 0.25s ease'
            }}
          >
            <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(8, 18, 7, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 4000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px'
          }}
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              background: 'rgba(255,255,255,0.2)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              fontSize: '1.3rem',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div
            style={{ maxWidth: '960px', width: '100%', textAlign: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              style={{
                maxHeight: '70vh',
                maxWidth: '100%',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                border: '3px solid var(--color-brand-pale)'
              }}
            />
            <div style={{ marginTop: '16px', color: '#ffffff' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-brand-mint)', fontWeight: 700, textTransform: 'uppercase' }}>
                {currentSlide.badge}
              </span>
              <h3 style={{ fontSize: '1.5rem', marginTop: '4px', marginBottom: '6px' }}>{currentSlide.title}</h3>
              <p style={{ fontSize: '0.95rem', color: '#c5dec0', maxWidth: '700px', margin: '0 auto' }}>{currentSlide.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
