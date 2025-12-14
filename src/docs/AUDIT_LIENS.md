# 🔍 Audit des liens - Pages Ressources et Méthode

**Date**: 13 décembre 2025  
**Pages vérifiées**: `/ressources` et `/methode`

---

## ❌ Problèmes identifiés

### 1. **ResourceCTA.tsx** - 2 liens problématiques

**Fichier**: `/src/components/ressources/ResourceCTA.tsx`

#### Lien 1 (ligne 19) - Ancre non fonctionnelle
```tsx
<a href="#contact" className="...">
    Parler à un expert
</a>
```
**Problème**: `href="#contact"` ne fonctionne pas  
**Solution**: Rediriger vers `/contact`

#### Lien 2 (ligne 16) - Bouton sans action
```tsx
<button className="...">
    Télécharger le Kit Complet
</button>
```
**Problème**: Bouton sans action de navigation  
**Solution**: Convertir en Link vers une page de téléchargement ou `/ressources`

---

### 2. **MethodeCTA.tsx** - 2 boutons sans navigation

**Fichier**: `/src/components/methode/MethodeCTA.tsx`

#### Bouton 1 (ligne 23)
```tsx
<button className="...">
    👉 Demandez votre diagnostic gratuit
</button>
```
**Problème**: Bouton sans redirection  
**Solution**: Convertir en Link vers `/contact`

#### Bouton 2 (ligne 26)
```tsx
<button className="...">
    👉 Parlez à un consultant expert
</button>
```
**Problème**: Bouton sans redirection  
**Solution**: Convertir en Link vers `/contact`

---

### 3. **MethodeIntro.tsx** - 2 boutons sans navigation

**Fichier**: `/src/components/methode/MethodeIntro.tsx`

#### Bouton 1 (ligne 56)
```tsx
<button className="...">
    👉 Découvrir la méthode P.I.L.O.T.E.R.
</button>
```
**Problème**: Bouton sans redirection  
**Solution**: Convertir en Link vers `/solutions`

#### Bouton 2 (ligne 59)
```tsx
<button className="...">
    👉 Réserver un audit
</button>
```
**Problème**: Bouton sans redirection  
**Solution**: Convertir en Link vers `/contact`

---

### 4. **MethodeSummary.tsx** - 2 boutons sans navigation

**Fichier**: `/src/components/methode/MethodeSummary.tsx`

#### Bouton 1 (ligne 66)
```tsx
<button className="...">
    👉 Demandez votre diagnostic gratuit
</button>
```
**Problème**: Bouton sans redirection  
**Solution**: Convertir en Link vers `/contact`

#### Bouton 2 (ligne 69)
```tsx
<button className="...">
    👉 Parlez à un consultant expert
</button>
```
**Problème**: Bouton sans redirection  
**Solution**: Convertir en Link vers `/contact`

---

### 5. **ResourceChecklists.tsx** - Boutons non fonctionnels

**Fichier**: `/src/components/ressources/ResourceChecklists.tsx`

#### Bouton téléchargement (ligne 112)
```tsx
<button className="...">
    <svg>...</svg> {/* Icône de téléchargement */}
</button>
```
**Problème**: Bouton décoratif sans action  
**Solution optionnelle**: Ajouter une action de téléchargement si pertinent

---

## ✅ Composants sans problème

- ✅ **ResourceArticles.tsx** - Lien corrigé (`/ressources#articles`)
- ✅ **ResourceGuides.tsx** - Pas de liens navigables (cartes cliquables à implémenter)
- ✅ **ResourceCaseStudies.tsx** - Pas de liens navigables
- ✅ **MethodeHero.tsx** - Pas de liens (à vérifier)
- ✅ **MethodeExamples.tsx** - Pas de liens (à vérifier)
- ✅ **MethodeWhy.tsx** - Pas de liens (à vérifier)

---

## 🎯 Résumé des corrections à apporter

| Composant | Liens à corriger | Priorité |
|-----------|------------------|----------|
| ResourceCTA | 2 liens | 🔴 Haute |
| MethodeCTA | 2 boutons | 🔴 Haute |
| MethodeIntro | 2 boutons | 🔴 Haute |
| MethodeSummary | 2 boutons | 🔴 Haute |
| ResourceChecklists | 3 boutons décoratifs | 🟡 Basse |

**Total**: 9 liens/boutons à corriger

---

## 📝 Corrections à appliquer

### Pattern à suivre:
```tsx
// AVANT
<button className="...">Texte CTA</button>

// APRÈS
import Link from "next/link";

<Link href="/route" className="...">
    Texte CTA
</Link>
```

### Mapping des CTAs:
- "Diagnostic gratuit" → `/contact`
- "Parler à un expert" → `/contact`
- "Réserver un audit" → `/contact`
- "Découvrir la méthode P.I.L.O.T.E.R." → `/solutions`
- "Télécharger le Kit" → `/ressources` ou page dédiée

---

**Statut**: ⚠️ 9 corrections nécessaires  
**Impact**: Moyen - CTAs non fonctionnels réduisent les conversions
