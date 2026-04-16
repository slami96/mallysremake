'use client';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import Parallax from '@/components/Parallax';
import CraftSlider from '@/components/CraftSlider';
import Products from '@/components/Products';
import Trust from '@/components/Trust';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <Parallax />
      <CraftSlider />
      <Products />
      <Trust />
      <Contact />
      <Footer />
    </main>
  );
}
