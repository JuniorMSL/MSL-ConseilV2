"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GuideHero from "@/components/ressources/guides/diagnostic-gestion/GuideHero";
import GuideEducatif from "@/components/ressources/guides/diagnostic-gestion/GuideEducatif";
import ChapterNav from "@/components/ressources/guides/diagnostic-gestion/ChapterNav";
import UserForm, { UserData } from "@/components/ressources/guides/diagnostic-gestion/UserForm";
import Quiz from "@/components/ressources/guides/diagnostic-gestion/Quiz";
import QuizResults from "@/components/ressources/guides/diagnostic-gestion/QuizResults";

type Step = "content" | "form" | "quiz" | "results";

const CHAPTERS = [
    { id: 1, title: "Pourquoi structurer sa comptabilité" },
    { id: 2, title: "Définir les besoins comptables" },
    { id: 3, title: "Construire un plan comptable (PCMN)" },
    { id: 4, title: "Organiser les documents et flux" },
    { id: 5, title: "Choisir les bons outils" },
];

function DiagnosticGestionContent() {
    const searchParams = useSearchParams();
    const [isMounted, setIsMounted] = useState(false);
    const [step, setStep] = useState<Step>("content");
    const [userData, setUserData] = useState<UserData | null>(null);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isSharedVisitor, setIsSharedVisitor] = useState(false);
    const [showSharedBanner, setShowSharedBanner] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Check if visitor came from a shared link (Point 7)
    useEffect(() => {
        if (!isMounted) return;

        const source = searchParams.get('source');
        const ref = searchParams.get('ref');

        if (source === 'share' || ref === 'diagnostic') {
            setIsSharedVisitor(true);
            setShowSharedBanner(true);

            // Scroll to diagnostic section after delay
            setTimeout(() => {
                const diagnosticSection = document.getElementById('diagnostic');
                if (diagnosticSection) {
                    diagnosticSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1000);
        }
    }, [searchParams, isMounted]);

    const handleStartDiagnostic = () => {
        setStep("form");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleFormSubmit = (data: UserData) => {
        setUserData(data);
        setStep("quiz");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleQuizComplete = (quizAnswers: Record<string, number>) => {
        setAnswers(quizAnswers);
        setStep("results");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBackToContent = () => {
        setStep("content");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBackToForm = () => {
        setStep("form");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Show loading during SSR
    if (!isMounted) {
        return (
            <main className="w-full min-h-screen bg-white">
                <div className="w-full min-h-[70vh] flex items-center justify-center pt-24" style={{ background: "linear-gradient(135deg, #012a1e 0%, #014730 50%, #016742 100%)" }}>
                    <div className="text-white/50 text-sm">Chargement...</div>
                </div>
            </main>
        );
    }

    return (
        <main className="w-full min-h-screen bg-white">
            {/* Shared visitor banner - Point 7 */}
            {showSharedBanner && step === "content" && (
                <div className="fixed top-20 left-0 right-0 z-40 px-4">
                    <div className="max-w-xl mx-auto bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-lg flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            <span className="text-xl">👋</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-700">
                                <strong className="text-gray-900">Ce diagnostic vous a été partagé par un autre entrepreneur</strong>{" "}
                                pour comparer vos pratiques de gestion.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowSharedBanner(false)}
                            className="text-gray-400 hover:text-gray-600 p-1"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Chapter Navigation - Only visible on content step */}
            {step === "content" && <ChapterNav chapters={CHAPTERS} />}

            {step === "content" && (
                <>
                    <GuideHero />
                    <GuideEducatif onStartDiagnostic={handleStartDiagnostic} />
                </>
            )}

            {step === "form" && (
                <UserForm onSubmit={handleFormSubmit} onBack={handleBackToContent} />
            )}

            {step === "quiz" && userData && (
                <Quiz onComplete={handleQuizComplete} onBack={handleBackToForm} userName={userData.firstName} />
            )}

            {step === "results" && userData && (
                <QuizResults userData={userData} answers={answers} isSharedVisitor={isSharedVisitor} />
            )}
        </main>
    );
}

export default function DiagnosticGestionPage() {
    return (
        <Suspense fallback={
            <main className="w-full min-h-screen bg-white">
                <div className="w-full min-h-[70vh] flex items-center justify-center pt-24" style={{ background: "linear-gradient(135deg, #012a1e 0%, #014730 50%, #016742 100%)" }}>
                    <div className="text-white/50 text-sm">Chargement...</div>
                </div>
            </main>
        }>
            <DiagnosticGestionContent />
        </Suspense>
    );
}
