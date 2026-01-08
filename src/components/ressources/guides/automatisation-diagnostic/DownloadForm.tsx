"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface DownloadFormProps {
    onSubmit: (data: UserData) => void;
    onBack: () => void;
}

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    role: string;
    wantsDiagnostic: boolean;
}

const ROLES = [
    "DAF / Directeur Financier",
    "Comptable",
    "Office Manager",
    "Dirigeant / Gérant",
    "Responsable administratif",
    "Autre"
];

export default function DownloadForm({ onSubmit, onBack }: DownloadFormProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<UserData>({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        role: "",
        wantsDiagnostic: false
    });
    const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({});

    useGSAP(() => {
        gsap.fromTo(".form-element", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" });
    }, { scope: containerRef });

    const validate = () => {
        const e: Partial<Record<keyof UserData, string>> = {};
        if (!formData.firstName.trim()) e.firstName = "Requis";
        if (!formData.lastName.trim()) e.lastName = "Requis";
        if (!formData.email.trim()) e.email = "Requis";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Email invalide";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) onSubmit(formData);
    };

    const handleChange = (field: keyof UserData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-gray-50">
            {/* Header */}
            <div className="pt-24 pb-12 px-6" style={{ background: "linear-gradient(135deg, #012a1e 0%, #014730 50%, #016742 100%)" }}>
                <div className="max-w-3xl mx-auto">
                    <button onClick={onBack} className="form-element flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Retour au guide
                    </button>
                    <div className="form-element text-center">
                        <span className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Téléchargement
                        </span>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Obtenez votre checklist
                        </h1>
                        <p className="text-white/70">
                            Quelques informations pour recevoir votre checklist personnalisée
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-2xl mx-auto px-6 py-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name fields */}
                    <div className="form-element grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Prénom <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => handleChange("firstName", e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border-2 ${errors.firstName ? "border-red-400" : "border-gray-200 focus:border-primary"} transition-colors focus:outline-none`}
                                placeholder="Votre prénom"
                            />
                            {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nom <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => handleChange("lastName", e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border-2 ${errors.lastName ? "border-red-400" : "border-gray-200 focus:border-primary"} transition-colors focus:outline-none`}
                                placeholder="Votre nom"
                            />
                            {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="form-element">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email professionnel <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border-2 ${errors.email ? "border-red-400" : "border-gray-200 focus:border-primary"} transition-colors focus:outline-none`}
                            placeholder="votre@email.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    {/* Company */}
                    <div className="form-element">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                        <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => handleChange("company", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary transition-colors focus:outline-none"
                            placeholder="Nom de votre entreprise"
                        />
                    </div>

                    {/* Role */}
                    <div className="form-element">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fonction</label>
                        <select
                            value={formData.role}
                            onChange={(e) => handleChange("role", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary transition-colors focus:outline-none bg-white"
                        >
                            <option value="">Sélectionner...</option>
                            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>

                    {/* Diagnostic checkbox */}
                    <div className="form-element">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.wantsDiagnostic}
                                onChange={(e) => handleChange("wantsDiagnostic", e.target.checked)}
                                className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="text-gray-700">
                                <span className="font-medium">Je souhaite être accompagné</span>
                                <span className="block text-sm text-gray-500 mt-0.5">
                                    Un expert MSL Conseil vous contactera pour un diagnostic personnalisé.
                                </span>
                            </span>
                        </label>
                    </div>

                    {/* Info box */}
                    <div className="form-element bg-primary/10 rounded-xl p-4 border border-primary/20">
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-primary">Ce que vous allez recevoir :</span>
                        </p>
                        <ul className="mt-2 space-y-1 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                Checklist complète (format PDF)
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                Version Excel interactive
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                Indicateurs de suivi pré-remplis
                            </li>
                        </ul>
                    </div>

                    {/* Submit */}
                    <div className="form-element pt-4">
                        <button
                            type="submit"
                            className="w-full py-4 px-6 rounded-xl font-semibold text-white transition-all hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-3"
                            style={{ background: "linear-gradient(135deg, #012a1e 0%, #014730 100%)" }}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Télécharger ma checklist
                        </button>
                    </div>

                    {/* Privacy */}
                    <div className="form-element text-center">
                        <p className="text-xs text-gray-500">
                            Vos données sont utilisées uniquement pour vous envoyer la checklist. Nous ne les partageons jamais.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
