'use client';

import { useLanguage } from '@/lib/i18n/context';

const painIcons = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
    <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5-4-4z" />
  </svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>,
];

export default function PainSection() {
  const { t } = useLanguage();
  const p = t.pain;

  return (
    <section className="pain-section" id="pain">
      <div className="container">
        <div className="section-label">{p.label}</div>
        <h2 className="section-title" style={{ color: 'white' }}>
          {p.title.split('\n').map((line, i) => (
            <span key={i}>{line}{i < p.title.split('\n').length - 1 && <br />}</span>
          ))}
        </h2>
        <p className="section-sub">{p.subtitle}</p>
        <div className="pain-grid">
          {p.cards.map((card, i) => (
            <div className="pain-card" key={i}>
              <div className="pain-card-num">{card.num}</div>
              <div className="pain-icon">{painIcons[i]}</div>
              <div className="pain-card-title">{card.title}</div>
              <p className="pain-card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
