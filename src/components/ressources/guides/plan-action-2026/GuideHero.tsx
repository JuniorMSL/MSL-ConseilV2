"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function GuideHero() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(".hero-badge",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
            .fromTo(".hero-title",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.5"
            )
            .fromTo(".hero-subtitle",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.5"
            )
            .fromTo(".hero-features span",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
                "-=0.3"
            );
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #014730 0%, #016742 50%, #014730 100%)"
            }}
        >
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, white 1px, transparent 1px),
                            linear-gradient(to bottom, white 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px"
                    }}
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
                {/* Badge */}
                <div className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
                    <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    <span className="text-white/90 text-sm font-medium tracking-wide">
                        Plan d'Action PME 2026
                    </span>
                </div>

                {/* Title */}
                <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Contrôle de gestion PME :
                    <br />
                    <span className="text-secondary">plan d'action et checklist 2026</span>
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-6 leading-relaxed">
                    Les bons chiffres, au bon moment : votre plan d'action PME 2026
                </p>
                <p className="hero-subtitle text-base text-white/50 max-w-2xl mx-auto mb-12">
                    Enfin un guide PME clair, pratique et actionnable pour structurer votre gestion
                </p>

                {/* Features */}
                <div className="hero-features flex flex-wrap justify-center gap-4 md:gap-6">
                    <span className="flex items-center gap-2 text-white/80 text-sm bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                        <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        9 chapitres complets
                    </span>
                    <span className="flex items-center gap-2 text-white/80 text-sm bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                        <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Études de cas réels
                    </span>
                    <span className="flex items-center gap-2 text-white/80 text-sm bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                        <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        Checklist téléchargeable
                    </span>
                    <span className="flex items-center gap-2 text-white/80 text-sm bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                        <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Actions Bootcamp
                    </span>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
                    <span className="text-white/60 text-xs uppercase tracking-widest">Découvrir</span>
                    <svg className="w-5 h-5 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
