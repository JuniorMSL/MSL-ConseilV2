import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'MSL Conseils - Expert Odoo Finances',
        short_name: 'MSL Conseils',
        description: 'Expert Odoo Finances en Belgique et au Maroc',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#7C3AED',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
