"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ODOO_PURPLE = "#714b67";

const EBOOKS = [
    {
        number: 1,
        title: "Structurer sa comptabilité PME",
        subtitle: "Gagner du temps et bâtir sur de bonnes bases",
        description: "Posez les fondations de votre architecture comptable : plan comptable personnalisé (PCMN), organisation documentaire, choix des outils et automatisations de base.",
        chapters: [
            "Pourquoi structurer sa comptabilité dès le début",
            "Définir les besoins comptables de l'entreprise",
            "Construire un plan comptable personnalisé (PCMN)",
            "Organiser les documents et flux comptables",
            "Choisir les bons outils comptables"
        ],
        quiz: {
            questions: 17,
            blocks: 4,
            duration: "5 min"
        },
        link: "/ressources/guides/diagnostic-gestion",
        color: "#014730",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop"
    },
    {
        number: 2,
        title: "Automatiser sa comptabilité PME",
        subtitle: "Piloter son entreprise en temps réel avec Odoo",
        description: "Passez à la vitesse supérieure : automatisez vos flux, mettez en place des indicateurs de pilotage, exploitez la comptabilité analytique et préparez la croissance.",
        chapters: [
            "Automatiser les flux comptables avec Odoo",
            "Définir les indicateurs clés de pilotage",
            "Mettre en place une comptabilité analytique",
            "Organiser la production comptable",
            "Préparer l'interaction avec le cabinet",
            "Faire évoluer l'architecture comptable"
        ],
        quiz: {
            questions: 31,
            blocks: 6,
            duration: "8 min"
        },
        link: "/ressources/guides/automatisation-odoo",
        color: ODOO_PURPLE,
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
    }
];

