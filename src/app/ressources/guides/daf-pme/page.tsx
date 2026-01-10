"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GuideHero from "@/components/ressources/guides/daf-pme/GuideHero";
import GuideContent from "@/components/ressources/guides/daf-pme/GuideContent";
import ChapterNav from "@/components/ressources/guides/daf-pme/ChapterNav";
import DiagnosticQuiz, { DiagnosticResult } from "@/components/ressources/guides/daf-pme/DiagnosticQuiz";
import DiagnosticResults from "@/components/ressources/guides/daf-pme/DiagnosticResults";
import SharedResultsDAF from "@/components/ressources/guides/daf-pme/SharedResults";

// Sections list for navigation
const SECTIONS = [
    { id: 1, title: "Introduction : Pourquoi ce guide ?" },
    { id: 2, title: "Le DAF, bras droit stratégique" },
    { id: 3, title: "Pourquoi un seul profil ne peut pas tout faire" },
    { id: 4, title: "Pourquoi un DAF devient indispensable" },
    { id: 5, title: "Une alternative intelligente : DAF partiel" },
    { id: 6, title: "5 signaux que vous avez besoin d'un DAF" },
    { id: 7, title: "Démarrer concrètement en 30 jours" },
    { id: 8, title: "Conclusion – Le pilotage est une posture" },
];

type Step = "content" | "quiz" | "results" | "shared";

interface SharedData {
    score: number;
    level: string;
    fromName?: string;
}

function GuideDAFContent() {
    const searchParams = useSearchParams();
    const [isMounted, setIsMounted] = useState(false);
    const [step, setStep] = useState<Step>("content");
    const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);
    const [sharedData, setSharedData] = useState<SharedData | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Check for shared results in URL params
    useEffect(() => {
        if (!isMounted) return;

        const shared = searchParams.get('shared');
        const score = searchParams.get('score');
        const level = searchParams.get('level');
        const fromName = searchParams.get('from');

        if (shared === 'true' && score && level) {
            setSharedData({
                score: parseInt(score, 10),
                level: decodeURIComponent(level),
                fromName: fromName ? decodeURIComponent(fromName) : undefined
            });
            setStep("shared");
        }
    }, [searchParams, isMounted]);

    // Check for saved results on mount
    useEffect(() => {
        if (!isMounted) return;
        if (step === "shared") return; // Don't override shared view

        const savedResult = localStorage.getItem('daf_diagnostic_result');
        if (savedResult) {
            try {
                const parsed = JSON.parse(savedResult);
                setDiagnosticResult(parsed);
            } catch {
                // Invalid saved result, ignore
            }
        }
    }, [step, isMounted]);

    const handleStartDiagnostic = () => {
        // Clear URL params when starting own diagnostic
        if (typeof window !== 'undefined') {
            window.history.replaceState({}, '', window.location.pathname);
        }
        setStep("quiz");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleQuizComplete = (result: DiagnosticResult) => {
        setDiagnosticResult(result);
        setStep("results");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackToGuide = () => {
        // Clear URL params
        if (typeof window !== 'undefined') {
            window.history.replaceState({}, '', window.location.pathname);
        }
        setStep("content");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRestartQuiz = () => {
        setDiagnosticResult(null);
        localStorage.removeItem('daf_diagnostic_result');
        setStep("quiz");
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            {/* Chapter Navigation - Only visible on content step */}
            {step === "content" && <ChapterNav sections={SECTIONS} />}

            {/* Shared results view */}
            {step === "shared" && sharedData && (
                <SharedResultsDAF
                    score={sharedData.score}
                    level={sharedData.level}
                    fromName={sharedData.fromName}
                    onStartDiagnostic={handleStartDiagnostic}
                    onReadGuide={handleBackToGuide}
                />
            )}

            {/* Guide Content */}
            {step === "content" && (
                <div ref={contentRef}>
                    <GuideHero />
                    <GuideContent onStartDiagnostic={handleStartDiagnostic} />

                    {/* Show previous result badge if exists */}
                    {diagnosticResult && (
                        <div className="fixed bottom-6 right-6 z-40">
                            <button
                                onClick={() => setStep("results")}
                                className="px-6 py-4 bg-primary text-white rounded-2xl shadow-2xl flex items-center gap-3 hover:bg-primary/90 transition-colors"
                            >
                                <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="text-left">
                                    <p className="text-xs text-white/60">Votre dernier score</p>
                                    <p className="font-bold">{diagnosticResult.totalScore}/48</p>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Diagnostic Quiz */}
            {step === "quiz" && (
                <DiagnosticQuiz
                    onComplete={handleQuizComplete}
                    onBack={handleBackToGuide}
                />
            )}

            {/* Results */}
            {step === "results" && diagnosticResult && (
                <DiagnosticResults
                    result={diagnosticResult}
                    onRestart={handleRestartQuiz}
                    onBackToGuide={handleBackToGuide}
                />
            )}
        </main>
    );
}

export default function GuideDAFPage() {
    return (
        <Suspense fallback={
            <main className="w-full min-h-screen bg-white">
                <div className="w-full min-h-[70vh] flex items-center justify-center pt-24" style={{ background: "linear-gradient(135deg, #012a1e 0%, #014730 50%, #016742 100%)" }}>
                    <div className="text-white/50 text-sm">Chargement...</div>
                </div>
            </main>
        }>
            <GuideDAFContent />
        </Suspense>
    );
}
