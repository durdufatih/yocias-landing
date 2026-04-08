'use client';

import { useLanguage } from '@/lib/i18n/context';
import { useLeadModal } from '@/lib/lead-context';
import { trackButtonClick } from '@/lib/analytics';

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="#3ECFAC" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const { openModal } = useLeadModal();
  const h = t.hero;

  return (
    <section className="hero">
      <div className="hero-grid">
        <div>
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            {h.badge}
          </div>
          <h1>
            {h.title}<em>{h.titleEm}</em>{h.titleEnd}
          </h1>
          <p className="hero-sub">{h.subtitle}</p>
          <ul className="hero-bullets">
            {h.bullets.map((bullet, i) => (
              <li key={i}>
                <div className="hero-bullet-icon"><CheckIcon /></div>
                {bullet}
              </li>
            ))}
          </ul>
          <div className="hero-ctas">
            <button className="btn-primary-lg" onClick={() => {
              openModal('hero-primary');
              trackButtonClick(h.ctaPrimary, 'Hero');
            }}>
              {h.ctaPrimary}
            </button>
            <a
              className="btn-outline-lg"
              href="#demo"
              onClick={() => trackButtonClick('Watch Demo', 'Hero')}
            >{h.ctaSecondary}</a>
          </div>
        </div>

        {/* Phone Mockup */}
        <div className="hero-visual">
          <div className="float-card-1">
            <div className="float-icon">{h.floatCard1.icon}</div>
            <div className="float-val">{h.floatCard1.val}</div>
            <div className="float-label">{h.floatCard1.label}</div>
          </div>
          <div className="phone-frame">
            <div className="phone-notch"><div className="phone-notch-pill" /></div>
            <div className="phone-screen">
              <div className="phone-header-row">
                <div>
                  <div className="phone-header-title">{h.chatHeader}</div>
                  <div className="phone-header-sub">{h.chatSub}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="phone-status-dot" />
                  <div className="phone-avatar">AK</div>
                </div>
              </div>
              <div className="chat-container">
                <div className="chat-bubble-left">{h.chatBubble1} 🍽️</div>
                <div className="chat-time">{h.chatTime1}</div>
                <div className="food-card">
                  <div className="food-card-img">
                    🥗
                    <div className="food-card-approve">{h.foodApproved}</div>
                  </div>
                  <div className="food-card-body">
                    <div className="food-card-title">{h.foodTitle}</div>
                    <div className="food-card-cals">{h.foodCals}</div>
                    <div className="food-card-macros">
                      <span className="macro-pill">P: 38g</span>
                      <span className="macro-pill">K: 22g</span>
                      <span className="macro-pill">Y: 14g</span>
                    </div>
                  </div>
                </div>
                <div className="chat-bubble-right">{h.chatBubble2}</div>
                <div className="chat-time" style={{ textAlign: 'right' }}>{h.chatTime2}</div>
                <div className="chat-bubble-left">{h.chatBubble3}</div>
              </div>
            </div>
          </div>
          <div className="float-card-2">
            <div className="float-icon">{h.floatCard2.icon}</div>
            <div className="float-val">{h.floatCard2.val}</div>
            <div className="float-label">{h.floatCard2.label}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
