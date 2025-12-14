import FAQHero from "@/components/faq/FAQHero";
import FAQList from "@/components/faq/FAQList";
import FAQCTA from "@/components/faq/FAQCTA";

export default function FAQPage() {
    return (
        <main className="w-full bg-white flex flex-col" suppressHydrationWarning>
            <FAQHero />
            <FAQList />
            <FAQCTA />
        </main>
    );
}
