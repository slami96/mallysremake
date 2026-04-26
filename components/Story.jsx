'use client';
import { useEffect, useRef } from 'react';
import { useApp } from './AppContext';
import Img from './Img';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Story() {
  const { L } = useApp();
  const ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.story__image-wrap', {
        opacity: 0, scale: 1.04, duration: 1.6, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
      gsap.from('.story__overlay-label, .story__overlay-title', {
        opacity: 0, y: 30, duration: 1.2, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      });
      gsap.from('.story__body p, .story__link', {
        opacity: 0, y: 25, duration: 1, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.story__body', start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="story" id="story" ref={ref}>
      <div className="story__image-wrap">
        <Img src="/images/site/story_atelier.jpg" alt="Mallys atelier" />
        <div className="story__image-overlay" />
        <div className="story__overlay-content">
          <div className="story__overlay-label">{L('story_label')}</div>
          <h2 className="story__overlay-title">
            {L('story_title').split(' ').map((w, i, a) =>
              i === a.length - 1 ? <em key={i}>{w}</em> : <span key={i}>{w} </span>
            )}
          </h2>
        </div>
      </div>
      <div className="story__body">
        <p>{L('story_p1')}</p>
        <p>{L('story_p2')}</p>
        <Link href="/about" className="story__link">
          <span>{L('story_link')}</span>
          <svg width="16" height="12" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="0" y1="8" x2="22" y2="8"/><polyline points="16 2 22 8 16 14"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}
