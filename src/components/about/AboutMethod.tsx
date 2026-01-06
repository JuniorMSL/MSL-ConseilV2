"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const METHOD_STEPS = [
    { letter: "P", label: "Planifier", desc: "Analyser vos flux" },
    { letter: "I", label: "Installer", desc: "Configurer Odoo Finances sur mesure" },
    { letter: "L", label: "Libérer", desc: "Automatiser et sécuriser vos processus" },
    { letter: "O", label: "Observer", desc: "Mettre en place le contrôle de gestion" },
    { letter: "T", label: "Transmettre", desc: "Former vos équipes" },
    { letter: "E", label: "Évaluer", desc: "Optimiser en continu" },
    { letter: "R", label: "Résultats", desc: "Piloter grâce à des KPI clairs", highlight: true },
];

export default function AboutMethod() {
    const container = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered card reveal
            gsap.fromTo(".method-card-3d",
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 70%"
                    }
                }
            );

            // Title word split animation
            gsap.fromTo(".title-word",
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.05,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: ".method-title",
                        start: "top 80%"
                    }
                }
            );
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="w-full py-32 bg-white relative overflow-hidden">

            {/* Subtle Pattern Background */}
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Floating Orbs - More subtle on white */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Title with Word Split */}
                <div className="method-title text-center mb-20 overflow-hidden">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 text-primary">
                        <span className="title-word inline-block">Notre</span>{" "}
                        <span className="title-word inline-block">méthode</span>{" "}
                        <span className="title-word inline-block">:</span>{" "}
                        <span className="title-word inline-block text-secondary">P</span>
                        <span className="title-word inline-block text-secondary">.</span>
                        <span className="title-word inline-block text-secondary">I</span>
                        <span className="title-word inline-block text-secondary">.</span>
                        <span className="title-word inline-block text-secondary">L</span>
                        <span className="title-word inline-block text-secondary">.</span>
                        <span className="title-word inline-block text-secondary">O</span>
                        <span className="title-word inline-block text-secondary">.</span>
                        <span className="title-word inline-block text-secondary">T</span>
                        <span className="title-word inline-block text-secondary">.</span>
                        <span className="title-word inline-block text-secondary">E</span>
                        <span className="title-word inline-block text-secondary">.</span>
                        <span className="title-word inline-block text-secondary">R</span>
                        <span className="title-word inline-block text-secondary">.</span>
                    </h2>
                    <p className="text-gray-500 font-light text-lg max-w-xl mx-auto">
                        Une méthode conçue pour structurer, automatiser et clarifier vos flux financiers.
                    </p>
                </div>

                {/* Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
                    {METHOD_STEPS.map((step, i) => (
                        <div
                            key={i}
                            className={`method-card-3d group relative ${step.highlight ? 'lg:col-span-2 lg:row-span-1' : ''}`}
                        >
                            <div className={`relative h-full p-8 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl group-hover:-translate-y-2 ${step.highlight ? 'bg-primary text-white' : 'bg-gray-50 border border-gray-100 hover:border-primary/20'}`}>

                                {/* Decorative Blur on Highlight */}
                                {step.highlight && (
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/30 rounded-full blur-3xl" />
                                )}

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className={`text-6xl font-bold font-serif ${step.highlight ? 'text-white' : 'text-secondary'}`}>
                                            {step.letter}
                                        </span>
                                    </div>

                                    <h3 className={`text-xl font-bold mb-2 ${step.highlight ? 'text-white' : 'text-gray-900'}`}>{step.label}</h3>
                                    <p className={`text-sm flex-grow ${step.highlight ? 'text-white/80' : 'text-gray-500'}`}>{step.desc}</p>

                                    {/* Bottom Line */}
                                    <div className={`mt-6 h-px w-full relative overflow-hidden ${step.highlight ? 'bg-white/20' : 'bg-gray-200'}`}>
                                        <div className={`absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-500 ${step.highlight ? 'bg-white' : 'bg-secondary'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Line */}
                <div className="mt-16 text-center">
                    <p className="text-xl font-bold uppercase tracking-widest text-primary">
                        Une progression <span className="text-black">simple</span>, <span className="text-black">humaine</span>, <span className="text-black">mesurable</span>.
                    </p>
                </div>
            </div>
        </section>
    );
}
