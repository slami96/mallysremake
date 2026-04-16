import './globals.css';

export const metadata = {
  title: 'Mallys — Handmade Porcelain from Broumovsko',
  description: 'Artisan porcelain jewelry, cups, bowls and accessories. Handmade in our atelier between the Broumovsko highlands and the Jestřebí mountains.',
  openGraph: {
    title: 'Mallys — Handmade Porcelain',
    description: 'Artisan porcelain from Broumovsko, Czech Republic.',
    images: ['/images/site/og_image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
