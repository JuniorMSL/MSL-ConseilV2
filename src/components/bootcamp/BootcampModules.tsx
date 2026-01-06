"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MODULES = [
    {
        id: 1,
        number: "01",
        title: "Structuration Odoo Finances",
        duration: "3 à 5 jours",
        target: "Entreprises utilisant Odoo sans cadre financier clair ou en phase de structuration.",
        objective: "Mettre en place une architecture financière cohérente dans Odoo.",
        content: [
            "Analyse des flux financiers réels",
            "Paramétrage comptable et analytique",
            "Structuration des journaux, comptes et axes",
            "Bonnes pratiques d'automatisation",
        ],
        result: "Une base financière propre, fiable et exploitable.",
        cta: "Structurer notre Odoo Finances",
        color: "from-primary to-[#016b45]",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 2,
        number: "02",
        title: "Automatisation & Processus financiers",
        duration: "3 à 4 jours",
        target: "Entreprises confrontées à trop de tâches manuelles et de pertes de temps.",
        objective: "Automatiser intelligemment les flux financiers et opérationnels.",
        content: [
            "Cartographie des processus existants",
            "Identification des points de friction",
            "Automatisation des flux clés",
            "Sécurisation des données financières",
        ],
        result: "Des processus fluides, traçables et robustes.",
        cta: "Automatiser nos processus financiers",
        color: "from-secondary to-[#e5890f]",
        image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2574&auto=format&fit=crop"
    },
    {
        id: 3,
        number: "03",
        title: "Contrôle de gestion & pilotage",
        duration: "4 à 5 jours",
        target: "Dirigeants et responsables financiers souhaitant piloter par les chiffres.",
        objective: "Transformer les données en outils de décision.",
        content: [
            "Mise en place du contrôle de gestion dans Odoo",
            "Construction de KPIs pertinents",
            "Tableaux de bord financiers et opérationnels",
            "Lecture et interprétation des données",
        ],
        result: "Un pilotage clair, partagé et actionnable.",
        cta: "Mettre en place notre pilotage financier",
        color: "from-primary to-[#016b45]",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 4,
        number: "04",
        title: "Digitalisation des départements connectés",
        duration: "3 à 5 jours",
        target: "Entreprises souhaitant aligner finances, opérations et organisation.",
        objective: "Connecter les départements à une logique financière commune.",
        content: [
            "Analyse inter-départements",
            "Connexion des flux opérationnels à la finances",
            "Logique transverse de pilotage",
            "Alignement outils / processus / objectifs",
        ],
        result: "Une entreprise plus cohérente et mieux synchronisée.",
        cta: "Digitaliser et connecter nos départements",
        color: "from-secondary to-[#e5890f]",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 5,
        number: "05",
        title: "Bootcamp sur mesure",
        duration: "2 à 10 jours",
        target: "Entreprises avec un besoin spécifique ou un projet ciblé.",
        objective: "Répondre à un enjeu précis, sans formation superflue.",
        content: [
            "Diagnostic rapide",
            "Programme personnalisé",
            "Travail sur données réelles",
            "Livraison opérationnelle",
        ],
        result: "Solution adaptée à vos besoins spécifiques.",
        cta: "Construire un bootcamp sur mesure",
        color: "from-gray-800 to-gray-900",
        featured: true,
        image: "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?q=80&w=2670&auto=format&fit=crop"
    },
];

