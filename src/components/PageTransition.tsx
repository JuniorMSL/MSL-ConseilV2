'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animation d'entrée de la page
            gsap.from(containerRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: 'power3.out',
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}
