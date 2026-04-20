'use client';
import { useEffect, useRef } from 'react';
import { useApp } from './AppContext';
import { featuredProducts } from '@/data/products';
import Img from './Img';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Products() {
  const { lang, L, setProductDetail } = useApp();
  const ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.products__header > *', {
        opacity: 0, y: 30, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
      gsap.from('.pcard', {
        opacity: 0, y: 60, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.products__grid', start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="products" id="products" ref={ref}>
      <div className="products__header">
        <div>
          <div className="section__label">{L('pieces_label')}</div>
          <h2 className="section__title">
            {L('pieces_title').split(' ').map((w, i, a) =>
              i === a.length - 1 ? <em key={i}>{w}</em> : <span key={i}>{w} </span>
            )}
          </h2>
        </div>
      </div>

      <div className="products__grid">
        {featuredProducts.map((p) => (
          <div key={p.id} className="pcard" onClick={() => setProductDetail(p)}>
            <div className="pcard__image-wrap">
              <Img src={p.img} alt={p.nameCz} />
              {p.featured && (
                <div className="pcard__quick">
                  <button className="pcard__quick-btn" onClick={(e) => { e.stopPropagation(); setProductDetail(p); }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <span>{L('add_to_cart')}</span>
                  </button>
                </div>
              )}
            </div>
            <div className="pcard__info">
              <div>
                <div className="pcard__name">{p.nameCz}</div>
                <div className="pcard__type">{lang === 'cz' ? p.typeCz : p.typeEn}</div>
              </div>
              <div className="pcard__price">{p.price} Kč</div>
            </div>
          </div>
        ))}
      </div>

      <div className="products__cta-wrap">
        <Link href="/shop" className="products__btn">
          <span>{L('pieces_cta')}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}
