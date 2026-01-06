"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COMPLEMENTARY_SERVICES = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
        ),
        title: "Contrôle de gestion dans Odoo",
        description: "Des indicateurs clairs pour piloter par les chiffres. Marges, budgets, centres de coûts, écarts : tout ce qu’il faut pour décider, pas pour deviner.."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
        ),
        title: "DAF externalisé ou en mission ponctuelle",
        description: "Une expertise stratégique à temps partiel pour structurer, cadrer et anticiper. Idéal pour les PME en croissance ou en transition."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.499 5.216 50.592 50.592 0 00-2.658.812m-15.482 0a50.697 50.697 0 016.957-5.842 4.106 4.106 0 00-1.196-1.573C6.67 4.08 5.48 4.256 4.35 4.982c-1.127.727-2.072 1.77-2.736 3.023-.464.875-.765 1.764-.814 2.508m1.78 3.636a50.57 50.57 0 012.658.813m-2.658-.813c.273.744.57 1.475.886 2.193" />
            </svg>
        ),
        title: "Audit de configuration Odoo Finance",
        description: "Un regard expert sur ce qui est bien fait, ce qui freine, et ce qui doit être corrigé. Base parfaite pour décider de vos priorités opérationnelles."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
        ),
        title: "Automatisation des flux et processus métiers",
        description: "Gagnez en fluidité entre services : compta, gestion, ventes, RH. On cartographie, on simplifie, on automatise intelligemment."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
        ),
        title: "Structuration du département finance",
        description: "Clarifiez les rôles, les outils et les responsabilités. On pose les fondations d’un service fiable, autonome et aligné avec la direction."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: "Accompagnement à la refonte ou montée de version Odoo",
        description: "Ne subissez pas les migrations, pilotez-les. Nous vous aidons à cadrer vos besoins, fiabiliser vos données et gérer les impacts."
    }
];

export default function ComplementaryServices() {
    const container = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Parallax on image
        gsap.fromTo(imageRef.current,
            { y: 50 },
            {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );

        // List items stagger reveal
        gsap.fromTo(".service-item",
            { x: 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 60%"
                }
            }
        );

    }, { scope: container });

    return (
        <section ref={container} className="relative w-full min-h-screen bg-primary text-white">

            {/* Layout */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-screen">

                {/* Left: Immersive Visual (Sticky on Desktop) */}
                <div className="relative h-[50vh] lg:h-auto overflow-hidden">
                    {/* Sticky Container */}
                    <div className="lg:sticky lg:top-0 w-full h-[50vh] lg:h-screen relative">
                        <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                            <Image
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                                alt="Corporate Meeting"
                                fill
                                className="object-cover opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent z-10" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-10" />
                        </div>

                        <div className="absolute bottom-20 left-12 md:left-24 z-20 max-w-md">
                            <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-[0.9]">
                                Au-delà <br /> <span className="text-secondary italic">du Conseil.</span>
                            </h2>
                            <div className="h-1 w-20 bg-secondary" />
                        </div>
                    </div>
                </div>

                {/* Right: Content & Services */}
                <div className="flex flex-col justify-center px-12 md:px-24 py-24 relative z-20 bg-primary lg:bg-transparent">

                    <div className="mb-16">
                        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-secondary mb-4">
                            Services complémentaires MSL Conseils
                        </h3>
                        <p className="text-white/60 text-lg font-light mb-8">
                            Un accompagnement à 360° autour de vos outils, vos flux et vos décisions.
                        </p>

                        <div className="space-y-4">
                            {COMPLEMENTARY_SERVICES.map((service, index) => (
                                <div key={index} className="service-item group flex items-start gap-6 py-6 border-b border-white/10 hover:border-white/30 transition-colors duration-300">
                                    <div className="mt-1 text-white/40 group-hover:text-secondary transition-colors duration-300">
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-serif text-white mb-1 group-hover:translate-x-2 transition-transform duration-300">
                                            {service.title}
                                        </h4>
                                        <p className="text-white/50 font-light text-sm">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Final CTA Inline */}
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <button className="relative overflow-hidden group bg-white text-primary px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs">
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Demander votre diagnostic gratuit</span>
                            <div className="absolute inset-0 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </button>
                        <Link href="/contact" className="text-white/70 hover:text-white border-b border-transparent hover:border-secondary transition-all text-sm uppercase tracking-wide pb-1">
                            Parler à un expert Odoo Finances
                        </Link>
                    </div>

                </div>

            </div>
        </section>
    );
}
