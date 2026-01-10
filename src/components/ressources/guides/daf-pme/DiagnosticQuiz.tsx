"use client";

import { useState, useEffect } from "react";

// Types
export interface UserInfo {
    firstName: string;
    lastName: string;
    company: string;
    role: string;
    email: string;
}

export interface DiagnosticAnswer {
    questionId: number;
    answer: 0 | 1 | 2; // 0 = ❌, 1 = ⚠️, 2 = ✅
}

export interface DiagnosticResult {
    totalScore: number;
    axeScores: {
        axe1: number;
        axe2: number;
        axe3: number;
        axe4: number;
    };
    answers: DiagnosticAnswer[];
    userInfo: UserInfo;
    date: string;
    id: string;
}

interface Question {
    id: number;
    axe: 1 | 2 | 3 | 4;
    question: string;
    options: {
        value: 0 | 1 | 2;
        label: string;
        icon: string;
        interpretation: string;
    }[];
}

const AXES = [
    { id: 1, title: "Clarté & structure financière", description: "Évalue les fondations de votre pilotage financier : budget, règles, indicateurs, lisibilité." },
    { id: 2, title: "Coût invisible & charge mentale", description: "Évalue ce que votre organisation vous coûte sans forcément apparaître dans les comptes." },
    { id: 3, title: "Maturité du pilotage", description: "Mesure votre capacité à transformer les chiffres en décisions." },
    { id: 4, title: "Le bon moment", description: "Détermine si votre entreprise est prête pour un DAF." },
];

