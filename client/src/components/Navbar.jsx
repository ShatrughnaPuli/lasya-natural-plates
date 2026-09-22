import React, { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Navbar({ onOpenAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <div onClick={() => scrollTo('home')} style={{ cursor: 'pointer' }}>
          <Logo size={42} showSubtitle={true} />
        </div>

        {/* Public Customer Navigation Links */}
        <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <li><span className="nav-link" onClick={() => scrollTo('about')}>Why Lasya</span></li>
          <li><span className="nav-link" onClick={() => scrollTo('products')}>Products</span></li>
          <li><span className="nav-link" onClick={() => scrollTo('calculator')}>Wholesale Estimator</span></li>
          <li><span className="nav-link" onClick={() => scrollTo('impact')}>Eco Impact</span></li>
          <li><span className="nav-link" onClick={() => scrollTo('process')}>Process</span></li>
          <li><span className="nav-link" onClick={() => scrollTo('brochure')}>Catalog</span></li>
          <li><span className="nav-link" onClick={() => scrollTo('contact')}>Facility</span></li>
          <li className="mobile-only-link" style={{ display: 'none' }}>
            <span 
              className="nav-link" 
              onClick={() => { setMenuOpen(false); if (onOpenAdmin) onOpenAdmin(); }}
              style={{ color: 'var(--color-earth-amber)', fontWeight: 700 }}
            >
              <i className="fa-solid fa-user-shield"></i> Owner HQ Portal
            </span>
          </li>
        </ul>

        {/* Call to Action Button */}
        <div className="header-cta-group">
          <button
            onClick={onOpenAdmin}
            title="Portal Access"
            aria-label="Staff & Owner Portal"
            className="nav-lock-btn"
          >
            <i className="fa-solid fa-lock"></i>
          </button>

          <a 
            href="https://wa.me/916309199939?text=Hello%20Lasya%20Natural%20Plates,%20I%20would%20like%20to%20inquire%20about%20wholesale%20supply." 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-whatsapp nav-inquiry-btn"
          >
            <i className="fa-brands fa-whatsapp"></i> Inquiry
          </a>

          <button 
            className="mobile-toggle" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
