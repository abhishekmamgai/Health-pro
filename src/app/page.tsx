import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { HowItWorks, Community, Testimonials } from "@/components/Sections";

export default function Home() {
  return (
    <main style={{ backgroundColor: 'var(--color-surface)', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Community />
      <Testimonials />
      <Footer />
    </main>
  );
}
