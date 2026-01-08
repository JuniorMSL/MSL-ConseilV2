"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GuideContentProps {
    onStartQuiz: () => void;
}

// Case study component
const CaseStudy = ({ bad, good, moral }: { bad: { name: string; text: string }; good: { name: string; text: string }; moral: string }) => (
    <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
        <h4 className="font-bold text-gray-900 flex items-center gap-2">🧪 Étude de cas</h4>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                <span className="text-red-500 font-bold">🔴 {bad.name}</span>
                <p className="text-sm text-gray-700 mt-2">{bad.text}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <span className="text-green-600 font-bold">🟢 {good.name}</span>
                <p className="text-sm text-gray-700 mt-2">{good.text}</p>
            </div>
        </div>
        <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/20">
            <p className="text-sm font-medium text-gray-800">🎓 Moralité : {moral}</p>
        </div>
    </div>
);

// Action Bootcamp component
const ActionBootcamp = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-6 text-white">
        <h4 className="font-bold mb-3 flex items-center gap-2">🚀 Action Bootcamp</h4>
        <div className="text-white/90">{children}</div>
    </div>
);

const SECTIONS = [
    {
        id: 1,
        title: "La Trésorerie : Le nerf de la guerre",
        icon: "💰",
        vision: "Le cash ne ment jamais.",
        intro: "En 2026, la trésorerie est plus que jamais le révélateur de santé réelle de l'entreprise. Comme on dit : le profit est une opinion, le cash est un fait.",
        surveiller: ["Le flux de trésorerie net (cash-flow)", "Le délai moyen de paiement client (DSO)", "Le délai moyen de paiement fournisseur (DPO)", "Le solde bancaire prévisionnel"],
        pourquoi: "Une entreprise peut être rentable mais se retrouver en difficulté par manque de liquidités. Il est recommandé de suivre sa trésorerie chaque semaine.",
        pratiques: ["Mettre en place une prévision de trésorerie glissante sur 12 semaines", "Paramétrer des alertes de seuil (niveau de trésorerie critique)", "Négocier les conditions de paiement avec vos partenaires"],
        caseBad: { name: "PME « ÉcoSol Bruxelles »", text: "Bien que rentable, elle ne suit sa trésorerie qu'à la fin du mois. Un paiement client en retard crée une rupture de cash. Résultat : salaires payés en retard." },
        caseGood: { name: "PME « ThermoClean Liège »", text: "Suivi hebdomadaire automatisé avec alerte. Elle anticipe une baisse et négocie un report d'échéance. Zéro stress, zéro dette." },
        moral: "Le pilotage de trésorerie est un bouclier. Sans lui, chaque retard devient une crise.",
        action: "Mettez en place un tableau de suivi hebdomadaire avec : solde bancaire, encaissements prévus, décaissements attendus, DSO et DPO."
    },
    {
        id: 2,
        title: "La Rentabilité réelle",
        icon: "📊",
        vision: "Ne cherchez pas à vendre plus, cherchez à vendre mieux.",
        intro: "Une trésorerie solide ne suffit pas : encore faut-il que chaque vente contribue réellement à la marge.",
        surveiller: ["Marge brute unitaire", "Marge nette par segment de clientèle", "Coûts directs et indirects par projet"],
        pourquoi: "Certaines ventes génèrent du CA mais peu de bénéfices. Repérer les « produits gouffres » vous aide à concentrer vos ressources là où elles sont vraiment rentables.",
        pratiques: ["Construire une comptabilité analytique simple", "Évaluer la profitabilité réelle de chaque activité", "Éliminer ou reconfigurer les offres à faible marge"],
        caseBad: { name: "PME « WebCraft Namur »", text: "Un grand client occupe 40% du temps des équipes pour des demandes hors contrat. Rentabilité quasi nulle." },
        caseGood: { name: "PME « Digit'UP Gand »", text: "Marge calculée pour chaque projet. Les clients peu rentables sont convertis vers des forfaits plus justes." },
        moral: "Sans analyse de marge, on confond volume et rentabilité. C'est le meilleur moyen de s'épuiser pour rien.",
        action: "Choisissez un produit phare. Calculez sa marge nette réelle en incluant les coûts cachés (SAV, remises, logistique)."
    },
    {
        id: 3,
        title: "Les Coûts Fixes et Variables",
        icon: "📈",
        vision: "Ce qu'on ne mesure pas, on ne peut pas piloter.",
        intro: "Connaître son point mort, c'est savoir à partir de quel moment on commence à gagner de l'argent. C'est aussi un outil clé de décision.",
        surveiller: ["Le seuil de rentabilité (point mort)", "Le taux de couverture des charges fixes", "L'évolution des charges d'exploitation"],
        pourquoi: "Cette donnée permet de dimensionner vos charges fixes, vos objectifs commerciaux et vos investissements.",
        pratiques: ["Mettre à jour un compte de résultat prévisionnel trimestriel", "Calculer la marge de sécurité (écart entre CA prévu et seuil)", "Réduire les charges fixes non critiques"],
        caseBad: { name: "PME « Studio Design Tournai »", text: "Engage un nouveau salarié sans savoir si le seuil de rentabilité est dépassé. Charge supplémentaire non absorbée." },
        caseGood: { name: "PME « Immo+ Louvain-la-Neuve »", text: "Calcule son seuil chaque trimestre et ajuste ses campagnes marketing en conséquence." },
        moral: "Le seuil de rentabilité n'est pas une formalité : c'est un déclencheur d'actions concrètes.",
        action: "Calculez votre point mort : charges fixes mensuelles ÷ taux de marge moyenne = CA mensuel minimal à atteindre."
    },
    {
        id: 4,
        title: "Le Suivi Budgétaire",
        icon: "🎯",
        vision: "Décider avec les données, pas seulement les ressentis.",
        intro: "L'analyse d'écart vous aide à comprendre ce qui déraille (ou fonctionne mieux que prévu) pour agir rapidement.",
        surveiller: ["Écart entre budget et réalisé mensuel", "Postes sensibles (CA, masse salariale, achats)", "Évolution des KPI opérationnels"],
        pourquoi: "Le budget seul ne suffit pas. Il faut analyser les écarts pour comprendre et ajuster. C'est la boussole stratégique.",
        pratiques: ["Réunions de pilotage mensuelles", "Croiser les données comptables avec les réalités opérationnelles", "Tableaux de bord lisibles, mis à jour"],
        caseBad: { name: "PME « Mobil'Ostende »", text: "Enregistre une baisse de 18% en juin mais ne la découvre qu'en octobre. Perte de réactivité." },
        caseGood: { name: "PME « OfficeSmart Charleroi »", text: "Analyse mensuelle des écarts. En avril, baisse de conversion → formation commerciale immédiate." },
        moral: "On n'ajuste pas le tir sans instrument de mesure. Le suivi budgétaire est votre radar.",
        action: "Comparez votre CA du mois dernier avec votre budget. Analysez un écart majeur et planifiez une action sous 7 jours."
    },
    {
        id: 5,
        title: "Le Reporting Extra-Financier (CSRD)",
        icon: "🌱",
        vision: "Mesurer son impact pour accéder au marché.",
        intro: "Depuis 2026, les attentes RSE ne sont plus optionnelles. PME ou non, il faut démontrer sa contribution à une économie durable.",
        surveiller: ["Consommation énergétique", "Mixité et bien-être au travail", "Bilan carbone simplifié", "Indicateurs sectoriels RSE"],
        pourquoi: "La directive CSRD élargit les obligations de reporting. Ces données sont demandées par les banques et grands clients.",
        pratiques: ["Choisir 3 à 5 indicateurs clés RSE", "Centraliser les données dans un ERP", "Automatiser le reporting extra-financier"],
        caseBad: { name: "PME « LogisEco Mons »", text: "Rejetée dans un appel d'offres public pour absence de données RSE." },
        caseGood: { name: "PME « CleanTech Anvers »", text: "Reporting carbone simplifié intégré à Odoo. Accède à un prêt bancaire à taux bonifié." },
        moral: "La transparence extra-financière ouvre des portes. Le silence, lui, les referme.",
        action: "Identifiez un indicateur RSE pertinent (ex : consommation d'énergie) et commencez à le suivre mensuellement."
    }
];

