"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
    { label: "Accueil", href: "/" },
    { label: "A propos", href: "/about" },
    { label: "Solutions", href: "/solutions" },
    { label: "Ressources", href: "/ressources" },
    { label: "Méthode", href: "/methode" },
    { label: "FAQ", href: "/faq" },
    { label: "Bootcamp", href: "/bootcamp" },
    { label: "Contact", href: "/contact" }
];

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Check for scroll to toggle styling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        // Safe check for GSAP
    }, { scope: headerRef });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = !isMenuOpen ? "hidden" : "auto";
    };

    return (
        <>
            <header
                ref={headerRef}
                className={`left-0 w-full z-50 transition-all duration-500 ${scrolled
                    ? "fixed top-0 py-4 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 shadow-2xl translate-y-0"
                    : "absolute top-[40px] py-6 bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center text-white">

                    {/* Logo Area */}
                    <Link href="/" className="z-50 group flex items-center gap-2">
                        <div className="relative w-40 h-14 md:w-48 md:h-12">
                            <Image
                                src="/assets/logoConseils.png"
                                alt="MSL Conseils Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className={`hidden md:flex items-center gap-6 px-6 py-2.5 rounded-full backdrop-blur-md transition-all duration-500 ${scrolled ? "bg-transparent border-transparent shadow-none" : "bg-[#013524]/90 border border-white/10 shadow-lg"}`}>
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`text-[10px] uppercase tracking-widest hover:text-secondary transition-colors relative group font-medium ${pathname === link.href ? "text-secondary" : "text-white/90"
                                    }`}
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 h-[1px] bg-secondary transition-all duration-300 ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                                    }`} />
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Layout */}
                    <div className="flex items-center gap-4">
                        {/* CTA Button */}
                        <Link
                            href="/contact"
                            className="hidden md:inline-flex px-6 py-2.5 bg-white text-primary text-xs font-bold uppercase tracking-widest rounded-full hover:bg-secondary hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(32,166,126,0.4)]"
                        >
                            Diagnostic Gratuit
                        </Link>

                        {/* Mobile Menu Button - Hamburger */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden z-50 flex flex-col gap-1.5 p-2 group"
                            aria-label="Toggle Menu"
                        >
                            <span className={`w-6 h-[2px] bg-white transition-all duration-300 group-hover:bg-secondary ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                            <span className={`w-4 h-[2px] bg-white ml-auto transition-all duration-300 group-hover:bg-secondary ${isMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`w-6 h-[2px] bg-white transition-all duration-300 group-hover:bg-secondary ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                        </button>
                    </div>

                </div>
            </header>

            {/* Mobile Fullscreen Menu */}
            <div className={`fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col justify-center items-center transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>

                {/* Background Decoration */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/20 to-transparent opacity-20" />

                <div className="flex flex-col gap-8 text-center relative z-10">
                    {NAV_LINKS.map((link, i) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={toggleMenu}
                            className={`text-4xl md:text-5xl font-serif text-white hover:text-secondary hover:italic transition-all duration-500 transform ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                }`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className={`w-12 h-[1px] bg-white/20 mx-auto my-4 transition-all duration-700 delay-500 ${isMenuOpen ? "w-12 opacity-100" : "w-0 opacity-0"}`} />

                    <Link
                        href="/contact"
                        onClick={toggleMenu}
                        className={`text-lg uppercase tracking-widest text-secondary font-bold transition-all duration-500 delay-500 transform ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                            }`}
                    >
                        Demander un diagnostic
                    </Link>
                </div>
            </div>
        </>
    );
}
