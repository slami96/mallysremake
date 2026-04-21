'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/components/AppContext';
import { allProducts } from '@/data/products';
import Img from '@/components/Img';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { gsap } from 'gsap';

export default function ProductPage() {
  const params = useParams();
  const { lang, L, addToCart, setCartOpen } = useApp();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  const product = allProducts.find(p => p.id === params.id);

  useEffect(() => {
    setQty(1);
    setActiveImg(0);
    setAdded(false);
    window.scrollTo(0, 0);
    gsap.fromTo('.pdp__gallery, .pdp__info > *', { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.2 });
  }, [params.id]);

  if (!product) {
    return (
      <div className="pdp__not-found">
        <h1>Product not found</h1>
        <Link href="/shop" className="products__btn"><span>{L('checkout_back')}</span></Link>
      </div>
    );
  }

  const p = product;

  // Generate 4 image slots per product (hero + 3 placeholders for alt/detail/lifestyle)
  const images = [
    { src: p.img, label: 'Main' },
    { src: p.img.replace('_hero', '_alt'), label: lang === 'cz' ? 'Další pohled' : 'Alternate view' },
    { src: p.img.replace('_hero', '_detail'), label: lang === 'cz' ? 'Detail' : 'Detail' },
    { src: p.img.replace('_hero', '_lifestyle'), label: lang === 'cz' ? 'V kontextu' : 'In context' },
  ];

  // Related products from same category, excluding current
  const related = allProducts.filter(r => r.category === p.category && r.id !== p.id).slice(0, 3);

  const handleAdd = () => {
    addToCart(p, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleAddAndGo = () => {
    addToCart(p, qty);
    setCartOpen(true);
  };

  return (
    <>
      <div className="pdp">
        {/* Breadcrumb */}
        <nav className="pdp__breadcrumb">
          <Link href="/">{L('nav_home')}</Link>
          <span>/</span>
          <Link href="/shop">{L('nav_shop')}</Link>
          <span>/</span>
          <span className="pdp__breadcrumb-current">{p.nameCz}</span>
        </nav>

        <div className="pdp__grid">
          {/* Image Gallery */}
          <div className="pdp__gallery">
            <div className="pdp__main-image">
              <Img src={images[activeImg].src} alt={`${p.nameCz} - ${images[activeImg].label}`} />
            </div>
            <div className="pdp__thumbs">
              {images.map((img, i) => (
                <button key={i}
                  className={`pdp__thumb ${activeImg === i ? 'pdp__thumb--active' : ''}`}
                  onClick={() => setActiveImg(i)}>
                  <Img src={img.src} alt={img.label} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="pdp__info">
            <div className="pdp__category">
              {lang === 'cz' ? p.typeCz : p.typeEn}
            </div>

            <h1 className="pdp__title">{p.nameCz}</h1>

            <div className="pdp__price">{p.price} Kč</div>

            <p className="pdp__description">
              {lang === 'cz' ? p.descCz : p.descEn}
            </p>

            <div className="pdp__divider" />

            {/* Specs */}
            <div className="pdp__specs">
              {p.material && (
                <div className="pdp__spec">
                  <span className="pdp__spec-label">{L('material_label')}</span>
                  <span className="pdp__spec-value">{lang === 'cz' ? p.material.cz : p.material.en}</span>
                </div>
              )}
              {p.dimensions && (
                <div className="pdp__spec">
                  <span className="pdp__spec-label">{L('dimensions_label')}</span>
                  <span className="pdp__spec-value">{lang === 'cz' ? p.dimensions.cz : p.dimensions.en}</span>
                </div>
              )}
              <div className="pdp__spec">
                <span className="pdp__spec-label">{L('sku_label')}</span>
                <span className="pdp__spec-value">{p.sku}</span>
              </div>
            </div>

            <div className="pdp__handmade">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cobalt)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
              </svg>
              <span>{L('handmade_note')}</span>
            </div>

            <div className="pdp__divider" />

            {/* Add to cart */}
            <div className="pdp__actions">
              <div className="pdp__qty">
                <button className="pdp__qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="pdp__qty-val">{qty}</span>
                <button className="pdp__qty-btn" onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <button className={`pdp__add ${added ? 'pdp__add--added' : ''}`} onClick={handleAdd}>
                {added ? L('added_to_cart') : `${L('add_to_cart')} — ${p.price * qty} Kč`}
              </button>
            </div>

            <button className="pdp__buy-now" onClick={handleAddAndGo}>
              {lang === 'cz' ? 'Koupit nyní' : 'Buy now'}
            </button>

            <div className="pdp__shipping-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span>{L('shipping_note')}</span>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="pdp__related">
            <h2 className="pdp__related-title">
              {lang === 'cz' ? 'Mohlo by se vám líbit' : 'You might also like'}
            </h2>
            <div className="pdp__related-grid">
              {related.map(r => (
                <Link href={`/shop/${r.id}`} key={r.id} className="pcard">
                  <div className="pcard__image-wrap">
                    <Img src={r.img} alt={r.nameCz} />
                  </div>
                  <div className="pcard__info">
                    <div>
                      <div className="pcard__name">{r.nameCz}</div>
                      <div className="pcard__type">{lang === 'cz' ? r.typeCz : r.typeEn}</div>
                    </div>
                    <div className="pcard__price">{r.price} Kč</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
