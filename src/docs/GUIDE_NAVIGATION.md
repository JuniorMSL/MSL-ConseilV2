# 🚀 Guide de Navigation - MSL Conseil v2

## 📍 Comment accéder aux différentes pages

### En développement (localhost)
Votre serveur de développement tourne sur `http://localhost:3000`

#### Pages principales:
- **Accueil**: http://localhost:3000/
- **À propos**: http://localhost:3000/about
- **Solutions (Méthode détaillée)**: http://localhost:3000/solutions
- **Méthode (Aperçu)**: http://localhost:3000/methode
- **Ressources**: http://localhost:3000/ressources
- **FAQ**: http://localhost:3000/faq
- **Contact**: http://localhost:3000/contact

---

## 🔍 Navigation depuis l'interface

### Depuis le Header (menu principal)
Le header est présent sur toutes les pages avec les liens suivants:

**Desktop**:
- Navigation en capsule avec tous les liens
- Bouton CTA "Diagnostic Gratuit" → Contact

**Mobile**:
- Menu hamburger ☰
- Menu fullscreen avec tous les liens
- CTA "Demander un diagnostic"

### Depuis le Footer
Présent en bas de chaque page avec:
- Navigation rapide (4 liens principaux)
- Liens sociaux (LinkedIn, YouTube)
- Informations de contact
- Liens légaux

---

## 🎯 Parcours utilisateur recommandés

### Parcours 1: Découverte
```
Accueil (/) 
  → Cliquer sur "Solutions" dans le menu
  → /solutions (Voir la méthode P.I.L.O.T.E.R. détaillée)
  → Cliquer sur "Contact" 
  → /contact (Demander un diagnostic)
```

### Parcours 2: En savoir plus
```
Accueil (/)
  → Cliquer sur "À propos" dans le menu
  → /about (Découvrir l'entreprise)
  → Cliquer sur "Découvrir la méthode P.I.L.O.T.E.R."
  → /solutions
  → Cliquer sur "Contact"
  → /contact
```

### Parcours 3: Ressources
```
Accueil (/)
  → Cliquer sur "Ressources" dans le menu
  → /ressources (Explorer guides et articles)
  → Cliquer sur "Tous les articles"
  → /ressources#articles (Section articles)
```

---

## 🔗 Tous les liens internes (référence rapide)

### Navigation principale
| Lien dans l'UI | Route | Fichier source |
|----------------|-------|----------------|
| Accueil | `/` | `src/app/page.tsx` |
| À propos | `/about` | `src/app/about/page.tsx` |
| Solutions | `/solutions` | `src/app/solutions/page.tsx` |
| Méthode | `/methode` | `src/app/methode/page.tsx` |
| Ressources | `/ressources` | `src/app/ressources/page.tsx` |
| FAQ | `/faq` | `src/app/faq/page.tsx` |
| Contact | `/contact` | `src/app/contact/page.tsx` |

### CTAs (Call-to-Actions)
| Texte du bouton | Destination | Présent sur |
|-----------------|-------------|-------------|
| Diagnostic Gratuit | `/contact` | Header, Home |
| Découvrir la méthode P.I.L.O.T.E.R. | `/solutions` | About, divers |
| Parler à un expert | `/contact` | Home, divers |
| Demander un diagnostic | `/contact` | Header mobile, divers |
| Parler à un expert Odoo Finances | `/contact` | ComplementaryServices |

---

## 📱 Liens externes

### Réseaux sociaux
- **LinkedIn**: https://www.linkedin.com/company/msl-conseils
  - Accessible depuis: Footer
  - S'ouvre dans un nouvel onglet
  
- **YouTube**: https://www.youtube.com/@mslconseils
  - Accessible depuis: Footer
  - S'ouvre dans un nouvel onglet

### Contact direct
- **Email**: contact@mslconseils.be
  - Accessible depuis: Footer, Contact page
  - Ouvre le client email
  
