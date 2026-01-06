"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 4 Benefits to match the 4-card layout
const BENEFITS = [
    {
        id: 1,
        tag: "Fiabilité",
        title: "Des chiffres fiables et centralisés",
        subtitle: "Vous ne cherchez plus vos données : vous les comprenez.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 2,
        tag: "Autonomie",
        title: "Une équipe autonome sur Odoo Finances",
        subtitle: "Votre personnel n’est pas remplacé — il est renforcé.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        tag: "Processus",
        title: "Processus comptables et fiscaux clairs",
        subtitle: "Une méthode simple, reproductible et sécurisée.",
        image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2074&auto=format&fit=crop",
    },
    {
        id: 4,
        tag: "Gain Temps",
        title: "Moins de tâches manuelles",
        subtitle: "Automatisation intelligente → plus de temps pour piloter.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 5,
        tag: "Sérénité",
        title: "Des décisions rapides et sans stress",
        subtitle: "Tableaux de bord lisibles + interprétation experte des données.",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    }
];

export default function BenefitsGrid() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo(".benefit-card",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 70%"
                }
            }
        );
    }, { scope: container });

    return (
        <section ref={container} className="relative w-full bg-[#050505] py-24 px-6 md:px-16 lg:px-24 overflow-hidden">

            {/* Section Header */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
                    Découvrez ce que vous gagnez immédiatement
                </h2>
                <p className="text-white/60 text-lg">
                    Des financess claires, des tâches automatisées, un pilotage sans stress grâce à Odoo.
                </p>
            </div>

            {/* Grid Layout - Matching Reference Exactly */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 max-w-6xl mx-auto">

                {/* Left Column - Starts Lower */}
                <div className="flex flex-col">
                    {/* "Escape" Style Title */}
                    <h3 className="font-serif text-6xl md:text-7xl italic text-secondary mb-8">
                        Bénéfices
                    </h3>

                    {/* Cards - pushed down */}
                    <div className="md:mt-12">
                        {/* Card 1 */}
                        <BenefitCard item={BENEFITS[0]} />

                        {/* Card 3 */}
                        <BenefitCard item={BENEFITS[2]} />

                        {/* Card 5 */}
                        <BenefitCard item={BENEFITS[4]} />
                    </div>
                </div>

                {/* Right Column - Starts Higher (at the very top) */}
                <div className="flex flex-col">
                    {/* Card 2 */}
                    <BenefitCard item={BENEFITS[1]} />

                    {/* Card 4 */}
                    <BenefitCard item={BENEFITS[3]} />

                    {/* "Explore" Style Title */}
                    <h3 className="font-serif text-6xl md:text-7xl italic text-white text-right mt-8">
                        Rapides
                    </h3>
                </div>
            </div>

            {/* CTA Button */}
            <div className="mt-20 text-center">
                <Link href="/solutions" className="inline-flex items-center justify-center gap-2 bg-primary text-white px-10 py-4 rounded-sm font-medium uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors">
                    Découvrez comment Odoo Finances peut transformer votre gestion
                </Link>
            </div>
        </section>
    );
}

// Individual Benefit Card Component
function BenefitCard({ item }: { item: typeof BENEFITS[0] }) {
    return (
        <div className="benefit-card group relative h-[200px] md:h-[220px] overflow-hidden mb-6 cursor-pointer">

            {/* Background Image */}
            <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
            />

            {/* Dark overlay for text visibility */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Hover Overlay - Slides from LEFT to RIGHT */}
            <div className="absolute inset-0 bg-secondary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

            {/* Content Container */}
            <div className="absolute inset-0 flex items-center z-10">

                {/* Left: Vertical Tag + Line */}
                <div className="flex items-center h-full pl-4">
                    {/* Vertical Text */}
                    <span
                        className="text-[10px] font-bold tracking-[0.25em] uppercase text-white mr-3"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                        {item.tag}
                    </span>
                    {/* Vertical Line */}
                    <div className="h-16 w-[1px] bg-white/60" />
                </div>

                {/* Center: Title & Subtitle */}
                <div className="flex-1 flex flex-col justify-center pl-6 pr-16">
                    <h4 className="text-2xl md:text-3xl font-serif text-white mb-2">
                        {item.title}
                    </h4>
                    <p className="text-sm md:text-base text-white/80 font-light leading-snug transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        {item.subtitle}
                    </p>
                </div>

                {/* Right: Arrow */}
                {/* <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </div> */}
            </div>
        </div>
    );
}
