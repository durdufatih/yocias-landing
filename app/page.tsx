'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DemoSection from '@/components/DemoSection';
import PainSection from '@/components/PainSection';
import FeaturesSection from '@/components/FeaturesSection';
import EcosystemSection from '@/components/EcosystemSection';
import PricingSection from '@/components/PricingSection';
import FinalCTA from '@/components/FinalCTA';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n/context';
import { trackSectionView } from '@/lib/analytics';

// Bölüm ID → okunabilir isim eşleştirmesi
const SECTION_NAMES: Record<string, string> = {
  hero:        'Hero',
  demo:        'Demo',
  pain:        'Pain Points',
  features:    'Features',
  ecosystem:   'Ecosystem',
  pricing:     'Pricing',
  'final-cta': 'Final CTA',
  faq:         'FAQ',
  footer:      'Footer',
};

export default function Home() {
  const { locale, t } = useLanguage();

  // HTML lang ve meta güncelle
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.meta.description);
  }, [locale, t]);

  // Scroll animasyonları + Bölüm görüntüleme tracking
  useEffect(() => {
    const viewedSections = new Set<string>();

    // Section view tracking observer (her bölüm bir kez)
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).id || (e.target as HTMLElement).dataset.section;
            if (id && !viewedSections.has(id)) {
              viewedSections.add(id);
              trackSectionView(SECTION_NAMES[id] || id);
            }
          }
        });
      },
      { threshold: 0.3 } // Bölümün %30'u görününce
    );

    // Kart animasyonları observer
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = '1';
            (e.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    // Section'ları izle
    const sections = document.querySelectorAll('section[id], [data-section]');
    sections.forEach((el) => sectionObserver.observe(el));

    // Kart animasyonları
    const cards = document.querySelectorAll(
      '.pain-card, .bento-card, .journey-step, .pricing-card, .faq-item'
    );
    cards.forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(24px)';
      (el as HTMLElement).style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      cardObserver.observe(el);
    });

    return () => {
      sectionObserver.disconnect();
      cardObserver.disconnect();
    };
  }, [locale]);

  return (
    <>
      <Navbar />
      <main>
        <section id="hero" style={{ padding: 0 }}><Hero /></section>
        <section id="demo" style={{ padding: 0 }}><DemoSection /></section>
        <section id="pain" style={{ padding: 0 }}><PainSection /></section>
        <section id="features" style={{ padding: 0 }}><FeaturesSection /></section>
        <section id="ecosystem" style={{ padding: 0 }}><EcosystemSection /></section>
        <section id="pricing" style={{ padding: 0 }}><PricingSection /></section>
        <section id="final-cta" style={{ padding: 0 }}><FinalCTA /></section>
        <section id="faq" style={{ padding: 0 }}><FAQSection /></section>
      </main>
      <footer id="footer"><Footer /></footer>
    </>
  );
}
