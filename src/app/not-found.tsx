'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null);
    const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animation d'entrée
        const ctx = gsap.context(() => {
            // Animation des chiffres 404
            gsap.from(numberRefs.current, {
                opacity: 0,
                y: -100,
                rotationX: -90,
                stagger: 0.2,
                duration: 1,
                ease: 'back.out(1.7)',
            });

            // Animation du texte
            gsap.from('.error-text', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                delay: 0.6,
                ease: 'power3.out',
            });

            // Animation des boutons
            gsap.from('.error-button', {
                opacity: 0,
                scale: 0.8,
                duration: 0.6,
                stagger: 0.1,
                delay: 0.9,
                ease: 'back.out(1.7)',
            });

            // Animation du glow
            if (glowRef.current) {
                gsap.to(glowRef.current, {
                    scale: 1.2,
                    opacity: 0.6,
                    duration: 3,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut',
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-linear-to-br from-[#013524] via-[#014730] to-[#001e14] flex items-center justify-center px-6 py-24 overflow-hidden relative"
        >
            {/* Background animated shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />
                <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                {/* 404 Number avec effet 3D */}
                <div className="relative mb-8">
                    {/* Glow effect */}
                    <div
                        ref={glowRef}
                        className="absolute inset-0 blur-3xl bg-linear-to-r from-primary/40 via-secondary/20 to-primary/40"
                    />

                    <div className="relative flex items-center justify-center gap-4 sm:gap-8">
                        <span
                            ref={(el) => { numberRefs.current[0] = el; }}
                            className="text-[120px] sm:text-[180px] md:text-[220px] font-black text-transparent bg-clip-text bg-linear-to-br from-white via-gray-200 to-gray-400 leading-none"
                            style={{
                                textShadow: '0 0 80px rgba(1, 71, 48, 0.8)',
                                WebkitTextStroke: '2px rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            4
                        </span>
                        <div className="relative">
                            <span
                                ref={(el) => { numberRefs.current[1] = el; }}
                                className="text-[120px] sm:text-[180px] md:text-[220px] font-black text-transparent bg-clip-text bg-linear-to-br from-white via-gray-200 to-gray-400 leading-none inline-block animate-spin-slow"
                                style={{
                                    textShadow: '0 0 80px rgba(1, 71, 48, 0.8)',
                                    WebkitTextStroke: '2px rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                0
                            </span>
                            {/* Orbites autour du 0 */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-full border-2 border-white/10 rounded-full animate-spin-reverse" />
                            </div>
                        </div>
                        <span
                            ref={(el) => { numberRefs.current[2] = el; }}
                            className="text-[120px] sm:text-[180px] md:text-[220px] font-black text-transparent bg-clip-text bg-linear-to-br from-white via-gray-200 to-gray-400 leading-none"
                            style={{
                                textShadow: '0 0 80px rgba(1, 71, 48, 0.8)',
                                WebkitTextStroke: '2px rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            4
                        </span>
                    </div>
                </div>

                {/* Texte d'erreur */}
                <div className="error-text space-y-4 mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                        Page introuvable
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Oups ! La page que vous recherchez semble avoir disparu dans l'espace digital.
                        <br className="hidden sm:block" />
                        Ne vous inquiétez pas, nous allons vous ramener en lieu sûr.
                    </p>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="error-button group relative px-8 py-4 bg-white text-primary rounded-full font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Retour à l'accueil
                        </span>
                    </Link>

                    <Link
                        href="/contact"
                        className="error-button group px-8 py-4 bg-transparent text-white border-2 border-white/20 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/10 hover:border-white hover:scale-105"
                    >
                        <span className="flex items-center gap-2">
                            Nous contacter
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </Link>
                </div>

                {/* Liens utiles (Optionnel sur fond sombre, on peut les garder en discret) */}
                <div className="error-text mt-16 pt-8 border-t border-white/10">
                    <p className="text-sm text-gray-400 mb-4">Pages populaires :</p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link href="/about" className="text-sm text-primary-light hover:text-white transition-colors duration-200 hover:underline text-gray-300">
                            À Propos
                        </Link>
                        <span className="text-gray-600">•</span>
                        <Link href="/methode" className="text-sm text-primary-light hover:text-white transition-colors duration-200 hover:underline text-gray-300">
                            Méthode P.I.L.O.T.E.R.
                        </Link>
                        <span className="text-gray-600">•</span>
                        <Link href="/solutions" className="text-sm text-primary-light hover:text-white transition-colors duration-200 hover:underline text-gray-300">
                            Solutions
                        </Link>
                        <span className="text-gray-600">•</span>
                        <Link href="/faq" className="text-sm text-primary-light hover:text-white transition-colors duration-200 hover:underline text-gray-300">
                            FAQ
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}
