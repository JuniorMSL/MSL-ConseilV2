"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface GuideQuizProps {
    userName: string;
    onComplete: (answers: Record<number, number>, totalScore: number) => void;
    onBack: () => void;
}

interface Question {
    id: number;
    question: string;
    options: {
        text: string;
        points: number;
    }[];
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        question: "Suivez-vous vos objectifs avec des indicateurs concrets ?",
        options: [
            { text: "Non, nous n'avons pas d'indicateurs définis", points: 0 },
            { text: "Quelques chiffres sont suivis de temps en temps", points: 2 },
            { text: "Oui, nous avons des KPI et les analysons régulièrement", points: 5 }
        ]
    },
    {
        id: 2,
        question: "Avez-vous un budget annuel prévisionnel ?",
        options: [
            { text: "Non, nous fonctionnons à l'instinct", points: 0 },
            { text: "Nous avons une idée des grandes masses", points: 2 },
            { text: "Oui, il est formalisé et mis à jour", points: 5 }
        ]
    },
    {
        id: 3,
        question: "Utilisez-vous un tableau de bord de gestion ?",
        options: [
            { text: "Non", points: 0 },
            { text: "Oui, sous forme de tableur Excel simple", points: 2 },
            { text: "Oui, outil automatisé avec mise à jour régulière", points: 5 }
        ]
    },
    {
        id: 4,
        question: "Les données comptables sont-elles exploitées pour prendre des décisions opérationnelles ?",
        options: [
            { text: "Rarement", points: 0 },
            { text: "De temps en temps, mais pas systématiquement", points: 2 },
            { text: "Oui, elles sont intégrées à notre réflexion stratégique", points: 5 }
        ]
    },
    {
        id: 5,
        question: "Quel est votre niveau d'intégration des outils ?",
        options: [
            { text: "Chaque service a son outil isolé", points: 0 },
            { text: "Certains outils sont connectés entre eux", points: 2 },
            { text: "Outils interconnectés via un ERP ou plateforme unique", points: 5 }
        ]
    },
    {
        id: 6,
        question: "Vos responsables opérationnels participent-ils à l'analyse des résultats ?",
        options: [
            { text: "Non, seuls les dirigeants suivent les chiffres", points: 0 },
            { text: "Occasionnellement", points: 2 },
            { text: "Oui, chacun a ses indicateurs et les suit", points: 5 }
        ]
    },
    {
        id: 7,
        question: "Qui réalise le suivi de gestion ?",
        options: [
            { text: "Personne / improvisation", points: 0 },
            { text: "L'expert-comptable en fin d'année", points: 2 },
            { text: "Un contrôleur de gestion ou une personne dédiée", points: 5 }
        ]
    },
    {
        id: 8,
        question: "Êtes-vous capable d'identifier la rentabilité par produit ou service ?",
        options: [
            { text: "Non, nous avons une vision globale uniquement", points: 0 },
            { text: "Partiellement", points: 2 },
            { text: "Oui, nous avons une analyse détaillée", points: 5 }
        ]
    },
    {
        id: 9,
        question: "Réalisez-vous un reporting régulier ?",
        options: [
            { text: "Non", points: 0 },
            { text: "Oui, de façon ponctuelle", points: 2 },
            { text: "Oui, à fréquence définie (mensuelle, trimestrielle…)", points: 5 }
        ]
    },
    {
        id: 10,
        question: "Avez-vous un plan d'action quand un écart ou problème est identifié ?",
        options: [
            { text: "Non, nous réagissons au coup par coup", points: 0 },
            { text: "Cela dépend des situations", points: 2 },
            { text: "Oui, une procédure d'ajustement est prévue", points: 5 }
        ]
    }
];

