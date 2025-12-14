import MethodeHero from "@/components/methode/MethodeHero";
import MethodeIntro from "@/components/methode/MethodeIntro";
import MethodeSteps from "@/components/methode/MethodeSteps";
import MethodeExamples from "@/components/methode/MethodeExamples";
import MethodeWhy from "@/components/methode/MethodeWhy";
import MethodeCTA from "@/components/methode/MethodeCTA";
import SolutionsHero from "@/components/solutions/SolutionsHero";
import SolutionsList from "@/components/solutions/SolutionsList";
import SolutionsDisclaimer from "@/components/solutions/SolutionsDisclaimer";
import SolutionsCTA from "@/components/solutions/SolutionsCTA";
import SolutionsDetailedList from "@/components/solutions/SolutionsDetailedList";
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
    title: "Nos Solutions",
    description: "Découvrez nos solutions Odoo Finance personnalisées pour votre entreprise en Belgique et au Maroc. Optimisez votre gestion financière avec nos experts.",
    url: "/solutions",
    keywords: [
        "Solutions Odoo",
        "Finance entreprise",
        "ERP Odoo",
        "Gestion financière",
        "Comptabilité Odoo",
        "Solutions sur mesure",
    ],
});

// Schéma JSON-LD pour le fil d'Ariane
const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Accueil", url: "/" },
    { name: "Solutions", url: "/solutions" },
]);

export default function SolutionsPage() {
    return (
        <>
            {/* JSON-LD Structured Data pour le fil d'Ariane */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />

            <main className="w-full bg-white flex flex-col" suppressHydrationWarning>
                <SolutionsHero />
                <SolutionsList />
                {/* <SolutionsDetailedList /> */}
                <SolutionsDisclaimer />
                <SolutionsCTA />

            </main>
        </>
    );
}
