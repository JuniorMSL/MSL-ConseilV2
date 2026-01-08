"use client";

import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Primary green color
const MAIN_COLOR = "#014730";

const STEPS = [
    { id: 1, title: "Inventaire des routines manuelles" },
    { id: 2, title: "Priorisation selon les douleurs" },
    { id: 3, title: "Premières briques d'automatisation" },
    { id: 4, title: "Validation par cas concrets" },
    { id: 5, title: "Suivi, ajustement, amélioration" }
];

export default function ChapterNav() {
    const [activeStep, setActiveStep] = useState(1);
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

            for (let i = STEPS.length - 1; i >= 0; i--) {
                const element = document.getElementById(`step-${STEPS[i].id}`);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveStep(STEPS[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToStep = (id: number) => {
        const element = document.getElementById(`step-${id}`);
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
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
                        {STEPS.map((step) => (
                            <button
                                key={step.id}
                                onClick={() => scrollToStep(step.id)}
                                className={`nav-item w-full text-left p-3 rounded-xl transition-all text-sm ${activeStep === step.id
                                    ? "text-white shadow-md"
                                    : "text-gray-700 hover:bg-gray-50"
                                    }`}
                                style={activeStep === step.id ? { backgroundColor: MAIN_COLOR } : {}}
                            >
                                <div className="flex items-center gap-2">
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${activeStep === step.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                                        }`}>
                                        {step.id}
                                    </span>
                                    <span className="line-clamp-2">{step.title}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Progress indicator */}
                <div className="p-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Progression</span>
                        <span>{Math.round(((STEPS.findIndex(s => s.id === activeStep) + 1) / STEPS.length) * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                                width: `${((STEPS.findIndex(s => s.id === activeStep) + 1) / STEPS.length) * 100}%`,
                                backgroundColor: MAIN_COLOR
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
