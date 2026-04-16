'use client';
import { useState } from 'react';

export default function Img({ src, alt, className, style, fallbackColor }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`img-fallback ${className || ''}`}
        style={{ background: fallbackColor || 'var(--cream)', ...style }}
      >
        <span>{src?.split('/').pop() || 'image'}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || ''}
      className={className}
      style={style}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}
