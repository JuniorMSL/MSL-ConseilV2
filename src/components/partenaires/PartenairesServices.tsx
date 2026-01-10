"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        num: "01",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
        title: "Avant-vente & cadrage fonctionnel",
        description: "Nous accompagnons vos équipes commerciales et projets pour sécuriser le périmètre fonctionnel Odoo Finance.",
        image: "/images/partenaires/expert_consulting.png",
        actions: [
            "Participer aux rendez-vous clients",
            "Analyser les processus financiers existants",
            "Échanger avec le DAF ou l'expert-comptable du client",
            "Identifier les spécificités comptables et fiscales",
            "Sécuriser le périmètre fonctionnel Odoo Finance"
        ],
        benefits: [
            "Devis plus justes",
            "Promesses maîtrisées",
            "Clients rassurés",
            "Moins de rework après signature"
        ]
    },
    {
        num: "02",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        title: "Analyse fonctionnelle & paramétrage Finance",
        description: "Nous intervenons directement sur la structuration et la migration comptable vers Odoo.",
        image: "/images/partenaires/finance_analytics.png",
        actions: [
            "Récupération des données depuis l'ancien logiciel comptable",
            "Structuration et migration comptable vers Odoo",
            "Paramétrage du module Comptabilité / Finance",
            "Validation métier des configurations",
            "Tests fonctionnels avant go-live"
        ],
        benefits: [
            "Moins d'allers-retours avec le client",
            "Moins de bugs 'métier' après livraison",
            "Gain de temps pour les développeurs",
            "Projet plus fluide"
        ]
    },
    {
        num: "03",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
        ),
        title: "Formation & adoption post-livraison",
        description: "Nous prenons en charge la formation des utilisateurs et l'accompagnement à l'adoption réelle d'Odoo.",
        image: "/images/partenaires/training_session.png",
        actions: [
            "Formation des utilisateurs finance",
            "Formation des équipes internes du client",
            "Documentation des processus financiers",
            "Accompagnement à l'adoption réelle d'Odoo"
        ],
        benefits: [
            "Moins de tickets support",
            "Clients plus autonomes",
            "Meilleure satisfaction",
            "Meilleure réputation long terme"
        ]
    }
];

export default function PartenairesServices() {
    const container = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Image Parallax
            const images = gsap.utils.toArray<HTMLElement>(".service-image");
            images.forEach((img) => {
                gsap.to(img.querySelector("img"), {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

            // Content Reveal
            const contents = gsap.utils.toArray<HTMLElement>(".service-content");
            contents.forEach((content) => {
                gsap.fromTo(content,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: content,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="w-full bg-white overflow-hidden py-20">
            {/* Section Header */}
            <div className="max-w-6xl mx-auto px-6 text-center mb-20">
                <span className="flex items-center justify-center gap-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    Ce que nous apportons
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-primary mb-6">
                    Concrètement à vos projets
                </h2>
            </div>

            {/* Services Grid */}
            {SERVICES.map((service, i) => (
                <div key={i} className="group relative w-full py-24 border-b border-gray-100 last:border-none">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                        {/* Image Column - ZigZag */}
                        <div className={`service-image relative h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-70" />

                            {/* Floating Number */}
                            <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <span className="text-secondary font-bold font-serif text-lg">{service.num}</span>
                            </div>

                            {/* Icon Badge */}
                            <div className="absolute bottom-8 right-8 w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary shadow-lg">
                                {service.icon}
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className={`service-content ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                            <h3 className="text-3xl md:text-4xl font-serif text-primary mb-6">{service.title}</h3>
                            <p className="text-gray-500 text-lg leading-relaxed mb-8">{service.description}</p>

                            {/* Actions List */}
                            <div className="mb-10">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Ce que nous faisons</h4>
                                <ul className="space-y-3">
                                    {service.actions.map((action, j) => (
                                        <li key={j} className="flex items-start gap-3 text-gray-600">
                                            <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                            {action}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Benefits Box */}
                            <div className="p-8 rounded-2xl bg-primary">
                                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-secondary mb-6">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                    Bénéfices intégrateur
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {service.benefits.map((benefit, j) => (
                                        <div key={j} className="flex items-center gap-3 text-white">
                                            <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-sm font-medium">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
