"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GUIDES = [
    {
        title: "Mise en place de la comptabilité pour PME",
        category: "Formation Complète",
        desc: "2 E-books + 2 tests interactifs. 11 chapitres, 48 questions. De la structuration à l'automatisation avec Odoo.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
        link: "/ressources/guides/mise-en-place-comptabilite",
        isNew: true,
        isFeatured: true,
        stats: { ebooks: 2, chapters: 11, questions: 48 }
    },
    {
        title: "Le contrôle de gestion pour les PME",
        category: "Formation Complète",
        desc: "2 Guides + Quiz + Checklist. 20 chapitres, études de cas et outils téléchargeables.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        link: "/ressources/guides/controle-gestion-formation",
        isNew: true,
        isFeatured: true,
        stats: { ebooks: 2, chapters: 20, questions: 12 }
    },
    {
        title: "Êtes-vous prêt à automatiser vos finances ?",
        category: "Diagnostic",
        desc: "5 étapes structurées pour faire le point sur vos processus et identifier les axes d'automatisation. Checklist PDF/Excel incluse.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
        link: "/ressources/guides/automatisation-diagnostic",
        isNew: true
    },
    {
        title: "Votre PME a-t-elle besoin d'un Directeur Financier ?",
        category: "Guide Stratégique",
        desc: "Structurez votre pilotage financier sans alourdir votre masse salariale. DAF interne ou externe ?",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
        link: "/ressources/guides/daf-pme",
        isNew: true
    }
];




export default function ResourceGuides() {
    const container = useRef<HTMLElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useGSAP(() => {
        if (!isMounted) return;

        gsap.fromTo(".guide-card",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 70%"
                }
            }
        );
    }, { scope: container, dependencies: [isMounted] });

    return (
        <section id="guides" ref={container} className="w-full py-24 px-6 md:px-12 bg-gray-50" suppressHydrationWarning>

            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">Guides Pratiques</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Des ressources actionnables pour maîtriser Odoo Finances.</p>
                </div>

                {/* Featured Resources - Full Width */}
                {GUIDES.filter(g => g.isFeatured).map((guide, i) => {
                    const isCompta = i === 0;
                    const bgStyle = isCompta
                        ? "linear-gradient(135deg, #012a1e 0%, #014730 50%, #016742 100%)"
                        : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)";

                    return (
                        <Link
                            key={`featured-${i}`}
                            href={guide.link}
                            className="guide-card group block mb-8 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 relative"
                            style={{ background: bgStyle }}
                        >
                            <div className="absolute inset-0">
                                <Image
                                    src={guide.image}
                                    alt={guide.title}
                                    fill
                                    className="object-cover opacity-20 transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                            {guide.category}
                                        </span>
                                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                            Recommandé
                                        </span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{guide.title}</h3>
                                    <p className="text-white/80 text-base leading-relaxed mb-6 max-w-xl">{guide.desc}</p>
                                    <div className="flex items-center text-secondary text-sm font-semibold uppercase tracking-wide group/btn">
                                        Accéder à la formation
                                        <svg className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                                {guide.stats && (
                                    <div className="hidden md:flex items-center gap-6">
                                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 text-center">
                                            <div className="text-3xl font-bold text-white">{guide.stats.ebooks}</div>
                                            <div className="text-white/60 text-sm">E-books</div>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 text-center">
                                            <div className="text-3xl font-bold text-white">{guide.stats.chapters}</div>
                                            <div className="text-white/60 text-sm">Chapitres</div>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 text-center">
                                            <div className="text-3xl font-bold text-white">{guide.stats.questions}</div>
                                            <div className="text-white/60 text-sm">Questions</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Link>
                    );
                })}


                {/* Other Guides */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {GUIDES.filter(g => !g.isFeatured).map((guide, i) => {
                        const CardContent = (
                            <>
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={guide.image}
                                        alt={guide.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className={`backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm
                                            ${guide.isNew ? "bg-secondary text-white" : "bg-white/90 text-primary"}`}>
                                            {guide.category}
                                        </span>
                                        {guide.isNew && (
                                            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider animate-pulse">
                                                Nouveau
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-secondary transition-colors line-clamp-2">{guide.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{guide.desc}</p>
                                    <div className="flex items-center text-secondary text-sm font-semibold uppercase tracking-wide group/btn">
                                        {guide.link ? "Découvrir" : "Lire le guide"}
                                        <svg className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </>
                        );

                        return guide.link ? (
                            <Link
                                key={i}
                                href={guide.link}
                                className={`guide-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100
                                    ${guide.isNew ? "ring-2 ring-secondary/20" : ""}`}
                            >
                                {CardContent}
                            </Link>
                        ) : (
                            <div
                                key={i}
                                className="guide-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-100"
                            >
                                {CardContent}
                            </div>
                        );
                    })}
                </div>


                {/* Avant / Après Block */}
                <div className="bg-[#050505] rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
                    {/* Subtle glow effect */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="flex-1 space-y-2 relative z-10">
                        <span className="text-red-500 font-bold uppercase text-xs tracking-widest">Avant</span>
                        <h4 className="text-xl font-medium text-white/40 line-through decoration-red-500/50 decoration-2">
                            Vous cherchez vos chiffres dans plusieurs outils, perdez du temps
                        </h4>
                    </div>

                    <div className="hidden md:block w-px h-24 bg-white/10" />
                    <div className="md:hidden w-full h-px bg-white/10" />

                    <div className="flex-1 space-y-2 relative z-10">
                        <span className="text-secondary font-bold uppercase text-xs tracking-widest">Après</span>
                        <h4 className="text-2xl font-serif text-white font-medium">
                            Une méthode claire et simple pour tout centraliser et gagner en fiabilité
                        </h4>
                    </div>
                </div>

            </div>
        </section>
    );
}
