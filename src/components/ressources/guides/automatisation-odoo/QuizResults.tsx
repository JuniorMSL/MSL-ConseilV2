"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { QUIZ_SECTIONS } from "./Quiz";
import { UserInfo } from "@/app/ressources/guides/automatisation-odoo/page";

// Odoo purple color
const ODOO_PURPLE = "#714b67";

interface QuizResultsProps {
    score: number;
    answers: Record<string, number>;
    userInfo: UserInfo;
    onRestartQuiz: () => void;
    isSharedVisitor?: boolean;
}

// Score thresholds per section (6 questions in section 1, 5 in others)
const getSectionLevel = (sectionScore: number, maxScore: number) => {
    const percentage = (sectionScore / maxScore) * 100;
    if (percentage <= 33) return { level: "🔴 À structurer", color: "red", desc: "Des fondations à poser" };
    if (percentage <= 66) return { level: "🟡 En cours de structuration", color: "yellow", desc: "Bonne base à consolider" };
    return { level: "🟢 Bien structuré", color: "green", desc: "Excellent niveau !" };
};

// Global maturity levels
const MATURITY_LEVELS = [
    { min: 0, max: 10, level: "Niveau Débutant", emoji: "🔴", color: "red", desc: "Structuration nécessaire", recommendation: "Vous avez besoin de poser les bases de l'automatisation et du pilotage. Commencez par les Chapitres 6 et 9." },
    { min: 11, max: 20, level: "Niveau Intermédiaire", emoji: "🟡", color: "yellow", desc: "Bonne base à consolider", recommendation: "Vous êtes sur la bonne voie ! Renforcez votre analytique (Ch. 8) et la collaboration avec votre cabinet (Ch. 10)." },
    { min: 21, max: 31, level: "Niveau Avancé", emoji: "🟢", color: "green", desc: "Architecture comptable performante", recommendation: "Bravo ! Vous avez un excellent niveau. Continuez à optimiser et anticipez la croissance (Ch. 11)." }
];

// Section diagnostic messages
const SECTION_DIAGNOSTICS: Record<string, { low: string; mid: string; high: string }> = {
    section1: {
        low: "Votre système est encore très manuel. C'est le moment de poser les fondations d'une automatisation progressive.",
        mid: "Vous avez déjà automatisé certaines fonctions. Il reste quelques leviers clés à activer pour gagner du temps.",
        high: "Bravo ! Vos flux sont bien automatisés. Vous êtes prêt à piloter plus finement vos performances."
    },
    section2: {
        low: "Les indicateurs sont à clarifier et intégrer à un tableau de bord partagé. Priorité : marge, trésorerie, rentabilité.",
        mid: "Vous avez commencé à structurer vos indicateurs. Renforcez leur usage dans les décisions quotidiennes.",
        high: "Excellent ! Vos indicateurs sont clairs et vous aident à prendre de bonnes décisions."
    },
    section3: {
        low: "L'analytique n'est pas encore en place. C'est une opportunité d'avoir une vision plus fine de votre rentabilité.",
        mid: "L'analytique est bien amorcée. Renforcez l'usage dans les décisions quotidiennes et liez-la aux budgets.",
        high: "Vous exploitez bien l'analytique ! Continuez à l'utiliser comme outil de pilotage stratégique."
    },
    section4: {
        low: "La production comptable manque de structure. Mettez en place une routine et des responsabilités claires.",
        mid: "Bonne organisation des tâches. Pensez à renforcer les alertes automatiques et à formaliser la routine hebdo.",
        high: "Production comptable bien rodée ! Votre organisation est fluide et fiable."
    },
    section5: {
        low: "Le partage des données reste perfectible. Objectif : nommage standardisé, checklist de transmission, point mensuel.",
        mid: "La collaboration est en place mais peut être optimisée. Structurez davantage les échanges.",
        high: "Excellente collaboration avec votre cabinet ! Les échanges sont fluides et efficaces."
    },
    section6: {
        low: "Vous pouvez anticiper davantage les évolutions. Prévoyez une revue annuelle de votre plan comptable et des besoins outils.",
        mid: "Vous avez commencé à anticiper. Continuez à prévoir les évolutions et impliquez un accompagnant si besoin.",
        high: "Vous êtes prêt pour la croissance ! Votre architecture évolue avec votre activité."
    }
};

