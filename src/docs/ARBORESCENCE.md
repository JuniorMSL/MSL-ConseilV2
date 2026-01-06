# 🏗️ Arborescence - MSL Conseil v2

## 📋 Structure des pages (Routes Next.js)

```
/                           → Page d'accueil (Home)
├── /about                  → À propos de MSL Conseil
├── /solutions              → Solutions P.I.L.O.T.E.R. (anciennement /methode)
├── /methode                → La méthode P.I.L.O.T.E.R.
├── /ressources             → Ressources (guides, articles, études de cas)
├── /faq                    → Questions fréquentes
└── /contact                → Page de contact
```

---

## 🎯 Pages principales et leurs composants

### 🏠 **/ (Accueil)** - `src/app/page.tsx`
Composants utilisés:
- `HeroSlider` - Slider héro immersif
- `VideoSection` - Section vidéo
- `BenefitsGrid` - Grille des bénéfices
- `AboutServices` - À propos et services
- `PiloterMethod` - Aperçu de la méthode P.I.L.O.T.E.R.
- `ResultsSection` - Résultats et statistiques
- `SixReasons` - 6 raisons de nous choisir
- `ComplementaryServices` - Services complémentaires MSL Conseils & CTA final

---

### 👥 **/about** - `src/app/about/page.tsx`
Composants utilisés:
- `AboutHero` - Héro de la page À propos
- `AboutMission` - Notre mission
- `AboutMethod` - Notre approche méthodologique
- `AboutValues` - Nos valeurs
- CTA inline (boutons vers méthode et diagnostic)

---

### 🎯 **/solutions** - `src/app/solutions/page.tsx`
**La méthode P.I.L.O.T.E.R. détaillée**

Composants utilisés:
- `MethodeHero` - Héro de la méthode
- `MethodeIntro` - Introduction de la méthode
- `MethodeSteps` - Les étapes P.I.L.O.T.E.R.
- `MethodeExamples` - Exemples concrets
- `MethodeWhy` - Pourquoi cette méthode
- `MethodeCTA` - Call-to-action final

---

### 📚 **/methode** - `src/app/methode/page.tsx`
**Version simplifiée de la méthode**

Composants utilisés:
- `MethodeHero` - Héro de la méthode
- `MethodeIntro` - Introduction
- `MethodeSteps` - Étapes de la méthode
- `MethodeSummary` - Résumé de la méthode

---

### 📖 **/ressources** - `src/app/ressources/page.tsx`
**Centre de ressources**

Composants utilisés:
- `ResourceHero` - Héro des ressources
- `ResourceGuides` - Guides pratiques
- `ResourceArticles` - Articles et blog
- `ResourceCaseStudies` - Études de cas
- `ResourceChecklists` - Checklist téléchargeables
- `ResourceCTA` - Call-to-action final

---

### ❓ **/faq** - `src/app/faq/page.tsx`
**Questions fréquentes**

Composants utilisés:
- `FAQHero` - Héro de la FAQ
- `FAQList` - Liste des questions/réponses
- `FAQCTA` - Call-to-action final

---

### 📧 **/contact** - `src/app/contact/page.tsx`
**Page de contact**

Composants utilisés:
- `ContactHero` - Héro de contact
- `ContactContent` - Formulaire et informations de contact

---

## 🧩 Composants globaux

### 📱 Navigation
- **`Header`** (`src/components/Header.tsx`)
  - Logo MSL Conseil
  - Navigation desktop (capsule avec liens)
  - Menu mobile (fullscreen)
  - CTA "Diagnostic Gratuit"
  - Active link highlighting

- **`Footer`** (`src/components/Footer.tsx`)
  - Logo et description
  - Navigation (Méthode, À propos, Ressources, Contact)
  - Liens sociaux (LinkedIn, YouTube)
  - Informations de contact (email, bureaux)
  - Liens légaux (Politique de confidentialité, Mentions légales)

### 🎨 Utilitaires
- `SmoothScroll` - Scroll fluide Lenis
- `Marquee` - Texte défilant

---

## 🔗 Liens de navigation principaux

| Label | Route | Description |
|-------|-------|-------------|
| **Accueil** | `/` | Page d'accueil |
| **À propos** | `/about` | Présentation de l'entreprise |
| **Solutions** | `/solutions` | Méthode P.I.L.O.T.E.R. détaillée |
| **Méthode** | `/methode` | Aperçu de la méthode |
| **Ressources** | `/ressources` | Guides, articles, études de cas |
| **FAQ** | `/faq` | Questions fréquentes |
| **Contact** | `/contact` | Formulaire et coordonnées |

---

## 📍 Ancres et liens internes

### Contact / Diagnostic
- `#contact` → Redirige vers la page `/contact` ou section contact
- Liens WhatsApp → À configurer avec numéro réel
- Email: `contact@mslconseils.be` (ou `contact@msl-conseils.com`)

### Liens sociaux (à configurer)
- LinkedIn → URL à définir
- YouTube → URL à définir

### Pages légales (à créer)
- `/legal/privacy` → Politique de confidentialité
- `/legal/terms` → Mentions légales

---

## 🎯 Actions de conversion (CTA)

### CTAs principaux répétés sur le site:
1. **"Diagnostic Gratuit"** → `/contact`
2. **"Découvrir la méthode P.I.L.O.T.E.R."** → `/solutions` ou `/methode`
3. **"Parler à un expert"** → `/contact` ou WhatsApp
4. **"Réserver un audit gratuit"** → `/contact` ou calendrier intégré

---

## 📝 Notes importantes

### Liens à corriger/configurer:
- ✅ Liens sociaux (LinkedIn, YouTube) - actuellement `href="#"`
- ✅ Lien "Tous les articles" dans ResourceArticles - actuellement `href="#"`
- ✅ Lien "Parler à un expert Odoo Finances" - actuellement `href="#"`
- ✅ Lien WhatsApp dans ContactContent - actuellement `href="#"`
- ✅ Boutons CTA dans AboutPage - utiliser des `Link` au lieu de `button`
- ✅ Liens légaux (Politique de confidentialité, Mentions légales) - actuellement `href="#"`

### Recommandations:
1. Créer des pages `/legal/privacy` et `/legal/terms` pour les mentions légales
2. Remplacer tous les `href="#"` par des routes appropriées
3. Implémenter un système de calendrier pour les rendez-vous (Calendly, etc.)
4. Ajouter des routes dynamiques pour les articles/ressources si nécessaire
5. Créer une page dédiée pour "Parler à un expert Odoo" ou rediriger vers `/contact`

---

## 🎨 Palette de couleurs

Variables CSS utilisées:
- **Primary**: `#003366` (bleu foncé)
- **Secondary**: `#20A67E` (vert menthe)
- **Background**: défini dans globals.css
- **Text colors**: white, gray variations

---

**Date de création**: ${new Date().toISOString().split('T')[0]}
**Auteur**: MSL Conseil - Développement Web
