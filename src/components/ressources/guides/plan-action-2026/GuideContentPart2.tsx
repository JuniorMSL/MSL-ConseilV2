"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GuideContentPart2Props {
    onDownload: () => void;
    onBack: () => void;
}

export default function GuideContentPart2({ onDownload, onBack }: GuideContentPart2Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.utils.toArray(".section-block").forEach((section) => {
            gsap.fromTo(section as Element, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: section as Element, start: "top 80%", toggleActions: "play none none reverse" } });
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full bg-gray-50">
            <div className="py-8 px-6 bg-gradient-to-r from-primary to-primary/90">
                <div className="max-w-4xl mx-auto">
                    <button onClick={onBack} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Retour aux chapitres 1-5
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-16">
                {/* Section 6: Méthodologie */}
                <section id="section-6" className="section-block scroll-mt-24 mb-20">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-2xl shadow-lg shrink-0">🚀</div>
                        <div>
                            <span className="text-sm text-primary uppercase tracking-wider font-medium">Chapitre 6</span>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">Méthodologie de mise en place en 4 étapes</h3>
                        </div>
                    </div>
                    <div className="pl-0 md:pl-[4.5rem] space-y-8">
                        <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-primary"><p className="font-medium text-gray-900">📌 Vision dirigeant : Structurer pour décider plus vite</p></div>

                        {[
                            { step: 1, title: "Faire un bilan de santé de votre gestion", icon: "🛠️", pratiques: ["Listez vos outils (Excel, ERP, CRM…)", "Notez les données que vous suivez ou non", "Évaluez votre maturité"], action: "Répondez à ces 3 questions : Ai-je un budget annuel écrit ? Ai-je un tableau de bord à jour ? Ai-je une visibilité sur ma trésorerie à 30 jours ?" },
                            { step: 2, title: "Définir une vision et un budget annuel", icon: "🎯", pratiques: ["Fixer des objectifs à 12 mois (CA, marge, trésorerie)", "Élaborer un budget structuré (par poste)", "Aligner le budget avec la stratégie"], action: "Formalisez vos 3 objectifs chiffrés prioritaires de l'année." },
                            { step: 3, title: "Choisir vos indicateurs clés (KPI)", icon: "📊", pratiques: ["5 à 10 KPI maximum", "Liés à vos leviers de performance réels", "Mix financier, commercial et RH"], action: "Choisissez 2 indicateurs à mettre à jour chaque semaine. Suivez-les dès lundi prochain." },
                            { step: 4, title: "Mettre en place des outils d'automatisation", icon: "⚙️", pratiques: ["Centraliser les données via ERP (ex : Odoo)", "Utiliser des tableaux de bord dynamiques", "Suivre à fréquence définie (hebdo ou mensuelle)"], action: "Automatisez un premier flux de données (ex : synchronisation bancaire, reporting CRM)." }
                        ].map((etape) => (
                            <div key={etape.step} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">{etape.step}</span>
                                    {etape.icon} Étape {etape.step} : {etape.title}
                                </h4>
                                <div className="bg-green-50 rounded-xl p-4 mb-4">
                                    <p className="text-sm font-medium text-gray-700 mb-2">✅ Bonnes pratiques :</p>
                                    <ul className="space-y-1">{etape.pratiques.map((p, i) => <li key={i} className="text-sm text-gray-600 flex items-center gap-2"><span className="w-1 h-1 bg-green-500 rounded-full" />{p}</li>)}</ul>
                                </div>
                                <div className="bg-secondary/10 rounded-xl p-4"><p className="text-sm"><strong>🚀 Action :</strong> {etape.action}</p></div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 7: Gouvernance */}
                <section id="section-7" className="section-block scroll-mt-24 mb-20">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-2xl shadow-lg shrink-0">🛡️</div>
                        <div>
                            <span className="text-sm text-primary uppercase tracking-wider font-medium">Chapitre 7</span>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">Bonus stratégique : Gouvernance & Risques</h3>
                        </div>
                    </div>
                    <div className="pl-0 md:pl-[4.5rem] space-y-6">
                        <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-primary"><p className="font-medium text-gray-900">📌 Vision dirigeant : Protéger les actifs invisibles mais vitaux</p></div>
                        <p className="text-gray-700">En 2026, vos risques sont aussi bien humains que numériques. Anticipez pour éviter l'interruption.</p>
                        <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                            <h4 className="font-bold text-gray-900 mb-4">✅ Bonnes pratiques</h4>
                            <ul className="space-y-3">
                                {["Plan de cybersécurité basique (sauvegarde, MFA, sensibilisation)", "Continuité des fonctions clés (délégation, documentation)", "Cartographie des risques critiques"].map((p, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700"><span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shrink-0"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></span>{p}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-6 text-white">
                            <h4 className="font-bold mb-3">🚀 Action Bootcamp</h4>
                            <p className="text-white/90">Choisissez un risque majeur (cybersécurité, RH, client unique) et définissez un plan d'atténuation.</p>
                        </div>
                    </div>
                </section>

                {/* Section 8: Grille de maturité */}
                <section id="section-8" className="section-block scroll-mt-24 mb-20">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-2xl shadow-lg shrink-0">📋</div>
                        <div>
                            <span className="text-sm text-primary uppercase tracking-wider font-medium">Chapitre 8</span>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">Grille de maturité du contrôle de gestion</h3>
                        </div>
                    </div>
                    <div className="pl-0 md:pl-[4.5rem]">
                        <p className="text-gray-700 mb-6">📌 <strong>Auto-diagnostic :</strong> Où en êtes-vous ?</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-primary text-white">
                                        <th className="p-3 text-left">Niveau</th>
                                        <th className="p-3 text-left">Description</th>
                                        <th className="p-3 text-left">Cap à franchir</th>
                                        <th className="p-3 text-left">Outil recommandé</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { niveau: "🟢 Débutant", desc: "Aucune démarche structurée", cap: "Mettre en place un budget et tableau de bord", outil: "Excel / Google Sheets" },
                                        { niveau: "🟡 Intermédiaire", desc: "Suivi ponctuel, outils Excel", cap: "Instaurer des rituels mensuels", outil: "Tableaux de bord + Data Studio" },
                                        { niveau: "🔵 Avancé", desc: "Tableaux de bord actualisés", cap: "Automatiser la collecte de données", outil: "ERP + Power BI / Odoo" },
                                        { niveau: "🟣 Leader", desc: "Pilotage temps réel, vision stratégique", cap: "Étendre à l'extra-financier & RSE", outil: "ERP + BI + RSE" },
                                    ].map((row, i) => (
                                        <tr key={i} className="border-b border-gray-100 bg-white hover:bg-gray-50">
                                            <td className="p-3 font-medium">{row.niveau}</td>
                                            <td className="p-3 text-gray-600">{row.desc}</td>
                                            <td className="p-3 text-gray-700">{row.cap}</td>
                                            <td className="p-3 text-primary font-medium">{row.outil}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Section 9: Checklist */}
                <section id="section-9" className="section-block scroll-mt-24 mb-12">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-2xl shadow-lg shrink-0">✅</div>
                        <div>
                            <span className="text-sm text-primary uppercase tracking-wider font-medium">Chapitre 9</span>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">Checklist de mise en œuvre progressive</h3>
                        </div>
                    </div>
                    <div className="pl-0 md:pl-[4.5rem] space-y-6">
                        {[
                            { phase: "Phase 1 : État des lieux", items: ["J'ai identifié les outils actuellement utilisés", "J'ai fait l'inventaire des indicateurs déjà suivis", "J'ai évalué ma maturité de gestion", "J'ai clarifié mes priorités", "J'ai mobilisé les parties prenantes"] },
                            { phase: "Phase 2 : Mise en place des fondamentaux", items: ["J'ai formalisé un budget annuel", "J'ai défini mes 3 objectifs chiffrés", "J'ai mis en place une prévision de trésorerie 12 semaines", "J'ai identifié et suivi au moins 5 KPI", "J'ai mis en place un premier tableau de bord"] },
                            { phase: "Phase 3 : Suivi & Pilotage actif", items: ["J'organise une réunion de pilotage mensuelle", "J'analyse les écarts budget/réalisé chaque mois", "J'ai une visibilité trésorerie à 30 jours", "J'ai identifié un indicateur RSE pertinent", "Je compare mes marges par produit/client"] },
                            { phase: "Phase 4 : Automatisation & Amélioration", items: ["J'ai automatisé au moins un flux de données", "J'ai mis en place un tableau de bord dynamique", "J'ai défini une procédure d'actualisation", "J'ai cartographié mes risques critiques", "J'ai mis en place un plan de continuité"] }
                        ].map((phase, pi) => (
                            <div key={pi} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h4 className="font-bold text-gray-900 mb-4">{phase.phase}</h4>
                                <ul className="space-y-2">
                                    {phase.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                                            <span className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center shrink-0">⬜</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Conclusion */}
                <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-center mb-12">
                    <p className="text-xl md:text-2xl text-white italic mb-6">"Le bon contrôle de gestion, ce n'est pas plus de chiffres.<br /><strong className="text-secondary">Ce sont les bons chiffres, bien interprétés, au bon moment.</strong>"</p>
                    <p className="text-white/60 text-sm">💡 Conseil : imprimez cette checklist et cochez chaque étape. Un bon contrôle de gestion est une construction continue.</p>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="relative z-10">
                        <span className="inline-block bg-secondary/20 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">📎 Téléchargez le guide complet</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Recevez le guide PDF + Checklist Excel</h2>
                        <p className="text-white/70 max-w-xl mx-auto mb-8">Toutes les étapes, études de cas et la checklist complète prêtes à imprimer et à utiliser.</p>
                        <button onClick={onDownload} className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg active:scale-[0.98]">
                            Télécharger gratuitement
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
