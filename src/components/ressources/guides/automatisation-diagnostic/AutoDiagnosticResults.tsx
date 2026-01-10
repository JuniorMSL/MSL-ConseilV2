"use client";

import { useState, useEffect } from "react";
import { DiagnosticResult, QUESTIONS, AXES } from "./AutoDiagnosticQuiz";

interface DiagnosticResultsProps {
    result: DiagnosticResult;
    onRestart: () => void;
    onBackToGuide: () => void;
}

const LEVELS = [
    { min: 0, max: 16, label: "Fragile", color: "red", description: "Automatiser maintenant serait risqué" },
    { min: 17, max: 30, label: "Intermédiaire", color: "yellow", description: "Potentiel réel mais structuration nécessaire" },
    { min: 31, max: 40, label: "Solide", color: "green", description: "Organisation prête à automatiser" },
    { min: 41, max: 48, label: "Avancé", color: "blue", description: "Automatisation stratégique possible" },
];

const getLevel = (score: number) => LEVELS.find(l => score >= l.min && score <= l.max) || LEVELS[0];

const getAxeAnalysis = (score: number) => {
    const maxScore = 12;
    const percentage = (score / maxScore) * 100;

    if (percentage >= 75) return { status: "Fort", color: "green", advice: "Point fort de votre organisation." };
    if (percentage >= 50) return { status: "Intermédiaire", color: "yellow", advice: "Marge de progression identifiée." };
    return { status: "À renforcer", color: "red", advice: "Axe prioritaire d'amélioration." };
};

