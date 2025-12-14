import ContactHero from "@/components/contact/ContactHero";
import ContactContent from "@/components/contact/ContactContent";

export default function ContactPage() {
    return (
        <main className="w-full bg-white flex flex-col" suppressHydrationWarning>
            <ContactHero />
            <ContactContent />
        </main>
    );
}
