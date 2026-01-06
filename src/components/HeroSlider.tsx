"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SLIDES = [
    {
        id: 1,
        title: <>Pilotez vos financess dans Odoo avec <span className="text-secondary">clarté, méthode et sérénité.</span></>,
        subtitle: "Nous structurons, sécurisons et optimisons votre département financier dans Odoo — sans remplacer votre équipe, sans faire votre comptabilité.",
        location: "Bruxelles & Marrakech",
        benefit: "Moins de tensions. Plus de clarté. Un pilotage enfin maîtrisé.",
        ctaPrimary: "Demander un diagnostic Odoo Finances",
        ctaPrimaryLink: "/contact",
        ctaSecondary: "Parler à un consultant MSL",
        ctaSecondaryLink: "/contact",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2664&auto=format&fit=crop",
        color: "text-primary"
    },
    {
        id: 2,
        title: "Une méthode éprouvée pour structurer votre croissance.",
        subtitle: "P.I.L.O.T.E.R. : Notre approche unique pour transformer votre département financier en un véritable partenaire stratégique.",
        location: "Expertise & Proximité",
        benefit: "Audit. Configuration. Formation. Un accompagnement de A à Z.",
        ctaPrimary: "Découvrir la méthode P.I.L.O.T.E.R.",
        ctaPrimaryLink: "/methode",
        ctaSecondary: "Nos solutions",
        ctaSecondaryLink: "/solutions",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
        color: "text-secondary"
    },
    {
        id: 3,
        title: "Maîtrisez la puissance d'Odoo Finances sans la complexité.",
        subtitle: "Des tableaux de bord précis, une comptabilité fluide et des processus automatisés pour vous concentrer sur l'essentiel : votre business.",
        location: "Intégration sur mesure",
        benefit: "Gagnez du temps. Réduisez les erreurs. Prenez les bonnes décisions.",
        ctaPrimary: "Voir nos ressources",
        ctaPrimaryLink: "/ressources",
        ctaSecondary: "Pourquoi MSL ?",
        ctaSecondaryLink: "/about",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        color: "text-primary"
    }
];

export default function HeroSlider() {
    const [active, setActive] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const container = useRef<HTMLDivElement>(null);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        slideRefs.current.forEach((slide, i) => {
            if (i !== active) {
                gsap.set(slide, { autoAlpha: 0, zIndex: 0 });
            } else {
                gsap.set(slide, { autoAlpha: 1, zIndex: 10 });
            }
        });
    }, { scope: container });

    // Autoplay Effect
    const changeSlide = (nextIndex: number) => {
        if (nextIndex === active) return;

        const currentSlide = slideRefs.current[active];
        const nextSlide = slideRefs.current[nextIndex];
        const currentImg = imageRefs.current[active];
        const nextImg = imageRefs.current[nextIndex];
        const nextText = textRefs.current[nextIndex];

        const tl = gsap.timeline({
            onComplete: () => setActive(nextIndex)
        });

        gsap.set(nextSlide, { zIndex: 10, autoAlpha: 1 });
        gsap.set(currentSlide, { zIndex: 1 });

        gsap.set(nextSlide, { clipPath: "inset(0 100% 0 0)" });
        gsap.set(nextImg, { scale: 1.3, xPercent: 10 });

        tl.to(nextSlide, {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power4.inOut"
        })
            .to(nextImg, {
                scale: 1,
                xPercent: 0,
                duration: 1.8,
                ease: "power2.out"
            }, "<")
            .to(imageRefs.current[active], { // Use ref directly just to be safe
                scale: 1.1,
                xPercent: -10,
                duration: 1.2,
                ease: "power4.inOut"
            }, "<");

        if (nextText) {
            gsap.fromTo(nextText.children,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power3.out", delay: 0.4 }
            );
        }
    };

    // Gestion propre de l'autoplay
    useEffect(() => {
        if (isPaused) return;

        const startAutoplay = () => {
            autoplayRef.current = setInterval(() => {
                const nextIndex = (active + 1) % SLIDES.length;
                changeSlide(nextIndex);
            }, 5000); // 5 secondes
        };

        startAutoplay();

        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [active, isPaused]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        const activeImg = imageRefs.current[active];
        if (activeImg) {
            gsap.to(activeImg, {
                x: xPos,
                y: yPos,
                duration: 1,
                ease: "power2.out"
            });
        }
    };

    return (
        <section
            ref={container}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative h-screen w-full overflow-hidden bg-[#f4f4f4] cursor-default font-sans"
        >
            {SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    ref={(el) => { if (el) slideRefs.current[index] = el; }}
                    className="absolute inset-0 h-full w-full overflow-hidden"
                >
                    {/* Image Layer */}
                    <div className="absolute inset-0 h-full w-full">
                        <Image
                            ref={(el) => { if (el) imageRefs.current[index] = el; }}
                            src={slide.image}
                            alt={typeof slide.title === 'string' ? slide.title : "Slide Image"} // Fallback alt since title is now ReactNode
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        {/* Gradient Layer for Text Visibility - Renforcé pour lisibilité */}
                        <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent backdrop-blur-[2px]" />
                    </div>

                    {/* Content Layer - Left Aligned for "Heia" style */}
                    <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-20 lg:px-32">
                        <div ref={(el) => { if (el) textRefs.current[index] = el; }} className="max-w-3xl space-y-6">

                            {/* Title */}
                            <h2 className={`text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] ${slide.color}`}>
                                {slide.title}
                            </h2>

                            {/* Subtitle */}
                            <p className="text-xl md:text-2xl font-light text-gray-800 max-w-2xl leading-relaxed">
                                {slide.subtitle}
                            </p>

                            {/* Location & Benefit */}
                            <div className="flex flex-col gap-2 text-lg text-gray-700 font-medium opacity-80 box-decoration-slice">
                                <span>{slide.location}</span>
                                <span className="italic font-normal">{slide.benefit}</span>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Link href={slide.ctaPrimaryLink} className="group relative overflow-hidden rounded-full bg-primary px-8 py-4 text-white transition-all hover:scale-105 hover:bg-[#013524] text-center">
                                    <span className="relative z-10 font-medium">{slide.ctaPrimary}</span>
                                </Link>

                                <Link href={slide.ctaSecondaryLink} className="group rounded-full border border-gray-800 px-8 py-4 text-gray-900 transition-all hover:bg-gray-900 hover:text-white text-center">
                                    <span className="font-medium">{slide.ctaSecondary}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation */}
            <div className="absolute bottom-12 left-1/2 z-30 flex -translate-x-1/2 gap-4">
                {SLIDES.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => changeSlide(index)}
                        className="group relative flex h-4 w-4 items-center justify-center p-4"
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <div className={`h-2 w-2 rounded-full transition-all duration-500 ease-out border ${active === index ? 'bg-secondary border-secondary scale-150' : 'bg-transparent border-gray-800 hover:bg-gray-400'}`} />
                    </button>
                ))}
            </div>
        </section>
    );
}
