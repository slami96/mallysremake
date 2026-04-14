import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Language Context ─── */
const t = {
  nav_shop: { cz: "Obchod", en: "Shop" },
  nav_collections: { cz: "Kolekce", en: "Collections" },
  nav_story: { cz: "Náš příběh", en: "Our Story" },
  nav_atelier: { cz: "Ateliér", en: "Atelier" },
  nav_contact: { cz: "Kontakt", en: "Contact" },
  hero_tagline: { cz: "Kde řemeslo přechází v umění", en: "Where craft becomes art" },
  hero_sub: { cz: "Autorský porcelán z Broumovska", en: "Artisan porcelain from Broumovsko" },
  hero_cta: { cz: "Objevte naši tvorbu", en: "Explore our craft" },
  craft_title: { cz: "Od hlíny k umění", en: "From clay to art" },
  craft_desc: { cz: "Tři výpaly. Dvě ruce. Jeden příběh.", en: "Three firings. Two hands. One story." },
  craft_label_raw: { cz: "Surový porcelán", en: "Raw porcelain" },
  craft_label_finished: { cz: "Hotový kousek", en: "Finished piece" },
  story_title: { cz: "Náš příběh", en: "Our Story" },
  story_p1: { cz: "V našem ateliéru, ukrytém v zeleni krásné přírody na pomezí CHKO Broumovsko a Jestřebích hor, se věnujeme autorské práci s porcelánem.", en: "In our atelier, nestled in the beautiful nature between the Broumovsko highlands and the Jestřebí mountains, we dedicate ourselves to original work with porcelain." },
  story_p2: { cz: "Navrhujeme a vytváříme jedinečné šperky, hrnečky, misky i doplňky — vše ve vlastních limitovaných sériích, výhradně ručními postupy.", en: "We design and create unique jewelry, cups, bowls and accessories — all in our own limited series, exclusively by hand." },
  story_link: { cz: "Celý příběh →", en: "Full story →" },
  pieces_title: { cz: "Z ateliéru", en: "From the Atelier" },
  pieces_cta: { cz: "Všechny kousky →", en: "View all pieces →" },
  trust_1: { cz: "Tvarováno ručně", en: "Shaped by hand" },
  trust_2: { cz: "Páleno v Broumovsku", en: "Fired in Broumovsko" },
  trust_3: { cz: "Ekologicky baleno", en: "Eco-wrapped" },
  trust_4: { cz: "Každý kousek unikát", en: "Each piece unique" },
  contact_title: { cz: "Napište nám", en: "Get in touch" },
  contact_name: { cz: "Jméno", en: "Name" },
  contact_email: { cz: "E-mail", en: "Email" },
  contact_message: { cz: "Zpráva", en: "Message" },
  contact_send: { cz: "Odeslat", en: "Send" },
  footer_newsletter: { cz: "Dopisy z ateliéru", en: "Letters from the atelier" },
  footer_newsletter_placeholder: { cz: "Váš e-mail", en: "Your email" },
  footer_subscribe: { cz: "Odebírat", en: "Subscribe" },
  footer_desc: { cz: "Autorský porcelán z Broumovska", en: "Artisan porcelain from Czech Republic" },
  footer_links: { cz: "Informace", en: "Information" },
  footer_terms: { cz: "Obchodní podmínky", en: "Terms & Conditions" },
  footer_privacy: { cz: "Ochrana údajů", en: "Privacy Policy" },
  footer_shipping: { cz: "Doprava", en: "Shipping" },
  add_to_bag: { cz: "Do košíku", en: "Add to bag" },
};

