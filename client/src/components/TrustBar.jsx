import React from 'react';

export default function TrustBar() {
  const trustPoints = [
    { icon: 'fa-utensils', title: 'Food Grade Safe', desc: '100% natural, chemical & toxin-free safe dining.' },
    { icon: 'fa-leaf', title: 'Eco-Friendly', desc: 'Naturally shed leaves. No trees harmed in making.' },
    { icon: 'fa-recycle', title: '100% Recyclable', desc: 'Composts naturally within 60–90 days into rich manure.' },
    { icon: 'fa-ban', title: 'No Plastic / Wax', desc: 'Zero plastic coating, synthetic binders, or glues.' },
    { icon: 'fa-shield-halved', title: 'Make in India', desc: 'Manufactured with pride in Jalpally, Hyderabad facility.' },
  ];

  return (
    <section className="section-trust-bar" id="about">
      <div className="container">
        <div className="trust-grid">
          {trustPoints.map((pt, idx) => (
            <div className="trust-item" key={idx}>
              <div className="trust-icon"><i className={`fa-solid ${pt.icon}`}></i></div>
              <h4>{pt.title}</h4>
              <p>{pt.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
