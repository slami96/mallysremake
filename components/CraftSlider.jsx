'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useLang } from './LanguageContext';
import Img from './Img';

export default function CraftSlider() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef(null);
  const { L } = useLang();

  const move = useCallback((clientX) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, x)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => move(e.touches ? e.touches[0].clientX : e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging, move]);

  return (
    <section className="craft" id="craft">
      <div className="craft__inner">
        <div className="section__label">{L('process_label')}</div>
        <h2 className="section__title">{L('craft_title')}</h2>
        <div className="section__line" />
        <p style={{ fontSize: 15, color: 'var(--stone)', maxWidth: 500, lineHeight: 1.7 }}>
          {L('craft_desc')}
        </p>

        <div
          className="craft__slider"
          ref={ref}
          onMouseDown={(e) => { setDragging(true); move(e.clientX); }}
          onTouchStart={(e) => { setDragging(true); move(e.touches[0].clientX); }}
        >
          <div className="craft__layer">
            <Img src="/images/site/slider_finished.jpg" alt="Finished porcelain" />
          </div>
          <div className="craft__layer" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Img src="/images/site/slider_raw.jpg" alt="Raw porcelain" />
          </div>
          <div className="craft__divider" style={{ left: `${pos}%` }} />
          <div className="craft__handle" style={{ left: `${pos}%` }}>
            <span className="craft__arrows">‹ ›</span>
          </div>
        </div>

        <div className="craft__labels">
          <span>{L('craft_label_raw')}</span>
          <span>{L('craft_label_finished')}</span>
        </div>
      </div>
    </section>
  );
}
