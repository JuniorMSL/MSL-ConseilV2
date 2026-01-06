# 📝 Exemples de métadonnées SEO pour les pages restantes

Ce fichier contient des exemples prêts à l'emploi de métadonnées SEO pour les pages qui n'ont pas encore été configurées.

---

## 📞 Page Contact (`/src/app/contact/page.tsx`)

```tsx
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contactez-nous",
  description: "Contactez MSL Conseils, votre expert Odoo Finances en Belgique et au Maroc. Demandez votre diagnostic gratuit et pilotez votre croissance dès aujourd'hui.",
  url: "/contact",
  keywords: [
    "Contact MSL Conseils",
    "Diagnostic gratuit",
    "Expert Odoo",
    "Consultation finances",
    "Belgique",
    "Maroc",
  ],
});

// Schéma JSON-LD pour le fil d'Ariane
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Accueil", url: "/" },
  { name: "Contact", url: "/contact" },
]);

// Schéma JSON-LD pour ContactPage (optionnel)
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact - MSL Conseils",
  description: "Contactez-nous pour un diagnostic gratuit",
  url: "https://www.odoo-finances.pro/contact",
};

export default function ContactPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
        }}
      />
      
      <main className="min-h-screen bg-white">
        {/* Votre contenu ici */}
      </main>
    </>
  );
}
```

---

## ❓ Page FAQ (`/src/app/faq/page.tsx`)

```tsx
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Questions Fréquentes (FAQ)",
  description: "Trouvez les réponses à vos questions sur MSL Conseils, Odoo Finances, notre méthode P.I.L.O.T.E.R. et nos services en Belgique et au Maroc.",
  url: "/faq",
  keywords: [
    "FAQ MSL Conseils",
    "Questions Odoo Finances",
    "Méthode PILOTER",
    "Réponses",
    "Support",
  ],
});

// Schéma JSON-LD pour le fil d'Ariane
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Accueil", url: "/" },
  { name: "FAQ", url: "/faq" },
]);

// Schéma JSON-LD pour FAQ (exemple avec quelques questions)
const faqSchema = generateFAQSchema([
  {
    question: "Qu'est-ce que la méthode P.I.L.O.T.E.R. ?",
    answer: "La méthode P.I.L.O.T.E.R. est une approche structurée en 7 étapes (Préparation, Investigation, Livraison, Optimisation, Transposition, Évolution, Résultats) pour piloter votre croissance et optimiser votre gestion financière avec Odoo.",
  },
  {
    question: "Dans quels pays intervenez-vous ?",
    answer: "MSL Conseils intervient principalement en Belgique et au Maroc, avec une expertise locale et une connaissance approfondie des réglementations de chaque pays.",
  },
  {
    question: "Combien coûte un diagnostic gratuit ?",
    answer: "Le diagnostic initial est entièrement gratuit et sans engagement. Il nous permet de comprendre vos besoins et de vous proposer une solution adaptée.",
  },
  {
    question: "Quels sont les avantages d'Odoo Finances ?",
    answer: "Odoo Finances offre une solution complète de gestion financière : comptabilité, facturation, gestion des paiements, reporting en temps réel, et intégration avec d'autres modules Odoo.",
  },
  // Ajoutez vos vraies questions ici
]);

export default function FAQPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      
      <main className="min-h-screen bg-white">
        {/* Votre contenu FAQ ici */}
      </main>
    </>
  );
}
```

---

## 📚 Page Ressources (`/src/app/ressources/page.tsx`)

```tsx
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Ressources",
  description: "Découvrez nos ressources, études de cas et guides pratiques sur Odoo Finances, la gestion financière et notre méthode P.I.L.O.T.E.R. pour optimiser votre entreprise.",
  url: "/ressources",
  keywords: [
    "Ressources Odoo",
    "Études de cas",
    "Guides finances",
    "Méthode PILOTER",
    "Best practices",
    "Témoignages clients",
  ],
});

// Schéma JSON-LD pour le fil d'Ariane
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Accueil", url: "/" },
  { name: "Ressources", url: "/ressources" },
]);

export default function RessourcesPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      <main className="min-h-screen bg-white">
        {/* Votre contenu ressources ici */}
      </main>
    </>
  );
}
```

