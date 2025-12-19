"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ODOO_CONFIG = {
    apiUrl: 'https://api-connect-odoo.vercel.app/api',
    xSignature: 'f48fc94a838ab87d65de288bfcb037d109d1141fd981f70f378be51c91c764bd',
    xClientId: 'client_mslconseils',
    xCompanyId: '7',
};

export default function ContactContent() {
    const container = useRef<HTMLElement>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        telephone: '',
        entreprise: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Construct description with HTML
            const descriptionParts = [
                `<h3>Nouveau Lead Web - Formulaire Contact</h3>`,
                `<p><strong>Nom:</strong> ${formData.nom}</p>`,
                `<p><strong>Entreprise:</strong> ${formData.entreprise}</p>`,
                `<p><strong>Message:</strong><br/>${formData.message.replace(/\n/g, '<br/>')}</p>`
            ];

            const leadData = {
                name: `Lead Web: ${formData.nom} (${formData.entreprise || 'Particulier'})`,
                phone: formData.telephone,
                email_from: formData.email,
                description: descriptionParts.join('\n'),
            };

            const response = await fetch(`${ODOO_CONFIG.apiUrl}/leads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-signature': ODOO_CONFIG.xSignature,
                    'x-client-id': ODOO_CONFIG.xClientId,
                    'x-company-id': ODOO_CONFIG.xCompanyId,
                },
                body: JSON.stringify(leadData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi');
            }

            setStatus('success');
            setFormData({ nom: '', email: '', telephone: '', entreprise: '', message: '' });

        } catch (error) {
            console.error('Erreur:', error);
            setStatus('error');
        }
    };

    useGSAP(() => {
        gsap.fromTo(".contact-block",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%"
                }
            }
        );
    }, { scope: container });

    return (
        <section ref={container} className="w-full py-24 px-6 md:px-12 bg-white relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* Left Column: Form */}
                <div className="contact-block">
                    <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
                        <h2 className="text-3xl font-serif text-primary mb-8">Écrivez-nous</h2>

                        {/* State Messages */}
                        {status === 'success' && (
                            <div className="mb-6 p-4 rounded-xl bg-green-100 border border-green-200 text-green-800 text-sm font-medium flex items-center gap-2">
                                <span>✅</span> Votre demande a été envoyée avec succès ! Nous vous recontacterons sous 24h.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2">
                                <span>⚠️</span> Une erreur est survenue. Veuillez réessayer ou nous contacter par email.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold tracking-widest text-gray-500 ml-1">Nom Complet</label>
                                <input
                                    type="text"
                                    name="nom"
                                    required
                                    value={formData.nom}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:border-secondary transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold tracking-widest text-gray-500 ml-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:border-secondary transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold tracking-widest text-gray-500 ml-1">Téléphone</label>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        required
                                        value={formData.telephone}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:border-secondary transition-colors"
                                        placeholder="+33 6..."
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold tracking-widest text-gray-500 ml-1">Entreprise / Secteur</label>
                                <input
                                    type="text"
                                    name="entreprise"
                                    value={formData.entreprise}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:border-secondary transition-colors"
                                    placeholder="Ex: Industrie Tech"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold tracking-widest text-gray-500 ml-1">Votre Message</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:border-secondary transition-colors resize-none"
                                    placeholder="Comment pouvons-nous vous aider ?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className={`w-full bg-primary text-white font-bold py-5 rounded-xl hover:bg-secondary transition-colors duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {status === 'loading' ? (
                                    <span>Envoi en cours...</span>
                                ) : (
                                    <span>👉 Envoyer ma demande</span>
                                )}
                            </button>
                            <p className="text-center text-xs text-gray-400">Réponse rapide et personnalisée sous 24h.</p>
                        </form>
                    </div>
                </div>

                {/* Right Column: Direct Contact & Calendar */}
                <div className="flex flex-col gap-12">

                    {/* Direct Contact Cards */}
                    <div className="contact-block space-y-8">
                        <div>
                            <span className="text-secondary font-bold uppercase tracking-widest text-xs mb-2 block">Contact Direct</span>
                            <h3 className="text-3xl font-serif text-gray-900 mb-6">Échange immédiat</h3>
                        </div>

                        <div className="grid gap-4">
                            <a href="https://wa.me/32XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-green-500/30 transition-all group">
                                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                    💬
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">WhatsApp</p>
                                    <p className="text-sm text-gray-500">Discussion instantanée avec un consultant</p>
                                </div>
                            </a>

                            <a href="mailto:contact@msl-conseils.com" className="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-secondary/30 transition-all group">
                                <div className="w-12 h-12 rounded-full bg-orange-50 text-secondary flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                    ✉️
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 group-hover:text-secondary transition-colors">contact@msl-conseils.com</p>
                                    <p className="text-sm text-gray-500">Réponse garantie dans la journée</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                                <div className="w-12 h-12 rounded-full bg-blue-50 text-primary flex items-center justify-center text-2xl">
                                    📞
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">+32 XXX XXX XXX (Belgique)</p>
                                    <p className="font-bold text-gray-900">+212 XXX XXX XXX (Maroc)</p>
                                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-bold">Accès humain direct</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Prompt */}
                    <div className="contact-block bg-[#050505] text-white p-8 md:p-10 rounded-[2rem] relative overflow-hidden">

                        {/* Image Overlay */}
                        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop')] bg-cover bg-center" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-transparent opacity-90 z-10" />

                        <div className="relative z-20">
                            <h3 className="text-2xl font-serif mb-4">Prendre rendez-vous</h3>
                            <p className="text-white/70 mb-6 text-sm leading-relaxed">
                                Un calendrier intégré vous permet de choisir un créneau pour :
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-sm font-medium">
                                    <span className="text-secondary">✔</span> Un diagnostic de vos flux financiers
                                </li>
                                <li className="flex items-center gap-3 text-sm font-medium">
                                    <span className="text-secondary">✔</span> Une consultation gratuite
                                </li>
                                <li className="flex items-center gap-3 text-sm font-medium">
                                    <span className="text-secondary">✔</span> Un audit de vos systèmes
                                </li>
                            </ul>

                            <button className="w-full bg-white text-primary font-bold py-4 rounded-xl hover:bg-secondary hover:text-white transition-all duration-300">
                                Voir les disponibilités
                            </button>
                            <p className="text-center text-[10px] text-white/40 mt-3 uppercase tracking-wider">Confirmation immédiate + rappel auto</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Emotional Mini-Text & Final CTA */}
            <div className="mt-24 contact-block">
                <div className="w-full bg-primary rounded-[2.5rem] py-16 px-6 md:px-12 text-center relative overflow-hidden shadow-2xl">

                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h4 className="text-2xl md:text-4xl font-serif text-white mb-6">
                            Nos réponses sont rapides, concrètes et orientées solutions.
                        </h4>
                        <p className="text-white/80 text-lg mb-10">
                            Votre clarté financière commence par une conversation.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <button className="px-8 py-4 bg-white text-primary rounded-full font-bold uppercase tracking-wider text-xs hover:bg-secondary hover:text-white transition-all duration-300 shadow-xl hover:scale-105">
                                👉 Parler à un expert maintenant
                            </button>
                            <button className="px-8 py-4 bg-transparent border border-white text-white rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white hover:text-primary transition-all duration-300 shadow-xl hover:scale-105">
                                👉 Réserver mon audit gratuit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