export default function MiseEnPlaceComptabilitePage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(".hero-badge",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
            .fromTo(".hero-title",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.5"
            )
            .fromTo(".hero-subtitle",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.5"
            )
            .fromTo(".hero-stats > div",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
                "-=0.3"
            );

        gsap.utils.toArray(".ebook-card").forEach((card, i) => {
            gsap.fromTo(card as Element,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: i * 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card as Element,
                        start: "top 80%"
                    }
                }
            );
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="w-full min-h-screen bg-white">
            {/* Hero Section - Matching daf-pme style */}
            <section
                className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, #012a1e 0%, #014730 50%, #016742 100%)"
                }}
            >
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300/10 rounded-full blur-[120px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />

                    {/* Grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, white 1px, transparent 1px),
                                linear-gradient(to bottom, white 1px, transparent 1px)
                            `,
                            backgroundSize: "60px 60px"
                        }}
                    />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
                    {/* Breadcrumb */}
                    <div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-6">
                        <Link href="/ressources" className="hover:text-white transition-colors">Ressources</Link>
                        <span>/</span>
                        <span className="text-white">Mise en place de la comptabilité</span>
                    </div>

                    {/* Badge */}
                    <div className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
                        <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                        <span className="text-white/90 text-sm font-medium tracking-wide">
                            Formation Complète — 2 E-books + 2 Tests Interactifs
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Mise en place de la comptabilité
                        <br />
                        <span className="text-secondary">pour PME</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-subtitle text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
                        Une méthode complète en 2 étapes pour structurer, automatiser et piloter votre comptabilité.
                        Du plan comptable personnalisé au pilotage en temps réel avec Odoo.
                    </p>

                    {/* Stats */}
                    <div className="hero-stats flex flex-wrap justify-center gap-4 md:gap-6">
                        <div className="flex items-center gap-2 text-white/80 text-sm bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                            <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            11 chapitres
                        </div>
                        <div className="flex items-center gap-2 text-white/80 text-sm bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                            <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            48 questions de diagnostic
                        </div>
                        <div className="flex items-center gap-2 text-white/80 text-sm bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                            <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            2 E-books complets
                        </div>
                        <div className="flex items-center gap-2 text-white/80 text-sm bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                            <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            100% actionnable
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
                        <span className="text-white/60 text-xs uppercase tracking-widest">Découvrir</span>
                        <svg className="w-5 h-5 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* E-books Section */}
            <div className="bg-gray-50 py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Section Title */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Choisissez votre étape
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Commencez par le premier e-book pour poser les bases, puis passez au second pour automatiser et piloter.
                        </p>
                    </div>

                    {/* E-books Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {EBOOKS.map((ebook) => (
                            <div
                                key={ebook.number}
                                className="ebook-card group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={ebook.image}
                                        alt={ebook.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 0%, ${ebook.color}CC 100%)` }} />

                                    {/* E-book number badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white text-gray-900 text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                                            E-book {ebook.number}
                                        </span>
                                    </div>

                                    {/* Title overlay */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-xl font-bold text-white">{ebook.title}</h3>
                                        <p className="text-white/80 text-sm">{ebook.subtitle}</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <p className="text-gray-600 text-sm mb-6">{ebook.description}</p>

                                    {/* Chapters */}
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                            Chapitres inclus
                                        </h4>
                                        <ul className="space-y-2">
                                            {ebook.chapters.map((chapter, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <span
                                                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                                                        style={{ backgroundColor: ebook.color }}
                                                    >
                                                        {ebook.number === 1 ? i + 1 : i + 6}
                                                    </span>
                                                    {chapter}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Quiz info */}
                                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                        <h4 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                            </svg>
                                            Test Interactif inclus
                                        </h4>
                                        <div className="flex flex-wrap gap-3 text-xs">
                                            <span className="bg-white px-2 py-1 rounded-full text-gray-600">
                                                {ebook.quiz.questions} questions
                                            </span>
                                            <span className="bg-white px-2 py-1 rounded-full text-gray-600">
                                                {ebook.quiz.blocks} sections
                                            </span>
                                            <span className="bg-white px-2 py-1 rounded-full text-gray-600">
                                                ~{ebook.quiz.duration}
                                            </span>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <Link
                                        href={ebook.link}
                                        className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-white transition-all hover:shadow-lg active:scale-[0.98]"
                                        style={{ backgroundColor: ebook.color }}
                                    >
                                        Accéder à l&apos;E-book {ebook.number}
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Progression indicator */}
                    <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Parcours recommandé</h3>
                            <p className="text-gray-600 text-sm">Suivez ce parcours pour une mise en place complète et progressive</p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            {/* Step 1 */}
                            <div className="flex items-center gap-3 bg-primary/10 rounded-xl px-4 py-3">
                                <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</span>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">Lire l&apos;E-book 1</p>
                                    <p className="text-gray-500 text-xs">Poser les bases</p>
                                </div>
                            </div>

                            <svg className="w-6 h-6 text-gray-300 rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>

                            {/* Step 2 */}
                            <div className="flex items-center gap-3 bg-primary/10 rounded-xl px-4 py-3">
                                <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">2</span>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">Faire le Test 1</p>
                                    <p className="text-gray-500 text-xs">Évaluer sa maturité</p>
                                </div>
                            </div>

                            <svg className="w-6 h-6 text-gray-300 rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>

                            {/* Step 3 */}
                            <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: `${ODOO_PURPLE}15` }}>
                                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: ODOO_PURPLE }}>3</span>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">Lire l&apos;E-book 2</p>
                                    <p className="text-gray-500 text-xs">Automatiser</p>
                                </div>
                            </div>

                            <svg className="w-6 h-6 text-gray-300 rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>

                            {/* Step 4 */}
                            <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: `${ODOO_PURPLE}15` }}>
                                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: ODOO_PURPLE }}>4</span>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">Faire le Test 2</p>
                                    <p className="text-gray-500 text-xs">Plan d&apos;action</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <section
                className="relative overflow-hidden py-16 px-6"
                style={{
                    background: "linear-gradient(135deg, #012a1e 0%, #014730 50%, #016742 100%)"
                }}
            >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 right-20 w-48 h-48 bg-secondary/10 rounded-full blur-[80px]" />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
                        <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                        <span className="text-white/90 text-sm font-medium">Prêt à commencer ?</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Besoin d&apos;un accompagnement personnalisé ?
                    </h2>
                    <p className="text-white/70 mb-8">
                        Nos experts peuvent vous accompagner dans la mise en place de votre comptabilité avec Odoo.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={EBOOKS[0].link}
                            className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all"
                        >
                            Commencer par l&apos;E-book 1
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold px-6 py-3 rounded-xl transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Prendre rendez-vous
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
