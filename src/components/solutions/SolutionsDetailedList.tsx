"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SOLUTIONS = [
    {
        id: 1,
        title: "Odoo Finances",
        subtitle: "Sur Mesure",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop",
        before: ["Données dispersées", "Erreurs fréquentes", "Clôture lente"],
        after: ["Flux centralisés", "Automatisation", "Chiffres fiables"],
        actions: ["Analyse complète", "Paramétrage précis", "Documentation"],
        color: "#fe981a" // secondary
    },
    {
        id: 2,
        title: "Pilotage",
        subtitle: "Financier",
        image: "https://images.unsplash.com/photo-1543286386-713df548e9cc?q=80&w=2670&auto=format&fit=crop",
        before: ["Décisions intuitives", "Vision limitée", "Retards d'analyse"],
        after: ["Indicateurs temps réel", "Décisions éclairées", "Vision complète"],
        actions: ["Tableaux de bord", "KPIs stratégiques", "Rapports auto"],
        color: "#025239" // primary
    },
    {
        id: 3,
        title: "Automatisation",
        subtitle: "Processus",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
        before: ["Tâches manuelles", "Risque d'erreurs", "Perte de temps"],
        after: ["Processus sécurisés", "Alertes auto", "Flux synchronisés"],
        actions: ["Saisie auto", "Notifications", "Optimisation flux"],
        color: "#fe981a"
    },
    {
        id: 4,
        title: "Contrôle",
        subtitle: "de Gestion",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        before: ["Pas de suivi coûts", "Marges floues", "Décisions approx."],
        after: ["Vision marges", "Suivi temps réel", "Stratégie fiable"],
        actions: ["Suivi budgétaire", "Centres de coûts", "Reporting projet"],
        color: "#025239"
    },
    {
        id: 5,
        title: "DAF",
        subtitle: "Expert",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop",
        before: ["Pas d'expertise", "Risque stratégique", "Solitude dirigeant"],
        after: ["Expertise ponctuelle", "Support clôture", "Accompagnement"],
        actions: ["Décisions clés", "Clôtures annuelles", "Coordination équipe"],
        color: "#fe981a"
    },
    {
        id: 6,
        title: "Formation",
        subtitle: "& Adoption",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop",
        before: ["Équipes perdues", "Productivité faible", "Rejet outil"],
        after: ["Maîtrise totale", "Productivité max", "Adhésion équipe"],
        actions: ["Ateliers pratiques", "Guides clairs", "Suivi post-form"],
        color: "#025239"
    },
    {
        id: 7,
        title: "Digitalisation",
        subtitle: "Connectée",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
        before: ["Silos étanches", "finances isolée", "Manque coord."],
        after: ["Flux connectés", "finances intégrée", "Transparence"],
        actions: ["Analyse flux", "Connexion API", "Automatisation globale"],
        color: "#fe981a"
    }
];

export default function SolutionsDetailedList() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {

        SOLUTIONS.forEach((_, index) => {
            const row = `.solution-row-${index}`;

            ScrollTrigger.create({
                trigger: row,
                start: "top 85%",
                onEnter: () => {
                    gsap.fromTo(`${row} .reveal-img`,
                        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
                        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.2, ease: "power4.out" }
                    );
                    gsap.to(`${row} .reveal-text`, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" });
                }
            });
        });

    }, { scope: container });

    return (
        <section ref={container} className="bg-white text-primary">
            {SOLUTIONS.map((solution, index) => (
                <div key={solution.id} className={`solution-row-${index} min-h-[90vh] flex flex-col md:flex-row items-center border-b border-gray-100 overflow-hidden`}>

                    {/* Image Section - Alternating Order */}
                    <div className={`w-full md:w-1/2 h-[50vh] md:h-[90vh] relative p-4 md:p-8 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                        <div className="reveal-img relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={solution.image}
                                alt={solution.title}
                                fill
                                className="object-cover transition-transform duration-[2s] hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-primary/10" />

                            {/* Floating Number */}
                            <div className="absolute top-8 left-8 text-8xl md:text-[10rem] font-bold font-serif text-white/40 leading-none mix-blend-overlay">
                                0{solution.id}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className={`w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                        <h2 className="reveal-text opacity-0 translate-y-10 text-4xl md:text-6xl font-serif mb-2 text-primary">
                            {solution.title}
                        </h2>
                        <h3 className="reveal-text opacity-0 translate-y-10 text-3xl md:text-5xl font-serif italic text-secondary mb-12">
                            {solution.subtitle}
                        </h3>

                        {/* Comparison Grid */}
                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div className="reveal-text opacity-0 translate-y-10 space-y-4">
                                <div className="flex items-center gap-2 text-gray-400 uppercase tracking-widest text-xs font-bold mb-4">
                                    <span className="w-2 h-2 rounded-full bg-gray-300" /> Avant
                                </div>
                                {solution.before.map((item, i) => (
                                    <p key={i} className="text-gray-500 text-sm md:text-base border-l border-gray-200 pl-4">
                                        {item}
                                    </p>
                                ))}
                            </div>
                            <div className="reveal-text opacity-0 translate-y-10 space-y-4">
                                <div className="flex items-center gap-2 text-secondary uppercase tracking-widest text-xs font-bold mb-4">
                                    <span className="w-2 h-2 rounded-full bg-secondary" /> Après
                                </div>
                                {solution.after.map((item, i) => (
                                    <p key={i} className="text-primary text-sm md:text-base font-medium border-l border-secondary pl-4">
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Actions Tags */}
                        <div className="reveal-text opacity-0 translate-y-10">
                            <div className="flex flex-wrap gap-3">
                                {solution.actions.map((action, i) => (
                                    <span key={i} className="px-4 py-2 rounded-full border border-gray-200 text-xs text-gray-600 uppercase tracking-wider hover:border-secondary hover:text-secondary transition-colors duration-300 bg-gray-50">
                                        {action}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            ))}
        </section>
    );
}