export default function BootcampModules() {
    const container = useRef<HTMLElement>(null);
    const [expandedModule, setExpandedModule] = useState<number | null>(null);

    useGSAP(() => {
        // Title reveal
        gsap.fromTo(".modules-title",
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 70%",
                },
            }
        );

        // Modules stagger
        gsap.fromTo(".module-card",
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".modules-grid",
                    start: "top 70%",
                },
            }
        );

    }, { scope: container });

    const toggleModule = (id: number) => {
        setExpandedModule(expandedModule === id ? null : id);
    };

    return (
        <section id="modules" ref={container} className="relative w-full bg-gray-50 py-32 px-6 md:px-12 lg:px-24 overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(1, 71, 48, 0.1) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="text-center mb-20">
                    <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
                        Packs & Modules
                    </span>
                    <h2 className="modules-title text-4xl md:text-6xl lg:text-7xl font-serif text-primary leading-[0.95] mb-6">
                        Nos <span className="italic text-secondary">modules</span> de formation
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        À la carte ou en pack • Limités à <span className="font-bold text-primary">10 jours maximum</span> par parcours
                    </p>
                </div>

                {/* Modules Grid */}
                <div className="modules-grid space-y-6">
                    {MODULES.map((module) => (
                        <div
                            key={module.id}
                            className={`module-card group relative overflow-hidden rounded-3xl border transition-all duration-500 cursor-pointer
                                ${expandedModule === module.id
                                    ? 'bg-white border-secondary shadow-xl'
                                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
                                }
                                ${module.featured ? 'ring-2 ring-secondary ring-offset-2' : ''}
                            `}
                            onClick={() => toggleModule(module.id)}
                        >
                            {/* Header Row - Always Visible */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between p-8 gap-6 relative z-10">
                                <div className="flex items-center gap-8">
                                    {/* Module Number */}
                                    <div className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center`}>
                                        <span className="text-white font-bold text-xl">{module.number}</span>
                                    </div>

                                    {/* Title & Duration */}
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-serif text-primary group-hover:text-secondary transition-colors duration-300">
                                            {module.title}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center gap-2 text-secondary font-semibold text-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                                </svg>
                                                {module.duration}
                                            </div>
                                            {module.featured && (
                                                <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase">
                                                    Personnalisable
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Expand Icon */}
                                <div className={`shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300
                                    ${expandedModule === module.id
                                        ? 'bg-secondary border-secondary rotate-180'
                                        : 'border-gray-300 group-hover:border-secondary'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                                        className={`w-6 h-6 transition-colors ${expandedModule === module.id ? 'text-white' : 'text-gray-500 group-hover:text-secondary'}`}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Expandable Content */}
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out
                                ${expandedModule === module.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
                            `}>
                                <div className="px-8 pb-8 pt-0 border-t border-gray-100">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-8">

                                        {/* Image Section (New) */}
                                        <div className="lg:col-span-4 relative h-64 lg:h-auto rounded-2xl overflow-hidden shadow-lg">
                                            <Image
                                                src={module.image}
                                                alt={module.title}
                                                fill
                                                className="object-cover transition-transform duration-700 hover:scale-105"
                                            />
                                            <div className={`absolute inset-0 bg-gradient-to-t ${module.color} opacity-60 mix-blend-multiply`} />
                                        </div>

                                        {/* Content Columns */}
                                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Target & Content */}
                                            <div className="space-y-8">
                                                <div>
                                                    <h4 className="text-sm font-bold uppercase tracking-wider text-secondary mb-4">Pour qui ?</h4>
                                                    <p className="text-gray-600 leading-relaxed">{module.target}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold uppercase tracking-wider text-secondary mb-4">Contenu</h4>
                                                    <ul className="space-y-2">
                                                        {module.content.map((item, idx) => (
                                                            <li key={idx} className="flex items-start gap-3 text-gray-600">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-secondary shrink-0 mt-1">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                                </svg>
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Objective & Result */}
                                            <div className="space-y-8 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="text-sm font-bold uppercase tracking-wider text-secondary mb-4">Objectif</h4>
                                                    <p className="text-gray-800 font-medium leading-relaxed">{module.objective}</p>
                                                </div>

                                                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Résultat attendu</span>
                                                    <p className="text-lg text-primary font-bold leading-relaxed">{module.result}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* CTA Row */}
                                    <div className="flex justify-end pt-6 border-t border-gray-100">
                                        <Link
                                            href="/contact"
                                            onClick={(e) => e.stopPropagation()}
                                            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 shadow-md hover:shadow-xl bg-gradient-to-r ${module.color}`}
                                        >
                                            {module.cta}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
