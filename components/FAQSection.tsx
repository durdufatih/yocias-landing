'use client';

import { useLanguage } from '@/lib/i18n/context';

export default function FAQSection() {
  const { t } = useLanguage();
  const f = t.faq;

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 0 }}>
          <div className="section-label">{f.label}</div>
          <h2 className="section-title">{f.title}</h2>
        </div>
        <div className="faq-grid">
          {f.items.map((item, i) => (
            <div key={i} className="faq-item">
              <div className="faq-q">
                <div className="faq-q-icon">?</div>
                {item.q}
              </div>
              <p className="faq-a">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
