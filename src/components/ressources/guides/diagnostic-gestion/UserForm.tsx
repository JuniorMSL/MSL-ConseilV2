"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface UserFormProps {
    onSubmit: (data: UserData) => void;
    onBack: () => void;
}

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    sector: string;
    employees: string;
}

const SECTORS = ["Services", "Commerce", "Industrie", "Construction", "Tech/Digital", "Santé", "Autre"];
const EMPLOYEES = ["1-10", "11-50", "51-100", "101-250", "250+"];

export default function UserForm({ onSubmit, onBack }: UserFormProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<UserData>({ firstName: "", lastName: "", email: "", company: "", sector: "", employees: "" });
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
            <div className="pt-24 pb-12 px-6 bg-gradient-to-r from-primary to-primary/90">
                <div className="max-w-3xl mx-auto">
                    <button onClick={onBack} className="form-element flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Retour
                    </button>
                    <div className="form-element text-center">
                        <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Étape 1/3</span>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Avant de commencer</h1>
                        <p className="text-white/70">Quelques informations pour personnaliser vos résultats</p>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 py-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-element grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Prénom <span className="text-red-500">*</span></label>
                            <input type="text" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className={`w-full px-4 py-3 rounded-xl border-2 ${errors.firstName ? "border-red-400" : "border-gray-200 focus:border-primary"} transition-colors focus:outline-none`} placeholder="Votre prénom" />
                            {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nom <span className="text-red-500">*</span></label>
                            <input type="text" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className={`w-full px-4 py-3 rounded-xl border-2 ${errors.lastName ? "border-red-400" : "border-gray-200 focus:border-primary"} transition-colors focus:outline-none`} placeholder="Votre nom" />
                            {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                        </div>
                    </div>

                    <div className="form-element">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email professionnel <span className="text-red-500">*</span></label>
                        <input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className={`w-full px-4 py-3 rounded-xl border-2 ${errors.email ? "border-red-400" : "border-gray-200 focus:border-primary"} transition-colors focus:outline-none`} placeholder="votre@email.com" />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="form-element">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                        <input type="text" value={formData.company} onChange={(e) => handleChange("company", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary transition-colors focus:outline-none" placeholder="Nom de votre entreprise" />
                    </div>

                    <div className="form-element grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Secteur d'activité</label>
                            <select value={formData.sector} onChange={(e) => handleChange("sector", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary transition-colors focus:outline-none bg-white">
                                <option value="">Sélectionner...</option>
                                {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre d'employés</label>
                            <select value={formData.employees} onChange={(e) => handleChange("employees", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary transition-colors focus:outline-none bg-white">
                                <option value="">Sélectionner...</option>
                                {EMPLOYEES.map(e => <option key={e} value={e}>{e}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="form-element pt-4">
                        <button type="submit" className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-primary hover:bg-primary/90 transition-all hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-3">
                            Commencer l'évaluation
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
