"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHECKLISTS = [
    {
        title: "Implémentation Odoo Finances",
        items: ["Audit des flux existants", "Architecture du Plan Comptable", "Reprise des historiques", "Tests de validation"],
        color: "bg-primary text-white",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
        colSpan: "md:col-span-2"
    },
    {
        title: "Suivi et pilotage mensuel",
        items: ["Rapprochement bancaire", "Lettrage des tiers", "Déclaration TVA", "Review du P&L"],
        color: "bg-gray-50 text-gray-900 border border-gray-100",
        icon: (
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
            </svg>
        ),
        colSpan: "md:col-span-1"
    },
    {
        title: "Formation des équipes",
        items: ["Gestion des Factures Client", "Notes de frais & Achats", "Validation des paiements", "Utilisation du portail"],
        color: "bg-white text-gray-900 border border-gray-100 shadow-sm",
        icon: (
            <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        colSpan: "md:col-span-1"
    }
];

export default function ResourceChecklists() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo(".bento-card",
            { y: 30, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 75%"
                }
            }
        );
    }, { scope: container });

    return (
        <section ref={container} className="w-full py-24 px-6 md:px-12 bg-white relative overflow-hidden">

            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4">Checklists Essentielles</h2>
                    <p className="text-gray-500 font-light">Structurez votre réussite, étape par étape.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(320px,auto)]">

                    {/* Map Checklists */}
                    {CHECKLISTS.map((list, i) => (
                        <div key={i} className={`bento-card relative p-8 rounded-3xl flex flex-col justify-between overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${list.color} ${list.colSpan}`}>

                            {/* Decorative Blur */}
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />

                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md shadow-inner">
                                        {list.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold tracking-tight">{list.title}</h3>
                                </div>

                                <ul className="space-y-4">
                                    {list.items.map((item, j) => (
                                        <li key={j} className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${list.color.includes('bg-primary') ? 'bg-secondary text-primary' : 'bg-green-100 text-green-600'}`}>
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className={`text-sm font-medium ${list.color.includes('bg-primary') ? 'text-white/90' : 'text-gray-600'}`}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8 flex justify-between items-end">
                                <span className={`text-xs font-bold uppercase tracking-widest ${list.color.includes('bg-primary') ? 'text-white/50' : 'text-gray-400'}`}>100% Actionable</span>
                                <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:rotate-45 ${list.color.includes('bg-primary') ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Avant / Après Card - Bento Style */}
                    <div className="bento-card md:col-span-2 md:col-start-2 bg-[#f4f4f4] rounded-3xl p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ transform: 'skewX(-20deg)' }} />

                        <div className="h-full flex flex-col md:flex-row gap-8 items-center justify-center relative z-10">

                            {/* Avant */}
                            <div className="flex-1 text-center md:text-left opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="text-xs uppercase font-bold tracking-widest text-red-500 mb-2">Avant</div>
                                <p className="text-gray-600 font-medium">Vous ne savez pas par où commencer</p>
                            </div>

                            {/* Arrow / Divider */}
                            <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-primary shrink-0 transform group-hover:scale-110 transition-transform duration-500">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>

                            {/* Après */}
                            <div className="flex-1 text-center md:text-right">
                                <div className="text-xs uppercase font-bold tracking-widest text-secondary mb-2">Après</div>
                                <h4 className="text-2xl font-serif text-primary">
                                    Étapes claires, adoption rapide et <span className="italic text-secondary">maîtrise totale</span>
                                </h4>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
