"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    role: string;
    employees: string;
}

interface GuideUserFormProps {
    onSubmit: (info: UserInfo) => void;
    onBack?: () => void;
}

const ROLE_OPTIONS = [
    "Dirigeant / Gérant",
    "Directeur Administratif et Financier",
    "Responsable Comptable",
    "Expert-Comptable",
    "Consultant",
    "Autre"
];

const EMPLOYEES_OPTIONS = [
    "1-5 employés",
    "6-10 employés",
    "11-25 employés",
    "26-50 employés",
    "51-100 employés",
    "Plus de 100 employés"
];

export default function GuideUserForm({ onSubmit, onBack }: GuideUserFormProps) {
    const formRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<UserInfo>({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        role: "",
        employees: ""
    });
    const [errors, setErrors] = useState<Partial<UserInfo>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useGSAP(() => {
        gsap.fromTo(formRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.5
            }
        );
    }, { scope: formRef });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof UserInfo]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<UserInfo> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "Le prénom est requis";
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Le nom est requis";
        }
        if (!formData.email.trim()) {
            newErrors.email = "L'email est requis";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email invalide";
        }
        if (!formData.company.trim()) {
            newErrors.company = "Le nom de l'entreprise est requis";
        }
        if (!formData.role) {
            newErrors.role = "Veuillez sélectionner votre rôle";
        }
        if (!formData.employees) {
            newErrors.employees = "Veuillez sélectionner la taille de l'entreprise";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate a brief loading state for better UX
        await new Promise(resolve => setTimeout(resolve, 500));

        onSubmit(formData);
    };

    return (
        <section className="w-full min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary via-primary to-primary/90 pt-24 pb-12 px-6">
                <div className="max-w-3xl mx-auto">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Retour au guide
                        </button>
                    )}
                    <div className="text-center">
                        <span className="inline-block bg-secondary/20 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                            Étape 2 sur 3
                        </span>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Avant de commencer le questionnaire
                        </h1>
                        <p className="text-white/70">
                            Ces informations nous permettront de personnaliser vos résultats
                        </p>
                    </div>
                </div>
            </div>

            <div className="py-12 px-6">
                <div
                    ref={formRef}
                    className="max-w-3xl mx-auto"
                >

                    {/* Form Card */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Prénom *
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Jean"
                                        className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none
                                        ${errors.firstName
                                                ? "border-red-300 bg-red-50 focus:border-red-500"
                                                : "border-gray-200 bg-gray-50 focus:border-primary focus:bg-white"
                                            }`}
                                    />
                                    {errors.firstName && (
                                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.firstName}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Nom *
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Dupont"
                                        className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none
                                        ${errors.lastName
                                                ? "border-red-300 bg-red-50 focus:border-red-500"
                                                : "border-gray-200 bg-gray-50 focus:border-primary focus:bg-white"
                                            }`}
                                    />
                                    {errors.lastName && (
                                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.lastName}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Email professionnel *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="jean.dupont@entreprise.com"
                                    className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none
                                    ${errors.email
                                            ? "border-red-300 bg-red-50 focus:border-red-500"
                                            : "border-gray-200 bg-gray-50 focus:border-primary focus:bg-white"
                                        }`}
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Company */}
                            <div>
                                <label
                                    htmlFor="company"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Nom de l'entreprise *
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="Ma Société SARL"
                                    className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none
                                    ${errors.company
                                            ? "border-red-300 bg-red-50 focus:border-red-500"
                                            : "border-gray-200 bg-gray-50 focus:border-primary focus:bg-white"
                                        }`}
                                />
                                {errors.company && (
                                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.company}
                                    </p>
                                )}
                            </div>

                            {/* Role & Employees Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="role"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Votre rôle *
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="role"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none appearance-none cursor-pointer
                                            ${errors.role
                                                    ? "border-red-300 bg-red-50 focus:border-red-500"
                                                    : "border-gray-200 bg-gray-50 focus:border-primary focus:bg-white"
                                                }
                                            ${!formData.role ? "text-gray-400" : "text-gray-900"}`}
                                        >
                                            <option value="">Sélectionnez votre rôle</option>
                                            {ROLE_OPTIONS.map(role => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                        <svg
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    {errors.role && (
                                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.role}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="employees"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Taille de l'entreprise *
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="employees"
                                            name="employees"
                                            value={formData.employees}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none appearance-none cursor-pointer
                                            ${errors.employees
                                                    ? "border-red-300 bg-red-50 focus:border-red-500"
                                                    : "border-gray-200 bg-gray-50 focus:border-primary focus:bg-white"
                                                }
                                            ${!formData.employees ? "text-gray-400" : "text-gray-900"}`}
                                        >
                                            <option value="">Nombre d'employés</option>
                                            {EMPLOYEES_OPTIONS.map(emp => (
                                                <option key={emp} value={emp}>{emp}</option>
                                            ))}
                                        </select>
                                        <svg
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    {errors.employees && (
                                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.employees}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Privacy Note */}
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <p className="text-sm text-gray-600">
                                    Vos données sont protégées et ne seront jamais partagées.
                                    Nous les utilisons uniquement pour personnaliser votre expérience.
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 px-8 rounded-xl font-semibold text-white transition-all duration-300 
                                ${isSubmitting
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-3">
                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Chargement...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-3">
                                        Commencer le questionnaire
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
