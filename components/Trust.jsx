'use client';
import { useLang } from './LanguageContext';

const icons = [
  <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--stone)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c-4-3-8-7-8-12a8 8 0 0 1 16 0c0 5-4 9-8 12z"/><circle cx="12" cy="10" r="3"/></svg>,
  <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--stone)" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2C8 6 4 10 4 14a8 8 0 0 0 16 0c0-4-4-8-8-12z"/></svg>,
  <svg key="3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--stone)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V8"/><path d="M5 12l7-4 7 4"/><path d="M5 16l7 4 7-4"/><path d="M19 8l-7 4-7-4 7-4z"/></svg>,
  <svg key="4" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--stone)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/></svg>,
];

const keys = ['trust_1', 'trust_2', 'trust_3', 'trust_4'];

export default function Trust() {
  const { L } = useLang();

  return (
    <div className="trust">
      <div className="trust__inner">
        {keys.map((key, i) => (
          <div key={key}>
            <div className="trust__icon">{icons[i]}</div>
            <div className="trust__text">{L(key)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
