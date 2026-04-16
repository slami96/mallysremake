'use client';
import { useState, useEffect, useRef } from 'react';
import { useApp } from './AppContext';
import { heroImages } from '@/data/products';
import Img from './Img';
import { gsap } from 'gsap';

export default function Hero() {
  const [index, setIndex] = useState(0);
  const { L } = useApp();
  const containerRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero__eyebrow', { opacity: 0, y: 20, duration: 1, delay: 0.3 })
        .from('.hero__tagline-word', {
          opacity: 0, y: 50, duration: 1.2, stagger: 0.08,
        }, '-=0.6')
        .from('.hero__sub', { opacity: 0, y: 20, duration: 1 }, '-=0.7')
        .from('.hero__cta', { opacity: 0, y: 20, duration: 1 }, '-=0.7')
        .from('.hero__indicators, .hero__scroll', {
          opacity: 0, duration: 1.2,
        }, '-=0.8');
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const line1 = L('hero_tagline_1').split(' ');
  const line2 = L('hero_tagline_2').split(' ');

  return (
    <section className="hero" ref={containerRef}>
      {heroImages.map((src, i) => (
        <div key={i} className={`hero__slide ${index === i ? 'hero__slide--active' : ''}`}>
          <Img src={src} alt={`Mallys ${i + 1}`} className="hero__slide-img" />
          <div className="hero__overlay" />
        </div>
      ))}

      <div className="hero__content">
        <div className="hero__eyebrow">
          <span>Est. Broumovsko</span>
        </div>

        <h1 className="hero__tagline" ref={taglineRef}>
          <span className="hero__tagline-line">
            {line1.map((word, i) => (
              <span key={i} className="hero__tagline-word">
                {word}{i < line1.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </span>
          <span className="hero__tagline-line">
            {line2.map((word, i) => (
              <span key={i} className="hero__tagline-word">
                <em>{word}</em>{i < line2.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero__sub">{L('hero_sub')}</p>

        <button className="hero__cta" onClick={() => go('story')}>
          <span>{L('hero_cta')}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>

      <div className="hero__indicators">
        {heroImages.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${index === i ? 'hero__dot--active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="hero__scroll">
        <span>{L('hero_scroll')}</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
