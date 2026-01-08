"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Odoo purple color
const ODOO_PURPLE = "#714b67";

interface UserFormProps {
    onSubmit: (data: UserData) => void;
    onBack: () => void;
}

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    role: string;
    employees: string;
}

const ROLES = [
    "Dirigeant / Gérant",
    "Directeur financier / DAF",
    "Comptable",
    "Office Manager",
    "Responsable administratif",
    "Autre"
];
const EMPLOYEES = ["1-10", "11-50", "51-100", "101-250", "250+"];

export default function UserForm({ onSubmit, onBack }: UserFormProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<UserData>({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        role: "",
        employees: ""
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

    const handleChange = (field: keyof UserData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-gray-50">
            {/* Header */}
            <div className="pt-24 pb-12 px-6" style={{ background: `linear-gradient(135deg, ${ODOO_PURPLE} 0%, #8e6180 100%)` }}>
                <div className="max-w-3xl mx-auto">
                    <button onClick={onBack} className="form-element flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Retour au guide
                    </button>
                    <div className="form-element text-center">
                        <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                            🧪 Test Interactif – Étape 1/2
                        </span>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Avant de commencer le diagnostic
                        </h1>
                        <p className="text-white/70">
                            Quelques informations pour personnaliser vos résultats et recommandations
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
                                className={`w-full px-4 py-3 rounded-xl border-2 ${errors.firstName ? "border-red-400" : "border-gray-200 focus:border-purple-500"} transition-colors focus:outline-none`}
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
                                className={`w-full px-4 py-3 rounded-xl border-2 ${errors.lastName ? "border-red-400" : "border-gray-200 focus:border-purple-500"} transition-colors focus:outline-none`}
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
                            className={`w-full px-4 py-3 rounded-xl border-2 ${errors.email ? "border-red-400" : "border-gray-200 focus:border-purple-500"} transition-colors focus:outline-none`}
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
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 transition-colors focus:outline-none"
                            placeholder="Nom de votre entreprise"
                        />
                    </div>

                    {/* Role and Employees */}
                    <div className="form-element grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Fonction</label>
                            <select
                                value={formData.role}
                                onChange={(e) => handleChange("role", e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 transition-colors focus:outline-none bg-white"
                            >
                                <option value="">Sélectionner...</option>
                                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre d&apos;employés</label>
                            <select
                                value={formData.employees}
                                onChange={(e) => handleChange("employees", e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 transition-colors focus:outline-none bg-white"
                            >
                                <option value="">Sélectionner...</option>
                                {EMPLOYEES.map(e => <option key={e} value={e}>{e}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Info box */}
                    <div className="form-element bg-purple-50 rounded-xl p-4 border border-purple-100">
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-purple-700">🔒 Confidentialité :</span> Vos données sont utilisées uniquement pour personnaliser vos résultats. Nous ne les partageons jamais.
                        </p>
                    </div>

                    {/* Submit */}
                    <div className="form-element pt-4">
                        <button
                            type="submit"
                            className="w-full py-4 px-6 rounded-xl font-semibold text-white transition-all hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-3"
                            style={{ background: ODOO_PURPLE }}
                        >
                            Commencer le diagnostic
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