export default function GuideContent({ onStartQuiz }: GuideContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.utils.toArray(".section-block").forEach((section) => {
            gsap.fromTo(section as Element,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                    scrollTrigger: { trigger: section as Element, start: "top 80%", toggleActions: "play none none reverse" }
                }
            );
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 py-16">
                {/* Intro */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Guide complet 2026</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Points de contrôle incontournables</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">En 2026, l'environnement économique reste incertain. Ce guide vous propose les points de contrôle incontournables accompagnés d'une méthodologie claire.</p>
                </div>

                {/* Sections 1-5 */}
                <div className="space-y-20">
                    {SECTIONS.map((section) => (
                        <section key={section.id} id={`section-${section.id}`} className="section-block scroll-mt-24">
                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-2xl shadow-lg shrink-0">{section.icon}</div>
                                <div>
                                    <span className="text-sm text-primary uppercase tracking-wider font-medium">Chapitre {section.id}</span>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{section.title}</h3>
                                </div>
                            </div>
                            <div className="pl-0 md:pl-[4.5rem] space-y-6">
                                <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-primary">
                                    <p className="font-medium text-gray-900">📌 Vision dirigeant : {section.vision}</p>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{section.intro}</p>
                                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                                    <h4 className="font-bold text-gray-900 mb-3">🔍 Quoi surveiller ?</h4>
                                    <ul className="space-y-2">{section.surveiller.map((item, i) => <li key={i} className="flex items-center gap-2 text-gray-700"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />{item}</li>)}</ul>
                                </div>
                                <div className="bg-secondary/10 rounded-xl p-4"><p className="text-gray-700">🎯 <strong>Pourquoi ?</strong> {section.pourquoi}</p></div>
                                <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                                    <h4 className="font-bold text-gray-900 mb-3">✅ Bonnes pratiques</h4>
                                    <ul className="space-y-2">{section.pratiques.map((item, i) => <li key={i} className="flex items-start gap-2 text-gray-700"><span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span>{item}</li>)}</ul>
                                </div>
                                <CaseStudy bad={section.caseBad} good={section.caseGood} moral={section.moral} />
                                <ActionBootcamp><p>{section.action}</p></ActionBootcamp>
                            </div>
                            {section.id < SECTIONS.length && <div className="mt-16 border-b border-gray-200" />}
                        </section>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-20 bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="relative z-10">
                        <span className="inline-block bg-secondary/20 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">Suite du guide →</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Méthodologie, Gouvernance & Checklist</h2>
                        <p className="text-white/70 max-w-xl mx-auto mb-8">Découvrez la méthodologie en 4 étapes, la grille de maturité et la checklist complète de mise en œuvre.</p>
                        <button onClick={onStartQuiz} className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg active:scale-[0.98]">
                            Continuer le guide
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
