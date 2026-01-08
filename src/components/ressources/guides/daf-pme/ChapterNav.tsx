"use client";

import { useState, useEffect } from "react";

interface ChapterNavProps {
    sections: { id: number; title: string }[];
}

export default function ChapterNav({ sections }: ChapterNavProps) {
    const [activeSection, setActiveSection] = useState(1);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show nav after scrolling past the hero (approximately 300px)
            setIsVisible(window.scrollY > 300);

            // Find the active section
            let closestSection = 1;
            let closestDistance = Infinity;

            sections.forEach(s => {
                const el = document.getElementById(`section-${s.id}`);
                if (!el) return;

                const rect = el.getBoundingClientRect();
                const viewportCenter = window.innerHeight / 3;
                const elementCenter = rect.top;
                const distance = Math.abs(elementCenter - viewportCenter);

                if (distance < closestDistance && rect.top < window.innerHeight * 0.7) {
                    closestDistance = distance;
                    closestSection = s.id;
                }
            });

            setActiveSection(closestSection);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sections]);

    const scrollToSection = (id: number) => {
        const el = document.getElementById(`section-${id}`);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed right-4 xl:right-8 top-1/2 -translate-y-1/2 z-[9999] hidden lg:block">
            <nav className="bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-gray-200/50">
                <div className="space-y-1.5">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 relative group
                                ${activeSection === section.id
                                    ? "bg-gray-900 text-white shadow-lg shadow-gray-900/30 scale-110"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 hover:scale-105"
                                }`}
                            title={section.title}
                        >
                            {section.id}
                            {/* Tooltip */}
                            <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none max-w-[200px] truncate">
                                {section.title}
                            </span>
                        </button>
                    ))}
                </div>
                {/* Progress indicator */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-center">
                        <span className="text-xs font-medium text-gray-400">{activeSection}/{sections.length}</span>
                    </div>
                </div>
            </nav>
        </div>
    );
}
