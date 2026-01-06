"use client";

import Link from "next/link";

export default function ResourceCTA() {
    return (
        <section className="w-full py-32 px-6 bg-primary text-white text-center flex flex-col items-center justify-center relative overflow-hidden">

            {/* abstract bg circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
                    Prêt à structurer <br />
                    votre finances ?
                </h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="/ressources" className="bg-white text-primary px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-gray-100 transition-colors shadow-xl hover:scale-105 transform duration-300 text-center">
                        Télécharger le Kit Complet
                    </Link>
                    <Link href="/contact" className="px-8 py-4 border border-white/30 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/10 transition-colors hover:scale-105 transform duration-300 text-center">
                        Parler à un expert
                    </Link>
                </div>
            </div>
        </section>
    );
}
