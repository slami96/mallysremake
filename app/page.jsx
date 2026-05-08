'use client';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import ShippingBanner from '@/components/ShippingBanner';
import Story from '@/components/Story';
import Testimonials from '@/components/Testimonials';
import CraftSlider from '@/components/CraftSlider';
import Trust from '@/components/Trust';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Products />
      <ShippingBanner />
      <Story />
      <Testimonials />
      <CraftSlider />
      <Trust />
      <Contact />
      <Footer />
    </main>
  );
}
