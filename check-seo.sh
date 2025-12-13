#!/bin/bash

# 🔍 Script de vérification SEO - MSL Conseils
# Ce script vérifie rapidement l'état de l'implémentation SEO

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 VÉRIFICATION SEO - MSL Conseils"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Couleurs pour le terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Compteurs
TOTAL=0
PASSED=0
FAILED=0
WARNING=0

# Fonction pour vérifier un fichier
check_file() {
    local file=$1
    local description=$2
    TOTAL=$((TOTAL + 1))
    
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅${NC} $description: ${BLUE}$file${NC}"
        PASSED=$((PASSED + 1))
        return 0
    else
        echo -e "${RED}❌${NC} $description: ${RED}$file (manquant)${NC}"
        FAILED=$((FAILED + 1))
        return 1
    fi
}

# Fonction pour vérifier le contenu d'un fichier
check_content() {
    local file=$1
    local search=$2
    local description=$3
    TOTAL=$((TOTAL + 1))
    
    if [ -f "$file" ] && grep -q "$search" "$file"; then
        echo -e "${GREEN}✅${NC} $description"
        PASSED=$((PASSED + 1))
        return 0
    else
        echo -e "${YELLOW}⚠️${NC}  $description ${YELLOW}(à vérifier)${NC}"
        WARNING=$((WARNING + 1))
        return 1
    fi
}

echo "📁 VÉRIFICATION DES FICHIERS"
echo "────────────────────────────────────────────────────"

# Vérifier les fichiers de configuration
check_file "src/lib/seo.ts" "Configuration SEO"
check_file "src/app/sitemap.ts" "Sitemap"
check_file "src/app/robots.ts" "Robots.txt"
check_file "src/app/manifest.ts" "Manifest PWA"
check_file "src/components/JsonLd.tsx" "Composant JsonLd"

echo ""
echo "📄 VÉRIFICATION DES PAGES"
echo "────────────────────────────────────────────────────"

# Vérifier les pages
check_file "src/app/page.tsx" "Page Accueil"
check_file "src/app/about/page.tsx" "Page À Propos"
check_file "src/app/methode/page.tsx" "Page Méthode"
check_file "src/app/solutions/page.tsx" "Page Solutions"

echo ""
echo "📋 VÉRIFICATION DES MÉTADONNÉES"
echo "────────────────────────────────────────────────────"

# Vérifier les métadonnées dans les fichiers
check_content "src/app/layout.tsx" "generateMetadata\|metadata:" "Layout: Métadonnées"
check_content "src/app/page.tsx" "export const metadata" "Accueil: Métadonnées"
check_content "src/app/about/page.tsx" "export const metadata" "À Propos: Métadonnées"
check_content "src/app/methode/page.tsx" "export const metadata" "Méthode: Métadonnées"
check_content "src/app/solutions/page.tsx" "export const metadata" "Solutions: Métadonnées"

echo ""
echo "🔗 VÉRIFICATION DES SCHÉMAS JSON-LD"
echo "────────────────────────────────────────────────────"

check_content "src/app/layout.tsx" "organizationSchema" "Layout: Organization Schema"
check_content "src/app/page.tsx" "websiteSchema" "Accueil: Website Schema"
check_content "src/app/about/page.tsx" "breadcrumbSchema" "À Propos: Breadcrumb Schema"
check_content "src/app/methode/page.tsx" "serviceSchema" "Méthode: Service Schema"

echo ""
echo "🎨 VÉRIFICATION DES ASSETS"
echo "────────────────────────────────────────────────────"

check_file "public/favicon.ico" "Favicon"

TOTAL=$((TOTAL + 1))
if [ -f "public/og-image.jpg" ] || [ -f "public/og-image.png" ]; then
    echo -e "${GREEN}✅${NC} Image Open Graph"
    PASSED=$((PASSED + 1))
