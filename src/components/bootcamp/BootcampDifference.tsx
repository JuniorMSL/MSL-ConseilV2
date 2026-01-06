"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WHAT_WE_DONT = [
    "Nous ne formons pas pour former",
    "Nous ne transmettons pas uniquement un outil",
    "Nous ne remplaçons pas vos équipes",
];

const EXPERTISE_AREAS = [
    { title: "finances d'entreprise", suffix: "Core" },
    { title: "Contrôle de gestion", suffix: "Pilotage" },
    { title: "Automatisation des flux", suffix: "Scale" },
    { title: "Structuration des processus", suffix: "BPM" },
    { title: "Usage avancé d'Odoo Finances", suffix: "Expert" },
];

export default function BootcampDifference() {
    const container = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Animation du titre avec reveal "smooth"
        gsap.from(".diff-title-line", {
            y: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
                trigger: container.current,
                start: "top 70%",
            }
        });

        // Parallaxe sur le fond
        gsap.to(bgRef.current, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                scrub: true
            }
        });

        // Apparition des items "Expertise" avec un décalage
        gsap.from(".expertise-card", {
            opacity: 0,
            y: 40,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".expertise-grid",
                start: "top 75%",
            }
        });

    }, { scope: container });

    return (
        <section ref={container} className="relative w-full bg-[#014730] text-white py-32 lg:py-56 px-6 md:px-12 lg:px-24 overflow-hidden">

            {/* Background Layer: High-End Texture */}
            <div ref={bgRef} className="absolute inset-0 opacity-10 pointer-events-none">
                <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
                    alt="Background texture"
                    fill
                    className="object-cover grayscale"
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#014730] via-transparent to-[#014730]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header Section */}
                <div className="mb-32 max-w-4xl">
                    <span className="inline-block text-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-8 border-l border-secondary pl-4">
                        Manifeste d'Indépendance
                    </span>
                    <h2 className="diff-title text-6xl md:text-8xl font-serif leading-[0.85] tracking-tighter text-white">
                        <span className="diff-title-line block">L'approche</span>
                        <span className="diff-title-line block italic text-secondary font-light">sans compromis.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">

                    {/* Left Side: The "Anti-Thesis" (Clean & Minimal) */}
                    <div className="lg:col-span-5 space-y-12">
                        <div>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-10">Ce que nous refusons</p>
                            <div className="space-y-8">
                                {WHAT_WE_DONT.map((item, index) => (
                                    <div key={index} className="group flex items-center gap-6 opacity-80 hover:opacity-100 transition-opacity">
                                        <div className="w-8 h-[1px] bg-secondary/50 group-hover:w-12 transition-all duration-500" />
                                        <span className="text-xl md:text-2xl font-light tracking-tight">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Transition Box */}
                        <div className="p-8 border border-white/10 bg-white/[0.05] rounded-sm backdrop-blur-md">
                            <p className="text-2xl font-serif italic text-white/90">
                                "Nous ne vendons pas des heures de formation. Nous installons des <span className="text-secondary">systèmes d'autonomie</span>."
                            </p>
                        </div>
                    </div>

                    {/* Right Side: The "Thesis" (Premium Grid) */}
                    <div className="lg:col-span-7">
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-10 lg:text-right">Notre architecture d'expertise</p>

                        <div className="expertise-grid grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 border border-white/10 overflow-hidden rounded-sm">
                            {EXPERTISE_AREAS.map((area, index) => (
                                <div
                                    key={index}
                                    className={`expertise-card group relative p-10 bg-[#013b28] hover:bg-[#012e20] transition-colors duration-500 ${index === 4 ? 'md:col-span-2' : ''}`}
                                >
                                    {/* Reveal Glow Effect on Hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),_rgba(254,152,26,0.1)_0%,_transparent_70%)]" />

                                    <div className="relative z-10 flex flex-col h-full justify-between">
                                        <span className="text-[10px] text-secondary font-mono tracking-tighter mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                            // {area.suffix}
                                        </span>
                                        <h4 className="text-xl md:text-2xl font-serif text-white/90 group-hover:text-white transition-colors">
                                            {area.title}
                                        </h4>
                                    </div>

                                    {/* Corner Accent */}
                                    <div className="absolute top-4 right-4 w-1 h-1 bg-secondary/30 rounded-full group-hover:scale-[3] group-hover:bg-secondary transition-all duration-500" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final Luxury Callout */}
                <div className="mt-40 relative py-20 border-y border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-transparent" />
                    <div className="flex flex-col md:flex-row items-end justify-between gap-12 relative z-10">
                        <div className="max-w-2xl">
                            <h3 className="text-3xl md:text-5xl font-serif leading-tight mb-6">
                                Vers une <span className="text-secondary italic">souveraineté</span> opérationnelle.
                            </h3>
                            <p className="text-white/60 text-lg md:text-xl font-light">
                                Notre objectif ultime est de devenir inutiles. Nous construisons des équipes capables de piloter leur propre croissance, sans dépendance externe.
                            </p>
                        </div>
                        <div className="shrink-0">
                            <div className="w-32 h-32 rounded-full border border-secondary/20 flex items-center justify-center animate-spin-slow">
                                <span className="text-secondary text-[10px] font-bold tracking-[0.3em] uppercase rotate-12">MSL CONSEILS</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}