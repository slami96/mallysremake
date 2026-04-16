'use client';
import { useApp } from './AppContext';
import Img from './Img';

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cart, cartTotal, updateQty, removeItem, L, lang } = useApp();

  return (
    <>
      <div className={`drawer-backdrop ${cartOpen ? 'drawer-backdrop--open' : ''}`}
        onClick={() => setCartOpen(false)} />
      <aside className={`drawer ${cartOpen ? 'drawer--open' : ''}`}>
        <div className="drawer__header">
          <h3 className="drawer__title">{L('cart_title')}</h3>
          <button className="drawer__close" onClick={() => setCartOpen(false)} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="drawer__body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <p className="cart-empty__text">{L('cart_empty')}</p>
              <button className="cart-empty__btn" onClick={() => setCartOpen(false)}>
                {L('cart_empty_cta')}
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item__img">
                  <Img src={item.img} alt={item.nameCz} />
                </div>
                <div className="cart-item__info">
                  <div className="cart-item__name">{item.nameCz}</div>
                  <div className="cart-item__type">{lang === 'cz' ? item.typeCz : item.typeEn}</div>
                  <div className="cart-item__price">{item.price} Kč</div>
                  <div className="cart-item__qty">
                    <button className="cart-item__qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span className="cart-item__qty-val">{item.qty}</span>
                    <button className="cart-item__qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                </div>
                <button className="cart-item__remove" onClick={() => removeItem(item.id)} aria-label={L('remove')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer__footer">
            <div className="cart-total">
              <span className="cart-total__label">{L('cart_subtotal')}</span>
              <span className="cart-total__val">{cartTotal} Kč</span>
            </div>
            <div className="cart-shipping-note">{L('cart_shipping')}</div>
            <button className="cart-checkout">{L('cart_checkout')}</button>
          </div>
        )}
      </aside>
    </>
  );
}
