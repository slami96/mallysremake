'use client';
import { useEffect, useRef } from 'react';
import { useApp } from './AppContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Contact() {
  const { L } = useApp();
  const ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.contact__label, .contact__title, .contact__form > *, .contact__info > *', {
        opacity: 0, y: 30, duration: 1, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="section__label contact__label">{L('contact_label')}</div>
      <h2 className="section__title contact__title">
        {L('contact_title').split(' ').map((w, i, a) =>
          i === a.length - 1 ? <em key={i}>{w}</em> : <span key={i}>{w} </span>
        )}
      </h2>

      <div className="contact__grid">
        <form className="contact__form" onSubmit={(e) => e.preventDefault()}>
          <div className="contact__field">
            <input className="contact__input" placeholder={L('contact_name')} required />
          </div>
          <div className="contact__field">
            <input className="contact__input" type="email" placeholder={L('contact_email')} required />
          </div>
          <div className="contact__field">
            <textarea className="contact__textarea" placeholder={L('contact_message')} required />
          </div>
          <button className="contact__submit" type="submit">
            <span>{L('contact_send')}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </form>

        <div className="contact__info">
          <div className="contact__info-title">Atelier Mallys</div>
          <div className="contact__info-line">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Broumovsko, Czech Republic</span>
          </div>
          <div className="contact__info-line">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <a href="mailto:atelier@mallys.cz">atelier@mallys.cz</a>
          </div>
          <div className="contact__info-line">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>
            </svg>
            <a href="tel:+420737888656">+420 737 888 656</a>
          </div>
          <div className="contact__socials">
            <a className="contact__social" href="https://instagram.com" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a className="contact__social" href="https://facebook.com/mallys.cz" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a className="contact__social" href="https://pinterest.com" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="8" y1="22" x2="12" y2="12"/><path d="M12 7a5 5 0 1 1 0 10c-2 0-3-1-3-1"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
