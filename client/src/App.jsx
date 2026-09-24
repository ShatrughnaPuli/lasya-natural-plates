import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import InteractivePlateVisualizer from './components/InteractivePlateVisualizer';
import MaterialComparison from './components/MaterialComparison';
import WholesaleCalculator from './components/WholesaleCalculator';
import EcoImpact from './components/EcoImpact';
import ManufacturingProcess from './components/ManufacturingProcess';
import BrochureSection from './components/BrochureSection';
import FAQAccordion from './components/FAQAccordion';
import FacilityContact from './components/FacilityContact';
import QuotationModal from './components/QuotationModal';
import AdminPortal from './components/AdminPortal';
import Footer from './components/Footer';

export default function App() {
  const [selectedProducts, setSelectedProducts] = useState(['12" Dinner Plate']);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteModalData, setQuoteModalData] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleSelectProduct = (productName) => {
    if (!selectedProducts.includes(productName)) {
      setSelectedProducts([...selectedProducts, productName]);
    }
    const calc = document.getElementById('calculator');
    if (calc) calc.scrollIntoView({ behavior: 'smooth' });
    showToast('Product Selected', `${productName} added to wholesale estimator!`, 'success');
  };

  const handleOpenQuoteModal = (data) => {
    setQuoteModalData(data);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="app-root">
      <div className="bg-eco-ambient"></div>

      <Navbar 
        onOpenAdmin={() => setIsAdminOpen(true)} 
      />

      <main>
        <Hero />
        <TrustBar />
        <InteractivePlateVisualizer 
          onSelectProduct={handleSelectProduct} 
        />
        <MaterialComparison />
        <WholesaleCalculator 
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          onOpenQuoteModal={handleOpenQuoteModal}
        />
        <EcoImpact />
        <ManufacturingProcess />
        <BrochureSection />
        <FAQAccordion />
        <FacilityContact />
      </main>

      <Footer 
        onOpenAdmin={() => setIsAdminOpen(true)} 
      />

      {/* Floating Action Buttons */}
      <div className="floating-actions-dock">
        <a 
          href="https://wa.me/916309199939?text=Hello%20Lasya%20Natural%20Plates,%20I%20am%20interested%20in%20bulk%20supply%20quotation." 
          target="_blank" 
          rel="noopener noreferrer"
          className="floating-action-circle whatsapp" 
          title="Chat on WhatsApp"
        >
          <i className="fa-brands fa-whatsapp"></i>
        </a>
        <a href="tel:+916309199939" className="floating-action-circle call" title="Call Us Directly">
          <i className="fa-solid fa-phone"></i>
        </a>
      </div>

      {/* Quotation Modal */}
      <QuotationModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)}
        quoteData={quoteModalData}
        showToast={showToast}
      />

      {/* Admin Lead Management Portal */}
      {isAdminOpen && (
        <AdminPortal 
          onClose={() => setIsAdminOpen(false)}
          showToast={showToast}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notice ${toast.type}`}>
          <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`} 
             style={{ fontSize: '1.3rem', color: toast.type === 'success' ? 'var(--color-brand-secondary)' : 'var(--color-earth-amber)' }}>
          </i>
          <div>
            <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--color-text-title)' }}>{toast.title}</strong>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-body)' }}>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
