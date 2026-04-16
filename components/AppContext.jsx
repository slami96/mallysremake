'use client';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations } from '@/data/translations';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [productDetail, setProductDetail] = useState(null);

  // Load cart + lang from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('mallys_lang');
    const savedCart = localStorage.getItem('mallys_cart');
    if (savedLang === 'cz' || savedLang === 'en') setLang(savedLang);
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch {}
    }
  }, []);

  useEffect(() => { localStorage.setItem('mallys_lang', lang); }, [lang]);
  useEffect(() => { localStorage.setItem('mallys_cart', JSON.stringify(cart)); }, [cart]);

  const L = useCallback((key) => translations[key]?.[lang] || key, [lang]);
  const toggleLang = useCallback(() => setLang(p => p === 'cz' ? 'en' : 'cz'), []);

  const addToCart = useCallback((product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty }];
    });
    setCartOpen(true);
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) { setCart(prev => prev.filter(i => i.id !== id)); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, []);

  const removeItem = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <AppContext.Provider value={{
      lang, setLang, toggleLang, L,
      cart, cartCount, cartTotal, addToCart, updateQty, removeItem,
      cartOpen, setCartOpen,
      productDetail, setProductDetail,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
