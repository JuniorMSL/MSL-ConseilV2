"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FORMAT_FEATURES = [
    {
        title: "Hybride & Flexible",
        description: "En présentiel dans vos locaux ou en distanciel interactif, sans compromis sur la qualité.",
        tag: "Localisation"
    },
    {
        title: "Focus & Intimité",
        description: "Groupes restreints (max 8 pers) pour garantir une interaction directe et un suivi chirurgical.",
        tag: "Audience"
    },
    {
        title: "Real Data First",
        description: "Nous travaillons exclusivement sur votre environnement Odoo et vos propres flux financiers.",
        tag: "Méthode"
    },
    {
        title: "Learning by Doing",
        description: "80% de pratique. Scénarios réels, résolutions de problèmes et mises en situation critiques.",
        tag: "Action"
    },
    {
        title: "L'après Bootcamp",
        description: "Un support post-formation inclus pour valider la mise en production de vos acquis.",
        tag: "Pérennité"
    },
    {
        title: "Certification MSL",
        description: "Attestation de compétences validée par nos experts, reconnue pour son exigence métier.",
        tag: "Validation"
    },
];

export default function BootcampFormat() {
    const container = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Animation du titre principal (révélation par le bas)
        gsap.from(".reveal-up", {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: "expo.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
            }
        });

        // Stagger sur les cartes de features
        gsap.fromTo(".feature-card",
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".feature-grid",
                    start: "top 70%",
                }
            }
        );

        // Effet de parallaxe sur l'image de gauche
        gsap.to(".parallax-img", {
            scale: 1.2,
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }, { scope: container });

    return (
        <section ref={container} className="relative w-full bg-[#014730] overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-10">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-serif font-black text-white/[0.02] uppercase select-none">
                    Format
                </span>
            </div>

            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* Left Panel: Visual Identity (Sticky) */}
                <div className="relative w-full lg:w-[45%] h-[60vh] lg:h-screen overflow-hidden border-r border-white/5">
                    <div className="parallax-img absolute inset-0 w-full h-full">
                        <Image
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
                            alt="Atmosphère MSL Conseils"
                            fill
                            className="object-cover grayscale mix-blend-overlay opacity-50"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#014730] via-transparent to-transparent lg:hidden" />
                        <div className="absolute inset-0 bg-[#014730]/60 mix-blend-multiply" />
                    </div>

                    {/* Overlay Text */}
                    <div className="absolute bottom-12 left-8 lg:bottom-24 lg:left-16 z-20">
                        <div className="overflow-hidden mb-4">
                            <span className="reveal-up block text-secondary font-bold tracking-[0.4em] uppercase text-[10px]">
                                Ingénierie Pédagogique
                            </span>
                        </div>
                        <h2 className="reveal-up text-5xl md:text-7xl font-serif text-white leading-[0.85] mb-8">
                            Un cadre <br />
                            <span className="italic font-light text-secondary">d'excellence.</span>
                        </h2>
                        <div className="reveal-up w-24 h-[1px] bg-secondary" />
                    </div>
                </div>

                {/* Right Panel: Content Flow */}
                <div className="w-full lg:w-[55%] px-6 md:px-16 lg:px-24 py-24 lg:py-40">

                    {/* Header Text */}
                    <div className="max-w-xl mb-24">
                        <p className="text-2xl md:text-3xl font-serif text-white/90 leading-tight italic">
                            "Le savoir ne vaut que s'il est <span className="text-secondary not-italic font-sans font-bold">actionnable</span>."
                        </p>
                        <p className="mt-8 text-white/50 leading-relaxed font-light">
                            Nous avons banni les longs discours théoriques. Nos bootcamps sont des laboratoires où l'on construit, on teste et on valide en temps réel.
                        </p>
                    </div>

                    {/* Feature Grid with Modern Bento-inspired layout */}
                    <div className="feature-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-24">
                        {FORMAT_FEATURES.map((feature, index) => (
                            <div
                                key={index}
                                className="feature-card group relative p-8 bg-[#013b28] border border-white/5 rounded-sm hover:bg-[#013322] transition-all duration-500"
                            >
                                <span className="text-[9px] font-mono text-secondary/50 uppercase tracking-widest mb-6 block">
                                    // {feature.tag}
                                </span>
                                <h4 className="text-xl font-serif text-white mb-4 group-hover:text-secondary transition-colors">
                                    {feature.title}
                                </h4>
                                <p className="text-white/50 text-sm leading-relaxed font-light">
                                    {feature.description}
                                </p>

                                {/* Subtle indicator line */}
                                <div className="absolute bottom-0 left-0 h-[1px] bg-secondary w-0 group-hover:w-full transition-all duration-700" />
                            </div>
                        ))}
                    </div>

                    {/* High-Standing Callout Card */}
                    <div className="feature-card relative overflow-hidden bg-[#0A0A0A] p-10 md:p-14 rounded-sm border border-secondary/20">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 rounded-full blur-3xl -mr-16 -mt-16" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                            <div className="shrink-0 w-20 h-20 rounded-full border border-secondary/30 flex items-center justify-center text-secondary">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="text-white font-serif text-2xl mb-2">Souveraineté Opérationnelle</h5>
                                <p className="text-white/60 font-light leading-relaxed">
                                    Notre promesse est simple : à la fin du parcours, vos équipes possèdent non seulement l'outil, mais la <span className="text-white font-bold italic">logique métier</span> qui le rend puissant.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}