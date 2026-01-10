"use client";

import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Primary green color
const MAIN_COLOR = "#014730";

const CHAPTERS = [
    { id: 1, title: "Le faux problème de l'automatisation" },
    { id: 2, title: "Pourquoi vos finances restent manuelles" },
    { id: 3, title: "Le coût invisible du manuel" },
    { id: 4, title: "Êtes-vous structurellement prêt ?" },
    { id: 5, title: "Automatiser sans perdre le contrôle" },
    { id: 6, title: "La vraie question à se poser" }
];

export default function ChapterNavNew() {
    const [activeChapter, setActiveChapter] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isOpen) {
            gsap.fromTo(".nav-item", { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power3.out" });
        }
    }, { scope: containerRef, dependencies: [isOpen] });

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;

            for (let i = CHAPTERS.length - 1; i >= 0; i--) {
                const element = document.getElementById(`section-${CHAPTERS[i].id}`);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveChapter(CHAPTERS[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToChapter = (id: number) => {
        const element = document.getElementById(`section-${id}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Mobile trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 lg:hidden w-14 h-14 rounded-full shadow-lg text-white flex items-center justify-center hover:shadow-xl transition-all"
                style={{ backgroundColor: MAIN_COLOR }}
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Navigation panel */}
            <div
                ref={containerRef}
                className={`fixed z-50 transition-transform duration-300 lg:translate-x-0
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    left-0 bottom-0 top-0 w-72 bg-white shadow-xl lg:shadow-md
                    lg:left-4 lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:w-64 lg:rounded-2xl lg:max-h-[80vh] overflow-hidden`}
            >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between" style={{ backgroundColor: `${MAIN_COLOR}10` }}>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-bold text-sm text-gray-900">Navigation rapide</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden p-1 hover:bg-gray-100 rounded">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-3 overflow-y-auto max-h-[calc(80vh-60px)]">
                    <div className="space-y-1">
                        {CHAPTERS.map((chapter) => (
                            <button
                                key={chapter.id}
                                onClick={() => scrollToChapter(chapter.id)}
                                className={`nav-item w-full text-left p-3 rounded-xl transition-all text-sm ${activeChapter === chapter.id
                                    ? "text-white shadow-md"
                                    : "text-gray-700 hover:bg-gray-50"
                                    }`}
                                style={activeChapter === chapter.id ? { backgroundColor: MAIN_COLOR } : {}}
                            >
                                <div className="flex items-center gap-2">
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${activeChapter === chapter.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                                        }`}>
                                        {chapter.id}
                                    </span>
                                    <span className="line-clamp-2">{chapter.title}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Diagnostic CTA */}
                <div className="p-3 border-t border-gray-100">
                    <button
                        onClick={() => {
                            const el = document.getElementById('diagnostic');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                            setIsOpen(false);
                        }}
                        className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: '#fe981a' }}
                    >
                        🧭 Faire le diagnostic
                    </button>
                </div>

                {/* Progress indicator */}
                <div className="p-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Progression</span>
                        <span>{Math.round(((CHAPTERS.findIndex(s => s.id === activeChapter) + 1) / CHAPTERS.length) * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                                width: `${((CHAPTERS.findIndex(s => s.id === activeChapter) + 1) / CHAPTERS.length) * 100}%`,
                                backgroundColor: MAIN_COLOR
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