const products = [
  { id: "necklace-01", nameCz: '"Na dotek"', nameEn: '"Na dotek"', typeCz: "Náhrdelník", typeEn: "Necklace", price: 760, gradient: "linear-gradient(135deg, #D4C9B8 0%, #EDE6DA 50%, #C4973B 100%)" },
  { id: "brooch-02", nameCz: "Vyšívaná brož", nameEn: "Embroidered Brooch", typeCz: "Brož", typeEn: "Brooch", price: 490, gradient: "linear-gradient(135deg, #EDE6DA 0%, #D4C9B8 50%, #2B4C7E 100%)" },
  { id: "earring-02", nameCz: "Sněhové vločky", nameEn: "Snowflakes", typeCz: "Náušnice", typeEn: "Earrings", price: 390, gradient: "linear-gradient(135deg, #F7F3EE 0%, #D4C9B8 50%, #EDE6DA 100%)" },
  { id: "cup-04", nameCz: "Hrnek pro horaly", nameEn: "Mountaineer's Mug", typeCz: "Hrnek · 400ml", typeEn: "Mug · 400ml", price: 650, gradient: "linear-gradient(135deg, #D4C9B8 0%, #4A6741 30%, #EDE6DA 100%)" },
  { id: "bracelet-01", nameCz: "Uzlíkový náramek", nameEn: "Knot Bracelet", typeCz: "Náramek", typeEn: "Bracelet", price: 590, gradient: "linear-gradient(135deg, #EDE6DA 0%, #C4973B 50%, #D4C9B8 100%)" },
  { id: "necklace-04", nameCz: "Doteky květin", nameEn: "Flower Touch", typeCz: "Náhrdelník", typeEn: "Necklace", price: 850, gradient: "linear-gradient(135deg, #C4973B 0%, #EDE6DA 50%, #D4C9B8 100%)" },
];

const heroGradients = [
  "linear-gradient(135deg, #2C2826 0%, #4A6741 40%, #2B4C7E 100%)",
  "linear-gradient(135deg, #D4C9B8 0%, #EDE6DA 40%, #C4973B 100%)",
  "linear-gradient(135deg, #2B4C7E 0%, #2C2826 40%, #4A6741 100%)",
  "linear-gradient(135deg, #4A6741 0%, #C4973B 40%, #2C2826 100%)",
];
const heroLabels = ["hero_01.jpg", "hero_02.jpg", "hero_03.jpg", "hero_04.jpg"];

