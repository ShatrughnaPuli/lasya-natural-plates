import React from 'react';

export default function ProductPlateGraphic({ type = 'large_round' }) {
  if (type === 'large_round' || type === 'round12') {
    return (
      <div style={{
        width: '160px',
        height: '160px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #748e58 0%, #5d7544 50%, #465c32 100%)',
        border: '5px solid #8ba86e',
        boxShadow: 'inset 0 4px 10px rgba(255,255,255,0.35), inset 0 -6px 14px rgba(0,0,0,0.3), 0 14px 28px rgba(35,60,25,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <svg width="82%" height="82%" viewBox="0 0 100 100" style={{ opacity: 0.35 }}>
          <path d="M50 5 L50 95" stroke="#ffffff" strokeWidth="1.5" />
          <path d="M50 30 L85 20 M50 30 L15 20" stroke="#ffffff" strokeWidth="1" />
          <path d="M50 55 L90 45 M50 55 L10 45" stroke="#ffffff" strokeWidth="1" />
          <path d="M50 75 L80 70 M50 75 L20 70" stroke="#ffffff" strokeWidth="1" />
        </svg>
        <span style={{ position: 'absolute', fontSize: '0.74rem', fontWeight: 800, color: 'rgba(255,255,255,0.92)', letterSpacing: '0.5px' }}>
          12" LARGE ROUND
        </span>
      </div>
    );
  }

  // Small Round (8 Inch)
  return (
    <div style={{
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #7e9862 0%, #637b4b 50%, #4b6237 100%)',
      border: '4.5px solid #94b278',
      boxShadow: 'inset 0 3px 8px rgba(255,255,255,0.3), inset 0 -4px 10px rgba(0,0,0,0.25), 0 10px 20px rgba(35,60,25,0.22)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <svg width="80%" height="80%" viewBox="0 0 100 100" style={{ opacity: 0.35 }}>
        <path d="M50 5 L50 95" stroke="#ffffff" strokeWidth="1.5" />
        <path d="M50 35 L80 25 M50 35 L20 25" stroke="#ffffff" strokeWidth="1" />
        <path d="M50 65 L85 55 M50 65 L15 55" stroke="#ffffff" strokeWidth="1" />
      </svg>
      <span style={{ position: 'absolute', fontSize: '0.68rem', fontWeight: 800, color: 'rgba(255,255,255,0.92)', letterSpacing: '0.5px' }}>
        8" SMALL ROUND
      </span>
    </div>
  );
}

