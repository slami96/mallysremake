'use client';
import Link from 'next/link';
import { useApp } from './AppContext';
import { usePathname, useRouter } from 'next/navigation';

export default function Footer() {
  const { L, darkMode } = useApp();
  const pathname = usePathname();
  const router = useRouter();

  const scrollOrNavigate = (sectionId) => {
    if (pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#' + sectionId);
    }
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <img
            src={darkMode ? '/images/logo_header.png' : '/images/logo_dark.png'}
            alt="Mallys"
            className="footer__logo-img"
          />
          <p className="footer__desc">{L('footer_desc')}</p>
        </div>
        <div>
          <div className="footer__col-title">{L('footer_links')}</div>
          <Link href="/shop" className="footer__link">{L('nav_shop')}</Link>
          <Link href="/about" className="footer__link">{L('nav_story')}</Link>
          <a className="footer__link" onClick={() => scrollOrNavigate('craft')}>{L('nav_process')}</a>
          <a className="footer__link" onClick={() => scrollOrNavigate('contact')}>{L('nav_contact')}</a>
        </div>
        <div>
          <div className="footer__col-title">{L('footer_legal')}</div>
          <a className="footer__link">{L('footer_terms')}</a>
          <a className="footer__link">{L('footer_privacy')}</a>
          <a className="footer__link">{L('footer_shipping')}</a>
        </div>
        <div>
          <div className="footer__col-title">{L('footer_newsletter')}</div>
          <p className="footer__nl-desc">{L('footer_nl_desc')}</p>
          <form className="footer__nl" onSubmit={(e) => e.preventDefault()}>
            <input className="footer__nl-input" type="email" placeholder={L('footer_nl_placeholder')} />
            <button className="footer__nl-btn" type="submit">
              <svg width="20" height="12" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="0" y1="8" x2="22" y2="8"/><polyline points="16 2 22 8 16 14"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 Mallys. {L('copyright')}</span>
        <em>{L('made_in')}</em>
      </div>
    </footer>
  );
}
