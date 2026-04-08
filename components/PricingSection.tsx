'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { useLeadModal } from '@/lib/lead-context';
import { trackButtonClick, trackPricingClick } from '@/lib/analytics';

function CheckIcon() {
  return (
    <svg viewBox="0 0 10 10" fill="none">
      <path d="M1.5 5l2.5 2.5 4.5-4" stroke="#3ECFAC" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export default function PricingSection() {
  const { t } = useLanguage();
  const { openModal } = useLeadModal();
  const p = t.pricing;
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="pricing-section" id="pricing">
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="section-label">{p.label}</div>
        <h2 className="section-title">
          {p.title.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </h2>

        <div className="pricing-toggle">
          <button
            className={`toggle-btn ${!isYearly ? 'active' : 'inactive'}`}
            onClick={() => setIsYearly(false)}
          >
            {p.monthly}
          </button>
          <button
            className={`toggle-btn ${isYearly ? 'active' : 'inactive'}`}
            onClick={() => setIsYearly(true)}
          >
            {p.yearly} <span className="save-badge">{p.yearlySave}</span>
          </button>
        </div>

        <div className="pricing-grid">
          {p.plans.map((plan, i) => (
            <div key={i} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
              {plan.featured && <div className="featured-badge">{p.mostPopular}</div>}
              <div className="pricing-plan">{plan.name}</div>
              <div className="pricing-price">
                <span className="price-currency" style={plan.featured ? { color: 'rgba(255,255,255,0.5)' } : {}}>{p.currency}</span>
                <span className="price-amount" style={plan.featured ? { color: 'white' } : {}}>
                  {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
              </div>
              <div className="price-period">{plan.period}</div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                {plan.features.map((feature, j) => (
                  <li key={j} className="pricing-feature">
                    <div className="check-icon"><CheckIcon /></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`pricing-cta ${plan.featured ? 'main' : 'secondary'}`}
                onClick={() => {
                  openModal(`pricing-${plan.name.toLowerCase()}`);
                  trackPricingClick(plan.name, isYearly);
                  trackButtonClick(`Pricing - ${plan.name}`, 'Pricing');
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
