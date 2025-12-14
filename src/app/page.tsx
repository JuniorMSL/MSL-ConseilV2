import HeroSlider from "@/components/HeroSlider";
import VideoSection from "@/components/VideoSection";
import BenefitsGrid from "@/components/BenefitsGrid";
import AboutServices from "@/components/AboutServices";
import PiloterMethod from "@/components/PiloterMethod";
import ResultsSection from "@/components/ResultsSection";
import SixReasons from "@/components/SixReasons";
import ComplementaryServices from "@/components/ComplementaryServices";
import { generateMetadata as generateSEOMetadata, siteConfig, generateServiceSchema } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Accueil",
  description: "Expert Odoo Finance en Belgique et au Maroc. Découvrez notre méthode P.I.L.O.T.E.R. pour piloter votre croissance et optimiser votre gestion financière.",
  url: "/",
  keywords: [
    "Odoo Finance",
    "Expert Odoo Belgique",
    "Expert Odoo Maroc",
    "Conseil Finance",
    "Méthode PILOTER",
    "Croissance entreprise",
    "Gestion financière",
  ],
});

// Schéma JSON-LD pour la page d'accueil (WebSite)
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data pour WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      <main className="flex min-h-screen flex-col bg-background" suppressHydrationWarning>
        {/* Immersive Slider Section */}
        <HeroSlider />

        {/* Video Section */}
        <VideoSection />

        {/* Benefits Grid Section */}
        <BenefitsGrid />

        {/* About & Services Section */}
        <AboutServices />

        {/* PILOTER Method Interactive Section */}
        <PiloterMethod />

        {/* Results/Stats Section */}
        <ResultsSection />

        {/* 6 Reasons Section */}
        <SixReasons />

        {/* Complementary Services & Final CTA */}
        <ComplementaryServices />
      </main>
    </>
  );
}
