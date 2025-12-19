"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    {
        id: 1,
        value: "20",
        suffix: "+",
        label: "Entreprises accompagnées",
        subtext: "Accompagnement sur-mesure",
        colSpan: "col-span-1 md:col-span-2",
    },
    {
        id: 2,
        value: "40",
        suffix: "%",
        label: "Moins de tâches manuelles",
        subtext: "Automatisation intelligente",
        colSpan: "col-span-1 md:col-span-1",
    },
    {
        id: 3,
        value: "30",
        suffix: "%",
        label: "Clôture plus rapide",
        subtext: "Gain de temps mensuel",
        colSpan: "col-span-1 md:col-span-1",
    },
    {
        id: 4,
        value: "95",
        suffix: "%",
        label: "Satisfaction client",
        subtext: "Relation confiance durable",
        colSpan: "col-span-1 md:col-span-2",
    }
];

export default function ResultsSection() {
    const container = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 75%",
            }
        });

        // Title Reveal
        tl.fromTo(titleRef.current,
            { y: 100, opacity: 0, rotateX: -20 },
            { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: "power4.out" }
        );

        // Cards Reveal
        gsap.fromTo(".stat-item",
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 60%"
                }
            }
        );

    }, { scope: container });

    return (
        <section ref={container} className="relative w-full bg-primary text-white py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5">

            {/* Background Texture - Noise or subtle gradient */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-secondary/40 via-transparent to-transparent" />

            <div className="max-w-7xl mx-auto">

                {/* Editorial Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="overflow-hidden">
                        <h2 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.9]">
                            L'impact <br />
                            <span className="text-secondary italic">mesurable.</span>
                        </h2>
                    </div>
                    <div className="max-w-md pb-2 border-b border-white/20">
                        <p className="text-white/60 text-lg font-light leading-relaxed">
                            Des résultats concrets pour nos partenaires industriels, services et commerces.
                            La performance ne se devine pas, elle se prouve.
                        </p>
                    </div>
                </div>

                {/* Asymmetrical Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                    {STATS.map((stat, index) => (
                        <div
                            key={stat.id}
                            className={`stat-item group relative bg-primary p-12 flex flex-col justify-between min-h-[320px] hover:bg-[#025239] transition-colors duration-500 cursor-default ${stat.colSpan}`}
                        >
                            {/* Top Label */}
                            <div className="flex justify-between items-start border-b border-white/10 pb-6 mb-auto">
                                <span className="text-sm font-bold tracking-widest uppercase text-secondary/80 group-hover:text-secondary transition-colors">
                                    0{index + 1}
                                </span>
                                <span className="text-xs text-white/40 font-mono group-hover:text-white/60 transition-colors">
                                    KPI TRACKING
                                </span>
                            </div>

                            {/* Center Value */}
                            <div className="self-center my-8 relative">
                                <h3 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                    {stat.value}<span className="text-4xl md:text-5xl text-secondary align-top font-serif italic ml-1">{stat.suffix}</span>
                                </h3>
                            </div>

                            {/* Bottom Details */}
                            <div className="mt-auto transform translate-y-4 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                                <h4 className="text-2xl font-serif text-white mb-2">{stat.label}</h4>
                                <p className="text-white/50 font-light text-sm">{stat.subtext}</p>
                            </div>

                            {/* Corner Accent on Hover */}
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    ))}
                </div>

            </div>

            {/* Exemples Concrets Section */}
            <div className="max-w-7xl mx-auto mt-32">
                <div className="mb-12">
                    <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">
                        Études de cas
                    </span>
                    <h3 className="text-4xl md:text-5xl font-serif text-white">
                        Exemples <span className="text-secondary italic">Concrets</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Case 1 */}
                    <div className="bg-white/5 border border-white/10 p-0 rounded-xl hover:bg-white/10 transition-all duration-500 overflow-hidden group">
                        <div className="relative h-48 w-full overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1470"
                                alt="Industrie"
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
                        </div>
                        <div className="p-8">
                            <div className="h-2 w-12 bg-secondary mb-6" />
                            <h4 className="text-xl font-bold text-white mb-4">PME industrielle (45 employés)</h4>
                            <ul className="space-y-3 text-white/70 text-sm leading-relaxed">
                                <li className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                    42% de tâches manuelles supprimées
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                    Clôture mensuelle passée de 12 jours à 7 jours
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Case 2 - Alternate Style */}
                    <div className="bg-secondary p-0 rounded-xl shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden group">
                        <div className="relative h-48 w-full overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2664"
                                alt="Services B2B"
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                        </div>
                        <div className="p-8">
                            <div className="h-2 w-12 bg-primary mb-6" />
                            <h4 className="text-xl font-bold text-primary mb-4">Société de services B2B</h4>
                            <ul className="space-y-3 text-primary/80 text-sm leading-relaxed font-medium">
                                <li className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                    Mise en place Odoo Finance + formation équipe
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                    Direction financière partielle : marges maîtrisées en 3 mois
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Case 3 */}
                    <div className="bg-white/5 border border-white/10 p-0 rounded-xl hover:bg-white/10 transition-all duration-500 overflow-hidden group">
                        <div className="relative h-48 w-full overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=1470"
                                alt="Commerce"
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
                        </div>
                        <div className="p-8">
                            <div className="h-2 w-12 bg-secondary mb-6" />
                            <h4 className="text-xl font-bold text-white mb-4">Commerce multicanal</h4>
                            <ul className="space-y-3 text-white/70 text-sm leading-relaxed">
                                <li className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                    Automatisation des flux achats/ventes
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                    Tableaux de bord : visibilité quotidienne sur la trésorerie
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </section >
    );
}
