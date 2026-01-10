"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PAIN_POINTS = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        text: "Besoins financiers mal cadrés"
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        text: "Attentes clients floues"
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        text: "Règles comptables mal traduites"
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        text: "Utilisateurs mal formés"
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        text: "Tensions après le go-live"
    }
];

export default function PartenairesWhy() {
    const container = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".why-content",
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} id="offre" className="relative w-full py-32 px-6 bg-white overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]" />

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Image Column */}
                    <div className="why-content relative h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
                        <Image
                            src="/images/partenaires/collaboration_team.png"
                            alt="Équipe collaborative"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />

                        {/* Floating Badge */}
                        <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 flex items-center gap-2">
                            <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-secondary font-bold text-sm">Pourquoi cette offre existe</span>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="why-content">
                        <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-4 block">Le constat</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-primary mb-8 leading-tight">
                            Les projets Odoo Finance échouent rarement à cause de la technique.
                        </h2>
                        <p className="text-2xl text-gray-600 mb-10 font-light leading-relaxed">
                            Ils échouent par <strong className="text-primary font-bold">manque de compréhension métier.</strong>
                        </p>

                        {/* Pain Points */}
                        <div className="space-y-4 mb-10">
                            {PAIN_POINTS.map((point, i) => (
                                <div
                                    key={i}
                                    className="why-content flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-secondary/30 transition-all hover:shadow-md"
                                >
                                    <span className="text-gray-400">{point.icon}</span>
                                    <span className="text-gray-700 font-medium">{point.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 rounded-2xl bg-primary text-white flex items-center gap-4">
                            <svg className="w-6 h-6 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            <p className="text-lg font-medium">
                                C'est précisément à cet endroit que <span className="text-secondary font-bold">nous intervenons.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
