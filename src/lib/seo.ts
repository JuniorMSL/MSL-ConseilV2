import type { Metadata } from 'next';

// Configuration de base du site
export const siteConfig = {
    name: 'MSL Conseils',
    description: 'Expert Odoo Finances en Belgique et au Maroc. Pilotez votre croissance avec notre méthode P.I.L.O.T.E.R.',
    url: 'https://www.odoo-finances.pro', // À remplacer par votre URL réelle
    ogImage: '/og-image.jpg',
    locale: 'fr_FR',
    type: 'website',
    keywords: [
        'Odoo Finances',
        'Expert Odoo Belgique',
        'Expert Odoo Maroc',
        'Conseil finances',
        'Méthode PILOTER',
        'Croissance entreprise',
        'Gestion financière',
        'ERP Odoo',
    ],
    author: 'MSL Conseils',
    contact: {
        email: 'contact@msl-conseils.com',
        phone: '+32 XXX XXX XXX',
    },
    social: {
        linkedin: 'https://www.linkedin.com/company/msl-conseils',
        twitter: '@mslconseils',
    },
};

// Fonction pour générer les métadonnées de base
export function generateMetadata({
    title,
    description,
    image = siteConfig.ogImage,
    url,
    type = 'website',
    keywords,
}: {
    title: string;
    description: string;
    image?: string;
    url: string;
    type?: string;
    keywords?: string[];
}): Metadata {
    const fullTitle = `${title} | ${siteConfig.name}`;
    const fullUrl = `${siteConfig.url}${url}`;
    const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

    return {
        metadataBase: new URL(siteConfig.url),
        title: fullTitle,
        description,
        keywords: keywords || siteConfig.keywords,
        authors: [{ name: siteConfig.author }],
        creator: siteConfig.author,
        publisher: siteConfig.author,

        // Open Graph
        openGraph: {
            type: type as any,
            locale: siteConfig.locale,
            url: fullUrl,
            title: fullTitle,
            description,
            siteName: siteConfig.name,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },

        // Twitter Card
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [imageUrl],
            creator: siteConfig.social.twitter,
        },

        // Canonical URL
        alternates: {
            canonical: fullUrl,
        },

        // Robots
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

// Données structurées pour l'organisation
export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    address: {
        '@type': 'PostalAddress',
        addressCountry: 'BE',
    },
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phone,
        contactType: 'customer service',
        email: siteConfig.contact.email,
        availableLanguage: ['French', 'English'],
    },
    sameAs: [
        siteConfig.social.linkedin,
    ],
};

// Données structurées pour le fil d'Ariane
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${siteConfig.url}${item.url}`,
        })),
    };
}

// Données structurées pour les services
export function generateServiceSchema({
    name,
    description,
    provider = siteConfig.name,
    areaServed = ['BE', 'MA'],
}: {
    name: string;
    description: string;
    provider?: string;
    areaServed?: string[];
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        provider: {
            '@type': 'Organization',
            name: provider,
        },
        areaServed: areaServed.map(code => ({
            '@type': 'Country',
            name: code,
        })),
    };
}

// Données structurées pour FAQ
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}
