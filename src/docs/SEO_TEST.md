# 🧪 Guide de test SEO - MSL Conseils

## ✅ Tests à effectuer après déploiement

### 1. Test des métadonnées

#### Vérifier les balises meta
Ouvrir chaque page et inspecter le code source (Ctrl+U / Cmd+Option+U) :

**Page d'accueil (`/`)**
```html
<title>Accueil | MSL Conseils</title>
<meta name="description" content="Expert Odoo Finances en Belgique et au Maroc...">
<meta property="og:title" content="Accueil | MSL Conseils">
<meta property="og:image" content="https://www.msl-conseils.com/og-image.jpg">
```

**Page À Propos (`/about`)**
```html
<title>À Propos | MSL Conseils</title>
<meta name="description" content="Découvrez MSL Conseils, votre expert Odoo Finances...">
```

**Page Méthode (`/methode`)**
```html
<title>Méthode P.I.L.O.T.E.R. | MSL Conseils</title>
```

**Page Solutions (`/solutions`)**
```html
<title>Nos Solutions | MSL Conseils</title>
```

---

### 2. Test des données structurées

#### Utiliser le validateur Google
1. Aller sur : https://validator.schema.org/
2. Entrer l'URL de votre site
3. Vérifier les résultats pour chaque page

#### Types de schémas à trouver :

**Page d'accueil**
- ✅ Organization
- ✅ WebSite

**Page À Propos**
- ✅ Organization (hérité du layout)
- ✅ BreadcrumbList

**Page Méthode**
- ✅ Organization (hérité du layout)
- ✅ BreadcrumbList
- ✅ Service

**Page Solutions**
- ✅ Organization (hérité du layout)
- ✅ BreadcrumbList

---

### 3. Test Open Graph

#### Facebook/LinkedIn Debugger
1. Aller sur : https://www.opengraph.xyz/
2. Entrer l'URL de chaque page
3. Vérifier :
   - ✅ Image s'affiche (1200x630 px)
   - ✅ Titre correct
   - ✅ Description correcte
   - ✅ Site name = "MSL Conseils"

#### Exemple de test
```
URL: https://www.msl-conseils.com/
Titre attendu: Accueil | MSL Conseils
Description: Expert Odoo Finances en Belgique et au Maroc...
Image: /og-image.jpg
```

---

### 4. Test Twitter Cards

#### Twitter Card Validator
1. Aller sur : https://cards-dev.twitter.com/validator
2. Entrer l'URL
3. Vérifier :
   - ✅ Card type: summary_large_image
   - ✅ Image s'affiche
   - ✅ Titre et description corrects

---

### 5. Test Sitemap et Robots

#### Sitemap.xml
1. Accéder à : `https://votre-site.com/sitemap.xml`
2. Vérifier que toutes les pages sont listées :
   - `/`
   - `/about`
   - `/methode`
   - `/solutions`
   - `/contact`
   - `/faq`
   - `/ressources`

#### Robots.txt
1. Accéder à : `https://votre-site.com/robots.txt`
2. Vérifier le contenu :
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/

Sitemap: https://www.msl-conseils.com/sitemap.xml
```

---

### 6. Test Performance et SEO avec Lighthouse

#### Lancer Lighthouse
1. Ouvrir DevTools (F12)
2. Aller dans l'onglet "Lighthouse"
3. Sélectionner "SEO" et "Performance"
4. Lancer l'audit

#### Scores cibles
- 🎯 SEO: > 90
- 🎯 Performance: > 80
- 🎯 Accessibility: > 90
- 🎯 Best Practices: > 90

#### Points à vérifier
- ✅ Document has a meta description
- ✅ Page has successful HTTP status code
- ✅ Links are crawlable
- ✅ Image elements have [alt] attributes
- ✅ Document has a valid hreflang
- ✅ Document uses legible font sizes

---

### 7. Test Mobile-Friendly

#### Google Mobile-Friendly Test
1. Aller sur : https://search.google.com/test/mobile-friendly
2. Entrer l'URL de votre site
3. Vérifier que toutes les pages sont mobile-friendly

---

### 8. Test de vitesse

#### Google PageSpeed Insights
1. Aller sur : https://pagespeed.web.dev/
2. Entrer l'URL
3. Tester Mobile et Desktop
4. Vérifier les Core Web Vitals :
   - ✅ LCP (Largest Contentful Paint) < 2.5s
   - ✅ FID (First Input Delay) < 100ms
   - ✅ CLS (Cumulative Layout Shift) < 0.1

---

### 9. Soumission aux moteurs de recherche

#### Google Search Console
1. Aller sur : https://search.google.com/search-console
2. Ajouter votre propriété (site web)
3. Vérifier la propriété (plusieurs méthodes disponibles)
4. Soumettre le sitemap : `https://votre-site.com/sitemap.xml`
5. Demander l'indexation de la page d'accueil

