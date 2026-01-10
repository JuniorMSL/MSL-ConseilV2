"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const USE_CASES = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        text: "Projet Odoo Finance complexe ou multi-activités"
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
        text: "Client avec expert-comptable très impliqué"
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
        ),
        text: "Migration depuis logiciel comptable existant"
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        text: "Client exigeant sur la conformité et la fiabilité"
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
        ),
        text: "Besoin de formation Finance post go-live"
    }
];

export default function PartenairesUseCases() {
    const container = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".usecase-item",
                { x: -30, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
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
        <section ref={container} className="relative w-full py-32 px-6 bg-white overflow-hidden">
            {/* Decorative */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Content */}
                    <div>
                        <span className="usecase-item flex items-center gap-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            Cas d'usage
                        </span>
                        <h2 className="usecase-item text-4xl md:text-5xl font-serif text-primary mb-8 leading-tight">
                            Quand faire appel <br />
                            <span className="italic text-secondary">à MSL Conseils ?</span>
                        </h2>
                        <p className="usecase-item text-xl text-gray-500 mb-12">
                            Dans tous ces cas, notre intervention <strong className="text-primary">réduit vos risques projet.</strong>
                        </p>
                    </div>

                    {/* Use Cases List */}
                    <div className="space-y-4">
                        {USE_CASES.map((useCase, i) => (
                            <div
                                key={i}
                                className="usecase-item group flex items-center gap-5 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-primary hover:border-primary transition-all duration-300 cursor-default"
                            >
                                <span className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-secondary/20 group-hover:text-secondary transition-colors">
                                    {useCase.icon}
                                </span>
                                <span className="text-lg text-gray-700 group-hover:text-white transition-colors font-medium">
                                    {useCase.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
