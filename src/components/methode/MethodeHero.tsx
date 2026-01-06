"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function MethodeHero() {
    const container = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".hero-animate",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
            );
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative w-full min-h-[85vh] flex flex-col justify-center items-center bg-[#001F15] text-white px-6 overflow-hidden">

            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0 opacity-50">
                <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
                    alt="Methode Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#001F15]/80 via-[#001F15]/60 to-[#001F15]" />

            <div className="relative z-10 max-w-5xl text-center mt-20">
                <span className="hero-animate block text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6">Page Méthode — MSL Conseils</span>

                <h1 className="hero-animate text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-tight">
                    Vos finances sous <br />
                    <span className="text-secondary italic">contrôle. Enfin.</span>
                </h1>

                <p className="hero-animate text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-3xl mx-auto mb-12">
                    Oubliez les chiffres flous et les process manuels. Avec <strong className="text-white font-medium">P.I.L.O.T.E.R.</strong>, vos finances deviennent automatisées, sécurisées et lisibles en un coup d’œil.
                    <span className="block mt-4 text-secondary font-medium">
                        Moins de stress, plus de maîtrise, plus de temps pour développer votre entreprise.
                    </span>
                </p>

                {/* <div className="hero-animate flex flex-col sm:flex-row gap-5 justify-center">
                    <button className="px-8 py-4 bg-secondary text-primary rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white transition-colors duration-300 shadow-xl hover:scale-105">
                        Découvrir la méthode
                    </button>
                </div> */}
            </div>

            {/* Scroll Indicator */}
            {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hero-animate opacity-70">
                <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
            </div> */}
        </section>
    );
}
