'use client';
import { useLang } from './LanguageContext';

export default function Contact() {
  const { L } = useLang();

  return (
    <section className="section" id="contact">
      <div className="section__label">{L('nav_contact')}</div>
      <h2 className="section__title">{L('contact_title')}</h2>
      <div className="section__line" />
      <div className="contact__grid">
        <form className="contact__form" onSubmit={(e) => e.preventDefault()}>
          <input className="contact__input" placeholder={L('contact_name')} />
          <input className="contact__input" placeholder={L('contact_email')} type="email" />
          <textarea className="contact__textarea" placeholder={L('contact_message')} />
          <button className="contact__submit" type="submit">{L('contact_send')}</button>
        </form>
        <div className="contact__info">
          <div className="contact__info-title">Mallys</div>
          <div className="contact__info-line">Broumovsko, Czech Republic</div>
          <div className="contact__info-line">
            <a href="mailto:atelier@mallys.cz">atelier@mallys.cz</a>
          </div>
          <div className="contact__info-line">
            <a href="tel:+420737888656">+420 737 888 656</a>
          </div>
          <div className="contact__socials">
            <a className="contact__social" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">IG</a>
            <a className="contact__social" href="https://www.facebook.com/mallys.cz" target="_blank" rel="noopener noreferrer">FB</a>
            <a className="contact__social" href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">PI</a>
          </div>
        </div>
      </div>
    </section>
  );
}