#### Bing Webmaster Tools
1. Aller sur : https://www.bing.com/webmasters
2. Ajouter votre site
3. Soumettre le sitemap
4. Vérifier l'indexation

---

### 10. Checklist finale

#### Avant le déploiement
- [ ] URL du site mise à jour dans `/src/lib/seo.ts`
- [ ] Image Open Graph créée (`/public/og-image.jpg`)
- [ ] Icônes PWA créées (192px et 512px)
- [ ] Informations de contact complétées
- [ ] Liens réseaux sociaux ajoutés
- [ ] Toutes les images ont des attributs `alt`
- [ ] Chaque page a un titre unique
- [ ] Les descriptions font 150-160 caractères
- [ ] Un seul H1 par page
- [ ] Hiérarchie des titres correcte (H1 > H2 > H3)

#### Après le déploiement
- [ ] Sitemap accessible et valide
- [ ] Robots.txt accessible et correct
- [ ] Données structurées validées
- [ ] Open Graph testé sur Facebook
- [ ] Twitter Cards testées
- [ ] Score Lighthouse SEO > 90
- [ ] Mobile-friendly confirmé
- [ ] PageSpeed score > 80
- [ ] Sitemap soumis à Google
- [ ] Sitemap soumis à Bing
- [ ] Google Analytics installé (optionnel)

---

## 🔧 Outils de test en ligne

### Validateurs
- **Schema.org** : https://validator.schema.org/
- **Google Rich Results** : https://search.google.com/test/rich-results
- **Open Graph** : https://www.opengraph.xyz/
- **Twitter Cards** : https://cards-dev.twitter.com/validator

### Performance
- **PageSpeed Insights** : https://pagespeed.web.dev/
- **GTmetrix** : https://gtmetrix.com/
- **WebPageTest** : https://www.webpagetest.org/

### SEO global
- **Google Search Console** : https://search.google.com/search-console
- **Bing Webmaster** : https://www.bing.com/webmasters
- **Lighthouse** : Inclus dans Chrome DevTools

### Mobile
- **Mobile-Friendly Test** : https://search.google.com/test/mobile-friendly
- **Responsive Design Checker** : https://responsivedesignchecker.com/

---

## 📊 Suivi des résultats

### Semaine 1
- Vérifier l'indexation des pages
- Corriger les erreurs éventuelles
- Optimiser les pages lentes

### Semaine 2-4
- Analyser le trafic organique
- Identifier les mots-clés qui fonctionnent
- Ajuster le contenu si nécessaire

### Mois 2-3
- Suivre l'évolution du positionnement
- Créer du contenu complémentaire
- Optimiser les pages à fort potentiel

---

## 🚨 Erreurs courantes à éviter

### Métadonnées
- ❌ Titre trop long (> 60 caractères)
- ❌ Description trop courte (< 120 caractères)
- ❌ Mêmes métadonnées sur plusieurs pages
- ❌ Absence de balise canonical

### Images
- ❌ Images sans attribut alt
- ❌ Images non optimisées (trop lourdes)
- ❌ Mauvaises dimensions pour Open Graph

### Contenu
- ❌ Plusieurs H1 sur une page
- ❌ Contenu dupliqué
- ❌ Liens cassés
- ❌ Contenu trop court (< 300 mots)

### Technique
- ❌ Sitemap non soumis
- ❌ Robots.txt bloque l'indexation
- ❌ HTTPS non activé
- ❌ Temps de chargement trop long

---

## 💡 Conseils supplémentaires

1. **Contenu de qualité**
   - Écrivez pour vos utilisateurs, pas pour Google
   - Apportez de la valeur ajoutée
   - Mettez à jour régulièrement

2. **Liens internes**
   - Créez un maillage cohérent
   - Utilisez des ancres descriptives
   - Évitez les liens cassés

3. **Performance**
   - Optimisez les images
   - Activez la compression
   - Utilisez un CDN si possible

4. **Monitoring**
   - Installez Google Analytics
   - Configurez Search Console
   - Suivez vos KPIs chaque semaine

5. **Mises à jour**
   - Ajoutez régulièrement du contenu
   - Corrigez les erreurs rapidement
   - Restez à jour avec les algorithmes

---

**Bonne chance avec votre SEO ! 🚀**

*Ce guide est à utiliser en complément du fichier `SEO_GUIDE.md`*
