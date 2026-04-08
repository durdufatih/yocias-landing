'use client';

import { useLanguage } from '@/lib/i18n/context';
import { useLeadModal } from '@/lib/lead-context';
import { trackButtonClick } from '@/lib/analytics';

export default function FinalCTA() {
  const { t } = useLanguage();
  const { openModal } = useLeadModal();
  const f = t.finalCta;

  return (
    <section className="final-cta">
      <div className="container">
        <h2 className="section-title" style={{ color: 'white', textAlign: 'center' }}>
          {f.title.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </h2>
        <p>{f.subtitle}</p>
        <div className="final-ctas">
          <button className="btn-primary-lg" onClick={() => {
            openModal('final-primary');
            trackButtonClick(f.cta1, 'Final CTA');
          }}>
            {f.cta1}
          </button>
          <button className="btn-outline-lg" onClick={() => {
            openModal('final-demo');
            trackButtonClick(f.cta2, 'Final CTA');
          }}>
            {f.cta2}
          </button>
        </div>
        <div className="trust-row">
          {f.trust.map((item, i) => (
            <div key={i} className="trust-item">
              <div className="trust-dot" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
