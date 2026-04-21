'use client';
import { useState } from 'react';
import { useApp } from '@/components/AppContext';
import Img from '@/components/Img';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartTotal, L, lang } = useApp();
  const [payment, setPayment] = useState('card');
  const [submitted, setSubmitted] = useState(false);

  const shippingFree = cartTotal >= 1500;
  const shippingCost = shippingFree ? 0 : 129;
  const total = cartTotal + shippingCost;

  if (submitted) {
    return (
      <div className="checkout__success">
        <div className="checkout__success-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--moss)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h1 className="checkout__success-title">{L('checkout_success')}</h1>
        <p className="checkout__success-desc">{L('checkout_success_desc')}</p>
        <Link href="/shop" className="products__btn" style={{ marginTop: 32 }}>
          <span>{L('checkout_continue')}</span>
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout__success">
        <h1 className="checkout__success-title">{L('cart_empty')}</h1>
        <Link href="/shop" className="products__btn" style={{ marginTop: 32 }}>
          <span>{L('checkout_back')}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout__header">
        <Link href="/" className="checkout__logo">Mallys</Link>
        <h1 className="checkout__title">{L('checkout_title')}</h1>
        <Link href="/shop" className="checkout__back">{L('checkout_back')}</Link>
      </div>

      <div className="checkout__grid">
        <div className="checkout__forms">
          {/* Contact */}
          <div className="checkout__section">
            <h2 className="checkout__section-title">
              <span className="checkout__step">1</span>
              {L('checkout_contact')}
            </h2>
            <div className="checkout__row">
              <input className="checkout__input" placeholder={L('checkout_firstname')} />
              <input className="checkout__input" placeholder={L('checkout_lastname')} />
            </div>
            <div className="checkout__row">
              <input className="checkout__input" type="email" placeholder={L('checkout_email')} />
              <input className="checkout__input" type="tel" placeholder={L('checkout_phone')} />
            </div>
          </div>

          {/* Shipping */}
          <div className="checkout__section">
            <h2 className="checkout__section-title">
              <span className="checkout__step">2</span>
              {L('checkout_shipping')}
            </h2>
            <input className="checkout__input checkout__input--full" placeholder={L('checkout_street')} />
            <div className="checkout__row">
              <input className="checkout__input" placeholder={L('checkout_city')} />
              <input className="checkout__input checkout__input--sm" placeholder={L('checkout_zip')} />
            </div>
            <select className="checkout__input checkout__input--full checkout__select">
              <option>{lang === 'cz' ? 'Česká republika' : 'Czech Republic'}</option>
              <option>{lang === 'cz' ? 'Slovensko' : 'Slovakia'}</option>
              <option>{lang === 'cz' ? 'Německo' : 'Germany'}</option>
              <option>{lang === 'cz' ? 'Rakousko' : 'Austria'}</option>
              <option>{lang === 'cz' ? 'Polsko' : 'Poland'}</option>
            </select>
          </div>

          {/* Payment */}
          <div className="checkout__section">
            <h2 className="checkout__section-title">
              <span className="checkout__step">3</span>
              {L('checkout_payment')}
            </h2>
            <div className="checkout__payment-options">
              {[
                { id: 'card', label: L('checkout_card'), icon: '💳' },
                { id: 'bank', label: L('checkout_bank'), icon: '🏦' },
                { id: 'cod', label: L('checkout_cod'), icon: '📦' },
              ].map((opt) => (
                <button key={opt.id}
                  className={`checkout__payment-opt ${payment === opt.id ? 'checkout__payment-opt--active' : ''}`}
                  onClick={() => setPayment(opt.id)}>
                  <span className="checkout__payment-icon">{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>

            {payment === 'card' && (
              <div className="checkout__card-fields">
                <input className="checkout__input checkout__input--full" placeholder={L('checkout_card_number')} />
                <div className="checkout__row">
                  <input className="checkout__input" placeholder={L('checkout_card_expiry')} />
                  <input className="checkout__input checkout__input--sm" placeholder={L('checkout_card_cvc')} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="checkout__summary">
          <div className="checkout__summary-inner">
            <h2 className="checkout__summary-title">{L('checkout_summary')}</h2>

            <div className="checkout__items">
              {cart.map((item) => (
                <div key={item.id} className="checkout__item">
                  <div className="checkout__item-img">
                    <Img src={item.img} alt={item.nameCz} />
                    <span className="checkout__item-qty">{item.qty}</span>
                  </div>
                  <div className="checkout__item-info">
                    <span className="checkout__item-name">{item.nameCz}</span>
                    <span className="checkout__item-type">{lang === 'cz' ? item.typeCz : item.typeEn}</span>
                  </div>
                  <span className="checkout__item-price">{item.price * item.qty} Kč</span>
                </div>
              ))}
            </div>

            <div className="checkout__totals">
              <div className="checkout__total-row">
                <span>{L('checkout_subtotal')}</span>
                <span>{cartTotal} Kč</span>
              </div>
              <div className="checkout__total-row">
                <span>{L('checkout_shipping_cost')}</span>
                <span>{shippingFree ? L('checkout_shipping_free') : `${shippingCost} Kč`}</span>
              </div>
              <div className="checkout__total-row checkout__total-row--final">
                <span>{L('checkout_total')}</span>
                <span>{total} Kč</span>
              </div>
            </div>

            <button className="checkout__submit" onClick={() => setSubmitted(true)}>
              {L('checkout_place_order')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
