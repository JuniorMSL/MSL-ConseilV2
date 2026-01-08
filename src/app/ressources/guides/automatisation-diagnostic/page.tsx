"use client";

import { useState, useRef } from "react";
import GuideHero from "@/components/ressources/guides/automatisation-diagnostic/GuideHero";
import GuideContent from "@/components/ressources/guides/automatisation-diagnostic/GuideContent";
import DownloadForm from "@/components/ressources/guides/automatisation-diagnostic/DownloadForm";
import ChapterNav from "@/components/ressources/guides/automatisation-diagnostic/ChapterNav";
import Link from "next/link";

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    role: string;
    wantsDiagnostic: boolean;
}

export default function AutomatisationDiagnosticPage() {
    const [step, setStep] = useState<"content" | "form" | "confirmation">("content");
    const [userData, setUserData] = useState<UserData | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleDownload = () => {
        setStep("form");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleFormSubmit = (data: UserData) => {
        setUserData(data);
        setStep("confirmation");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBackToGuide = () => {
        setStep("content");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <main className="w-full min-h-screen bg-white" suppressHydrationWarning>
            {step === "content" && <ChapterNav />}

            {step === "content" && (
                <div ref={contentRef}>
                    <GuideHero />
                    <GuideContent onDownload={handleDownload} />
                </div>
            )}

            {step === "form" && (
                <DownloadForm onSubmit={handleFormSubmit} onBack={handleBackToGuide} />
            )}

            {step === "confirmation" && userData && (
                <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
                    <div className="max-w-xl w-full text-center">
                        {/* Success icon */}
                        <div
                            className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center shadow-xl"
                            style={{ background: "linear-gradient(135deg, #012a1e 0%, #014730 100%)" }}
                        >
                            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Merci {userData.firstName} !
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Votre checklist a été envoyée à <strong className="text-gray-900">{userData.email}</strong>
                        </p>

                        {/* What's included */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6 text-left">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Dans votre boîte mail
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { icon: "document", text: "La checklist PDF complète", desc: "5 étapes + tous les critères" },
                                    { icon: "table", text: "La version Excel interactive", desc: "Champs pré-remplis et formules" },
                                    { icon: "chart", text: "Indicateurs de suivi", desc: "KPIs prêts à utiliser" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                {item.icon === "document" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
                                                {item.icon === "table" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />}
                                                {item.icon === "chart" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{item.text}</p>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Diagnostic requested */}
                        {userData.wantsDiagnostic && (
                            <div className="bg-green-50 rounded-2xl p-6 border border-green-100 mb-6">
                                <p className="font-medium text-green-800 flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Accompagnement demandé
                                </p>
                                <p className="text-sm text-green-600 mt-1">
                                    Un expert MSL Conseil vous contactera sous 48h pour un diagnostic personnalisé.
                                </p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/ressources"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-colors"
                                style={{ background: "linear-gradient(135deg, #012a1e 0%, #014730 100%)" }}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Voir d&apos;autres ressources
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-medium transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Discuter avec un expert
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
