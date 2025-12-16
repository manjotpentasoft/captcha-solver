import HeroSection from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import UseCasesSection from "@/components/UseCasesSection";
import BlogSection from "@/components/BlogSection";
import WhyBetterSection from "@/components/WhyBetterSection";

export default function page() {
  return (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <HeroSection />
    <HowItWorks />
    <PricingSection />
    <UseCasesSection />
    <BlogSection />
    <WhyBetterSection />
    <Footer />
  </div>
  )
}