export default function GuideQuiz({ userName, onComplete, onBack }: GuideQuizProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const question = QUESTIONS[currentQuestion];
    const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
    const answeredCount = Object.keys(answers).length;

    useGSAP(() => {
        gsap.fromTo(".quiz-header",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
    }, { scope: containerRef });

    useEffect(() => {
        // Reset selected option when question changes
        setSelectedOption(answers[question.id] !== undefined ?
            question.options.findIndex(o => o.points === answers[question.id]) : null);
    }, [currentQuestion, answers, question]);

    const animateQuestionChange = (direction: "next" | "prev", callback: () => void) => {
        setIsAnimating(true);
        const questionCard = document.querySelector(".question-card");

        gsap.to(questionCard, {
            x: direction === "next" ? -100 : 100,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                callback();
                gsap.fromTo(questionCard,
                    { x: direction === "next" ? 100 : -100, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out",
                        onComplete: () => setIsAnimating(false)
                    }
                );
            }
        });
    };

    const handleOptionSelect = (optionIndex: number) => {
        if (isAnimating) return;

        setSelectedOption(optionIndex);
        const points = question.options[optionIndex].points;
        setAnswers(prev => ({ ...prev, [question.id]: points }));

        // Auto-advance after a short delay
        setTimeout(() => {
            if (currentQuestion < QUESTIONS.length - 1) {
                animateQuestionChange("next", () => {
                    setCurrentQuestion(prev => prev + 1);
                });
            }
        }, 400);
    };

    const handlePrevious = () => {
        if (currentQuestion > 0 && !isAnimating) {
            animateQuestionChange("prev", () => {
                setCurrentQuestion(prev => prev - 1);
            });
        }
    };

    const handleNext = () => {
        if (currentQuestion < QUESTIONS.length - 1 && selectedOption !== null && !isAnimating) {
            animateQuestionChange("next", () => {
                setCurrentQuestion(prev => prev + 1);
            });
        }
    };

    const handleSubmit = () => {
        const totalScore = Object.values(answers).reduce((sum, points) => sum + points, 0);
        onComplete(answers, totalScore);
    };

    const isLastQuestion = currentQuestion === QUESTIONS.length - 1;
    const allAnswered = answeredCount === QUESTIONS.length;

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-gray-50">
            {/* Header */}
            <div className="quiz-header bg-gradient-to-br from-primary via-primary to-primary/90 pt-24 pb-12 px-6">
                <div className="max-w-3xl mx-auto">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Modifier mes informations
                    </button>

                    <div className="text-center">
                        <span className="inline-block bg-secondary/20 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                            Étape 3 sur 3
                        </span>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            C'est parti, {userName} ! 🎯
                        </h1>
                        <p className="text-white/70">
                            Répondez à 10 questions pour évaluer votre maturité en contrôle de gestion
                        </p>
                    </div>
                </div>
            </div>

            {/* Progress Section */}
            <div className="sticky top-20 z-40 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-3xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">
                            Question {currentQuestion + 1} sur {QUESTIONS.length}
                        </span>
                        <span className="text-sm text-gray-500">
                            {answeredCount} réponse{answeredCount > 1 ? "s" : ""}
                        </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Question dots */}
                    <div className="flex justify-center gap-2 mt-4">
                        {QUESTIONS.map((q, i) => (
                            <button
                                key={q.id}
                                onClick={() => {
                                    if (!isAnimating) {
                                        animateQuestionChange(i > currentQuestion ? "next" : "prev", () => {
                                            setCurrentQuestion(i);
                                        });
                                    }
                                }}
                                className={`w-3 h-3 rounded-full transition-all duration-300
                                    ${i === currentQuestion
                                        ? "bg-primary scale-125"
                                        : answers[q.id] !== undefined
                                            ? "bg-secondary"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Question Card */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="question-card bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Question Header */}
                    <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                {question.id}
                            </div>
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
                                {question.question}
                            </h2>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="p-8">
                        <div className="space-y-4">
                            {question.options.map((option, index) => {
                                const isSelected = selectedOption === index;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(index)}
                                        disabled={isAnimating}
                                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 group
                                            ${isSelected
                                                ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                                                : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                                            }
                                            ${isAnimating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Radio circle */}
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300
                                                ${isSelected
                                                    ? "border-primary bg-primary"
                                                    : "border-gray-300 group-hover:border-gray-400"
                                                }`}>
                                                {isSelected && (
                                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>

                                            {/* Option text */}
                                            <span className={`text-base transition-colors flex-1
                                                ${isSelected ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                                                {option.text}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                            <button
                                onClick={handlePrevious}
                                disabled={currentQuestion === 0 || isAnimating}
                                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all
                                    ${currentQuestion === 0 || isAnimating
                                        ? "text-gray-300 cursor-not-allowed"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Précédent
                            </button>

                            {isLastQuestion ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!allAnswered || isAnimating}
                                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all
                                        ${allAnswered && !isAnimating
                                            ? "bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    Voir mes résultats
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    disabled={selectedOption === null || isAnimating}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                                        ${selectedOption !== null && !isAnimating
                                            ? "bg-primary text-white hover:bg-primary/90"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    Suivant
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Progress indicator */}
                {answeredCount > 0 && (
                    <div className="mt-8 text-center">
                        <p className="text-gray-500">
                            {answeredCount === QUESTIONS.length
                                ? "✓ Toutes les questions ont été répondues"
                                : `${QUESTIONS.length - answeredCount} question${QUESTIONS.length - answeredCount > 1 ? "s" : ""} restante${QUESTIONS.length - answeredCount > 1 ? "s" : ""}`
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
