'use client';

import { useLanguage } from '@/lib/i18n/context';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="footer-logo">
        Yocias
        <span className="footer-tagline">Your Client Assistant</span>
      </div>
      <p className="footer-text">{t.footer.copyright}</p>
    </footer>
  );
}
