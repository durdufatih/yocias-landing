import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/context';
import { LeadModalProvider } from '@/lib/lead-context';
import LeadModal from '@/components/LeadModal';

export const metadata: Metadata = {
  title: 'Yocias – Hepsi Bir Arada Diyetisyen Paneli',
  description: 'AI destekli ölçüm analizi, uygulama içi mesajlaşma, fotoğraflı öğün takibi ve otomatik ödeme sistemi ile diyetisyen pratiğinizi dijitalleştirin.',
  keywords: 'diyetisyen yazılım, diyetisyen programı, danışan yönetim, diyet takip, online diyetisyen platformu',
  openGraph: {
    title: 'Yocias – Hepsi Bir Arada Diyetisyen Paneli',
    description: 'AI destekli ölçüm analizi, uygulama içi mesajlaşma, fotoğraflı öğün takibi ve otomatik ödeme sistemi.',
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yocias – Hepsi Bir Arada Diyetisyen Paneli',
    description: 'AI destekli ölçüm analizi, uygulama içi mesajlaşma, fotoğraflı öğün takibi ve otomatik ödeme sistemi.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    languages: {
      'tr': '/',
      'en': '/?lang=en',
    },
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Yocias",
              "description": "AI destekli diyetisyen yönetim platformu",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web, iOS, Android",
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "TRY",
                "lowPrice": "912",
                "highPrice": "6192",
              },
              "featureList": [
                "AI destekli ölçüm analizi",
                "Uygulama içi mesajlaşma",
                "Fotoğraflı öğün takibi",
                "Otomatik ödeme sistemi",
                "PDF rapor oluşturma",
              ],
            }),
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <LeadModalProvider>
            {children}
            <LeadModal />
          </LeadModalProvider>
        </LanguageProvider>

        {/* Google Analytics 4 — afterInteractive: sayfa yüklendikten sonra çalışır */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
