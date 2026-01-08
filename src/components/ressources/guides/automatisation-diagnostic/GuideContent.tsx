"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GuideContentProps {
    onDownload: () => void;
}

const STEPS = [
    {
        id: 1,
        title: "Faites l'inventaire de vos routines manuelles",
        icon: "clipboard-list",
        color: "#0ea5e9",
        intro: "C'est le point de départ. Automatiser sans savoir ce qui prend du temps ou crée des erreurs revient à poser un pansement sur un problème mal défini.",
        questions: [
            "Quelles sont les 3 tâches répétitives qui vous prennent le plus de temps ?",
            "Quelles actions provoquent le plus d'erreurs ou de retards ?",
            "Y a-t-il des doublons ou pertes d'infos entre les modules ?"
        ],
        examples: [
            "Rapprochements bancaires manuels",
            "Lettrage manuel des paiements",
            "Envoi de relances client un par un",
            "Export Excel pour suivi ou analyse",
            "Validation individuelle des factures ou notes de frais"
        ],
        action: "Cochez ce qui vous concerne dans la checklist Excel."
    },
    {
        id: 2,
        title: "Classez vos priorités selon vos douleurs réelles",
        icon: "chart-bar",
        color: "#f59e0b",
        intro: "Tout ne s'automatise pas d'un coup. L'objectif ici est de focaliser vos efforts là où l'impact est immédiat.",
        questions: [
            "Quelle tâche me fait perdre le plus de temps chaque semaine ?",
            "Où ai-je le plus de retours négatifs (internes ou externes) ?",
            "Quelle tâche dépend d'une seule personne dans l'équipe ?"
        ],
        criteria: [
            { icon: "clock", label: "Volume élevé", example: "Saisie de 30 factures fournisseurs/semaine" },
            { icon: "x-circle", label: "Risque d'erreur", example: "Lettrage manuel en fin de mois" },
            { icon: "lock-closed", label: "Dépendance à un collaborateur", example: "Fichier Excel tenu à la main" },
            { icon: "puzzle", label: "Complexité", example: "Plusieurs devises, plusieurs journaux" },
            { icon: "trending-down", label: "Impact business", example: "Clôtures retardées, relances oubliées" }
        ]
    },
    {
        id: 3,
        title: "Posez les premières briques d'automatisation",
        icon: "cog",
        color: "#10b981",
        intro: "Automatiser, ce n'est pas \"tout changer\". C'est introduire des règles simples à des endroits bien choisis.",
        questions: [
            "Quelles actions pourraient suivre une logique simple ?",
            "Y a-t-il un déclencheur clair ? (ex. : facture validée, paiement reçu...)"
        ],
        automations: [
            "Lettrage automatique dès qu'un paiement matche une facture",
            "Relances clients automatiques à J+5 / J+10 / J+20",
            "Validation automatique des factures fournisseurs < 500 €",
            "Génération automatique d'écritures pour les abonnements",
            "Envoi automatique de factures dès validation"
        ],
        tip: "Une bonne automatisation simplifie, elle ne complique pas."
    },
    {
        id: 4,
        title: "Validez par des cas concrets",
        icon: "beaker",
        color: "#8b5cf6",
        intro: "Il faut tester avant de généraliser. Un scénario bien testé = un automatisme fiable.",
        tests: [
            { cas: "Facture validée + paiement reçu", attendu: "Lettrage déclenché automatiquement" },
            { cas: "Facture en retard", attendu: "Relance envoyée sans intervention humaine" },
            { cas: "Paiement partiel", attendu: "Lettrage partiel + écart visible" }
        ],
        warnings: [
            "Mauvais choix de journal",
            "Règles qui se contredisent entre elles",
            "Erreurs de configuration des comptes",
            "Automatisations qui écrasent les données manuelles"
        ]
    },
    {
        id: 5,
        title: "Suivez, ajustez, améliorez",
        icon: "refresh",
        color: "#ec4899",
        intro: "Une automatisation, ça se pilote. On ne l'active pas une fois pour toutes.",
        monitoring: [
            "Journal des règles déclenchées",
            "Alertes ou erreurs remontées",
            "Retours d'utilisateurs internes"
        ],
        kpis: [
            { indicator: "Temps de traitement", target: "Doit diminuer" },
            { indicator: "Taux d'erreurs", target: "Doit diminuer" },
            { indicator: "% automatisation réelle", target: "Doit augmenter" },
            { indicator: "Délai de clôture mensuelle", target: "Doit diminuer" }
        ]
    }
];

