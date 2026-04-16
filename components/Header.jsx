'use client';
import { useState, useEffect } from 'react';
import { useLang } from './LanguageContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang, L } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const textColor = scrolled ? 'var(--charcoal)' : 'var(--porcelain)';
  const linkColor = scrolled ? 'var(--stone)' : 'rgba(247,243,238,0.8)';

  const langStyle = (active) => ({
    background: active ? (scrolled ? 'var(--charcoal)' : 'var(--porcelain)') : 'transparent',
    color: active ? (scrolled ? 'var(--porcelain)' : 'var(--charcoal)') : (scrolled ? 'var(--ash)' : 'rgba(247,243,238,0.5)'),
  });

  return (
    <header className={`header ${scrolled ? 'header--solid' : 'header--transparent'}`}>
      <a
        className="header__logo"
        style={{ color: textColor }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        MALLYS
      </a>

      <nav className="header__nav">
        {[
          ['nav_story', 'story'],
          ['nav_process', 'craft'],
          ['nav_shop', 'products'],
          ['nav_contact', 'contact'],
        ].map(([key, id]) => (
          <button
            key={key}
            className="header__link"
            style={{ color: linkColor }}
            onClick={() => go(id)}
          >
            {L(key)}
          </button>
        ))}
      </nav>

      <div className="header__right">
        <div className="lang-toggle" onClick={toggleLang}>
          <span style={langStyle(lang === 'cz')}>CZ</span>
          <span style={langStyle(lang === 'en')}>EN</span>
        </div>
        <span className="header__cart" style={{ color: textColor }}>
          Cart (0)
        </span>
      </div>
    </header>
  );
}
