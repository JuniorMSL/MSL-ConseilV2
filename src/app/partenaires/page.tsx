import PartenairesHero from "@/components/partenaires/PartenairesHero";
import PartenairesWhy from "@/components/partenaires/PartenairesWhy";
import PartenairesPositioning from "@/components/partenaires/PartenairesPositioning";
import PartenairesServices from "@/components/partenaires/PartenairesServices";
import PartenairesCollaboration from "@/components/partenaires/PartenairesCollaboration";
import PartenairesPricing from "@/components/partenaires/PartenairesPricing";
import PartenairesUseCases from "@/components/partenaires/PartenairesUseCases";
import PartenairesWhyUs from "@/components/partenaires/PartenairesWhyUs";
import PartenairesCTA from "@/components/partenaires/PartenairesCTA";
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
    title: "Partenaires & Intégrateurs Odoo",
    description: "MSL Conseils accompagne les intégrateurs Odoo en tant que partenaire métier Finance & Comptabilité. Sécurisez vos projets Odoo Finance avec un analyste fonctionnel métier senior.",
    url: "/partenaires",
    keywords: [
        "Partenaire Odoo",
        "Intégrateur Odoo",
        "Odoo Finance",
        "Analyste fonctionnel",
        "Comptabilité Odoo",
        "Expertise métier",
        "DAF Odoo",
        "Migration comptable Odoo",
        "Formation Odoo Finance",
    ],
});

// Schéma JSON-LD pour le fil d'Ariane
const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Accueil", url: "/" },
    { name: "Partenaires", url: "/partenaires" },
]);

export default function PartenairesPage() {
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
                <PartenairesHero />
                <PartenairesWhy />
                <PartenairesPositioning />
                <PartenairesServices />
                <PartenairesCollaboration />
                <PartenairesPricing />
                <PartenairesUseCases />
                <PartenairesWhyUs />
                <PartenairesCTA />
            </main>
        </>
    );
}
