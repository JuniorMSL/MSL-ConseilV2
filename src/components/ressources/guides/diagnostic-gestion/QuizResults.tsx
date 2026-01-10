"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { UserData } from "./UserForm";
import { QUIZ_BLOCKS } from "./Quiz";

interface QuizResultsProps {
    userData: UserData;
    answers: Record<string, number>;
    isSharedVisitor?: boolean;
}

const MATURITY_LEVELS = [
    { min: 0, max: 7, level: "🔴 Structuration absente", color: "red", desc: "Votre comptabilité est un frein.", recommendation: "Commencez par structurer les bases avec notre guide → Chapitres 1 à 3" },
    { min: 8, max: 14, level: "🟠 Structuration en cours", color: "orange", desc: "Bonne base, mais pas encore optimisée.", recommendation: "Vous avez besoin d'une meilleure organisation et d'automatisations → Chapitres 3 à 5" },
    { min: 15, max: 20, level: "🟢 Comptabilité optimisée", color: "green", desc: "Comptabilité bien structurée !", recommendation: "Bravo ! Vous êtes prêt pour l'automatisation et le pilotage avancé avec Odoo" }
];

export default function QuizResults({ userData, answers, isSharedVisitor = false }: QuizResultsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showShareWidget, setShowShareWidget] = useState(true);
    const [shareConfirmation, setShareConfirmation] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Calculate score
    const score = Object.values(answers).reduce((acc, val) => acc + val, 0);
    const scoreMax = 17;
    const scorePercent = Math.round((score / scoreMax) * 100);

    const maturity = MATURITY_LEVELS.find(m => score >= m.min && score <= m.max) || MATURITY_LEVELS[0];

    // Share URL with tracking
    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/ressources/guides/diagnostic-gestion?source=share&ref=diagnostic`
        : 'https://msl-conseil.com/ressources/guides/diagnostic-gestion?source=share&ref=diagnostic';

    // Pre-filled message
    const shareMessage = `Salut 👋

Je viens de lire un guide très intéressant sur la structuration de la comptabilité des PME ("Structurer sa comptabilité PME pour gagner du temps") et j'ai fait un diagnostic en ligne.

J'aimerais bien avoir ton avis sur mes résultats.
Si tu veux, tu peux aussi faire le diagnostic pour te situer (2 minutes).

