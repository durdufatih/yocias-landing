'use client';

import { useLanguage } from '@/lib/i18n/context';

const barHeights = [35, 45, 40, 55, 50, 65, 62, 78, 82, 88];

export default function FeaturesSection() {
  const { t } = useLanguage();
  const f = t.features;

  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-label">{f.label}</div>
        <h2 className="section-title">
          {f.title.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </h2>
        <p className="section-sub">{f.subtitle}</p>

        <div className="bento-grid">
          {/* Big Card – AI Analysis */}
          <div className="bento-card bento-1">
            <div className="bento-tag">{f.cards[0].tag}</div>
            <h3 className="bento-title">{f.cards[0].title}</h3>
            <p className="bento-text">{f.cards[0].text}</p>
            <div className="bento-visual">
              <div className="chart-bar-row">
                {barHeights.map((h, i) => (
                  <div
                    key={i}
                    className={`chart-bar${i >= 7 ? ' highlight' : ''}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="chart-stats">
                {f.chartStats.map((stat, i) => (
                  <div className="chart-stat" key={i}>
                    <div className="chart-stat-val">{stat.val}</div>
                    <div className="chart-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Food Memory */}
          <div className="bento-card bento-2">
            <div className="bento-tag">{f.cards[1].tag}</div>
            <h3 className="bento-title">{f.cards[1].title}</h3>
            <p className="bento-text">{f.cards[1].text}</p>
            <div className="food-pills">
              {f.foodPills.map((pill, i) => (
                <span key={i} className={`food-pill ${pill.type}`}>{pill.label}</span>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="bento-card bento-3">
            <div className="bento-tag">{f.cards[2].tag}</div>
            <h3 className="bento-title">{f.cards[2].title}</h3>
            <p className="bento-text">{f.cards[2].text}</p>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#f1f5f9', borderRadius: '12px 12px 12px 4px', padding: '10px 14px', fontSize: '13px', color: '#374151', width: '85%' }}>
                {f.chatBubble1}
              </div>
              <div style={{ background: 'var(--navy)', borderRadius: '12px 12px 4px 12px', padding: '10px 14px', fontSize: '13px', color: 'rgba(255,255,255,0.9)', width: '85%', marginLeft: 'auto', textAlign: 'right' }}>
                {f.chatBubble2}
              </div>
            </div>
          </div>

          {/* Photo Tracking */}
          <div className="bento-card bento-4">
            <div className="bento-tag">{f.cards[3].tag}</div>
            <h3 className="bento-title">{f.cards[3].title}</h3>
            <p className="bento-text">{f.cards[3].text}</p>
            <div style={{ marginTop: '16px', background: 'var(--soft-grey)', borderRadius: '12px', padding: '14px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '28px' }}>🥗</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--navy)' }}>{f.mealTitle}</div>
                <div style={{ fontSize: '11px', color: 'var(--grey-mid)' }}>{f.mealCals}</div>
              </div>
              <div style={{ marginLeft: 'auto', background: 'var(--mint)', color: 'var(--navy)', border: 'none', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                {f.mealApprove}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bento-card bento-5">
            <div className="bento-tag">{f.cards[4].tag}</div>
            <h3 className="bento-title">{f.cards[4].title}</h3>
            <p className="bento-text">{f.cards[4].text}</p>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {f.payments.map((payment, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < f.payments.length - 1 ? '1px solid var(--border)' : undefined }}>
                  <span style={{ fontSize: '13px', color: 'var(--grey-dark)' }}>{payment.name}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: payment.color }}>{payment.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PDF Report */}
          <div className="bento-card bento-6">
            <div className="bento-tag">{f.cards[5].tag}</div>
            <h3 className="bento-title">{f.cards[5].title}</h3>
            <p className="bento-text">{f.cards[5].text}</p>
            <div style={{ marginTop: '16px', background: 'var(--soft-grey)', borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '22px' }}>📊</span>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--navy)' }}>{f.reportFile}</div>
                <div style={{ fontSize: '11px', color: 'var(--grey-mid)' }}>{f.reportDate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
