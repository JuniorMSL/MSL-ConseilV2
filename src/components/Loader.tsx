'use client';

import { cn } from '../lib/utils';

interface LoaderProps {
    variant?: 'premium' | 'minimal' | 'dots' | 'fluid';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    text?: string;
    color?: 'primary' | 'white';
}

export default function Loader({
    variant = 'premium',
    size = 'md',
    className,
    text,
    color = 'primary',
}: LoaderProps) {
    const sizes = {
        sm: { container: 'w-8 h-8', text: 'text-xs' },
        md: { container: 'w-12 h-12', text: 'text-sm' },
        lg: { container: 'w-20 h-20', text: 'text-base' },
        xl: { container: 'w-32 h-32', text: 'text-lg' },
    };

    const sizeClasses = sizes[size];
    const isWhite = color === 'white';

    return (
        <div className={cn('flex flex-col items-center justify-center gap-6', className)}>

            {/* VARIANT 1: PREMIUM (Liquid Ring) */}
            {variant === 'premium' && (
                <div className={cn('relative flex items-center justify-center', sizeClasses.container)}>
                    {/* Fond flou coloré - Vert sombre */}
                    <div className={cn(
                        "absolute inset-0 rounded-full blur-xl opacity-20 animate-pulse-slow",
                        isWhite ? "bg-white" : "bg-primary"
                    )} />

                    {/* Anneau principal */}
                    <svg className="w-full h-full animate-spin-slow text-transparent" viewBox="0 0 100 100">
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor={isWhite ? '#FFFFFF' : '#014730'} stopOpacity="1" />
                                <stop offset="50%" stopColor={isWhite ? '#FFFFFF' : '#fe981a'} stopOpacity="0.8" />
                                <stop offset="100%" stopColor={isWhite ? '#FFFFFF' : '#014730'} stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="50"
                            cy="50"
                            r="46"
                            stroke="url(#gradient)"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            className="origin-center"
                        />
                    </svg>

                    {/* Anneau intérieur inversé */}
                    <svg className="absolute inset-0 w-full h-full animate-spin-reverse-slow opacity-60" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="36"
                            stroke={isWhite ? '#FFFFFF' : '#014730'}
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="60 120"
                            strokeLinecap="round"
                            className="origin-center"
                        />
                    </svg>

                    {/* Centre brillant */}
                    <div className={cn(
                        "absolute w-[15%] h-[15%] rounded-full shadow-[0_0_15px_rgba(1,71,48,0.5)] animate-ping-slow",
                        isWhite ? "bg-white" : "bg-secondary"
                    )} />
                </div>
            )}

            {/* VARIANT 2: MINIMAL (Breathing Ring) */}
            {variant === 'minimal' && (
                <div className={cn('relative', sizeClasses.container)}>
                    <div className={cn(
                        "absolute inset-0 border-2 rounded-full opacity-20",
                        isWhite ? "border-white" : "border-gray-900"
                    )} />
                    <div className={cn(
                        "absolute inset-0 border-t-2 rounded-full animate-spin",
                        isWhite ? "border-white" : "border-primary"
                    )} />
                </div>
            )}

            {/* VARIANT 3: DOTS (Wave) */}
            {variant === 'dots' && (
                <div className="flex items-center gap-1.5 h-full">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                "rounded-full animate-wave",
                                isWhite ? "bg-white" : "bg-primary",
                                size === 'sm' ? 'w-1.5 h-1.5' : 'w-2.5 h-2.5'
                            )}
                            style={{
                                animationDelay: `${i * 0.15}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* VARIANT 4: FLUID (Morphing) */}
            {variant === 'fluid' && (
                <div className={cn('relative', sizeClasses.container)}>
                    <div className={cn(
                        "absolute inset-0 rounded-full mix-blend-multiply filter blur-md opacity-70 animate-blob",
                        isWhite ? "bg-white/50" : "bg-primary/50"
                    )} />
                    <div className={cn(
                        "absolute inset-0 rounded-full mix-blend-multiply filter blur-md opacity-70 animate-blob animation-delay-2000",
                        isWhite ? "bg-white/50" : "bg-purple-400/50"
                    )} />
                    <div className={cn(
                        "absolute inset-0 rounded-full mix-blend-multiply filter blur-md opacity-70 animate-blob animation-delay-4000",
                        isWhite ? "bg-white/50" : "bg-secondary/50"
                    )} />
                </div>
            )}

            {text && (
                <div className="flex flex-col items-center gap-1">
                    <p className={cn(
                        "font-medium tracking-wide animate-pulse uppercase",
                        sizeClasses.text,
                        isWhite ? "text-white/90" : "text-gray-500"
                    )}>
                        {text}
                    </p>
                    {variant === 'premium' && (
                        <div className={cn(
                            "h-0.5 rounded-full overflow-hidden w-12 opacity-30 mt-1",
                            isWhite ? "bg-white/30" : "bg-gray-200"
                        )}>
                            <div className={cn(
                                "h-full w-full animate-progress origin-left",
                                isWhite ? "bg-white" : "bg-linear-to-r from-primary to-secondary"
                            )} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// Loader Fullscreen repensé : Premium Immersive Dark
export function LoaderFullscreen({ text }: { text?: string }) {
    return (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-[#013524]/95 backdrop-blur-md transition-all duration-700 animate-in fade-in zoom-in-95">
            {/* Background Texture subtile */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent animate-pulse-slow" />
            </div>

            <div className="relative z-10 flex flex-col items-center p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl">
                <Loader variant="premium" size="lg" text={text} color="white" />
            </div>
        </div>
    );
}

// Skeleton Loader amélioré
export function SkeletonLoader({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                'animate-pulse rounded bg-gray-200/80',
                className
            )}
        />
    );
}
