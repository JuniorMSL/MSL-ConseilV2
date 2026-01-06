"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SolutionsCTA() {
    const container = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".cta-content",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 80%"
                    }
                }
            );
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="w-full py-32 px-6 bg-white">
            <div className="cta-content max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">

                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />

                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
                        Prêt à transformer vos finances ?
                    </h2>
                    <p className="text-white/70 text-lg mb-12 max-w-xl mx-auto">
                        Discutons de vos besoins et voyons comment MSL peut vous aider à atteindre la clarté financière.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="px-10 py-5 bg-white text-primary rounded-full font-bold uppercase tracking-wider text-xs hover:bg-secondary transition-colors duration-300 shadow-xl hover:scale-105">
                            Demander votre diagnostic Odoo Finances
                        </button>
                        <button className="px-10 py-5 border border-white/20 text-white rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/10 transition-colors duration-300">
                            Parler à un consultant MSL
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
