# 📚 Bibliothèque SEO - MSL Conseils

Ce dossier contient les utilitaires et la configuration SEO centralisée pour l'application.

## 📁 Structure

```
src/lib/
└── seo.ts          # Configuration et fonctions utilitaires SEO
```

## 🔧 Fichier `seo.ts`

### Configuration du site (`siteConfig`)

Objet contenant toutes les informations de base du site :

```typescript
export const siteConfig = {
  name: 'MSL Conseils',
  description: '...',
  url: 'https://www.msl-conseils.com',
  ogImage: '/og-image.jpg',
  locale: 'fr_FR',
  type: 'website',
  keywords: [...],
  author: 'MSL Conseils',
  contact: { email, phone },
  social: { linkedin, twitter },
};
```

**⚠️ Important :** Mettez à jour ces valeurs avec vos vraies informations !

---

### Fonctions utilitaires

#### 1. `generateMetadata()`

Génère des métadonnées complètes pour une page.

**Utilisation :**
```typescript
export const metadata = generateMetadata({
  title: "Ma Page",
  description: "Description SEO optimisée",
  url: "/ma-page",
  keywords: ["mot-clé 1", "mot-clé 2"],
});
```

**Paramètres :**
- `title` (string, requis) : Titre de la page
- `description` (string, requis) : Description SEO
- `url` (string, requis) : URL relative de la page
- `image` (string, optionnel) : Image Open Graph personnalisée
- `type` (string, optionnel) : Type de page ('website', 'article', etc.)
- `keywords` (string[], optionnel) : Mots-clés spécifiques

**Retourne :** Objet `Metadata` Next.js avec :
- Titre formaté (`Titre | MSL Conseils`)
- Description
- Mots-clés
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Canonical URL
- Configuration robots

---

#### 2. `organizationSchema`

Schéma JSON-LD pour l'organisation (entreprise).

**Utilisation :**
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(organizationSchema),
  }}
/>
```

**Contient :**
- Nom de l'entreprise
- URL du site
- Logo
- Adresse
- Contact
- Réseaux sociaux

**Déjà inclus dans :** `/src/app/layout.tsx` (global)

---

#### 3. `generateBreadcrumbSchema()`

Génère un schéma de fil d'Ariane.

**Utilisation :**
```typescript
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Accueil", url: "/" },
  { name: "À Propos", url: "/about" },
]);
```

**Paramètres :**
- `items` : Array d'objets `{ name: string, url: string }`

**Retourne :** Schéma JSON-LD de type `BreadcrumbList`

**Bonne pratique :** Toujours commencer par "Accueil"

---

#### 4. `generateServiceSchema()`

Génère un schéma de service.

**Utilisation :**
```typescript
const serviceSchema = generateServiceSchema({
  name: "Méthode P.I.L.O.T.E.R.",
  description: "Une approche structurée...",
  provider: "MSL Conseils", // optionnel
  areaServed: ["BE", "MA"], // optionnel
});
```

**Paramètres :**
- `name` (string, requis) : Nom du service
- `description` (string, requis) : Description détaillée
- `provider` (string, optionnel) : Fournisseur (par défaut: siteConfig.name)
- `areaServed` (string[], optionnel) : Codes pays (par défaut: ["BE", "MA"])

**Retourne :** Schéma JSON-LD de type `Service`

---

#### 5. `generateFAQSchema()`

Génère un schéma FAQ.

**Utilisation :**
```typescript
const faqSchema = generateFAQSchema([
  {
    question: "Qu'est-ce que...?",
    answer: "C'est...",
  },
  {
    question: "Comment...?",
    answer: "Vous devez...",
  },
]);
```

**Paramètres :**
- `faqs` : Array d'objets `{ question: string, answer: string }`

**Retourne :** Schéma JSON-LD de type `FAQPage`

**Avantage :** Peut apparaître directement dans les résultats Google

---

## 🎯 Exemple complet d'utilisation

```tsx
// src/app/ma-page/page.tsx
import { 
  generateMetadata as generateSEOMetadata,
  generateBreadcrumbSchema,
  generateServiceSchema 
} from "@/lib/seo";
import type { Metadata } from "next";

// Métadonnées de la page
export const metadata: Metadata = generateSEOMetadata({
  title: "Mon Service",
  description: "Description optimisée de mon service",
  url: "/ma-page",
  keywords: ["service", "odoo", "finance"],
});

// Fil d'Ariane
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Accueil", url: "/" },
  { name: "Services", url: "/services" },
  { name: "Mon Service", url: "/ma-page" },
]);

// Service
const serviceSchema = generateServiceSchema({
  name: "Mon Service",
  description: "Description complète du service",
});

export default function MaPage() {
  return (
    <>
      {/* Données structurées */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      
      <main className="min-h-screen">
        {/* Contenu de la page */}
      </main>
    </>
  );
}
```

---

## 📝 Bonnes pratiques

### Titres
- ✅ 50-60 caractères maximum
- ✅ Inclure le mot-clé principal
- ✅ Unique pour chaque page
- ✅ Format : `Titre | MSL Conseils` (automatique)

### Descriptions
- ✅ 150-160 caractères
- ✅ Phrase complète et engageante
- ✅ Inclure un appel à l'action
- ✅ Unique pour chaque page

### Mots-clés
- ✅ 3-5 par page
- ✅ Pertinents et spécifiques
- ✅ Mixte : génériques + longue traîne
- ❌ Pas de keyword stuffing

### Données structurées
- ✅ Toujours inclure le fil d'Ariane
- ✅ Un schéma par type de contenu
- ✅ Données précises et à jour
- ✅ Valider avec Schema.org

---

## 🔄 Mises à jour futures

Pour ajouter de nouveaux types de schémas, modifiez `/src/lib/seo.ts` :

```typescript
export function generateArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: `${siteConfig.url}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author || siteConfig.author,
    },
  };
}
```

---

## 📚 Ressources

- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Google Search Central](https://developers.google.com/search)

---

**Dernière mise à jour :** 2025-12-13
