# Directives Agent - RM Dashboard Pro

Ce fichier contient les directives architecturales et esthétiques strictes pour ce projet. En tant qu'assistant IA, tu dois **impérativement** lire et appliquer ces règles à chaque session.

## 1. Design & Esthétique (Dashboard Premium)
- **Thème Global** : Dark mode par défaut avec un fond très sombre (`bg-[#09090B]`).
- **Couleur d'Accentuation Principale** : Or / Jaune Luxueux (`text-[#EAC54F]`, `bg-[#EAC54F]`). À utiliser pour les éléments interactifs, les icônes importantes et les surlignages.
- **Couleurs Secondaires** : Utiliser des transparences de blanc et de zinc (ex: `bg-white/[0.02]`, `border-white/[0.05]`, `text-zinc-400`, `text-zinc-500`) pour créer de la profondeur, du contraste subtil et un effet "glassmorphism" haut de gamme.
- **Visuels & Ambiance** : L'interface doit avoir un rendu luxueux, fluide et minimaliste. Éviter les couleurs primaires génériques (rouge pur, bleu pur, etc.) au profit de teintes sur mesure.

## 2. Animations & Interactions (Framer Motion)
- **Librairie** : Utiliser **exclusivement** `framer-motion` pour les transitions et micro-interactions UI.
- **Courbe d'Animation (Easing)** : Utiliser la courbe "strict ease" pour un rendu net et premium : 
  `const strictEase = [0.16, 1, 0.3, 1] as const;`
- **Patterns** : Utiliser `containerVariants` (avec `staggerChildren`) et `itemVariants` (apparition avec `opacity` et axe `y`) pour les listes, les grilles et l'apparition des éléments au montage des pages.
- **Micro-interactions** : Ajouter des effets de survol subtils (glow, effets de blur, légère transformation) pour rendre l'interface vivante.

## 3. Architecture & Code
- **Stack Technologique** : Next.js (App Router), React, Tailwind CSS.
- **Langage** : **TypeScript strict**. Définir systématiquement les interfaces et les types pour les props de composants et les structures de données.
- **Composants UI** :
  - **Icônes** : Utiliser `lucide-react`.
  - **Graphiques** : Utiliser `recharts` (adaptés au thème dark/or avec des tooltips personnalisés si nécessaire).
  - **Modularité** : Extraire systématiquement les blocs réutilisables (comme `ModuleInfo`, les cartes de statistiques) dans des composants séparés.
  - Les pages (`page.tsx`) doivent se concentrer sur la mise en page (layout) et la récupération des données, en déléguant le rendu lourd aux composants.
- **Styling** : Privilégier les classes utilitaires Tailwind. Combiner les utilitaires pour les effets complexes (ombres portées internes, flous d'arrière-plan, bordures semi-transparentes) sans créer de fichiers CSS personnalisés superflus.

## 4. Garde-fous (Workflow)
- Avant chaque modification de l'UI, vérifier que l'ajout ne casse pas l'esthétique "Premium Dashboard" existante.
- Maintenir une cohérence absolue (padding `p-6` ou `p-8`, arrondis `rounded-2xl` ou `rounded-3xl`).
- Les noms de variables, classes et structures de fichiers doivent rester en anglais pour la cohérence du code, même si le texte affiché à l'utilisateur est en français.
- **Navigateur par défaut** : Lors de l'ouverture d'un hôte local (localhost) ou d'une page web via des commandes système, utiliser **uniquement Google Chrome** (et non Safari).
