"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GuideHero from "@/components/ressources/guides/automatisation-odoo/GuideHero";
import GuideContent from "@/components/ressources/guides/automatisation-odoo/GuideContent";
import ChapterNav from "@/components/ressources/guides/automatisation-odoo/ChapterNav";
import UserForm from "@/components/ressources/guides/automatisation-odoo/UserForm";
import Quiz from "@/components/ressources/guides/automatisation-odoo/Quiz";
import QuizResults from "@/components/ressources/guides/automatisation-odoo/QuizResults";

export interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    role: string;
    employees: string;
}

// Sections list for navigation (Chapters 6-11)
const SECTIONS = [
    { id: 6, title: "Automatiser les flux comptables avec Odoo" },
    { id: 7, title: "Définir les indicateurs clés de pilotage" },
    { id: 8, title: "Mettre en place une comptabilité analytique" },
    { id: 9, title: "Organiser la production comptable" },
    { id: 10, title: "Préparer l'interaction avec le cabinet" },
    { id: 11, title: "Faire évoluer l'architecture comptable" },
];

function GuideAutomatisationOdooContent() {
    const searchParams = useSearchParams();
    const [isMounted, setIsMounted] = useState(false);
    const [step, setStep] = useState<"content" | "form" | "quiz" | "results">("content");
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
    const [score, setScore] = useState(0);
    const [isSharedVisitor, setIsSharedVisitor] = useState(false);
    const [showSharedBanner, setShowSharedBanner] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // Prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Check if visitor came from a shared link
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

    const handleStartQuiz = () => {
        setStep("form");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleUserSubmit = (info: UserInfo) => {
        setUserInfo(info);
        setStep("quiz");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleQuizComplete = (answers: Record<string, number>, totalScore: number) => {
        setQuizAnswers(answers);
        setScore(totalScore);
        setStep("results");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleRestartQuiz = () => {
        setQuizAnswers({});
        setScore(0);
        setStep("quiz");
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
                <div className="w-full min-h-[70vh] flex items-center justify-center pt-24" style={{ background: "linear-gradient(135deg, #714b67 0%, #8e6180 100%)" }}>
                    <div className="text-white/50 text-sm">Chargement...</div>
                </div>
            </main>
        );
    }

    return (
        <main className="w-full min-h-screen bg-white">
            {/* Shared visitor banner */}
            {showSharedBanner && step === "content" && (
                <div className="fixed top-20 left-0 right-0 z-40 px-4">
                    <div className="max-w-xl mx-auto bg-purple-50 border border-purple-200 rounded-xl p-4 shadow-lg flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                            <span className="text-xl">👋</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-700">
                                <strong className="text-gray-900">Ce diagnostic vous a été partagé par un autre dirigeant</strong>{" "}
                                pour comparer votre niveau d&apos;automatisation et de pilotage.
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
            {step === "content" && <ChapterNav sections={SECTIONS} />}

            {step === "content" && (
                <div ref={contentRef}>
                    <GuideHero />
                    <GuideContent onStartQuiz={handleStartQuiz} />
                </div>
            )}

            {step === "form" && (
                <UserForm
                    onSubmit={handleUserSubmit}
                    onBack={handleBackToContent}
                />
            )}

            {step === "quiz" && userInfo && (
                <Quiz
                    userName={userInfo.firstName}
                    onComplete={handleQuizComplete}
                    onBack={handleBackToForm}
                />
            )}

            {step === "results" && userInfo && (
                <QuizResults
                    score={score}
                    answers={quizAnswers}
                    userInfo={userInfo}
                    onRestartQuiz={handleRestartQuiz}
                    isSharedVisitor={isSharedVisitor}
                />
            )}
        </main>
    );
}

export default function GuideAutomatisationOdooPage() {
    return (
        <Suspense fallback={
            <main className="w-full min-h-screen bg-white">
                <div className="w-full min-h-[70vh] flex items-center justify-center pt-24" style={{ background: "linear-gradient(135deg, #714b67 0%, #8e6180 100%)" }}>
                    <div className="text-white/50 text-sm">Chargement...</div>
                </div>
            </main>
        }>
            <GuideAutomatisationOdooContent />
        </Suspense>
    );
}
