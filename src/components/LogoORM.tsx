import React from 'react';

export const LogoORM = () => {
    return (
        <div className="flex items-center gap-4 group cursor-pointer select-none">

            {/* 
        LOGUE CONCEPT : "L'Aigle Architectural"
        Un design alliant réalisme géométrique et structure d'ingénierie.
        1. Le Bec : Précision (Forme aérodynamique)
        2. L'Oeil : Intelligence (Cercle de focalisation)
        3. L'Aile : Structure (Lignes de force de type aéronautique)
      */}
            <div className="relative flex items-center justify-center w-14 h-14 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-[0_0_15px_rgba(234,197,79,0.1)]"
                >
                    {/* Structure de fond / Grille d'architecture (Subtile) */}
                    <circle cx="50" cy="50" r="48" stroke="#EAC54F" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.1" />

                    {/* L'AIGLE - DESIGN ARCHITECTURAL */}
                    <g className="transition-all duration-500 group-hover:translate-x-1">

                        {/* L'Aile (Structure de plumes géométriques) */}
                        <path
                            d="M30 40 C 30 40, 45 80, 90 80 L 70 65 L 85 55 L 60 45 L 75 35 L 45 35 Z"
                            fill="url(#goldGradient)"
                            stroke="#EAC54F"
                            strokeWidth="0.5"
                        />

                        {/* Le Corps / Cou (Lignes de force) */}
                        <path
                            d="M30 40 L 45 35 L 50 15 L 25 25 L 30 40 Z"
                            fill="#EAC54F"
                            fillOpacity="0.8"
                        />

                        {/* La Tête (Précision réaliste) */}
                        <path
                            d="M25 25 L 10 32 L 20 38 L 30 40 L 25 25 Z"
                            fill="#EAC54F"
                        />

                        {/* L'Oeil (Le centre de la vision) */}
                        <circle cx="28" cy="30" r="2.5" fill="#09090B" />
                        <circle cx="28" cy="30" r="4.5" stroke="#09090B" strokeWidth="0.5" strokeDasharray="1 1" />

                        {/* Détails de finition (Lignes de plumes) */}
                        <path d="M55 42 L 80 65" stroke="#09090B" strokeWidth="0.5" opacity="0.3" />
                        <path d="M50 38 L 75 50" stroke="#09090B" strokeWidth="0.5" opacity="0.3" />
                    </g>

                    {/* Gradient Definition */}
                    <defs>
                        <linearGradient id="goldGradient" x1="30" y1="40" x2="90" y2="80" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#EAC54F" />
                            <stop offset="1" stopColor="#B69530" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Logotype Branding - Architecture Font Feel */}
            <div className="flex flex-col justify-center">
                <div className="flex items-baseline border-b border-white/10 pb-1 mb-1">
                    <span className="text-3xl font-bold tracking-tighter text-white uppercase italic">
                        RM
                    </span>
                    <span className="text-3xl font-light tracking-[0.1em] text-[#EAC54F] ml-1 uppercase">
                        Engine
                    </span>
                </div>
                <div className="flex justify-between items-center px-[2px]">
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/40">
                        Professional Suite
                    </span>
                    <div className="h-[1px] flex-1 bg-white/10 ml-2"></div>
                    <span className="text-[9px] font-black text-[#EAC54F] ml-2">v.2026</span>
                </div>
            </div>

        </div>
    );
};
