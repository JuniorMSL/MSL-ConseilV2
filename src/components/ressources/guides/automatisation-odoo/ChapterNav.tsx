"use client";

import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Odoo purple color
const ODOO_PURPLE = "#714b67";

interface Section {
    id: number;
    title: string;
}

interface ChapterNavProps {
    sections: Section[];
}

export default function ChapterNav({ sections }: ChapterNavProps) {
    const [activeSection, setActiveSection] = useState(sections[0]?.id || 6);
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

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(`chapter-${sections[i].id}`);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sections]);

    const scrollToSection = (id: number) => {
        const element = document.getElementById(`chapter-${id}`);
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
                style={{ backgroundColor: ODOO_PURPLE }}
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
                <div className="p-4 border-b border-gray-100 flex items-center justify-between" style={{ backgroundColor: `${ODOO_PURPLE}10` }}>
                    <div className="flex items-center gap-2">
                        <span className="text-lg">📘</span>
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
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`nav-item w-full text-left p-3 rounded-xl transition-all text-sm ${activeSection === section.id
                                        ? "text-white shadow-md"
                                        : "text-gray-700 hover:bg-gray-50"
                                    }`}
                                style={activeSection === section.id ? { backgroundColor: ODOO_PURPLE } : {}}
                            >
                                <div className="flex items-center gap-2">
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${activeSection === section.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                                        }`}>
                                        {section.id}
                                    </span>
                                    <span className="line-clamp-2">{section.title}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Progress indicator */}
                <div className="p-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Progression</span>
                        <span>{Math.round(((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                                width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%`,
                                backgroundColor: ODOO_PURPLE
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