const QUESTIONS: Question[] = [
    // AXE 1 - Clarté & structure financière (Q1-6)
    {
        id: 1, axe: 1, question: "Disposez-vous d'un budget annuel formalisé ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Vos décisions reposent principalement sur l'intuition." },
            { value: 1, label: "Oui, mais peu utilisé", icon: "⚠️", interpretation: "Le budget existe, mais il ne pilote pas réellement l'action." },
            { value: 2, label: "Oui, suivi régulièrement", icon: "✅", interpretation: "Vous disposez d'un véritable outil de pilotage." },
        ]
    },
    {
        id: 2, axe: 1, question: "Vos marges sont-elles connues par activité, produit ou client ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "La rentabilité réelle est partiellement invisible." },
            { value: 1, label: "Approximativement", icon: "⚠️", interpretation: "Certaines décisions restent prises avec un angle mort." },
            { value: 2, label: "Oui, clairement", icon: "✅", interpretation: "Vous savez précisément où vous gagnez (ou perdez) de l'argent." },
        ]
    },
    {
        id: 3, axe: 1, question: "Les règles financières sont-elles claires et partagées ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Le fonctionnement repose sur des habitudes individuelles." },
            { value: 1, label: "Partiellement", icon: "⚠️", interpretation: "La structure existe mais reste fragile." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "L'organisation est transmissible et sécurisée." },
        ]
    },
    {
        id: 4, axe: 1, question: "Les chiffres sont-ils disponibles à temps pour décider ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Les décisions arrivent souvent trop tard." },
            { value: 1, label: "Avec délai", icon: "⚠️", interpretation: "La visibilité existe, mais elle reste réactive." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Les chiffres soutiennent réellement la stratégie." },
        ]
    },
    {
        id: 5, axe: 1, question: "La finance est-elle dépendante d'une seule personne ?",
        options: [
            { value: 0, label: "Oui", icon: "❌", interpretation: "Risque organisationnel élevé." },
            { value: 1, label: "En partie", icon: "⚠️", interpretation: "Le risque est identifié mais pas totalement maîtrisé." },
            { value: 2, label: "Non", icon: "✅", interpretation: "L'organisation est résiliente." },
        ]
    },
    {
        id: 6, axe: 1, question: "Les indicateurs clés sont-ils compris par la direction ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Les chiffres ne jouent pas leur rôle décisionnel." },
            { value: 1, label: "Partiellement", icon: "⚠️", interpretation: "L'analyse reste incomplète." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "La finance parle un langage utile au dirigeant." },
        ]
    },

    // AXE 2 - Coût invisible & charge mentale (Q7-12)
    {
        id: 7, axe: 2, question: "Identifiez-vous clairement les tâches financières chronophages ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Le temps perdu reste invisible." },
            { value: 1, label: "Intuitivement", icon: "⚠️", interpretation: "Vous ressentez la charge sans l'objectiver." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Vous savez où agir en priorité." },
        ]
    },
    {
        id: 8, axe: 2, question: "Le suivi de trésorerie est-il anticipé ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "La trésorerie est subie." },
            { value: 1, label: "Partiellement", icon: "⚠️", interpretation: "Vous avez une vision courte." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Vous pilotez vos flux à moyen terme." },
        ]
    },
    {
        id: 9, axe: 2, question: "Les clôtures génèrent-elles du stress ?",
        options: [
            { value: 0, label: "Souvent", icon: "❌", interpretation: "Système trop manuel ou mal structuré." },
            { value: 1, label: "Parfois", icon: "⚠️", interpretation: "Des frictions subsistent." },
            { value: 2, label: "Rarement", icon: "✅", interpretation: "Les processus sont maîtrisés." },
        ]
    },
    {
        id: 10, axe: 2, question: "Les décisions sont-elles parfois retardées faute de chiffres ?",
        options: [
            { value: 0, label: "Oui", icon: "❌", interpretation: "Le coût caché est stratégique." },
            { value: 1, label: "Parfois", icon: "⚠️", interpretation: "Le pilotage peut être amélioré." },
            { value: 2, label: "Non", icon: "✅", interpretation: "Les chiffres arrivent au bon moment." },
        ]
    },
    {
        id: 11, axe: 2, question: "Utilisez-vous encore beaucoup d'Excel \"maison\" ?",
        options: [
            { value: 0, label: "Oui", icon: "❌", interpretation: "Dépendance et risque élevés." },
            { value: 1, label: "Un peu", icon: "⚠️", interpretation: "Transition en cours." },
            { value: 2, label: "Non", icon: "✅", interpretation: "Les outils sont structurés." },
        ]
    },
    {
        id: 12, axe: 2, question: "Le dirigeant porte-t-il seul la charge financière ?",
        options: [
            { value: 0, label: "Oui", icon: "❌", interpretation: "Risque de surcharge et de décisions isolées." },
            { value: 1, label: "En partie", icon: "⚠️", interpretation: "Le partage progresse." },
            { value: 2, label: "Non", icon: "✅", interpretation: "Le pilotage est collectif." },
        ]
    },

    // AXE 3 - Maturité du pilotage (Q13-18)
    {
        id: 13, axe: 3, question: "Disposez-vous de tableaux de bord réguliers ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Pilotage à vue." },
            { value: 1, label: "Occasionnels", icon: "⚠️", interpretation: "Vision irrégulière." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Vision structurée." },
        ]
    },
    {
        id: 14, axe: 3, question: "Les chiffres servent-ils réellement à décider ?",
        options: [
            { value: 0, label: "Rarement", icon: "❌", interpretation: "La finance est subie." },
            { value: 1, label: "Parfois", icon: "⚠️", interpretation: "Usage partiel." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "La finance soutient la stratégie." },
        ]
    },
    {
        id: 15, axe: 3, question: "Les investissements sont-ils chiffrés avant décision ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Risque élevé." },
            { value: 1, label: "Approximativement", icon: "⚠️", interpretation: "Améliorable." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Décisions rationnelles." },
        ]
    },
    {
        id: 16, axe: 3, question: "Le dialogue avec les banques est-il fluide ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Crédibilité limitée." },
            { value: 1, label: "Variable", icon: "⚠️", interpretation: "Dépend du contexte." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Position solide." },
        ]
    },
    {
        id: 17, axe: 3, question: "La direction comprend-elle les enjeux financiers ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Décalage stratégique." },
            { value: 1, label: "Partiellement", icon: "⚠️", interpretation: "Clarification nécessaire." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Alignement fort." },
        ]
    },
    {
        id: 18, axe: 3, question: "Le pilotage est-il anticipatif ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Gestion réactive." },
            { value: 1, label: "Par moments", icon: "⚠️", interpretation: "Pilotage fragile." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Vision long terme." },
        ]
    },

    // AXE 4 - Besoin réel de DAF (Q19-24)
    {
        id: 19, axe: 4, question: "La complexité de l'entreprise augmente-t-elle ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Stabilité actuelle." },
            { value: 1, label: "Lentement", icon: "⚠️", interpretation: "Évolution progressive." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Croissance en complexité." },
        ]
    },
    {
        id: 20, axe: 4, question: "Le dirigeant manque-t-il de temps pour la finance ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Temps disponible." },
            { value: 1, label: "Parfois", icon: "⚠️", interpretation: "Contraintes ponctuelles." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Besoin de délégation." },
        ]
    },
    {
        id: 21, axe: 4, question: "Les enjeux financiers influencent-ils la stratégie ?",
        options: [
            { value: 0, label: "Peu", icon: "❌", interpretation: "Finance secondaire." },
            { value: 1, label: "De plus en plus", icon: "⚠️", interpretation: "Importance croissante." },
            { value: 2, label: "Fortement", icon: "✅", interpretation: "Finance stratégique." },
        ]
    },
    {
        id: 22, axe: 4, question: "Les décisions financières engagent-elles l'avenir ?",
        options: [
            { value: 0, label: "Rarement", icon: "❌", interpretation: "Impact limité." },
            { value: 1, label: "Régulièrement", icon: "⚠️", interpretation: "Enjeux récurrents." },
            { value: 2, label: "Souvent", icon: "✅", interpretation: "Décisions structurantes." },
        ]
    },
    {
        id: 23, axe: 4, question: "Ressentez-vous le besoin d'un regard externe structurant ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Autonomie suffisante." },
            { value: 1, label: "Parfois", icon: "⚠️", interpretation: "Questionnement naissant." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Besoin identifié." },
        ]
    },
    {
        id: 24, axe: 4, question: "Aujourd'hui, diriez-vous que le pilotage est suffisant ?",
        options: [
            { value: 2, label: "Oui", icon: "✅", interpretation: "Satisfaction actuelle." },
            { value: 1, label: "En partie", icon: "⚠️", interpretation: "Marge de progression." },
            { value: 0, label: "Non", icon: "❌", interpretation: "Besoin d'amélioration." },
        ]
    },
];

