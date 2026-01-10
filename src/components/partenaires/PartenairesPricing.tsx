"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TARIF_DETAILS = [
    "Facturation transparente du temps réel",
    "Déplacements sur site facturés à 50% du tarif horaire"
];

const TARIF_REFLECTS = [
    "Une relation B2B récurrente",
    "L'absence de prospection client",
    "Un rôle de back-office stratégique",
    "Une création de valeur directe pour vos projets"
];

export default function PartenairesPricing() {
    const container = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".pricing-content",
                { y: 50, opacity: 0, scale: 0.98 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
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
        <section ref={container} className="relative w-full py-32 px-6 bg-[#050505] text-white overflow-hidden">
            {/* Decorative Blobs */}
            <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/30 rounded-full blur-[120px]" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="pricing-content flex items-center justify-center gap-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Conditions & cadre
                    </span>
                    <h2 className="pricing-content text-4xl md:text-6xl font-serif mb-6">
                        Tarif partenaire <span className="italic text-secondary">intégrateur</span>
                    </h2>
                </div>

                {/* Pricing Card */}
                <div className="pricing-content max-w-2xl mx-auto">
                    <div className="relative p-12 rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-primary/90 border border-white/10 shadow-2xl overflow-hidden">

                        {/* Decorative Circle */}
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-secondary/20 rounded-full blur-[60px]" />

                        <div className="relative z-10">
                            {/* Main Price */}
                            <div className="text-center mb-10">
                                <span className="text-8xl md:text-9xl font-serif font-bold text-white">110€</span>
                                <p className="text-xl text-white/70 mt-2">HTVA / heure</p>
                            </div>

                            {/* Details */}
                            <div className="space-y-4 mb-10">
                                {TARIF_DETAILS.map((detail, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                        <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-white/80">{detail}</span>
                                    </div>
                                ))}
                            </div>

                            {/* What it reflects */}
                            <div className="pt-8 border-t border-white/10">
                                <p className="flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-widest mb-6">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Ce tarif reflète :
                                </p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {TARIF_REFLECTS.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-white/70">
                                            <span className="w-2 h-2 rounded-full bg-secondary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Note about travel */}
                    <p className="pricing-content text-center text-white/50 text-sm mt-8">
                        * Couverture du temps de trajet et de l'indisponibilité
                    </p>
                </div>
            </div>
        </section>
    );
}
