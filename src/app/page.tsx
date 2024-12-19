import Menu from "../components/Menu";
import HeroSection from "../components/HeroSection";
import OfferSection from "../components/OfferSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      {/* Menu */}
      <Menu />

      {/* Hero Section */}
      <HeroSection />

      {/* Sekcja Oferty */}
      <OfferSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
