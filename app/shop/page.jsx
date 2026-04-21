'use client';
import { useState, useEffect, useMemo } from 'react';
import { useApp } from '@/components/AppContext';
import { allProducts, categories } from '@/data/products';
import Img from '@/components/Img';
import Footer from '@/components/Footer';
import { gsap } from 'gsap';

function ShopCard({ p }) {
  const { lang, L, addToCart, setProductDetail } = useApp();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(p, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="pcard" onClick={() => setProductDetail(p)}>
      <div className="pcard__image-wrap">
        <Img src={p.img} alt={p.nameCz} />
        {p.featured && <div className="pcard__badge">{L('popular')}</div>}
        <div className="pcard__hover-actions">
          <button className="pcard__action-btn pcard__action-btn--add" onClick={handleAdd}>
            {justAdded ? L('added_to_cart') : L('add_to_cart')}
          </button>
          <button className="pcard__action-btn pcard__action-btn--view"
            onClick={(e) => { e.stopPropagation(); setProductDetail(p); }}>
            {L('quick_view')}
          </button>
        </div>
      </div>
      <div className="pcard__info">
        <div>
          <div className="pcard__name">{p.nameCz}</div>
          <div className="pcard__type">{lang === 'cz' ? p.typeCz : p.typeEn}</div>
        </div>
        <div className="pcard__price">{p.price} Kč</div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const { lang, L } = useApp();
  const [activeCat, setActiveCat] = useState('all');
  const [sort, setSort] = useState('featured');

  const filtered = useMemo(() => {
    let items = activeCat === 'all' ? [...allProducts] : allProducts.filter(p => p.category === activeCat);
    switch (sort) {
      case 'price_low': return items.sort((a, b) => a.price - b.price);
      case 'price_high': return items.sort((a, b) => b.price - a.price);
      case 'name': return items.sort((a, b) => a.nameCz.localeCompare(b.nameCz));
      default: return items;
    }
  }, [activeCat, sort]);

  useEffect(() => {
    gsap.fromTo('.pcard', { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out', clearProps: 'all' });
  }, [activeCat, sort]);

  useEffect(() => {
    gsap.fromTo('.shop-hero__title, .shop-hero__sub', { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' });
  }, []);

  return (
    <>
      <div className="shop-hero">
        <h1 className="shop-hero__title">
          {lang === 'cz' ? <><em>Kolekce</em></> : <>The <em>Collection</em></>}
        </h1>
        <p className="shop-hero__sub">{L('shop_hero_sub')}</p>
      </div>
      <div className="shop">
        <div className="shop__filters">
          <div className="shop__cats">
            {categories.map(cat => (
              <button key={cat.id}
                className={`shop__cat ${activeCat === cat.id ? 'shop__cat--active' : ''}`}
                onClick={() => setActiveCat(cat.id)}>
                {L(cat.labelKey)}
              </button>
            ))}
          </div>
          <div className="shop__meta">
            <span className="shop__count">{filtered.length} {L('products_count')}</span>
            <select className="shop__sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">{L('sort_featured')}</option>
              <option value="price_low">{L('sort_price_low')}</option>
              <option value="price_high">{L('sort_price_high')}</option>
              <option value="name">{L('sort_name')}</option>
            </select>
          </div>
        </div>
        <div className="products__grid">
          {filtered.map((p) => <ShopCard key={p.id} p={p} />)}
        </div>
      </div>
      <Footer />
    </>
  );
}
