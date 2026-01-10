"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
    { text: "Expertise métier réelle (pas théorique)" },
    { text: "Crédibilité immédiate face aux clients" },
    { text: "Meilleure maîtrise des attentes" },
    { text: "Moins de support après livraison" },
    { text: "Projets plus rentables et plus fluides" }
];

export default function PartenairesWhyUs() {
    const container = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".whyus-content",
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
        <section ref={container} className="relative w-full py-32 px-6 bg-gray-50 overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px]" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="whyus-content flex items-center justify-center gap-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Pourquoi nous
                    </span>
                    <h2 className="whyus-content text-4xl md:text-5xl font-serif text-primary mb-6">
                        Pourquoi les intégrateurs <br />
                        <span className="italic text-secondary">travaillent avec nous</span>
                    </h2>
                </div>

                {/* Reasons Grid */}
                <div className="whyus-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {REASONS.map((reason, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-secondary/30 transition-all"
                        >
                            <span className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span className="text-gray-700 font-medium">{reason.text}</span>
                        </div>
                    ))}
                </div>

                {/* Quote */}
                <div className="whyus-content max-w-3xl mx-auto">
                    <div className="relative p-12 rounded-[2rem] bg-primary text-center overflow-hidden">
                        {/* Decorative */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-[50px]" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-[40px]" />

                        <div className="relative z-10">
                            <svg className="w-12 h-12 text-secondary/30 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <blockquote className="text-2xl md:text-3xl font-serif text-white leading-relaxed mb-6">
                                Un bon projet Odoo Finance ne se gagne pas au code. <br />
                                <span className="text-secondary">Il se gagne à la compréhension du métier.</span>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
