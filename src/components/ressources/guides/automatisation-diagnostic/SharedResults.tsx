"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface SharedResultsProps {
    score: number;
    level: string;
    fromName?: string;
    onStartDiagnostic: () => void;
    onReadGuide: () => void;
}

const LEVELS_INFO: Record<string, { color: string; emoji: string; description: string }> = {
    "Fragile": { color: "red", emoji: "🔴", description: "Automatiser maintenant serait risqué" },
    "Intermédiaire": { color: "yellow", emoji: "🟡", description: "Potentiel réel mais structuration nécessaire" },
    "Solide": { color: "green", emoji: "🟢", description: "Organisation prête à automatiser" },
    "Avancé": { color: "blue", emoji: "🔵", description: "Automatisation stratégique possible" },
};

export default function SharedResults({ score, level, fromName, onStartDiagnostic, onReadGuide }: SharedResultsProps) {
    const containerRef = useRef<HTMLElement>(null);
    const levelInfo = LEVELS_INFO[level] || LEVELS_INFO["Intermédiaire"];

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(".shared-badge",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        )
            .fromTo(".shared-score",
                { scale: 0.5, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
                "-=0.3"
            )
            .fromTo(".shared-content > *",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
                "-=0.4"
            );
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="w-full min-h-screen flex items-center justify-center py-24 px-6"
            style={{
                background: "linear-gradient(135deg, #012a1e 0%, #014730 50%, #016742 100%)"
            }}
        >
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto text-center">
                {/* Badge */}
                <div className="shared-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
                    <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    <span className="text-white/90 text-sm font-medium tracking-wide">
                        Résultat partagé
                    </span>
                </div>

                {/* Shared by message */}
                {fromName && (
                    <p className="shared-content text-white/60 text-lg mb-4">
                        <span className="text-secondary font-bold">{fromName}</span> a partagé son diagnostic avec vous
                    </p>
                )}

                {/* Score display */}
                <div className="shared-score bg-white/10 backdrop-blur-sm rounded-3xl p-10 mb-8 border border-white/10">
                    <p className="text-white/60 text-sm uppercase tracking-widest mb-4">
                        {fromName ? `Score de ${fromName}` : "Score obtenu"}
                    </p>

                    <div className="flex justify-center items-baseline gap-2 mb-4">
                        <span className="text-7xl md:text-8xl font-serif font-bold text-white">{score}</span>
                        <span className="text-3xl text-white/40">/ 48</span>
                    </div>

                    {/* Level Badge */}
                    <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-bold ${levelInfo.color === 'red' ? 'bg-red-500/20 text-red-300' :
                            levelInfo.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-300' :
                                levelInfo.color === 'green' ? 'bg-green-500/20 text-green-300' :
                                    'bg-blue-500/20 text-blue-300'
                        }`}>
                        <span>{levelInfo.emoji}</span>
                        <span>Profil {level}</span>
                    </div>

                    <p className="text-white/50 text-sm mt-4">{levelInfo.description}</p>
                </div>

                {/* Call to action */}
                <div className="shared-content space-y-6">
                    <h2 className="text-3xl md:text-4xl font-serif text-white">
                        Et vous, <span className="text-secondary">êtes-vous prêt</span> à automatiser ?
                    </h2>

                    <p className="text-white/70 text-lg max-w-lg mx-auto">
                        Faites votre propre diagnostic pour comparer votre niveau de maturité
                        et identifier vos priorités d&apos;action.
                    </p>

                    {/* Benefits */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                        {[
                            { icon: "⏱️", text: "5-7 min" },
                            { icon: "🎯", text: "24 questions" },
                            { icon: "🔒", text: "100% gratuit" },
                            { icon: "📊", text: "Résultat immédiat" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                                <span className="text-xl block mb-1">{item.icon}</span>
                                <span className="text-xs text-white/60">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={onStartDiagnostic}
                            className="px-10 py-5 bg-secondary text-primary rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors duration-300 shadow-xl hover:scale-105"
                        >
                            🧭 Faire mon diagnostic
                        </button>
                        <button
                            onClick={onReadGuide}
                            className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/10 transition-colors duration-300"
                        >
                            Lire le guide d&apos;abord
                        </button>
                    </div>

                    {/* Social proof */}
                    <p className="text-white/40 text-sm mt-8 italic">
                        &quot;Les diagnostics les plus utiles sont souvent ceux qui déclenchent une discussion.&quot;
                    </p>
                </div>
            </div>
        </section>
    );
}
