"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GOALS = [
    "Renforcer les compétences de vos équipes",
    "Mieux exploiter Odoo",
    "Structurer et automatiser votre finances",
    "Gagner en autonomie et en fiabilité",
];

export default function BootcampCTA() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Title reveal
        gsap.fromTo(".cta-title",
            { y: 80, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 70%",
                },
            }
        );

        // Goals stagger
        gsap.fromTo(".cta-goal",
            { x: -30, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".cta-goals",
                    start: "top 75%",
                },
            }
        );

        // CTAs reveal
        gsap.fromTo(".cta-button",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".cta-buttons",
                    start: "top 85%",
                },
            }
        );

    }, { scope: container });

    return (
        <section ref={container} className="relative w-full bg-white py-32 px-6 md:px-12 lg:px-24 overflow-hidden">

            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gradient Circles */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(rgba(1, 71, 48, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(1, 71, 48, 0.05) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            <div className="max-w-5xl mx-auto relative z-10 text-center">

                {/* Section Header */}
                <div className="mb-16">
                    <span className="cta-title inline-block text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-6">
                        Prêt à transformer vos équipes ?
                    </span>
                    <h2 className="cta-title text-4xl md:text-6xl lg:text-7xl font-serif text-primary leading-[0.95] mb-8">
                        Vous souhaitez...
                    </h2>
                </div>

                {/* Goals List */}
                <div className="cta-goals flex flex-wrap justify-center gap-4 mb-16">
                    {GOALS.map((goal, index) => (
                        <div
                            key={index}
                            className="cta-goal flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-full border border-gray-200 hover:border-secondary hover:bg-secondary/5 transition-all duration-300 cursor-default"
                        >
                            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                            <span className="text-lg text-gray-700 font-medium">{goal}</span>
                        </div>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/contact"
                        className="cta-button group relative overflow-hidden rounded-full bg-secondary px-12 py-6 text-center shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 transition-all duration-300"
                    >
                        <span className="relative z-10 text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                            Parler à un consultant MSL
                        </span>
                        <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </Link>

                    <Link
                        href="/contact"
                        className="cta-button group flex items-center gap-4 rounded-full border-2 border-primary px-10 py-5 text-primary hover:bg-primary hover:text-white transition-all duration-300"
                    >
                        <span className="font-semibold text-lg">Construire un bootcamp adapté</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-1 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>

                {/* Trust Badge */}
                <div className="mt-16 flex items-center justify-center gap-6 text-gray-500">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-secondary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                        <span className="text-sm">Formation certifiée</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300" />
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-secondary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span className="text-sm">Bruxelles & Marrakech</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300" />
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-secondary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">Réponse sous 24h</span>
                    </div>
                </div>

            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-secondary to-primary" />
        </section>
    );
}
