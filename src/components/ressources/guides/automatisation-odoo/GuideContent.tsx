"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// Odoo purple color
const ODOO_PURPLE = "#714b67";

interface GuideContentProps {
    onStartQuiz: () => void;
}

// Chapters 6-11 content
const CHAPTERS = [
    {
        id: 6,
        title: "Automatiser les flux comptables et administratifs avec Odoo",
        icon: "🚀",
        content: (
            <div className="space-y-6">
                <div className="bg-purple-50 rounded-xl p-4 border-l-4" style={{ borderLeftColor: ODOO_PURPLE }}>
                    <p className="font-medium text-gray-900">🎯 Objectif : gagner du temps, réduire les erreurs et améliorer le pilotage</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">🎯 Pourquoi automatiser ?</h4>
                    <p className="text-gray-700">L&apos;automatisation comptable ne consiste pas seulement à &quot;aller plus vite&quot; : c&apos;est un <strong>levier de rentabilité</strong>, un moyen de réduire les frais généraux, de sécuriser les flux et de libérer du temps à forte valeur ajoutée.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">✅ Ce que permet réellement l&apos;automatisation dans Odoo</h4>
                    <p className="text-gray-600 text-sm mb-4">Avec Odoo, une entreprise peut connecter tous ses flux dans un seul environnement intégré :</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-purple-50">
                                    <th className="p-3 text-left font-semibold text-gray-700">Action</th>
                                    <th className="p-3 text-left font-semibold text-gray-700">Résultat automatique</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Création d'une facture client", "Génération écriture comptable + relance automatique"],
                                    ["Réception d'un relevé bancaire", "Rapprochement automatique avec facture/encaissement"],
                                    ["Achat fournisseur (PDF ou e-mail)", "Lecture OCR + pré-enregistrement comptable"],
                                    ["Paiement fournisseur", "Génération écriture + lettrage automatique"],
                                    ["Vente en boutique (POS)", "Comptabilisation auto + stock mis à jour"],
                                    ["Abonnement client", "Facturation périodique + comptabilisation auto"]
                                ].map(([action, result], i) => (
                                    <tr key={i} className="border-b border-gray-100">
                                        <td className="p-3 text-gray-800">{action}</td>
                                        <td className="p-3 text-gray-600">{result}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">✅ Les modules Odoo clés pour l&apos;automatisation</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                        {[
                            { module: "Invoicing / Comptabilité", desc: "Génération auto, lettrage, TVA, relances" },
                            { module: "Documents", desc: "OCR, classement automatique" },
                            { module: "Bank Synchronization", desc: "Rapprochements et lettrage automatiques" },
                            { module: "Abonnements", desc: "Facturation périodique + comptabilisation" },
                            { module: "Achat", desc: "Génération auto + suivi fournisseur" },
                            { module: "Point de Vente (POS)", desc: "Vente + impact stock + écriture comptable" },
                            { module: "Inventaire", desc: "Valorisation automatique (FIFO, AVCO)" },
                            { module: "Tableaux de bord", desc: "KPI comptables et financier en temps réel" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                                <span className="w-2 h-2 mt-2 rounded-full shrink-0" style={{ backgroundColor: ODOO_PURPLE }} />
                                <div>
                                    <span className="font-medium text-gray-900">{item.module}</span>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                        <h5 className="font-bold text-gray-900 mb-3">📦 Module Inventaire</h5>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Gérer les stocks en temps réel</li>
                            <li>• Valoriser les stocks comptablement</li>
                            <li>• Entrée/sortie automatiques</li>
                            <li>• Suivi des écarts d&apos;inventaire</li>
                        </ul>
                    </div>
                    <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                        <h5 className="font-bold text-gray-900 mb-3">🏪 Module Point de Vente</h5>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Enregistrer les ventes en temps réel</li>
                            <li>• Gérer différents moyens de paiement</li>
                            <li>• Tickets + écritures automatiques</li>
                            <li>• Mouvements de stock auto</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-2xl p-6 text-white">
                    <h4 className="font-bold mb-4">💡 Impact direct sur la rentabilité</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-white/60 mb-2">Avant Odoo</p>
                            <ul className="space-y-1">
                                <li className="flex items-center gap-2"><span className="text-red-400">❌</span> Saisie manuelle et ressaisies</li>
                                <li className="flex items-center gap-2"><span className="text-red-400">❌</span> Outils cloisonnés</li>
                                <li className="flex items-center gap-2"><span className="text-red-400">❌</span> Suivi du stock sur Excel</li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-white/60 mb-2">Avec Odoo automatisé</p>
                            <ul className="space-y-1">
                                <li className="flex items-center gap-2"><span className="text-green-400">✅</span> Automatisation bout en bout</li>
                                <li className="flex items-center gap-2"><span className="text-green-400">✅</span> Un seul outil centralisé</li>
                                <li className="flex items-center gap-2"><span className="text-green-400">✅</span> Stock en temps réel, valorisé</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 7,
        title: "Définir les indicateurs clés pour piloter son activité",
        icon: "📊",
        content: (
            <div className="space-y-6">
                <div className="bg-purple-50 rounded-xl p-4 border-l-4" style={{ borderLeftColor: ODOO_PURPLE }}>
                    <p className="font-medium text-gray-900">🎯 Objectif : transformer la comptabilité automatisée en outil de décision</p>
                </div>

                <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/20">
                    <p className="text-gray-800">📈 Maintenant que les flux sont automatisés, tu disposes d&apos;une <strong>donnée fiable, en temps réel et centralisée</strong>. C&apos;est le moment idéal pour exploiter cette donnée au service du pilotage.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">🔹 1. Indicateurs de rentabilité</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                        {["Chiffre d'affaires par produit / canal / client", "Marge brute (CA – coût des ventes)", "Marge nette (résultat net / CA)", "Résultat par activité ou projet"].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 bg-green-50 rounded-lg p-3 text-sm">
                                <span className="text-green-500">💰</span>
                                <span className="text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-3">👉 Objectif : savoir ce qui rapporte vraiment.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">🔹 2. Indicateurs de trésorerie</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                        {["Solde bancaire total", "Prévision de trésorerie à 30/60/90 jours", "Encours client (créances)", "Encours fournisseur (dettes à payer)"].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 bg-blue-50 rounded-lg p-3 text-sm">
                                <span className="text-blue-500">💳</span>
                                <span className="text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-3">👉 Objectif : éviter les tensions et anticiper les besoins.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">🔹 3. Indicateurs d&apos;exploitation</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                        {["Délai moyen de paiement client/fournisseur", "Nombre de ventes / tickets (POS)", "Taux de transformation devis → factures", "Écart d'inventaire ou taux de rotation"].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 bg-orange-50 rounded-lg p-3 text-sm">
                                <span className="text-orange-500">⚙️</span>
                                <span className="text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-3">👉 Objectif : améliorer les processus internes.</p>
                </div>

                <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                    <h4 className="font-bold text-gray-900 mb-4">📈 Où trouver ces indicateurs dans Odoo ?</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-purple-200">
                                    <th className="p-2 text-left font-semibold">Module</th>
                                    <th className="p-2 text-left font-semibold">Indicateurs disponibles</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Comptabilité", "CA, marges, résultats, créances/dettes"],
                                    ["Banque", "Solde, rapprochements, prévisions"],
                                    ["POS", "Nombre de ventes, panier moyen"],
                                    ["Inventaire", "Stock, valorisation, rotation"],
                                    ["CRM/Vente", "Devis signés, taux de conversion"],
                                    ["Tableaux de bord", "Tous les KPI croisés"]
                                ].map(([module, kpi], i) => (
                                    <tr key={i} className="border-b border-purple-100">
                                        <td className="p-2 font-medium" style={{ color: ODOO_PURPLE }}>{module}</td>
                                        <td className="p-2 text-gray-600">{kpi}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-2xl p-6 text-white">
                    <h4 className="font-bold mb-3">🎯 Bonnes pratiques pour un pilotage efficace</h4>
                    <ul className="space-y-2 text-white/80 text-sm">
                        <li>✅ Définir un tableau de bord mensuel simplifié</li>
                        <li>✅ Choisir 5 à 10 KPI maximum, pertinents</li>
                        <li>✅ Automatiser l&apos;envoi des rapports</li>
                        <li>✅ Partager les indicateurs avec les personnes concernées</li>
                    </ul>
                    <p className="mt-4 text-secondary font-medium">💡 Moins d&apos;indicateurs = plus de clarté = meilleures décisions.</p>
                </div>
            </div>
        )
    },
    {
        id: 8,
        title: "Mettre en place une comptabilité analytique simple",
        icon: "📈",
        content: (
            <div className="space-y-6">
                <div className="bg-purple-50 rounded-xl p-4 border-l-4" style={{ borderLeftColor: ODOO_PURPLE }}>
                    <p className="font-medium text-gray-900">🎯 Objectif : affiner le pilotage sans complexifier inutilement</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">💡 Pourquoi faire de la comptabilité analytique ?</h4>
                    <p className="text-gray-700 mb-4">La comptabilité générale te dit combien tu gagnes au total, mais ne te dit pas <strong>ce qui fonctionne bien ou pas</strong>.</p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                            <h5 className="font-medium text-gray-900 mb-2">Sans analytique</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>❌ Résultat global difficile à interpréter</li>
                                <li>❌ Impossible de savoir quel client est rentable</li>
                                <li>❌ Suivi budgétaire global uniquement</li>
                            </ul>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                            <h5 className="font-medium text-gray-900 mb-2">Avec analytique</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>✅ Résultat par ligne d&apos;activité</li>
                                <li>✅ Rentabilité réelle par segment</li>
                                <li>✅ Budgétisation par projet ou département</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">🔹 Les axes analytiques recommandés</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { axe: "Par projet", desc: "Idéal pour les entreprises de services. Mesurer coûts directs, marge et respect du budget.", icon: "📁" },
                            { axe: "Par client", desc: "Suivi de la rentabilité client. Très utile en B2B.", icon: "👤" },
                            { axe: "Par produit / gamme", desc: "Détection des produits à faible marge. Aide aux décisions de stock.", icon: "📦" },
                            { axe: "Par département", desc: "Suivre le coût de chaque pôle : Commercial, Production, Support...", icon: "🏢" }
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xl">{item.icon}</span>
                                    <h5 className="font-medium text-gray-900">{item.axe}</h5>
                                </div>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <h4 className="font-bold text-gray-900 mb-4">📊 Approche budgétaire : utiliser l&apos;analytique comme levier</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                        <p>✅ Définir un budget par projet ou département</p>
                        <p>✅ Suivre les dépenses en temps réel</p>
                        <p>✅ Alerter si le dépassement budgétaire est proche</p>
                        <p>✅ Corriger ou réallouer les ressources</p>
                    </div>
                    <p className="mt-4 text-blue-700 font-medium">🎯 Cela transforme la comptabilité en outil de gestion proactive.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">⚙️ Comment faire dans Odoo ?</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 text-left font-semibold">Ce qu&apos;on peut faire</th>
                                    <th className="p-3 text-left font-semibold">Dans Odoo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Créer des plans analytiques", "« Projets 2024 », « Clients », « Départements »"],
                                    ["Associer des axes à des opérations", "Automatiquement ou manuellement"],
                                    ["Suivre les performances", "Tableaux croisés, comparaisons budgets"],
                                    ["Suivre les écarts réalisé/budget", "Dans les rapports analytiques"],
                                    ["Générer des alertes", "Paramétrables par module"]
                                ].map(([action, detail], i) => (
                                    <tr key={i} className="border-b border-gray-100">
                                        <td className="p-3 text-gray-800">{action}</td>
                                        <td className="p-3 text-gray-600">{detail}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 9,
        title: "Organiser la production comptable",
        icon: "📅",
        content: (
            <div className="space-y-6">
                <div className="bg-purple-50 rounded-xl p-4 border-l-4" style={{ borderLeftColor: ODOO_PURPLE }}>
                    <p className="font-medium text-gray-900">🎯 Objectif : mettre en place un fonctionnement fluide, fiable et sans oubli</p>
                </div>

                <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/20">
                    <p className="text-gray-800">🔁 Une comptabilité bien organisée repose sur des <strong>routines simples, bien réparties, et bien suivies</strong>. L&apos;objectif est de réduire les oublis, fiabiliser les données, et éviter les pics de charge.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">👥 Qui fait quoi ? Définir les rôles</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 text-left font-semibold">Tâche</th>
                                    <th className="p-3 text-left font-semibold">Responsable</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Émission des devis et factures", "Dirigeant ou assistant commercial"],
                                    ["Réception factures fournisseurs", "Assistant ou automatisation Odoo"],
                                    ["Paiements fournisseurs", "Dirigeant ou responsable finance"],
                                    ["Relances clients", "Assistant ou automatisation"],
                                    ["Contrôle des pièces manquantes", "Comptable externe"],
                                    ["Déclarations TVA et clôtures", "Expert-comptable externe"],
                                    ["Analyse mensuelle des résultats", "Dirigeant ou conseiller"]
                                ].map(([tache, resp], i) => (
                                    <tr key={i} className="border-b border-gray-100">
                                        <td className="p-3 text-gray-800">{tache}</td>
                                        <td className="p-3 text-gray-600">{resp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <h4 className="font-bold text-gray-900 mb-4">📅 Routine comptable hebdomadaire</h4>
                    <div className="grid grid-cols-5 gap-2 text-sm">
                        {[
                            { jour: "Lun", tache: "Scan et classement factures" },
                            { jour: "Mar", tache: "Relance clients en retard" },
                            { jour: "Mer", tache: "Contrôle caisse / POS" },
                            { jour: "Jeu", tache: "Paiement fournisseurs" },
                            { jour: "Ven", tache: "Point banque + rapprochement" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-lg p-3 text-center border border-blue-200">
                                <div className="font-bold text-blue-600">{item.jour}</div>
                                <div className="text-xs text-gray-600 mt-1">{item.tache}</div>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-4">🧠 Astuce : planifier un créneau fixe de 30 min à 1h chaque semaine pour les tâches comptables.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">✅ Checklist de clôture mensuelle</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { cat: "📌 Ventes", items: ["Factures envoyées ?", "Ventes POS comptabilisées ?", "Acomptes enregistrés ?"] },
                            { cat: "📌 Achats", items: ["Factures fournisseurs reçues ?", "Achats bien classés ?", "Factures manquantes relancées ?"] },
                            { cat: "📌 Banque", items: ["Relevés synchronisés ?", "Mouvements lettrés ?", "Frais bancaires comptabilisés ?"] },
                            { cat: "📌 Contrôle", items: ["Tableau de bord généré ?", "Indicateurs analysés ?", "Écarts identifiés ?"] }
                        ].map((block, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-4">
                                <h5 className="font-medium text-gray-900 mb-2">{block.cat}</h5>
                                <ul className="space-y-1">
                                    {block.items.map((item, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                                            <span className="w-4 h-4 bg-gray-200 rounded border border-gray-300" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 10,
        title: "Préparer l'interaction avec le cabinet comptable",
        icon: "🤝",
        content: (
            <div className="space-y-6">
                <div className="bg-purple-50 rounded-xl p-4 border-l-4" style={{ borderLeftColor: ODOO_PURPLE }}>
                    <p className="font-medium text-gray-900">🎯 Objectif : fluidifier les échanges, gagner du temps et rester maître de sa gestion</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                        <h5 className="font-bold text-gray-900 mb-3">🏢 L&apos;entreprise a besoin de :</h5>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>✓ Garder la main sur ses outils (Odoo)</li>
                            <li>✓ Automatiser au maximum</li>
                            <li>✓ Avoir des indicateurs en temps réel</li>
                            <li>✓ Limiter les tâches administratives</li>
                        </ul>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
                        <h5 className="font-bold text-gray-900 mb-3">👔 Le cabinet comptable a besoin de :</h5>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>✓ Données complètes, fiables, lisibles</li>
                            <li>✓ Environnement qu&apos;il maîtrise</li>
                            <li>✓ Processus standardisés</li>
                            <li>✓ Optimiser sa rentabilité</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">📄 Que faut-il transmettre ?</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 text-left font-semibold">Type de document</th>
                                    <th className="p-3 text-left font-semibold">Contenu</th>
                                    <th className="p-3 text-left font-semibold">Format recommandé</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Ventes", "PDF ou export Odoo", "Classées par mois"],
                                    ["Achats", "PDF + bon de commande", "Via module Documents"],
                                    ["Relevés bancaires", "CODA ou API Odoo", "Lettrés si possible"],
                                    ["Notes de frais", "PDF ou dans Odoo", "Avec justificatifs"],
                                    ["Salaires", "Fiches de paie, OD sociales", "PDF + journal OD"]
                                ].map(([type, contenu, format], i) => (
                                    <tr key={i} className="border-b border-gray-100">
                                        <td className="p-3 font-medium text-gray-800">{type}</td>
                                        <td className="p-3 text-gray-600">{contenu}</td>
                                        <td className="p-3 text-gray-500">{format}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">📆 Répartition des rôles claire</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-purple-50">
                                    <th className="p-3 text-left font-semibold">Action</th>
                                    <th className="p-3 text-left font-semibold">Réalisé par</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Création des factures clients", "L'entreprise (via Odoo)"],
                                    ["Saisie des achats", "L'entreprise (ou OCR Odoo)"],
                                    ["Lettrage des paiements", "Automatisé dans Odoo, contrôlé par le cabinet"],
                                    ["Vérification des pièces", "Cabinet comptable"],
                                    ["Déclarations TVA, clôtures", "Cabinet"],
                                    ["Suivi budgétaire, analytique", "L'entreprise"]
                                ].map(([action, par], i) => (
                                    <tr key={i} className="border-b border-gray-100">
                                        <td className="p-3 text-gray-800">{action}</td>
                                        <td className="p-3 text-gray-600">{par}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">🎯 Ce partage évite le &quot;ni fait, ni à faire&quot; et renforce la productivité.</p>
                </div>

                <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                    <h4 className="font-bold text-gray-900 mb-4">✅ Bonnes pratiques de collaboration</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <span className="text-green-500 text-lg">📁</span>
                            <div>
                                <p className="font-medium text-gray-900">Espace de partage</p>
                                <p className="text-sm text-gray-600">Drive partagé ou accès contrôlé à Odoo</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-500 text-lg">📄</span>
                            <div>
                                <p className="font-medium text-gray-900">Formats standards</p>
                                <p className="text-sm text-gray-600">PDF, nommage cohérent</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-500 text-lg">✅</span>
                            <div>
                                <p className="font-medium text-gray-900">Checklist transmission</p>
                                <p className="text-sm text-gray-600">À cocher avant chaque envoi mensuel</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-500 text-lg">📞</span>
                            <div>
                                <p className="font-medium text-gray-900">Point régulier</p>
                                <p className="text-sm text-gray-600">5 à 15 min / mois suffisent</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 11,
        title: "Faire évoluer l'architecture comptable avec la croissance",
        icon: "🚀",
        content: (
            <div className="space-y-6">
                <div className="bg-purple-50 rounded-xl p-4 border-l-4" style={{ borderLeftColor: ODOO_PURPLE }}>
                    <p className="font-medium text-gray-900">🎯 Objectif : adapter ses outils et son organisation sans casser ce qui fonctionne</p>
                </div>

                <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/20">
                    <p className="text-gray-800">📈 Une architecture comptable efficace aujourd&apos;hui peut devenir un frein demain si elle ne suit pas : le développement de l&apos;activité, la diversification des revenus, la structuration de l&apos;équipe, l&apos;expansion géographique.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">⚠️ Signaux que le système doit évoluer</h4>
                    <div className="space-y-3">
                        {[
                            { symptome: "Multiplication des fichiers Excel à côté du système", signification: "Le système actuel n'est plus adapté" },
                            { symptome: "Difficulté à suivre la rentabilité par activité", signification: "Manque d'analytique ou plan comptable trop simple" },
                            { symptome: "Données comptables avec 1-2 mois de retard", signification: "Manque d'automatisation ou de structuration" },
                            { symptome: "Trop d'outils différents non connectés", signification: "Il est temps de centraliser" },
                            { symptome: "Gestion manuelle des flux inter-sociétés", signification: "Passage à multi-sociétés indispensable" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 bg-red-50 rounded-lg p-3 border border-red-100">
                                <span className="text-red-500 text-lg">⚠️</span>
                                <div>
                                    <p className="font-medium text-gray-900">{item.symptome}</p>
                                    <p className="text-sm text-gray-600">→ {item.signification}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">📅 Quand revoir le plan comptable ?</h4>
                    <div className="flex flex-wrap gap-2">
                        {[
                            "💼 Nouvelle ligne d'activité",
                            "🌍 Ouverture à l'international",
                            "🧾 Changement de statut fiscal",
                            "🏗️ Mise en place de projets internes",
                            "💻 Intégration d'un nouveau logiciel"
                        ].map((item, i) => (
                            <span key={i} className="bg-blue-50 text-blue-700 text-sm px-3 py-1.5 rounded-full border border-blue-200">
                                {item}
                            </span>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-4">🧠 Astuce : planifier une revue annuelle du plan comptable.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {[
                        { cas: "Création d'une filiale", actions: ["Multi-sociétés dans Odoo", "Séparation des plans comptables", "Suivi des flux inter-sociétés"] },
                        { cas: "Développement international", actions: ["Activation des multi-devises", "Gestion TVA intracommunautaire", "Formats de facturation adaptés"] },
                        { cas: "Nouvelle gamme de produits", actions: ["Nouveaux comptes analytiques", "Enrichissement du plan comptable", "Suivi rentabilité par gamme"] },
                        { cas: "Structuration d'équipes", actions: ["Rôles utilisateurs dans Odoo", "Validation multi-niveaux", "Suivi par centre de coût"] }
                    ].map((item, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <h5 className="font-bold text-gray-900 mb-3">🔹 {item.cas}</h5>
                            <ul className="space-y-1">
                                {item.actions.map((action, j) => (
                                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                                        {action}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-900 rounded-2xl p-6 text-white">
                    <h4 className="font-bold mb-4">🚀 Accompagner l&apos;évolution avec Odoo</h4>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                        {[
                            { evolution: "+ de produits, de stock", modules: "Inventaire, Achat" },
                            { evolution: "Développement e-commerce", modules: "Odoo Website + eShop" },
                            { evolution: "Gestion RH / équipes", modules: "RH, Congés, Paie" },
                            { evolution: "Croissance internationale", modules: "Multi-devise, multi-sociétés" },
                            { evolution: "Pilotage complexe", modules: "Analytique, Budgets, KPI" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/10 rounded-lg p-3">
                                <span className="text-white/60">{item.evolution}</span>
                                <p className="text-secondary font-medium">{item.modules}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
];

export default function GuideContent({ onStartQuiz }: GuideContentProps) {
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
                    <span className="inline-block text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4" style={{ backgroundColor: ODOO_PURPLE }}>
                        E-book 2 – Guide Avancé
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Ce que vous allez apprendre
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Ce guide est 100% orienté action et rentabilité. Il s&apos;adresse aux dirigeants de PME prêts à utiliser la comptabilité comme levier de pilotage stratégique.
                    </p>
                </div>

                {/* What you'll learn */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-16">
                    <h3 className="font-bold text-gray-900 mb-4">📚 Dans ce second guide, vous apprendrez à :</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                        {[
                            "🤖 Automatiser vos processus comptables et administratifs",
                            "📊 Mettre en place des indicateurs de pilotage clés",
                            "📈 Exploiter la comptabilité analytique sans complexité",
                            "📅 Structurer vos routines de production comptable",
                            "🤝 Collaborer efficacement avec votre expert-comptable",
                            "🚀 Anticiper l'évolution avec la croissance"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chapters */}
                <div className="space-y-16">
                    {CHAPTERS.map((chapter) => (
                        <section key={chapter.id} id={`chapter-${chapter.id}`} className="chapter-block scroll-mt-24">
                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg shrink-0 text-white" style={{ backgroundColor: ODOO_PURPLE }}>
                                    {chapter.icon}
                                </div>
                                <div>
                                    <span className="text-sm uppercase tracking-wider font-medium" style={{ color: ODOO_PURPLE }}>Chapitre {chapter.id}</span>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{chapter.title}</h3>
                                </div>
                            </div>
                            <div className="pl-0 md:pl-[4.5rem]">{chapter.content}</div>
                            {chapter.id < 11 && <div className="mt-12 border-b border-gray-200" />}
                        </section>
                    ))}
                </div>

                {/* Link to E-book 1 */}
                <div className="mt-16 bg-blue-50 rounded-2xl p-6 border border-blue-100 text-center">
                    <p className="text-gray-600 mb-3">📈 Besoin de revoir les bases ?</p>
                    <Link href="/ressources/guides/diagnostic-gestion" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                        Consultez le premier guide : &quot;Structurer sa comptabilité PME&quot;
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                {/* CTA Test */}
                <div className="mt-20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${ODOO_PURPLE} 0%, #8e6180 100%)` }}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="relative z-10">
                        <span className="inline-block bg-secondary/20 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">🧪 Test Interactif</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Évaluez votre maturité en automatisation et pilotage
                        </h2>
                        <p className="text-white/70 max-w-xl mx-auto mb-8">
                            31 questions, 6 sections thématiques, score personnalisé avec diagnostic par chapitre et plan d&apos;action sur mesure.
                        </p>
                        <button onClick={onStartQuiz} className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg active:scale-[0.98]">
                            Commencer le diagnostic
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
