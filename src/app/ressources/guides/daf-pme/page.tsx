"use client";

import { useState, useRef } from "react";
import GuideHero from "@/components/ressources/guides/daf-pme/GuideHero";
import GuideContent from "@/components/ressources/guides/daf-pme/GuideContent";
import ChapterNav from "@/components/ressources/guides/daf-pme/ChapterNav";

// Sections list for navigation
const SECTIONS = [
    { id: 1, title: "Introduction : Pourquoi ce guide ?" },
    { id: 2, title: "Le DAF, bras droit stratégique" },
    { id: 3, title: "Pourquoi un seul profil ne peut pas tout faire" },
    { id: 4, title: "Pourquoi un DAF devient indispensable dans une PME" },
    { id: 5, title: "DAF à temps partiel + outils digitaux" },
    { id: 6, title: "5 signaux que vous avez besoin d'un DAF" },
    { id: 7, title: "Démarrer concrètement en 30 jours" },
    { id: 8, title: "Conclusion – Le pilotage, c'est une posture" },
];

export default function GuideDAFPage() {
    const [step, setStep] = useState<"content" | "contact">("content");
    const contentRef = useRef<HTMLDivElement>(null);

    const handleStartQuiz = () => {
        // Redirect to contact page or show a contact form
        window.location.href = "/contact";
    };

    return (
        <main className="w-full min-h-screen bg-white" suppressHydrationWarning>
            {/* Chapter Navigation - Only visible on content step */}
            {step === "content" && <ChapterNav sections={SECTIONS} />}

            {step === "content" && (
                <div ref={contentRef}>
                    <GuideHero />
                    <GuideContent onStartQuiz={handleStartQuiz} />
                </div>
            )}
        </main>
    );
}