export default function AutoDiagnosticResults({ result, onRestart, onBackToGuide }: DiagnosticResultsProps) {
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const level = getLevel(result.totalScore);
    const firstName = result.userInfo?.firstName || "Dirigeant";
    const companyName = result.userInfo?.company || "votre entreprise";

    // Generate share URL with all needed parameters for viral sharing
    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/ressources/guides/automatisation-diagnostic?shared=true&score=${result.totalScore}&level=${encodeURIComponent(level.label)}&from=${encodeURIComponent(firstName)}`
        : '';

    useEffect(() => {
        const timer = setTimeout(() => setShowSharePopup(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShareWhatsApp = () => {
        const message = encodeURIComponent(
            `Salut ! 👋\n\nJe viens de faire un diagnostic sur l'automatisation des finances dans Odoo.\n\n🎯 Mon score : ${result.totalScore}/48 (Profil ${level.label})\n\nÇa m'a donné pas mal de prise de recul sur mon organisation.\nSi tu veux comparer avec ta situation, tu peux faire le même diagnostic ici :\n\n👉 ${shareUrl}\n\nCurieux d'avoir ton avis !`
        );
        window.open(`https://wa.me/?text=${message}`, '_blank');
    };

    const handleShareLinkedIn = () => {
        const message = encodeURIComponent(
            `Bonjour,\n\nJe viens de réaliser un diagnostic sur la maturité de mon organisation financière (automatisation dans Odoo).\n\n📊 Score : ${result.totalScore}/48 – Profil "${level.label}"\n\nC'est un bon outil de prise de recul. Si le sujet t'intéresse, tu peux aussifaire le diagnostic et on compare :\n\n👉 ${shareUrl}`
        );
        window.open(`https://www.linkedin.com/messaging/compose?body=${message}`, '_blank');
    };

    const getPriorities = () => {
        const priorities = [];
        if (result.axeScores.axe1 < 8) priorities.push("Clarifier et documenter les règles clés");
        if (result.axeScores.axe2 < 8) priorities.push("Réduire la dépendance aux tâches manuelles chronophages");
        if (result.axeScores.axe3 < 8) priorities.push("Tester et fiabiliser les automatisations existantes");
        if (result.axeScores.axe4 < 8) priorities.push("Mettre en place des alertes plutôt que des contrôles ligne par ligne");
        return priorities.slice(0, 3);
    };

    return (
        <section className="w-full min-h-screen bg-gray-50 text-gray-900 py-24 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Hero - Score global */}
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-secondary text-xs font-bold uppercase tracking-widest mb-6">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Votre diagnostic est terminé
                    </span>

                    <h1 className="text-4xl md:text-5xl font-serif mb-4 text-primary">
                        {firstName}, voici vos résultats
                    </h1>

                    <p className="text-gray-500 mb-8">
                        Une lecture claire et structurée de votre niveau de préparation à l&apos;automatisation pour <strong className="text-gray-700">{companyName}</strong>
                    </p>

                    {/* Score Display */}
                    <div className="flex justify-center items-center gap-4 mb-8">
                        <span className="text-8xl md:text-9xl font-serif font-bold text-primary">{result.totalScore}</span>
                        <span className="text-4xl text-gray-300">/ 48</span>
                    </div>

                    {/* Level Badge */}
                    <div className={`inline-block px-6 py-3 rounded-full text-lg font-bold mb-4 ${level.color === 'red' ? 'bg-red-100 text-red-600' :
                        level.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                            level.color === 'green' ? 'bg-green-100 text-green-600' :
                                'bg-blue-100 text-blue-600'
                        }`}>
                        🔵 Profil {level.label}
                    </div>
                    <p className="text-gray-500">{level.description}</p>
                </div>

                {/* Lecture synthétique */}
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm mb-12">
                    <h2 className="text-2xl font-serif mb-6 text-gray-900">
                        {firstName}, ce que votre score dit de {companyName}
                    </h2>

                    {level.label === "Fragile" && (
                        <div className="space-y-4 text-gray-600">
                            <p>Votre organisation financière repose encore fortement sur des processus manuels, des règles implicites ou des dépendances humaines.</p>
                            <p><strong className="text-red-600">Automatiser maintenant sans restructuration préalable risquerait d&apos;amplifier les erreurs et la perte de contrôle.</strong></p>
                            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                                <p className="text-red-700 font-bold">👉 Priorité pour {companyName} :</p>
                                <p className="text-gray-700">Clarifier, stabiliser, sécuriser avant d&apos;automatiser.</p>
                            </div>
                        </div>
                    )}

                    {level.label === "Intermédiaire" && (
                        <div className="space-y-4 text-gray-600">
                            <p>Vous disposez de bases intéressantes, mais certains freins organisationnels limitent encore l&apos;impact de l&apos;automatisation.</p>
                            <p>Le risque n&apos;est pas de mal automatiser, mais <strong className="text-yellow-700">d&apos;automatiser trop vite ou au mauvais endroit</strong>.</p>
                            <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200">
                                <p className="text-yellow-700 font-bold">👉 Priorité pour {companyName} :</p>
                                <p className="text-gray-700">Cibler les bons leviers et fiabiliser les règles existantes.</p>
                            </div>
                        </div>
                    )}

                    {level.label === "Solide" && (
                        <div className="space-y-4 text-gray-600">
                            <p>Votre organisation est structurée, vos règles sont globalement claires et vos équipes sont prêtes.</p>
                            <p><strong className="text-green-600">L&apos;automatisation peut devenir un véritable levier de performance et de sérénité.</strong></p>
                            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                                <p className="text-green-700 font-bold">👉 Priorité pour {companyName} :</p>
                                <p className="text-gray-700">Accélérer intelligemment l&apos;automatisation des processus clés.</p>
                            </div>
                        </div>
                    )}

                    {level.label === "Avancé" && (
                        <div className="space-y-4 text-gray-600">
                            <p>Votre finance est maîtrisée, pilotée et sécurisée.</p>
                            <p><strong className="text-blue-600">Vous êtes dans une logique stratégique, où l&apos;automatisation soutient la croissance, la délégation et l&apos;anticipation.</strong></p>
                            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                                <p className="text-blue-700 font-bold">👉 Priorité pour {companyName} :</p>
                                <p className="text-gray-700">Optimisation continue et pilotage avancé.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Résultats par axe */}
                <div className="mb-12">
                    <h2 className="text-2xl font-serif mb-6 text-center text-gray-900">Votre niveau par grand domaine</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { id: 1, score: result.axeScores.axe1 },
                            { id: 2, score: result.axeScores.axe2 },
                            { id: 3, score: result.axeScores.axe3 },
                            { id: 4, score: result.axeScores.axe4 },
                        ].map((axe) => {
                            const axeInfo = AXES.find(a => a.id === axe.id);
                            const analysis = getAxeAnalysis(axe.score);
                            return (
                                <div key={axe.id} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-xs text-gray-400 uppercase tracking-widest">AXE {axe.id}</span>
                                            <h3 className="text-lg font-bold text-gray-900">{axeInfo?.title}</h3>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-primary">{axe.score}</span>
                                            <span className="text-gray-300">/12</span>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                                        <div
                                            className={`h-full ${analysis.color === 'green' ? 'bg-green-500' :
                                                analysis.color === 'yellow' ? 'bg-yellow-500' :
                                                    'bg-red-500'
                                                }`}
                                            style={{ width: `${(axe.score / 12) * 100}%` }}
                                        />
                                    </div>
                                    <p className={`text-sm ${analysis.color === 'green' ? 'text-green-600' :
                                        analysis.color === 'yellow' ? 'text-yellow-600' :
                                            'text-red-600'
                                        }`}>
                                        {analysis.status} — {analysis.advice}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Synthèse narrative */}
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 mb-12">
                    <h2 className="text-2xl font-serif mb-4 text-gray-900">Lecture transversale de votre situation</h2>
                    <p className="text-gray-600 mb-4">
                        {firstName}, vos réponses montrent que la situation de {companyName} n&apos;est ni bonne ni mauvaise par hasard.
                        Elle reflète simplement le niveau actuel de structuration de votre organisation financière.
                    </p>
                    <p className="text-gray-700 font-medium">
                        👉 L&apos;enjeu n&apos;est pas d&apos;automatiser plus.<br />
                        👉 L&apos;enjeu est d&apos;automatiser <span className="text-secondary">avec méthode, au bon moment et au bon endroit</span>.
                    </p>
                </div>

                {/* Priorités recommandées */}
                {getPriorities().length > 0 && (
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm mb-12">
                        <h2 className="text-2xl font-serif mb-6 text-gray-900">Vos priorités naturelles à court terme</h2>
                        <div className="space-y-4">
                            {getPriorities().map((priority, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                    <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">{i + 1}</span>
                                    <span className="text-gray-700">{priority}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-500 text-sm mt-6 italic">
                            &quot;Ces priorités apparaissent systématiquement dans les organisations qui réussissent leur automatisation.&quot;
                        </p>
                    </div>
                )}

                {/* Détails des réponses */}
                <div className="mb-12">
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="w-full p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                        <span className="font-bold text-gray-900">Voir le détail de mes réponses</span>
                        <svg className={`w-5 h-5 text-gray-500 transition-transform ${showDetails ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {showDetails && (
                        <div className="mt-4 space-y-3 max-h-[500px] overflow-y-auto">
                            {result.answers.map((answer) => {
                                const question = QUESTIONS.find(q => q.id === answer.questionId);
                                const option = question?.options.find(o => o.value === answer.answer);
                                return (
                                    <div key={answer.questionId} className="p-4 rounded-xl bg-white border border-gray-200">
                                        <p className="text-sm text-gray-400 mb-1">Q{answer.questionId}</p>
                                        <p className="text-gray-700 mb-2">{question?.question}</p>
                                        <p className="text-sm">
                                            <span className="mr-2">{option?.icon}</span>
                                            <span className="text-gray-600">{option?.label}</span>
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Message de clôture */}
                <div className="bg-primary rounded-3xl p-8 text-center mb-12">
                    <p className="text-xl font-serif text-white/90 mb-6">
                        &quot;{firstName}, ce diagnostic n&apos;est pas un jugement.<br />
                        C&apos;est un outil de <span className="text-secondary">lucidité pour décider avec méthode</span>.&quot;
                    </p>
                </div>

                {/* Transition vers le partage */}
                <div className="bg-gray-100 rounded-3xl p-8 text-center mb-12">
                    <p className="text-gray-600 text-lg">
                        Ce type de diagnostic est souvent plus riche lorsqu&apos;il est confronté à un regard extérieur.
                        Un autre dirigeant, un associé ou un responsable financier peut parfois confirmer… ou nuancer certaines perceptions.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <button
                        onClick={() => setShowSharePopup(true)}
                        className="px-8 py-4 bg-secondary text-primary rounded-full font-bold uppercase tracking-wider text-sm hover:bg-primary hover:text-white transition-colors"
                    >
                        Partager mes résultats
                    </button>
                    <button
                        onClick={onBackToGuide}
                        className="px-8 py-4 border border-gray-300 text-gray-700 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-gray-100 transition-colors"
                    >
                        Relire le guide
                    </button>
                    <button
                        onClick={onRestart}
                        className="px-8 py-4 border border-gray-300 text-gray-700 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-gray-100 transition-colors"
                    >
                        Refaire le diagnostic
                    </button>
                </div>
            </div>

            {/* Share Popup */}
            {showSharePopup && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-gray-200 shadow-2xl relative">
                        <button
                            onClick={() => setShowSharePopup(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h3 className="text-2xl font-serif mb-4 text-gray-900">Et si vous demandiez un avis extérieur ?</h3>

                        <p className="text-gray-600 mb-4">
                            Vous venez d&apos;obtenir votre diagnostic, {firstName}.
                            Beaucoup de dirigeants choisissent de le partager à un autre entrepreneur ou à un responsable financier pour confronter leur lecture.
                        </p>

                        <p className="text-gray-600 mb-6">Cela permet souvent de :</p>
                        <ul className="text-gray-600 mb-6 space-y-1">
                            <li>✓ valider certaines intuitions</li>
                            <li>✓ prendre du recul</li>
                            <li>✓ lancer une discussion utile</li>
                        </ul>

                        <div className="space-y-4 mb-6">
                            <button
                                onClick={handleShareWhatsApp}
                                className="w-full p-4 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center gap-4 hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Partager sur WhatsApp
                            </button>

                            <button
                                onClick={handleShareLinkedIn}
                                className="w-full p-4 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] flex items-center gap-4 hover:bg-[#0A66C2]/20 transition-colors border border-[#0A66C2]/20"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                Envoyer sur LinkedIn
                            </button>

                            <button
                                onClick={handleCopyLink}
                                className="w-full p-4 rounded-xl bg-gray-100 text-gray-700 flex items-center gap-4 hover:bg-gray-200 transition-colors border border-gray-200"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                {copied ? 'Lien copié ✓' : 'Copier le lien'}
                            </button>
                        </div>

                        <p className="text-gray-400 text-sm text-center italic">
                            &quot;Les diagnostics les plus utiles sont souvent ceux qui déclenchent une discussion.&quot;
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
