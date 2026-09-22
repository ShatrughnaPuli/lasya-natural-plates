import React from 'react';
import Logo from './Logo';

export default function Footer({ onOpenAdmin }) {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id) => {
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
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ marginBottom: '14px' }}>
              <Logo size={42} showSubtitle={true} />
            </div>
            <p>
              Direct manufacturers & wholesale exporters of eco-friendly, 100% bio-degradable natural leaf tableware. Made with pride in Jalpally, Hyderabad.
            </p>
            <div className="footer-social-bar">
              <a href="https://instagram.com/lasyanaturalplates" target="_blank" rel="noopener noreferrer" className="social-circle-btn" title="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://wa.me/916309199939" target="_blank" rel="noopener noreferrer" className="social-circle-btn" title="WhatsApp">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a href="mailto:lasyanaturalplates@gmail.com" className="social-circle-btn" title="Email">
                <i className="fa-solid fa-envelope"></i>
              </a>
              <a href="https://maps.google.com/?q=17.296833,78.437250" target="_blank" rel="noopener noreferrer" className="social-circle-btn" title="Maps">
                <i className="fa-solid fa-location-dot"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><span onClick={() => scrollTo('about')} style={{ cursor: 'pointer' }}>Why Lasya Leaf</span></li>
              <li><span onClick={() => scrollTo('products')} style={{ cursor: 'pointer' }}>Product Line</span></li>
              <li><span onClick={() => scrollTo('calculator')} style={{ cursor: 'pointer' }}>Wholesale Estimator</span></li>
              <li><span onClick={() => scrollTo('impact')} style={{ cursor: 'pointer' }}>Environmental Impact</span></li>
              <li><span onClick={() => scrollTo('brochure')} style={{ cursor: 'pointer' }}>Export Brochure</span></li>
              <li>
                <span 
                  onClick={onOpenAdmin} 
                  style={{ cursor: 'pointer', color: 'var(--color-brand-mint)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <i className="fa-solid fa-lock"></i> Staff Portal (Protected)
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Tableware Models</h4>
            <ul className="footer-links">
              <li><span onClick={() => scrollTo('products')} style={{ cursor: 'pointer' }}>14" Grand Thali Plates (Royal Banquet)</span></li>
              <li><span onClick={() => scrollTo('products')} style={{ cursor: 'pointer' }}>12" Large Round Plates (Buffet)</span></li>
              <li><span onClick={() => scrollTo('products')} style={{ cursor: 'pointer' }}>10" Medium Round Plates (Dining/Lunch)</span></li>
              <li><span onClick={() => scrollTo('products')} style={{ cursor: 'pointer' }}>8" Small Round Plates (Snack/Tiffin)</span></li>
              <li><span onClick={() => scrollTo('products')} style={{ cursor: 'pointer' }}>4.5" Dona Leaf Bowls (Curries/Dips)</span></li>
              <li><span onClick={() => scrollTo('calculator')} style={{ cursor: 'pointer' }}>Bulk Wholesale Estimator</span></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Factory & Helplines</h4>
            <p style={{ color: '#c0dbc0', fontSize: '0.88rem', marginBottom: '10px' }}>
              #4-322/54/A/1 plot no 543, Indira Gandhi Society, near Sriram Nagar colony, Jalpally - 500005.
            </p>
            <p style={{ color: '#c0dbc0', fontSize: '0.88rem', marginBottom: '14px' }}>
              <strong>Ravikanth SR:</strong> +91 6309199939 / +91 9603575915
            </p>
            <div>
              <button 
                onClick={() => scrollTo('sample-box')}
                className="btn btn-sm btn-secondary" 
                style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
              >
                Request Sample Box
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <span>&copy; {currentYear} Lasya Natural Plates. All Rights Reserved.</span>
          <span>Good for You, Good for Nature &bull; Serve Nature, Save Future</span>
        </div>
      </div>
    </footer>
  );
}
