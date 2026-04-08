'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n/context';

export default function DemoSection() {
  const { t } = useLanguage();
  const d = t.demo;
  const sectionRef = useRef<HTMLElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const $ = (id: string) => document.getElementById(id);

    async function typeIn(elId: string, curId: string, text: string, speed = 38) {
      const el = $(elId);
      const cur = $(curId);
      if (!el || !cur) return;
      cur.style.display = 'inline-block';
      el.closest('.anim-field')?.classList.add('active', 'typed');
      for (let i = 0; i <= text.length; i++) {
        el.textContent = text.slice(0, i);
        await delay(speed + Math.random() * 20);
      }
      cur.style.display = 'none';
      el.closest('.anim-field')?.classList.remove('active');
    }

    async function countUp(elId: string, target: number, decimals: number, duration = 600) {
      const el = $(elId);
      if (!el) return;
      const start = performance.now();
      return new Promise<void>((resolve) => {
        const step = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(decimals);
          if (p < 1) requestAnimationFrame(step);
          else { el.textContent = target.toFixed(decimals); resolve(); }
        };
        requestAnimationFrame(step);
      });
    }

    function setProgress(pct: number) {
      const el = $('aniProg');
      if (el) el.style.width = pct + '%';
    }

    function setSidebar(n: number) {
      ['asb0', 'asb1', 'asb2'].forEach((id, i) => {
        const el = $(id);
        if (el) el.className = 'anim-sb-item' + (i === n ? ' hl' : '');
      });
    }

    function setTab(n: number) {
      [0, 1, 2].forEach((i) => {
        const t = $('atab' + i);
        if (t) t.className = 'anim-step-tab' + (i === n ? ' current' : i < n ? ' done' : '');
      });
    }

    function showScene(n: number) {
      [0, 1, 2].forEach((i) => {
        const s = $('asc' + i);
        if (s) s.classList.toggle('visible', i === n);
      });
    }

    async function animUpload() {
      await delay(600);
      const zone = $('aUploadZone');
      const icon = $('aUploadIcon');
      if (zone && icon) {
        zone.classList.add('drag');
        icon.textContent = '📂';
        await delay(700);
        zone.classList.remove('drag');
        icon.textContent = '📤';
      }
      await delay(300);
      const card = $('aFileCard');
      if (card) card.classList.add('show');
      await delay(300);
      const bar = $('aProgBar');
      if (bar) {
        let pct = 0;
        const prog = setInterval(() => {
          pct += 2 + Math.random() * 4;
          if (pct >= 100) { pct = 100; clearInterval(prog); }
          bar.style.width = pct + '%';
        }, 60);
      }
      await delay(2200);
      $('aProgDone')?.classList.add('show');
      await delay(800);
    }

    async function runDemo(): Promise<void> {
      setProgress(5); setTab(0); setSidebar(0); showScene(0);
      await delay(800);

      const fields = d.scene1.fields;
      const values = d.scene1.values;
      for (let i = 0; i < Math.min(fields.length, 6); i++) {
        await typeIn(`af${i}v`, `afc${i}`, values[i] ?? '', i < 2 ? 70 : 40);
        await delay(150);
      }
      setProgress(28);
      await delay(500);

      const btn = $('aSaveBtn');
      if (btn) {
        btn.classList.add('show');
        await delay(700);
        btn.classList.add('clicked');
        await delay(300);
        btn.classList.remove('clicked');
        $('aToast')?.classList.add('show');
        setProgress(33);
        await delay(1800);
      }

      setTab(1); setSidebar(1); showScene(1); setProgress(40);
      await animUpload();
      setProgress(66);
      await delay(600);

      setTab(2); setSidebar(2); showScene(2); setProgress(72);
      await delay(1000);

      $('aAiDots')?.style && ($('aAiDots')!.style.display = 'none');
      await delay(200);

      const metrics = d.scene3.metrics;
      for (let i = 0; i < Math.min(metrics.length, 3); i++) {
        $(`am${i}`)?.classList.add('show');
        countUp(`amv${i}`, metrics[i].val, 1, 700);
        await delay(200);
      }
      await delay(900);

      $('aInsight')?.classList.add('show');
      setProgress(100);
      await delay(3500);

      // reset state for loop
      $('aToast')?.classList.remove('show');
      $('aSaveBtn')?.classList.remove('show');
      $('aFileCard')?.classList.remove('show');
      $('aProgDone')?.classList.remove('show');
      const bar = $('aProgBar');
      if (bar) bar.style.width = '0%';
      [0, 1, 2].forEach(i => $(`am${i}`)?.classList.remove('show'));
      $('aInsight')?.classList.remove('show');
      const dots = $('aAiDots');
      if (dots) dots.style.display = '';
      for (let i = 0; i < 6; i++) {
        const v = $(`af${i}v`);
        if (v) v.textContent = '';
        const f = $(`af${i}`);
        if (f) f.classList.remove('typed', 'active');
      }
      setProgress(0);
      await delay(400);
      if (startedRef.current) runDemo();
    }

    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !startedRef.current) {
        startedRef.current = true;
        runDemo();
      }
    }, { threshold: 0.3 });
    obs.observe(section);

    return () => {
      obs.disconnect();
      startedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="demo-video-section" id="demo" ref={sectionRef}>
      <div className="anim-demo-wrap">
        <div className="anim-demo-label">{d.label}</div>
        <h2 className="anim-demo-title">{d.title}</h2>
        <p className="anim-demo-sub">{d.subtitle}</p>

        <div className="anim-progress-bar">
          <div className="anim-progress-fill" id="aniProg" />
        </div>

        <div className="anim-steps-indicator">
          <div className="anim-step-tab current" id="atab0">
            <div className="anim-step-num">1</div>{d.step1}
          </div>
          <div className="anim-step-tab" id="atab1">
            <div className="anim-step-num">2</div>{d.step2}
          </div>
          <div className="anim-step-tab" id="atab2">
            <div className="anim-step-num">3</div>{d.step3}
          </div>
        </div>

        <div className="anim-browser">
          <div className="anim-browser-bar">
            <div className="anim-traffic">
              <div className="anim-traffic-dot" style={{ background: '#ff5f57' }} />
              <div className="anim-traffic-dot" style={{ background: '#febc2e' }} />
              <div className="anim-traffic-dot" style={{ background: '#28c840' }} />
            </div>
            <div className="anim-url-bar">
              <span>app.</span>dietflow.com/panel
            </div>
          </div>

          <div className="anim-app">
            {/* Sidebar */}
            <div className="anim-sidebar">
              <div className="anim-sb-item hl" id="asb0">
                <svg className="anim-sb-icon" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="5" r="3" stroke="#3ECFAC" strokeWidth="1.2" />
                  <path d="M2 13c0-3 2.7-5 6-5s6 2 6 5" stroke="#3ECFAC" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                {d.sidebar[0]}
              </div>
              <div className="anim-sb-item" id="asb1">
                <svg className="anim-sb-icon" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M5 6h6M5 9h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                {d.sidebar[1]}
              </div>
              <div className="anim-sb-divider" />
              <div className="anim-sb-item" id="asb2">
                <svg className="anim-sb-icon" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                {d.sidebar[2]}
              </div>
              <div className="anim-sb-item">
                <svg className="anim-sb-icon" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4h12M2 8h8M2 12h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                {d.sidebar[3]}
              </div>
              <div className="anim-sb-item">
                <svg className="anim-sb-icon" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M8 5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="8" cy="11" r="0.5" fill="currentColor" />
                </svg>
                {d.sidebar[4]}
              </div>
            </div>

            {/* Content */}
            <div className="anim-content" style={{ position: 'relative' }}>
              {/* Scene 1 */}
              <div className="anim-scene visible" id="asc0">
                <div className="anim-scene-hd">{d.scene1.heading}</div>
                <div className="anim-form-grid">
                  {[0, 1, 2, 3].map((i) => (
                    <div className="anim-field" id={`af${i}`} key={i}>
                      <span className="anim-field-label">{d.scene1.fields[i]}</span>
                      <span id={`af${i}v`} />
                      <span className="anim-cursor" id={`afc${i}`} style={{ display: 'none' }} />
                    </div>
                  ))}
                  {[4, 5].map((i) => (
                    <div className="anim-field full" id={`af${i}`} key={i}>
                      <span className="anim-field-label">{d.scene1.fields[i]}</span>
                      <span id={`af${i}v`} />
                      <span className="anim-cursor" id={`afc${i}`} style={{ display: 'none' }} />
                    </div>
                  ))}
                </div>
                <div id="aSaveBtn" className="anim-save-btn">{d.scene1.saveBtn}</div>
                <div id="aToast" className="anim-success-toast">
                  <span style={{ fontSize: '16px' }}>✓</span>
                  {d.scene1.toast}
                </div>
              </div>

              {/* Scene 2 */}
              <div className="anim-scene" id="asc1">
                <div className="anim-scene-hd">{d.scene2.heading}</div>
                <div className="anim-upload-zone" id="aUploadZone">
                  <div className="anim-upload-icon-wrap" id="aUploadIcon">📤</div>
                  <div className="anim-upload-txt">
                    <strong>{d.scene2.dropTitle}</strong><br />
                    {d.scene2.dropSub}
                  </div>
                </div>
                <div className="anim-file-card" id="aFileCard">
                  <div className="anim-file-icon">📄</div>
                  <div style={{ flex: 1 }}>
                    <div className="anim-file-name">{d.scene2.fileName}</div>
                    <div className="anim-file-size">{d.scene2.fileSize}</div>
                    <div className="anim-prog-wrap">
                      <div className="anim-prog-inner" id="aProgBar" />
                    </div>
                  </div>
                  <div id="aProgDone" className="anim-prog-done">{d.scene2.done}</div>
                </div>
              </div>

              {/* Scene 3 */}
              <div className="anim-scene" id="asc2">
                <div className="anim-scene-hd">{d.scene3.heading}</div>
                <div className="anim-ai-thinking">
                  <div className="anim-ai-orb">✦</div>
                  <div className="anim-ai-text">
                    <strong>{d.scene3.aiLabel}</strong> {d.scene3.aiText}
                    <div id="aAiDots" className="anim-ai-dots">
                      <div className="anim-ai-dot" />
                      <div className="anim-ai-dot" />
                      <div className="anim-ai-dot" />
                    </div>
                  </div>
                </div>
                <div className="anim-metrics">
                  {d.scene3.metrics.map((m, i) => (
                    <div className="anim-metric" id={`am${i}`} key={i}>
                      <div className="anim-metric-lbl">{m.label}</div>
                      <div className={`anim-metric-val ${m.color}`}>
                        <span id={`amv${i}`}>0</span>{'pct' in m && m.pct ? '%' : ''}
                      </div>
                      <div className="anim-metric-chg">{m.change}</div>
                    </div>
                  ))}
                </div>
                <div className="anim-insight" id="aInsight">
                  <strong>AI:</strong>{' '}
                  {d.scene3.insight.replace(/\*\*[^*]+\*\*/g, '').trim()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
