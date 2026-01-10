"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GuideNewHero from "@/components/ressources/guides/automatisation-diagnostic/GuideNewHero";
import GuideNewContent from "@/components/ressources/guides/automatisation-diagnostic/GuideNewContent";
import ChapterNavNew from "@/components/ressources/guides/automatisation-diagnostic/ChapterNavNew";
import AutoDiagnosticQuiz, { DiagnosticResult } from "@/components/ressources/guides/automatisation-diagnostic/AutoDiagnosticQuiz";
import AutoDiagnosticResults from "@/components/ressources/guides/automatisation-diagnostic/AutoDiagnosticResults";
import SharedResults from "@/components/ressources/guides/automatisation-diagnostic/SharedResults";

type PageState = "guide" | "quiz" | "results" | "shared";

interface SharedData {
    score: number;
    level: string;
    fromName?: string;
}

function AutomatisationDiagnosticContent() {
    const searchParams = useSearchParams();
    const [isMounted, setIsMounted] = useState(false);
    const [pageState, setPageState] = useState<PageState>("guide");
    const [result, setResult] = useState<DiagnosticResult | null>(null);
    const [sharedData, setSharedData] = useState<SharedData | null>(null);

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
            setPageState("shared");
        }
    }, [searchParams, isMounted]);

    // Check for existing results in localStorage
    useEffect(() => {
        if (!isMounted) return;
        if (pageState === "shared") return; // Don't override shared view

        const savedResult = localStorage.getItem('auto_diagnostic_result');
        if (savedResult) {
            try {
                const parsed = JSON.parse(savedResult);
                // Check if the result is less than 7 days old
                const resultDate = new Date(parsed.date);
                const now = new Date();
                const daysDiff = (now.getTime() - resultDate.getTime()) / (1000 * 60 * 60 * 24);

                if (daysDiff < 7) {
                    setResult(parsed);
                }
            } catch (e) {
                console.error('Error parsing saved diagnostic result:', e);
            }
        }
    }, [pageState, isMounted]);

    const handleStartDiagnostic = () => {
        // Clear URL params when starting own diagnostic
        if (typeof window !== 'undefined') {
            window.history.replaceState({}, '', window.location.pathname);
        }
        setPageState("quiz");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleQuizComplete = (diagnosticResult: DiagnosticResult) => {
        setResult(diagnosticResult);
        setPageState("results");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBackToGuide = () => {
        // Clear URL params
        if (typeof window !== 'undefined') {
            window.history.replaceState({}, '', window.location.pathname);
        }
        setPageState("guide");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleRestart = () => {
        localStorage.removeItem('auto_diagnostic_result');
        setResult(null);
        setPageState("quiz");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleViewResults = () => {
        if (result) {
            setPageState("results");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
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
            {/* ChapterNav only on guide state */}
            {pageState === "guide" && <ChapterNavNew />}

            {/* Show existing result banner if user has completed diagnostic before (only on guide state) */}
            {pageState === "guide" && result && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-md w-[90%] lg:left-auto lg:right-6 lg:translate-x-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Diagnostic déjà réalisé</p>
                            <p className="text-xs text-gray-500">Score : {result.totalScore}/48</p>
                        </div>
                        <button
                            onClick={handleViewResults}
                            className="px-4 py-2 bg-secondary text-primary rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-colors"
                        >
                            Voir
                        </button>
                    </div>
                </div>
            )}

            {/* Shared results view */}
            {pageState === "shared" && sharedData && (
                <SharedResults
                    score={sharedData.score}
                    level={sharedData.level}
                    fromName={sharedData.fromName}
                    onStartDiagnostic={handleStartDiagnostic}
                    onReadGuide={handleBackToGuide}
                />
            )}

            {/* Guide view */}
            {pageState === "guide" && (
                <>
                    <GuideNewHero />
                    <GuideNewContent onStartDiagnostic={handleStartDiagnostic} />
                </>
            )}

            {/* Quiz view */}
            {pageState === "quiz" && (
                <AutoDiagnosticQuiz
                    onComplete={handleQuizComplete}
                    onBack={handleBackToGuide}
                />
            )}

            {/* Results view */}
            {pageState === "results" && result && (
                <AutoDiagnosticResults
                    result={result}
                    onRestart={handleRestart}
                    onBackToGuide={handleBackToGuide}
                />
            )}
        </main>
    );
}

export default function AutomatisationDiagnosticPage() {
    return (
        <Suspense fallback={
            <main className="w-full min-h-screen bg-white">
                <div className="w-full min-h-[70vh] flex items-center justify-center pt-24" style={{ background: "linear-gradient(135deg, #012a1e 0%, #014730 50%, #016742 100%)" }}>
                    <div className="text-white/50 text-sm">Chargement...</div>
                </div>
            </main>
        }>
            <AutomatisationDiagnosticContent />
        </Suspense>
    );
}
