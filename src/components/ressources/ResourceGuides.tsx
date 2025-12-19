"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GUIDES = [
    {
        title: "Checklists pour automatiser vos processus",
        category: "Productivité",
        desc: "Une méthode claire pour ne plus rien oublier.",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Tutoriels pas-à-pas pour configurer Odoo Finance",
        category: "Tutoriels",
        desc: "De la théorie à la pratique, sans friction.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Astuces pour sécuriser vos données et réduire les erreurs",
        category: "Sécurité",
        desc: "Protégez votre actif le plus précieux : vos chiffres.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop"
    }
];

export default function ResourceGuides() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
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
    }, { scope: container });

    return (
        <section ref={container} className="w-full py-24 px-6 md:px-12 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">Guides Pratiques</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Des ressources actionnables pour maîtriser Odoo Finance.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {GUIDES.map((guide, i) => (
                        <div key={i} className="guide-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-100">
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    src={guide.image}
                                    alt={guide.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                        {guide.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-secondary transition-colors">{guide.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">{guide.desc}</p>
                                <div className="flex items-center text-secondary text-sm font-semibold uppercase tracking-wide group/btn">
                                    Lire le guide
                                    <svg className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
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
