"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CASES = [
    {
        kpi: "40%",
        label: "de tâches manuelles en moins",
        context: "PME Industrielle",
        desc: "PME ayant réduit 40% de leurs tâches manuelles."
    },
    {
        kpi: "30%",
        label: "Clôture accélérée",
        context: "Société de Conseil",
        desc: "Clôture mensuelle accélérée de 30%."
    },
    {
        kpi: "ROI",
        label: "Rapide",
        context: "E-commerce",
        desc: "Retour sur investissement rapide avec Odoo Finances."
    }
];

export default function ResourceCaseStudies() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo(".case-card",
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 75%"
                }
            }
        );
    }, { scope: container });

    return (
        <section ref={container} className="w-full py-24 px-6 md:px-12 bg-gray-900 text-white overflow-hidden relative">

            {/* Background Details */}
            <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
            <div className="absolute top-0 left-1/4 w-px h-full bg-white/5" />
            <div className="absolute top-0 right-1/4 w-px h-full bg-white/5" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16">
                    <span className="text-secondary font-bold uppercase tracking-widest text-xs mb-2 block">Impact réel</span>
                    <h2 className="text-3xl md:text-5xl font-serif">Mini Études de Cas</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {CASES.map((item, i) => (
                        <div key={i} className="case-card bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                            <div className="text-xs text-white/40 uppercase tracking-widest mb-6 font-mono">{item.context}</div>

                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-5xl font-bold text-white tracking-tighter">{item.kpi}</span>
                                <span className="text-sm font-medium text-secondary">{item.label}</span>
                            </div>

                            <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>

                            {/* Sparkline decoration */}
                            <div className="mt-8 h-8 w-full opacity-30">
                                <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
                                    <path d={`M0,20 Q${20 + i * 10},5 ${50},15 T100,0`} fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Avant / Après */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden text-center">
                    <div className="bg-gray-900/50 p-12 backdrop-blur hover:bg-red-900/10 transition-colors">
                        <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-xs font-bold uppercase mb-4">Avant</span>
                        <p className="text-white/60 font-light">Processus manuels, erreurs fréquentes</p>
                    </div>
                    <div className="bg-gray-900/50 p-12 backdrop-blur hover:bg-green-900/10 transition-colors">
                        <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase mb-4">Après</span>
                        <p className="text-white font-medium">Processus automatisés, données fiables, dirigeants confiants</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
