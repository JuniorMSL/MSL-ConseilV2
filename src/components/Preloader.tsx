'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader() {
    const [complete, setComplete] = useState(false);
    const counterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setComplete(true);
                document.body.style.overflow = 'auto';
            }
        });

        // Empêcher le scroll
        document.body.style.overflow = 'hidden';

        // 1. Initial State
        const mainElement = document.querySelector('main');
        if (mainElement) {
            gsap.set(mainElement, { opacity: 0, y: 100 });
        }

        // 2. Animation du compteur (0 -> 100)
        let progress = { value: 0 };

        tl.to(progress, {
            value: 100,
            duration: 2.5,
            ease: "power2.inOut",
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.textContent = Math.round(progress.value).toString();
                }
            }
        })

            // 3. Animation de sortie des textes du preloader
            .to('.preloader-text', {
                y: -50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.in",
                stagger: 0.1
            }, "-=0.5")

            // 4. Rideau (Slide Up)
            .to('.preloader-curtain', {
                yPercent: -100,
                duration: 1.2,
                ease: "power4.inOut"
            })

            // 5. Entrée du contenu principal (Reveal)
            .to(mainElement, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8");

        return () => {
            tl.kill();
            document.body.style.overflow = 'auto';
            if (mainElement) {
                gsap.set(mainElement, { clearProps: 'all' });
            }
        };
    }, []);

    if (complete) return null;

    return (
        <div className="preloader-curtain fixed inset-0 z-[9999] bg-[#013524] flex items-center justify-center overflow-hidden">
            {/* Background Texture/Glow (Subtle) */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-primary rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-secondary rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-white w-full max-w-4xl px-8">

                {/* Grand Compteur Central */}
                <div className="preloader-text overflow-hidden mb-2">
                    <div className="relative flex items-baseline">
                        <span
                            ref={counterRef}
                            className="text-[120px] md:text-[180px] font-bold leading-none tracking-tighter tabular-nums"
                            style={{
                                background: 'linear-gradient(to bottom right, #ffffff 30%, #a5d6a7 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            0
                        </span>
                        <span className="text-4xl md:text-6xl font-light text-secondary ml-2">%</span>
                    </div>
                </div>

                {/* Barre de séparation */}
                <div className="preloader-text w-full h-[1px] bg-white/10 max-w-[200px] mb-8" />

                {/* Titre / Tagline */}
                <div className="preloader-text text-center space-y-2">
                    <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase text-white/90">
                        MSL Conseil
                    </h2>
                    <p className="text-xs md:text-sm text-secondary/80 font-mono tracking-widest uppercase">
                        Expertise Odoo & Finance
                    </p>
                </div>

            </div>

            {/* Footer Text */}
            <div className="preloader-text absolute bottom-8 left-8 text-xs text-white/30 font-mono hidden md:block">
                BRUXELLES — MARRAKECH
            </div>
            <div className="preloader-text absolute bottom-8 right-8 text-xs text-white/30 font-mono hidden md:block">
                EST. 2025
            </div>
        </div>
    );
}
