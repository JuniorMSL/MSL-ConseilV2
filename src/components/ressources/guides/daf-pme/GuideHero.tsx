"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function GuideHero() {
    const container = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".hero-reveal",
                { y: 80, opacity: 0, filter: "blur(8px)" },
                { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.15, ease: "power3.out" }
            );
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative w-full min-h-[85vh] flex items-center justify-center bg-[#050505] text-white overflow-hidden px-6 pt-24">

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
                    alt="Pilotage financier PME"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/40" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] opacity-40" />
            <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-[100px] opacity-30" />

            <div className="relative z-10 max-w-5xl text-center py-20">
                {/* Badge */}
                <span className="hero-reveal inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-secondary text-xs font-bold uppercase tracking-widest mb-8">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Guide stratégique PME
                </span>

                <h1 className="hero-reveal text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-[1.15]">
                    Votre entreprise a-t-elle vraiment <br />
                    besoin d'un <span className="italic text-secondary">Directeur Financier</span> ?
                </h1>

                <p className="hero-reveal text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto mb-12">
                    Le guide de clarté pour dirigeants de PME qui veulent structurer leur pilotage financier
                    <strong className="text-white"> sans alourdir leur masse salariale</strong>.
                </p>

                <div className="hero-reveal flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a href="#introduction" className="px-8 py-4 bg-secondary text-primary rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white transition-colors duration-300 shadow-lg flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Lire le guide
                    </a>
                    <a href="#diagnostic" className="px-8 py-4 border border-white/20 text-white rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/10 transition-colors duration-300 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        Faire le diagnostic
                    </a>
                </div>

                {/* Quick Info */}
                <div className="hero-reveal flex flex-wrap justify-center gap-6 mt-12 text-white/50 text-sm">
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        10 min de lecture
                    </span>
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        7 chapitres
                    </span>
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Diagnostic inclus
                    </span>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
                <div className="w-px h-16 bg-gradient-to-b from-secondary to-transparent animate-pulse" />
            </div>
        </section>
    );
}
