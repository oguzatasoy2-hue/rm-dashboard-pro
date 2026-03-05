# RM Dashboard Pro - Premium Template

Bienvenue dans le code source de **RM Dashboard Pro**, un magnifique Boilerplate (Template) conçu avec **Next.js**, **React**, et **Tailwind CSS**. Ce template a été pensé pour vous permettre de lancer un dashboard professionnel ultra-fluide avec des analyses de données, prêt pour tout cas d'usage (Hôtellerie, SaaS, Finance, Crypto).

## ✨ Fonctionnalités Principales

*   **Design Premium & Animations :** Interfaces luxueuses utilisant `framer-motion` et `lucide-react` pour une expérience utilisateur irréprochable.
*   **Composants de Données :** Intégration de graphiques (Line, Radar) interactifs via `recharts` pour visualiser Yield, Forecast, Parity, et STR Benchmark.
*   **Architecture Propre :** Routing Next.js App Router, séparation claire entre les composants UI (`src/components`), les pages (`src/app`), et la configuration.
*   **Données Centralisées :** Les données de démonstration ("Mocks") et la configuration du site (Nom, Logo) sont isolées respectement dans `src/data/mock.ts` et `src/config/site.ts` pour une modification immédiate.
*   **Mode Sombre Intégré :** Thème élégant configuré globalement avec des variables CSS (`globals.css`).

## 🚀 Installation Rapide

Suivez ces étapes pour démarrer le projet sur votre machine locale.

**1. Pré-requis**
Assurez-vous d'avoir [Node.js](https://nodejs.org/) (version 18 ou supérieure) installé.

**2. Installer les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

**3. Lancer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat en direct.

## 🛠️ Comment Personnaliser le Template ?

### 1. Changer le Nom et l'Identité
Ouvrez le fichier `src/config/site.ts`. Modifiez les mentions `IRMpro`, le logo, et les informations de l'utilisateur. Ces variables sont injectées automatiquement dans l'ensemble du projet (Sidebar, Meta Title, etc.).

### 2. Remplacer les Données de Démonstration (Mock Data)
Les graphiques et les tables sont actuellement alimentés par des données générées localement.
Ouvrez `src/data/mock.ts`. Vous pouvez y voir comment chaque module (Yield, Forecast, Market, STR, Parity) reçoit ses données.
Pour brancher votre propre backend ou base de données :
1. Allez dans la page désirée (ex: `src/app/yield/page.tsx` ou `src/app/page.tsx`).
2. Remplacez l'appel à la fonction génératrice (ex: `generateMarketData()`) par un `fetch()` vers votre API dans le bloc `useEffect`.

### 3. Changer les Couleurs du Thème
Ouvrez `src/app/globals.css`. Vous trouverez les variables CSS principales dans la balise `:root` :
```css
:root {
  --background: #09090B; /* Noir profond */
  --primary: #EAC54F; /* Or / Doré (accentuation) */
  /* ... */
}
```
Changez la couleur `--primary` et tout le thème (boutons, bordures actives, icônes) s'adaptera automatiquement.

## 📁 Structure du Projet

```text
rm-dashboard-pro/
├── src/
│   ├── app/                # Pages du projet (Routing Next.js)
│   │   ├── globals.css     # Variables CSS & Thème
│   │   ├── layout.tsx      # Conteneur principal & Metadata
│   │   ├── page.tsx        # Dashboard Yield (Accueil)
│   │   ├── forecast/       # Page Forecasting
│   │   ├── login/          # Page de connexion démo
│   │   ├── market/         # Page Market Insight
│   │   ├── parity/         # Page Rate Parity
│   │   └── str/            # Page STR Benchmark
│   ├── components/         # Composants d'interface (Sidebar, Graphiques)
│   ├── config/             # Configuration générique du site (site.ts)
│   ├── data/               # Générateurs de fausses données (mock.ts)
│   └── lib/                # Fonctions utilitaires (Tailwind Merge, etc.)
├── public/                 # Assets statiques (Favicon)
├── tailwind.config.ts      # Configuration Tailwind CSS
└── package.json            # Dépendances du projet
```

## ⚖️ Licence

Consultez le fichier `LICENSE` pour plus de détails. Réservé à l'achat et l'utilisation conformément aux termes de vente standard.
