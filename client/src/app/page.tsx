import HeroSection from "@/components/HeroSection";
import CanScrollExperience from "@/components/CanScrollExperience";
import AboutSection from "@/components/AboutSection";
import RecruitmentForm from "@/components/RecruitmentForm";
import CookieBanner from "@/components/CookieBanner";
import { BRAND } from "@/lib/mofayaData";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <CanScrollExperience />
        <AboutSection />
        <RecruitmentForm />
      </main>
      <div aria-hidden className="pattern-strip" />
      <footer className="bg-black px-4 py-10 text-center text-sm text-white/50 sm:px-8">
        <p>
          © {new Date().getFullYear()} {BRAND.name}. Enjoy responsibly. Not recommended for children, pregnant or
          breastfeeding women, or people sensitive to caffeine.
        </p>
        <a href={BRAND.site} className="mt-2 inline-block text-flame hover:underline" target="_blank" rel="noreferrer">
          mofaya.co.za
        </a>
      </footer>
      <CookieBanner />
    </>
  );
}
