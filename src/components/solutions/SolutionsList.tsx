"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const SOLUTIONS = [
    {
        num: "01",
        title: "Odoo Finances",
        subtitle: "Mise en place & optimisation",
        description: "Nous structurons vos processus financiers dans Odoo pour vous donner des chiffres fiables, centralisés et directement exploitables.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", // Dashboard data
        before: ["Données dispersées", "Erreurs récurrentes", "Clôtures longues"],
        after: ["Flux centralisés", "Automatisation", "Chiffres exploitables"],
        actions: ["Analyse complète", "Paramétrage financier", "Automatisation clés", "Documentation & Formation"]
    },
    {
        num: "02",
        title: "Pilotage Financier",
        subtitle: "Lecture & interprétation",
        description: "Nous donnons du sens à vos chiffres pour que vos décisions soient rapides, éclairées et sereines.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop", // Analytics dashboard
        before: ["Décisions à l'intuition", "Vision partielle", "Analyses tardives"],
        after: ["Indicateurs temps réel", "Décisions solides", "Visibilité complète"],
        actions: ["Dashboards Odoo", "Suivi des KPIs", "Rapports structurés"]
    },
    {
        num: "03",
        title: "Automatisation",
        subtitle: "Des processus financiers",
        description: "Nous éliminons les tâches répétitives pour libérer du temps à votre équipe et fiabiliser vos flux.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop", // Tech working
        before: ["Beaucoup de manuel", "Risque d'erreurs", "Tâches chronophages"],
        after: ["Processus automatisés", "Alertes paramétrées", "Flux synchronisés"],
        actions: ["Saisies auto", "Workflows validation", "Optimisation flux"]
    },
    {
        num: "04",
        title: "Contrôle de Gestion",
        subtitle: "Intégré & Stratégique",
        description: "Nous vous donnons une vision claire sur vos marges, vos coûts et vos priorités financières.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop", // Strategy board
        before: ["Coûts flous", "Marges mal suivies", "Décisions approx."],
        after: ["Marges claires", "Suivi temps réel", "Décisions fondées"],
        actions: ["Budget & Analytique", "Centres de coûts", "Recommandations"]
    },
    {
        num: "05",
        title: "DAF à temps partiel",
        subtitle: "Expertise stratégique flexible",
        description: "Une expertise financière de haut niveau, sans engager un directeur financier à plein temps.",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop", // Executive meeting
        before: ["Pas de vision", "Décisions à risque", "Manque de support"],
        after: ["Expertise flexible", "Anticipation", "Support clé"],
        actions: ["Accompagnement", "Clôture & Reporting", "Coordination équipes"]
    },
    {
        num: "06",
        title: "Formation Odoo",
        subtitle: "Adoption & Maîtrise",
        description: "Nous formons vos équipes pour qu'elles maîtrisent réellement Odoo — sans stress ni complexité.",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop", // Workshop training
        before: ["Utilisation hésitante", "Productivité faible", "Dépendance"],
        after: ["Équipes autonomes", "Productivité accrue", "Adoption durable"],
        actions: ["Formations pratiques", "Guides adaptés", "Suivi adoption"]
    },
    {
        num: "07",
        title: "Digitalisation",
        subtitle: "Connexion des départements",
        description: "Nous connectons vos processus internes pour que la finances devienne un moteur, pas un frein.",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop", // Connected office
        before: ["Départements isolés", "Manque coord.", "Silos"],
        after: ["Flux intégrés", "Données synchro", "Transparence"],
        actions: ["Cartographie flux", "Connexion Odoo", "Optimisation pilotage"]
    }
];

export default function SolutionsList() {
    const container = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Images
            const images = gsap.utils.toArray<HTMLElement>(".solution-image-container");
            images.forEach((img) => {
                gsap.to(img.querySelector("img"), {
                    yPercent: 20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

            // Text Reveal
            const texts = gsap.utils.toArray<HTMLElement>(".solution-content");
            texts.forEach((text) => {
                gsap.fromTo(text,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: text,
                            start: "top 75%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="w-full bg-white overflow-hidden">
            {SOLUTIONS.map((sol, i) => (
                <div key={i} className="group relative w-full py-24 md:py-32 border-b border-gray-100 last:border-none">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                        {/* Image Column - ZigZag Logic */}
                        <div className={`solution-image-container relative h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                            <Image
                                src={sol.image}
                                alt={sol.title}
                                fill
                                className="object-cover scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60" />

                            {/* Floating Number */}
                            <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <span className="text-secondary font-bold font-serif text-lg">{sol.num}</span>
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className={`solution-content ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                            <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-4 block">{sol.subtitle}</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">{sol.title}</h2>
                            <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-lg">{sol.description}</p>

                            <div className="grid grid-cols-2 gap-8 mb-12">
                                <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
                                    <p className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-6">Avant</p>
                                    <ul className="space-y-3">
                                        {sol.before.map((item, j) => (
                                            <li key={j} className="text-base text-gray-500 flex items-start gap-3 line-through decoration-gray-300">
                                                <span className="text-gray-300 mt-1.5 text-xs">✕</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-8 rounded-2xl bg-[#014730] border border-[#014730] shadow-xl">
                                    <p className="text-sm font-bold uppercase tracking-wide text-secondary mb-6">Après</p>
                                    <ul className="space-y-3">
                                        {sol.after.map((item, j) => (
                                            <li key={j} className="text-base text-white font-medium flex items-start gap-3">
                                                <span className="text-secondary mt-1.5 text-xs">✓</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Actions List */}
                            <div className="flex flex-wrap gap-3">
                                {sol.actions.map((action, j) => (
                                    <span key={j} className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-secondary hover:text-secondary transition-colors cursor-default">
                                        {action}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </section>
    );
}
