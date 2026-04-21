'use client';
import { useApp } from './AppContext';
import Link from 'next/link';

export default function Header() {
  const { lang, setLang, L, cartCount, setCartOpen } = useApp();

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header">
      <div className="header__inner">
        <Link href="/" className="header__logo-wrap">
          <img src="/images/logo_header.png" alt="Mallys" className="header__logo-img" />
        </Link>

        <nav className="header__nav">
          <button className="header__link" onClick={() => go('story')}>{L('nav_story')}</button>
          <button className="header__link" onClick={() => go('craft')}>{L('nav_process')}</button>
          <Link href="/shop" className="header__link">{L('nav_shop')}</Link>
          <button className="header__link" onClick={() => go('contact')}>{L('nav_contact')}</button>
        </nav>

        <div className="header__right">
          <div className="lang-toggle">
            <button className={`lang-toggle__opt ${lang === 'cz' ? 'lang-toggle__opt--active' : ''}`}
              onClick={() => setLang('cz')}>CZ</button>
            <button className={`lang-toggle__opt ${lang === 'en' ? 'lang-toggle__opt--active' : ''}`}
              onClick={() => setLang('en')}>EN</button>
          </div>
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
