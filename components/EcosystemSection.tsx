'use client';

import { useLanguage } from '@/lib/i18n/context';

export default function EcosystemSection() {
  const { t } = useLanguage();
  const e = t.ecosystem;

  return (
    <section className="ecosystem-section" id="ecosystem">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className="section-label">{e.label}</div>
          <h2 className="section-title">
            {e.title.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>{e.subtitle}</p>
        </div>

        <div className="journey-steps">
          {e.steps.map((step, i) => (
            <div className="journey-step" key={i}>
              <div className="journey-num">{step.num}</div>
              <h3 className="journey-title">{step.title}</h3>
              <p className="journey-text">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="founder-quote">
          <p>
            {e.quote}<em>{e.quoteEm}</em>{e.quoteEnd}
          </p>
          <div style={{ marginTop: '24px', fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
            {e.quoteAuthor}
          </div>
        </div>
      </div>
    </section>
  );
}
