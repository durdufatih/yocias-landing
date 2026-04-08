'use client';

import { useLanguage } from '@/lib/i18n/context';
import { locales, type Locale } from '@/lib/i18n/translations';
import { useLeadModal } from '@/lib/lead-context';
import { trackButtonClick, trackLanguageSwitch } from '@/lib/analytics';

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const { openModal } = useLeadModal();
  const n = t.nav;

  return (
    <nav>
      <a className="nav-logo" href="#">
        <div className="nav-logo-dot" />
        <div className="nav-logo-brand">
          <span className="nav-logo-name">Yocias</span>
          <span className="nav-logo-tagline">Your Client Assistant</span>
        </div>
      </a>
      <ul className="nav-links">
        <li><a href="#features">{n.features}</a></li>
        <li><a href="#ecosystem">{n.ecosystem}</a></li>
        <li><a href="#pricing">{n.pricing}</a></li>
        <li><a href="#faq">{n.faq}</a></li>
      </ul>
      <div className="nav-ctas">
        <div className="lang-switcher">
          {locales.map((loc) => (
            <button
              key={loc}
              className={`lang-btn ${locale === loc ? 'active' : ''}`}
              onClick={() => {
                setLocale(loc as Locale);
                trackLanguageSwitch(loc);
              }}
              aria-label={`Switch to ${loc.toUpperCase()}`}
            >
              {loc.toUpperCase()}
            </button>
          ))}
        </div>
        <button className="btn-primary" onClick={() => {
          openModal('navbar-cta');
          trackButtonClick('Try Free', 'Navbar');
        }}>
          {n.tryFree}
        </button>
      </div>
    </nav>
  );
}
