"use client";

import { useState, useRef } from "react";
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

export default function GuideAutomatisationOdooPage() {
    const [step, setStep] = useState<"content" | "form" | "quiz" | "results">("content");
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
    const [score, setScore] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

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
                />
            )}
        </main>
    );
}
