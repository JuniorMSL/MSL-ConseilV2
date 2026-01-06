"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
    {
        letter: "P",
        title: "Planifier",
        subtitle: "Cartographier et clarifier vos flux",
        desc: "Planifier, c’est créer la base solide sur laquelle tout le reste va tenir.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
        before: ["Données dispersées", "Difficulté à trouver vos chiffres", "Décisions lentes"],
        after: ["Tous vos flux centralisés", "Vision immédiate et fiable", "Décisions rapides"],
        actions: ["Ateliers avec vos équipes", "Cartographie complète de vos flux", "Identification des points à automatiser"],
        livrable: "Rapport d’analyse + recommandations",
        duree: "1 à 2 semaines"
    },
    {
        letter: "I",
        title: "Installer",
        subtitle: "Un Odoo Finances configuré pour VOUS",
        desc: "Installer, c’est garantir que votre système ne vous trahira jamais.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        before: ["Modules mal paramétrés", "Données incohérentes", "Tâches manuelles"],
        after: ["Odoo parfaitement ajusté", "Données fiables et centralisées", "Processus sécurisés"],
        actions: ["Paramétrage des modules financiers", "Tests, validation, fiabilisation", "Configuration intuitive"],
        livrable: "Odoo prêt à l’emploi",
        duree: "2 à 4 semaines"
    },
    {
        letter: "L",
        title: "Libérer",
        subtitle: "Automatiser et sécuriser vos processus",
        desc: "Libérer, c’est faire disparaître les erreurs pour que tout roule tout seul.",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop",
        before: ["Tâches répétitives", "Erreurs fréquentes", "Stress constant"],
        after: ["Processus automatisés", "Réduction massive des erreurs", "Maîtrise totale"],
        actions: ["Automatisation des tâches clés", "Mise en place des contrôles", "Création de dashboards"],
        livrable: "Processus automatisés + dashboards",
        duree: "2 semaines"
    },
    {
        letter: "O",
        title: "Observer",
        subtitle: "Contrôle de gestion & DAF à temps partiel",
        desc: "Observer, c’est transformer les données en décisions.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
        before: ["Manque de vision", "Décisions basées sur des suppositions"],
        after: ["Indicateurs clairs", "Décisions stratégiques chiffrées"],
        actions: ["Contrôle de gestion intégré", "DAF à temps partiel", "Tableaux de bord stratégiques"],
        livrable: "Dashboards + suivi expert",
        duree: "1 à 2 semaines par cycle"
    },
    {
        letter: "T",
        title: "Transmettre",
        subtitle: "Former et rendre vos équipes autonomes",
        desc: "Transmettre, c’est s’assurer que vous savez piloter sans nous.",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
        before: ["Équipes bloquées par la tech", "Retards, erreurs, dépendance"],
        after: ["Équipes efficaces & autonomes", "Maîtrise complète d’Odoo"],
        actions: ["Formation pratique", "Guides & documentation", "Coaching pour adoption"],
        livrable: "Formation + documentation",
        duree: "1 à 2 semaines"
    },
    {
        letter: "E",
        title: "Évaluer",
        subtitle: "Optimiser et ajuster en continu",
        desc: "Évaluer, c’est éviter la stagnation et accompagner la croissance.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        before: ["Processus obsolètes", "Difficulté à s’adapter"],
        after: ["Processus optimisés", "Anticipation des besoins"],
        actions: ["Analyse continue", "Ajustements réguliers", "Support évolutif"],
        livrable: "Plan d’optimisation + suivi",
        duree: "Trimestriel"
    },
    {
        letter: "R",
        title: "Résultats",
        subtitle: "Mesurer, piloter, décider",
        desc: "Résultats, c’est l’objectif final : maîtriser, piloter, grandir.",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
        before: ["Impossible de mesurer l’impact", "Perte de contrôle"],
        after: ["KPI clairs", "Pilotage réel", "Décisions sereines"],
        actions: ["Mise en place des KPI", "Reporting actionnable", "Conseils stratégiques"],
        livrable: "Dashboards KPI + recommandations",
        duree: "Continu"
    }
];

