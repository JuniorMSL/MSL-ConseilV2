"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function SolutionsHero() {
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
        <section ref={container} className="relative w-full min-h-[85vh] flex items-center justify-center bg-[#050505] text-white overflow-hidden px-6">

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                    alt="Solutions Background"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/40" />
            </div>

            <div className="relative z-10 max-w-5xl text-center py-32">
                <span className="hero-reveal block text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-8">Solutions MSL</span>

                <h1 className="hero-reveal text-4xl md:text-6xl lg:text-7xl font-serif mb-8 leading-[1.1]">
                    Des solutions simples pour <br />
                    <span className="italic text-secondary">reprendre le contrôle</span> de vos finances.
                </h1>

                <p className="hero-reveal text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto mb-12">
                    Simplifiez, sécurisez et maîtrisez vos chiffres dans Odoo — avec un cabinet qui renforce votre équipe, sans se substituer à elle.
                </p>

                <div className="hero-reveal flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-secondary text-primary rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white transition-colors duration-300 shadow-lg">
                        Parler à un expert
                    </button>
                    <button className="px-8 py-4 border border-white/20 text-white rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/10 transition-colors duration-300">
                        Demander un diagnostic gratuit
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            {/* <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
                <div className="w-px h-16 bg-gradient-to-b from-secondary to-transparent animate-pulse" />
            </div> */}
        </section>
    );
}
