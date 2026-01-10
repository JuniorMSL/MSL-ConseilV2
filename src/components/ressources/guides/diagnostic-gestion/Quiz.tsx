"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface QuizProps {
    onComplete: (answers: Record<string, number>) => void;
    onBack: () => void;
    userName: string;
}

type AnswerType = "yesno" | "yespartiallyno" | "yesnodk";

interface Question {
    id: string;
    text: string;
    type: AnswerType;
    feedbackYes: string;
    feedbackNo: string;
    feedbackPartial?: string;
    chapter: number;
}

const QUIZ_BLOCKS = [
    {
        id: "bloc1",
        title: "Vision et pilotage",
        icon: "🎯",
        description: "Chapitre 1",
        questions: [
            { id: "q1", text: "Avez-vous un plan comptable clair et adapté à votre activité ?", type: "yesno" as AnswerType, feedbackYes: "Votre plan comptable est déjà structuré : excellent point de départ pour automatiser et piloter.", feedbackNo: "Sans plan comptable adapté, difficile d'avoir des indicateurs fiables. Le Chapitre 3 vous aide à construire une structure sur mesure.", chapter: 3 },
            { id: "q2", text: "Votre comptabilité vous aide-t-elle à prendre des décisions, au-delà des obligations fiscales ?", type: "yesno" as AnswerType, feedbackYes: "Vous exploitez déjà votre compta comme un outil stratégique : continuez ainsi !", feedbackNo: "Vous utilisez votre compta uniquement pour déclarer : vous perdez du potentiel. Découvrez comment en faire un levier avec le Chapitre 1.", chapter: 1 },
            { id: "q3", text: "Pouvez-vous sortir un tableau de bord financier en moins de 5 minutes ?", type: "yesno" as AnswerType, feedbackYes: "Bravo ! Vous avez une vision rapide, base essentielle du pilotage.", feedbackNo: "Vous n'avez pas d'indicateurs accessibles rapidement. Le Chapitre 5 vous montre comment les mettre en place.", chapter: 5 },
            { id: "q4", text: "Avez-vous une vue simple et à jour de votre trésorerie ?", type: "yesno" as AnswerType, feedbackYes: "Une bonne gestion de la trésorerie est un marqueur de maturité. Vous êtes sur la bonne voie.", feedbackNo: "Sans visibilité sur votre trésorerie, vous risquez de mauvaises surprises. Commencez par la base avec le Chapitre 1.", chapter: 1 },
            { id: "q5", text: "Vos outils sont-ils bien connectés entre eux ?", type: "yesno" as AnswerType, feedbackYes: "Vous limitez les doubles saisies et gagnez du temps : c'est un excellent point.", feedbackNo: "Des outils non connectés = perte de temps et erreurs. Découvrez dans le Chapitre 5 comment centraliser.", chapter: 5 },
        ]
    },
    {
        id: "bloc2",
        title: "Besoins & structuration",
        icon: "📊",
        description: "Chapitres 2 & 3",
        questions: [
            { id: "q6", text: "Avez-vous formalisé vos besoins comptables (activité, TVA, volume, etc.) ?", type: "yesno" as AnswerType, feedbackYes: "Vous avez une vision claire de votre activité : base indispensable pour un système efficace.", feedbackNo: "Commencez par la fiche de cadrage du Chapitre 2 pour identifier vos vrais besoins.", chapter: 2 },
            { id: "q7", text: "Avez-vous personnalisé votre plan comptable selon vos canaux, produits ou clients ?", type: "yesno" as AnswerType, feedbackYes: "Excellent ! Cela vous permettra une analyse plus fine et une automatisation accrue.", feedbackNo: "Un plan standard limite votre capacité de pilotage. Inspirez-vous du Chapitre 3 pour l'adapter.", chapter: 3 },
            { id: "q8", text: "Suivez-vous la rentabilité par produit, activité ou canal ?", type: "yespartiallyno" as AnswerType, feedbackYes: "C'est une pratique avancée : preuve d'un pilotage efficace.", feedbackPartial: "Vous avez commencé, mais un plan comptable personnalisé pourrait vous aider davantage.", feedbackNo: "Vous manquez d'un indicateur clé. Apprenez à structurer cela avec la compta analytique simple du Chapitre 3.", chapter: 3 },
            { id: "q9", text: "Vos charges sont-elles classées de façon stratégique (par outil, canal, type d'achat) ?", type: "yesno" as AnswerType, feedbackYes: "Cela vous permet de suivre vos coûts efficacement. Très bon point.", feedbackNo: "Classez vos charges selon leur nature stratégique. Voir les exemples du Chapitre 3.", chapter: 3 },
        ]
    },
    {
        id: "bloc3",
        title: "Organisation documentaire",
        icon: "📂",
        description: "Chapitre 4",
        questions: [
            { id: "q10", text: "Tous vos documents comptables sont-ils numérisés et centralisés ?", type: "yesno" as AnswerType, feedbackYes: "Vous avez les bases pour automatiser la saisie et gagner du temps.", feedbackNo: "Cela génère des oublis et des retards. Mettez en place la méthode du Chapitre 4.", chapter: 4 },
            { id: "q11", text: "Disposez-vous d'une adresse email dédiée pour les factures fournisseurs ?", type: "yesno" as AnswerType, feedbackYes: "Cela facilite la centralisation et le traitement automatique. Bon réflexe !", feedbackNo: "C'est simple à mettre en place et très efficace. Consultez le Chapitre 4.", chapter: 4 },
            { id: "q12", text: "Vos relevés bancaires sont-ils intégrés automatiquement ?", type: "yesno" as AnswerType, feedbackYes: "L'automatisation bancaire est une vraie avancée vers le temps réel.", feedbackNo: "Automatisez ce flux pour éviter les erreurs manuelles. Voir le Chapitre 4.", chapter: 4 },
            { id: "q13", text: "Avez-vous une checklist mensuelle pour préparer la clôture comptable ?", type: "yesno" as AnswerType, feedbackYes: "Vous maîtrisez le rythme de gestion, ce qui sécurise votre comptabilité.", feedbackNo: "Adoptez une checklist simple. Vous pouvez utiliser notre modèle dans le Chapitre 4.", chapter: 4 },
        ]
    },
    {
        id: "bloc4",
        title: "Outils & automatisation",
        icon: "⚙️",
        description: "Chapitre 5",
        questions: [
            { id: "q14", text: "Vos outils sont-ils pensés d'abord pour VOUS, pas pour votre expert-comptable ?", type: "yesnodk" as AnswerType, feedbackYes: "Parfait : vos outils doivent d'abord vous servir.", feedbackNo: "Cela vous fait perdre en efficacité. Voyez pourquoi dans le Chapitre 5.", chapter: 5 },
            { id: "q15", text: "Avez-vous centralisé vos flux dans un seul outil ou ERP ?", type: "yespartiallyno" as AnswerType, feedbackYes: "Très bon point. Cela réduit les erreurs et maximise l'automatisation.", feedbackPartial: "Vous êtes sur la bonne voie, mais vous pouvez encore simplifier.", feedbackNo: "Vous multipliez probablement les tâches inutiles. Le Chapitre 5 vous guide.", chapter: 5 },
            { id: "q16", text: "Avez-vous automatisé au moins 2 de ces tâches : facturation, rapprochement bancaire, reporting, classement ?", type: "yesno" as AnswerType, feedbackYes: "Bravo ! Continuez à identifier d'autres tâches automatisables.", feedbackNo: "Vous perdez un temps précieux. Commencez par automatiser la facturation ou les relevés.", chapter: 5 },
            { id: "q17", text: "Avez-vous une vision en temps réel de votre activité (trésorerie, marge, CA…) ?", type: "yesno" as AnswerType, feedbackYes: "C'est un vrai levier de pilotage. Vous êtes dans une logique avancée.", feedbackNo: "Sans vision temps réel, vous risquez de mauvaises décisions. Odoo peut vous y aider (Chapitre 5).", chapter: 5 },
        ]
    }
];

