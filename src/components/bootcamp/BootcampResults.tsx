"use client";

import { useRef } from "react";
import NextImage from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RESULTS = [
    {
        title: "Équipes Autonomes",
        text: "Des collaborateurs capables d'utiliser Odoo de manière structurée et agile, sans dépendance constante.",
        suffix: "01"
    },
    {
        title: "Processus Sécurisés",
        text: "Des flux financiers clairs, cohérents et protégés contre les erreurs de saisie.",
        suffix: "02"
    },
    {
        title: "Zéro Ressaisie",
        text: "Élimination des tâches manuelles répétitives pour se concentrer sur l'analyse.",
        suffix: "03"
    },
    {
        title: "Tableaux de Bord",
        text: "Des indicateurs de performance compris, maîtrisés et réellement exploités au quotidien.",
        suffix: "04"
    },
    {
        title: "Pilotage Stratégique",
        text: "Une qualité de décision supérieure grâce à une donnée fiable et disponible en temps réel.",
        suffix: "05"
    },
];

export default function BootcampResults() {
    const container = useRef<HTMLElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Animation de la barre de progression latérale
        gsap.fromTo(progressRef.current, 
            { scaleY: 0 }, 
            { 
                scaleY: 1, 
                ease: "none", 
                scrollTrigger: {
                    trigger: ".results-list",
                    start: "top 60%",
                    end: "bottom 60%",
                    scrub: true
                } 
            }
        );

        // Apparition des items avec un effet de focus
        const items = gsap.utils.toArray(".result-item");
        items.forEach((item: any) => {
            gsap.from(item, {
                opacity: 0.2,
                x: 20,
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: true,
                }
            });
        });

        // Animation de l'image (Parallaxe + Reveal)
        gsap.from(".visual-container", {
            clipPath: "inset(10% 10% 10% 10% round 20px)",
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
                trigger: ".visual-container",
                start: "top 80%",
            }
        });

    }, { scope: container });

    return (
        <section ref={container} className="relative w-full bg-[#FCFCFC] py-32 lg:py-48 px-6 md:px-12 overflow-hidden">
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50/50 -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    
                    {/* Left Column: Fixed Content Area */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="w-8 h-px bg-secondary" />
                            <span className="text-secondary font-bold tracking-[0.3em] uppercase text-[10px]">
                                Impact & ROI
                            </span>
                        </div>
                        
                        <h2 className="text-5xl md:text-7xl font-serif text-primary leading-[0.9] mb-12">
                            L'issue du <br />
                            <span className="italic font-light">changement.</span>
                        </h2>

                        <div className="visual-container relative w-full aspect-square rounded-2xl overflow-hidden shadow-3xl">
                            <NextImage
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                                alt="Data Analysis"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                            
                            {/* Floating Stats Badge */}
                            <div className="absolute bottom-8 right-8 bg-white p-6 shadow-2xl rounded-sm group hover:-translate-y-2 transition-transform duration-500">
                                <p className="text-primary/50 text-[10px] uppercase font-bold tracking-widest mb-1">Impact Direct</p>
                                <p className="text-3xl font-serif font-bold text-primary">Croissance <span className="text-secondary font-sans">+</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Dynamic Results List */}
                    <div className="lg:col-span-7 relative">
                        {/* Progress Line */}
                        <div className="absolute left-0 top-0 w-[1px] h-full bg-gray-200">
                            <div ref={progressRef} className="absolute top-0 left-0 w-full h-full bg-secondary origin-top" />
                        </div>

                        <div className="results-list space-y-24 pl-12 md:pl-20">
                            {RESULTS.map((result, index) => (
                                <div key={index} className="result-item relative group">
                                    {/* Numbering */}
                                    <span className="absolute -left-[4.5rem] md:-left-[6.5rem] top-0 text-5xl md:text-6xl font-serif text-gray-100 group-hover:text-secondary/20 transition-colors duration-500 font-bold">
                                        {result.suffix}
                                    </span>
                                    
                                    <h3 className="text-2xl md:text-3xl font-serif text-primary mb-6 group-hover:text-secondary transition-colors duration-300">
                                        {result.title}
                                    </h3>
                                    
                                    <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-xl">
                                        {result.text}
                                    </p>

                                    {/* Subtle hover line */}
                                    <div className="mt-8 w-0 group-hover:w-full h-px bg-gradient-to-r from-secondary/30 to-transparent transition-all duration-700" />
                                </div>
                            ))}
                        </div>

                        {/* Callout: The Bottom Line */}
                        <div className="mt-32 p-10 bg-primary rounded-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 rounded-full -mr-16 -mt-16" />
                            
                            <div className="relative z-10">
                                <p className="text-white/60 uppercase tracking-[0.2em] text-[10px] font-bold mb-6 italic">
                                    Engagement MSL Conseils
                                </p>
                                <p className="text-2xl md:text-3xl font-serif text-white leading-tight italic">
                                    "Le bénéfice n'est pas théorique : il est <span className="text-secondary not-italic font-sans font-bold">opérationnel</span> et immédiatement <span className="text-secondary not-italic font-sans font-bold">mesurable</span> sur vos flux."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}