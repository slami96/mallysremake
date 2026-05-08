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
        opacity: 0, y: 20, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className="testimonials" ref={ref}>
      <div className="testimonials__inner">
        {[1, 2, 3].map((n) => (
          <div key={n} className="testimonial">
            <p className="testimonial__text">"{L(`testimonial_${n}`)}"</p>
            <div className="testimonial__author">{L(`testimonial_${n}_author`)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