/* ─── Styles ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

  :root {
    --porcelain: #F7F3EE;
    --cream: #EDE6DA;
    --kiln: #D4C9B8;
    --cobalt: #2B4C7E;
    --moss: #4A6741;
    --gold: #C4973B;
    --charcoal: #2C2826;
    --stone: #6B635B;
    --ash: #9B9189;
    --serif: 'Cormorant Garamond', serif;
    --sans: 'DM Sans', sans-serif;
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .mallys-page {
    background: var(--porcelain);
    color: var(--charcoal);
    font-family: var(--sans);
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* Header */
  .header {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 0 48px; height: 72px;
    display: flex; align-items: center; justify-content: space-between;
    transition: all 0.5s var(--ease);
  }
  .header--transparent { background: transparent; }
  .header--solid {
    background: rgba(247, 243, 238, 0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--kiln);
  }
  .header__logo {
    font-family: var(--serif); font-weight: 300; letter-spacing: 0.12em;
    font-size: 22px; transition: color 0.5s var(--ease); cursor: pointer;
  }
  .header__nav { display: flex; gap: 32px; align-items: center; }
  .header__link {
    font-size: 13px; font-weight: 400; cursor: pointer;
    transition: all 0.3s ease; text-decoration: none; border: none; background: none;
    font-family: var(--sans);
  }
  .header__link:hover { opacity: 0.6; }
  .header__right { display: flex; align-items: center; gap: 20px; }
  .lang-toggle {
    display: flex; gap: 4px; font-size: 12px; font-weight: 500; cursor: pointer;
  }
  .lang-toggle span { padding: 4px 8px; border-radius: 3px; transition: all 0.3s ease; }

  /* Hero */
  .hero {
    position: relative; height: 100vh; width: 100%; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .hero__slide {
    position: absolute; inset: 0;
    transition: opacity 1.5s ease-in-out;
    display: flex; align-items: flex-end; justify-content: center;
    padding-bottom: 12px;
  }
  .hero__slide-label {
    font-size: 10px; color: rgba(255,255,255,0.3); font-family: var(--sans);
  }
  .hero__content {
    position: relative; z-index: 2; text-align: center; padding: 0 24px;
  }
  .hero__tagline {
    font-family: var(--serif); font-weight: 300; font-size: 64px;
    color: var(--porcelain); line-height: 1.15; margin-bottom: 16px;
    text-shadow: 0 2px 40px rgba(0,0,0,0.3);
    animation: fadeUp 1.2s var(--ease) both;
  }
  .hero__sub {
    font-family: var(--sans); font-size: 14px; font-weight: 400;
    color: rgba(247,243,238,0.7); letter-spacing: 0.15em; text-transform: uppercase;
    margin-bottom: 40px; animation: fadeUp 1.2s var(--ease) 0.2s both;
  }
  .hero__cta {
    display: inline-block; padding: 14px 36px; border: 1.5px solid var(--porcelain);
    color: var(--porcelain); font-family: var(--sans); font-size: 13px; font-weight: 500;
    letter-spacing: 0.06em; border-radius: 4px; cursor: pointer; background: none;
    transition: all 0.4s var(--ease); animation: fadeUp 1.2s var(--ease) 0.4s both;
  }
  .hero__cta:hover { background: var(--porcelain); color: var(--charcoal); }
  .hero__dots {
    position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
    display: flex; gap: 10px; z-index: 3;
  }
  .hero__dot {
    width: 8px; height: 8px; border-radius: 50%; border: 1.5px solid rgba(247,243,238,0.5);
    background: transparent; cursor: pointer; transition: all 0.4s ease;
  }
  .hero__dot--active { background: var(--porcelain); border-color: var(--porcelain); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Section common */
  .section { padding: 100px 48px; max-width: 1200px; margin: 0 auto; }
  .section-label {
    font-size: 11px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.14em; color: var(--cobalt); margin-bottom: 12px;
  }
  .section-title {
    font-family: var(--serif); font-size: 40px; font-weight: 300;
    color: var(--charcoal); margin-bottom: 8px;
  }
  .section-line { width: 48px; height: 2px; background: var(--gold); margin-bottom: 32px; }

  /* Craft Slider */
  .craft { background: var(--cream); }
  .craft__inner { max-width: 1200px; margin: 0 auto; padding: 100px 48px; }
  .craft__slider-wrap {
    position: relative; width: 100%; max-width: 800px; margin: 40px auto 0;
    aspect-ratio: 3/2; border-radius: 12px; overflow: hidden; cursor: col-resize;
    box-shadow: 0 8px 40px rgba(44,40,38,0.12);
  }
  .craft__layer {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .craft__layer span {
    font-family: var(--serif); font-size: 18px; color: rgba(255,255,255,0.6);
    font-style: italic;
  }
  .craft__divider {
    position: absolute; top: 0; bottom: 0; width: 3px;
    background: var(--porcelain); z-index: 3;
    box-shadow: 0 0 12px rgba(0,0,0,0.3);
  }
  .craft__handle {
    position: absolute; top: 50%; transform: translate(-50%, -50%);
    width: 40px; height: 40px; border-radius: 50%;
    background: var(--porcelain); border: 2px solid var(--kiln);
    z-index: 4; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15); cursor: col-resize;
  }
  .craft__handle-arrows { color: var(--stone); font-size: 14px; font-weight: 700; letter-spacing: 4px; }
  .craft__labels {
    display: flex; justify-content: space-between; max-width: 800px;
    margin: 16px auto 0; font-size: 12px; color: var(--stone);
  }

  /* Story */
  .story__grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
    margin-top: 40px;
  }
  .story__image {
    width: 100%; aspect-ratio: 3/2; border-radius: 8px; overflow: hidden;
    box-shadow: 0 8px 40px rgba(44,40,38,0.1);
    display: flex; align-items: center; justify-content: center;
  }
  .story__text { font-size: 15px; color: var(--stone); line-height: 1.85; }
  .story__text p { margin-bottom: 20px; }
  .story__link {
    color: var(--cobalt); font-weight: 500; font-size: 14px;
    text-decoration: none; cursor: pointer; border: none; background: none;
    font-family: var(--sans); transition: opacity 0.3s;
  }
  .story__link:hover { opacity: 0.6; }

  /* Products */
  .products__grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 40px;
  }
  .product-card { cursor: pointer; transition: transform 0.4s var(--ease); }
  .product-card:hover { transform: translateY(-6px); }
  .product-card__image {
    width: 100%; aspect-ratio: 4/5; border-radius: 8px; overflow: hidden;
    margin-bottom: 14px; position: relative;
    box-shadow: 0 4px 20px rgba(44,40,38,0.06);
    transition: box-shadow 0.4s var(--ease);
    display: flex; align-items: center; justify-content: center;
  }
  .product-card:hover .product-card__image {
    box-shadow: 0 8px 32px rgba(44,40,38,0.12);
  }
  .product-card__badge {
    position: absolute; top: 12px; left: 12px;
    padding: 4px 10px; border-radius: 3px;
    background: var(--cobalt); color: var(--porcelain);
    font-size: 9px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;
  }
  .product-card__name {
    font-family: var(--serif); font-size: 20px; font-weight: 500; color: var(--charcoal);
  }
  .product-card__type { font-size: 12px; color: var(--ash); margin-top: 2px; }
  .product-card__price { font-size: 15px; font-weight: 600; color: var(--charcoal); margin-top: 8px; }
  .products__cta-wrap { text-align: center; margin-top: 48px; }
  .products__cta {
    display: inline-block; padding: 14px 36px;
    border: 1.5px solid var(--charcoal); color: var(--charcoal);
    font-family: var(--sans); font-size: 13px; font-weight: 500;
    border-radius: 4px; cursor: pointer; background: none;
    transition: all 0.4s var(--ease); text-decoration: none;
  }
  .products__cta:hover { background: var(--charcoal); color: var(--porcelain); }

  /* Parallax */
  .parallax {
    height: 400px; position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .parallax__bg {
    position: absolute; inset: -60px; background-size: cover;
    background-position: center; background-attachment: fixed;
  }

  /* Trust */
  .trust {
    padding: 64px 48px; border-top: 1px solid var(--kiln);
    border-bottom: 1px solid var(--kiln);
  }
  .trust__inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px;
    text-align: center;
  }
  .trust__item-icon {
    width: 40px; height: 40px; margin: 0 auto 12px;
    border-radius: 50%; border: 1.5px solid var(--kiln);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .trust__item-text { font-size: 13px; font-weight: 500; color: var(--charcoal); }

  /* Contact */
  .contact__grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 64px; margin-top: 40px;
  }
  .contact__form { display: flex; flex-direction: column; gap: 20px; }
  .contact__input, .contact__textarea {
    padding: 14px 16px; border: 1px solid var(--kiln); border-radius: 4px;
    font-family: var(--sans); font-size: 14px; color: var(--charcoal);
    background: var(--porcelain); transition: border-color 0.3s;
    outline: none; width: 100%;
  }
  .contact__input:focus, .contact__textarea:focus { border-color: var(--cobalt); }
  .contact__textarea { min-height: 140px; resize: vertical; }
  .contact__submit {
    padding: 14px 36px; background: var(--cobalt); color: var(--porcelain);
    border: none; border-radius: 4px; font-family: var(--sans); font-size: 13px;
    font-weight: 600; letter-spacing: 0.06em; cursor: pointer;
    transition: background 0.3s; align-self: flex-start;
  }
  .contact__submit:hover { background: #1e3a5f; }
  .contact__info { padding-top: 8px; }
  .contact__info-title {
    font-family: var(--serif); font-size: 22px; font-weight: 600;
    color: var(--charcoal); margin-bottom: 20px;
  }
  .contact__info-line { font-size: 14px; color: var(--stone); margin-bottom: 8px; line-height: 1.6; }
  .contact__info-line a { color: var(--cobalt); text-decoration: none; }
  .contact__socials { display: flex; gap: 16px; margin-top: 28px; }
  .contact__social {
    width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--kiln);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 600; color: var(--stone);
    cursor: pointer; transition: all 0.3s;
  }
  .contact__social:hover { border-color: var(--cobalt); color: var(--cobalt); }

  /* Footer */
  .footer {
    background: var(--charcoal); color: var(--porcelain); padding: 64px 48px 32px;
  }
  .footer__inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 48px;
  }
  .footer__logo {
    font-family: var(--serif); font-size: 24px; font-weight: 300;
    letter-spacing: 0.12em; margin-bottom: 12px;
  }
  .footer__desc { font-size: 13px; color: var(--ash); line-height: 1.6; margin-bottom: 24px; }
  .footer__newsletter { display: flex; gap: 8px; }
  .footer__newsletter-input {
    padding: 10px 14px; border: 1px solid rgba(247,243,238,0.15);
    background: transparent; color: var(--porcelain); border-radius: 4px;
    font-family: var(--sans); font-size: 13px; flex: 1; outline: none;
  }
  .footer__newsletter-input::placeholder { color: var(--ash); }
  .footer__newsletter-btn {
    padding: 10px 20px; background: var(--cobalt); color: var(--porcelain);
    border: none; border-radius: 4px; font-family: var(--sans); font-size: 12px;
    font-weight: 600; cursor: pointer; transition: background 0.3s;
  }
  .footer__newsletter-btn:hover { background: #3a5f9e; }
  .footer__col-title {
    font-size: 11px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.12em; color: var(--ash); margin-bottom: 20px;
  }
  .footer__link {
    display: block; font-size: 13px; color: rgba(247,243,238,0.7);
    margin-bottom: 12px; cursor: pointer; transition: color 0.3s; text-decoration: none;
  }
  .footer__link:hover { color: var(--porcelain); }
  .footer__bottom {
    max-width: 1200px; margin: 48px auto 0; padding-top: 24px;
    border-top: 1px solid rgba(247,243,238,0.1);
    display: flex; justify-content: space-between;
    font-size: 12px; color: var(--ash);
  }

  /* Placeholder image styles */
  .placeholder-img {
    width: 100%; height: 100%; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 8px;
  }
  .placeholder-img__label {
    font-size: 10px; font-family: var(--sans); opacity: 0.5;
    padding: 3px 8px; border-radius: 3px;
    background: rgba(0,0,0,0.15); color: white;
  }
  .placeholder-img__hint {
    font-family: var(--serif); font-style: italic; opacity: 0.4;
    color: white; font-size: 16px;
  }
`;

/* ─── Components ─── */
function PlaceholderImg({ filename, hint, gradient, style }) {
  return (
    <div className="placeholder-img" style={{ background: gradient, ...style }}>
      <span className="placeholder-img__hint">{hint}</span>
      <span className="placeholder-img__label">{filename}</span>
    </div>
  );
}

export default function MallysMainPage() {
  const [lang, setLang] = useState("en");
  const [scrolled, setScrolled] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const L = useCallback((key) => t[key]?.[lang] || key, [lang]);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % 4);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  // Slider drag
  const handleSliderMove = useCallback((clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(2, Math.min(98, x)));
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e) => handleSliderMove(e.touches ? e.touches[0].clientX : e.clientX);
    const onUp = () => setIsDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, handleSliderMove]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mallys-page">
      <style>{css}</style>

      {/* ─── HEADER ─── */}
      <header className={`header ${scrolled ? "header--solid" : "header--transparent"}`}>
        <div
          className="header__logo"
          style={{ color: scrolled ? "var(--charcoal)" : "var(--porcelain)" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          MALLYS
        </div>
        <nav className="header__nav">
          {[
            ["nav_shop", "products"],
            ["nav_story", "story"],
            ["nav_atelier", "craft"],
            ["nav_contact", "contact"],
          ].map(([key, id]) => (
            <button
              key={key}
              className="header__link"
              style={{ color: scrolled ? "var(--stone)" : "rgba(247,243,238,0.8)" }}
              onClick={() => scrollTo(id)}
            >
              {L(key)}
            </button>
          ))}
        </nav>
        <div className="header__right">
          <div className="lang-toggle" onClick={() => setLang(lang === "cz" ? "en" : "cz")}>
            <span style={{
              background: lang === "cz" ? (scrolled ? "var(--charcoal)" : "var(--porcelain)") : "transparent",
              color: lang === "cz" ? (scrolled ? "var(--porcelain)" : "var(--charcoal)") : (scrolled ? "var(--ash)" : "rgba(247,243,238,0.5)"),
            }}>CZ</span>
            <span style={{
              background: lang === "en" ? (scrolled ? "var(--charcoal)" : "var(--porcelain)") : "transparent",
              color: lang === "en" ? (scrolled ? "var(--porcelain)" : "var(--charcoal)") : (scrolled ? "var(--ash)" : "rgba(247,243,238,0.5)"),
            }}>EN</span>
          </div>
          <span style={{
            fontSize: 13, fontWeight: 400, cursor: "pointer",
            color: scrolled ? "var(--charcoal)" : "var(--porcelain)",
          }}>
            Bag (0)
          </span>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="hero">
        {heroGradients.map((g, i) => (
          <div
            key={i}
            className="hero__slide"
            style={{ opacity: heroIndex === i ? 1 : 0, background: g }}
          >
            <span className="hero__slide-label">{heroLabels[i]}</span>
          </div>
        ))}
        <div className="hero__content">
          <h1 className="hero__tagline">{L("hero_tagline")}</h1>
          <p className="hero__sub">{L("hero_sub")}</p>
          <button className="hero__cta" onClick={() => scrollTo("products")}>
            {L("hero_cta")}
          </button>
        </div>
        <div className="hero__dots">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`hero__dot ${heroIndex === i ? "hero__dot--active" : ""}`}
              onClick={() => setHeroIndex(i)}
            />
          ))}
        </div>
      </section>

      {/* ─── CRAFT SLIDER ─── */}
      <section className="craft" id="craft">
        <div className="craft__inner">
          <div className="section-label">{lang === "cz" ? "Proces" : "Process"}</div>
          <h2 className="section-title">{L("craft_title")}</h2>
          <div className="section-line" />
          <p style={{ fontSize: 15, color: "var(--stone)", maxWidth: 500, lineHeight: 1.7 }}>
            {L("craft_desc")}
          </p>

          <div
            className="craft__slider-wrap"
            ref={sliderRef}
            onMouseDown={(e) => { setIsDragging(true); handleSliderMove(e.clientX); }}
            onTouchStart={(e) => { setIsDragging(true); handleSliderMove(e.touches[0].clientX); }}
          >
            {/* Finished (background) */}
            <div className="craft__layer" style={{
              background: "linear-gradient(135deg, #C4973B 0%, #EDE6DA 40%, #D4C9B8 100%)",
            }}>
              <PlaceholderImg filename="slider_finished.jpg" hint="finished piece" gradient="transparent" />
            </div>

            {/* Raw (clipped foreground) */}
            <div className="craft__layer" style={{
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              background: "linear-gradient(135deg, #6B635B 0%, #9B9189 40%, #D4C9B8 100%)",
            }}>
              <PlaceholderImg filename="slider_raw.jpg" hint="raw porcelain" gradient="transparent" />
            </div>

            {/* Divider line */}
            <div className="craft__divider" style={{ left: `${sliderPos}%` }} />

            {/* Handle */}
            <div className="craft__handle" style={{ left: `${sliderPos}%` }}>
              <span className="craft__handle-arrows">‹ ›</span>
            </div>
          </div>

          <div className="craft__labels">
            <span>{L("craft_label_raw")}</span>
            <span>{L("craft_label_finished")}</span>
          </div>
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section className="section" id="story">
        <div className="section-label">{lang === "cz" ? "O nás" : "About"}</div>
        <h2 className="section-title">{L("story_title")}</h2>
        <div className="section-line" />

        <div className="story__grid">
          <div className="story__image">
            <PlaceholderImg
              filename="story_atelier.jpg"
              hint="atelier workspace"
              gradient="linear-gradient(135deg, #4A6741 0%, #2C2826 40%, #D4C9B8 100%)"
            />
          </div>
          <div className="story__text">
            <p>{L("story_p1")}</p>
            <p>{L("story_p2")}</p>
            <button className="story__link">{L("story_link")}</button>
          </div>
        </div>
      </section>

      {/* ─── LANDSCAPE PARALLAX ─── */}
      <div className="parallax">
        <div className="parallax__bg" style={{
          background: "linear-gradient(135deg, #4A6741 0%, #2B4C7E 30%, #2C2826 70%, #4A6741 100%)",
        }} />
        <PlaceholderImg
          filename="landscape_broumovsko.jpg"
          hint="Broumovsko landscape"
          gradient="transparent"
          style={{ position: "relative", zIndex: 1 }}
        />
      </div>

      {/* ─── SELECTED PIECES ─── */}
      <section className="section" id="products">
        <div className="section-label">{lang === "cz" ? "Výběr" : "Selection"}</div>
        <h2 className="section-title">{L("pieces_title")}</h2>
        <div className="section-line" />

        <div className="products__grid">
          {products.map((p, i) => (
            <div key={p.id} className="product-card">
              <div className="product-card__image">
                <PlaceholderImg
                  filename={`${p.id}_hero.jpg`}
                  hint={lang === "cz" ? p.nameCz : p.nameEn}
                  gradient={p.gradient}
                />
                {i === 0 && <div className="product-card__badge">{lang === "cz" ? "Oblíbené" : "Popular"}</div>}
              </div>
              <div className="product-card__name">{p.nameCz}</div>
              <div className="product-card__type">{lang === "cz" ? p.typeCz : p.typeEn}</div>
              <div className="product-card__price">{p.price} Kč</div>
            </div>
          ))}
        </div>

        <div className="products__cta-wrap">
          <button className="products__cta">{L("pieces_cta")}</button>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <div className="trust">
        <div className="trust__inner">
          {[
            { icon: "✋", key: "trust_1" },
            { icon: "🔥", key: "trust_2" },
            { icon: "🌿", key: "trust_3" },
            { icon: "✦", key: "trust_4" },
          ].map(({ icon, key }) => (
            <div key={key}>
              <div className="trust__item-icon">{icon}</div>
              <div className="trust__item-text">{L(key)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CONTACT ─── */}
      <section className="section" id="contact">
        <div className="section-label">{lang === "cz" ? "Kontakt" : "Contact"}</div>
        <h2 className="section-title">{L("contact_title")}</h2>
        <div className="section-line" />

        <div className="contact__grid">
          <div className="contact__form">
            <input className="contact__input" placeholder={L("contact_name")} />
            <input className="contact__input" placeholder={L("contact_email")} type="email" />
            <textarea className="contact__textarea" placeholder={L("contact_message")} />
            <button className="contact__submit">{L("contact_send")}</button>
          </div>
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
              <div className="contact__social">IG</div>
              <div className="contact__social">FB</div>
              <div className="contact__social">PI</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="footer__inner">
          <div>
            <div className="footer__logo">MALLYS</div>
            <div className="footer__desc">{L("footer_desc")}</div>
            <div style={{ fontSize: 12, color: "var(--ash)", marginBottom: 12 }}>
              {L("footer_newsletter")}
            </div>
            <div className="footer__newsletter">
              <input
                className="footer__newsletter-input"
                placeholder={L("footer_newsletter_placeholder")}
              />
              <button className="footer__newsletter-btn">{L("footer_subscribe")}</button>
            </div>
          </div>
          <div>
            <div className="footer__col-title">{L("footer_links")}</div>
            <a className="footer__link">{L("nav_shop")}</a>
            <a className="footer__link">{L("nav_story")}</a>
            <a className="footer__link">{L("nav_atelier")}</a>
            <a className="footer__link">{L("nav_contact")}</a>
          </div>
          <div>
            <div className="footer__col-title">Legal</div>
            <a className="footer__link">{L("footer_terms")}</a>
            <a className="footer__link">{L("footer_privacy")}</a>
            <a className="footer__link">{L("footer_shipping")}</a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Mallys. {lang === "cz" ? "Všechna práva vyhrazena." : "All rights reserved."}</span>
          <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--ash)" }}>
            {lang === "cz" ? "Tvořeno s láskou v Broumovsku" : "Made with care in Broumovsko"}
          </span>
        </div>
      </footer>
    </div>
  );
}
