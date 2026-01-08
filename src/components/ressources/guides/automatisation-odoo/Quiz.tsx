"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Odoo purple color
const ODOO_PURPLE = "#714b67";

interface QuizProps {
    onComplete: (answers: Record<string, number>, totalScore: number) => void;
    onBack: () => void;
    userName: string;
}

export interface Question {
    id: string;
    text: string;
    feedbackYes: string;
    feedbackNo: string;
    chapter: number;
}

export interface QuizSection {
    id: string;
    title: string;
    icon: string;
    description: string;
    chapterRef: string;
    questions: Question[];
}

// 31 questions réparties en 6 sections (basées sur les chapitres 6-11)
export const QUIZ_SECTIONS: QuizSection[] = [
    {
        id: "section1",
        title: "Automatisation avec Odoo",
        icon: "⚙️",
        description: "Chapitre 6",
        chapterRef: "Ch. 6",
        questions: [
            { id: "q1", text: "Utilises-tu Odoo pour la facturation client et fournisseur ?", feedbackYes: "Excellent ! Odoo est au cœur de tes flux comptables.", feedbackNo: "Centraliser la facturation dans Odoo te permettra d'automatiser beaucoup de tâches.", chapter: 6 },
            { id: "q2", text: "Ton stock est-il géré dans Odoo ?", feedbackYes: "Parfait ! La valorisation automatique du stock est un vrai gain de temps.", feedbackNo: "Le module Inventaire d'Odoo te permettra de gérer les stocks et leur valorisation comptable automatiquement.", chapter: 6 },
            { id: "q3", text: "Tes ventes en boutique sont-elles connectées via le module POS ?", feedbackYes: "Bravo ! Plus besoin de ressaisir les ventes en caisse.", feedbackNo: "Le POS connecté génère automatiquement les écritures comptables et met à jour le stock.", chapter: 6 },
            { id: "q4", text: "Tes comptes bancaires sont-ils synchronisés avec Odoo ?", feedbackYes: "Excellent ! Le rapprochement automatique te fait gagner un temps précieux.", feedbackNo: "La synchronisation bancaire (CODA, API) permet le rapprochement et le lettrage automatiques.", chapter: 6 },
            { id: "q5", text: "Les flux comptables sont-ils générés automatiquement ?", feedbackYes: "Tu as atteint un bon niveau d'automatisation.", feedbackNo: "L'automatisation des écritures réduit les erreurs et te libère du temps.", chapter: 6 },
            { id: "q6", text: "Ton équipe connaît-elle le processus automatisé ?", feedbackYes: "Former les utilisateurs est essentiel pour éviter les erreurs humaines.", feedbackNo: "Prends le temps de former ton équipe aux bonnes pratiques Odoo.", chapter: 6 }
        ]
    },
    {
        id: "section2",
        title: "Pilotage financier",
        icon: "📊",
        description: "Chapitre 7",
        chapterRef: "Ch. 7",
        questions: [
            { id: "q7", text: "As-tu une visibilité claire sur ta marge par activité ?", feedbackYes: "C'est un indicateur clé que tu maîtrises déjà.", feedbackNo: "Connaître ta marge par activité est essentiel pour prendre les bonnes décisions.", chapter: 7 },
            { id: "q8", text: "Sais-tu quand un problème de trésorerie pourrait survenir ?", feedbackYes: "Anticiper la trésorerie est un signe de maturité financière.", feedbackNo: "Une prévision de trésorerie à 30/60/90 jours t'éviterait des mauvaises surprises.", chapter: 7 },
            { id: "q9", text: "Peux-tu connaître tes résultats en moins de 5 minutes ?", feedbackYes: "Bravo ! Tu as une vision rapide de ton activité.", feedbackNo: "Un tableau de bord bien configuré dans Odoo te donnera accès à tes KPI instantanément.", chapter: 7 },
            { id: "q10", text: "Ton tableau de bord est-il lisible et partagé ?", feedbackYes: "Partager les indicateurs favorise la prise de décision collective.", feedbackNo: "Un tableau de bord simplifié avec 5-10 KPI max serait plus efficace.", chapter: 7 },
            { id: "q11", text: "Tes indicateurs t'aident-ils à prendre des décisions concrètes ?", feedbackYes: "Tes indicateurs sont pertinents et actionnables.", feedbackNo: "Choisis des indicateurs qui t'aident vraiment à décider, pas juste à observer.", chapter: 7 }
        ]
    },
    {
        id: "section3",
        title: "Comptabilité analytique",
        icon: "📈",
        description: "Chapitre 8",
        chapterRef: "Ch. 8",
        questions: [
            { id: "q12", text: "Suis-tu la rentabilité par projet ou client ?", feedbackYes: "Excellent ! C'est une pratique avancée de pilotage.", feedbackNo: "L'analytique par projet/client te permettrait de savoir ce qui est vraiment rentable.", chapter: 8 },
            { id: "q13", text: "As-tu défini 1 à 3 axes analytiques maximum ?", feedbackYes: "Tu as gardé ta structure simple et efficace.", feedbackNo: "Limiter les axes analytiques évite la complexité inutile.", chapter: 8 },
            { id: "q14", text: "Ton équipe sait-elle affecter une opération à un axe ?", feedbackYes: "L'implication de l'équipe garantit la fiabilité des données.", feedbackNo: "Former l'équipe à l'affectation analytique améliorerait la qualité des données.", chapter: 8 },
            { id: "q15", text: "Compares-tu les résultats aux budgets prévus ?", feedbackYes: "Le suivi budget vs réalisé est un excellent outil de pilotage.", feedbackNo: "Comparer réalisé et budget te permettrait d'anticiper et corriger.", chapter: 8 },
            { id: "q16", text: "Utilises-tu les rapports analytiques pour décider ?", feedbackYes: "Tu exploites pleinement ton analytique.", feedbackNo: "Les rapports analytiques d'Odoo peuvent éclairer tes décisions stratégiques.", chapter: 8 }
        ]
    },
    {
        id: "section4",
        title: "Production comptable",
        icon: "📅",
        description: "Chapitre 9",
        chapterRef: "Ch. 9",
        questions: [
            { id: "q17", text: "Chaque tâche comptable clé a-t-elle un responsable ?", feedbackYes: "La répartition claire des rôles évite les oublis.", feedbackNo: "Définir qui fait quoi éviterait le 'ni fait, ni à faire'.", chapter: 9 },
            { id: "q18", text: "As-tu un planning hebdomadaire pour les tâches courantes ?", feedbackYes: "Une routine régulière garantit la fiabilité des données.", feedbackNo: "Un créneau fixe de 30 min à 1h par semaine éviterait les accumulations.", chapter: 9 },
            { id: "q19", text: "Réalises-tu une clôture mensuelle avec checklist ?", feedbackYes: "La checklist sécurise ta production comptable.", feedbackNo: "Une checklist de clôture mensuelle améliorerait la qualité de tes données.", chapter: 9 },
            { id: "q20", text: "Les ventes, achats et banques sont-ils traités automatiquement ?", feedbackYes: "L'automatisation te libère pour des tâches à plus forte valeur.", feedbackNo: "Automatiser ces flux de base serait un premier quick-win.", chapter: 9 },
            { id: "q21", text: "Es-tu alerté rapidement en cas d'anomalie ?", feedbackYes: "Les alertes automatiques te permettent de réagir vite.", feedbackNo: "Configurer des alertes dans Odoo te permettrait de détecter les problèmes plus tôt.", chapter: 9 }
        ]
    },
    {
        id: "section5",
        title: "Collaboration avec le cabinet",
        icon: "🤝",
        description: "Chapitre 10",
        chapterRef: "Ch. 10",
        questions: [
            { id: "q22", text: "Ton cabinet connaît-il ton outil de gestion (Odoo) ?", feedbackYes: "La collaboration est plus fluide quand le cabinet connaît tes outils.", feedbackNo: "Présenter Odoo à ton cabinet améliorerait la qualité des échanges.", chapter: 10 },
            { id: "q23", text: "As-tu une liste claire de ce que tu dois transmettre ?", feedbackYes: "La clarté évite les oublis et les retards.", feedbackNo: "Une liste standardisée des documents à transmettre simplifierait les échanges.", chapter: 10 },
            { id: "q24", text: "Utilises-tu un espace de partage structuré ?", feedbackYes: "Un espace organisé facilite la collaboration.", feedbackNo: "Un Drive partagé ou un accès Odoo structuré réduirait les frictions.", chapter: 10 },
            { id: "q25", text: "Les documents sont-ils bien nommés et classés ?", feedbackYes: "Le nommage cohérent fait gagner du temps à tous.", feedbackNo: "Adopter une convention de nommage ([Date]_Fournisseur_Objet.pdf) serait utile.", chapter: 10 },
            { id: "q26", text: "Avez-vous un point fixe mensuel ou trimestriel ?", feedbackYes: "La communication régulière prévient les problèmes.", feedbackNo: "Un point régulier, même court (5-15 min), améliorerait la relation.", chapter: 10 }
        ]
    },
    {
        id: "section6",
        title: "Évolution de l'architecture",
        icon: "🚀",
        description: "Chapitre 11",
        chapterRef: "Ch. 11",
        questions: [
            { id: "q27", text: "Ton plan comptable reflète-t-il bien l'évolution de ton activité ?", feedbackYes: "Ton plan comptable est adapté à ta réalité actuelle.", feedbackNo: "Une revue annuelle du plan comptable permettrait de l'adapter à ton évolution.", chapter: 11 },
            { id: "q28", text: "Ton outil comptable est-il modulaire (ex : Odoo) ?", feedbackYes: "La modularité te permet de grandir sans rupture.", feedbackNo: "Un outil modulaire comme Odoo permettrait d'ajouter des fonctionnalités sans changer de système.", chapter: 11 },
            { id: "q29", text: "As-tu anticipé les changements fiscaux ou juridiques ?", feedbackYes: "L'anticipation évite les mauvaises surprises.", feedbackNo: "Prévoir une veille ou un accompagnement te préparerait aux évolutions.", chapter: 11 },
            { id: "q30", text: "Suis-tu ta rentabilité par pôle / produit ?", feedbackYes: "Tu as une vision fine de ce qui génère de la valeur.", feedbackNo: "Le suivi par pôle/produit t'aiderait à identifier tes leviers de croissance.", chapter: 11 },
            { id: "q31", text: "As-tu un interlocuteur pour t'accompagner dans cette évolution ?", feedbackYes: "Un accompagnement facilite les transitions.", feedbackNo: "Un intégrateur ou conseiller pourrait t'aider à structurer ta croissance.", chapter: 11 }
        ]
    }
];

