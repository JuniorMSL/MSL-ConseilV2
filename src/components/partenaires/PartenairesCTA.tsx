"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const PARTNER_BENEFITS = [
    "Sécuriser vos projets Finance",
    "Renforcer votre crédibilité métier",
    "Soulager vos équipes techniques",
    "Améliorer la satisfaction client"
];

export default function PartenairesCTA() {
    const container = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".cta-content",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 80%"
                    }
                }
            );
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} id="contact" className="relative w-full py-32 px-6 bg-[#050505] overflow-hidden">
            {/* Decorative Blobs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/30 rounded-full blur-[120px]" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="cta-content text-center">
                    {/* Header */}
                    <span className="flex items-center justify-center gap-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-8">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Travaillons ensemble
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
                        Vous êtes intégrateur Odoo <br />
                        et souhaitez...
                    </h2>

                    {/* Benefits List */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {PARTNER_BENEFITS.map((benefit, i) => (
                            <span
                                key={i}
                                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium"
                            >
                                {benefit}
                            </span>
                        ))}
                    </div>

                    {/* CTA */}
                    <p className="flex items-center justify-center gap-3 text-3xl font-serif text-secondary mb-12">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Parlons partenariat.
                    </p>

                    {/* Contact Button */}
                    <div className="flex flex-col items-center gap-6">
                        <Link
                            href="/contact"
                            className="group relative px-12 py-6 bg-secondary text-primary rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contactez-nous
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>

                        {/* Info */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 text-white/50 text-sm">
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Réponse sous 72h
                            </span>
                            <span className="hidden sm:block">•</span>
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Belgique – Europe – International
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
