import './globals.css';
import { AppProvider } from '@/components/AppContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import ProductDetail from '@/components/ProductDetail';

export const metadata = {
  title: 'Mallys — Handmade Porcelain from Broumovsko',
  description: 'Artisan porcelain jewelry, cups, bowls and accessories. Each piece handmade in our atelier between the Broumovsko highlands and the Jestřebí mountains.',
  openGraph: {
    title: 'Mallys — Handmade Porcelain',
    description: 'Artisan porcelain from Broumovsko, Czech Republic.',
    images: ['/images/site/og_image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Header />
          <CartDrawer />
          <ProductDetail />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
