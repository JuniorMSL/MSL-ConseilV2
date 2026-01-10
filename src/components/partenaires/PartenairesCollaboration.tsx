"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLLABORATION_POINTS = [
    {
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        title: "Respect total de votre relation client",
        description: "Nous intervenons en coulisse, vous restez le point de contact principal."
    },
    {
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
        ),
        title: "Positionnement non concurrent",
        description: "Nous ne faisons pas d'intégration, nous renforçons votre expertise métier."
    },
    {
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        ),
        title: "Logique de partenariat long terme",
        description: "Une relation de confiance qui se construit projet après projet."
    },
    {
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        title: "Intervention ponctuelle ou récurrente",
        description: "Flexibilité totale selon vos besoins et le profil de vos projets."
    }
];

export default function PartenairesCollaboration() {
    const container = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".collab-item",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 70%"
                    }
                }
            );
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative w-full py-32 px-6 bg-gray-50 overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <span className="collab-item flex items-center justify-center gap-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        Collaboration
                    </span>
                    <h2 className="collab-item text-4xl md:text-6xl font-serif text-primary mb-6">
                        Une collaboration pensée <br />
                        <span className="italic text-secondary">pour les intégrateurs</span>
                    </h2>
                    <p className="collab-item text-xl text-gray-500 max-w-2xl mx-auto">
                        Nous travaillons en <strong className="text-primary">marque blanche</strong> ou en <strong className="text-primary">co-branding</strong>, selon votre préférence.
                    </p>
                </div>

                {/* Collaboration Points Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {COLLABORATION_POINTS.map((point, i) => (
                        <div
                            key={i}
                            className="collab-item group p-8 rounded-[1.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-secondary/20 transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                                {point.icon}
                            </div>
                            <h3 className="text-xl font-serif text-primary mb-3">{point.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{point.description}</p>
                        </div>
                    ))}
                </div>

                {/* Key Messages */}
                <div className="collab-item grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[1.5rem] bg-primary text-white flex items-center gap-4">
                        <svg className="w-8 h-8 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <p className="text-2xl font-serif leading-relaxed">
                            <span className="text-secondary">Vous restez l'intégrateur.</span>
                        </p>
                    </div>
                    <div className="p-8 rounded-[1.5rem] bg-secondary text-primary flex items-center gap-4">
                        <svg className="w-8 h-8 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <p className="text-2xl font-serif leading-relaxed">
                            <span className="font-bold">Nous sécurisons la couche Finance.</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
