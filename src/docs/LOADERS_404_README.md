# 🎨 Composants UI - Loaders & Page 404

Documentation complète des composants de chargement et de la page d'erreur 404.

---

## 📦 Fichiers créés

### Composants
1. **`/src/components/Loader.tsx`** - Composants de chargement réutilisables
2. **`/src/components/PageTransition.tsx`** - Transitions entre pages
3. **`/src/app/not-found.tsx`** - Page 404 personnalisée
4. **`/src/app/loading.tsx`** - Template de loading global

### Utilitaires
5. **`/src/lib/utils.ts`** - Fonction `cn()` pour fusionner les classes CSS

### Pages de démonstration
6. **`/src/app/demo/loaders/page.tsx`** - Démo des loaders
7. **`/src/app/demo/404/page.tsx`** - Démo de la page 404

---

## 🎯 Composant Loader

### Variantes disponibles

Le composant `Loader` offre **5 variantes** différentes :

1. **`spinner`** - Spinner double rotation (par défaut)
2. **`dots`** - Trois points animés
3. **`pulse`** - Effet de pulsation
4. **`bars`** - Barres verticales animées
5. **`orbit`** - Orbites en rotation

### Tailles disponibles

- `sm` - Petit (8x8)
- `md` - Moyen (12x12) - par défaut
- `lg` - Grand (16x16)
- `xl` - Extra grand (24x24)

### Utilisation de base

```tsx
import Loader from '@/components/Loader';

// Simple
<Loader variant="spinner" size="md" />

// Avec texte
<Loader variant="orbit" size="lg" text="Chargement..." />

// Avec classe personnalisée
<Loader variant="dots" size="sm" className="my-8" />
```

### Props

```typescript
interface LoaderProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'orbit';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
}
```

---

## 🌐 LoaderFullscreen

Loader plein écran avec fond semi-transparent.

### Utilisation

```tsx
import { LoaderFullscreen } from '@/components/Loader';

<LoaderFullscreen text="Chargement de la page..." />
```

### Quand l'utiliser ?

- Transitions entre pages
- Chargement de données importantes
- Traitement de formulaires
- Toute action bloquante

---

## 💀 SkeletonLoader

Loader de type "skeleton" pour les contenus en chargement.

### Utilisation

```tsx
import { SkeletonLoader } from '@/components/Loader';

// Simple
<SkeletonLoader />

// Avec classe
<SkeletonLoader className="p-4" />

// Dans une carte
<div className="bg-white rounded-lg p-6">
  <div className="h-40 bg-gray-200 rounded mb-4 animate-pulse" />
  <SkeletonLoader />
</div>
```

### Quand l'utiliser ?

- Chargement de listes
- Cartes de contenu
- Articles/Posts
- Profils utilisateurs

---

## 🚫 Page 404 (Not Found)

### Caractéristiques

✨ **Design premium** :
- Animations GSAP fluides
- Effets de glow et 3D sur les chiffres "404"
- Gradients violet/pourpre
- Formes animées en arrière-plan

🎯 **UX optimisée** :
- Messages clairs et rassurants
- 2 boutons d'action (Accueil + Contact)
- Liens vers pages populaires
- Responsive et accessible

### Personnalisation

Le fichier `/src/app/not-found.tsx` peut être modifié pour :
- Changer les couleurs (ligne 58-60, 65-67, 73-75)
- Modifier les messages (ligne 88-95)
- Ajouter/retirer des liens (ligne 131-146)
- Ajuster les animations (ligne 24-56)

### Test

Pour tester la page 404 :
1. Visitez n'importe quelle URL inexistante : `/page-qui-nexiste-pas`
2. Ou allez sur la page de démo : `/demo/404`

---

## 🔄 PageTransition

Composant pour animer l'entrée des pages.

### Utilisation

```tsx
import PageTransition from '@/components/PageTransition';

export default function MaPage() {
  return (
    <PageTransition>
      <main>
        {/* Contenu de la page */}
      </main>
    </PageTransition>
  );
}
```

### Animation

- Fondu (opacity 0 → 1)
- Translation Y (20px → 0)
- Durée : 0.6s
- Easing : power3.out

---

## 📱 Loading global

Le fichier `/src/app/loading.tsx` définit le loader affiché automatiquement par Next.js pendant le chargement des pages.

### Comment ça marche ?

Next.js affiche automatiquement ce composant :
- Pendant le chargement initial
- Lors de la navigation entre pages
- Pendant le rendu côté serveur

### Personnalisation

```tsx
// src/app/loading.tsx
import { LoaderFullscreen } from '@/components/Loader';

export default function Loading() {
  // Changez le texte ou le variant
  return <LoaderFullscreen text="Patience..." />;
}
```

---

## 🎨 Démonstrations