export default function Quiz({ onComplete, onBack, userName }: QuizProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentBlock, setCurrentBlock] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});

    const block = QUIZ_BLOCKS[currentBlock];
    const question = block?.questions[currentQuestion];
    const totalQuestions = QUIZ_BLOCKS.reduce((acc, b) => acc + b.questions.length, 0);
    const answeredCount = Object.keys(answers).length;
    const progress = Math.round((answeredCount / totalQuestions) * 100);

    useGSAP(() => {
        if (question) {
            gsap.fromTo(".quiz-question", { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
        }
    }, { scope: containerRef, dependencies: [currentBlock, currentQuestion] });

    const handleAnswer = (value: number) => {
        if (!question) return;

        setAnswers(prev => ({ ...prev, [question.id]: value }));

        // Next question or block
        setTimeout(() => {
            if (currentQuestion < block.questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
            } else if (currentBlock < QUIZ_BLOCKS.length - 1) {
                setCurrentBlock(prev => prev + 1);
                setCurrentQuestion(0);
            } else {
                onComplete({ ...answers, [question.id]: value });
            }
        }, 300);
    };

    const getOptions = (type: AnswerType) => {
        if (type === "yesno") return [{ label: "Oui ✓", value: 1 }, { label: "Non ✗", value: 0 }];
        if (type === "yespartiallyno") return [{ label: "Oui ✓", value: 1 }, { label: "Partiellement", value: 0.5 }, { label: "Non ✗", value: 0 }];
        return [{ label: "Oui ✓", value: 1 }, { label: "Non ✗", value: 0 }, { label: "Je ne sais pas", value: 0 }];
    };

    // Safety check
    if (!block || !question) {
        return (
            <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Chargement du quiz...</p>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-gray-50 pt-20">
            {/* Header */}
            <div className="sticky top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-3xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            Retour
                        </button>
                        <span className="text-sm font-bold text-primary">{answeredCount + 1}/{totalQuestions}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            </div>

            {/* Block info */}
            <div className="bg-gradient-to-r from-primary to-primary/90 py-6 px-6">
                <div className="max-w-3xl mx-auto flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">{block.icon}</div>
                    <div>
                        <span className="text-white/60 text-sm">{block.description}</span>
                        <h2 className="text-lg font-bold text-white">{block.title}</h2>
                    </div>
                </div>
            </div>

            {/* Question */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="quiz-question bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="text-center mb-8">
                        <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">Question {answeredCount + 1}</span>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{question.text}</h3>
                    </div>

                    <div className="space-y-3">
                        {getOptions(question.type).map((opt) => (
                            <button
                                key={opt.label}
                                onClick={() => handleAnswer(opt.value)}
                                className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all hover:border-primary hover:bg-primary/5 ${answers[question.id] === opt.value ? "border-primary bg-primary/10" : "border-gray-200"}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {QUIZ_BLOCKS.map((b, bi) => (
                        <div key={b.id} className="flex gap-1">
                            {b.questions.map((q, qi) => {
                                const isAnswered = answers[q.id] !== undefined;
                                const isCurrent = bi === currentBlock && qi === currentQuestion;
                                return (
                                    <div
                                        key={q.id}
                                        className={`w-2 h-2 rounded-full transition-all ${isCurrent ? "w-4 bg-primary" : isAnswered ? "bg-green-500" : "bg-gray-200"}`}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { QUIZ_BLOCKS };
export type { Question };
