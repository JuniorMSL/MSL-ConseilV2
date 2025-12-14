"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full bg-[#050505] text-white pt-24 pb-12 px-6 border-t border-white/5 relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">

                    {/* Brand Column (Span 4) */}
                    <div className="md:col-span-4 space-y-8">
                        <Link href="/" className="block relative w-48 h-12">
                            <Image
                                src="/assets/logoConseils.png"
                                alt="MSL Conseils"
                                fill
                                className="object-contain object-left"
                            />
                        </Link>
                        <p className="text-gray-400 font-light leading-relaxed pr-6">
                            Structurer, automatiser et piloter. <br />
                            Nous transformons votre gestion financière en un levier de croissance sécurisé et serein.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Placeholders with hover effects */}
                            <a href="https://www.linkedin.com/company/msl-conseils" target="_blank" rel="noopener noreferrer" className="text-secondary/80 hover:text-white transition-colors text-sm uppercase tracking-wider font-bold border-b border-secondary/30 hover:border-white pb-1">
                                LinkedIn
                            </a>
                            <a href="https://www.youtube.com/@mslconseils" target="_blank" rel="noopener noreferrer" className="text-secondary/80 hover:text-white transition-colors text-sm uppercase tracking-wider font-bold border-b border-secondary/30 hover:border-white pb-1">
                                YouTube
                            </a>
                        </div>
                    </div>

                    {/* Navigation Column (Span 3) */}
                    <div className="md:col-span-3 md:col-start-6">
                        <h4 className="text-white font-serif text-lg mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-secondary"></span>
                            Navigation
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { label: "La Méthode", href: "/methode" },
                                { label: "À propos", href: "/about" },
                                { label: "Ressources", href: "/ressources" },
                                { label: "Contact", href: "/contact" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-gray-400 hover:text-secondary hover:pl-2 transition-all duration-300 block w-fit">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column (Span 3) */}
                    <div className="md:col-span-4">
                        <h4 className="text-white font-serif text-lg mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-secondary"></span>
                            Contact
                        </h4>

                        <div className="space-y-6">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Email</span>
                                <a href="mailto:contact@mslconseils.be" className="text-xl md:text-2xl font-light hover:text-secondary transition-colors">
                                    contact@mslconseils.be
                                </a>
                            </div>

                            <div className="flex gap-12">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Bureau</span>
                                    <p className="text-gray-300">Bruxelles, Belgique</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Bureau</span>
                                    <p className="text-gray-300">Marrakech, Maroc</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p suppressHydrationWarning>&copy; {new Date().getFullYear()} MSL Conseils. Tous droits réservés.</p>
                    <div className="flex gap-6">
                        <Link href="/contact" className="hover:text-white transition-colors">Politique de confidentialité</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Mentions légales</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