👉 ${shareUrl}`;

    // Group feedback by block
    const feedbackByBlock = QUIZ_BLOCKS.map(block => ({
        ...block,
        feedbacks: block.questions.map(q => {
            const answer = answers[q.id];
            let feedback = "";
            let isPositive = false;

            if (answer === 1) {
                feedback = q.feedbackYes;
                isPositive = true;
            } else if (answer === 0.5 && q.feedbackPartial) {
                feedback = q.feedbackPartial;
            } else {
                feedback = q.feedbackNo;
            }

            return { question: q.text, feedback, isPositive, chapter: q.chapter };
        })
    }));

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo(".result-score", { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" })
            .fromTo(".result-item", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.4");
    }, { scope: containerRef });

    // Confetti if good score
    useEffect(() => {
        if (score >= 15) {
            const colors = ["#014730", "#fe981a", "#10b981", "#3b82f6"];
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
        const url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
        window.open(url, '_blank');
        showShareFeedback();
    };

    const handleShareLinkedIn = () => {
        const url = `https://www.linkedin.com/messaging/compose?body=${encodeURIComponent(shareMessage)}`;
        window.open(url, '_blank');
        showShareFeedback();
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareMessage);
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
            <div className="bg-gradient-to-r from-primary to-primary/90 pt-24 pb-12 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Résultats du diagnostic</span>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Votre diagnostic personnalisé, {userData.firstName} 🎯</h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-12">
                {/* Score card */}
                <div className="result-item bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center mb-8">
                    <div className="result-score inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white mb-6">
                        <div className="text-center">
                            <span className="text-3xl font-bold">{score}</span>
                            <span className="text-lg">/{scoreMax}</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{maturity.level}</h2>
                    <p className="text-gray-600 mb-4">{maturity.desc}</p>
                    <div className="bg-secondary/10 rounded-xl p-4 text-left border border-secondary/20">
                        <p className="text-sm text-gray-500 mb-1">📌 Recommandation principale :</p>
                        <p className="font-medium text-gray-900">{maturity.recommendation}</p>
                    </div>
                </div>

                {/* Detailed feedback by block */}
                <div className="result-item space-y-6 mb-8">
                    <h3 className="font-bold text-gray-900 text-lg">📋 Diagnostic personnalisé basé sur vos réponses</h3>

                    {feedbackByBlock.map((block) => (
                        <div key={block.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                                <span className="text-2xl">{block.icon}</span>
                                <h4 className="font-bold text-gray-900">{block.title}</h4>
                            </div>
                            <div className="p-4 space-y-3">
                                {block.feedbacks.map((fb, i) => (
                                    <div key={i} className={`p-4 rounded-xl ${fb.isPositive ? "bg-green-50 border border-green-100" : "bg-orange-50 border border-orange-100"}`}>
                                        <div className="flex items-start gap-3">
                                            <span className="text-lg">{fb.isPositive ? "✅" : "⚠️"}</span>
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1 italic">&quot;{fb.question}&quot;</p>
                                                <p className={`text-sm font-medium ${fb.isPositive ? "text-green-800" : "text-orange-800"}`}>{fb.feedback}</p>
                                                {!fb.isPositive && (
                                                    <p className="text-xs text-gray-500 mt-2">📘 Voir Chapitre {fb.chapter}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action plan */}
                <div className="result-item bg-blue-50 rounded-2xl p-6 border border-blue-100 mb-8">
                    <h3 className="font-bold text-gray-900 mb-4">📝 Plan d&apos;action recommandé</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-blue-200">
                                    <th className="p-2 text-left font-semibold">Étape</th>
                                    <th className="p-2 text-left font-semibold">Action</th>
                                    <th className="p-2 text-left font-semibold">Chapitre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { action: "Créer un plan comptable personnalisé", chapter: 3 },
                                    { action: "Organiser vos documents et créer une adresse dédiée", chapter: 4 },
                                    { action: "Automatiser les flux bancaires", chapter: 5 },
                                    { action: "Centraliser les outils via un ERP comme Odoo", chapter: 5 }
                                ].map((step, i) => (
                                    <tr key={i} className="border-b border-blue-100">
                                        <td className="p-2 font-bold text-primary">{i + 1}</td>
                                        <td className="p-2 text-gray-700">{step.action}</td>
                                        <td className="p-2 text-blue-600 font-medium">Ch. {step.chapter}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quote */}
                <div className="result-item bg-gray-900 rounded-2xl p-8 text-center mb-8">
                    <p className="text-lg text-white italic">&quot;Une bonne comptabilité, ce n&apos;est pas plus de chiffres.&quot;</p>
                    <p className="text-secondary font-bold mt-2">Ce sont les bons chiffres, au bon moment.</p>
                </div>

                {/* CTAs */}
                <div className="result-item bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-center mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Prêt à passer à l&apos;action ?</h3>
                    <p className="text-white/70 mb-6">Téléchargez le guide complet ou prenez rendez-vous pour un audit personnalisé.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold px-6 py-3 rounded-xl transition-all">
                            📞 Prendre rendez-vous
                        </Link>
                        <Link href="/ressources" className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-3 rounded-xl transition-all">
                            📚 Voir nos autres guides
                        </Link>
                    </div>
                </div>

                {/* Social Proof / Recommendation loop (Point 8) */}
                <div className="result-item text-center mb-8">
                    {isSharedVisitor ? (
                        <p className="text-sm text-gray-500">
                            💬 <span className="font-medium">Beaucoup d&apos;entrepreneurs partagent ensuite leur diagnostic</span><br />
                            pour confronter leurs pratiques et progresser plus vite.
                        </p>
                    ) : (
                        <p className="text-sm text-gray-500">
                            💡 <span className="font-medium">Ce diagnostic est souvent partagé entre entrepreneurs</span><br />
                            pour comparer leur organisation et échanger de bonnes pratiques.
                        </p>
                    )}
                </div>
            </div>

            {/* ======================================= */}
            {/* SHARE WIDGET - DESKTOP (floating right) */}
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

                        {/* Title */}
                        <h4 className="text-lg font-bold text-gray-900 mb-2">💬 Un avis extérieur ?</h4>

                        {/* Main text */}
                        <p className="text-sm text-gray-600 mb-4">
                            Les entrepreneurs gagnent souvent à comparer leur organisation.<br /><br />
                            <span className="font-medium">Partage ton diagnostic</span> à un autre dirigeant pour avoir son avis ou l&apos;inviter à faire le test.
                        </p>

                        {/* Sub-text */}
                        <p className="text-xs text-gray-400 mb-4">
                            Le diagnostic est gratuit et prend moins de 2 minutes.
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
            {/* SHARE WIDGET - MOBILE (fixed bottom bar) */}
            {/* ======================================= */}
            {showShareWidget && (
                <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 safe-area-inset-bottom">
                    <div className="max-w-lg mx-auto">
                        {/* Compact text */}
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="font-bold text-gray-900 text-sm">💬 Un avis extérieur ?</p>
                                <p className="text-xs text-gray-500">Partage ton diagnostic à un autre entrepreneur.</p>
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
