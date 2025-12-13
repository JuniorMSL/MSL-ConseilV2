# 🚀 Guide SEO - MSL Conseils

## 📊 État actuel de l'implémentation SEO

### ✅ Éléments implémentés

#### 1. **Métadonnées de base**
- ✅ Titres optimisés pour chaque page
- ✅ Descriptions uniques et pertinentes
- ✅ Mots-clés ciblés par page
- ✅ Attribut `lang="fr"` sur la balise HTML
- ✅ Métadonnées Open Graph pour les partages sociaux
- ✅ Twitter Cards pour un meilleur affichage sur Twitter

#### 2. **Données structurées (JSON-LD)**
- ✅ Schema Organization (informations de l'entreprise)
- ✅ Schema WebSite (page d'accueil)
- ✅ Schema BreadcrumbList (fil d'Ariane sur chaque page)
- ✅ Schema Service (page Méthode)

#### 3. **Fichiers techniques**
- ✅ `sitemap.xml` généré dynamiquement
- ✅ `robots.txt` configuré
- ✅ `manifest.json` pour PWA

#### 4. **Configuration**
- ✅ Fichier de configuration centralisé (`/src/lib/seo.ts`)
- ✅ Fonctions utilitaires pour générer les métadonnées
- ✅ Composant JsonLd réutilisable

---

## 📝 Actions à compléter

### 🔴 Priorité HAUTE

1. **Créer l'image Open Graph**
   - Créer une image `/public/og-image.jpg` (1200x630 px)
   - Design moderne représentant MSL Conseils
   - Inclure le logo et un message accrocheur

2. **Mettre à jour l'URL du site**
   - Dans `/src/lib/seo.ts`, remplacer `https://www.msl-conseils.com` par votre URL réelle
   - Mettre à jour dans `/src/app/robots.ts` également

3. **Ajouter les icônes PWA**
   - Créer `/public/icon-192.png` (192x192 px)
   - Créer `/public/icon-512.png` (512x512 px)

4. **Compléter les informations de contact**
   - Dans `/src/lib/seo.ts`, ajouter le vrai numéro de téléphone
   - Ajouter l'email de contact réel
   - Ajouter les liens vers les réseaux sociaux

### 🟡 Priorité MOYENNE

5. **Optimiser les images**
   - Ajouter des attributs `alt` descriptifs sur toutes les images
   - Utiliser le composant `<Image>` de Next.js partout
   - Compresser les images pour de meilleures performances

6. **Améliorer la structure HTML**
   - Vérifier la hiérarchie des titres (H1 -> H2 -> H3)
   - S'assurer qu'il n'y a qu'un seul H1 par page
   - Utiliser des balises sémantiques (`<article>`, `<section>`, `<nav>`)

7. **Ajouter plus de données structurées**
   - Schema FAQ pour la page FAQ
   - Schema Article pour les ressources/blog
   - Schema LocalBusiness si bureau physique

### 🟢 Priorité BASSE

8. **Performance**
   - Activer le cache HTTP
   - Minifier CSS et JavaScript (déjà fait par Next.js)
   - Utiliser un CDN pour les assets

9. **Liens internes**
   - Créer un maillage interne cohérent
   - Ajouter des liens contextuels entre pages
   - Créer un plan du site visible pour les utilisateurs

---

## 🛠️ Comment utiliser le système SEO

### Ajouter des métadonnées à une nouvelle page

```tsx
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Titre de la page",
  description: "Description optimisée de 150-160 caractères",
  url: "/url-de-la-page",
  keywords: ["mot-clé 1", "mot-clé 2", "mot-clé 3"],
});
```

### Ajouter un fil d'Ariane

```tsx
import { generateBreadcrumbSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Accueil", url: "/" },
  { name: "Ma Page", url: "/ma-page" },
]);

export default function MaPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <main>{/* Contenu */}</main>
    </>
  );
}
```

### Ajouter un service

```tsx
import { generateServiceSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const serviceSchema = generateServiceSchema({
  name: "Nom du service",
  description: "Description du service",
});

export default function ServicePage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <main>{/* Contenu */}</main>
    </>
  );
}
```

---

## 📈 Vérification SEO

### Outils recommandés

1. **Google Search Console**
   - Soumettre le sitemap : `https://votre-site.com/sitemap.xml`
   - Vérifier l'indexation des pages
   - Surveiller les erreurs d'exploration

2. **Google PageSpeed Insights**
   - Tester la performance sur mobile et desktop
   - Suivre les Core Web Vitals

3. **Outils de test SEO**
   - [Schema Markup Validator](https://validator.schema.org/)
   - [Open Graph Debugger](https://www.opengraph.xyz/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

4. **Extensions Chrome**
   - Lighthouse (audit SEO)
   - SEOquake
   - META SEO inspector

### Checklist de vérification

- [ ] Chaque page a un titre unique
- [ ] Les descriptions font entre 150-160 caractères
- [ ] Les images ont des attributs alt
- [ ] Il n'y a qu'un seul H1 par page
- [ ] La hiérarchie des titres est correcte
- [ ] Le sitemap est accessible
- [ ] Les données structurées sont valides
- [ ] Les liens internes fonctionnent
- [ ] Le site est responsive
- [ ] Le temps de chargement est < 3 secondes

---

## 🎯 Bonnes pratiques SEO

### Titres (Title Tags)
- 50-60 caractères maximum
- Inclure le mot-clé principal
- Format : `Titre de la page | Nom du site`

### Descriptions
- 150-160 caractères maximum
- Inclure un appel à l'action
- Décrire clairement le contenu de la page

### Mots-clés
- 3-5 mots-clés par page
- Utiliser des variations longue traîne
- Éviter le keyword stuffing

### URLs
- Courtes et descriptives
- Utiliser des traits d'union (-)
- Éviter les caractères spéciaux
- Tout en minuscules

### Contenu
- Minimum 300 mots par page
- Utiliser des paragraphes courts
- Inclure des listes à puces
- Ajouter des images pertinentes
- Mettre à jour régulièrement

---

## 📞 Support

Pour toute question sur le SEO de votre site, référez-vous à ce guide ou consultez :
- [Documentation Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)

---

**Dernière mise à jour :** 2025-12-13
