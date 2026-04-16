'use client';
import { useEffect, useRef } from 'react';
import { useApp } from './AppContext';
import Img from './Img';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Parallax() {
  const { lang } = useApp();
  const ref = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        y: 120, ease: 'none',
        scrollTrigger: {
          trigger: ref.current, start: 'top bottom', end: 'bottom top',
          scrub: 0.8,
        },
      });
      gsap.from('.parallax__quote-text, .parallax__quote-attr', {
        opacity: 0, y: 30, duration: 1.2, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const quote = lang === 'cz'
    ? 'Ukryté v lesích na pomezí Broumovska, kde každý kousek nese klid hor a vůni hlíny.'
    : 'Hidden in the forests of Broumovsko, where every piece carries the silence of the mountains and the scent of clay.';

  return (
    <div className="parallax" ref={ref}>
      <div className="parallax__wrap" ref={imgRef}>
        <Img src="/images/site/landscape_broumovsko.jpg" alt="Broumovsko" className="parallax__img" />
      </div>
      <div className="parallax__overlay" />
      <div className="parallax__quote">
        <div>
          <div className="parallax__quote-text">"{quote}"</div>
          <div className="parallax__quote-attr">
            <span>Broumovsko · Czech Republic</span>
          </div>
        </div>
      </div>
    </div>
  );
}
