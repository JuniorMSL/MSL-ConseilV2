"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BootcampHero() {
    const container = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Title reveal with split effect
        tl.fromTo(titleRef.current,
            { y: 100, opacity: 0, clipPath: "inset(100% 0 0 0)" },
            { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "power4.out" }
        )
            .fromTo(taglineRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.8"
            )
            .fromTo(".hero-cta",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
                "-=0.5"
            );

        // Parallax image effect
        gsap.to(imageRef.current, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

    }, { scope: container });

    return (
        <section
            ref={container}
            className="relative min-h-screen w-full overflow-hidden bg-primary"
        >
            {/* Background Image with Parallax */}
            <div className="absolute inset-0 overflow-hidden">
                <div ref={imageRef} className="absolute inset-0 h-[120%] -top-[10%]">
                    <Image
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
                        alt="Formation Bootcamp MSL Conseils"
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                </div>
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center min-h-screen px-8 md:px-20 lg:px-32 py-32">
                <div className="max-w-4xl">
                    {/* Badge */}
                    <div className="mb-8 overflow-hidden">
                        <span className="inline-flex items-center gap-3 text-secondary font-bold uppercase tracking-[0.3em] text-xs">
                            <span className="h-px w-12 bg-secondary" />
                            Formation Intensive
                        </span>
                    </div>

                    {/* Title */}
                    <h1
                        ref={titleRef}
                        className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.95] mb-8"
                    >
                        Bootcamps <br />
                        <span className="italic text-secondary">MSL Conseils</span>
                    </h1>

                    {/* Tagline */}
                    <p
                        ref={taglineRef}
                        className="text-2xl md:text-3xl lg:text-4xl font-light text-white/90 leading-relaxed mb-12 max-w-2xl"
                    >
                        Se former <span className="text-secondary font-medium">vite</span>.
                        Appliquer <span className="text-secondary font-medium">immédiatement</span>.
                        Performer <span className="text-secondary font-medium">durablement</span>.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link
                            href="/contact"
                            className="hero-cta group relative overflow-hidden rounded-full bg-secondary px-10 py-5 text-center"
                        >
                            <span className="relative z-10 font-semibold text-white group-hover:text-primary transition-colors duration-300">
                                Construire mon bootcamp
                            </span>
                            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </Link>

                        <Link
                            href="#modules"
                            className="hero-cta group rounded-full border-2 border-white/30 px-10 py-5 text-white text-center hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                        >
                            <span className="font-medium">Découvrir les modules</span>
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                {/* <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60">
                    <span className="text-white text-xs uppercase tracking-[0.2em]">Découvrir</span>
                    <div className="w-px h-16 bg-gradient-to-b from-white to-transparent animate-pulse" />
                </div> */}
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        </section>
    );
}
