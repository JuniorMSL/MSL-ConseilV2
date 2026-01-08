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
    intro: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    daf: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    ),
    roles: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    ),
    indispensable: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
    alternative: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
    signals: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
    action: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
    ),
    conclusion: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    ),
};

const SECTIONS: Section[] = [
    {
        id: 1,
        title: "Introduction : Pourquoi ce guide ?",
        icon: Icons.intro,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    En 2026, les PME belges évoluent dans un contexte économique complexe : <strong>inflation persistante, digitalisation accrue, pression financière, accès au financement plus exigeant</strong>. Pourtant, de nombreuses entreprises pilotent encore à l'intuition, avec des chiffres incomplets, sans tableaux de bord fiables ni stratégie financière claire.
                </p>
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-xl">🎯</span>
                        Ce guide s'adresse à vous si :
                    </h4>
                    <ul className="space-y-3">
                        {[
                            "Vous sentez que votre pilotage financier est trop réactif",
                            "Vous prenez des décisions avec une visibilité partielle",
                            "Vous vous interrogez sur la pertinence d'embaucher (ou non) un Directeur Financier"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700">
                                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg font-medium text-gray-900">
                        <span className="text-secondary font-bold">Objectif :</span> vous aider à comprendre les rôles financiers clés, évaluer vos besoins réels, et décider d'une stratégie adaptée à votre PME.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Le DAF, bras droit stratégique",
        icon: Icons.daf,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Le Directeur Financier (DAF) est le <strong>copilote du dirigeant</strong>. Il assure la stratégie financière globale de l'entreprise : prévisions, budget, marges, trésorerie, investissements, gestion des risques.
                </p>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                    <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                        🛠️ Missions principales
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            "Élaborer et suivre le budget annuel",
                            "Piloter la trésorerie et les financements",
                            "Créer les indicateurs de pilotage",
                            "Participer aux décisions d'investissement",
                            "Garantir la fiabilité des comptes",
                            "Manager les équipes finances, RH ou juridique"
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
                <div className="flex items-center gap-4 bg-primary/5 rounded-xl p-4 border border-primary/10">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500 uppercase tracking-wider">Posture</span>
                        <p className="text-gray-900 font-medium">Interne, stratégique, transverse</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Pourquoi un seul profil ne peut pas tout faire",
        icon: Icons.roles,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Beaucoup de dirigeants pensent que l'expert-comptable suffit. D'autres font appel à un contrôleur de gestion. Mais ces fonctions sont <strong>différentes, complémentaires</strong>, et doivent idéalement être tenues par des personnes distinctes.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-gray-300 transition-colors">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-2xl">📜</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">L'Expert-Comptable</h4>
                        <p className="text-sm text-gray-500 mb-3">Garant externe de la conformité</p>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                Bilan, déclarations fiscales
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                Tenue comptable
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                Accompagnement ponctuel
                            </li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <span className="text-xs text-gray-400 uppercase tracking-wider">Posture : Externe, réglementaire</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border-2 border-secondary/30 hover:border-secondary/50 transition-colors">
                        <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-2xl">📊</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Le Contrôleur de Gestion</h4>
                        <p className="text-sm text-gray-500 mb-3">Analyste de la performance</p>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                Suivi budgétaire, KPI
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                Tableaux de bord
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                Analyse des écarts
                            </li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <span className="text-xs text-secondary uppercase tracking-wider">Posture : Interne, opérationnelle</span>
                        </div>
                    </div>
                </div>
                {/* Metaphore */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-xl">🧠</span>
                        Métaphore : la salle d'opération
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-white/60 rounded-xl">
                            <span className="text-3xl block mb-2">👨‍⚕️</span>
                            <p className="font-medium text-gray-900">L'anesthésiste</p>
                            <p className="text-sm text-gray-500">Expert-comptable</p>
                            <p className="text-xs text-gray-400 mt-1">Sécurité réglementaire</p>
                        </div>
                        <div className="text-center p-4 bg-white/60 rounded-xl">
                            <span className="text-3xl block mb-2">🧑‍⚕️</span>
                            <p className="font-medium text-gray-900">Le chirurgien</p>
                            <p className="text-sm text-gray-500">Contrôleur de gestion</p>
                            <p className="text-xs text-gray-400 mt-1">Exécution et ajustement</p>
                        </div>
                        <div className="text-center p-4 bg-secondary/10 rounded-xl border-2 border-secondary/20">
                            <span className="text-3xl block mb-2">🧠</span>
                            <p className="font-medium text-gray-900">Le chef de bloc</p>
                            <p className="text-sm text-secondary font-medium">DAF</p>
                            <p className="text-xs text-gray-400 mt-1">Coordination stratégique</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 4,
        title: "Pourquoi un DAF devient indispensable dans une PME",
        icon: Icons.indispensable,
        content: (
            <div className="space-y-6">
                <div className="bg-primary text-white rounded-2xl p-6">
                    <p className="text-xl font-medium">
                        🎯 Le DAF relie <strong>stratégie, opérations et données</strong>. Il transforme les données en décisions.
                    </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4">🔍 Situations typiques où un DAF fait la différence</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            { icon: "📊", text: "Modélisation des recrutements ou investissements" },
                            { icon: "📈", text: "Calculs de ROI" },
                            { icon: "💰", text: "Préparation d'une levée de fonds ou d'un financement" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                                <span className="text-2xl block mb-2">{item.icon}</span>
                                <p className="text-sm text-gray-700">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                    <p className="text-gray-700">
                        💼 <strong>Le DAF parle la langue</strong> du dirigeant, du banquier, de l'investisseur et du logiciel comptable.
                    </p>
                </div>
                {/* Cost table */}
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">📉 Pourquoi peu de PME embauchent un DAF ?</h4>
                    <div className="overflow-hidden rounded-2xl border border-gray-200">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-900 text-white">
                                    <th className="text-left p-4 font-semibold">Poste</th>
                                    <th className="text-right p-4 font-semibold">Montant annuel (Belgique)</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {[
                                    { poste: "Salaire brut", montant: "90 000 – 130 000 €" },
                                    { poste: "Charges patronales (25%)", montant: "22 500 – 32 500 €" },
                                    { poste: "Outils, avantages, etc.", montant: "5 000 – 10 000 €" },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-gray-100">
                                        <td className="p-4 text-gray-700">{row.poste}</td>
                                        <td className="p-4 text-right text-gray-600">{row.montant}</td>
                                    </tr>
                                ))}
                                <tr className="bg-red-50">
                                    <td className="p-4 font-bold text-gray-900">Total annuel</td>
                                    <td className="p-4 text-right font-bold text-red-600">≈ 115 000 – 170 000 €</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 5,
        title: "Une alternative intelligente : DAF à temps partiel + outils digitaux",
        icon: Icons.alternative,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Plutôt que recruter à plein temps, certaines PME adoptent une <strong>solution hybride plus réaliste</strong>.
                </p>
                {/* Combo gagnant */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                    <h4 className="font-bold text-gray-900 mb-4">🧩 Combo gagnant :</h4>
                    <div className="overflow-hidden rounded-xl border border-green-200">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-green-100">
                                    <th className="text-left p-3 font-semibold text-green-800">Ressource</th>
                                    <th className="text-left p-3 font-semibold text-green-800">Rôle</th>
                                    <th className="text-left p-3 font-semibold text-green-800">Bénéfice PME</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { ressource: "Odoo Finance bien paramétré", role: "Centralisation, automatisation", benefice: "Visibilité, gain de temps" },
                                    { ressource: "DAF à temps partiel (2 à 6 j/mois)", role: "Stratégie, pilotage, coaching", benefice: "Expertise accessible" },
                                    { ressource: "Formation interne", role: "Montée en compétence", benefice: "Autonomie interne" },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-green-100 bg-white">
                                        <td className="p-3 font-medium text-gray-900">{row.ressource}</td>
                                        <td className="p-3 text-gray-600">{row.role}</td>
                                        <td className="p-3 text-green-700">{row.benefice}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Comparatif */}
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">💰 Comparatif DAF interne vs DAF à temps partiel :</h4>
                    <div className="overflow-hidden rounded-2xl border border-gray-200">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="text-left p-4 font-semibold text-gray-900">Critère</th>
                                    <th className="text-center p-4 font-semibold text-gray-500">DAF Interne</th>
                                    <th className="text-center p-4 font-semibold text-green-600 bg-green-50">DAF à temps partiel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { critere: "Coût annuel", interne: "115K – 170K €", partiel: "18K – 36K €" },
                                    { critere: "Flexibilité", interne: "Faible", partiel: "Haute" },
                                    { critere: "Compétence senior", interne: "Oui", partiel: "Oui" },
                                    { critere: "Charge salariale", interne: "Fixe", partiel: "Variable" },
                                    { critere: "ROI perçu", interne: "Moyen", partiel: "Élevé" },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-gray-100">
                                        <td className="p-4 font-medium text-gray-900">{row.critere}</td>
                                        <td className="p-4 text-center text-gray-500">{row.interne}</td>
                                        <td className="p-4 text-center text-green-700 bg-green-50/50 font-medium">{row.partiel}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Case study */}
                <div className="bg-gray-900 text-white rounded-2xl p-6">
                    <h4 className="font-bold mb-4">🧾 Simulation d'impact (PME B)</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/10 rounded-xl p-4">
                            <span className="text-red-400 text-sm uppercase tracking-wider">Avant</span>
                            <p className="text-white mt-2">Marge nette à <strong>4%</strong>, trésorerie tendue</p>
                        </div>
                        <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
                            <span className="text-green-400 text-sm uppercase tracking-wider">Après 9 mois</span>
                            <p className="text-white mt-2">Marge à <strong>8,5%</strong>, <strong>+78 000 €</strong> économisés</p>
                        </div>
                    </div>
                    <p className="text-white/70 text-sm mt-4">
                        Outils mis en place : Odoo Finance + tableau de bord + DAF 6 j/mois
                    </p>
                </div>
                {/* Testimonial */}
                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <div className="flex items-start gap-4">
                        <span className="text-4xl">🗣️</span>
                        <div>
                            <p className="text-gray-700 italic">
                                "Grâce à notre DAF à temps partiel, on a structuré notre pilotage sans embauche. Les décisions sont plus sûres, les marges meilleures."
                            </p>
                            <p className="text-gray-500 mt-2 text-sm">— Céline, Dirigeante PME B2B (Liège)</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 6,
        title: "5 signaux que vous avez besoin d'un DAF",
        icon: Icons.signals,
        content: (
            <div className="space-y-6">
                <div className="grid gap-4">
                    {[
                        { icon: "❌", text: "Décisions prises sans chiffres fiables", color: "red" },
                        { icon: "❌", text: "Trésorerie floue ou tendue", color: "red" },
                        { icon: "❌", text: "Rentabilité réelle inconnue", color: "red" },
                        { icon: "❌", text: "Expert-comptable débordé", color: "red" },
                        { icon: "❌", text: "Manque de crédibilité face aux financeurs", color: "red" },
                    ].map((signal, i) => (
                        <div key={i} className="flex items-center gap-4 bg-red-50 rounded-xl p-5 border border-red-100 hover:border-red-200 transition-colors">
                            <span className="text-2xl">{signal.icon}</span>
                            <span className="text-gray-800 font-medium">{signal.text}</span>
                        </div>
                    ))}
                </div>
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl p-6 mt-6">
                    <p className="text-lg flex items-center gap-3">
                        <span className="text-2xl">💡</span>
                        <strong>Un DAF (même partiel) transforme ces faiblesses en leviers d'action.</strong>
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 7,
        title: "Démarrer concrètement en 30 jours",
        icon: Icons.action,
        content: (
            <div className="space-y-6">
                <div className="relative">
                    <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary hidden md:block" />
                    <div className="space-y-6">
                        {[
                            {
                                week: "Semaine 1",
                                title: "Diagnostic rapide",
                                content: "Ai-je un budget ? Des KPI ? Une vision claire ?"
                            },
                            {
                                week: "Semaine 2",
                                title: "Choisir ses 3 priorités + 5 KPI",
                                content: "Ex : trésorerie, marges, coûts fixes, DSO, CA mensuel"
                            },
                            {
                                week: "Semaine 3",
                                title: "Structurer les outils",
                                content: "Excel ou Odoo selon maturité"
                            },
                            {
                                week: "Semaine 4",
                                title: "Être accompagné par un DAF externe",
                                content: "Mission courte, impact long terme"
                            }
                        ].map((step, i) => (
                            <div key={i} className="flex gap-6 items-start">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg shadow-primary/25 relative z-10">
                                    {i + 1}
                                </div>
                                <div className="flex-1 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                                    <span className="text-sm text-secondary font-medium uppercase tracking-wider">{step.week}</span>
                                    <h4 className="font-bold text-gray-900 mt-1 mb-2">{step.title}</h4>
                                    <p className="text-gray-600">{step.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-green-50 rounded-2xl p-6 border border-green-100 mt-6">
                    <p className="text-lg text-green-800 font-medium flex items-center gap-3">
                        <span className="text-2xl">📌</span>
                        <strong>Résultat : Pilotage opérationnel + vision stratégique</strong>
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 8,
        title: "Conclusion – Le pilotage, c'est une posture",
        icon: Icons.conclusion,
        content: (
            <div className="space-y-6">
                <p className="text-xl text-gray-700 leading-relaxed">
                    Les PME qui traversent les crises ne sont pas celles qui recrutent plus vite. <strong>Ce sont celles qui voient plus clair, plus tôt.</strong>
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                        <p className="flex items-center gap-3 text-green-800">
                            <span className="text-xl">✅</span>
                            Vous n'avez pas besoin d'un DAF à temps plein
                        </p>
                    </div>
                    <div className="bg-secondary/10 rounded-xl p-5 border border-secondary/20">
                        <p className="flex items-center gap-3 text-gray-800">
                            <span className="text-xl">✅</span>
                            Mais vous avez besoin de son pilotage, de ses outils, de son regard stratégique
                        </p>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-center">
                    <span className="text-4xl block mb-4">🎙️</span>
                    <p className="text-xl text-white italic">
                        "Le bon pilotage, ce n'est pas plus de chiffres.<br />
                        <strong className="text-secondary">C'est mieux utiliser les bons chiffres. Au bon moment.</strong>"
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
                        Parcourez les 8 chapitres du guide pour comprendre si votre PME a besoin d'un DAF et comment structurer votre pilotage financier.
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
                                <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-gray-900/20 shrink-0">
                                    {section.icon}
                                </div>
                                <div>
                                    <span className="text-sm text-gray-400 uppercase tracking-wider font-medium">
                                        {section.id === 1 ? "Introduction" : section.id === 8 ? "Conclusion" : `Chapitre ${section.id - 1}`}
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

                {/* CTA Section */}
                <div className="mt-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10">
                        <span className="inline-block bg-secondary/20 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                            Prêt à passer à l'action ?
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Évaluez votre besoin en pilotage financier
                        </h2>
                        <p className="text-white/70 max-w-xl mx-auto mb-8">
                            Répondez à notre questionnaire pour découvrir si votre PME a besoin d'un DAF et lequel choisir.
                        </p>
                        <button
                            onClick={onStartQuiz}
                            className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-secondary/25 active:scale-[0.98]"
                        >
                            Commencer l'évaluation
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
