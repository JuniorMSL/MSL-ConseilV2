"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        id: 1,
        number: "01",
        title: "Mise en place Odoo",
        description: "Optimisation financière sur Odoo pour une structure fiable.",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
        size: "small"
    },
    {
        id: 2,
        number: "02",
        title: "Automatisation",
        description: "Des processus finances fluides et sans tâches manuelles inutiles.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
        size: "large"
    },
    {
        id: 3,
        number: "03",
        title: "Contrôle de gestion",
        description: "Analysez vos performances avec précision.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        size: "medium"
    },
    {
        id: 4,
        number: "04",
        title: "DAF à temps partiel",
        description: "Direction financière expérimentée à la demande.",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
        size: "medium"
    },
    {
        id: 5,
        number: "05",
        title: "Formation interne",
        description: "Structuration et montée en compétence de votre équipe.",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
        size: "small"
    },
    {
        id: 6,
        number: "NON",
        title: "Ce que nous NE faisons pas",
        description: "Tenue comptable, Encodage factures, Clôtures complètes, Mission fiduciaire.",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
        size: "large"
    }
];

export default function AboutServices() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo(".service-card",
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 70%"
                }
            }
        );
    }, { scope: container });

    return (
        <section ref={container} className="relative w-full bg-primary text-white py-24 px-6 md:px-12 overflow-hidden">

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Column - About Text */}
                <div className="lg:col-span-4 flex flex-col justify-center">
                    <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4">
                        Notre rôle
                    </span>

                    <h2 className="text-3xl md:text-4xl font-serif italic leading-tight mb-6">
                        Nous interprétons,<br />
                        nous n’exécutons pas.
                    </h2>

                    <p className="text-white/80 text-lg leading-relaxed mb-4">
                        Vous avez un expert-comptable. <br />
                        <span className="text-secondary font-semibold">Nous avons un autre rôle.</span>
                    </p>

                    <p className="text-white/70 text-base leading-relaxed mb-6">
                        Comme un laboratoire produit des résultats, l’expert-comptable produit les données.
                        Comme un médecin analyse les résultats, nous interprétons, expliquons et guidons vos décisions.
                    </p>

                    <ul className="text-white/80 space-y-2 mb-8 font-medium">
                        <li className="flex items-center gap-2">
                            <span className="text-secondary">•</span> Comprendre
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-secondary">•</span> Piloter
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-secondary">•</span> Optimiser
                        </li>
                    </ul>

                    <p className="text-white/60 text-sm italic mb-10 border-l-2 border-secondary pl-4 py-1">
                        Nous ne faisons pas votre comptabilité.
                        Si vous avez besoin d’un fiduciaire, nous vous orientons vers notre partenaire <span className="text-white font-semibold">Oddofinances</span>.
                    </p>

                    <div className="flex flex-col sm:flex-col gap-4">
                        <Link href="/contact" className="bg-secondary text-primary font-bold px-8 py-4 rounded-sm hover:bg-secondary/90 transition-colors uppercase tracking-wide text-sm text-center">
                            Obtenez votre plan personnalisé
                        </Link>
                        <Link href="/contact" className="border border-white/30 text-white font-medium px-6 py-3 rounded-sm hover:bg-white hover:text-primary transition-all uppercase tracking-wide text-xs text-center">
                            Réservez votre audit gratuit
                        </Link>
                    </div>
                </div>

                {/* Right Column - Service Cards Grid */}
                <div className="lg:col-span-8">

                    {/* Section Title */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-serif italic text-secondary mb-2">
                            Ce que nous faisons
                        </h3>
                        <p className="text-white/60">— et ce que nous ne faisons pas</p>
                    </div>

                    {/* Fixed Grid Layout - 3 columns, explicit placement */}
                    <div className="grid grid-cols-3 grid-rows-[200px_200px_200px] gap-4">

                        {/* Card 1 - Top Left (small) */}
                        <div className="service-card group relative overflow-hidden rounded-lg cursor-pointer col-start-1 row-start-1">
                            <Image src={SERVICES[0].image} alt={SERVICES[0].title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-secondary/90 transition-colors duration-300" />
                            <div className="absolute inset-0 p-4 flex flex-col justify-end z-10">
                                <span className="text-secondary group-hover:text-primary text-xs font-bold">{SERVICES[0].number}</span>
                                <h4 className="text-white group-hover:text-primary font-medium text-sm mt-1 transition-colors">{SERVICES[0].title}</h4>
                            </div>
                        </div>

                        {/* Card 2 - Center (Large, spans 2 rows) */}
                        <div className="service-card group relative overflow-hidden rounded-lg cursor-pointer col-start-2 row-start-1 row-span-2">
                            <Image src={SERVICES[1].image} alt={SERVICES[1].title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-secondary/90 transition-colors duration-300" />
                            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                                <span className="text-secondary group-hover:text-primary text-sm font-bold">{SERVICES[1].number}</span>
                                <h4 className="text-white group-hover:text-primary font-semibold text-xl mt-1 transition-colors">{SERVICES[1].title}</h4>
                                <p className="text-white/70 group-hover:text-primary/70 text-sm mt-2 transition-colors">{SERVICES[1].description}</p>
                            </div>
                        </div>

                        {/* Card 3 - Top Right (small) */}
                        <div className="service-card group relative overflow-hidden rounded-lg cursor-pointer col-start-3 row-start-1">
                            <Image src={SERVICES[2].image} alt={SERVICES[2].title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-secondary/90 transition-colors duration-300" />
                            <div className="absolute inset-0 p-4 flex flex-col justify-end z-10">
                                <span className="text-secondary group-hover:text-primary text-xs font-bold">{SERVICES[2].number}</span>
                                <h4 className="text-white group-hover:text-primary font-medium text-sm mt-1 transition-colors">{SERVICES[2].title}</h4>
                            </div>
                        </div>

                        {/* Card 4 - Middle Left (small) */}
                        <div className="service-card group relative overflow-hidden rounded-lg cursor-pointer col-start-1 row-start-2">
                            <Image src={SERVICES[3].image} alt={SERVICES[3].title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-secondary/90 transition-colors duration-300" />
                            <div className="absolute inset-0 p-4 flex flex-col justify-end z-10">
                                <span className="text-secondary group-hover:text-primary text-xs font-bold">{SERVICES[3].number}</span>
                                <h4 className="text-white group-hover:text-primary font-medium text-sm mt-1 transition-colors">{SERVICES[3].title}</h4>
                            </div>
                        </div>

                        {/* Card 5 - Middle Right (small) */}
                        <div className="service-card group relative overflow-hidden rounded-lg cursor-pointer col-start-3 row-start-2">
                            <Image src={SERVICES[4].image} alt={SERVICES[4].title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-secondary/90 transition-colors duration-300" />
                            <div className="absolute inset-0 p-4 flex flex-col justify-end z-10">
                                <span className="text-secondary group-hover:text-primary text-xs font-bold">{SERVICES[4].number}</span>
                                <h4 className="text-white group-hover:text-primary font-medium text-sm mt-1 transition-colors">{SERVICES[4].title}</h4>
                            </div>
                        </div>

                        {/* Card 6 - Bottom (Wide, spans 2 columns) */}
                        <div className="service-card group relative overflow-hidden rounded-lg cursor-pointer col-start-1 col-span-2 row-start-3">
                            <Image src={SERVICES[5].image} alt={SERVICES[5].title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-secondary/90 transition-colors duration-300" />
                            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                                <span className="text-secondary group-hover:text-primary text-sm font-bold">{SERVICES[5].number}</span>
                                <h4 className="text-white group-hover:text-primary font-semibold text-lg mt-1 transition-colors">{SERVICES[5].title}</h4>
                                <p className="text-white/70 group-hover:text-primary/70 text-sm mt-1 transition-colors">{SERVICES[5].description}</p>
                            </div>
                        </div>

                    </div>              </div>

            </div>
        </section >
    );
}
