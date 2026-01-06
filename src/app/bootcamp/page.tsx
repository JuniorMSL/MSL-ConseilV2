import BootcampCTA from "@/components/bootcamp/BootcampCTA";
import BootcampDifference from "@/components/bootcamp/BootcampDifference";
import BootcampFormat from "@/components/bootcamp/BootcampFormat";
import BootcampHero from "@/components/bootcamp/BootcampHero";
import BootcampModules from "@/components/bootcamp/BootcampModules";
import BootcampPhilosophy from "@/components/bootcamp/BootcampPhilosophy";
import BootcampResults from "@/components/bootcamp/BootcampResults";

import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
    title: "Bootcamps MSL Conseils | Formation Odoo Finances Intensive",
    description: "Se former vite. Appliquer immédiatement. Performer durablement. Découvrez nos bootcamps intensifs pour maîtriser Odoo Finances et transformer votre gestion financière.",
    url: "/bootcamp",
    keywords: [
        "Bootcamp Odoo",
        "Formation Odoo Finances",
        "Formation intensive Odoo",
        "Odoo Finances Belgique",
        "Odoo Finances Maroc",
        "Formation finances entreprise",
        "Contrôle de gestion Odoo",
        "Automatisation financière",
    ],
});

// Schéma JSON-LD pour la page Bootcamp
const bootcampSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Bootcamps MSL Conseils",
    description: "Formation courte, intensive et immersive pour acquérir rapidement des compétences pratiques sur Odoo Finances.",
    provider: {
        "@type": "Organization",
        name: "MSL Conseils",
        url: "https://msl-conseils.com",
    },
    courseMode: ["onsite", "online"],
    educationalCredentialAwarded: "Attestation de participation MSL Conseils",
};

export default function BootcampPage() {
    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(bootcampSchema),
                }}
            />

            <main className="flex min-h-screen flex-col bg-background" suppressHydrationWarning>
                {/* Hero Section */}
                <BootcampHero />

                {/* Intro & Philosophy */}
                <BootcampPhilosophy />

                {/* Why MSL is Different */}
                <BootcampDifference />

                {/* Expected Results */}
                <BootcampResults />

                {/* Training Modules */}
                <BootcampModules />

                {/* Format & Pedagogy */}
                <BootcampFormat />

                {/* Final CTA */}
                <BootcampCTA />
            </main>
        </>
    );
}