### Page des loaders

**URL :** `/demo/loaders`

Affiche toutes les variantes et tailles de loaders avec :
- Exemples visuels interactifs
- Code d'utilisation
- Différentes configurations

### Page 404 démo

**URL :** `/demo/404`

Prévisualisation de la page 404 avec :
- Iframe de la vraie page
- Explications des fonctionnalités
- Lien pour tester en réel

---

## 💡 Exemples d'utilisation

### 1. Bouton de chargement

```tsx
'use client';

import { useState } from 'react';
import Loader from '@/components/Loader';

export default function SubmitButton() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // ... traitement
    setLoading(false);
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={loading}
      className="px-6 py-3 bg-primary text-white rounded-lg"
    >
      {loading ? (
        <Loader variant="spinner" size="sm" />
      ) : (
        'Envoyer'
      )}
    </button>
  );
}
```

### 2. Chargement de données

```tsx
'use client';

import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

export default function DataList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(data => {
      setData(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader variant="orbit" size="lg" text="Chargement des données..." />
      </div>
    );
  }

  return <div>{/* Afficher data */}</div>;
}
```

### 3. Skeleton pour liste

```tsx
import { SkeletonLoader } from '@/components/Loader';

export default function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      {/* Image skeleton */}
      <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer" />
      
      {/* Texte skeleton */}
      <SkeletonLoader />
      
      {/* Bouton skeleton */}
      <div className="h-10 bg-gray-200 rounded animate-pulse" />
    </div>
  );
}

// Utilisation
<div className="grid grid-cols-3 gap-6">
  {loading ? (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  ) : (
    data.map(item => <Card key={item.id} {...item} />)
  )}
</div>
```

### 4. Page avec transition

```tsx
import PageTransition from '@/components/PageTransition';
import Loader from '@/components/Loader';

export default async function BlogPage() {
  const posts = await fetchPosts();

  return (
    <PageTransition>
      <main className="py-24 px-6">
        <h1>Blog</h1>
        {posts.map(post => (
          <article key={post.id}>{/* ... */}</article>
        ))}
      </main>
    </PageTransition>
  );
}
```

---

## 🎯 Bonnes pratiques

### ✅ À faire

1. **Utiliser le bon loader pour le bon contexte** :
   - `spinner` ou `orbit` pour chargements globaux
   - `dots` ou `bars` pour boutons/actions courtes
   - `pulse` pour états intermédiaires
   - `skeleton` pour contenus structurés

2. **Ajouter du texte explicatif** pour les chargements longs :
   ```tsx
   <Loader variant="orbit" size="lg" text="Traitement en cours..." />
   ```

3. **Utiliser la bonne taille** :
   - `sm` dans les boutons
   - `md` dans les cartes
   - `lg` dans les sections
   - `xl` pour les chargements fullscreen

4. **Prévoir un timeout** pour éviter les chargements infinis

### ❌ À éviter

1. **Trop de loaders** sur la même page
2. **Loaders sans indication** de ce qui se charge
3. **Animations trop lentes** ou trop rapides
4. **Oublier les états d'erreur** après le loading

---

## 🎨 Personnalisation des couleurs

Les loaders utilisent les couleurs de votre thème :
- `primary` (violet #7C3AED)
- `secondary` (rouge #EF4444)

Pour changer les couleurs, modifiez votre `tailwind.config` :

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#votreeCouleur',
        secondary: '#autreCouleur',
      },
    },
  },
};
```

---

## 📦 Dépendances

Ces composants utilisent :
- **GSAP** - Animations (déjà installé)
- **clsx** - Gestion des classes CSS
- **tailwind-merge** - Fusion intelligente des classes Tailwind

### Installation des dépendances manquantes

```bash
npm install clsx tailwind-merge
```

---

## 🚀 Prochaines améliorations possibles

1. **Plus de variantes de loaders** :
   - Loader de type "progress bar"
   - Loader circulaire avec pourcentage
   - Loader custom avec logo de l'entreprise

2. **Configuration globale** :
   - Thème de couleurs personnalisé
   - Durées d'animation configurables
   - Textes par défaut

3. **Accessibilité** :
   - ARIA labels
   - Annonces pour screen readers
   - Mode réduit de mouvement

---

## 📝 Résumé

✅ **5 variantes de loaders** (spinner, dots, pulse, bars, orbit)  
✅ **4 tailles** (sm, md, lg, xl)  
✅ **Page 404 premium** avec animations GSAP  
✅ **Loading global** Next.js  
✅ **Skeleton loader** pour contenus  
✅ **PageTransition** pour animations fluides  
✅ **Pages de démo** complètes  

**Tout est prêt à l'emploi ! 🎉**

---

**Dernière mise à jour :** 2025-12-13
