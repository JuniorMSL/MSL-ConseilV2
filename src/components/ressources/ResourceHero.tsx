"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

export default function ResourceHero() {
    const container = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(titleRef.current,
            { y: 50, opacity: 0, filter: "blur(10px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" }
        )
            .fromTo(subRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.6"
            )
            .fromTo(ctaRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.6"
            );

    }, { scope: container });

    return (
        <section ref={container} className="relative w-full py-20 md:py-32 flex flex-col justify-center items-center text-center bg-[#050505] overflow-hidden px-6 font-primary text-white">

            {/* Background Ambience & Image */}
            <div className="absolute inset-0 z-0 select-none">
                <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                    alt="Background"
                    fill
                    className="object-cover opacity-50"
                />
                {/* Lighter gradient to let image show through */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/60 to-[#050505] z-10" />
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] opacity-30 z-20" />
            </div>

            <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center mt-12">
                {/* Badge */}
                <div className="mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                    <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-secondary text-xs font-bold tracking-widest uppercase">
                        Ressources & Guides
                    </span>
                </div>

                {/* Title */}
                <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-[1.1] tracking-tight">
                    Apprenez à piloter <br />
                    <span className="italic text-secondary">simplement.</span>
                </h1>

                {/* Subtitle */}
                <p ref={subRef} className="text-xl md:text-2xl text-white/70 max-w-2xl font-light leading-relaxed mb-10">
                    Guides, articles et outils pratiques pour comprendre, sécuriser et automatiser votre gestion financière avec Odoo.
                </p>

                {/* CTAs */}
                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6">
                    <Link href="#guides" className="group relative px-8 py-4 bg-secondary text-primary rounded-full font-medium text-sm transition-all hover:scale-105 hover:shadow-xl shadow-lg shadow-secondary/20 overflow-hidden">
                        <span className="relative z-10 flex items-center gap-2">
                            Consulter nos guides
                            <svg className="w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </span>
                    </Link>
                    {/* <button className="group px-8 py-4 bg-transparent text-white border border-white/20 rounded-full font-medium text-sm transition-all hover:border-white hover:bg-white/5 flex items-center gap-2">
                        Consulter nos études de cas
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button> */}
                </div>
            </div>

        </section>
    );
}
