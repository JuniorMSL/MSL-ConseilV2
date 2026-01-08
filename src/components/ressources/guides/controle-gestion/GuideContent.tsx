"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GuideContentProps {
    onStartQuiz: () => void;
}

interface Section {
    id: number;
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

// Icons
const Icons = {
    definition: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    ),
    importance: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    ),
    difference: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
    ),
    forms: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
    ),
    role: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    ),
    tools: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    steps: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
    ),
    expert: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    ),
    software: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    advantages: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
    ),
    cabinet: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    ),
};

const SECTIONS: Section[] = [
    {
        id: 1,
        title: "Qu'est-ce que le contrôle de gestion ?",
        icon: Icons.definition,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Le contrôle de gestion regroupe l'ensemble des <strong>outils, méthodes et processus</strong> qui permettent de mesurer, analyser et piloter la performance d'une entreprise.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    Il s'appuie sur des données (comptables, commerciales, RH, etc.) pour vous aider à prendre les bonnes décisions : ajuster une stratégie, réduire des coûts, optimiser un service, ou encore allouer plus efficacement vos ressources.
                </p>
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                    <p className="text-primary font-medium mb-4">Le contrôle de gestion ne se limite pas aux finances : il concerne tous les services de l'entreprise.</p>
                    <p className="text-gray-600 mb-4">Il permet notamment de :</p>
                    <ul className="space-y-3">
                        {[
                            "Définir des objectifs clairs et atteignables",
                            "Suivre les résultats réels",
                            "Identifier les écarts entre prévisions et réalité",
                            "Proposer des actions correctives"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-700">
                                <span className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Pourquoi est-il important ?",
        icon: Icons.importance,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Dans un environnement incertain et concurrentiel, le contrôle de gestion devient un <strong>levier de pilotage stratégique</strong>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { title: "Anticiper", desc: "les problèmes au lieu de les subir" },
                        { title: "Optimiser", desc: "l'usage de vos ressources" },
                        { title: "Améliorer", desc: "votre rentabilité" },
                        { title: "Gérer", desc: "la croissance ou les périodes de crise" },
                    ].map((item, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-secondary/30 hover:shadow-md transition-all duration-300">
                            <span className="text-secondary font-bold">{item.title}</span>
                            <span className="text-gray-600"> {item.desc}</span>
                        </div>
                    ))}
                </div>
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl p-6">
                    <p className="text-lg font-medium">
                        C'est une fonction transversale qui lie les données aux décisions, et la stratégie à l'opérationnel.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Différence entre contrôle de gestion et comptabilité",
        icon: Icons.difference,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Bien que liés, le contrôle de gestion et la comptabilité ont des objectifs différents :
                </p>
                <div className="overflow-hidden rounded-2xl border border-gray-200">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="text-left p-4 font-semibold text-gray-900 border-b border-gray-200">Critère</th>
                                <th className="text-left p-4 font-semibold text-gray-900 border-b border-gray-200 bg-gray-100">Comptabilité</th>
                                <th className="text-left p-4 font-semibold text-secondary border-b border-gray-200 bg-secondary/5">Contrôle de Gestion</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {[
                                { critere: "Nature", compta: "Obligatoire, encadrée par la loi", cdg: "Facultatif, outil interne" },
                                { critere: "Temporalité", compta: "Vue passée", cdg: "Vue présente et future" },
                                { critere: "Finalité", compta: "États financiers", cdg: "Performance opérationnelle" },
                                { critere: "Objectif", compta: "Obligations fiscales", cdg: "Efficacité et rentabilité" },
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-gray-100 last:border-0">
                                    <td className="p-4 font-medium text-gray-900">{row.critere}</td>
                                    <td className="p-4 text-gray-600 bg-gray-50">{row.compta}</td>
                                    <td className="p-4 text-gray-700 bg-secondary/5">{row.cdg}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    },
    {
        id: 4,
        title: "Les différentes formes de contrôle",
        icon: Icons.forms,
        content: (
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">Le contrôle régulatif</h4>
                        <p className="text-gray-600">
                            Il s'assure que l'entreprise respecte les normes, lois et procédures internes.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border-2 border-secondary/20 hover:border-secondary/40 transition-colors">
                        <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">Le contrôle normatif</h4>
                        <p className="text-gray-600">
                            Il s'intéresse à la culture d'entreprise et à l'adhésion aux valeurs.
                        </p>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 5,
        title: "Le rôle du contrôleur de gestion",
        icon: Icons.role,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Le contrôleur de gestion est un <strong>acteur central du pilotage</strong> de l'entreprise.
                </p>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                    <h4 className="text-xl font-bold mb-6">Ses missions principales</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            "Élaborer des budgets et des prévisions",
                            "Suivre les résultats",
                            "Mettre en place et suivre les KPI",
                            "Analyser les écarts",
                            "Proposer des plans d'action",
                            "Conseiller les responsables"
                        ].map((mission, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                                <span className="w-6 h-6 bg-secondary/30 rounded-full flex items-center justify-center text-secondary text-sm font-bold">
                                    {i + 1}
                                </span>
                                <span className="text-white/90">{mission}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 6,
        title: "Les outils clés du contrôle de gestion",
        icon: Icons.tools,
        content: (
            <div className="space-y-6">
                <div className="grid gap-6">
                    {[
                        {
                            letter: "A",
                            title: "La comptabilité analytique",
                            desc: "Analyse des coûts et marges par produit ou département.",
                            color: "primary"
                        },
                        {
                            letter: "B",
                            title: "Le tableau de bord",
                            desc: "Indicateurs de performance (KPI) pour visualiser la situation.",
                            color: "secondary"
                        },
                        {
                            letter: "C",
                            title: "Le reporting",
                            desc: "Rapports réguliers pour suivre l'évolution de la performance.",
                            color: "primary"
                        },
                        {
                            letter: "D",
                            title: "Le budget prévisionnel",
                            desc: "Feuille de route avec objectifs financiers et opérationnels.",
                            color: "secondary"
                        }
                    ].map((tool, i) => (
                        <div key={i} className="flex gap-5 bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-xl font-bold text-white
                                ${tool.color === "primary" ? "bg-primary" : "bg-secondary"}`}>
                                {tool.letter}
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">{tool.title}</h4>
                                <p className="text-gray-600">{tool.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: 7,
        title: "Les étapes pour mettre en place un contrôle de gestion",
        icon: Icons.steps,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Voici un processus simple en <strong>4 étapes</strong> pour les TPE/PME :
                </p>
                <div className="relative">
                    <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary hidden md:block" />
                    <div className="space-y-6">
                        {[
                            { num: 1, title: "Définir vos objectifs", desc: "Fixez des objectifs SMART" },
                            { num: 2, title: "Choisir les bons outils", desc: "Tableaux de bord, suivi budgétaire..." },
                            { num: 3, title: "Suivre et analyser", desc: "Points réguliers, analyse des écarts" },
                            { num: 4, title: "Ajuster la stratégie", desc: "Mesures correctives, optimisation" }
                        ].map((step, i) => (
                            <div key={i} className="flex gap-6 items-start">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg shadow-primary/25 relative z-10">
                                    {step.num}
                                </div>
                                <div className="flex-1 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                                    <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                                    <p className="text-gray-600">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 8,
        title: "Contrôleur de gestion vs Expert-comptable",
        icon: Icons.expert,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Doivent-ils être deux personnes distinctes ? <strong className="text-primary">Oui, idéalement</strong>.
                </p>
                <div className="grid gap-4">
                    {[
                        { title: "Différence de mission", desc: "Fiabilité des comptes vs analyse des performances" },
                        { title: "Indépendance du regard", desc: "Analyse critique vs production des données" },
                        { title: "Temporalité différente", desc: "A posteriori vs temps réel" },
                        { title: "Compétences spécifiques", desc: "Modélisation, tableaux de bord, animation" }
                    ].map((item, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-5 border-l-4 border-primary">
                            <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: 9,
        title: "Quels outils informatiques ?",
        icon: Icons.software,
        content: (
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#714b67] to-[#8e6180] rounded-2xl p-6 text-white">
                    <h4 className="text-xl font-bold mb-3">Nous recommandons Odoo</h4>
                    <p className="text-white/90">
                        ERP complet permettant de gérer tous les processus depuis une seule plateforme, avec des indicateurs fiables et automatisés.
                    </p>
                </div>
                <h4 className="font-bold text-gray-900 text-lg">Autres solutions :</h4>
                <div className="grid md:grid-cols-2 gap-3">
                    {[
                        { outil: "Excel / Sheets", pour: "Débutants, TPE" },
                        { outil: "Budgétis", pour: "TPE/PME" },
                        { outil: "Agicap", pour: "Suivi trésorerie" },
                        { outil: "Pennylane", pour: "Compta + pilotage" },
                        { outil: "Sage / Cegid", pour: "PME structurées" },
                    ].map((row, i) => (
                        <div key={i} className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                            <span className="font-medium text-gray-900">{row.outil}</span>
                            <span className="text-sm text-gray-500">{row.pour}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: 10,
        title: "Avantages et limites",
        icon: Icons.advantages,
        content: (
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                    <h4 className="flex items-center gap-2 text-green-700 font-bold text-lg mb-4">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Avantages
                    </h4>
                    <ul className="space-y-2">
                        {["Vision claire", "Décisions basées sur des données", "Anticipation des risques", "Gain de rentabilité", "Responsabilisation"].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-green-800 text-sm">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                    <h4 className="flex items-center gap-2 text-amber-700 font-bold text-lg mb-4">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Limites
                    </h4>
                    <ul className="space-y-2">
                        {["Peut sembler complexe", "Nécessite des données fiables", "Requiert parfois une formation"].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-amber-800 text-sm">
                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    },
    {
        id: 11,
        title: "Travailler avec un cabinet comptable",
        icon: Icons.cabinet,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Un cabinet comptable peut vous accompagner sur la mise en place d'un <strong>véritable pilotage de gestion</strong>.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                    {[
                        { icon: "📊", title: "Tableaux de bord personnalisés" },
                        { icon: "📈", title: "Analyse financière régulière" },
                        { icon: "💰", title: "Optimisation des charges" },
                        { icon: "🎯", title: "Accompagnement stratégique" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <span className="text-2xl mb-2 block">{item.icon}</span>
                            <p className="font-medium text-gray-900">{item.title}</p>
                        </div>
                    ))}
                </div>
                <div className="bg-primary text-white rounded-2xl p-6">
                    <p className="text-lg">
                        Ce partenariat vous permet de <strong>gagner du temps</strong> et de vous concentrer sur votre <strong>cœur d'activité</strong>.
                    </p>
                </div>
            </div>
        )
    }
];

export default function GuideContent({ onStartQuiz }: GuideContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Animate sections on scroll
        SECTIONS.forEach((section) => {
            gsap.fromTo(`#section-${section.id}`,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: `#section-${section.id}`,
                        start: "top 80%",
                        end: "top 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full bg-gray-50">
            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-16">
                {/* Intro */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                        Guide complet
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Tout ce que vous devez savoir
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Parcourez les 11 chapitres du guide puis évaluez votre niveau de maturité avec notre questionnaire personnalisé.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-20">
                    {SECTIONS.map((section) => (
                        <section
                            key={section.id}
                            id={`section-${section.id}`}
                            className="scroll-mt-24"
                        >
                            {/* Section Header */}
                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
                                    {section.icon}
                                </div>
                                <div>
                                    <span className="text-sm text-gray-400 uppercase tracking-wider font-medium">
                                        Chapitre {section.id}
                                    </span>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                                        {section.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Section Content */}
                            <div className="pl-0 md:pl-[4.5rem]">
                                {section.content}
                            </div>

                            {/* Divider */}
                            {section.id < SECTIONS.length && (
                                <div className="mt-16 border-b border-gray-200" />
                            )}
                        </section>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-20 bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Questions fréquentes</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { q: "Qu'est-ce qu'un tableau de bord ?", a: "Un outil visuel regroupant des indicateurs pour suivre votre activité." },
                            { q: "Est-ce utile pour une petite entreprise ?", a: "Oui, dès que vous avez des décisions à prendre." },
                            { q: "Comment démarrer simplement ?", a: "Un budget prévisionnel + quelques KPI + suivi mensuel." },
                            { q: "Faut-il un logiciel ?", a: "Pas au début. Excel suffit, puis évoluez vers un ERP." },
                        ].map((faq, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-5">
                                <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                                <p className="text-sm text-gray-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10">
                        <span className="inline-block bg-secondary/20 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                            Prêt à vous évaluer ?
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Évaluez votre maturité en contrôle de gestion
                        </h2>
                        <p className="text-white/70 max-w-xl mx-auto mb-8">
                            Répondez à 10 questions pour découvrir votre profil et obtenir des recommandations personnalisées.
                        </p>
                        <button
                            onClick={onStartQuiz}
                            className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-secondary/25 active:scale-[0.98]"
                        >
                            Commencer le questionnaire
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
