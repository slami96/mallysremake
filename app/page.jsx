'use client';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Story from '@/components/Story';
import Parallax from '@/components/Parallax';
import CraftSlider from '@/components/CraftSlider';
import Trust from '@/components/Trust';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Products />
      <Story />
      <Parallax />
      <CraftSlider />
      <Trust />
      <Contact />
      <Footer />
    </main>
  );
}