- **WhatsApp**: https://wa.me/32XXXXXXXXX
  - Accessible depuis: Contact page
  - S'ouvre dans un nouvel onglet
  - ⚠️ **À configurer** avec le vrai numéro

---

## 🧭 Navigation par composants

### Composants avec liens internes

#### `Header.tsx`
```typescript
Navigation: /, /about, /solutions, /ressources, /methode, /faq, /contact
CTA: /contact
```

#### `Footer.tsx`
```typescript
Logo: /
Navigation: /methode, /about, /ressources, /contact
Sociaux: LinkedIn (externe), YouTube (externe)
Légal: /contact (temporaire)
```

#### `ComplementaryServices.tsx`
```typescript
CTA: /contact (Parler à un expert Odoo Finances)
```

#### `ResourceArticles.tsx`
```typescript
"Tous les articles": /ressources#articles
```

#### `AboutPage.tsx`
```typescript
"Découvrir la méthode": /solutions
"Demander diagnostic": /contact
```

---

## 🎨 Active Link Highlighting

Le header utilise le système de highlighting des liens actifs:
- Le lien de la page courante apparaît en couleur secondaire (`text-secondary`)
- Une ligne apparaît en dessous du lien actif
- Fonctionne automatiquement grâce à `usePathname()` de Next.js

---

## 📋 Checklist de navigation

Pour tester que tous les liens fonctionnent:

### Navigation principale
- [ ] Cliquer sur "Accueil" → doit aller à `/`
- [ ] Cliquer sur "À propos" → doit aller à `/about`
- [ ] Cliquer sur "Solutions" → doit aller à `/solutions`
- [ ] Cliquer sur "Méthode" → doit aller à `/methode`
- [ ] Cliquer sur "Ressources" → doit aller à `/ressources`
- [ ] Cliquer sur "FAQ" → doit aller à `/faq`
- [ ] Cliquer sur "Contact" → doit aller à `/contact`

### CTAs
- [ ] Bouton "Diagnostic Gratuit" (header) → `/contact`
- [ ] Bouton "Découvrir la méthode P.I.L.O.T.E.R." (about) → `/solutions`
- [ ] Bouton "Demander diagnostic" (about) → `/contact`
- [ ] Lien "Parler à un expert Odoo Finances" → `/contact`
- [ ] Lien "Tous les articles" → `/ressources#articles`

### Footer
- [ ] Logo → `/`
- [ ] La Méthode → `/methode`
- [ ] À propos → `/about`
- [ ] Ressources → `/ressources`
- [ ] Contact → `/contact`
- [ ] LinkedIn → s'ouvre dans un nouvel onglet
- [ ] YouTube → s'ouvre dans un nouvel onglet

### Contact page
- [ ] Email cliquable → ouvre client email
- [ ] WhatsApp → s'ouvre dans un nouvel onglet

---

## 🛠️ Modifications futures

### Pages à créer (optionnel)
1. **Page légale - Confidentialité**: `/src/app/legal/privacy/page.tsx`
2. **Page légale - Mentions**: `/src/app/legal/terms/page.tsx`

### Liens à mettre à jour
1. **LinkedIn**: Vérifier l'URL exacte de la page entreprise
2. **YouTube**: Vérifier l'URL exacte de la chaîne
3. **WhatsApp**: Remplacer `32XXXXXXXXX` par le numéro réel
4. **Footer légal**: Rediriger vers `/legal/privacy` et `/legal/terms` une fois créés

---

## 💡 Conseils

1. **Testez chaque lien** après modification
2. **Utilisez le serveur de dev** (`npm run dev`) pour voir les changements en temps réel
3. **Vérifiez le highlighting** des liens actifs dans le header
4. **Testez sur mobile** le menu hamburger et les CTAs
5. **Configurez les Analytics** pour suivre les clics sur les CTAs

---

**Date**: 2025-12-13  
**Version**: 1.0  
**Status**: ✅ Tous les liens corrigés et testables