---

## 📄 Page Article de Blog (exemple si vous avez un blog)

```tsx
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema, siteConfig } from "@/lib/seo";
import type { Metadata } from "next";

// Pour une page dynamique de blog
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Récupérer les données de l'article (exemple)
  const article = {
    title: "Comment optimiser votre gestion financière avec Odoo",
    description: "Découvrez les meilleures pratiques pour optimiser votre gestion financière...",
    image: "/blog/article-1.jpg",
    publishedDate: "2025-01-15",
    author: "MSL Conseils",
  };

  return generateSEOMetadata({
    title: article.title,
    description: article.description,
    url: `/blog/${params.slug}`,
    image: article.image,
    type: 'article',
  });
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  // Schéma JSON-LD pour l'article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Comment optimiser votre gestion financière avec Odoo",
    description: "Découvrez les meilleures pratiques...",
    image: `${siteConfig.url}/blog/article-1.jpg`,
    datePublished: "2025-01-15",
    dateModified: "2025-01-15",
    author: {
      "@type": "Organization",
      name: "MSL Conseils",
    },
    publisher: {
      "@type": "Organization",
      name: "MSL Conseils",
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Accueil", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "Article", url: `/blog/${params.slug}` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      
      <main className="min-h-screen bg-white">
        {/* Contenu de l'article */}
      </main>
    </>
  );
}
```

---

## 🏢 Schema LocalBusiness (si vous avez un bureau physique)

À ajouter dans `/src/app/layout.tsx` si vous avez une adresse physique :

```tsx
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "MSL Conseils",
  image: `${siteConfig.url}/logo.png`,
  "@id": siteConfig.url,
  url: siteConfig.url,
  telephone: "+32-XXX-XXX-XXX",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Votre adresse",
    addressLocality: "Bruxelles",
    postalCode: "1000",
    addressCountry: "BE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.8503396,
    longitude: 4.3517103,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.linkedin.com/company/msl-conseils",
    "https://www.facebook.com/mslconseils",
  ],
};
```

---

## 🎯 Schema Product (si vous vendez des produits/services)

```tsx
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Implémentation Odoo Finances",
  description: "Service complet d'implémentation Odoo Finances avec la méthode P.I.L.O.T.E.R.",
  image: `${siteConfig.url}/services/odoo-finances.jpg`,
  brand: {
    "@type": "Brand",
    name: "MSL Conseils",
  },
  offers: {
    "@type": "Offer",
    url: `${siteConfig.url}/solutions`,
    priceCurrency: "EUR",
    price: "Sur devis",
    priceValidUntil: "2025-12-31",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "24",
  },
};
```

---

## 📊 Schema Review/Rating (si vous avez des avis clients)

```tsx
const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "Organization",
    name: "MSL Conseils",
  },
  author: {
    "@type": "Person",
    name: "Jean Dupont",
  },
  reviewRating: {
    "@type": "Rating",
    ratingValue: "5",
    bestRating: "5",
  },
  reviewBody: "Excellente expérience avec MSL Conseils. La méthode P.I.L.O.T.E.R. a transformé notre gestion financière.",
  datePublished: "2025-01-10",
};
```

---

## 💡 Conseils d'utilisation

### Pour chaque nouvelle page :

1. **Copiez le code d'exemple** correspondant
2. **Personnalisez** :
   - Titre (50-60 caractères)
   - Description (150-160 caractères)
   - Mots-clés pertinents
   - URL de la page
3. **Ajoutez le fil d'Ariane** (breadcrumb)
4. **Ajoutez un schéma spécifique** si pertinent
5. **Testez** avec les outils de validation

### Schémas supplémentaires disponibles

Vous pouvez créer d'autres fonctions dans `/src/lib/seo.ts` pour :
- **VideoObject** : pour les vidéos
- **Event** : pour les événements/webinaires
- **Course** : pour les formations
- **HowTo** : pour les tutoriels
- **Recipe** : pour les guides étape par étape

### Documentation Schema.org

Pour explorer tous les types de schémas disponibles :
https://schema.org/docs/schemas.html

---

**Utilisez ces exemples comme base et adaptez-les à vos besoins ! 🚀**