export default function Quiz({ onComplete, onBack, userName }: QuizProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentSection, setCurrentSection] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});

    const section = QUIZ_SECTIONS[currentSection];
    const question = section?.questions?.[currentQuestion];
    const totalQuestions = QUIZ_SECTIONS.reduce((acc, s) => acc + s.questions.length, 0);
    const answeredCount = Object.keys(answers).length;
    const progress = Math.round((answeredCount / totalQuestions) * 100);

    useGSAP(() => {
        if (question) {
            gsap.fromTo(".quiz-question", { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
        }
    }, { scope: containerRef, dependencies: [currentSection, currentQuestion] });

    const handleAnswer = (value: number) => {
        if (!question) return;

        const newAnswers = { ...answers, [question.id]: value };
        setAnswers(newAnswers);

        // Next question or section
        setTimeout(() => {
            if (currentQuestion < section.questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
            } else if (currentSection < QUIZ_SECTIONS.length - 1) {
                setCurrentSection(prev => prev + 1);
                setCurrentQuestion(0);
            } else {
                // Calculate total score
                const totalScore = Object.values(newAnswers).reduce((acc, val) => acc + val, 0);
                onComplete(newAnswers, totalScore);
            }
        }, 300);
    };

    // Safety check - should never happen but prevents crash
    if (!section || !question) {
        return (
            <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Chargement du quiz...</p>
                    <button onClick={onBack} className="mt-4 text-purple-600 hover:underline">
                        Retour
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-gray-50">
            {/* Header */}
            <div className="sticky top-20 z-40 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-3xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Retour
                        </button>
                        <span className="text-sm font-bold" style={{ color: ODOO_PURPLE }}>{answeredCount + 1}/{totalQuestions}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full transition-all duration-500 rounded-full" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${ODOO_PURPLE} 0%, #8e6180 100%)` }} />
                    </div>
                </div>
            </div>

            {/* Section info */}
            <div className="py-6 px-6" style={{ background: `linear-gradient(135deg, ${ODOO_PURPLE} 0%, #8e6180 100%)` }}>
                <div className="max-w-3xl mx-auto flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">{section.icon}</div>
                    <div>
                        <span className="text-white/60 text-sm">{section.description}</span>
                        <h2 className="text-lg font-bold text-white">{section.title}</h2>
                    </div>
                </div>
            </div>

            {/* Question */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="quiz-question bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="text-center mb-8">
                        <span className="inline-block text-white text-sm font-medium px-3 py-1 rounded-full mb-4" style={{ backgroundColor: ODOO_PURPLE }}>
                            Question {answeredCount + 1}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{question.text}</h3>
                    </div>

                    <div className="space-y-3">
                        {[
                            { label: "Oui ✓", value: 1 },
                            { label: "Non ✗", value: 0 }
                        ].map((opt) => (
                            <button
                                key={opt.label}
                                onClick={() => handleAnswer(opt.value)}
                                className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all hover:border-purple-500 hover:bg-purple-50 ${answers[question.id] === opt.value ? "border-purple-500 bg-purple-100" : "border-gray-200"}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 mt-8 flex-wrap">
                    {QUIZ_SECTIONS.map((s, si) => (
                        <div key={s.id} className="flex gap-1">
                            {s.questions.map((q, qi) => {
                                const isAnswered = answers[q.id] !== undefined;
                                const isCurrent = si === currentSection && qi === currentQuestion;
                                return (
                                    <div
                                        key={q.id}
                                        className={`w-2 h-2 rounded-full transition-all ${isCurrent ? "w-4" : ""}`}
                                        style={{ backgroundColor: isCurrent ? ODOO_PURPLE : isAnswered ? "#10b981" : "#e5e7eb" }}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Section indicators */}
                <div className="flex justify-center gap-4 mt-6 text-xs text-gray-500">
                    {QUIZ_SECTIONS.map((s, i) => (
                        <span key={s.id} className={`flex items-center gap-1 ${i === currentSection ? "font-bold" : ""}`} style={{ color: i === currentSection ? ODOO_PURPLE : undefined }}>
                            {s.icon} {s.chapterRef}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
