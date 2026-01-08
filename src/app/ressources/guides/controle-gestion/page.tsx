"use client";

import { useState, useRef } from "react";
import GuideHero from "@/components/ressources/guides/controle-gestion/GuideHero";
import GuideUserForm from "@/components/ressources/guides/controle-gestion/GuideUserForm";
import GuideContent from "@/components/ressources/guides/controle-gestion/GuideContent";
import GuideQuiz from "@/components/ressources/guides/controle-gestion/GuideQuiz";
import GuideResults from "@/components/ressources/guides/controle-gestion/GuideResults";
import ChapterNav from "@/components/ressources/guides/controle-gestion/ChapterNav";

export interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    role: string;
    employees: string;
}

// Sections list for navigation
const SECTIONS = [
    { id: 1, title: "Qu'est-ce que le contrôle de gestion ?" },
    { id: 2, title: "Pourquoi est-il important ?" },
    { id: 3, title: "Différence entre contrôle de gestion et comptabilité" },
    { id: 4, title: "Les différentes formes de contrôle" },
    { id: 5, title: "Le rôle du contrôleur de gestion" },
    { id: 6, title: "Les outils clés du contrôle de gestion" },
    { id: 7, title: "Les étapes pour mettre en place un contrôle de gestion" },
    { id: 8, title: "Contrôleur de gestion vs Expert-comptable" },
    { id: 9, title: "Quels outils informatiques ?" },
    { id: 10, title: "Avantages et limites" },
    { id: 11, title: "Travailler avec un cabinet comptable" },
];

export default function GuideControleGestionPage() {
    // New flow: hero → content → form → quiz → results
    const [step, setStep] = useState<"content" | "form" | "quiz" | "results">("content");
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
    const [score, setScore] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleStartQuiz = () => {
        // First, collect user info before quiz
        setStep("form");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleUserSubmit = (info: UserInfo) => {
        setUserInfo(info);
        setStep("quiz");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleQuizComplete = (answers: Record<number, number>, totalScore: number) => {
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

            {step === "form" && (
                <GuideUserForm
                    onSubmit={handleUserSubmit}
                    onBack={handleBackToContent}
                />
            )}

            {step === "quiz" && userInfo && (
                <GuideQuiz
                    userName={userInfo.firstName}
                    onComplete={handleQuizComplete}
                    onBack={handleBackToForm}
                />
            )}

            {step === "results" && userInfo && (
                <GuideResults
                    score={score}
                    userInfo={userInfo}
                    onRestartQuiz={handleRestartQuiz}
                />
            )}
        </main>
    );
}
