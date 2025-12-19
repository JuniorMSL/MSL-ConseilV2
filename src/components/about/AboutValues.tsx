"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const DIFFERENTIATORS = [
    "Vision 360° : finance + processus + Odoo",
    "Expertise terrain PME belges & marocaines",
    "Méthode simple et orientée résultats",
    "Livrables concrets à chaque étape",
    "Accompagnement humain, pas robot",
    "Fiabilisation avant automatisation"
];

export default function AboutValues() {
    const container = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered reveal for bento items
            gsap.fromTo(".bento-item",
                { y: 50, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".bento-grid",
                        start: "top 75%"
                    }
                }
            );

            // Parallax on map image
            gsap.to(".map-parallax", {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: ".locations-card",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="w-full py-32 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">

                {/* Section Title */}
                <div className="text-center mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-4 block">Qui sommes-nous</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Ce qui fait notre force</h2>
                    <p className="text-gray-500 font-light max-w-xl mx-auto">Une équipe, deux continents, une seule mission : votre clarté financière.</p>
                </div>

                {/* Bento Grid Layout */}
                <div className="bento-grid grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[minmax(200px,auto)]">

                    {/* Large Map Card */}
                    <div className="bento-item locations-card md:col-span-4 md:row-span-2 rounded-[2rem] overflow-hidden relative group">
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                                alt="World Map"
                                fill
                                className="map-parallax object-cover scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col justify-end p-10 text-white">
                            <span className="text-xs uppercase tracking-[0.3em] text-secondary mb-4">Nos Implantations</span>
                            <h3 className="text-3xl md:text-4xl font-serif mb-6">Bruxelles & Marrakech</h3>
                            <p className="text-white/70 max-w-md">
                                Deux implantations stratégiques pour accompagner les PME locales et internationales avec proximité et réactivité.
                            </p>

                            {/* Location Pins */}
                            <div className="absolute top-[30%] left-[25%] w-4 h-4">
                                <span className="absolute inset-0 bg-secondary rounded-full animate-ping opacity-75" />
                                <span className="relative block w-4 h-4 bg-secondary rounded-full" />
                            </div>
                            <div className="absolute top-[45%] left-[22%] w-4 h-4">
                                <span className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" style={{ animationDelay: "0.5s" }} />
                                <span className="relative block w-4 h-4 bg-primary rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Differentiators - Split into 2 cards */}
                    <div className="bento-item md:col-span-2 md:row-span-1 bg-[#050505] border border-white/10 rounded-[2rem] p-8 flex flex-col justify-center hover:shadow-xl transition-shadow">
                        <span className="text-xs uppercase tracking-[0.3em] text-secondary mb-4">Notre Différence</span>
                        <ul className="space-y-3">
                            {DIFFERENTIATORS.slice(0, 3).map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-white text-sm">
                                    <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bento-item md:col-span-2 md:row-span-1 bg-primary rounded-[2rem] p-8 flex flex-col justify-center text-white hover:shadow-xl transition-shadow">
                        <ul className="space-y-3">
                            {DIFFERENTIATORS.slice(3).map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm">
                                    <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Team Quote Card */}
                    <div className="bento-item md:col-span-3 bg-[#050505] rounded-[2rem] p-10 text-white relative overflow-hidden group hover:shadow-xl transition-shadow">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/20 rounded-full blur-[80px] group-hover:bg-secondary/30 transition-colors" />

                        <span className="text-xs uppercase tracking-[0.3em] text-secondary mb-6 block">Notre Équipe</span>
                        <p className="text-2xl md:text-3xl font-serif leading-relaxed mb-6 relative z-10">
                            "Nous parlons le langage des dirigeants, pas celui des techniciens."
                        </p>
                        <p className="text-white/50 text-sm">
                            Une équipe belgo-marocaine d'experts en finance, contrôle de gestion, Odoo et transformation digitale.
                        </p>
                    </div>

                    {/* Stats Card */}
                    <div className="bento-item md:col-span-3 bg-secondary rounded-[2rem] p-10 text-primary flex flex-col justify-center items-center text-center hover:shadow-xl transition-shadow">
                        <div className="text-8xl font-bold font-serif mb-4">20+</div>
                        <p className="text-xl font-medium">Années d'expertise</p>
                        <p className="text-primary/70 text-sm mt-2">Au service de la clarté financière des PME.</p>
                    </div>

                </div>
            </div>
        </section>
    );
}
