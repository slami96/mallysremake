'use client';
import { useLang } from './LanguageContext';

export default function Footer() {
  const { L } = useLang();
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__logo">MALLYS</div>
          <div className="footer__desc">{L('footer_desc')}</div>
          <div style={{ fontSize: 12, color: 'var(--ash)', marginBottom: 12 }}>
            {L('footer_newsletter')}
          </div>
          <div className="footer__newsletter">
            <input className="footer__nl-input" placeholder={L('footer_newsletter_placeholder')} />
            <button className="footer__nl-btn">{L('footer_subscribe')}</button>
          </div>
        </div>
        <div>
          <div className="footer__col-title">{L('footer_links')}</div>
          <a className="footer__link" onClick={() => go('products')}>{L('nav_shop')}</a>
          <a className="footer__link" onClick={() => go('story')}>{L('nav_story')}</a>
          <a className="footer__link" onClick={() => go('craft')}>{L('nav_process')}</a>
          <a className="footer__link" onClick={() => go('contact')}>{L('nav_contact')}</a>
        </div>
        <div>
          <div className="footer__col-title">Legal</div>
          <a className="footer__link">{L('footer_terms')}</a>
          <a className="footer__link">{L('footer_privacy')}</a>
          <a className="footer__link">{L('footer_shipping')}</a>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 Mallys. {L('copyright')}</span>
        <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
          {L('made_in')}
        </span>
      </div>
    </footer>
  );
}
