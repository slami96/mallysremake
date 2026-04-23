'use client';
import { useApp } from './AppContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const { lang, setLang, L, cartCount, setCartOpen, darkMode, toggleDark } = useApp();
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
    <header className="header">
      <div className="header__inner">
        <Link href="/" className="header__logo-wrap">
          <img
            src={darkMode ? '/images/logo_header.png' : '/images/logo_header.png'}
            alt="Mallys"
            className="header__logo-img"
          />
        </Link>

        <nav className="header__nav">
          <button className="header__link" onClick={() => scrollOrNavigate('story')}>{L('nav_story')}</button>
          <button className="header__link" onClick={() => scrollOrNavigate('craft')}>{L('nav_process')}</button>
          <Link href="/shop" className="header__link">{L('nav_shop')}</Link>
          <button className="header__link" onClick={() => scrollOrNavigate('contact')}>{L('nav_contact')}</button>
        </nav>

        <div className="header__right">
          <div className="lang-toggle">
            <button className={`lang-toggle__opt ${lang === 'cz' ? 'lang-toggle__opt--active' : ''}`}
              onClick={() => setLang('cz')}>CZ</button>
            <button className={`lang-toggle__opt ${lang === 'en' ? 'lang-toggle__opt--active' : ''}`}
              onClick={() => setLang('en')}>EN</button>
          </div>

          <button className="theme-toggle" onClick={toggleDark} aria-label="Toggle dark mode">
            {darkMode ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span>{L('cart_label')}</span>
            {cartCount > 0 && <span className="cart-btn__badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