const CHECKLIST_PREVIEW = [
    { task: "Lettrage paiements clients", auto: true, tested: true, comment: "OK sauf acomptes" },
    { task: "Envoi relances clients", auto: true, tested: true, comment: "J+5 / J+10 / finale" },
    { task: "Génération d'écritures d'abonnements", auto: true, tested: false, comment: "En cours" },
    { task: "Validation factures < 500€", auto: true, tested: true, comment: "Tous services" }
];

export default function GuideContent({ onDownload }: GuideContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.utils.toArray(".step-block").forEach((block) => {
            gsap.fromTo(block as Element,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: block as Element,
                        start: "top 80%"
                    }
                }
            );
        });
    }, { scope: containerRef });

    const renderIcon = (iconName: string, className: string = "w-6 h-6") => {
        switch (iconName) {
            case "clipboard-list":
                return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
            case "chart-bar":
                return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
            case "cog":
                return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
            case "beaker":
                return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>;
            case "refresh":
                return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
            default:
                return null;
        }
    };

    return (
        <div ref={containerRef} className="w-full bg-gray-50 py-16 md:py-24 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Intro */}
                <div className="step-block bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12">
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Ce guide est pensé pour vous
                        </h2>
                        <p className="text-gray-600 mb-6">
                            DAF, comptables internes ou dirigeants de PME qui :
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                "jonglent avec des tâches manuelles répétitives",
                                "manquent de visibilité sur leurs flux",
                                "veulent poser les bonnes bases avant d'automatiser"
                            ].map((item, i) => (
                                <span key={i} className="bg-primary/10 text-primary text-sm px-4 py-2 rounded-full border border-primary/20">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Steps */}
                {STEPS.map((step) => (
                    <div key={step.id} id={`step-${step.id}`} className="step-block mb-12">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            {/* Step header */}
                            <div
                                className="px-8 py-6 flex items-center gap-4"
                                style={{ background: `linear-gradient(135deg, ${step.color}15 0%, ${step.color}05 100%)` }}
                            >
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white"
                                    style={{ backgroundColor: step.color }}
                                >
                                    {renderIcon(step.icon, "w-7 h-7")}
                                </div>
                                <div>
                                    <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: step.color }}>
                                        Étape {step.id}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                                </div>
                            </div>

                            {/* Step content */}
                            <div className="p-8">
                                {/* Intro */}
                                <div className="bg-gray-50 rounded-xl p-4 border-l-4 mb-6" style={{ borderColor: step.color }}>
                                    <p className="text-gray-700 font-medium">
                                        <span className="font-bold">Pourquoi ?</span> {step.intro}
                                    </p>
                                </div>

                                {/* Questions */}
                                {step.questions && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Questions à se poser
                                        </h4>
                                        <ul className="space-y-2">
                                            {step.questions.map((q, i) => (
                                                <li key={i} className="flex items-start gap-3 text-gray-600">
                                                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5" style={{ backgroundColor: step.color }}>
                                                        {i + 1}
                                                    </span>
                                                    {q}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Examples (Step 1) */}
                                {step.examples && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-gray-900 mb-3">Exemples fréquents :</h4>
                                        <div className="grid md:grid-cols-2 gap-2">
                                            {step.examples.map((ex, i) => (
                                                <div key={i} className="flex items-center gap-2 bg-red-50 text-red-700 text-sm px-3 py-2 rounded-lg">
                                                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                    </svg>
                                                    {ex}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Criteria (Step 2) */}
                                {step.criteria && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-gray-900 mb-3">Critères pour prioriser :</h4>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="border-b border-gray-200">
                                                        <th className="text-left py-2 px-3 font-semibold text-gray-900">Critère</th>
                                                        <th className="text-left py-2 px-3 font-semibold text-gray-900">Exemple</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {step.criteria.map((c, i) => (
                                                        <tr key={i} className="border-b border-gray-100">
                                                            <td className="py-3 px-3 font-medium text-gray-700">{c.label}</td>
                                                            <td className="py-3 px-3 text-gray-600">{c.example}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Automations (Step 3) */}
                                {step.automations && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-gray-900 mb-3">Automatisations faciles à activer dans Odoo :</h4>
                                        <div className="space-y-2">
                                            {step.automations.map((auto, i) => (
                                                <div key={i} className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-3 rounded-lg">
                                                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {auto}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tip */}
                                {step.tip && (
                                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                        <p className="text-blue-800 font-medium flex items-start gap-2">
                                            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            À retenir : {step.tip}
                                        </p>
                                    </div>
                                )}

                                {/* Tests (Step 4) */}
                                {step.tests && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-gray-900 mb-3">Exemples de tests à faire :</h4>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="border-b border-gray-200">
                                                        <th className="text-left py-2 px-3 font-semibold text-gray-900">Cas</th>
                                                        <th className="text-left py-2 px-3 font-semibold text-gray-900">Ce qui devrait se passer</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {step.tests.map((t, i) => (
                                                        <tr key={i} className="border-b border-gray-100">
                                                            <td className="py-3 px-3 font-medium text-gray-700">{t.cas}</td>
                                                            <td className="py-3 px-3 text-gray-600">{t.attendu}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Warnings (Step 4) */}
                                {step.warnings && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-gray-900 mb-3">À surveiller :</h4>
                                        <div className="grid md:grid-cols-2 gap-2">
                                            {step.warnings.map((w, i) => (
                                                <div key={i} className="flex items-center gap-2 bg-orange-50 text-orange-700 text-sm px-3 py-2 rounded-lg">
                                                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                    </svg>
                                                    {w}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Monitoring (Step 5) */}
                                {step.monitoring && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-gray-900 mb-3">À suivre régulièrement :</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {step.monitoring.map((m, i) => (
                                                <span key={i} className="bg-pink-50 text-pink-700 px-4 py-2 rounded-full text-sm font-medium">
                                                    {m}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* KPIs (Step 5) */}
                                {step.kpis && (
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">Indicateurs utiles :</h4>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            {step.kpis.map((kpi, i) => (
                                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                                                    <p className="font-medium text-gray-900">{kpi.indicator}</p>
                                                    <p className="text-sm text-gray-500">{kpi.target}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Action (Step 1) */}
                                {step.action && (
                                    <div className="mt-6 bg-primary/10 rounded-xl p-4 border border-primary/20">
                                        <p className="text-primary font-medium flex items-start gap-2">
                                            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                            </svg>
                                            Mini-action : {step.action}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Checklist Preview */}
                <div className="step-block bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-12">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        Exemple de mini-checklist
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-2 px-3 font-semibold text-gray-900">Tâche</th>
                                    <th className="text-center py-2 px-3 font-semibold text-gray-900">Automatisé ?</th>
                                    <th className="text-center py-2 px-3 font-semibold text-gray-900">Testé ?</th>
                                    <th className="text-left py-2 px-3 font-semibold text-gray-900">Commentaire</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CHECKLIST_PREVIEW.map((item, i) => (
                                    <tr key={i} className="border-b border-gray-100">
                                        <td className="py-3 px-3 font-medium text-gray-700">{item.task}</td>
                                        <td className="py-3 px-3 text-center">
                                            {item.auto ? (
                                                <span className="text-green-500">✓</span>
                                            ) : (
                                                <span className="text-gray-300">○</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-3 text-center">
                                            {item.tested ? (
                                                <span className="text-green-500">✓</span>
                                            ) : (
                                                <span className="text-gray-300">○</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-3 text-gray-600">{item.comment}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* CTA */}
                <div className="step-block rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #012a1e 0%, #014730 50%, #016742 100%)" }}>
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Téléchargez votre checklist complète
                    </h3>
                    <p className="text-white/80 mb-8 max-w-xl mx-auto">
                        Obtenez la version complète prête à remplir, avec tous les champs interactifs et indicateurs de suivi.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={onDownload}
                            className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Je télécharge la checklist
                        </button>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold px-6 py-3 rounded-xl transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Je souhaite être accompagné
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
