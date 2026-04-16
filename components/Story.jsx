'use client';
import { useLang } from './LanguageContext';
import Img from './Img';

export default function Story() {
  const { L } = useLang();

  return (
    <section className="section" id="story">
      <div className="section__label">{L('about_label')}</div>
      <h2 className="section__title">{L('story_title')}</h2>
      <div className="section__line" />
      <div className="story__grid">
        <div className="story__image-wrap">
          <Img src="/images/site/story_atelier.jpg" alt="Mallys atelier" />
        </div>
        <div className="story__text">
          <p>{L('story_p1')}</p>
          <p>{L('story_p2')}</p>
          <button className="story__link">{L('story_link')}</button>
        </div>
      </div>
    </section>
  );
}
