import React from 'react';

export default function ProductPlateGraphic({ type = 'large_round' }) {
  // 14" Grand Round Thali / Platter Plate
  if (type === 'grand_round' || type === 'round14' || type === 'platter14') {
    return (
      <div style={{
        width: '175px',
        height: '175px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #6c8850 0%, #546d3b 50%, #3e532b 100%)',
        border: '6px solid #85a366',
        boxShadow: 'inset 0 5px 12px rgba(255,255,255,0.38), inset 0 -8px 16px rgba(0,0,0,0.35), 0 16px 32px rgba(30,55,20,0.28)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <svg width="86%" height="86%" viewBox="0 0 100 100" style={{ opacity: 0.38 }}>
          <circle cx="50" cy="50" r="44" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 2" />
          <path d="M50 4 L50 96" stroke="#ffffff" strokeWidth="1.6" />
          <path d="M50 25 L88 15 M50 25 L12 15" stroke="#ffffff" strokeWidth="1.2" />
          <path d="M50 48 L94 38 M50 48 L6 38" stroke="#ffffff" strokeWidth="1.2" />
          <path d="M50 72 L88 64 M50 72 L12 64" stroke="#ffffff" strokeWidth="1.2" />
        </svg>
        <span style={{ position: 'absolute', fontSize: '0.76rem', fontWeight: 800, color: 'rgba(255,255,255,0.95)', letterSpacing: '0.5px', textAlign: 'center', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
          14" GRAND THALI
        </span>
      </div>
    );
  }

  // 12" Large Round Buffet Plate
  if (type === 'large_round' || type === 'round12') {
    return (
      <div style={{
        width: '155px',
        height: '155px',
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
        <span style={{ position: 'absolute', fontSize: '0.72rem', fontWeight: 800, color: 'rgba(255,255,255,0.92)', letterSpacing: '0.5px', textAlign: 'center', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
          12" LARGE ROUND
        </span>
      </div>
    );
  }

  // 10" Medium Round Plate
  if (type === 'medium_round' || type === 'round10') {
    return (
      <div style={{
        width: '135px',
        height: '135px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #7a945d 0%, #607947 50%, #485f33 100%)',
        border: '4.5px solid #8fae73',
        boxShadow: 'inset 0 3px 9px rgba(255,255,255,0.32), inset 0 -5px 12px rgba(0,0,0,0.28), 0 12px 24px rgba(35,60,25,0.23)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <svg width="80%" height="80%" viewBox="0 0 100 100" style={{ opacity: 0.35 }}>
          <path d="M50 5 L50 95" stroke="#ffffff" strokeWidth="1.4" />
          <path d="M50 32 L82 22 M50 32 L18 22" stroke="#ffffff" strokeWidth="1" />
          <path d="M50 62 L86 52 M50 62 L14 52" stroke="#ffffff" strokeWidth="1" />
        </svg>
        <span style={{ position: 'absolute', fontSize: '0.70rem', fontWeight: 800, color: 'rgba(255,255,255,0.92)', letterSpacing: '0.5px', textAlign: 'center', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
          10" MEDIUM ROUND
        </span>
      </div>
    );
  }

  // 4.5" Dona Leaf Bowl
  if (type === 'dona' || type === 'dona45' || type === 'bowl' || type === 'donabowl') {
    return (
      <div style={{
        width: '110px',
        height: '110px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 45% 45%, #88a36b 0%, #5d7544 60%, #40552c 100%)',
        border: '5px solid #a1be84',
        boxShadow: 'inset 0 6px 14px rgba(0,0,0,0.4), inset 0 -2px 6px rgba(255,255,255,0.35), 0 10px 20px rgba(30,50,20,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{
          width: '74%',
          height: '74%',
          borderRadius: '50%',
          border: '1.5px dashed rgba(255,255,255,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.08)'
        }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.3px', textAlign: 'center', textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>
            4.5" DONA<br />BOWL
          </span>
        </div>
      </div>
    );
  }

  // 8" Small Round (Default fallback)
  return (
    <div style={{
      width: '118px',
      height: '118px',
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
      <span style={{ position: 'absolute', fontSize: '0.66rem', fontWeight: 800, color: 'rgba(255,255,255,0.92)', letterSpacing: '0.5px', textAlign: 'center', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
        8" SMALL ROUND
      </span>
    </div>
  );
}

