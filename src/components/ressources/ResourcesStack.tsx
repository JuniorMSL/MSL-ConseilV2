"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RESOURCES = [
    {
        id: "guides",
        category: "Guides pratiques",
        bg: "bg-[#f8f9fa]",
        text: "text-primary",
        accent: "bg-secondary",
        description: "Des ressources pas-à-pas pour maîtriser Odoo Finances.",
        items: [
            "Checklists pour automatiser vos processus",
            "Tutoriels pas-à-pas pour configurer Odoo",
            "Astuces pour sécuriser vos données"
        ],
        before: {
            title: "Avant MSL",
            text: "Vous cherchez vos chiffres dans plusieurs outils, perdez du temps.",
            icon: "🛑"
        },
        after: {
            title: "Avec MSL",
            text: "Une méthode claire et simple pour tout centraliser et gagner en fiabilité.",
            icon: "✅"
        }
    },
    {
        id: "articles",
        category: "Articles simples",
        bg: "bg-white",
        text: "text-primary",
        accent: "bg-primary",
        description: "L'actualité financière et digitale décryptée.",
        items: [
            "Explications courtes sur le contrôle de gestion",
            "Tendances et bonnes pratiques PME/TPE",
            "Conseils concrets pour la digitalisation"
        ],
        before: {
            title: "Avant",
            text: "Concepts financiers flous ou incompris.",
            icon: "❓"
        },
        after: {
            title: "Après",
            text: "Vous comprenez vos données et prenez des décisions éclairées.",
            icon: "💡"
        }
    },
    {
        id: "cases",
        category: "Mini études de cas",
        bg: "bg-primary",
        text: "text-white",
        accent: "bg-secondary",
        description: "Des résultats prouvés chez nos clients.",
        items: [
            "PME ayant réduit 40% de tâches manuelles",
            "Clôture mensuelle accélérée de 30%",
            "Retour sur investissement rapide"
        ],
        before: {
            title: "Problème",
            text: "Processus manuels, erreurs fréquentes.",
            icon: "📉"
        },
        after: {
            title: "Solution",
            text: "Processus automatisés, données fiables, dirigeants confiants.",
            icon: "📈"
        }
    },
    {
        id: "checklists",
        category: "Checklists & Outils",
        bg: "bg-secondary",
        text: "text-white",
        accent: "bg-primary",
        description: "Passez à l'action immédiatement.",
        items: [
            "Checklist d’implémentation Odoo Finances",
            "Checklist de suivi et pilotage mensuel",
            "Checklist de formation des équipes"
        ],
        before: {
            title: "Situation",
            text: "Vous ne savez pas par où commencer.",
            icon: "🚧"
        },
        after: {
            title: "Objectif",
            text: "Étapes claires, adoption rapide et maîtrise totale.",
            icon: "🚀"
        }
    }
];

export default function ResourcesStack() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Animation for card contents on scroll
        RESOURCES.forEach((_, i) => {
            ScrollTrigger.create({
                trigger: `#card-${i}`,
                start: "top center",
                onEnter: () => {
                    gsap.fromTo(`#card-${i} .stagger-anim`,
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
                    );
                }
            });
        });
    }, { scope: container });

    return (
        <section ref={container} className="relative pb-20">

            {RESOURCES.map((res, index) => (
                <div
                    key={res.id}
                    id={`card-${index}`}
                    className={`sticky top-0 min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden ${res.bg} ${res.text}`}
                    style={{ zIndex: index + 1 }}
                >
                    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left Content */}
                        <div className="space-y-8">
                            <span className={`stagger-anim inline-block px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider ${res.text === 'text-white' ? 'bg-white/20' : 'bg-gray-100 text-gray-500'
                                }`}>
                                {res.category}
                            </span>

                            <h2 className="stagger-anim text-5xl md:text-7xl font-serif leading-none">
                                {res.category.split(' ')[0]} <br />
                                <span className="italic opacity-80">{res.category.split(' ').slice(1).join(' ')}</span>
                            </h2>

                            <p className="stagger-anim text-xl opacity-70 max-w-md">
                                {res.description}
                            </p>

                            <ul className="stagger-anim space-y-4 mt-8">
                                {res.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-4 text-lg">
                                        <span className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${res.text === 'text-white' ? 'bg-white text-primary' : 'bg-primary text-white'
                                            }`}>
                                            ✓
                                        </span>
                                        <span className="opacity-90">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Content - Before/After Card */}
                        <div className="stagger-anim relative group perspective-1000">

                            {/* The Card Container */}
                            <div className="relative w-full aspect-[4/3] max-w-xl mx-auto">

                                {/* Background Decoration */}
                                <div className={`absolute -inset-4 rounded-3xl blur-2xl opacity-30 ${res.text === 'text-white' ? 'bg-white' : 'bg-secondary'}`} />

                                {/* Split Card */}
                                <div className={`relative h-full w-full rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row ${res.text === 'text-white' ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-white border text-gray-800'
                                    }`}>

                                    {/* Before Section */}
                                    <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-current/10 bg-red-50/5 relative overflow-hidden group/before hover:bg-red-50/10 transition-colors">
                                        <div className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest opacity-50">
                                            {res.before.title}
                                        </div>
                                        <div className="h-full flex flex-col justify-center items-center text-center">
                                            <div className="text-6xl mb-6 transform group-hover/before:scale-110 transition-transform duration-300 filter grayscale opacity-70">
                                                {res.before.icon}
                                            </div>
                                            <p className="font-medium leading-relaxed opacity-80 px-4">
                                                "{res.before.text}"
                                            </p>
                                        </div>
                                    </div>

                                    {/* After Section */}
                                    <div className={`flex-1 p-8 relative overflow-hidden group/after transition-colors ${res.text === 'text-white' ? 'bg-secondary/20 hover:bg-secondary/30' : 'bg-green-50 hover:bg-green-100'
                                        }`}>
                                        <div className="absolute top-4 right-4 text-xs font-bold uppercase tracking-widest text-secondary">
                                            {res.after.title}
                                        </div>
                                        <div className="h-full flex flex-col justify-center items-center text-center">
                                            <div className="text-6xl mb-6 transform group-hover/after:scale-110 rotate-0 group-hover/after:rotate-12 transition-all duration-300">
                                                {res.after.icon}
                                            </div>
                                            <p className={`font-bold leading-relaxed px-4 ${res.text === 'text-white' ? 'text-white' : 'text-primary'}`}>
                                                "{res.after.text}"
                                            </p>
                                        </div>
                                    </div>

                                    {/* Arrow Indicator in Middle */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            ))}

        </section>
    );
}
