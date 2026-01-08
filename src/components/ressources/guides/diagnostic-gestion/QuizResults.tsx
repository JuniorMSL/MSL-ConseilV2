"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { UserData } from "./UserForm";
import { QUIZ_BLOCKS } from "./Quiz";

interface QuizResultsProps {
    userData: UserData;
    answers: Record<string, number>;
}

const MATURITY_LEVELS = [
    { min: 0, max: 7, level: "🔴 Structuration absente", color: "red", desc: "Votre comptabilité est un frein.", recommendation: "Commencez par structurer les bases avec notre guide → Chapitres 1 à 3" },
    { min: 8, max: 14, level: "🟠 Structuration en cours", color: "orange", desc: "Bonne base, mais pas encore optimisée.", recommendation: "Vous avez besoin d'une meilleure organisation et d'automatisations → Chapitres 3 à 5" },
    { min: 15, max: 20, level: "🟢 Comptabilité optimisée", color: "green", desc: "Comptabilité bien structurée !", recommendation: "Bravo ! Vous êtes prêt pour l'automatisation et le pilotage avancé avec Odoo" }
];

export default function QuizResults({ userData, answers }: QuizResultsProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate score
    const score = Object.values(answers).reduce((acc, val) => acc + val, 0);
    const scoreMax = 17; // Max possible (some questions give 0.5)
    const scorePercent = Math.round((score / scoreMax) * 100);

    const maturity = MATURITY_LEVELS.find(m => score >= m.min && score <= m.max) || MATURITY_LEVELS[0];

    // Get all questions flat
    const allQuestions = QUIZ_BLOCKS.flatMap(b => b.questions.map(q => ({ ...q, blockTitle: b.title, blockIcon: b.icon })));

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

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-gray-50">
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
                                                <p className="text-sm text-gray-500 mb-1 italic">"{fb.question}"</p>
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
                    <h3 className="font-bold text-gray-900 mb-4">📝 Plan d'action recommandé</h3>
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
                    <p className="text-lg text-white italic">"Une bonne comptabilité, ce n'est pas plus de chiffres."</p>
                    <p className="text-secondary font-bold mt-2">Ce sont les bons chiffres, au bon moment.</p>
                </div>

                {/* CTAs */}
                <div className="result-item bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-center">
                    <h3 className="text-xl font-bold text-white mb-4">Prêt à passer à l'action ?</h3>
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
            </div>
        </div>
    );
}
