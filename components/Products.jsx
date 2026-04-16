'use client';
import { useLang } from './LanguageContext';
import { featuredProducts } from '@/data/products';
import Img from './Img';

export default function Products() {
  const { lang, L } = useLang();

  return (
    <section className="section" id="products">
      <div className="section__label">{L('selection_label')}</div>
      <h2 className="section__title">{L('pieces_title')}</h2>
      <div className="section__line" />

      <div className="products__grid">
        {featuredProducts.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-card__image">
              {p.featured && (
                <div className="product-card__badge">{L('popular')}</div>
              )}
              <Img src={p.img} alt={p.nameCz} />
            </div>
            <div className="product-card__name">{p.nameCz}</div>
            <div className="product-card__type">
              {lang === 'cz' ? p.typeCz : p.typeEn}
            </div>
            <div className="product-card__price">{p.price} Kč</div>
          </div>
        ))}
      </div>

      <div className="products__cta">
        <button className="products__btn">{L('pieces_cta')}</button>
      </div>
    </section>
  );
}
