'use client';
import { useState, useEffect } from 'react';
import { useLang } from './LanguageContext';
import { heroImages } from '@/data/products';
import Img from './Img';

export default function Hero() {
  const [index, setIndex] = useState(0);
  const { L } = useLang();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero">
      {heroImages.map((src, i) => (
        <div key={i} className="hero__slide" style={{ opacity: index === i ? 1 : 0 }}>
          <Img src={src} alt={`Mallys hero ${i + 1}`} className="hero__slide-img" />
          <div className="hero__overlay" />
        </div>
      ))}
      <div className="hero__content">
        <h1 className="hero__tagline">{L('hero_tagline')}</h1>
        <p className="hero__sub">{L('hero_sub')}</p>
        <button className="hero__cta" onClick={() => go('products')}>
          {L('hero_cta')}
        </button>
      </div>
      <div className="hero__dots">
        {heroImages.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${index === i ? 'hero__dot--active' : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