else
    echo -e "${YELLOW}⚠️${NC}  Image Open Graph ${YELLOW}(à créer: 1200x630px)${NC}"
    WARNING=$((WARNING + 1))
fi

TOTAL=$((TOTAL + 1))
if [ -f "public/icon-192.png" ]; then
    echo -e "${GREEN}✅${NC} Icône PWA 192px"
    PASSED=$((PASSED + 1))
else
    echo -e "${YELLOW}⚠️${NC}  Icône PWA 192px ${YELLOW}(à créer)${NC}"
    WARNING=$((WARNING + 1))
fi

TOTAL=$((TOTAL + 1))
if [ -f "public/icon-512.png" ]; then
    echo -e "${GREEN}✅${NC} Icône PWA 512px"
    PASSED=$((PASSED + 1))
else
    echo -e "${YELLOW}⚠️${NC}  Icône PWA 512px ${YELLOW}(à créer)${NC}"
    WARNING=$((WARNING + 1))
fi

echo ""
echo "📚 VÉRIFICATION DE LA DOCUMENTATION"
echo "────────────────────────────────────────────────────"

check_file "SEO_GUIDE.md" "Guide SEO"
check_file "SEO_RECAP.md" "Récapitulatif"
check_file "SEO_TEST.md" "Guide de test"
check_file "SEO_EXAMPLES.md" "Exemples"
check_file "SEO_ARCHITECTURE.md" "Architecture"

echo ""
echo "⚙️  VÉRIFICATION DE LA CONFIGURATION"
echo "────────────────────────────────────────────────────"

check_content "src/lib/seo.ts" "https://www.msl-conseils.com" "URL du site configurée"
check_content "src/lib/seo.ts" "contact@" "Email de contact"
check_content "src/lib/seo.ts" "linkedin.com" "Lien LinkedIn"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RÉSUMÉ"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "Total de vérifications : ${BLUE}$TOTAL${NC}"
echo -e "  ${GREEN}✅ Réussies        : $PASSED${NC}"
echo -e "  ${RED}❌ Échouées        : $FAILED${NC}"
echo -e "  ${YELLOW}⚠️  Avertissements  : $WARNING${NC}"
echo ""

# Calculer le pourcentage
PERCENTAGE=$(( (PASSED * 100) / TOTAL ))

if [ $PERCENTAGE -ge 80 ]; then
    echo -e "${GREEN}🎉 Excellent ! Votre SEO est à ${PERCENTAGE}% !${NC}"
elif [ $PERCENTAGE -ge 60 ]; then
    echo -e "${YELLOW}👍 Bien ! Votre SEO est à ${PERCENTAGE}%. Quelques améliorations à faire.${NC}"
else
    echo -e "${RED}⚠️  Attention ! Votre SEO est à ${PERCENTAGE}%. Des actions sont nécessaires.${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 PROCHAINES ÉTAPES RECOMMANDÉES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $FAILED -gt 0 ] || [ $WARNING -gt 5 ]; then
    echo "1. ⚠️  Créer les fichiers manquants (voir ci-dessus)"
    echo "2. 📝 Compléter les informations dans src/lib/seo.ts"
    echo "3. 🎨 Créer les assets manquants (images, icônes)"
    echo "4. 🧪 Tester avec les outils de validation"
    echo "5. 📚 Consulter SEO_GUIDE.md pour plus d'infos"
else
    echo "1. ✅ Vérifier l'URL en production dans src/lib/seo.ts"
    echo "2. 🧪 Tester toutes les pages avec Lighthouse"
    echo "3. 📤 Soumettre le sitemap à Google Search Console"
    echo "4. 📊 Installer Google Analytics (optionnel)"
    echo "5. 🎯 Commencer à suivre vos KPIs SEO"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Pour plus d'informations, consultez :"
echo "  • SEO_GUIDE.md      : Guide complet"
echo "  • SEO_TEST.md       : Comment tester"
echo "  • SEO_EXAMPLES.md   : Exemples de code"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
