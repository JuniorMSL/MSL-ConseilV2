"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const TEXT_BEFORE = "Un bon outil ne suffit pas. Il faut une méthode claire, un cadre sécurisant et un regard extérieur pour avancer sereinement. Avec ";
const TEXT_BRAND = "MSL Conseils";
const TEXT_AFTER = ", Odoo Finances devient un levier sur mesure, adapté à votre réalité et à votre rythme  ";
const TEXT_LOCATION = "• Belgique & Maroc •";

export default function Marquee() {
    const container = useRef<HTMLDivElement>(null);
    const slider = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Duplicate content logic is handled via map, 
            // but we need enough copies to fill screen + scroll.
            // GSAP 'horizontalLoop' helper principle simplified:

            const ctx = gsap.context(() => {
                const totalWidth = slider.current?.scrollWidth || 0;

                // If content is wide enough
                if (totalWidth > 0) {
                    gsap.to(slider.current, {
                        x: "-50%", // Move half the width (since we have 2 sets of content essentially)
                        duration: 120, // Much slower duration for comfortable reading
                        ease: "linear",
                        repeat: -1,
                    });
                }
            }, container);

            return () => ctx.revert();
        },
        { scope: container }
    );

    return (
        <div
            ref={container}
            className="relative flex w-full overflow-hidden bg-primary py-3 text-sm font-medium uppercase tracking-widest text-[#d8d8d8] sm:text-base border-b border-white/10 z-50"
        >
            <div ref={slider} className="flex whitespace-nowrap will-change-transform">
                {/* Render enough copies to ensuring smooth infinite scroll */}
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex items-center shrink-0 pl-16">
                        <span className="text-white">{TEXT_BEFORE}</span>
                        <span className="text-white font-bold ml-1">{TEXT_BRAND}</span>
                        <span className="text-white">{TEXT_AFTER}</span>
                        <span className="text-secondary">{TEXT_LOCATION}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
