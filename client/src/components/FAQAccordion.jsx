import React, { useState } from 'react';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What are Lasya Natural Plates made of and how are they manufactured?',
      a: 'Our plates are made entirely from naturally fallen leaves of the Areca palm tree. No trees are ever chopped or harmed. The leaves are hand-collected, washed with high-pressure spring water without chemicals or bleaches, and molded under hydraulic heat presses into rigid, elegant tableware.'
    },
    {
      q: 'Can these plates handle hot oily food, gravies, and soups without leaking?',
      a: 'Yes! The natural waxy cuticle of the areca leaf is naturally hydrophobic and oil-resistant. It easily holds boiling hot sambar, curries, and biryanis for over 4 hours without leaking, bending, or becoming soggy.'
    },
    {
      q: 'Are Lasya plates microwave and refrigerator safe?',
      a: 'Absolutely. They have an operating temperature range of -20°C (freezer safe) up to +180°C (microwave safe for up to 2 minutes), making them ideal for reheating buffet dishes.'
    },
    {
      q: 'What are the minimum order quantities (MOQ) for wholesale and export?',
      a: 'For domestic supply across India, our wholesale tiers start at 500 units up to full truckloads. For international export, we provide FOB/CIF sea and air container shipments with full phytosanitary and fumigation certifications.'
    },
    {
      q: 'What is the shelf life and how should they be stored?',
      a: 'Lasya plates have a shelf life of 18–24 months when stored in a dry, ventilated environment away from direct moisture. Every master carton is vacuum/shrink-wrapped with food-grade moisture absorbers.'
    },
    {
      q: 'How fast can a physical sample box be delivered to my address?',
      a: 'Sample kits are packed and dispatched within 24 hours of request submission from our Jalpally, Hyderabad facility via express courier.'
    }
  ];

  return (
    <section className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div className="section-header">
          <span className="section-subtitle">Got Questions?</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-desc">
            Everything you need to know about our wholesale supply, manufacturing process, and export standards.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  border: isOpen ? '1.5px solid var(--color-brand-secondary)' : '1px solid var(--color-border)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  boxShadow: isOpen ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: isOpen ? 'var(--color-brand-glow)' : '#ffffff',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: isOpen ? 'var(--color-brand-primary)' : 'var(--color-text-title)'
                  }}
                >
                  <span>{faq.q}</span>
                  <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`} style={{ color: 'var(--color-brand-secondary)', marginLeft: '16px' }}></i>
                </button>

                {isOpen && (
                  <div style={{ padding: '20px 24px', fontSize: '0.92rem', color: 'var(--color-text-body)', lineHeight: 1.7, borderTop: '1px solid var(--color-border-light)' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
