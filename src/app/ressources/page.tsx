import ResourceHero from "@/components/ressources/ResourceHero";
import ResourceGuides from "@/components/ressources/ResourceGuides";
import ResourceArticles from "@/components/ressources/ResourceArticles";
import ResourceCaseStudies from "@/components/ressources/ResourceCaseStudies";
import ResourceChecklists from "@/components/ressources/ResourceChecklists";
import ResourceCTA from "@/components/ressources/ResourceCTA";

export default function ResourcesPage() {
    return (
        <main className="w-full bg-white flex flex-col" suppressHydrationWarning>
            <ResourceHero />
            <ResourceGuides />
            <ResourceArticles />
            <ResourceCaseStudies />
            <ResourceChecklists />
            <ResourceCTA />
        </main>
    );
}
