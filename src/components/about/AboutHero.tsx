"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function AboutHero() {
    const container = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".reveal-text",
                { y: 100, opacity: 0, rotateX: 15 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power3.out",
                }
            );

            gsap.fromTo(
                ".image-reveals",
                { scale: 1.2, opacity: 0 },
                { scale: 1, opacity: 0.3, duration: 2, ease: "power2.out" }
            );
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={container}
            className="w-full min-h-[90vh] flex flex-col justify-center items-center bg-[#050505] text-white relative px-6 md:px-12 overflow-hidden"
        >
            {/* Background Image - High-end Office / Abstract */}
            <div className="absolute inset-0 z-0 select-none">
                <Image
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
                    alt="Office Background"
                    fill
                    className="image-reveals object-cover grayscale opacity-30"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/30 z-10" />
            </div>

            <div className="relative z-20 max-w-5xl text-center space-y-12 mt-20">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] tracking-tight">
                    <span className="reveal-text block">Nous aidons les PME à</span>
                    <span className="reveal-text block">piloter leurs financess avec</span>
                    <span className="reveal-text block text-secondary italic">clarté et sérénité.</span>
                </h1>

                <p className="reveal-text max-w-2xl mx-auto text-lg md:text-xl text-white/70 font-light leading-relaxed">
                    Basés en Belgique et au Maroc, nous combinons expertise comptable, maîtrise d’Odoo et structuration des processus pour transformer vos chiffres en un véritable système de pilotage.
                </p>

                <div className="reveal-text pt-8 flex justify-center">
                    <div className="w-px h-24 bg-gradient-to-b from-secondary to-transparent" />
                </div>
            </div>
        </section>
    );
}
