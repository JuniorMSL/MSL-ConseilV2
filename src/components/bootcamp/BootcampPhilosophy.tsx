"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BootcampPhilosophy() {
    const container = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 70%",
            }
        });

        // 1. Reveal du titre par ligne (effet masque)
        tl.from(".line-span", {
            y: 110,
            rotateZ: 4,
            duration: 1.5,
            stagger: 0.15,
            ease: "power4.out"
        })
            .from(".philosophy-label", {
                width: 0,
                duration: 1,
                ease: "expo.inOut"
            }, "-=1");

        // 2. Révélation de l'image avec Clip-path (très Awwwards)
        gsap.fromTo(imageRef.current,
            { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" },
            {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1.8,
                ease: "expo.inOut",
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 80%",
                }
            }
        );

        // 3. Parallaxe sur le texte de fond de la citation
        gsap.to(".bg-floating-text", {
            xPercent: -20,
            scrollTrigger: {
                trigger: ".philosophy-quote",
                scrub: 1,
            }
        });

    }, { scope: container });

    return (
        <section ref={container} className="relative w-full bg-white py-32 lg:py-48 px-6 md:px-12 overflow-hidden text-primary">

            {/* Grain Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="max-w-[1400px] mx-auto">

                {/* Header Section */}
                <div className="mb-32">
                    <div className="flex items-center gap-6 mb-12">
                        <div className="philosophy-label h-[1px] bg-secondary w-24" />
                        <span className="text-secondary font-medium tracking-[0.4em] uppercase text-[10px]">
                            Philosophie Opérationnelle
                        </span>
                    </div>

                    <h2 className="text-6xl md:text-8xl lg:text-[120px] font-serif leading-[0.85] tracking-tighter italic text-primary">
                        <div className="overflow-hidden h-[1.1em] mb-2">
                            <span className="line-span block">Qu'est-ce qu'un</span>
                        </div>
                        <div className="overflow-hidden h-[1.1em] text-secondary">
                            <span className="line-span block font-light">bootcamp MSL ?</span>
                        </div>
                    </h2>
                </div>

                {/* Main Content: Split Editorial Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-40">

                    {/* Left: Interactive Visual */}
                    <div className="lg:col-span-7 relative">
                        <div ref={imageRef} className="relative aspect-[4/5] md:aspect-video lg:aspect-[4/5] w-full overflow-hidden rounded-sm shadow-xl shadow-primary/5">
                            <Image
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop"
                                alt="Bootcamp MSL"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110"
                                unoptimized
                            />
                        </div>
                        {/* Overlay Card Float */}
                        <div className="absolute -bottom-10 -right-6 md:right-10 bg-secondary p-8 md:p-12 max-w-sm shadow-2xl shadow-primary/10">
                            <h4 className="text-primary font-bold uppercase tracking-tighter text-2xl mb-4">L'immersion totale</h4>
                            <p className="text-primary/80 leading-relaxed font-medium">
                                Un bootcamp est une formation courte, intensive et immersive, conçue pour acquérir rapidement des compétences pratiques et directement applicables.
                            </p>
                        </div>
                    </div>

                    {/* Right: Modern List / Approach */}
                    <div className="lg:col-span-5 pt-12">
                        <div className="space-y-16">
                            <div>
                                <span className="text-primary/40 text-xs font-bold uppercase tracking-widest block mb-6">01. Notre Approche</span>
                                <p className="text-2xl md:text-3xl font-light leading-snug text-primary/90">
                                    Chez MSL Conseils, le bootcamp n’est <span className="text-secondary italic">ni académique, ni théorique, ni standardisé</span>.
                                </p>
                            </div>

                            <div className="border-t border-primary/10 pt-8">
                                <span className="text-primary/40 text-xs font-bold uppercase tracking-widest block mb-6">02. La Méthode</span>
                                <p className="text-xl md:text-2xl leading-relaxed text-primary/80 font-medium">
                                    C’est un outil de transformation opérationnelle, centré sur la <span className="text-primary font-bold">finances</span>, la <span className="text-primary font-bold">gestion</span> et la <span className="text-primary font-bold">digitalisation</span> dans Odoo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The "Power Quote" Section */}
                <div className="philosophy-quote relative py-40 flex justify-center items-center">
                    <span className="bg-floating-text absolute whitespace-nowrap text-[15vw] font-serif font-black opacity-[0.03] select-none uppercase text-primary">
                        Transformation Digitale Performance
                    </span>

                    <div className="relative z-10 max-w-4xl text-center">
                        <div className="w-px h-24 bg-secondary mx-auto mb-12" />
                        <blockquote className="text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.2] text-primary">
                            "On n’apprend pas <span className="text-secondary">“Odoo”</span>. On apprend à <span className="underline decoration-secondary/30 underline-offset-8">structurer</span>, <span className="underline decoration-secondary/30 underline-offset-8">automatiser</span> et <span className="underline decoration-secondary/30 underline-offset-8">piloter</span> l’entreprise avec Odoo."
                        </blockquote>
                    </div>
                </div>

                {/* Final Statement Card */}
                <div className="relative bg-gray-50 border border-primary/5 p-12 md:p-24 rounded-sm flex flex-col md:flex-row gap-12 items-center overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32" />

                    <div className="text-[80px] leading-none font-serif text-secondary/20 font-bold shrink-0">
                        J+1
                    </div>

                    <div className="relative z-10">
                        <p className="text-2xl md:text-3xl font-medium leading-tight text-primary">
                            Nos bootcamps sont pensés pour produire des résultats <span className="italic text-secondary">dès la fin de la formation</span>, sur vos propres données, vos processus et vos équipes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}