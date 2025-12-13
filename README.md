This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🔍 SEO

Ce projet inclut une **implémentation SEO complète et professionnelle** pour optimiser le référencement naturel.

### 📚 Documentation SEO

**Point d'entrée :** [SEO_INDEX.md](SEO_INDEX.md) - Index principal de toute la documentation SEO

#### Fichiers disponibles :
- 🗺️ **[SEO_ARCHITECTURE.md](SEO_ARCHITECTURE.md)** - Vue d'ensemble de l'architecture (COMMENCER ICI)
- 📋 **[SEO_RECAP.md](SEO_RECAP.md)** - Récapitulatif de l'implémentation
- 📖 **[SEO_GUIDE.md](SEO_GUIDE.md)** - Guide complet et bonnes pratiques
- 💻 **[SEO_EXAMPLES.md](SEO_EXAMPLES.md)** - Exemples de code prêts à l'emploi
- 🧪 **[SEO_TEST.md](SEO_TEST.md)** - Guide de test et validation
- 🔍 **[check-seo.sh](check-seo.sh)** - Script de vérification automatique

### ⚡ Quick Start SEO

```bash
# Vérifier l'état du SEO
./check-seo.sh

# Configurer (voir SEO_GUIDE.md)
# 1. Éditer src/lib/seo.ts avec vos informations
# 2. Créer public/og-image.jpg (1200x630px)
# 3. Créer public/icon-192.png et icon-512.png
```

### ✅ Déjà implémenté
- ✅ Métadonnées complètes (Open Graph, Twitter Cards)
- ✅ Données structurées JSON-LD
- ✅ Sitemap.xml et robots.txt automatiques
- ✅ Manifest PWA
- ✅ Configuration Next.js optimisée

**Pour plus d'informations, consultez [SEO_INDEX.md](SEO_INDEX.md)**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
