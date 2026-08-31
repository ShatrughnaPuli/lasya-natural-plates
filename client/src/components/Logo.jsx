import React from 'react';

export default function Logo({ size = 42, showSubtitle = true }) {
  return (
    <div className="brand-logo-custom" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
      <div 
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '12px',
          background: 'linear-gradient(145deg, #447a38 0%, #2b5222 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(43, 82, 34, 0.22)',
          border: '1.5px solid #9dc78f',
          flexShrink: 0,
          position: 'relative'
        }}
      >
        {/* Crisp Pure Vector Leaf Icon */}
        <svg width="68%" height="68%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Natural curved leaf body */}
          <path 
            d="M6 26C6 26 8 16 18 8C23.5 3.5 26 5 26 5C26 5 27.5 7.5 23 13C15 23 6 26 6 26Z" 
            fill="#d2eac5" 
          />
          {/* Main leaf vein */}
          <path 
            d="M7 25C13 19 19 12 25 6" 
            stroke="#2b5222" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
          />
          {/* Side veins */}
          <path d="M12 20L15 22" stroke="#2b5222" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M15 17L19 18" stroke="#2b5222" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M18 14L22 14.5" stroke="#2b5222" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <span style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: size > 40 ? '1.45rem' : '1.2rem', 
          fontWeight: 800, 
          letterSpacing: '-0.3px', 
          color: 'var(--color-brand-primary)' 
        }}>
          LASYA
        </span>
        {showSubtitle && (
          <span style={{ 
            fontSize: '0.70rem', 
            fontWeight: 700, 
            color: 'var(--color-text-muted)', 
            letterSpacing: '1.4px',
            textTransform: 'uppercase'
          }}>
            Natural Leaf Plates
          </span>
        )}
      </div>
    </div>
  );
}
