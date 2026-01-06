"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ResourcesHero() {
    const container = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        // Parallax background
        gsap.to(".hero-bg-image", {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        const tl = gsap.timeline();

        tl.fromTo(".res-title",
            { y: 100, opacity: 0, rotateX: -20 },
            { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: "power4.out", stagger: 0.1 }
        )
            .fromTo(".res-subtitle",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                "-=0.6"
            )
            .fromTo(".res-cta",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
                "-=0.4"
            );

    }, { scope: container });

    return (
        <section ref={container} className="relative h-[90vh] min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-white">

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop"
                    alt="Resources Abstract"
                    fill
                    className="hero-bg-image object-cover scale-110 opacity-20"
                    priority
                />
                {/* White Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10 px-6 text-center">
                <div className="mb-4 flex justify-center overflow-hidden">
                    <span className="res-title inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-xs uppercase tracking-widest font-bold">
                        Ressources & Outils
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-primary mb-8 leading-[1.1]">
                    <span className="block overflow-hidden"><span className="res-title block">Apprenez à piloter</span></span>
                    <span className="block overflow-hidden"><span className="res-title block text-secondary italic">vos finances simplement</span></span>
                </h1>

                <p className="res-subtitle text-xl md:text-2xl text-gray-500 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                    Guides, articles et outils pratiques pour comprendre, sécuriser et automatiser votre gestion financière avec Odoo.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="res-cta group relative px-8 py-4 bg-primary text-white rounded-full font-bold text-lg overflow-hidden shadow-lg hover:shadow-primary/30 transition-all">
                        <span className="relative z-10 group-hover:text-primary transition-colors duration-300">👉 Télécharger nos guides</span>
                        <div className="absolute inset-0 bg-white transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
                    </button>

                    <button className="res-cta px-8 py-4 bg-white border border-gray-200 text-primary rounded-full font-bold text-lg hover:border-secondary hover:text-secondary transition-all shadow-sm">
                        👉 Consulter nos études de cas
                    </button>
                </div>
            </div>

        </section>
    );
}