export default function QuizResults({ score, answers, userInfo, onRestartQuiz, isSharedVisitor = false }: QuizResultsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showShareWidget, setShowShareWidget] = useState(true);
    const [shareConfirmation, setShareConfirmation] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const scoreMax = 31;
    const maturity = MATURITY_LEVELS.find(m => score >= m.min && score <= m.max) || MATURITY_LEVELS[0];

    // Share URL with tracking (Guide 2)
    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/ressources/guides/automatisation-odoo?source=share&ref=diagnostic&canal=`
        : 'https://msl-conseil.com/ressources/guides/automatisation-odoo?source=share&ref=diagnostic&canal=';

    // Pre-filled messages for Guide 2 (different tone - more advanced)
    const whatsAppMessage = `Salut 👋

Je suis en train de travailler sur l'automatisation et le pilotage financier de ma PME.

J'ai lu un guide très pertinent sur le sujet et fait un diagnostic assez poussé.

J'aimerais bien avoir ton avis sur cette approche, et voir si ça correspond à ta façon de gérer aujourd'hui.

Si tu veux, tu peux aussi faire le diagnostic pour te situer (un peu plus avancé, mais très utile).

👉 ${shareUrl}whatsapp`;

    const linkedInMessage = `Bonjour,

Je travaille actuellement sur l'automatisation et le pilotage de la gestion financière de mon entreprise.

J'ai consulté un guide très structuré sur le sujet et réalisé un diagnostic avancé.

Les résultats m'ont fait réfléchir, et je serais curieux d'avoir ton regard de dirigeant.
Si le sujet t'intéresse, tu peux également faire le diagnostic pour te situer.

👉 ${shareUrl}linkedin`;

    const copyMessage = `Je travaille sur l'automatisation et le pilotage financier de ma PME.
Ce guide + diagnostic m'a permis de me situer.

