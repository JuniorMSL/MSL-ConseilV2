"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface DownloadFormProps {
    onSubmit: (info: FormData) => void;
    onBack: () => void;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    role: string;
    wantsDiagnostic: boolean;
}

export default function DownloadForm({ onSubmit, onBack }: DownloadFormProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<FormData>({ firstName: "", lastName: "", email: "", company: "", role: "", wantsDiagnostic: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    useGSAP(() => {
        gsap.fromTo(".form-element", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" });
    }, { scope: containerRef });

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis";
        if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis";
        if (!formData.email.trim()) newErrors.email = "L'email est requis";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "L'email n'est pas valide";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        onSubmit(formData);
    };

    const handleChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-gray-50">
            <div className="py-12 px-6 bg-gradient-to-r from-primary to-primary/90">
                <div className="max-w-3xl mx-auto">
                    <button onClick={onBack} className="form-element flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Retour au guide
                    </button>
                    <div className="form-element text-center">
                        <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">📥 Téléchargement gratuit</span>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Téléchargez le guide gratuitement</h1>
                        <p className="text-white/70">👉 Remplissez ce formulaire pour recevoir le guide par email</p>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 py-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-element grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Prénom <span className="text-red-500">*</span></label>
                            <input type="text" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${errors.firstName ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-primary"}`} placeholder="Votre prénom" />
                            {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nom <span className="text-red-500">*</span></label>
                            <input type="text" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${errors.lastName ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-primary"}`} placeholder="Votre nom" />
                            {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div className="form-element">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email professionnel <span className="text-red-500">*</span></label>
                        <input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-primary"}`} placeholder="votre@email.com" />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                    <div className="form-element">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                        <input type="text" value={formData.company} onChange={(e) => handleChange("company", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary transition-colors focus:outline-none" placeholder="Nom de votre entreprise" />
                    </div>
                    <div className="form-element">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rôle ou fonction</label>
                        <input type="text" value={formData.role} onChange={(e) => handleChange("role", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary transition-colors focus:outline-none" placeholder="Ex: DAF, Comptable, Dirigeant..." />
                    </div>
                    <div className="form-element">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input type="checkbox" checked={formData.wantsDiagnostic} onChange={(e) => handleChange("wantsDiagnostic", e.target.checked)} className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary mt-0.5" />
                            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">✅ Je souhaite aussi recevoir un <strong>diagnostic personnalisé gratuit</strong></span>
                        </label>
                    </div>
                    <div className="form-element pt-4">
                        <button type="submit" disabled={isSubmitting} className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-primary hover:bg-primary/90 transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3">
                            {isSubmitting ? (<><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg><span>Envoi...</span></>) : (<><span>Recevoir le guide maintenant</span><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg></>)}
                        </button>
                    </div>
                </form>
                <div className="form-element mt-12 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><span className="text-xl">📬</span>Vous recevrez immédiatement :</h3>
                    <ul className="space-y-3">
                        {["Le guide PDF complet (9 chapitres)", "La checklist Excel à imprimer", "Un lien pour planifier un échange si besoin"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-700"><span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0"><svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></span>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
