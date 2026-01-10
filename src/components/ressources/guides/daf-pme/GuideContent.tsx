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
    growth: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    ),
    alternative: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    ),
    signals: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
    action: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
        title: "Introduction — Pourquoi ce guide existe",
        icon: Icons.intro,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    En 2026, les PME belges évoluent dans un environnement exigeant :
                    <strong> pression sur les marges, décisions plus rapides à prendre, accès au financement plus sélectif, digitalisation accélérée</strong>.
                </p>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <p className="text-gray-600 mb-4">Pourtant, sur le terrain, beaucoup de dirigeants pilotent encore :</p>
                    <ul className="space-y-3">
                        {[
                            "avec des chiffres incomplets",
                            "des tableaux Excel bricolés",
                            "une trésorerie suivie \"au feeling\"",
                            "des décisions prises trop tard"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-600">
                                <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                    <p className="text-lg text-gray-700 italic">
                        "J'ai l'impression de manquer de visibilité pour décider sereinement."
                    </p>
                    <p className="text-sm text-gray-500 mt-2">— Sophie, dirigeante PME de services, Bruxelles</p>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                    Très vite, une question revient : <strong className="text-primary">"Est-ce que j'ai besoin d'un Directeur Financier ?"</strong>
                </p>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg font-medium text-gray-900 flex items-start gap-3">
                        <svg className="w-6 h-6 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                            <strong className="text-secondary">Objectif de ce guide :</strong> vous aider à comprendre si, quand et comment structurer votre pilotage financier — sans recruter trop tôt, ni trop tard.
                        </span>
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
                    Le Directeur Financier (DAF) n'est pas un "super comptable". <strong>Il est le copilote du dirigeant.</strong>
                </p>

                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <p className="text-gray-700 mb-4">
                        À Gand, Claire dirige une PME e-commerce. Son DAF ne s'occupe pas des factures au quotidien.
                        Il l'aide à répondre à des questions clés :
                    </p>
                    <ul className="space-y-2">
                        {[
                            "Peut-on recruter maintenant ?",
                            "Cet investissement est-il rentable ?",
                            "Quelle est la marge réelle par activité ?"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                                <span className="text-secondary">→</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-primary rounded-2xl p-6 text-white">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Rôle du DAF
                        </h4>
                        <ul className="space-y-2 text-white/90">
                            <li>• Traduire les chiffres en décisions</li>
                            <li>• Relier stratégie, opérations et finance</li>
                            <li>• Sécuriser la trajectoire de l'entreprise</li>
                        </ul>
                    </div>

                    <div className="bg-gray-900 rounded-2xl p-6 text-white">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Missions principales
                        </h4>
                        <ul className="space-y-2 text-white/90 text-sm">
                            <li>• Élaboration et suivi du budget</li>
                            <li>• Pilotage de la trésorerie</li>
                            <li>• Mise en place d'indicateurs</li>
                            <li>• Analyse de la rentabilité</li>
                            <li>• Préparation des investissements</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg font-medium text-gray-900 flex items-start gap-3">
                        <svg className="w-6 h-6 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Le DAF n'est pas là pour produire plus de chiffres. <strong className="text-secondary">Il est là pour faire parler les bons chiffres.</strong>
                    </p>
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
                    Beaucoup de dirigeants pensent que l'expert-comptable suffit. D'autres comptent sur un contrôleur de gestion interne.
                    <strong> En réalité, ces rôles sont différents et complémentaires.</strong>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Expert-comptable</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li>• Garant de la conformité légale</li>
                            <li>• Regard externe</li>
                            <li>• Intervient souvent après coup</li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Contrôleur de gestion</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li>• Analyse la performance</li>
                            <li>• Suit les budgets et écarts</li>
                            <li>• Regard opérationnel</li>
                        </ul>
                    </div>

                    <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                        <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-bold text-primary mb-3">DAF</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li>• <strong>Coordonne l'ensemble</strong></li>
                            <li>• <strong>Donne une direction</strong></li>
                            <li>• <strong>Arbitre et anticipe</strong></li>
                        </ul>
                    </div>
                </div>

                <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                    <p className="text-gray-700 italic">
                        À Louvain-la-Neuve, Thomas a voulu tout confier à une seule personne.
                        <strong> Résultat : des décisions tardives et un pilotage fragmenté.</strong>
                    </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg font-medium text-gray-900 flex items-start gap-3">
                        <svg className="w-6 h-6 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Un bon pilotage financier repose sur des <strong className="text-secondary">rôles clairs</strong>, pas sur une personne "qui fait tout".
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 4,
        title: "Pourquoi un DAF devient indispensable",
        icon: Icons.growth,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Un DAF devient critique quand l'entreprise doit <strong>choisir, pas seulement exécuter</strong>.
                </p>

                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <h4 className="font-bold text-gray-900 mb-4">Situations typiques</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                            "Recrutement structurant",
                            "Investissement important",
                            "Financement bancaire",
                            "Croissance rapide",
                            "Tension de trésorerie",
                            "Changement de modèle"
                        ].map((item, i) => (
                            <span key={i} className="px-3 py-2 bg-white rounded-lg text-sm text-gray-700 border border-blue-100">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                    <p className="text-gray-700 italic">
                        À Mons, une PME croît vite mais ne sait pas où elle gagne réellement de l'argent.
                        <strong> Le chiffre d'affaires augmente, la sérénité diminue.</strong>
                    </p>
                </div>

                <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                    <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Le frein principal : le coût
                    </h4>
                    <p className="text-gray-700">
                        Un DAF interne en Belgique représente souvent : <strong className="text-red-700">115 000 à 170 000 € par an</strong>.
                    </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg font-medium text-gray-900 flex items-start gap-3">
                        <svg className="w-6 h-6 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Le besoin de pilotage arrive souvent <strong className="text-secondary">avant la capacité d'embauche</strong>.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 5,
        title: "Une alternative intelligente : DAF à temps partiel",
        icon: Icons.alternative,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    À Charleroi, Alain hésite à recruter. À Liège, Céline fait un autre choix :
                    <strong> un DAF à temps partiel, appuyé par des outils bien structurés</strong>.
                </p>

                <div className="bg-primary rounded-2xl p-6 text-white">
                    <h4 className="font-bold text-secondary mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        Le combo gagnant
                    </h4>
                    <ul className="space-y-3">
                        {[
                            "Odoo Finance bien paramétré",
                            "DAF à temps partiel (2 à 6 jours/mois)",
                            "Montée en compétence interne"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm font-bold">{i + 1}</span>
                                <span className="text-white/90">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Comparison Table */}
                <div className="overflow-hidden rounded-2xl border border-gray-200">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Critère</th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-gray-500">DAF interne</th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-primary">DAF à temps partiel</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { criteria: "Coût", internal: "Très élevé", partial: "Maîtrisé" },
                                { criteria: "Flexibilité", internal: "Faible", partial: "Forte" },
                                { criteria: "Expertise", internal: "Senior", partial: "Senior" },
                                { criteria: "Impact", internal: "Progressif", partial: "Rapide" },
                            ].map((row, i) => (
                                <tr key={i} className="bg-white">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.criteria}</td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-500">{row.internal}</td>
                                    <td className="px-6 py-4 text-center text-sm text-primary font-medium">{row.partial}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                    <h4 className="font-bold text-green-800 mb-3">Cas réel</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold text-green-600">4% → 8,5%</p>
                            <p className="text-sm text-gray-600">Marge</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">+78 000 €</p>
                            <p className="text-sm text-gray-600">Économisés en 9 mois</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">0</p>
                            <p className="text-sm text-gray-600">Embauche</p>
                        </div>
                    </div>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg font-medium text-gray-900 flex items-start gap-3">
                        <svg className="w-6 h-6 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Le pilotage financier n'est pas une question de poste. <strong className="text-secondary">C'est une question de juste niveau d'intervention.</strong>
                    </p>
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
                <p className="text-lg text-gray-700 leading-relaxed">
                    Ces signaux ne sont pas des échecs. <strong>Ce sont des indicateurs de maturité.</strong>
                </p>

                <div className="space-y-4">
                    {[
                        { num: 1, signal: "Décisions prises sans chiffres fiables", desc: "Vous décidez souvent \"au feeling\" faute de données à jour" },
                        { num: 2, signal: "Trésorerie floue ou tendue", desc: "Vous ne savez pas à 3 mois ce qui vous attend" },
                        { num: 3, signal: "Rentabilité mal connue", desc: "Vous ignorez où vous gagnez (ou perdez) réellement de l'argent" },
                        { num: 4, signal: "Expert-comptable débordé ou trop tardif", desc: "Les chiffres arrivent après la décision" },
                        { num: 5, signal: "Manque de crédibilité face aux financeurs", desc: "Les banques demandent des projections que vous n'avez pas" },
                    ].map((item) => (
                        <div key={item.num} className="flex gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-secondary/30 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary font-bold text-lg shrink-0">
                                {item.num}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">{item.signal}</h4>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                    <p className="text-gray-700 italic">
                        À Tournai, le dirigeant attend le bilan pour comprendre.
                        <strong> À Bruxelles, un autre anticipe.</strong>
                    </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg font-medium text-gray-900 flex items-start gap-3">
                        <svg className="w-6 h-6 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Le risque n'est pas de voir ces signaux. <strong className="text-secondary">Le risque est de les ignorer trop longtemps.</strong>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            week: "Semaine 1",
                            title: "Faire une photo honnête",
                            items: ["Budget existant ?", "Trésorerie suivie ?", "Marges connues ?", "Délais de paiement ?"]
                        },
                        {
                            week: "Semaine 2",
                            title: "Choisir l'essentiel",
                            items: ["3 priorités max", "5 indicateurs utiles", "Focus sur l'urgent"]
                        },
                        {
                            week: "Semaine 3",
                            title: "Structurer les outils",
                            items: ["Excel ou Odoo, peu importe", "Clarté avant sophistication", "Automatiser si possible"]
                        },
                        {
                            week: "Semaine 4",
                            title: "Prendre du recul",
                            items: ["Regard externe", "Validation des choix", "Plan d'action"]
                        }
                    ].map((week, i) => (
                        <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full mb-3">
                                {week.week}
                            </span>
                            <h4 className="font-bold text-gray-900 mb-4">{week.title}</h4>
                            <ul className="space-y-2">
                                {week.items.map((item, j) => (
                                    <li key={j} className="flex items-center gap-2 text-gray-600 text-sm">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg font-medium text-gray-900 flex items-start gap-3">
                        <svg className="w-6 h-6 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Mieux vaut avancer progressivement que <strong className="text-secondary">rester bloqué par peur de mal faire</strong>.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 8,
        title: "Conclusion — Le pilotage est une posture",
        icon: Icons.conclusion,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Les PME solides ne sont pas celles qui recrutent le plus vite.
                    <strong> Ce sont celles qui voient plus clair, plus tôt.</strong>
                </p>

                <div className="bg-primary rounded-2xl p-8 text-white text-center">
                    <p className="text-xl mb-6">Vous n'avez peut-être pas besoin d'un DAF à temps plein.</p>
                    <p className="text-lg text-white/80 mb-6">Mais vous avez besoin :</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {["de visibilité", "de méthode", "d'un regard stratégique"].map((item, i) => (
                            <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-secondary font-medium">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-8 border border-secondary/20 text-center">
                    <p className="text-2xl font-serif text-primary mb-4">
                        Le bon pilotage, ce n'est pas plus de chiffres.
                    </p>
                    <p className="text-2xl font-serif text-secondary font-bold">
                        C'est utiliser les bons chiffres, au bon moment, pour décider sereinement.
                    </p>
                </div>
            </div>
        )
    }
];

export default function GuideContent({ onStartDiagnostic }: GuideContentProps) {
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-serif mb-4">
                                Et maintenant, faites votre <span className="text-secondary">diagnostic</span>
                            </h3>
                            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
                                24 questions pour évaluer la maturité financière de votre PME
                                et découvrir si vous avez réellement besoin d'un DAF.
                            </p>
                            <button
                                onClick={onStartDiagnostic}
                                className="px-10 py-5 bg-secondary text-primary rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors duration-300 shadow-xl hover:scale-105"
                            >
                                Commencer le diagnostic
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
