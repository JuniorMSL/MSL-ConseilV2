"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
    {
        id: 1,
        title: "Une double expertise rare : Odoo + métier comptable",
        description: "+20 ans en fiduciaire + maîtrise d’Odoo Finances Des conseils réalistes, conformes, et directement applicables à votre quotidien.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Zéro risque pour votre équipe",
        description: "Nous ne remplaçons pas vos collaborateurs — nous les faisons monter en compétence. Résultat : plus d’autonomie, moins de dépendance, et aucune surcharge.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Une méthode claire : P.I.L.O.T.E.R.™",
        description: "Une approche structurée pour transformer votre gestion financière : Sécurité, automatisation, visibilité, pilotage maîtrisé.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Un accompagnement de proximité",
        description: "Nous travaillons à vos côtés, pas au-dessus de vos équipes. Humain, accessible, impliqué : notre accompagnement est autant humain que technique.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Des formations concrètes et sur-mesure",
        description: "Pas de théorie inutile. Des ateliers pratiques, conçus pour vos outils, vos données, vos enjeux réels.",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 6,
        title: "Une vision stratégique orientée résultats",
        description: "Vos données deviennent des décisions. Vous gagnez en clarté, en réactivité, en fiabilité.",
        image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=2070&auto=format&fit=crop"
    }
];

export default function SixReasons() {
    const container = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section ref={container} className="relative w-full bg-white text-primary py-32 px-6 md:px-12 lg:px-24 overflow-hidden">

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">

                {/* Left: Dynamic Image Display */}
                <div className="flex-1 w-full relative flex flex-col items-center justify-center">

                    {/* Background Circle Decoration */}
                    <div className="absolute w-[500px] h-[500px] bg-gray-100 rounded-full -z-10 blur-3xl" />

                    {/* Image Container with Phone/Device Mockup Feel */}
                    <div className="relative w-full max-w-[400px] aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white bg-gray-200">
                        {REASONS.map((item, index) => (
                            <Image
                                key={item.id}
                                src={item.image}
                                alt={item.title}
                                fill
                                className={`object-cover transition-opacity duration-700 ease-in-out ${activeIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                                    }`}
                                priority={index === 0}
                            />
                        ))}

                        {/* Overlay Gradient for Text Readability if we added text over image (optional) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Result Text Below Image */}
                    <div className="mt-10 max-w-[420px] text-center px-6 py-8 bg-gradient-to-br from-white/80 to-gray-50/90 backdrop-blur-sm rounded-3xl border border-secondary/20 shadow-xl shadow-secondary/5 relative overflow-hidden">

                        {/* Decorative accent */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full" />

                        {/* Icon */}
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 mb-4">
                            <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <p className="text-2xl font-bold text-primary mb-4 tracking-tight">Résultat</p>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            Un service financier structuré, des équipes autonomes, un pilotage fiable.
                        </p>
                        <p className="text-base text-gray-500 italic font-medium">
                            Sans stress. Sans complexité. Sans perte de temps.
                        </p>

                        {/* Bottom decorative dots */}
                        <div className="flex items-center justify-center gap-2 mt-6">
                            <span className="w-2 h-2 rounded-full bg-secondary/60" />
                            <span className="w-2 h-2 rounded-full bg-secondary/40" />
                            <span className="w-2 h-2 rounded-full bg-secondary/20" />
                        </div>
                    </div>
                </div>

                {/* Right: Interactive List */}
                <div className="flex-1 w-full pl-0 lg:pl-10">
                    <div className="mb-12">
                        <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Pourquoi nous choisir ?</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
                            6 Raisons de choisir <br />
                            <span className="italic text-secondary">MSL Conseils</span>
                        </h2>
                        <p className="mt-6 text-gray-500 text-lg">
                            Pour piloter vos financess dans Odoo avec clarté, méthode et sérénité.
                        </p>
                    </div>

                    {/* List Items */}
                    <div className="relative flex flex-col">

                        {/* Vertical Line Indicator */}
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-200">
                            <div
                                className="absolute w-[2px] bg-secondary transition-all duration-500 ease-in-out"
                                style={{
                                    height: `${100 / REASONS.length}%`,
                                    top: `${(activeIndex * 100) / REASONS.length}%`
                                }}
                            />
                        </div>

                        {REASONS.map((item, index) => (
                            <div
                                key={item.id}
                                onMouseEnter={() => setActiveIndex(index)}
                                className={`
                            relative pl-10 py-6 cursor-pointer transition-all duration-500
                            ${activeIndex === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'}
                        `}
                            >
                                <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${activeIndex === index ? 'text-primary' : 'text-gray-400'}`}>
                                    {item.title}
                                </h3>

                                <div
                                    className={`
                                overflow-hidden transition-all duration-500 ease-in-out
                                ${activeIndex === index ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'}
                            `}
                                >
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
