'use client';
import { useApp } from './AppContext';

export default function ShippingBanner() {
  const { L } = useApp();
  return (
    <div className="shipping-banner">
      <div className="shipping-banner__inner">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
        <span>{L('shipping_banner')}</span>
      </div>
    </div>
  );
}
