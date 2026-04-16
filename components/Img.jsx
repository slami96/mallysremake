'use client';
import { useState } from 'react';

export default function Img({ src, alt, className, style }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div
        className={className}
        style={{
          background: 'linear-gradient(135deg, #EDE6DA 0%, #D4C9B8 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          ...style,
        }}
      >
        <span style={{
          fontSize: 10, color: 'var(--ash)', fontStyle: 'italic',
          fontFamily: 'var(--sans)', padding: 8, textAlign: 'center',
        }}>
          {src?.split('/').pop()}
        </span>
      </div>
    );
  }
  return (
    <img src={src} alt={alt || ''} className={className} style={style}
      onError={() => setErr(true)} loading="lazy" draggable={false} />
  );
}
