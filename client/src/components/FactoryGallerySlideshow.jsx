import React, { useState, useEffect } from 'react';

const DEFAULT_SLIDES = [
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

export default function FactoryGallerySlideshow() {
  const [slides, setSlides] = useState(() => {
    try {
      const saved = localStorage.getItem('lasya_gallery_media');
      return saved ? JSON.parse(saved) : DEFAULT_SLIDES;
    } catch (e) {
      return DEFAULT_SLIDES;
    }
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem('lasya_gallery_media');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.length > 0) {
            setSlides(parsed);
            if (currentIndex >= parsed.length) setCurrentIndex(0);
          }
        }
      } catch (e) {}
    };

    window.addEventListener('lasya_gallery_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('lasya_gallery_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (!isPlaying || !slides.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  if (!slides || slides.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: 'var(--radius-lg)' }}>
        <p>No media in gallery.</p>
      </div>
    );
  }

  const safeIndex = Math.min(currentIndex, slides.length - 1);
  const currentSlide = slides[safeIndex] || slides[0];
  const isVideo = currentSlide.type === 'video' || (currentSlide.image && (currentSlide.image.endsWith('.mp4') || currentSlide.image.endsWith('.webm') || currentSlide.image.endsWith('.mov')));

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="factory-slideshow-wrap" style={{ position: 'relative', width: '100%', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', background: '#132311' }}>
      {/* Main Showcase Stage */}
      <div style={{ position: 'relative', height: '480px', width: '100%', overflow: 'hidden' }}>
        {isVideo ? (
          <video
            key={currentSlide.image}
            src={currentSlide.image}
            controls
            autoPlay={isPlaying}
            muted
            loop
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <img
            key={currentSlide.image}
            src={currentSlide.image}
            alt={currentSlide.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              animation: 'galleryZoomFade 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
        )}

        {/* Gradient Overlay for Text Readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(10, 24, 8, 0.92) 0%, rgba(10, 24, 8, 0.35) 45%, rgba(0, 0, 0, 0.1) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Top Control Badges */}
        <div style={{ position: 'absolute', top: '16px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{
              background: 'rgba(255, 255, 255, 0.22)',
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
              <i className={isVideo ? 'fa-solid fa-video' : 'fa-solid fa-camera'}></i> {currentSlide.badge || 'Verified Facility Photo'}
            </span>
            <span style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(6px)',
              color: 'var(--color-brand-mint)',
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 600
            }}>
              {safeIndex + 1} / {slides.length}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#ffffff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title={isPlaying ? 'Pause Slideshow' : 'Auto Play'}
            >
              <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#ffffff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Full Screen Theater View"
            >
              <i className="fa-solid fa-expand"></i>
            </button>
          </div>
        </div>

        {/* Left / Right Nav Arrows */}
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: '16px',
            top: '45%',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#ffffff',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            fontSize: '1.1rem'
          }}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '16px',
            top: '45%',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#ffffff',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            fontSize: '1.1rem'
          }}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        {/* Caption & Technical Explanation Bar */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '20px',
          right: '20px',
          zIndex: 10,
          color: '#ffffff'
        }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {currentSlide.title}
          </h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-brand-mint)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
            {currentSlide.subtitle}
          </span>
          <p style={{ fontSize: '0.82rem', color: '#d8e5d3', lineHeight: 1.45, maxWidth: '780px', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
            {currentSlide.desc}
          </p>
        </div>
      </div>

      {/* Thumbnail Strip Selector */}
      <div style={{
        background: '#0d1a0b',
        padding: '12px 16px',
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        {slides.map((slide, idx) => (
          <button
            key={slide.id || idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              flex: '0 0 90px',
              height: '56px',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              border: safeIndex === idx ? '2px solid var(--color-brand-secondary)' : '2px solid transparent',
              opacity: safeIndex === idx ? 1 : 0.55,
              transform: safeIndex === idx ? 'scale(1.04)' : 'scale(1)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              padding: 0,
              background: '#000',
              position: 'relative'
            }}
          >
            {slide.type === 'video' ? (
              <div style={{ width: '100%', height: '100%', background: '#1c3017', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem' }}>
                <i className="fa-solid fa-play"></i>
              </div>
            ) : (
              <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
          </button>
        ))}
      </div>

      {/* Fullscreen Modal View */}
      {isFullscreen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          zIndex: 4000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <button
            onClick={() => setIsFullscreen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '1.8rem',
              cursor: 'pointer'
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>
            {isVideo ? (
              <video src={currentSlide.image} controls autoPlay loop style={{ maxHeight: '68vh', maxWidth: '100%', borderRadius: 'var(--radius-lg)', boxShadow: '0 10px 40px rgba(0,0,0,0.8)' }} />
            ) : (
              <img src={currentSlide.image} alt={currentSlide.title} style={{ maxHeight: '68vh', maxWidth: '100%', borderRadius: 'var(--radius-lg)', boxShadow: '0 10px 40px rgba(0,0,0,0.8)' }} />
            )}
            <h3 style={{ color: '#ffffff', marginTop: '16px', fontSize: '1.3rem' }}>{currentSlide.title}</h3>
            <p style={{ color: '#c4d7c0', fontSize: '0.88rem', marginTop: '4px' }}>{currentSlide.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
