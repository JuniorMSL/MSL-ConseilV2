"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NOT_WE_ARE = [
    "un intégrateur Odoo",
    "un développeur technique",
    "un simple formateur"
];

const WE_ARE = [
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        text: "la finance d'entreprise"
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        text: "la comptabilité"
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        text: "le contrôle de gestion"
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        text: "leur traduction fonctionnelle dans Odoo"
    }
];

export default function PartenairesPositioning() {
    const container = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".pos-content",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 75%"
                    }
                }
            );
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative w-full py-32 px-6 bg-[#050505] text-white overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px]" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <span className="pos-content flex items-center justify-center gap-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Notre positionnement
                    </span>
                    <h2 className="pos-content text-4xl md:text-6xl font-serif mb-6">
                        Analyste fonctionnel Finance, <br />
                        <span className="italic text-secondary">pas intégrateur.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* What we are NOT */}
                    <div className="pos-content p-10 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm">
                        <h3 className="text-2xl font-serif mb-8 text-white/80">Nous ne sommes pas :</h3>
                        <ul className="space-y-5">
                            {NOT_WE_ARE.map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-lg text-white/60 line-through decoration-white/30">
                                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/40">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* What we ARE */}
                    <div className="pos-content p-10 rounded-[2rem] bg-gradient-to-br from-primary to-primary/80 border border-secondary/20 shadow-2xl">
                        <div className="flex items-start gap-3 mb-8">
                            <svg className="w-6 h-6 text-secondary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            <h3 className="text-2xl font-serif">
                                Nous sommes un <span className="text-secondary">tiers métier indépendant</span>, spécialisé dans :
                            </h3>
                        </div>
                        <ul className="space-y-5">
                            {WE_ARE.map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-lg text-white font-medium">
                                    <span className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">{item.icon}</span>
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Expert Badge */}
                <div className="pos-content mt-16 text-center">
                    <div className="inline-flex items-center gap-4 px-8 py-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <span className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                        </span>
                        <p className="text-lg text-white/90">
                            <strong className="text-secondary">Expert-comptable</strong> avec plus de 20 ans d'expérience — <br className="hidden md:block" />
                            nous parlons la langue du dirigeant, du DAF, de l'expert-comptable… et de l'ERP.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
