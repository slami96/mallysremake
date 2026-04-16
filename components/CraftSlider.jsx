'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from './AppContext';
import Img from './Img';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CraftSlider() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const { L } = useApp();

  const move = useCallback((clientX) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, x)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      e.preventDefault();
      move(e.touches ? e.touches[0].clientX : e.clientX);
    };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging, move]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.craft__header > *, .craft__slider, .craft__hint', {
        opacity: 0, y: 40, duration: 1.2, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleStart = (clientX) => {
    setDragging(true);
    move(clientX);
  };

  return (
    <section className="craft" id="craft" ref={sectionRef}>
      <div className="craft__inner">
        <div className="craft__header">
          <div className="section__label">{L('craft_label')}</div>
          <h2 className="section__title">
            {L('craft_title').split(' ').map((w, i, a) =>
              i === a.length - 1 ? <em key={i}>{w}</em> : <span key={i}>{w} </span>
            )}
          </h2>
          <p className="section__intro" style={{ margin: '20px auto 0' }}>{L('craft_desc')}</p>
        </div>

        <div
          className="craft__slider"
          ref={ref}
          onMouseDown={(e) => handleStart(e.clientX)}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        >
          <div className="craft__tag craft__tag--finished">{L('craft_label_finished')}</div>
          <div className="craft__tag craft__tag--raw">{L('craft_label_raw')}</div>

          <div className="craft__layer">
            <Img src="/images/site/slider_finished.jpg" alt="Finished piece" />
          </div>
          <div className="craft__layer" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Img src="/images/site/slider_raw.jpg" alt="Raw piece" />
          </div>

          <div className="craft__divider" style={{ left: `${pos}%` }} />
          <div className="craft__handle" style={{ left: `${pos}%` }}>
            {!dragging && <div className="craft__handle-ring" />}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
              <polyline points="9 18 15 12 9 6" transform="translate(0 0)"/>
            </svg>
          </div>
        </div>

        <div className="craft__hint">{L('craft_hint')}</div>
      </div>
    </section>
  );
}
