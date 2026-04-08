// lib/analytics.ts
// Google Analytics 4 event tracking yardımcı fonksiyonları

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      targetId: string | Date,
      params?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/** GA Measurement ID tanımlı mı kontrol et */
const isEnabled = () =>
  typeof window !== 'undefined' &&
  typeof window.gtag === 'function' &&
  !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Genel event gönderici */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (!isEnabled()) return;
  window.gtag('event', eventName, params);
}

/** CTA buton tıklaması */
export function trackButtonClick(buttonName: string, section: string) {
  trackEvent('button_click', {
    button_name: buttonName,
    page_section: section,
  });
}

/** Bölüm görüntüleme (IntersectionObserver ile) */
export function trackSectionView(sectionName: string) {
  trackEvent('section_view', {
    section_name: sectionName,
  });
}

/** Lead modal açılması */
export function trackLeadModalOpen(ctaSource: string) {
  trackEvent('lead_modal_open', {
    cta_source: ctaSource,
  });
}

/** Lead form dolduruldu ve gönderildi */
export function trackLeadSubmit(source: string, ctaButton: string) {
  trackEvent('lead_submit', {
    referral_source: source,
    cta_button: ctaButton,
  });
}

/** Lead formu başarıyla kaydedildi */
export function trackLeadSuccess(ctaButton: string) {
  trackEvent('lead_success', {
    cta_button: ctaButton,
    // GA4 conversion event olarak işaretlemek için:
    value: 1,
    currency: 'TRY',
  });
}

/** Fiyatlandırma planı tıklaması */
export function trackPricingClick(planName: string, isYearly: boolean) {
  trackEvent('pricing_plan_click', {
    plan_name: planName,
    billing_period: isYearly ? 'yearly' : 'monthly',
  });
}

/** Dil değiştirme */
export function trackLanguageSwitch(locale: string) {
  trackEvent('language_switch', {
    new_locale: locale,
  });
}
