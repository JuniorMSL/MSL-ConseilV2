"use client";

import { useState } from "react";
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

export default function DiagnosticGestionPage() {
    const [step, setStep] = useState<Step>("content");
    const [userData, setUserData] = useState<UserData | null>(null);
    const [answers, setAnswers] = useState<Record<string, number>>({});

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

    return (
        <main className="w-full min-h-screen bg-white" suppressHydrationWarning>
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
                <QuizResults userData={userData} answers={answers} />
            )}
        </main>
    );
}
