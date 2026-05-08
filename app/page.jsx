'use client';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Story from '@/components/Story';
import Testimonials from '@/components/Testimonials';
import CraftSlider from '@/components/CraftSlider';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Products />
      <Story />
      <CraftSlider />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
