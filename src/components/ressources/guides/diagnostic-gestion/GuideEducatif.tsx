"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GuideContentProps {
    onStartDiagnostic: () => void;
}

const CHAPTERS = [
    {
        id: 1,
        title: "Pourquoi structurer sa comptabilité dès le début ?",
        icon: "📘",
        content: (
            <div className="space-y-6">
                <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-primary">
                    <p className="font-medium text-gray-900">🎯 Objectif : Comprendre pourquoi une comptabilité bien structurée est un levier de performance et non une simple obligation administrative.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">✅ La comptabilité : bien plus qu'une contrainte légale</h4>
                    <p className="text-gray-700">La plupart des entrepreneurs voient la comptabilité comme une obligation fiscale. C'est vrai. Mais c'est aussi <strong>un outil puissant de pilotage de l'entreprise</strong>.</p>
                    <p className="text-gray-700 mt-3">Une comptabilité claire permet de prendre de bonnes décisions, de gagner du temps, et de préparer la croissance.</p>
                </div>

                <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                    <h4 className="font-bold text-gray-900 mb-4">⚠️ Les risques d'une comptabilité mal structurée</h4>
                    <ul className="space-y-2">
                        {["Des comptes fourre-tout (ex : 623000 \"divers\", 606000 \"achats non détaillés\")", "Des doublons ou des erreurs de TVA", "Une saisie chronophage et manuelle", "Une incapacité à sortir des tableaux de bord utiles", "Des échanges compliqués avec le cabinet comptable", "Des difficultés lors d'un contrôle fiscal ou bancaire"].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700"><span className="text-red-500">❌</span>{item}</li>
                        ))}
                    </ul>
                    <p className="mt-4 text-sm font-medium text-gray-800">👉 Résultat : on fait de la comptabilité pour l'administration, mais pas pour piloter son entreprise.</p>
                </div>

                <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                    <h4 className="font-bold text-gray-900 mb-4">✅ Les bénéfices d'une architecture comptable bien pensée</h4>
                    <ul className="space-y-2">
                        {["💡 Automatiser une grande partie de la saisie", "📊 Produire des indicateurs de gestion utiles en temps réel", "🔁 Fluidifier les échanges avec le cabinet comptable", "💸 Réduire les coûts liés à des erreurs ou de la ressaisie manuelle", "🚀 Anticiper la croissance (nouveaux produits, canaux, pays…)"].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <h4 className="font-bold text-gray-900 mb-4">🏗️ Ce qu'on entend par "architecture comptable"</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                        {["Un plan comptable adapté à l'activité", "Une organisation documentaire claire", "Des outils connectés entre eux", "Des automatisations simples", "Des indicateurs lisibles pour le dirigeant"].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 bg-white rounded-lg p-3 text-sm text-gray-700"><span className="w-2 h-2 bg-blue-500 rounded-full" />{item}</div>
                        ))}
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Définir les besoins comptables de l'entreprise",
        icon: "📋",
        content: (
            <div className="space-y-6">
                <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-primary">
                    <p className="font-medium text-gray-900">🎯 Objectif : Identifier les spécificités de l'activité pour bâtir une comptabilité adaptée, claire et évolutive dès le départ.</p>
                </div>

                <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/20">
                    <p className="text-gray-800">✅ <strong>Comptabilité sur-mesure = pilotage efficace</strong></p>
                    <p className="text-gray-700 mt-2">Une comptabilité utile reflète la réalité économique de l'entreprise, pas seulement les obligations fiscales.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">❓ Les questions clés à se poser</h4>
                    <div className="space-y-4">
                        {[
                            { title: "🔹 Activité de l'entreprise", questions: ["Que vendez-vous ? (biens, services, abonnements…)", "À qui vendez-vous ? (particuliers, entreprises, administration)", "Votre CA est-il concentré sur quelques produits/clients ou réparti ?"] },
                            { title: "🔹 Organisation commerciale", questions: ["Combien de canaux de vente ?", "Faut-il suivre les ventes par canal, produit, équipe ?"] },
                            { title: "🔹 Structure juridique et fiscale", questions: ["Régime de TVA ? (réel, franchise, intracommunautaire…)", "Statut : micro, EI, société, holding ?", "Activités distinctes à suivre séparément ?"] },
                            { title: "🔹 Objectifs de gestion", questions: ["Souhaitez-vous suivre la rentabilité par activité, produit, client ?", "Quels indicateurs vous intéressent vraiment ?", "Avez-vous besoin de scénarios prévisionnels ?"] }
                        ].map((block, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-4">
                                <h5 className="font-medium text-gray-900 mb-2">{block.title}</h5>
                                <ul className="space-y-1">{block.questions.map((q, j) => <li key={j} className="text-sm text-gray-600 flex items-center gap-2"><span className="w-1 h-1 bg-gray-400 rounded-full" />{q}</li>)}</ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <h5 className="font-bold text-gray-900 mb-2">🧪 Exemple 1 : Consultant indépendant</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• 1 seul service vendu</li>
                            <li>• Faible volume de factures</li>
                            <li>• Objectif : suivi trésorerie + estimation impôt</li>
                        </ul>
                        <p className="text-xs text-blue-700 mt-2">🔧 Besoins : Comptabilité ultra légère</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                        <h5 className="font-bold text-gray-900 mb-2">🧪 Exemple 2 : E-commerçant multicanal</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• 200 commandes/mois via Shopify + Amazon</li>
                            <li>• TVA internationale, stocks</li>
                            <li>• Objectif : marge par produit, reporting mensuel</li>
                        </ul>
                        <p className="text-xs text-purple-700 mt-2">🔧 Besoins : ERP, plan comptable personnalisé, automatisation</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Construire un plan comptable personnalisé (PCMN 🇧🇪)",
        icon: "🏗️",
        content: (
            <div className="space-y-6">
                <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-primary">
                    <p className="font-medium text-gray-900">🎯 Objectif : Personnaliser le PCMN pour le rendre plus lisible, plus automatisable, et plus utile au pilotage.</p>
                </div>

                <div className="bg-secondary/10 rounded-xl p-4">
                    <p className="text-gray-800">✅ Le Plan Comptable Minimum Normalisé (PCMN) est obligatoire en Belgique. Il fixe une structure minimale, mais <strong>autorise la création de sous-comptes</strong> pour une comptabilité mieux adaptée.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">✅ Objectifs d'un plan comptable adapté</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                        {["Classer logiquement les opérations", "Distinguer les types d'activité", "Automatiser des tâches", "Faciliter le suivi (rentabilité, marge)", "Préparer la croissance"].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 bg-green-50 rounded-lg p-3 text-sm text-gray-700"><span className="text-green-500">✓</span>{item}</div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <h5 className="font-bold text-gray-900 mb-2">🔹 Produits (classe 70-75)</h5>
                        <p className="text-xs text-gray-500 mb-2">Personnalisation recommandée :</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>700001 – Vente boutique physique</li>
                            <li>700002 – Vente site e-commerce</li>
                            <li>704001 – Prestations de conseil</li>
                            <li>704002 – Formations en ligne</li>
                        </ul>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                        <h5 className="font-bold text-gray-900 mb-2">🔹 Charges (classe 60-64)</h5>
                        <p className="text-xs text-gray-500 mb-2">Personnalisation possible :</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>611001 – Publicité Facebook</li>
                            <li>611002 – Prestations freelance</li>
                            <li>611003 – Logiciels SaaS</li>
                            <li>600001 – Produits revente Amazon</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-2xl p-6 text-white">
                    <h4 className="font-bold mb-3">💡 Astuce : Comptes financiers (classe 55)</h4>
                    <p className="text-white/80 text-sm mb-3">Créer un compte bancaire distinct par canal ou solution de paiement :</p>
                    <div className="flex flex-wrap gap-2">
                        {["550000 – Compte courant", "550001 – Compte n°2", "550003 – PayPal", "550004 – Stripe"].map((c, i) => (
                            <span key={i} className="bg-white/10 px-3 py-1 rounded text-sm">{c}</span>
                        ))}
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 4,
        title: "Organiser les documents et les flux comptables",
        icon: "📂",
        content: (
            <div className="space-y-6">
                <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-primary">
                    <p className="font-medium text-gray-900">🎯 Objectif : Mettre en place une organisation simple pour centraliser, classer et automatiser les pièces comptables.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead><tr className="bg-gray-100"><th className="p-3 text-left font-semibold">Type de document</th><th className="p-3 text-left font-semibold">Exemples</th></tr></thead>
                        <tbody>
                            {[["📄 Factures de vente", "Factures clients, tickets de caisse"], ["📥 Factures d'achat", "Fournisseurs, abonnements, outils"], ["💳 Relevés bancaires", "Comptes, PayPal, Stripe"], ["🧾 Notes de frais", "Déplacements, achats divers"], ["📃 Contrats", "Baux, contrats fournisseurs"]].map(([type, ex], i) => (
                                <tr key={i} className="border-b border-gray-100"><td className="p-3 font-medium">{type}</td><td className="p-3 text-gray-600">{ex}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <h4 className="font-bold text-gray-900 mb-3">📁 Structure de classement recommandée</h4>
                    <div className="bg-gray-900 text-green-400 rounded-xl p-4 font-mono text-sm">
                        <p>📁 Comptabilité 2026</p>
                        <p className="pl-4">├── 01_Ventes</p>
                        <p className="pl-4">├── 02_Achats</p>
                        <p className="pl-4">├── 03_Banques</p>
                        <p className="pl-4">├── 04_Social</p>
                        <p className="pl-4">├── 05_TVA</p>
                        <p className="pl-4">└── 06_Notes de frais</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">🧠 Convention de nommage : <code className="bg-gray-200 px-1 rounded">[Date]_NomFournisseur_Montant.pdf</code></p>
                </div>

                <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                    <h4 className="font-bold text-gray-900 mb-3">⚡ Automatiser la récupération</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl p-4">
                            <h5 className="font-medium text-gray-900 mb-2">🏦 Connexion bancaire</h5>
                            <p className="text-sm text-gray-600">Intégrer les comptes aux logiciels compatibles (Odoo, Yuki...). Récupération automatique des extraits CODA.</p>
                        </div>
                        <div className="bg-white rounded-xl p-4">
                            <h5 className="font-medium text-gray-900 mb-2">📧 Email dédié</h5>
                            <p className="text-sm text-gray-600">Centraliser les factures fournisseurs via : <code className="bg-gray-100 px-1 rounded">factures@entreprise.be</code></p>
                        </div>
                    </div>
                </div>

                <div className="bg-secondary/10 rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-2">📅 Fréquence recommandée</h4>
                    <div className="flex flex-wrap gap-3 text-sm">
                        <span className="bg-white px-3 py-1 rounded-full"><strong>Hebdo :</strong> scan, classement, suivi paiements</span>
                        <span className="bg-white px-3 py-1 rounded-full"><strong>Mensuel :</strong> pointage, contrôle factures manquantes</span>
                        <span className="bg-white px-3 py-1 rounded-full"><strong>Trimestriel :</strong> clôture TVA, tableau de bord</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 5,
        title: "Choisir les bons outils comptables et connectés",
        icon: "⚙️",
        content: (
            <div className="space-y-6">
                <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-primary">
                    <p className="font-medium text-gray-900">🎯 Objectif : Choisir des outils au service de la performance opérationnelle de l'entreprise.</p>
                </div>

                <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                    <h4 className="font-bold text-gray-900 mb-3">⚠️ Une réalité souvent ignorée</h4>
                    <p className="text-gray-700">L'entreprise et l'expert-comptable externe poursuivent des <strong>objectifs différents</strong>.</p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-white rounded-xl p-4">
                            <h5 className="font-medium text-gray-900 mb-2">👔 L'expert-comptable cherche à :</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Standardiser les processus</li>
                                <li>• Faire fonctionner tous ses clients de manière similaire</li>
                                <li>• Optimiser sa rentabilité</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-xl p-4">
                            <h5 className="font-medium text-gray-900 mb-2">🏢 L'entreprise cherche à :</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Automatiser au maximum</li>
                                <li>• Réduire les tâches administratives</li>
                                <li>• Piloter en temps réel</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <h4 className="font-bold text-gray-900 mb-2">💸 Le coût caché de multiplier les outils</h4>
                    <p className="text-gray-700 text-sm">Plus il y a d'outils, plus il y a d'interfaces, plus il y a de frictions : <strong>productivité ↓, coûts ↑, ressaisies multiples, automatisation partielle.</strong></p>
                </div>

                <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #714b67, #8e6180)" }}>
                    <h4 className="font-bold mb-4">✅ Pourquoi Odoo est l'outil le plus efficace</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                        {["🌐 ERP totalement intégré", "🧩 Personnalisation complète", "🤖 Automatisation avancée", "📊 Pilotage en temps réel"].map((item, i) => (
                            <div key={i} className="bg-white/10 rounded-lg p-3 text-sm">{item}</div>
                        ))}
                    </div>
                    <p className="text-white/70 text-sm mt-4">👉 Le retour sur investissement est très élevé dès que l'entreprise veut grandir, structurer, réduire ses frais administratifs.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead><tr className="bg-gray-100"><th className="p-3 text-left font-semibold">Outil</th><th className="p-3 text-left font-semibold">Avantages entreprise</th><th className="p-3 text-left font-semibold">Limites</th></tr></thead>
                        <tbody>
                            {[["Odoo", "🔥 Centralisation totale, automatisation max", "Mise en place initiale"], ["Banqup", "OCR performant, connexion banques", "Pensé pour le comptable"], ["Yuki", "OCR + banque + compta intégrée", "Flexibilité limitée"], ["Exact Online", "Puissant, multi-devises", "Complexe, coûteux"]].map(([outil, av, lim], i) => (
                                <tr key={i} className="border-b border-gray-100"><td className="p-3 font-medium">{outil}</td><td className="p-3 text-gray-600">{av}</td><td className="p-3 text-gray-500">{lim}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
];

export default function GuideEducatif({ onStartDiagnostic }: GuideContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.utils.toArray(".chapter-block").forEach((section) => {
            gsap.fromTo(section as Element, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: section as Element, start: "top 80%", toggleActions: "play none none reverse" } });
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 py-16">
                {/* Introduction */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">E-book Gratuit</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Structurer sa comptabilité PME</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Posez des bases solides : plan comptable personnalisé (PCMN 🇧🇪), organisation documentaire et choix des bons outils.</p>
                </div>

                {/* Chapters */}
                <div className="space-y-16">
                    {CHAPTERS.map((chapter) => (
                        <section key={chapter.id} id={`chapter-${chapter.id}`} className="chapter-block scroll-mt-24">
                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-2xl shadow-lg shrink-0">{chapter.icon}</div>
                                <div>
                                    <span className="text-sm text-primary uppercase tracking-wider font-medium">Chapitre {chapter.id}</span>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{chapter.title}</h3>
                                </div>
                            </div>
                            <div className="pl-0 md:pl-[4.5rem]">{chapter.content}</div>
                            {chapter.id < CHAPTERS.length && <div className="mt-12 border-b border-gray-200" />}
                        </section>
                    ))}
                </div>

                {/* CTA Diagnostic */}
                <div id="diagnostic" className="mt-20 bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden scroll-mt-24">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="relative z-10">
                        <span className="inline-block bg-secondary/20 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">🧪 Test Interactif</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Évaluez votre maturité comptable en 2 minutes</h2>
                        <p className="text-white/70 max-w-xl mx-auto mb-4">17 questions, 4 blocs thématiques, score personnalisé et recommandations basées sur VOS réponses.</p>

                        {/* Social proof - Point 5 */}
                        <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
                            💡 Ce diagnostic est souvent partagé entre entrepreneurs pour comparer leur organisation et échanger de bonnes pratiques.
                        </p>

                        <button onClick={onStartDiagnostic} className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg active:scale-[0.98]">
                            Commencer le diagnostic
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </button>

                        {/* Badge de crédibilité - Point 6 */}
                        <p className="text-white/40 text-xs mt-6 flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Recommandé par d&apos;autres entrepreneurs pour évaluer leur organisation comptable
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
