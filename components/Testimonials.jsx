'use client';
import { useEffect, useRef } from 'react';
import { useApp } from './AppContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Testimonials() {
  const { L } = useApp();
  const ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.testimonial', {
        opacity: 0, y: 30, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonials" ref={ref}>
      <div className="testimonials__inner">
        {[1, 2, 3].map((n) => (
          <div key={n} className="testimonial">
            <svg className="testimonial__quote-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="currentColor" opacity="0.08"/>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="currentColor" opacity="0.08"/>
            </svg>
            <p className="testimonial__text">{L(`testimonial_${n}`)}</p>
            <div className="testimonial__author">{L(`testimonial_${n}_author`)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