Curieux d'avoir ton avis.
👉 ${shareUrl}copy`;

    // Calculate score per section
    const sectionScores = QUIZ_SECTIONS.map(section => {
        const sectionQuestions = section.questions;
        const sectionScore = sectionQuestions.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
        const maxScore = sectionQuestions.length;
        const percentage = Math.round((sectionScore / maxScore) * 100);

        let diagnostic;
        if (percentage <= 33) diagnostic = SECTION_DIAGNOSTICS[section.id].low;
        else if (percentage <= 66) diagnostic = SECTION_DIAGNOSTICS[section.id].mid;
        else diagnostic = SECTION_DIAGNOSTICS[section.id].high;

        return {
            ...section,
            score: sectionScore,
            maxScore,
            percentage,
            level: getSectionLevel(sectionScore, maxScore),
            diagnostic
        };
    });

    // Generate action plan based on lowest scores
    const sortedSections = [...sectionScores].sort((a, b) => a.percentage - b.percentage);
    const priorityActions = sortedSections.slice(0, 4).map(section => ({
        domain: section.title,
        action: getActionForSection(section.id),
        impact: getImpactForSection(section.id),
        chapter: section.description
    }));

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo(".result-score", { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" })
            .fromTo(".result-item", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.4");
    }, { scope: containerRef });

    // Confetti if good score
    useEffect(() => {
        if (score >= 21) {
            const colors = [ODOO_PURPLE, "#fe981a", "#10b981", "#3b82f6"];
            for (let i = 0; i < 40; i++) {
                const confetti = document.createElement("div");
                confetti.style.cssText = `position:fixed;width:10px;height:10px;background:${colors[Math.floor(Math.random() * colors.length)]};left:${Math.random() * 100}vw;top:-20px;border-radius:${Math.random() > 0.5 ? "50%" : "2px"};pointer-events:none;z-index:9999;`;
                document.body.appendChild(confetti);
                gsap.to(confetti, { y: window.innerHeight + 100, x: (Math.random() - 0.5) * 200, rotation: Math.random() * 720, duration: 2 + Math.random() * 2, ease: "power1.out", delay: Math.random() * 0.5, onComplete: () => confetti.remove() });
            }
        }
    }, [score]);

    // Handle share actions
    const handleShareWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(whatsAppMessage)}`, '_blank');
        showShareFeedback();
    };

    const handleShareLinkedIn = () => {
        window.open(`https://www.linkedin.com/messaging/compose?body=${encodeURIComponent(linkedInMessage)}`, '_blank');
        showShareFeedback();
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(copyMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        showShareFeedback();
    };

    const showShareFeedback = () => {
        setShareConfirmation("✅ Lien prêt à être partagé\n\nAstuce : pour vraiment avoir un retour utile, demande simplement :\n\"Est-ce que ça correspond à ta façon de gérer aujourd'hui ?\"");
        setTimeout(() => setShareConfirmation(null), 7000);
    };

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-gray-50 relative">
            {/* Header */}
            <div className="pt-24 pb-12 px-6" style={{ background: `linear-gradient(135deg, ${ODOO_PURPLE} 0%, #8e6180 100%)` }}>
                <div className="max-w-3xl mx-auto text-center">
                    <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                        Résultats du diagnostic
                    </span>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                        Votre diagnostic personnalisé, {userInfo.firstName} 🎯
                    </h1>
                    {userInfo.company && (
                        <p className="text-white/70 mt-2">{userInfo.company}</p>
                    )}
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-12">
                {/* Score card */}
                <div className="result-item bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center mb-8">
                    <div className="result-score inline-flex items-center justify-center w-32 h-32 rounded-full text-white mb-6" style={{ background: `linear-gradient(135deg, ${ODOO_PURPLE} 0%, #8e6180 100%)` }}>
                        <div className="text-center">
                            <span className="text-3xl font-bold">{score}</span>
                            <span className="text-lg">/{scoreMax}</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{maturity.emoji} {maturity.level}</h2>
                    <p className="text-gray-600 mb-4">{maturity.desc}</p>
                    <div className="bg-secondary/10 rounded-xl p-4 text-left border border-secondary/20">
                        <p className="text-sm text-gray-500 mb-1">📌 Recommandation principale :</p>
                        <p className="font-medium text-gray-900">{maturity.recommendation}</p>
                    </div>
                </div>

                {/* Score by section */}
                <div className="result-item bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-gray-100" style={{ backgroundColor: `${ODOO_PURPLE}10` }}>
                        <h3 className="font-bold text-gray-900">📊 Score par section + diagnostic personnalisé</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {sectionScores.map((section) => (
                            <div key={section.id} className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">{section.icon}</span>
                                        <span className="font-medium text-gray-900">{section.title}</span>
                                        <span className="text-xs text-gray-500">({section.description})</span>
                                    </div>
                                    <span className="font-bold" style={{ color: section.level.color === "green" ? "#10b981" : section.level.color === "yellow" ? "#f59e0b" : "#ef4444" }}>
                                        {section.score}/{section.maxScore}
                                    </span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                                    <div
                                        className="h-full rounded-full transition-all"
                                        style={{
                                            width: `${section.percentage}%`,
                                            backgroundColor: section.level.color === "green" ? "#10b981" : section.level.color === "yellow" ? "#f59e0b" : "#ef4444"
                                        }}
                                    />
                                </div>
                                <p className={`text-sm ${section.level.color === "green" ? "text-green-700 bg-green-50" : section.level.color === "yellow" ? "text-yellow-700 bg-yellow-50" : "text-red-700 bg-red-50"} p-3 rounded-lg`}>
                                    {section.diagnostic}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action plan */}
                <div className="result-item bg-blue-50 rounded-2xl p-6 border border-blue-100 mb-8">
                    <h3 className="font-bold text-gray-900 mb-4">🛠️ Plan d&apos;action personnalisé</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-blue-200">
                                    <th className="p-2 text-left font-semibold">Priorité</th>
                                    <th className="p-2 text-left font-semibold">Domaine</th>
                                    <th className="p-2 text-left font-semibold">Action recommandée</th>
                                    <th className="p-2 text-left font-semibold">Impact attendu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {priorityActions.map((action, i) => (
                                    <tr key={i} className="border-b border-blue-100 bg-white">
                                        <td className="p-2">
                                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold" style={{ backgroundColor: ODOO_PURPLE }}>
                                                {i + 1}
                                            </span>
                                        </td>
                                        <td className="p-2 font-medium text-gray-800">
                                            {action.domain}
                                            <span className="text-xs text-gray-500 ml-1">({action.chapter})</span>
                                        </td>
                                        <td className="p-2 text-gray-700">{action.action}</td>
                                        <td className="p-2 text-gray-600">{action.impact}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Detailed feedback */}
                <div className="result-item space-y-4 mb-8">
                    <h3 className="font-bold text-gray-900 text-lg">📋 Détail des réponses par section</h3>
                    {QUIZ_SECTIONS.map((section) => (
                        <div key={section.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                                <span className="text-2xl">{section.icon}</span>
                                <h4 className="font-bold text-gray-900">{section.title}</h4>
                            </div>
                            <div className="p-4 space-y-3">
                                {section.questions.map((q) => {
                                    const answer = answers[q.id];
                                    const isPositive = answer === 1;
                                    const feedback = isPositive ? q.feedbackYes : q.feedbackNo;
                                    return (
                                        <div key={q.id} className={`p-4 rounded-xl ${isPositive ? "bg-green-50 border border-green-100" : "bg-orange-50 border border-orange-100"}`}>
                                            <div className="flex items-start gap-3">
                                                <span className="text-lg">{isPositive ? "✅" : "⚠️"}</span>
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-1 italic">&quot;{q.text}&quot;</p>
                                                    <p className={`text-sm font-medium ${isPositive ? "text-green-800" : "text-orange-800"}`}>{feedback}</p>
                                                    {!isPositive && (
                                                        <p className="text-xs text-gray-500 mt-2">📘 Voir {section.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quote */}
                <div className="result-item bg-gray-900 rounded-2xl p-8 text-center mb-8">
                    <p className="text-lg text-white italic">&quot;L&apos;automatisation permet de transformer la comptabilité en outil de pilotage.&quot;</p>
                    <p className="text-secondary font-bold mt-2">Plus de productivité, moins d&apos;erreurs, meilleur contrôle.</p>
                </div>

                {/* CTAs */}
                <div className="result-item rounded-2xl p-8 text-center mb-8" style={{ background: `linear-gradient(135deg, ${ODOO_PURPLE} 0%, #8e6180 100%)` }}>
                    <h3 className="text-xl font-bold text-white mb-4">🚀 Prêt à passer à l&apos;action ?</h3>
                    <p className="text-white/70 mb-6">Téléchargez le guide complet ou prenez rendez-vous pour un audit personnalisé.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold px-6 py-3 rounded-xl transition-all">
                            📞 Prendre rendez-vous
                        </Link>
                        <Link href="/ressources" className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-3 rounded-xl transition-all">
                            📚 Voir nos autres guides
                        </Link>
                    </div>
                    <button onClick={onRestartQuiz} className="mt-4 text-white/60 hover:text-white text-sm transition-colors">
                        🔄 Refaire le test
                    </button>
                </div>

                {/* Social Proof / Recommendation loop */}
                <div className="result-item text-center mb-8">
                    {isSharedVisitor ? (
                        <p className="text-sm text-gray-500">
                            💬 <span className="font-medium">Beaucoup de dirigeants de PME partagent ensuite leur diagnostic</span><br />
                            pour confronter leur niveau d&apos;automatisation et progresser plus vite.
                        </p>
                    ) : (
                        <p className="text-sm text-gray-500">
                            💡 <span className="font-medium">Ce diagnostic est souvent utilisé entre dirigeants de PME</span><br />
                            pour comparer leur niveau d&apos;automatisation et de pilotage.
                        </p>
                    )}
                </div>
            </div>

            {/* ======================================= */}
            {/* SHARE WIDGET - DESKTOP (Guide 2 version) */}
            {/* ======================================= */}
            {showShareWidget && (
                <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-40 w-72">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 relative">
                        {/* Close button */}
                        <button
                            onClick={() => setShowShareWidget(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Title - Guide 2 specific */}
                        <h4 className="text-lg font-bold text-gray-900 mb-2">🔎 Comparer votre niveau d&apos;automatisation ?</h4>

                        {/* Main text - Guide 2 specific */}
                        <p className="text-sm text-gray-600 mb-4">
                            Les dirigeants en croissance comparent souvent leur niveau d&apos;automatisation et de pilotage.<br /><br />
                            <span className="font-medium">Partage ton diagnostic</span> pour avoir un retour ou inviter un autre dirigeant à se situer.
                        </p>

                        {/* Sub-text - Positioning */}
                        <p className="text-xs text-gray-400 mb-4 italic">
                            Diagnostic avancé – réservé aux PME structurées.
                        </p>

                        {/* Share buttons */}
                        <div className="space-y-2">
                            <button
                                onClick={handleShareWhatsApp}
                                className="w-full p-3 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center gap-3 hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20 text-sm font-medium"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Partager sur WhatsApp
                            </button>

                            <button
                                onClick={handleShareLinkedIn}
                                className="w-full p-3 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] flex items-center gap-3 hover:bg-[#0A66C2]/20 transition-colors border border-[#0A66C2]/20 text-sm font-medium"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                Envoyer sur LinkedIn
                            </button>

                            <button
                                onClick={handleCopyLink}
                                className="w-full p-3 rounded-xl bg-gray-100 text-gray-700 flex items-center gap-3 hover:bg-gray-200 transition-colors border border-gray-200 text-sm font-medium"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                {copied ? "✅ Lien copié !" : "Copier le lien"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ======================================= */}
            {/* SHARE WIDGET - MOBILE (Guide 2 version) */}
            {/* ======================================= */}
            {showShareWidget && (
                <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 safe-area-inset-bottom">
                    <div className="max-w-lg mx-auto">
                        {/* Compact text - Guide 2 mobile version */}
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="font-bold text-gray-900 text-sm">🔎 Comparer votre niveau de pilotage ?</p>
                                <p className="text-xs text-gray-500">Partage ce diagnostic à un autre dirigeant.</p>
                            </div>
                            <button
                                onClick={() => setShowShareWidget(false)}
                                className="text-gray-400 hover:text-gray-600 p-1"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Horizontal buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={handleShareWhatsApp}
                                className="flex-1 p-3 rounded-xl bg-[#25D366] text-white flex items-center justify-center gap-2 text-sm font-medium"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp
                            </button>
                            <button
                                onClick={handleShareLinkedIn}
                                className="flex-1 p-3 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center gap-2 text-sm font-medium"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                LinkedIn
                            </button>
                            <button
                                onClick={handleCopyLink}
                                className="p-3 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center"
                            >
                                {copied ? (
                                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ======================================= */}
            {/* SHARE CONFIRMATION TOAST */}
            {/* ======================================= */}
            {shareConfirmation && (
                <div className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%]">
                    <div className="bg-gray-900 text-white rounded-2xl p-4 shadow-2xl">
                        <p className="text-sm whitespace-pre-line">{shareConfirmation}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper functions for action plan
function getActionForSection(sectionId: string): string {
    const actions: Record<string, string> = {
        section1: "Activer le module POS et stock dans Odoo",
        section2: "Créer un tableau de bord avec 5 KPI mensuels",
        section3: "Définir les axes analytiques par projet et client",
        section4: "Mettre en place une checklist de clôture mensuelle",
        section5: "Partager un dossier structuré avec votre cabinet",
        section6: "Planifier une revue annuelle de votre architecture comptable"
    };
    return actions[sectionId] || "Améliorer ce domaine";
}

function getImpactForSection(sectionId: string): string {
    const impacts: Record<string, string> = {
        section1: "Réduction des erreurs + gain de temps",
        section2: "Décisions plus rapides et éclairées",
        section3: "Vision claire de la rentabilité",
        section4: "Données plus fiables, clôture plus rapide",
        section5: "Échanges simplifiés, relation fluide",
        section6: "Prévention des blocages, croissance maîtrisée"
    };
    return impacts[sectionId] || "Amélioration globale";
}
