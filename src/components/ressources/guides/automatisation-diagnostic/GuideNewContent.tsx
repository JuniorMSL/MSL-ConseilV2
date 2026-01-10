"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GuideContentProps {
    onStartDiagnostic: () => void;
}

// Icons for sections
const Icons = {
    intro: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    myth: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
    cost: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    ready: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    control: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    conclusion: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
    ),
};

interface Section {
    id: number;
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

const SECTIONS: Section[] = [
    {
        id: 1,
        title: "Le faux problème de l'automatisation",
        icon: Icons.intro,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Si vous utilisez Odoo Finance, il y a de fortes chances que vous vous soyez déjà posé au moins l&apos;une de ces questions :
                </p>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <ul className="space-y-3">
                        {[
                            "« On fait encore trop de choses à la main. »",
                            "« Avec un outil comme Odoo, ça devrait être automatique. »",
                            "« On a investi dans un ERP, mais on n'en tire pas tous les bénéfices. »"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-600 italic">
                                <span className="text-secondary">💬</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                    C&apos;est une situation très fréquente. À Bruxelles, Sophie dirige une PME de services B2B d&apos;une quinzaine de personnes.
                    À Namur, Marc gère une société de distribution spécialisée. Deux contextes différents, mais une même impression :
                    <strong> le potentiel d&apos;Odoo est là, sans être pleinement exploité.</strong>
                </p>

                <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                    <p className="text-lg font-medium text-red-800 flex items-start gap-3">
                        <svg className="w-6 h-6 text-red-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>
                            <strong>Vérité importante :</strong> Automatiser une organisation mal structurée ne fait pas gagner du temps.
                            Cela accélère surtout les erreurs, les frustrations et la perte de contrôle.
                        </span>
                    </p>
                </div>

                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                    <p className="text-gray-700 mb-4">Odoo est un excellent outil. Mais Odoo n&apos;automatise pas à votre place :</p>
                    <ul className="space-y-2">
                        {[
                            "il applique des règles",
                            "il exécute des processus",
                            "il amplifie ce que vous avez déjà mis en place"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                                <span className="text-secondary">→</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg font-medium text-gray-900 flex items-start gap-3">
                        <svg className="w-6 h-6 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                            <strong className="text-secondary">Objectif de ce guide :</strong> vous aider à déterminer si votre organisation financière est réellement prête à automatiser intelligemment vos finances dans Odoo.
                        </span>
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Pourquoi vos finances restent manuelles",
        icon: Icons.myth,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Le mythe du « tout automatiser »</h3>

                <p className="text-lg text-gray-700 leading-relaxed">
                    Beaucoup d&apos;entreprises abordent l&apos;automatisation comme un objectif en soi.
                    <strong className="text-red-600"> C&apos;est une erreur.</strong>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                        <h4 className="font-bold text-red-800 mb-3">❌ Sophie (Bruxelles)</h4>
                        <p className="text-gray-600 text-sm">
                            A activé rapidement de nombreuses automatisations lors du déploiement d&apos;Odoo.
                            Résultat : les collaborateurs passent plus de temps à corriger et comprendre les automatismes qu&apos;à analyser les chiffres.
                        </p>
                    </div>
                    <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                        <h4 className="font-bold text-green-800 mb-3">✅ Marc (Namur)</h4>
                        <p className="text-gray-600 text-sm">
                            A commencé par identifier les tâches répétitives, stables et peu sujettes à interprétation.
                            A volontairement laissé certaines validations sous contrôle humain.
                        </p>
                    </div>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg font-medium text-gray-900">
                        👉 Dans les deux cas, l&apos;outil est le même. <strong className="text-secondary">La différence vient de la posture face à l&apos;automatisation.</strong>
                    </p>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 mt-10">2. Les vrais freins (ils ne sont pas techniques)</h3>

                <p className="text-lg text-gray-700 leading-relaxed">
                    Dans la majorité des PME, les blocages viennent rarement de l&apos;ERP lui-même.
                </p>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <p className="text-gray-700 mb-4">Les vrais freins sont souvent :</p>
                    <ul className="space-y-3">
                        {[
                            "des règles floues ou implicites",
                            "une dépendance à une personne clé",
                            "la peur de perdre la maîtrise des chiffres",
                            "des habitudes historiques jamais remises en question"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-600">
                                <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg font-medium text-gray-900 flex items-start gap-3">
                        <svg className="w-6 h-6 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Tant que ces freins ne sont pas identifiés, <strong className="text-secondary">l&apos;automatisation reste partielle et fragile</strong>.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Le coût invisible d'une finance trop manuelle",
        icon: Icons.cost,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    À première vue, une organisation financière manuelle ne semble pas forcément problématique.
                    Les clôtures &quot;se font toujours&quot;. Les chiffres sortent. Parfois tard, parfois sous pression, mais ils finissent par arriver.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    Pourtant, ce fonctionnement a un <strong className="text-red-600">coût invisible, rarement mesuré</strong> — et pourtant bien réel.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
                            ⏱️
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Le coût du temps</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li>• Dizaines d&apos;heures de saisie</li>
                            <li>• Temps de contrôle à faible valeur ajoutée</li>
                            <li>• Décisions reportées faute de visibilité</li>
                        </ul>
                        <p className="text-red-600 text-sm mt-3 font-medium">👉 Ce temps n&apos;est pas facturé, mais il est bel et bien consommé.</p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center mb-4">
                            😰
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Le coût du stress</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li>• Clôtures sous pression</li>
                            <li>• Vérifications tardives</li>
                            <li>• Chiffres &quot;presque fiables&quot;</li>
                        </ul>
                        <p className="text-yellow-600 text-sm mt-3 font-medium">👉 Ce stress est rarement visible, mais il pèse sur le dirigeant.</p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                            👤
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Le coût de la dépendance humaine</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li>• Une personne clé</li>
                            <li>• Un fichier Excel personnel</li>
                            <li>• Une logique non documentée</li>
                        </ul>
                        <p className="text-blue-600 text-sm mt-3 font-medium">👉 L&apos;automatisation ne supprime pas l&apos;humain. Elle sécurise.</p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
                            ⏳
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Le coût des décisions retardées</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li>• Opportunités manquées</li>
                            <li>• Problèmes détectés trop tard</li>
                            <li>• Actions correctives repoussées</li>
                        </ul>
                        <p className="text-red-600 text-sm mt-3 font-medium">👉 Le coût le plus élevé : la décision qui n&apos;a pas été prise à temps.</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 4,
        title: "Êtes-vous structurellement prêt ?",
        icon: Icons.ready,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Une organisation prête à automatiser ses finances n&apos;est pas forcément sophistiquée.
                    <strong className="text-primary"> Elle est claire.</strong>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                        <h4 className="font-bold text-green-800 mb-3">✅ Claire (Gand)</h4>
                        <p className="text-gray-600 text-sm">
                            Les règles sont stables, connues et partagées.
                            Quand une automatisation est ajoutée, elle fonctionne immédiatement.
                        </p>
                    </div>
                    <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                        <h4 className="font-bold text-red-800 mb-3">❌ Patrick (Mons)</h4>
                        <p className="text-gray-600 text-sm">
                            Des règles qui changent selon l&apos;urgence ou le client.
                            Chaque automatisation nécessite des exceptions.
                        </p>
                    </div>
                </div>

                <div className="bg-primary rounded-2xl p-8 text-white">
                    <h4 className="font-bold text-secondary mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        On reconnaît une organisation automatisable à :
                    </h4>
                    <ul className="space-y-3">
                        {[
                            "des règles simples et compréhensibles",
                            "des flux prévisibles",
                            "des responsabilités bien définies",
                            "des exceptions rares et maîtrisées"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm font-bold">{i + 1}</span>
                                <span className="text-white/90">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg font-medium text-gray-900 flex items-start gap-3">
                        <svg className="w-6 h-6 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Avant d&apos;automatiser, il faut <strong className="text-secondary">stabiliser</strong>.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 5,
        title: "Automatiser sans perdre le contrôle",
        icon: Icons.control,
        content: (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                        <h4 className="font-bold text-red-800 mb-3">❌ Philippe (Tournai)</h4>
                        <p className="text-gray-600 text-sm">
                            Vérifie encore chaque ligne manuellement, souvent trop tard.
                            A l&apos;impression de garder le contrôle… mais subit les échéances.
                        </p>
                    </div>
                    <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                        <h4 className="font-bold text-green-800 mb-3">✅ Sébastien (Bruxelles)</h4>
                        <p className="text-gray-600 text-sm">
                            A mis en place des règles claires, des alertes et quelques indicateurs clés.
                            Il ne contrôle plus tout, mais il contrôle ce qui compte.
                        </p>
                    </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                    Automatiser ne signifie pas lâcher prise.
                    <strong> Le contrôle ne disparaît pas. Il change de forme.</strong>
                </p>

                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                    <p className="text-gray-700 mb-4 font-medium">On passe :</p>
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                        <span className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium">Contrôle ligne par ligne</span>
                        <span className="text-gray-400">→</span>
                        <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">Contrôle par règles</span>
                        <span className="text-gray-400">→</span>
                        <span className="px-4 py-2 bg-green-100 text-green-600 rounded-lg text-sm font-medium">Contrôle par alertes</span>
                    </div>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg font-medium text-gray-900 flex items-start gap-3">
                        <svg className="w-6 h-6 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Une automatisation bien pensée <strong className="text-secondary">renforce la fiabilité et libère du temps d&apos;analyse</strong>.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 6,
        title: "Conclusion : la vraie question à se poser",
        icon: Icons.conclusion,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Si vous êtes arrivé jusqu&apos;ici, une chose est certaine :
                    <strong className="text-primary"> le sujet vous concerne directement.</strong>
                </p>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <p className="text-gray-700 mb-4">Mais avant de vous demander :</p>
                    <p className="text-lg text-gray-600 italic mb-4">&quot;Qu&apos;est-ce que je peux automatiser dans Odoo ?&quot;</p>
                    <p className="text-gray-700 mb-2">Posez-vous cette question, bien plus stratégique :</p>
                    <p className="text-xl text-primary font-bold">&quot;Mon organisation financière est-elle réellement prête à automatiser intelligemment mes finances ?&quot;</p>
                </div>

                <div className="bg-primary rounded-2xl p-8 text-center text-white">
                    <p className="text-xl mb-6">
                        Pour répondre à cette question de façon lucide et structurée,<br />
                        nous avons conçu un <span className="text-secondary font-bold">diagnostic en ligne personnalisé</span>.
                    </p>
                    <ul className="text-white/80 space-y-2 mb-6 text-left max-w-md mx-auto">
                        <li>✓ Situer votre niveau de maturité</li>
                        <li>✓ Identifier vos vrais points de blocage</li>
                        <li>✓ Savoir par où commencer sans risque</li>
                        <li>✓ Éviter les automatisations contre-productives</li>
                    </ul>
                    <p className="text-white/60 text-sm">
                        👉 Il ne s&apos;agit pas d&apos;un test technique.<br />
                        👉 Il s&apos;agit d&apos;un outil de prise de recul pour décideur.
                    </p>
                </div>
            </div>
        )
    }
];

export default function GuideNewContent({ onStartDiagnostic }: GuideContentProps) {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".guide-section");
        sections.forEach((section) => {
            gsap.fromTo(section,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, { scope: container });

    return (
        <section ref={container} id="introduction" className="w-full bg-white py-20">
            <div className="max-w-4xl mx-auto px-6">
                {/* Sections */}
                {SECTIONS.map((section, index) => (
                    <div
                        key={section.id}
                        id={`section-${section.id}`}
                        className="guide-section mb-16 scroll-mt-32"
                    >
                        {/* Section Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white">
                                {section.icon}
                            </div>
                            <div>
                                <span className="text-sm text-secondary font-bold uppercase tracking-widest">
                                    Chapitre {section.id}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
                                    {section.title}
                                </h2>
                            </div>
                        </div>

                        {/* Section Content */}
                        {section.content}

                        {/* Separator */}
                        {index < SECTIONS.length - 1 && (
                            <div className="mt-16 flex justify-center">
                                <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                            </div>
                        )}
                    </div>
                ))}

                {/* CTA to Diagnostic */}
                <div id="diagnostic" className="guide-section scroll-mt-32">
                    <div className="bg-gradient-to-br from-primary to-primary/90 rounded-3xl p-10 text-center text-white relative overflow-hidden">
                        {/* Decorative */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />

                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-serif mb-4">
                                Êtes-vous prêt à <span className="text-secondary">automatiser</span> ?
                            </h3>
                            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
                                24 questions pour évaluer la maturité de votre organisation financière
                                et éviter les automatisations contre-productives.
                            </p>
                            <button
                                onClick={onStartDiagnostic}
                                className="px-10 py-5 bg-secondary text-primary rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors duration-300 shadow-xl hover:scale-105"
                            >
                                Accéder au diagnostic en ligne
                            </button>
                            <p className="text-white/50 text-sm mt-6 flex items-center justify-center gap-4">
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    5-7 min
                                </span>
                                <span>•</span>
                                <span>Résultats personnalisés</span>
                                <span>•</span>
                                <span>Partage possible</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