interface DiagnosticQuizProps {
    onComplete: (result: DiagnosticResult) => void;
    onBack: () => void;
}

export default function DiagnosticQuiz({ onComplete, onBack }: DiagnosticQuizProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<DiagnosticAnswer[]>([]);
    const [showInterpretation, setShowInterpretation] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showAxeTransition, setShowAxeTransition] = useState(false);
    const [step, setStep] = useState<"intro" | "form" | "quiz">("intro");
    const [userInfo, setUserInfo] = useState<UserInfo>({
        firstName: "",
        lastName: "",
        company: "",
        role: "",
        email: ""
    });
    const [formErrors, setFormErrors] = useState<Partial<UserInfo>>({});


    const question = QUESTIONS[currentQuestion];
    const currentAxe = AXES.find(a => a.id === question?.axe);
    const progress = ((currentQuestion) / QUESTIONS.length) * 100;

    // Check if we're entering a new axe
    const isNewAxe = currentQuestion > 0 &&
        QUESTIONS[currentQuestion - 1]?.axe !== question?.axe;

    useEffect(() => {
        if (isNewAxe && step === "quiz") {
            setShowAxeTransition(true);
            const timer = setTimeout(() => setShowAxeTransition(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [currentQuestion, isNewAxe, step]);

    const handleAnswer = (value: 0 | 1 | 2) => {
        setSelectedAnswer(value);
        setShowInterpretation(true);
    };

    const validateForm = (): boolean => {
        const errors: Partial<UserInfo> = {};
        if (!userInfo.firstName.trim()) errors.firstName = "Le prénom est requis";
        if (!userInfo.lastName.trim()) errors.lastName = "Le nom est requis";
        if (!userInfo.company.trim()) errors.company = "Le nom de l'entreprise est requis";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setStep("quiz");
        }
    };

    const handleNext = () => {
        if (selectedAnswer === null) return;

        const newAnswers = [...answers, { questionId: question.id, answer: selectedAnswer as 0 | 1 | 2 }];
        setAnswers(newAnswers);

        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setShowInterpretation(false);
        } else {
            // Calculate results
            const axe1 = newAnswers.filter(a => QUESTIONS.find(q => q.id === a.questionId)?.axe === 1).reduce((sum, a) => sum + a.answer, 0);
            const axe2 = newAnswers.filter(a => QUESTIONS.find(q => q.id === a.questionId)?.axe === 2).reduce((sum, a) => sum + a.answer, 0);
            const axe3 = newAnswers.filter(a => QUESTIONS.find(q => q.id === a.questionId)?.axe === 3).reduce((sum, a) => sum + a.answer, 0);
            const axe4 = newAnswers.filter(a => QUESTIONS.find(q => q.id === a.questionId)?.axe === 4).reduce((sum, a) => sum + a.answer, 0);

            const result: DiagnosticResult = {
                totalScore: axe1 + axe2 + axe3 + axe4,
                axeScores: { axe1, axe2, axe3, axe4 },
                answers: newAnswers,
                userInfo: userInfo,
                date: new Date().toISOString(),
                id: `diag_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            };

            // Save to localStorage
            localStorage.setItem('daf_diagnostic_result', JSON.stringify(result));

            onComplete(result);
        }
    };

    // Intro Screen
    if (step === "intro") {
        return (
            <section className="w-full min-h-screen bg-gray-50 text-gray-900 py-32 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
                        <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif mb-6">
                        Votre entreprise a-t-elle réellement besoin d'un <span className="text-secondary">Directeur Financier</span> ?
                    </h1>

                    <p className="text-xl text-gray-600 mb-10">
                        Un diagnostic de maturité financière pour dirigeants de PME.
                        <br />Clair, confidentiel, sans engagement.
                    </p>

                    {/* Reassurance points */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {[
                            { icon: "⏱️", text: "5 à 7 min" },
                            { icon: "🧠", text: "Aucune \"bonne\" réponse" },
                            { icon: "🔒", text: "100% confidentiel" },
                            { icon: "🎯", text: "Résultat personnalisé" },
                        ].map((item, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                                <span className="text-2xl block mb-2">{item.icon}</span>
                                <span className="text-sm text-gray-600">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-gray-500 text-sm mb-10 italic">
                        "Ce diagnostic ne vous dira pas quoi faire. Il vous aidera à comprendre ce que vos réponses révèlent."
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => setStep("form")}
                            className="px-10 py-5 bg-secondary text-primary rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors duration-300 shadow-xl hover:scale-105"
                        >
                            Commencer le diagnostic
                        </button>
                        <button
                            onClick={onBack}
                            className="px-10 py-5 border border-gray-300 text-gray-700 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-gray-100 transition-colors duration-300"
                        >
                            Retour au guide
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    // User Form Screen
    if (step === "form") {
        return (
            <section className="w-full min-h-screen bg-gray-50 text-gray-900 py-32 px-6">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-serif mb-4">Avant de commencer...</h2>
                        <p className="text-gray-600">
                            Pour personnaliser votre diagnostic, merci de renseigner quelques informations.
                        </p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Prénom <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={userInfo.firstName}
                                    onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.firstName ? 'border-red-500' : 'border-gray-200'} focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors outline-none`}
                                    placeholder="Votre prénom"
                                />
                                {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nom <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={userInfo.lastName}
                                    onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.lastName ? 'border-red-500' : 'border-gray-200'} focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors outline-none`}
                                    placeholder="Votre nom"
                                />
                                {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Entreprise <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={userInfo.company}
                                onChange={(e) => setUserInfo({ ...userInfo, company: e.target.value })}
                                className={`w-full px-4 py-3 rounded-xl border ${formErrors.company ? 'border-red-500' : 'border-gray-200'} focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors outline-none`}
                                placeholder="Nom de votre entreprise"
                            />
                            {formErrors.company && <p className="text-red-500 text-sm mt-1">{formErrors.company}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Fonction
                            </label>
                            <input
                                type="text"
                                value={userInfo.role}
                                onChange={(e) => setUserInfo({ ...userInfo, role: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors outline-none"
                                placeholder="Ex: Dirigeant, Gérant, DAF..."
                            />
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email <span className="text-gray-400 text-xs">(optionnel)</span>
                            </label>
                            <input
                                type="email"
                                value={userInfo.email}
                                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors outline-none"
                                placeholder="email@exemple.com"
                            />
                            <p className="text-gray-400 text-xs mt-2">Pour recevoir vos résultats par email</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                className="flex-1 px-8 py-4 bg-secondary text-primary rounded-full font-bold uppercase tracking-wider text-sm hover:bg-primary hover:text-white transition-colors"
                            >
                                Démarrer le diagnostic
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep("intro")}
                                className="px-8 py-4 border border-gray-300 text-gray-700 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-gray-100 transition-colors"
                            >
                                Retour
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-gray-400 text-sm mt-6">
                        🔒 Vos données restent confidentielles et ne sont pas partagées.
                    </p>
                </div>
            </section>
        );
    }


    // Axe Transition Screen
    if (showAxeTransition) {
        return (
            <section className="w-full min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center px-6">
                <div className="text-center animate-pulse">
                    <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs block mb-4">
                        AXE {currentAxe?.id}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif mb-4">{currentAxe?.title}</h2>
                    <p className="text-gray-500 max-w-md">{currentAxe?.description}</p>
                </div>
            </section>
        );
    }

    // Question Screen
    return (
        <section className="w-full min-h-screen bg-gray-50 text-gray-900 py-24 px-6">
            <div className="max-w-2xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
                        <span>Question {currentQuestion + 1} / {QUESTIONS.length}</span>
                        <span>AXE {currentAxe?.id} — {currentAxe?.title}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-secondary transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-serif mb-4">
                        {question.question}
                    </h2>
                </div>

                {/* Options */}
                <div className="space-y-4 mb-8">
                    {question.options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleAnswer(option.value)}
                            className={`w-full p-6 rounded-2xl border transition-all text-left ${selectedAnswer === option.value
                                ? 'bg-secondary/20 border-secondary text-primary shadow-md'
                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
                                }`}
                        >
                            <span className="text-2xl mr-3">{option.icon}</span>
                            <span className="text-lg font-medium">{option.label}</span>
                        </button>
                    ))}
                </div>

                {/* Interpretation (shown after answer) */}
                {showInterpretation && selectedAnswer !== null && (
                    <div className="mb-8 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm animate-fade-in">
                        <p className="text-gray-600">
                            <strong className="text-secondary">Ce que cela signifie :</strong>{' '}
                            {question.options.find(o => o.value === selectedAnswer)?.interpretation}
                        </p>
                    </div>
                )}

                {/* Next Button */}
                <div className="flex justify-between">
                    <button
                        onClick={onBack}
                        className="px-6 py-3 text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        ← Retour
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={selectedAnswer === null}
                        className={`px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all ${selectedAnswer !== null
                            ? 'bg-secondary text-primary hover:bg-white'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {currentQuestion < QUESTIONS.length - 1 ? 'Question suivante' : 'Voir mes résultats'}
                    </button>
                </div>
            </div>
        </section>
    );
}

export { QUESTIONS, AXES };
