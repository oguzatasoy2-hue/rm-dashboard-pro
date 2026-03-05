import React from 'react';

/**
 * LogoORM Component - UI/UX Optimized Version
 * Style: Liquid Glass / Architectural Precision
 * Palette: Deep Navy (#1E3A8A) + Signature Gold (#EAC54F)
 */
export const LogoORM = () => {
    return (
        <div className="flex items-center gap-4 group cursor-pointer select-none">

            {/* 
        LOGUE CONCEPT : "L'Aigle de Précision"
        Structure architecturale basée sur le nombre d'or pour une harmonie visuelle.
        Traits fins, dégradés subtils et effets de 'glass' pour un aspect SaaS Premium.
      */}
            <div className="relative flex items-center justify-center w-14 h-14 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">

                {/* Background Glow (Liquid Glass Effect) */}
                <div className="absolute inset-0 bg-[#EAC54F]/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full relative z-10"
                >
                    {/* Grille de construction architecturale (Extrêmement subtile) */}
                    <circle cx="50" cy="50" r="45" stroke="#EAC54F" strokeWidth="0.5" strokeDasharray="1 4" opacity="0.15" />

                    {/* L'AIGLE - DESIGN ARCHITECTURAL ÉLÉGANT */}
                    <g className="transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">

                        {/* L'Aile (Structure de plumes géométriques ultra-précises) */}
                        <path
                            d="M40 45 L 85 75 L 70 55 L 90 50 L 65 40 L 80 30 L 55 30 Z"
                            fill="url(#goldLiquidGradient)"
                            stroke="#EAC54F"
                            strokeWidth="1.2"
                            strokeLinejoin="round"
                        />

                        {/* Le Corps et le Cou (Courbe de puissance) */}
                        <path
                            d="M40 45 L 55 30 L 48 12 L 28 25 L 40 45 Z"
                            fill="#EAC54F"
                            className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                        />

                        {/* La Tête (Profil rapace réaliste : Bec crochu vers le bas) */}
                        <path
                            d="M28 25 L 8 32 C 8 32 12 42 22 40 L 28 45 L 28 25 Z"
                            fill="#EAC54F"
                        />

                        {/* L'Oeil (Vision technologique) */}
                        <circle cx="32" cy="28" r="2.5" fill="#09090B" />
                        <circle cx="32" cy="28" r="4.5" stroke="#EAC54F" strokeWidth="0.5" opacity="0.3" />

                        {/* Lignes de structure internes (Blueprint style) */}
                        <path d="M52 35 L 78 50" stroke="#09090B" strokeWidth="0.8" opacity="0.25" />
                        <path d="M58 45 L 82 60" stroke="#09090B" strokeWidth="0.8" opacity="0.25" />
                    </g>

                    {/* Definitions pour les dégradés Liquid Glass */}
                    <defs>
                        <linearGradient id="goldLiquidGradient" x1="40" y1="30" x2="90" y2="75" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#EAC54F" />
                            <stop offset="0.5" stopColor="#F5D170" />
                            <stop offset="1" stopColor="#B69530" />
                        </linearGradient>

                        <filter id="shadow" x="0" y="0" width="100" height="100">
                            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
                        </filter>
                    </defs>
                </svg>
            </div>

            {/* Logotype Branding - Optimisé UI/UX (Poppins Geometric) */}
            <div className="flex items-baseline leading-none">
                {/* O : Accent élégant */}
                <span className="text-[32px] font-light tracking-tighter text-[#EAC54F] font-[family-name:var(--font-poppins)] mr-0.5">
                    O
                </span>
                {/* RM : Bold pour l'autorité */}
                <span className="text-[32px] font-bold tracking-tighter text-white font-[family-name:var(--font-poppins)]">
                    RM
                </span>
                {/* pro : Épuré & Minimaliste */}
                <span className="text-[18px] font-light tracking-[0.05em] text-[#EAC54F]/90 ml-1.5 font-[family-name:var(--font-poppins)]">
                    pro
                </span>
            </div>

        </div>
    );
};