export default function MethodeSteps() {
    const container = useRef<HTMLElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Image switching logic
            const steps = gsap.utils.toArray<HTMLElement>(".step-content");
            const images = gsap.utils.toArray<HTMLElement>(".step-image");

            steps.forEach((step, i) => {
                ScrollTrigger.create({
                    trigger: step,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => setActiveImage(i),
                    onEnterBack: () => setActiveImage(i),
                });
            });

            function setActiveImage(index: number) {
                images.forEach((img, i) => {
                    if (i === index) {
                        gsap.to(img, { opacity: 1, scale: 1, zIndex: 10, duration: 0.5 });
                    } else {
                        gsap.to(img, { opacity: 0, scale: 1.1, zIndex: 1, duration: 0.5 });
                    }
                });
            }

        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="w-full bg-white relative">
            <div className="flex flex-col lg:flex-row">

                {/* Left Column - Sticky Image */}
                <div ref={leftColRef} className="hidden lg:block lg:w-1/2 h-screen sticky top-0 overflow-hidden bg-[#001F15]">
                    {STEPS.map((step, i) => (
                        <div key={i} className="step-image absolute inset-0 w-full h-full opacity-0 transition-opacity">
                            <Image
                                src={step.image}
                                alt={step.title}
                                fill
                                className="object-cover opacity-60"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#001F15] via-transparent to-transparent opacity-80" />

                            {/* Big Letter */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[20rem] font-serif font-bold text-secondary/80 select-none mix-blend-overlay">
                                    {step.letter}
                                </span>
                            </div>

                            {/* Mobile Title Overlay (visible on desktop actually) */}
                            <div className="absolute bottom-12 left-12 right-12">
                                <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">
                                    Étape {i + 1} / {STEPS.length}
                                </span>
                                <h3 className="text-5xl font-serif text-white">{step.title}</h3>
                            </div>
                        </div>
                    ))}
                    {/* Default State (First Image Initial) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-full h-full bg-[#001F15]" />
                    </div>
                </div>

                {/* Right Column - Scrollable Content */}
                <div ref={rightColRef} className="lg:w-1/2 bg-gray-50">
                    {STEPS.map((step, i) => (
                        <div key={i} className="step-content min-h-screen flex flex-col justify-center px-6 md:px-16 py-24 border-b border-gray-200 lg:border-none">

                            {/* Mobile Image (Visible only on mobile) */}
                            <div className="lg:hidden w-full h-64 relative rounded-2xl overflow-hidden mb-8 shadow-lg">
                                <Image src={step.image} alt={step.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
                                <span className="absolute bottom-4 left-4 text-6xl font-serif font-bold text-white/30">{step.letter}</span>
                            </div>

                            <span className="text-secondary font-bold uppercase tracking-widest text-xs mb-4">
                                {step.letter} — {step.title}
                            </span>

                            <h3 className="text-3xl md:text-4xl font-serif text-primary mb-4 leading-tight">
                                {step.subtitle}
                            </h3>

                            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                                {step.desc}
                            </p>

                            {/* Bento Grid Mini for Details */}
                            <div className="grid grid-cols-1 gap-4 mb-8">

                                {/* Avant / Après Row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm">
                                        <h4 className="text-xs font-bold uppercase text-red-500 mb-3">Avant</h4>
                                        <ul className="space-y-2">
                                            {step.before.map((item, j) => (
                                                <li key={j} className="text-xs md:text-sm text-gray-500 leading-tight">❌ {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl border border-secondary/20 shadow-sm">
                                        <h4 className="text-xs font-bold uppercase text-secondary mb-3">Après</h4>
                                        <ul className="space-y-2">
                                            {step.after.map((item, j) => (
                                                <li key={j} className="text-xs md:text-sm text-gray-800 font-medium leading-tight">✅ {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="bg-[#001F15] p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[40px] translate-x-10 -translate-y-10" />
                                    <h4 className="text-xs font-bold uppercase text-secondary mb-4 relative z-10">Nos actions</h4>
                                    <ul className="space-y-3 relative z-10">
                                        {step.actions.map((act, k) => (
                                            <li key={k} className="flex items-center gap-3 text-sm md:text-base font-light">
                                                <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                                {act}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>

                            {/* Footer info */}
                            <div className="flex items-center gap-6 text-sm text-gray-400">
                                <div>
                                    <span className="block text-xs uppercase font-bold text-gray-300">Livrable</span>
                                    <span className="text-gray-600">{step.livrable}</span>
                                </div>
                                <div className="w-px h-8 bg-gray-200" />
                                <div>
                                    <span className="block text-xs uppercase font-bold text-gray-300">Durée</span>
                                    <span className="text-gray-600">{step.duree}</span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
