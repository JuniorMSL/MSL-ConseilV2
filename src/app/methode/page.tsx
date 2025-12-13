import MethodeHero from "@/components/methode/MethodeHero";
import MethodeIntro from "@/components/methode/MethodeIntro";
import MethodeSteps from "@/components/methode/MethodeSteps";
import MethodeSummary from "@/components/methode/MethodeSummary";
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
    title: "Méthode P.I.L.O.T.E.R.",
    description: "Découvrez notre méthode P.I.L.O.T.E.R. : une approche structurée et efficace pour piloter votre croissance et optimiser votre performance financière.",
    url: "/methode",
    keywords: [
        "Méthode PILOTER",
        "Croissance entreprise",
        "Performance financière",
        "Audit financier",
        "Optimisation",
        "Stratégie",
    ],
});

// Schéma JSON-LD pour le fil d'Ariane
const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Accueil", url: "/" },
    { name: "Méthode P.I.L.O.T.E.R.", url: "/methode" },
]);

// Schéma JSON-LD pour le service
const serviceSchema = generateServiceSchema({
    name: "Méthode P.I.L.O.T.E.R.",
    description: "Une approche structurée pour piloter votre croissance : Préparation, Investigation, Livraison, Optimisation, Transposition, Évolution, Résultats",
});

export default function MethodePage() {
    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(serviceSchema),
                }}
            />

            <main className="min-h-screen bg-white">
                <MethodeHero />
                <MethodeIntro />
                <MethodeSteps />
                <MethodeSummary />
            </main>
        </>
    );
}
