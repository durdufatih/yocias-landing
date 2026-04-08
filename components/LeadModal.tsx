'use client';

import { useState, useEffect } from 'react';
import { useLeadModal } from '@/lib/lead-context';
import { useLanguage } from '@/lib/i18n/context';
import { trackLeadModalOpen, trackLeadSubmit, trackLeadSuccess } from '@/lib/analytics';

const SOURCES_TR = [
  'Google / Arama Motoru',
  'Instagram',
  'Twitter / X',
  'LinkedIn',
  'Reddit',
  'Arkadaş Tavsiyesi',
  'YouTube',
  'Diğer',
];

const SOURCES_EN = [
  'Google / Search Engine',
  'Instagram',
  'Twitter / X',
  'LinkedIn',
  'Reddit',
  'Friend Referral',
  'YouTube',
  'Other',
];

type FormState = {
  first_name: string;
  last_name: string;
  email: string;
  source: string;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function LeadModal() {
  const { isOpen, closeModal, ctaButton } = useLeadModal();
  const { locale } = useLanguage();
  const isTR = locale === 'tr';
  const sources = isTR ? SOURCES_TR : SOURCES_EN;

  const [form, setForm] = useState<FormState>({
    first_name: '',
    last_name: '',
    email: '',
    source: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Modal açılınca track et
  useEffect(() => {
    if (isOpen) trackLeadModalOpen(ctaButton);
  }, [isOpen, ctaButton]);

  // ESC ile kapat
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeModal();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, closeModal]);

  // Açıldığında scroll kilitle
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Modal kapanınca formu sıfırla
  useEffect(() => {
    if (!isOpen) {
      setForm({ first_name: '', last_name: '', email: '', source: '' });
      setStatus('idle');
      setErrorMsg('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      trackLeadSubmit(form.source, ctaButton);

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, cta_button: ctaButton }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || (isTR ? 'Bir hata oluştu.' : 'An error occurred.'));
        setStatus('error');
        return;
      }

      setStatus('success');
      trackLeadSuccess(ctaButton);
    } catch {
      setErrorMsg(isTR ? 'Bağlantı hatası. Lütfen tekrar deneyin.' : 'Connection error. Please try again.');
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="lead-overlay" onClick={closeModal}>
      <div className="lead-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {/* Close */}
        <button className="lead-close" onClick={closeModal} aria-label="Close">✕</button>

        {status === 'success' ? (
          <div className="lead-success">
            <div className="lead-success-icon">✓</div>
            <h3>{isTR ? 'Harika! Kaydınız Alındı.' : 'Awesome! You\'re on the list.'}</h3>
            <p>
              {isTR
                ? 'En kısa sürede sizinle iletişime geçeceğiz.'
                : 'We\'ll be in touch with you soon.'}
            </p>
            <button className="lead-done-btn" onClick={closeModal}>
              {isTR ? 'Tamam' : 'Done'}
            </button>
          </div>
        ) : (
          <>
            <div className="lead-modal-header">
              <div className="lead-modal-logo">
                <div className="lead-modal-dot" />
                Yocias
              </div>
              <h2 className="lead-modal-title">
                {isTR ? 'Hemen Başlayın' : 'Get Early Access'}
              </h2>
              <p className="lead-modal-sub">
                {isTR
                  ? '14 gün ücretsiz — kredi kartı gerekmez.'
                  : '14 days free — no credit card needed.'}
              </p>
            </div>

            <form className="lead-form" onSubmit={handleSubmit} noValidate>
              <div className="lead-field-row">
                <div className="lead-field">
                  <label htmlFor="lead-first-name">{isTR ? 'Ad' : 'First Name'}</label>
                  <input
                    id="lead-first-name"
                    type="text"
                    placeholder={isTR ? 'Adınız' : 'Your first name'}
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    required
                    autoFocus
                  />
                </div>
                <div className="lead-field">
                  <label htmlFor="lead-last-name">{isTR ? 'Soyad' : 'Last Name'}</label>
                  <input
                    id="lead-last-name"
                    type="text"
                    placeholder={isTR ? 'Soyadınız' : 'Your last name'}
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="lead-field">
                <label htmlFor="lead-email">{isTR ? 'E-posta' : 'Email'}</label>
                <input
                  id="lead-email"
                  type="email"
                  placeholder={isTR ? 'ornek@email.com' : 'you@example.com'}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="lead-field">
                <label htmlFor="lead-source">
                  {isTR ? 'Bizi nereden duydunuz?' : 'How did you hear about us?'}
                </label>
                <select
                  id="lead-source"
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                  required
                >
                  <option value="">{isTR ? 'Seçiniz...' : 'Select...'}</option>
                  {sources.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {errorMsg && (
                <div className="lead-error">{errorMsg}</div>
              )}

              <button
                type="submit"
                className="lead-submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className="lead-spinner" />
                ) : (
                  isTR ? 'Ücretsiz Başlat →' : 'Start Free →'
                )}
              </button>

              <p className="lead-privacy">
                {isTR
                  ? 'Bilgileriniz güvende. Asla spam göndermeyiz.'
                  : 'Your info is safe. We never spam.'}
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
