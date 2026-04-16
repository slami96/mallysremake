'use client';
import { useState } from 'react';
import { useApp } from './AppContext';
import Img from './Img';

export default function ProductDetail() {
  const { productDetail, setProductDetail, addToCart, lang, L } = useApp();
  const [qty, setQty] = useState(1);
  const p = productDetail;

  const close = () => { setProductDetail(null); setQty(1); };

  if (!p) return null;

  return (
    <>
      <div className={`drawer-backdrop ${p ? 'drawer-backdrop--open' : ''}`} onClick={close} />
      <aside className={`drawer pdetail ${p ? 'drawer--open' : ''}`}>
        <div className="drawer__header">
          <h3 className="drawer__title">{lang === 'cz' ? p.typeCz : p.typeEn}</h3>
          <button className="drawer__close" onClick={close} aria-label={L('close')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="drawer__body" style={{ padding: 0 }}>
          <div className="pdetail__image">
            <Img src={p.img} alt={p.nameCz} />
          </div>

          <div className="pdetail__content">
            <div className="pdetail__type">{lang === 'cz' ? p.typeCz : p.typeEn}</div>
            <h2 className="pdetail__name">{p.nameCz}</h2>
            <div className="pdetail__price">{p.price} Kč</div>

            <p className="pdetail__desc">
              {lang === 'cz' ? p.descCz : p.descEn}
            </p>

            <div className="pdetail__specs">
              {p.material && (
                <div className="pdetail__spec">
                  <span className="pdetail__spec-label">{L('material_label')}</span>
                  <span className="pdetail__spec-val">{lang === 'cz' ? p.material.cz : p.material.en}</span>
                </div>
              )}
              {p.dimensions && (
                <div className="pdetail__spec">
                  <span className="pdetail__spec-label">{L('dimensions_label')}</span>
                  <span className="pdetail__spec-val">{lang === 'cz' ? p.dimensions.cz : p.dimensions.en}</span>
                </div>
              )}
              <div className="pdetail__spec">
                <span className="pdetail__spec-label">{L('sku_label')}</span>
                <span className="pdetail__spec-val">{p.sku}</span>
              </div>
            </div>

            <div className="pdetail__note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cobalt)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
              </svg>
              <span>{L('handmade_note')}</span>
            </div>

            <div className="pdetail__actions">
              <div className="pdetail__qty">
                <button className="pdetail__qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="pdetail__qty-val">{qty}</span>
                <button className="pdetail__qty-btn" onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <button className="pdetail__add" onClick={() => { addToCart(p, qty); close(); }}>
                {L('add_to_cart')} — {p.price * qty} Kč
              </button>
            </div>

            <div className="pdetail__shipping">{L('shipping_note')}</div>
          </div>
        </div>
      </aside>
    </>
  );
}
