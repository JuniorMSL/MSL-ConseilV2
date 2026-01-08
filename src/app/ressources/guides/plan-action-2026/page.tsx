"use client";

import { useState, useRef } from "react";
import GuideHero from "@/components/ressources/guides/plan-action-2026/GuideHero";
import GuideContent from "@/components/ressources/guides/plan-action-2026/GuideContent";
import GuideContentPart2 from "@/components/ressources/guides/plan-action-2026/GuideContentPart2";
import ChapterNav from "@/components/ressources/guides/plan-action-2026/ChapterNav";
import DownloadForm from "@/components/ressources/guides/plan-action-2026/DownloadForm";

const SECTIONS_PART1 = [
    { id: 1, title: "La Trésorerie" },
    { id: 2, title: "La Rentabilité réelle" },
    { id: 3, title: "Les Coûts Fixes et Variables" },
    { id: 4, title: "Le Suivi Budgétaire" },
    { id: 5, title: "Le Reporting Extra-Financier" },
];

const SECTIONS_PART2 = [
    { id: 6, title: "Méthodologie en 4 étapes" },
    { id: 7, title: "Gouvernance & Risques" },
    { id: 8, title: "Grille de maturité" },
    { id: 9, title: "Checklist de mise en œuvre" },
];

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    role: string;
    wantsDiagnostic: boolean;
}

export default function GuidePlanAction2026Page() {
    const [step, setStep] = useState<"part1" | "part2" | "form" | "confirmation">("part1");
    const [userData, setUserData] = useState<UserData | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleContinueToPart2 = () => {
        setStep("part2");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBackToPart1 = () => {
        setStep("part1");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleStartDownload = () => {
        setStep("form");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleFormSubmit = (data: UserData) => {
        setUserData(data);
        setStep("confirmation");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBackToGuide = () => {
        setStep("part2");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <main className="w-full min-h-screen bg-white" suppressHydrationWarning>
            {step === "part1" && <ChapterNav sections={SECTIONS_PART1} />}
            {step === "part2" && <ChapterNav sections={SECTIONS_PART2} />}

            {step === "part1" && (
                <div ref={contentRef}>
                    <GuideHero />
                    <GuideContent onStartQuiz={handleContinueToPart2} />
                </div>
            )}

            {step === "part2" && (
                <GuideContentPart2 onDownload={handleStartDownload} onBack={handleBackToPart1} />
            )}

            {step === "form" && (
                <DownloadForm onSubmit={handleFormSubmit} onBack={handleBackToGuide} />
            )}

            {step === "confirmation" && userData && (
                <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
                    <div className="max-w-xl w-full text-center">
                        <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-8 flex items-center justify-center shadow-xl">
                            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Merci {userData.firstName} ! 🎉</h1>
                        <p className="text-lg text-gray-600 mb-8">Votre guide a été envoyé à <strong className="text-gray-900">{userData.email}</strong></p>
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
                            <h3 className="font-bold text-gray-900 mb-4">📬 Dans votre boîte mail :</h3>
                            <ul className="space-y-3 text-left">
                                {[{ icon: "📄", text: "Le guide PDF complet", desc: "9 chapitres + études de cas" }, { icon: "📊", text: "La checklist Excel", desc: "4 phases prêtes à cocher" }, { icon: "🔗", text: "Un lien Calendly", desc: "Pour planifier un échange" }].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"><span className="text-2xl">{item.icon}</span><div><p className="font-medium text-gray-900">{item.text}</p><p className="text-sm text-gray-500">{item.desc}</p></div></li>
                                ))}
                            </ul>
                        </div>
                        {userData.wantsDiagnostic && (
                            <div className="bg-green-50 rounded-2xl p-6 border border-green-100 mb-6">
                                <p className="font-medium text-green-800">✅ Diagnostic personnalisé demandé</p>
                                <p className="text-sm text-green-600 mt-1">Nous vous recontacterons sous 48h.</p>
                            </div>
                        )}
                        <a href="/ressources" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors">Voir d'autres ressources</a>
                    </div>
                </div>
            )}
        </main>
    );
}
