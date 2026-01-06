# 🗺️ Architecture SEO - MSL Conseils

```
┌─────────────────────────────────────────────────────────────────┐
│                     ARCHITECTURE SEO COMPLÈTE                    │
└─────────────────────────────────────────────────────────────────┘

📦 MSL Conseils v2
│
├── 🎯 Configuration Centrale
│   └── src/lib/seo.ts
│       ├── siteConfig (URL, nom, description, contacts)
│       ├── organizationSchema (JSON-LD entreprise)
│       ├── generateMetadata() (métadonnées pages)
│       ├── generateBreadcrumbSchema() (fil d'Ariane)
│       ├── generateServiceSchema() (services)
│       └── generateFAQSchema() (FAQ)
│
├── 🏗️ Layout Global
│   └── src/app/layout.tsx
│       ├── Métadonnées globales
│       │   ├── Title template: "%s | MSL Conseils"
│       │   ├── Description de base
│       │   ├── Open Graph config
│       │   ├── Twitter Cards config
│       │   └── Robots config
│       └── JSON-LD Organization (script global)
│
├── 📄 Pages avec SEO
│   │
│   ├── 🏠 Accueil (/)
│   │   └── src/app/page.tsx
│   │       ├── ✅ Metadata: "Accueil | MSL Conseils"
│   │       ├── ✅ Description optimisée
│   │       ├── ✅ Keywords: Odoo Finances, Belgique, Maroc...
│   │       └── ✅ JSON-LD: WebSite Schema
│   │
│   ├── 👥 À Propos (/about)
│   │   └── src/app/about/page.tsx
│   │       ├── ✅ Metadata: "À Propos | MSL Conseils"
│   │       ├── ✅ Description mission & valeurs
│   │       ├── ✅ Keywords: Expert, Mission, Valeurs...
│   │       └── ✅ JSON-LD: BreadcrumbList
│   │
│   ├── 🎯 Méthode (/methode)
│   │   └── src/app/methode/page.tsx
│   │       ├── ✅ Metadata: "Méthode P.I.L.O.T.E.R. | MSL Conseils"
│   │       ├── ✅ Description de la méthode
│   │       ├── ✅ Keywords: PILOTER, Croissance, Audit...
│   │       ├── ✅ JSON-LD: BreadcrumbList
│   │       └── ✅ JSON-LD: Service Schema
│   │
│   ├── 💼 Solutions (/solutions)
│   │   └── src/app/solutions/page.tsx
│   │       ├── ✅ Metadata: "Nos Solutions | MSL Conseils"
│   │       ├── ✅ Description solutions Odoo
│   │       ├── ✅ Keywords: Solutions, ERP, Comptabilité...
│   │       └── ✅ JSON-LD: BreadcrumbList
│   │
│   ├── 📞 Contact (/contact)
│   │   └── src/app/contact/page.tsx
│   │       ├── ⏳ À configurer (voir SEO_EXAMPLES.md)
│   │       ├── ⏳ Metadata + Keywords
│   │       └── ⏳ JSON-LD: ContactPage + BreadcrumbList
│   │
│   ├── ❓ FAQ (/faq)
│   │   └── src/app/faq/page.tsx
│   │       ├── ⏳ À configurer (voir SEO_EXAMPLES.md)
│   │       ├── ⏳ Metadata + Keywords
│   │       └── ⏳ JSON-LD: FAQPage + BreadcrumbList
│   │
│   └── 📚 Ressources (/ressources)
│       └── src/app/ressources/page.tsx
│           ├── ⏳ À configurer (voir SEO_EXAMPLES.md)
│           ├── ⏳ Metadata + Keywords
│           └── ⏳ JSON-LD: BreadcrumbList
│
├── 🤖 Fichiers Techniques
│   │
│   ├── src/app/sitemap.ts
│   │   └── Génère /sitemap.xml dynamiquement
│   │       ├── Liste toutes les pages
│   │       ├── Fréquence de mise à jour
│   │       └── Priorités (home = 1.0, autres = 0.8)
│   │
│   ├── src/app/robots.ts
│   │   └── Génère /robots.txt
│   │       ├── Allow: /
│   │       ├── Disallow: /api/, /admin/, /_next/
│   │       └── Sitemap: URL du sitemap.xml
│   │
│   └── src/app/manifest.ts
│       └── Génère /manifest.json (PWA)
│           ├── Nom et description de l'app
│           ├── Icônes (192px, 512px)
│           └── Thème et couleurs
│
├── 🧩 Composants Utilitaires
│   └── src/components/JsonLd.tsx
│       └── Composant pour injecter JSON-LD facilement
│
├── 📚 Documentation
│   │
│   ├── SEO_GUIDE.md
│   │   └── Guide complet avec bonnes pratiques
│   │
│   ├── SEO_RECAP.md
│   │   └── Récapitulatif de l'implémentation
│   │
│   ├── SEO_TEST.md
│   │   └── Guide de test avec outils et checklists
│   │
│   ├── SEO_EXAMPLES.md
│   │   └── Exemples pour les pages restantes
│   │
│   └── src/lib/README_SEO.md
│       └── Doc de la bibliothèque SEO
│
└── 🎨 Assets à créer
    └── public/
        ├── ⏳ og-image.jpg (1200x630px)
        ├── ⏳ icon-192.png (192x192px)
        ├── ⏳ icon-512.png (512x512px)
        └── ✅ favicon.ico (existe déjà)


┌─────────────────────────────────────────────────────────────────┐
│                     FLUX DES MÉTADONNÉES                         │
└─────────────────────────────────────────────────────────────────┘

┌────────────┐
│   Layout   │  Template global: "%s | MSL Conseils"
│  (global)  │  + Open Graph config
└─────┬──────┘  + Organization Schema
      │
      ├─────────┬─────────┬─────────┬─────────┐
      │         │         │         │         │
      v         v         v         v         v
   ┌────┐   ┌─────┐   ┌────┐   ┌──────┐   ┌─────┐
   │Home│   │About│   │Meth│   │Solut.│   │Cont.│
   └────┘   └─────┘   └────┘   └──────┘   └─────┘
      │         │         │         │         │
      v         v         v         v         v
  Metadata  Metadata  Metadata  Metadata   Métad.
    +         +         +         +          à
  WebSite   Breadc.   Breadc.   Breadc.    faire
  Schema             + Service


┌─────────────────────────────────────────────────────────────────┐
│                  DONNÉES STRUCTURÉES (JSON-LD)                   │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│  Organization    │ ← Présent sur TOUTES les pages (layout.tsx)
└──────────────────┘
    ↓
    Contient:
    • Nom: MSL Conseils
    • URL du site
    • Logo
    • Adresse (Belgique)
    • Contact (email, phone)
    • Réseaux sociaux (LinkedIn)

┌──────────────────┐
│    WebSite       │ ← Page d'accueil uniquement
└──────────────────┘
    ↓
    Contient:
    • URL du site
    • Action de recherche (SearchAction)

┌──────────────────┐
│  BreadcrumbList  │ ← Sur toutes les pages internes
└──────────────────┘
    ↓
    Format: Accueil > Section > Page actuelle

┌──────────────────┐
│     Service      │ ← Page Méthode
└──────────────────┘
    ↓
    Contient:
    • Nom du service
    • Description
    • Zone d'intervention (BE, MA)

┌──────────────────┐
│     FAQPage      │ ← Page FAQ (à implémenter)
└──────────────────┘
    ↓
    Liste de questions/réponses


┌─────────────────────────────────────────────────────────────────┐
│                      OUTILS DE VALIDATION                        │
└─────────────────────────────────────────────────────────────────┘

📊 Validation des données structurées
   └─ https://validator.schema.org/

📱 Test Open Graph
   └─ https://www.opengraph.xyz/

🐦 Test Twitter Cards
   └─ https://cards-dev.twitter.com/validator

🚀 Performance & SEO
   └─ Lighthouse (Chrome DevTools)
   └─ https://pagespeed.web.dev/

🔍 Indexation
   └─ Google Search Console
   └─ Bing Webmaster Tools


┌─────────────────────────────────────────────────────────────────┐
│                     CHECKLIST DÉPLOIEMENT                        │
└─────────────────────────────────────────────────────────────────┘

Avant le déploiement:
□ Mettre à jour l'URL dans src/lib/seo.ts
□ Créer og-image.jpg (1200x630px)
□ Créer icon-192.png et icon-512.png
□ Compléter email et téléphone dans seo.ts
□ Ajouter liens réseaux sociaux
□ Vérifier attributs alt sur toutes les images
□ Tester localement toutes les pages

Après le déploiement:
□ Tester sitemap.xml accessible
□ Tester robots.txt accessible
□ Valider données structurées (Schema.org)
□ Tester Open Graph (Facebook Debugger)
□ Tester Twitter Cards
□ Score Lighthouse SEO > 90
□ Soumettre sitemap à Google Search Console
□ Soumettre sitemap à Bing Webmaster


┌─────────────────────────────────────────────────────────────────┐
│                         PERFORMANCE                              │
└─────────────────────────────────────────────────────────────────┘

Next.js optimise automatiquement:
✅ Minification CSS/JS
✅ Tree shaking
✅ Code splitting
✅ Image optimization (avec <Image>)
✅ Static generation des métadonnées
✅ Génération statique du sitemap

À optimiser manuellement:
⏳ Compression d'images
⏳ Lazy loading des images
⏳ CDN pour assets statiques
⏳ Cache HTTP headers


┌─────────────────────────────────────────────────────────────────┐
│                      MOTS-CLÉS CIBLES                            │
└─────────────────────────────────────────────────────────────────┘

Principaux:
• Odoo Finances
• Expert Odoo Belgique
• Expert Odoo Maroc
• Méthode PILOTER

Secondaires:
• Conseil finances
• Croissance entreprise
• Gestion financière
• ERP Odoo
• Comptabilité Odoo

Longue traîne:
• "Comment piloter sa croissance avec Odoo"
• "Expert Odoo Finances Belgique et Maroc"
• "Méthode PILOTER pour entreprise"
• "Optimiser gestion financière Odoo"


┌─────────────────────────────────────────────────────────────────┐
│                    SUIVI & ANALYTICS                             │
└─────────────────────────────────────────────────────────────────┘

KPIs à suivre:
📈 Trafic organique (Google Analytics)
📊 Positionnement mots-clés (Search Console)
🔍 Pages indexées (Search Console)
⚡ Core Web Vitals (PageSpeed Insights)
📱 Mobile usability (Search Console)
🔗 Backlinks (Ahrefs, SEMrush)

Fréquence de suivi:
• Hebdomadaire: Trafic, erreurs, indexation
• Mensuel: Positionnement, performances
• Trimestriel: Optimisations majeures
```

---

**Légende:**
- ✅ = Implémenté et fonctionnel
- ⏳ = À configurer (documentation fournie)
- 📊 = Statistiques/Analytics
- 🔍 = Outils de recherche/validation
- 📄 = Pages du site
- 🤖 = Fichiers techniques automatiques
- 📚 = Documentation

---

Pour plus de détails, consultez les fichiers de documentation :
- **SEO_GUIDE.md** : Guide complet
- **SEO_EXAMPLES.md** : Exemples de code
- **SEO_TEST.md** : Guide de test
