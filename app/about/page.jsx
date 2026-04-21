'use client';
import { useEffect, useRef } from 'react';
import { useApp } from '@/components/AppContext';
import Img from '@/components/Img';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutPage() {
  const { L } = useApp();
  const ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.about__hero-title, .about__hero-sub', {
        opacity: 0, y: 30, duration: 1.2, stagger: 0.15, ease: 'power3.out',
      });
      gsap.from('.about__img-wrap', {
        opacity: 0, x: -50, duration: 1.4, ease: 'power3.out',
        scrollTrigger: { trigger: '.about__content', start: 'top 70%' },
      });
      gsap.from('.about__text p', {
        opacity: 0, y: 25, duration: 1, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.about__text', start: 'top 70%' },
      });
      gsap.from('.about__val', {
        opacity: 0, y: 40, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.about__values', start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <div className="about__hero">
        <h1 className="about__hero-title">{L('about_title')}</h1>
        <p className="about__hero-sub">{L('about_sub')}</p>
      </div>

      <div className="about__content">
        <div className="about__grid">
          <div className="about__img-wrap">
            <Img src="/images/site/story_atelier.jpg" alt="Mallys atelier" />
          </div>
          <div className="about__text">
            <p>{L('about_p1')}</p>
            <p>{L('about_p2')}</p>
          </div>
        </div>

        <div className="about__portrait-section">
          <div className="about__portrait-wrap">
            <Img src="/images/site/story_portrait.jpg" alt="Mallys maker" />
          </div>
          <div className="about__text">
            <p>{L('about_p3')}</p>
            <p>{L('about_p4')}</p>
          </div>
        </div>

        <div className="about__values">
          <h2 className="about__values-title">{L('about_values_title')}</h2>
          <div className="about__values-grid">
            {[1, 2, 3].map((n) => (
              <div key={n} className="about__val">
                <div className="about__val-num">0{n}</div>
                <h3 className="about__val-title">{L(`about_val_${n}_title`)}</h3>
                <p className="about__val-desc">{L(`about_val_${n}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about__cta-wrap">
          <Link href="/shop" className="products__btn">
            <span>{L('about_cta')}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
